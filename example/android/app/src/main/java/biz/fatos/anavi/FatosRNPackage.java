package biz.fatos.anavi;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import biz.fatos.anavi.NativeModules.FatosEnvBridgeModule;
import biz.fatos.anavi.NativeModules.FatosMapViewBridgeModule;
import biz.fatos.anavi.NativeModules.FatosNaviBridgeModule;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Nonnull;

public class FatosRNPackage implements ReactPackage {
    @Nonnull
    @Override
    public List<NativeModule> createNativeModules(@Nonnull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new FatosMapViewBridgeModule(reactContext));
        modules.add(new FatosNaviBridgeModule(reactContext));
        modules.add(new FatosEnvBridgeModule(reactContext));
        return modules;
    }

    @Nonnull
    @Override
    public List createViewManagers(@Nonnull ReactApplicationContext reactContext) {
        return Arrays.asList(new FatosMapViewManager(),
                new FatosWebViewManager());
    }
}
