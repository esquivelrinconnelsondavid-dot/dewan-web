package com.dewan.restaurante;

import android.os.Build;
import android.os.Bundle;
import android.os.SystemClock;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.ValueCallback;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.WebViewListener;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // La alarma de pedidos suena por Web Audio; sin esto el WebView exige un
        // toque del usuario antes de permitir audio y la app muestra la barra
        // "Tocá aquí para activar el sonido" en cada apertura.
        getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);

        // Watchdog del renderer (Android 8+): cuando el sistema mata el proceso del
        // WebView (ahorro de memoria/batería con la app en background), la vista queda
        // congelada en el último frame y ningún window.location.reload() del JS puede
        // revivirla — el local ve una app "que no abre" hasta matarla en recientes.
        // Acá descartamos el WebView muerto y recreamos la Activity, que monta un
        // Bridge + WebView frescos y recarga la app sola.
        getBridge().addWebViewListener(new WebViewListener() {
            @Override
            public boolean onRenderProcessGone(WebView webView, RenderProcessGoneDetail detail) {
                boolean didCrash = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && detail.didCrash();
                Log.w("DEWAN", "Renderer del WebView muerto (didCrash=" + didCrash + "); recreando Activity");
                try {
                    ViewGroup parent = (ViewGroup) webView.getParent();
                    if (parent != null) {
                        parent.removeView(webView);
                    }
                    webView.destroy();
                } catch (Exception e) {
                    Log.w("DEWAN", "descartando WebView muerto", e);
                }
                runOnUiThread(MainActivity.this::recreate);
                return true; // manejado: que no tumbe el proceso entero de la app
            }
        });
    }

    // ─── Chequeo de vida al volver a primer plano ────────────────────────────
    // onRenderProcessGone solo avisa cuando Android MATA el renderer. Existe el
    // otro caso, el que reportan los locales como "pantalla negra al aceptar":
    // el renderer sigue vivo pero quedó trabado y no pinta nada — la app se ve
    // negra y ningún toque hace nada. Al volver a primer plano le mandamos un
    // ping de JavaScript: si no contesta en 5s, el WebView está inservible y
    // recreamos la Activity (monta un WebView nuevo y recarga la app sola).
    private static final long ESPERA_PING_MS = 5000;
    private static final long CADA_MS = 60000; // no más de un rescate por minuto
    private long ultimoRescate = 0;

    @Override
    public void onResume() {
        super.onResume();
        comprobarWebViewVivo();
    }

    private void comprobarWebViewVivo() {
        final WebView wv = getBridge() != null ? getBridge().getWebView() : null;
        if (wv == null) return;
        final boolean[] contesto = { false };
        try {
            wv.evaluateJavascript("(function(){return 1})()", new ValueCallback<String>() {
                @Override
                public void onReceiveValue(String value) {
                    if ("1".equals(value)) contesto[0] = true;
                }
            });
        } catch (Exception e) {
            Log.w("DEWAN", "no se pudo enviar el ping al WebView", e);
            return;
        }
        wv.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (contesto[0]) return;
                long ahora = SystemClock.elapsedRealtime();
                if (ahora - ultimoRescate < CADA_MS) {
                    Log.w("DEWAN", "WebView sigue sin contestar, pero ya se rescató hace poco");
                    return;
                }
                ultimoRescate = ahora;
                Log.w("DEWAN", "WebView no contesta al volver a primer plano; recreando Activity");
                recreate();
            }
        }, ESPERA_PING_MS);
    }
}
