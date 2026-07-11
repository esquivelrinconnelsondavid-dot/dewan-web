package com.dewan.restaurante;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // La alarma de pedidos suena por Web Audio; sin esto el WebView exige un
        // toque del usuario antes de permitir audio y la app muestra la barra
        // "Tocá aquí para activar el sonido" en cada apertura.
        getBridge().getWebView().getSettings().setMediaPlaybackRequiresUserGesture(false);
    }
}
