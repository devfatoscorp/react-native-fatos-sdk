package biz.fatos.anavi;

import android.content.Context;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import biz.fatos.anavi.JsInterface.FatosJSInterface;
import biz.fatos.anavi.NativeModules.FatosNaviBridgeModule;

import org.json.JSONException;
import org.json.JSONObject;

import javax.annotation.Nonnull;

import biz.fatossdk.newanavi.ANaviApplication;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class FatosWebViewManager extends SimpleViewManager<View>
{
    protected static final String REACT_CLASS = "FatosWebView";
    private static WebView m_WebView = null;
    private FatosJSInterface m_JSInterface;
    private Context m_Context;

    private static FatosWebViewManager _FatosWebViewManager = null;

    public static FatosWebViewManager GetInstance()
    {
        return _FatosWebViewManager;
    }

    private Runnable runnableWebViewShow = new Runnable() {
        @Override
        public void run() {

            if(m_WebView != null)
            {
                m_WebView.setVisibility(View.VISIBLE);
            }
        }
    };

    private Runnable runnableWebViewHide = new Runnable() {
        @Override
        public void run() {

            if(m_WebView != null)
            {
                m_WebView.setVisibility(View.GONE);
            }
        }
    };

    private Runnable runnableTaskWindowOpen = new Runnable() {
        @Override
        public void run() {

            if(m_WebView != null)
            {
                m_WebView.loadUrl("javascript:taskWindowOpen('" + "1" + "')");
            }
        }
    };

    @Nonnull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {

        _FatosWebViewManager = this;
        m_Context = reactContext;

        // 웹뷰를 재생성 하지 않고 Visible 처리시에서
        // 이전 페이지를 유지할수 있도록
        // static 변수로 관리
        if(m_WebView == null)
        {
            m_WebView = new WebView(reactContext);

            ANaviApplication.setWebView(m_WebView);

            m_WebView.setWebViewClient(new WebViewClient());
            m_WebView.clearCache(true);
            m_WebView.clearHistory();
            m_WebView.clearSslPreferences();
            m_WebView.loadUrl("http://example");
            m_WebView.addJavascriptInterface(FatosJSInterface.GetInstance(reactContext), "FatosJSInterface");

            WebSettings webSettings = m_WebView.getSettings();
            webSettings.setJavaScriptEnabled(true);

            // 웹뷰 생성시 로딩 처리
            FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

            if(module != null)
            {
                module.ShowIndicatorListener();
            }

            m_WebView.setWebViewClient(new WebViewClient() {

                public void onPageFinished(WebView view, String url) {

                    // 웹뷰 생성후 로딩창 제거
                    FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

                    if(module != null)
                    {
                        module.HideWebViewListener();
                    }
                }
            });
        }

        setFatosJSListener();

        //Todo: mlocalBroadcastManager.unregisterReceiver(mLocalBroadcastReceiver);를 어디에서 해줘야 하나

        return m_WebView;
    }

    public void setWebViewVisible(boolean bVisible)
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

        if(module != null)
        {
            if(bVisible == true)
            {
                module.ShowWebViewListener();
            }
            else
            {
                module.HideWebViewListener();
            }
        }

        if(bVisible == true)
        {
            runOnUiThread(runnableWebViewShow);
        }
        else
        {
            runOnUiThread(runnableWebViewHide);
        }
    }

    public void taskWindowOpen()
    {
        runOnUiThread(runnableTaskWindowOpen);
        setWebViewVisible(true);
    }

    private void setFatosJSListener()
    {
        m_JSInterface = FatosJSInterface.GetInstance(m_Context);
        m_JSInterface.setM_FatosJSListener(new FatosJSInterface.FatosJSListener() {
            @Override
            public void OnFatosJSRoute(String strRouteJson) {

                setWebViewVisible(false);

                FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

                if(module != null)
                {
                    JSONObject object = null;
                    String Lat;
                    String Lon;

                    try {
                        object = new JSONObject(strRouteJson);
                        Lat = object.getString("endY");
                        Lon = object.getString("endX");

                        module.Route("0","0", Lat, Lon);
                    }
                    catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }

            @Override
            public void OnFatosJSSetUserInfo(String userID, String tID, String companyID) {


            }

            @Override
            public void OnFatosJSPageLoadFinish() {

            }

            @Override
            public void OnFatosJSBarcodeEnable(boolean bEnable) {


            }

            @Override
            public void OnFatosJSGetBarcodeList(String strBarcodeJson) {

            }
        });
    }


}
