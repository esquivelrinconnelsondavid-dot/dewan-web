package com.dewan.restaurante;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.ViewGroup;
import android.webkit.RenderProcessGoneDetail;
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
}
