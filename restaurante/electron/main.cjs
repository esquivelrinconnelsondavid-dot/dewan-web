const { app, BrowserWindow, Notification, ipcMain, powerSaveBlocker, powerMonitor, Menu } = require('electron');
const path = require('path');

// --- Arreglos de estabilidad y sonido (escritorio) ---
// 1) La sirena (AudioContext) puede sonar/reanudar sin gesto del usuario.
//    Sin esto, el contexto se suspende y reaparece el botón "activar sonido".
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
// 2) Evitar congelamientos/throttling cuando la ventana queda en segundo plano
//    (mantiene viva la sirena cada 5s y el realtime de pedidos).
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');
// 3) Evitar la pantalla negra por caída del proceso GPU. El panel no necesita
//    aceleración por hardware; esto elimina la causa más común del cuelgue.
app.disableHardwareAcceleration();

const isDev = process.env.NODE_ENV === 'development';
let mainWindow = null;
let powerSaveId = null;

// El panel se carga desde la web hosteada → así los arreglos llegan SOLOS (deploy
// web) sin reinstalar el .exe en cada local. Si no hay internet o el hosting está
// caído, mostramos una pantalla "Conectando…" que reintenta sola y vuelve al
// panel cuando hay red. (No usamos copia local para no mezclar sesiones de otro
// origen.) Para los locales es invisible: mismo .exe, mismo ícono.
const URL_PANEL_WEB = 'https://dewansas.com/restaurante/web/';

function mostrarOffline() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  try { mainWindow.loadFile(path.join(__dirname, 'offline.html')); } catch (e) {}
}

function cargarPanel() {
  if (!mainWindow || mainWindow.isDestroyed()) return;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5174/restaurante/');
    return;
  }
  mainWindow.loadURL(URL_PANEL_WEB).catch(() => mostrarOffline());
}

