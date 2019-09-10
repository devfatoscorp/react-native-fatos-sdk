package biz.fatos.RCTFatos.FatosJSinterface;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;


public class FatosJSInterface {
    private WebView m_WebView;
    private Activity m_Activity;
    private final Handler handler = new Handler();

    private static Context m_Context;
    private static volatile FatosJSInterface m_JSInterface = null;
    public interface FatosJSListener {
        void OnFatosJSRoute(String strRouteJson);
        void OnFatosJSSetUserInfo(String userID, String tID, String companyID);
        void OnFatosJSPageLoadFinish();

        void OnFatosJSBarcodeEnable(boolean bEnable);
        void OnFatosJSGetBarcodeList(String strBarcodeJson);
    }

    private static FatosJSListener m_FatosJSListener = null;

    public FatosJSListener getM_FatosJSListener() {
        return m_FatosJSListener;
    }

    public void setM_FatosJSListener(FatosJSListener m_FatosJSListener)
    {
        this.m_FatosJSListener = m_FatosJSListener;
    }

    public static void CreateInstance(Context context) {
        if(m_JSInterface == null) {
            synchronized(FatosJSInterface.class) {
                if(m_JSInterface == null)
                {
                    m_Context = context;
                    m_JSInterface = new FatosJSInterface();
                }
            }
        }
    }
    public static FatosJSInterface GetInstance(Context context)
    {
        if(context == null)
            return null;
        m_Context = context;
        CreateInstance(m_Context);
        return m_JSInterface;
    }

    public FatosJSInterface()
    {

    }

    public FatosJSInterface(Context c) {
        m_Context = c;
    }

    public void setWebView(WebView webView)
    {
        this.m_WebView = webView;
    }

    public WebView getWebView()
    {
        return this.m_WebView;
    }

    @JavascriptInterface
    public void OnFatosJSRoute(String strRouteJson) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSRoute(strRouteJson);
    }

    @JavascriptInterface
    public void OnFatosJSSetUserInfo(String userID, String tID, String companyID) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSSetUserInfo(userID, tID, companyID);
    }

    @JavascriptInterface
    public void OnFatosJSPageLoadFinish() {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSPageLoadFinish();
    }

    @JavascriptInterface
    public void OnFatosJSBarcodeEnable(boolean bEnable) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSBarcodeEnable(bEnable);
    }

    @JavascriptInterface
    public void OnFatosJSGetBarcodeList(String strBarcodeJson) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSGetBarcodeList(strBarcodeJson);
    }
}
