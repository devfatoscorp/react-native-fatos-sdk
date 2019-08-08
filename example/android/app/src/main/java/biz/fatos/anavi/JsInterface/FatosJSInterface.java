package biz.fatos.anavi.JsInterface;

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

    public void setM_FatosJSListener(FatosJSListener m_FatosJSListener) {
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
    public FatosJSInterface() {
    }
    // Instantiate the interface and set the context
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

    /**
     *
     * @param strRouteJson : Fatos JS Interface 규격의 경로탐색 json
     */
    @JavascriptInterface
    public void OnFatosJSRoute(String strRouteJson) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSRoute(strRouteJson);
    }


    /**
     * userID : 사용자 아이디
     * tID : 트립 아이디
     * companyID : 사용자 회사 아이디
     */
    @JavascriptInterface
    public void OnFatosJSSetUserInfo(String userID, String tID, String companyID) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSSetUserInfo(userID, tID, companyID);
    }


    /**
     * 첫 페이지 loading 되었을 때 호출.
     */
    @JavascriptInterface
    public void OnFatosJSPageLoadFinish() {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSPageLoadFinish();
    }


    /**
     * web page에서 barcode 활성 여부에 대한 정보
     * @param bEnable true : 활성화 , false : 비활성화
     */
    @JavascriptInterface
    public void OnFatosJSBarcodeEnable(boolean bEnable) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSBarcodeEnable(bEnable);
    }

    /**
     * barcode 정보 리스트를 받는다.
     * @param strBarcodeJson
     */
    @JavascriptInterface
    public void OnFatosJSGetBarcodeList(String strBarcodeJson) {
        if(m_FatosJSListener != null)
            m_FatosJSListener.OnFatosJSGetBarcodeList(strBarcodeJson);
    }
}
