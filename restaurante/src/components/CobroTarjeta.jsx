import { useEffect, useState } from 'react';
import { estadoStripe, conectarStripe, desconectarStripe, revisarLlave, mensajeErrorStripe } from '../lib/stripeUs';

// Ajustes › Cobro con tarjeta (solo Panel EE.UU., SQL 052).
// El dueño conecta su cuenta de Stripe pegando una llave RESTRINGIDA. La plata de cada pedido entra
// directo a su Stripe; DEWAN no la ve ni la toca. El cobro con tarjeta lo prende DEWAN tras la prueba de $1.

const PASOS = [
  <>Entre a su cuenta en <b>dashboard.stripe.com</b> (si no tiene, créela a nombre del restaurante).</>,
  <>Vaya a <b>Developers → API keys</b> y toque <b>Create restricted key</b>.</>,
  <>En el nombre ponga <b>DEWAN pedidos</b>. Deje todo en <i>None</i> menos estos tres: <b>Checkout Sessions: Write</b> · <b>Refunds: Write</b> · <b>PaymentIntents: Read</b>.</>,
  <>Toque <b>Create key</b>, escriba el código que Stripe le manda al celular y copie la llave (empieza con <b>rk_live_</b>).</>,
  <>Péguela aquí abajo y toque <b>Conectar</b>.</>,
];

function fecha(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleString('es-US', { dateStyle: 'medium', timeStyle: 'short' });
  } catch { return ''; }
}

export default function CobroTarjeta() {
  const [estado, setEstado] = useState(null);      // respuesta de us_stripe_estado
  const [cargando, setCargando] = useState(true);
  const [cambiando, setCambiando] = useState(false); // muestra el formulario aunque ya esté conectado
  const [llave, setLlave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [confirmarQuitar, setConfirmarQuitar] = useState(false);
  const [aviso, setAviso] = useState('');

  const cargar = async () => {
    setCargando(true);
    try { setEstado(await estadoStripe()); setError(''); }
    catch (e) { setError(mensajeErrorStripe(e)); }
    setCargando(false);
  };
  useEffect(() => { cargar(); }, []);

  const conectar = async () => {
    const problema = revisarLlave(llave);
    if (problema) { setError(problema); return; }
    setEnviando(true); setError(''); setAviso('');
    try {
      const nuevo = await conectarStripe(llave);
      setEstado(nuevo); setLlave(''); setCambiando(false);
      setAviso('Listo: su cuenta de Stripe quedó conectada.');
    } catch (e) {
      setError(mensajeErrorStripe(e));
    }
    setEnviando(false);
  };

  const quitar = async () => {
    setEnviando(true); setError(''); setAviso('');
    try {
      setEstado(await desconectarStripe());
      setConfirmarQuitar(false);
      setAviso('Su cuenta de Stripe quedó desconectada. Su página ya no cobra con tarjeta.');
    } catch (e) {
      setError(mensajeErrorStripe(e));
    }
    setEnviando(false);
  };

  const conectado = !!estado?.conectado;
  const mostrarFormulario = !cargando && (!conectado || cambiando);

  return (
    <div className="p-4 space-y-5">
      <div className="space-y-1.5">
        <p className="text-white text-sm font-bold">Los pagos con tarjeta entran directo a su cuenta de Stripe.</p>
        <p className="text-[13px] text-gray-400">
          Stripe cobra la tarjeta y le deposita en su banco (normalmente en 2 días hábiles). DEWAN nunca ve ni toca su plata.
        </p>
      </div>

      {cargando && <p className="text-[13px] text-gray-400">Revisando su conexión…</p>}

      {!cargando && conectado && (
        <div className="rounded-xl border border-green-600/40 bg-green-600/10 p-4 space-y-2">
          <p className="text-white font-bold">✅ Stripe conectado</p>
          <p className="text-[13px] text-gray-300">
            Llave terminada en <span className="font-mono font-bold">••••{estado.termina_en}</span>
            {estado.modo === 'prueba' ? ' · de prueba' : ''}
            {estado.conectado_en ? ` · ${fecha(estado.conectado_en)}` : ''}
          </p>
          {estado.cobro_tarjeta === 'stripe' ? (
            <p className="text-[13px] text-green-400 font-bold">Su página ya cobra con tarjeta.</p>
          ) : (
            <p className="text-[13px] text-amber-300">
              Falta un paso: avísele a David para hacer la prueba de $1. Después de esa prueba, su página empieza a cobrar con tarjeta.
            </p>
          )}
          {!cambiando && !confirmarQuitar && (
            <div className="flex flex-wrap gap-2 pt-1">
              <button onClick={() => { setCambiando(true); setError(''); setAviso(''); }}
                className="rounded-lg border border-borde bg-tarjeta px-3 py-2 text-xs font-bold text-gray-200 active:bg-bg3">
                Cambiar llave
              </button>
              <button onClick={() => { setConfirmarQuitar(true); setError(''); setAviso(''); }}
                className="rounded-lg border border-borde bg-tarjeta px-3 py-2 text-xs font-bold text-gray-200 active:bg-bg3">
                Desconectar
              </button>
            </div>
          )}
          {confirmarQuitar && (
            <div className="rounded-lg border border-nuevo/40 bg-nuevo/10 p-3 space-y-2">
              <p className="text-[13px] text-white">¿Desconectar Stripe? Su página dejará de cobrar con tarjeta hasta que vuelva a conectarla.</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={quitar} disabled={enviando}
                  className="rounded-lg bg-nuevo px-3 py-2 text-xs font-bold text-white disabled:opacity-60">
                  {enviando ? 'Desconectando…' : 'Sí, desconectar'}
                </button>
                <button onClick={() => setConfirmarQuitar(false)} disabled={enviando}
                  className="rounded-lg border border-borde bg-tarjeta px-3 py-2 text-xs font-bold text-gray-200">
                  No, dejarla conectada
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {mostrarFormulario && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              {conectado ? 'Cambiar la llave' : 'Cómo conectar su cuenta'}
            </label>
            <ol className="space-y-2">
              {PASOS.map((p, i) => (
                <li key={i} className="flex gap-3 text-[13px] text-gray-300">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-dewan text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span className="pt-0.5">{p}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-2">
            <label htmlFor="llave-stripe" className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Llave restringida</label>
            <input
              id="llave-stripe"
              type="password"
              autoComplete="off"
              spellCheck={false}
              autoCapitalize="off"
              value={llave}
              onChange={(e) => { setLlave(e.target.value); setError(''); }}
              placeholder="rk_live_…"
              className={`w-full rounded-xl border bg-tarjeta px-3 py-3 font-mono text-sm text-white outline-none focus:border-dewan ${error ? 'border-nuevo' : 'border-borde'}`}
            />
            <p className="text-[11px] text-gray-500">
              Nunca pegue aquí la llave que empieza con <b>sk_live_</b>: esa da acceso a toda su cuenta.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={conectar} disabled={enviando}
              className="rounded-xl bg-dewan px-5 py-3 text-sm font-bold text-white disabled:opacity-60 active:scale-[0.99]">
              {enviando ? 'Conectando…' : 'Conectar'}
            </button>
            {conectado && (
              <button onClick={() => { setCambiando(false); setLlave(''); setError(''); }} disabled={enviando}
                className="rounded-xl border border-borde bg-tarjeta px-4 py-3 text-sm font-bold text-gray-200">
                Cancelar
              </button>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-[13px] text-nuevo font-bold">{error}</p>}
      {aviso && !error && <p className="text-[13px] text-green-400 font-bold">{aviso}</p>}
    </div>
  );
}
