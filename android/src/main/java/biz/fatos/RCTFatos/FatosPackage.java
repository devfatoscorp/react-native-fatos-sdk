package biz.fatos.RCTFatos;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

import biz.fatos.RCTFatos.NativeModules.FatosEnvBridgeModule;
import biz.fatos.RCTFatos.NativeModules.FatosMapViewBridgeModule;
import biz.fatos.RCTFatos.NativeModules.FatosNativeBridgeModule;
import biz.fatos.RCTFatos.NativeModules.FatosNaviBridgeModule;

public class FatosPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FatosMapViewBridgeModule(reactContext));
        modules.add(new FatosNaviBridgeModule(reactContext));
        modules.add(new FatosEnvBridgeModule(reactContext));
        modules.add(new FatosNativeBridgeModule(reactContext));
        return modules;
    }

    @Nonnull
    @Override
    public List createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Arrays.asList(new FatosMapViewManager(),
                new FatosWebViewManager());
    }
}