// ── Recuperación DURA (sobrevive a un renderer congelado) ───────────────
// El watchdog y el recovery del RENDERER mueren si el hilo de JS se congela.
// Estas piezas viven en el PROCESO PRINCIPAL, cuyo event loop sigue vivo.
async function drenarRed() {
  try {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    const ses = mainWindow.webContents.session;
    await ses.closeAllConnections();
    await ses.clearHostResolverCache();
  } catch (e) { console.warn('[drenarRed]', e); }
}
function reiniciarApp(motivo) {
  console.error('[electron] RELAUNCH (' + (motivo || '') + ') → proceso nuevo, igual que cerrar y reabrir');
  try { app.relaunch(); } catch (e) {}
  app.exit(0); // exit(0), NO quit() (quit respeta beforeunload y puede colgarse con renderer frozen)
}
// Latido del renderer: si deja de llegar = renderer congelado.
let ultimoLatido = Date.now();
let latidoVisto = false; // sólo escalamos si la web NUEVA (con latido) estuvo viva → evita bucle de relaunch con una web vieja sin latido
ipcMain.on('latido', () => { ultimoLatido = Date.now(); latidoVisto = true; });
ipcMain.on('reiniciar-app', () => reiniciarApp('IPC reiniciar-app'));

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      backgroundThrottling: false, // no frenar timers/render en segundo plano
    },
  });

  if (app.isPackaged) {
    Menu.setApplicationMenu(null);
  }

  if (isDev) {
    mainWindow.loadURL('http://localhost:5174/restaurante/');
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    cargarPanel();
  }

  // Auto-recuperación: si el renderer/GPU se cae o se congela, recargar
  // en vez de quedar en pantalla negra.
  // Debounce: si varios eventos (crash, no-responde, fallo de carga) se disparan
  // casi a la vez, evitamos recargar en avalancha.
  let ultimaRecarga = 0;
  const recargarSiVivo = () => {
    const ahora = Date.now();
    if (ahora - ultimaRecarga < 3000) return;
    ultimaRecarga = ahora;
    if (mainWindow && !mainWindow.isDestroyed()) {
      try { mainWindow.webContents.reload(); } catch (e) { /* noop */ }
    }
  };
  let congelado = 0;
  let muertes = 0, muertesT = 0;
  mainWindow.webContents.on('responsive', () => { congelado = 0; });
  mainWindow.webContents.on('render-process-gone', async (_e, details) => {
    const reason = details && details.reason;
    console.error('[electron] render-process-gone:', reason);
    const ahora = Date.now();
    if (ahora - muertesT < 60000) muertes++; else { muertes = 1; muertesT = ahora; }
    await drenarRed();
    if (muertes >= 2 || reason === 'oom' || reason === 'launch-failed') { reiniciarApp('render-process-gone x' + muertes); return; }
    recargarSiVivo();
  });
  mainWindow.webContents.on('unresponsive', async () => {
    congelado++;
    console.warn('[electron] no responde (episodio ' + congelado + ') → drenar + recargar');
    await drenarRed();
    try { mainWindow.webContents.reloadIgnoringCache(); } catch (e) {}
    // Si en 12s no volvió a 'responsive' o ya van 2+ episodios → proceso nuevo.
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed() && congelado >= 2) reiniciarApp('unresponsive persistente');
    }, 12000);
  });
  mainWindow.webContents.on('did-fail-load', (_e, code, desc, _url, esMainFrame) => {
    if (code === -3) return; // carga abortada, ignorar
    if (esMainFrame === false) return; // solo el frame principal (no un asset)
    if (!isDev) {
      // La web no cargó (sin internet / hosting caído): pantalla "Conectando…"
      // que reintenta sola y vuelve al panel en cuanto haya red.
      console.warn('[electron] web no disponible (', code, desc, ') → pantalla offline');
      mostrarOffline();
      return;
    }
    console.warn('[electron] did-fail-load', code, desc, '— reintentando en 2s');
    setTimeout(recargarSiVivo, 2000);
  });

  // Recuperación al DESPERTAR la PC (suspensión, hibernación o "modern standby"):
  // al volver, el WebSocket de realtime y los sockets HTTP quedan muertos, y en
  // escritorio el renderer NO recibe ningún evento de visibilidad que dispare la
  // reconexión (a diferencia de Android). Sin esto el panel se queda mostrando
  // ventas viejas / vacías y "sin conexión" hasta que cierran y reabren.
  // En vez de RECARGAR (que cortaría una alarma sonando y el audio), le pedimos
  // al renderer una reconexión SUAVE: disparamos en el mundo de la página el
  // mismo evento 'online' que ya escuchan los hooks → recrean canales realtime y
  // recargan datos sin perder estado. Esperamos unos segundos a que la red/DHCP
  // vuelva tras el wake. Debounce para no repetir.
  let despertarProgramado = false;
  powerMonitor.on('resume', () => {
    if (despertarProgramado) return;
    despertarProgramado = true;
    console.log('[electron] la PC despertó → drenar red + resucitar socket en 6s');
    setTimeout(async () => {
      despertarProgramado = false;
      if (!mainWindow || mainWindow.isDestroyed()) return;
      try {
        // Drenar el pool envenenado (sockets zombis tras dormir) + caché DNS.
        await mainWindow.webContents.session.closeAllConnections();
        await mainWindow.webContents.session.clearHostResolverCache();
      } catch (e) { console.warn('[resume] drenar red', e); }
      // Resucitar el WebSocket de Supabase y recargar datos (sin recargar la
      // página → no corta una alarma sonando). Si no existe la función, cae al
      // evento 'online' que ya escuchan los hooks.
      mainWindow.webContents
        .executeJavaScript("(window.dewanResucitar ? window.dewanResucitar() : window.dispatchEvent(new Event('online')))")
        .catch(() => {});
    }, 6000);
  });

  // ── WATCHDOG del proceso principal ────────────────────────────────────
  // Su setInterval corre en el event loop del MAIN (no en el renderer), así que
  // sigue vivo aunque el renderer esté 100% congelado. El renderer late cada 5s.
  //  >45s sin latido → drenar pool + recargar (suave).
  //  >90s sin latido → app.relaunch() = "cerrar y reabrir" automático.
  ultimoLatido = Date.now();
  let ultimaRecargaWd = 0;
  const watchdog = setInterval(async () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (!latidoVisto) return; // web sin latido (versión vieja) o recién montando → no escalar (evita bucle)
    const dt = Date.now() - ultimoLatido;
    if (dt > 90000) { clearInterval(watchdog); reiniciarApp('watchdog ' + dt + 'ms sin latido'); return; }
    if (dt > 45000 && Date.now() - ultimaRecargaWd > 30000) {
      ultimaRecargaWd = Date.now();
      console.warn('[watchdog] ' + dt + 'ms sin latido → drenar + recargar');
      await drenarRed();
      try { mainWindow.webContents.reloadIgnoringCache(); } catch (e) {}
    }
  }, 10000);
  // Tras cada carga (incl. recargas) reseteamos el latido para no relanzar mientras el renderer remonta.
  mainWindow.webContents.on('did-finish-load', () => { ultimoLatido = Date.now(); latidoVisto = false; });
  mainWindow.on('closed', () => { try { clearInterval(watchdog); } catch (e) {} });

  powerSaveId = powerSaveBlocker.start('prevent-display-sleep');
  console.log('[electron] powerSaveBlocker started, id=', powerSaveId, 'active=', powerSaveBlocker.isStarted(powerSaveId));

  mainWindow.on('closed', () => {
    if (powerSaveId !== null && powerSaveBlocker.isStarted(powerSaveId)) {
      powerSaveBlocker.stop(powerSaveId);
    }
    // Sin ventana principal no hay quien espere una impresión pendiente:
    // destruir las ocultas para que 'window-all-closed' pueda cerrar la app.
    for (const w of ventanasImpresion) { try { w.destroy(); } catch (e) {} }
    ventanasImpresion.clear();
    mainWindow = null;
  });
}

