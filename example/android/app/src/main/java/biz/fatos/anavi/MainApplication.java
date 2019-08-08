package biz.fatos.anavi;

import android.content.Context;
import android.support.multidex.MultiDex;

import com.crashlytics.android.Crashlytics;
import com.facebook.react.ReactApplication;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.burnweb.rnwebview.RNWebViewPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import dk.madslee.imageSequence.RCTImageSequencePackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import io.fabric.sdk.android.Fabric;
import java.util.Arrays;
import java.util.List;

import biz.fatossdk.newanavi.ANaviApplication;

public class MainApplication extends ANaviApplication implements ReactApplication {
  public static final String TAG = "AMAP";
  private Context m_Context;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNI18nPackage(),
            new RNWebViewPackage(),
            new RNCWebViewPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RCTImageSequencePackage(),
            new FastImageViewPackage(), new FatosRNPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);

    m_Context = base;
    MultiDex.install(m_Context);
  }
}
