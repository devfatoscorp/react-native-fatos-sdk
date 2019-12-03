package biz.fatos.RCTFatos.NativeModules;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import biz.fatossdk.config.PreferencesUtil;

public class FatosNativeBridgeModule extends ReactContextBaseJavaModule {

    private Context mContext;
    @Override
    public String getName() {
        return "FatosNativeBridgeModule";
    }

    public FatosNativeBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        mContext = reactContext;
    }

    @ReactMethod
    public void SetUserDefaults(String strKey, String strValue)
    {
        PreferencesUtil.setPreferencesString(mContext, strKey, strValue);
    }

    @ReactMethod
    public void goURL(String url)
    {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setData(Uri.parse(url));

        mContext.startActivity(intent);
    }

    @ReactMethod
    public void GetUserDefaults(String strKey, Callback callback) {

        String strResult = PreferencesUtil.getPreferencesString(mContext, strKey);
        callback.invoke(null, strResult);
    }
}