ipcMain.handle('notify-order', (_event, { title, body }) => {
  if (Notification.isSupported()) {
    const n = new Notification({
      title: title || 'Nuevo pedido',
      body: body || 'Tienes un nuevo pedido en DEWAN',
      urgency: 'critical',
    });
    n.show();
    n.on('click', () => {
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }
    });
    return true;
  }
  return false;
});

// Recuperar la red SIN reiniciar la app: drena el pool de sockets TCP/WebSocket
// y la caché DNS de Chromium. ESTO es lo que `window.location.reload()` NO hace
// (el pool vive en el proceso, no en la página) y por lo que antes "solo cerrar
// y reabrir" revivía la app. Tras drenar, el realtime y los fetch abren sockets
// NUEVOS. Es seguro: no toca sesión ni localStorage.
ipcMain.handle('recuperar-red', async () => {
  try {
    if (!mainWindow || mainWindow.isDestroyed()) return false;
    const ses = mainWindow.webContents.session;
    await ses.closeAllConnections();
    await ses.clearHostResolverCache();
    return true;
  } catch (e) {
    console.warn('[recuperar-red]', e);
    return false;
  }
});

// ── Impresión de comanda (Electron directo, sin PrintNode) ──────────
// Lista las impresoras instaladas en el SO de esta PC.
ipcMain.handle('listar-impresoras', async () => {
  try {
    if (!mainWindow) return [];
    const printers = await mainWindow.webContents.getPrintersAsync();
    return printers.map((p) => ({
      name: p.name,
      displayName: p.displayName || p.name,
      isDefault: !!p.isDefault,
    }));
  } catch (e) {
    console.warn('[listar-impresoras]', e);
    return [];
  }
});

// Imprime una comanda en silencio. anchoMm = 58/76/80 para rollos; null = A4.
// Las ventanas ocultas pendientes se registran para destruirlas al cerrar la
// app: si quedara una viva (destroy diferido del timeout), 'window-all-closed'
// no dispararía y la app retendría el single-instance lock sin UI.
const ventanasImpresion = new Set();
ipcMain.handle('imprimir-comanda', async (_event, { html, deviceName, anchoMm, usarDefault, liviano }) => {
  let win = null;
  let cerrarLuego = false;
  try {
    win = new BrowserWindow({ show: false, webPreferences: { offscreen: false } });
    ventanasImpresion.add(win);
    win.on('closed', () => ventanasImpresion.delete(win));
    await win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));
    // Esperar fuentes + 2 frames de layout (más fiable que un sleep fijo).
    try {
      await win.webContents.executeJavaScript(
        'document.fonts.ready.then(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))))'
      );
    } catch (e) { await new Promise((r) => setTimeout(r, 220)); }

    // En modo liviano (impresora de impacto) NO imprimimos fondos → menos
    // rasterizado, la impresora no se traba.
    const printOpts = { silent: true, printBackground: !liviano, deviceName: deviceName || '' };

    // Rollo: medir el alto del contenido (incluye el padding-bottom de avance
    // de papel que pone el renderer). OJO: scrollHeight NO sirve — queda
    // "pisado" por la altura del viewport de la ventana oculta (~600px) y cada
    // ticket corto saldría en página de ~15cm. El rect del body mide solo el
    // contenido. Un reintento; si la medición falla, NO adivinamos una altura
    // (cortaría el ticket): caemos al papel del driver.
    let alturaPx = null;
    if (anchoMm) {
      for (let i = 0; i < 2 && alturaPx == null; i++) {
        try {
          alturaPx = await win.webContents.executeJavaScript(
            'Math.ceil(document.body.getBoundingClientRect().height)'
          );
        } catch (e) {
          console.warn('[imprimir-comanda] medición de alto falló (intento ' + (i + 1) + ')', e);
          await new Promise((r) => setTimeout(r, 150));
        }
      }
    }
    if (anchoMm && alturaPx != null) {
      // Rollo (térmica o Epson de impacto): ancho fijo, alto ajustado al contenido.
      // Mínimo 90mm: una página más ancha que alta puede salir rotada a
      // landscape en algunos drivers de Windows (Electron #39702).
      const micronPorPx = 25400 / 96; // ~264.58
      const alturaMicron = Math.max(90000, Math.ceil((Number(alturaPx) + 24) * micronPorPx));
      printOpts.margins = { marginType: 'none' };
      printOpts.pageSize = { width: Math.round(anchoMm * 1000), height: alturaMicron };
    } else if (anchoMm || usarDefault) {
      // "Como la configuró Windows" (o falló la medición): NO forzamos el
      // tamaño (el driver usa su papel), pero SÍ quitamos los márgenes → así
      // no sale papel en blanco de más antes del ticket.
      printOpts.margins = { marginType: 'none' };
    } else {
      // Hoja A4 / Carta.
      printOpts.margins = { marginType: 'none' };
      printOpts.pageSize = 'A4';
    }

    // Promise.race con timeout: si la impresora no responde, igual resolvemos
    // (evita cuelgues). Las de impacto rasterizan por GDI y el spooler puede
    // tardar más de un minuto: al expirar NO matamos la ventana (truncaría el
    // job a medias y provoca reimpresiones dobles) — se destruye sola después.
    const timeoutMs = liviano ? 60000 : 30000;
    const result = await Promise.race([
      new Promise((resolve) => {
        win.webContents.print(printOpts, (success, reason) => resolve({ success, reason }));
      }),
      new Promise((resolve) => setTimeout(() => resolve({ success: false, reason: 'timeout-encolado' }), timeoutMs)),
    ]);
    if (result.reason === 'timeout-encolado') {
      cerrarLuego = true;
      const w = win;
      setTimeout(() => { try { if (w && !w.isDestroyed()) w.destroy(); } catch (e) {} }, 120000);
    }
    return result;
  } catch (e) {
    console.warn('[imprimir-comanda]', e);
    return { success: false, reason: String((e && e.message) || e) };
  } finally {
    if (!cerrarLuego && win && !win.isDestroyed()) { try { win.close(); } catch (e) {} }
  }
});

app.whenReady().then(() => {
  createWindow();

  if (app.isPackaged) {
    app.setLoginItemSettings({ openAtLogin: true });
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
