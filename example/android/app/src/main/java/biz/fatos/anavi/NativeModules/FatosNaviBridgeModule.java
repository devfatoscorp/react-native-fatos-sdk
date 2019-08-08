package biz.fatos.anavi.NativeModules;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import biz.fatos.anavi.FatosMapViewManager;
import biz.fatos.anavi.FatosWebViewManager;
import com.facebook.react.bridge.Callback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;


import biz.fatossdk.config.ErrorMessage;
import biz.fatossdk.config.FatosBuildConfig;
import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.fminterface.FMBaseActivity;
import biz.fatossdk.fminterface.FMError;
import biz.fatossdk.navi.NativeNavi;
import biz.fatossdk.navi.NaviInterface;
import biz.fatossdk.navi.RouteGuidanceInfo;
import biz.fatossdk.navi.RouteParam;
import biz.fatossdk.navi.RoutePoi;
import biz.fatossdk.navi.RoutePosition;
import biz.fatossdk.navi.rgdata.RgDataContext;
import biz.fatossdk.newanavi.ANaviApplication;
import biz.fatossdk.newanavi.list.poiDataItemDetailList;
import biz.fatossdk.newanavi.manager.AMapPositionManager;
import biz.fatossdk.newanavi.splash.FatosToast;
import biz.fatossdk.openapi.Route;
import biz.fatossdk.openapi.common.POIItem;
import biz.fatossdk.openapi.common.PathPointInfo;

import static biz.fatossdk.newanavi.manager.AMapPositionManager.eRpSrc_Fatos;
import static biz.fatossdk.newanavi.manager.AMapPositionManager.eRpSrc_Naver;
import static biz.fatossdk.newanavi.manager.AMapPositionManager.eRpSrc_Tmap;
import static biz.fatossdk.newanavi.manager.AMapPositionManager.eRpSrc_Tmap_MultiLanguage;
import static biz.fatossdk.newanavi.setting.saveSettingInfoList.ROUTE_LOCAL;
import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class FatosNaviBridgeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext = null;
    private boolean isListener = false;
    private boolean isIndicator = false;
    private static FatosNaviBridgeModule _FatosNaviBridgeModule = null;

    public static FatosNaviBridgeModule GetInstance()
    {
        return _FatosNaviBridgeModule;
    }

    private ANaviApplication m_gApp;

    public static boolean mbln_PermissionCompleteCall = false;

    @Override
    public String getName() {
        return "FatosNaviBridgeModule";
    }

    public FatosNaviBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _FatosNaviBridgeModule = this;
        mContext = reactContext;
        m_gApp = (ANaviApplication) reactContext.getApplicationContext();
    }

    @ReactMethod
    public void setListener(String value) {

        if(value.equals("1"))
        {
            isListener = true;
        }

        if(mbln_PermissionCompleteCall == true)
        {
            PermissionCompleteListener();
        }
    }

    @ReactMethod
    public void Rescan() {

        NativeNavi.nativeRequestReRoute();

    }


    @ReactMethod
    public void Route(String startLat, String startLon, String goalLat, String goalLon) {

        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("startPosName", "출발지");
            jsonObject.put("endPosName", "도착지");
            jsonObject.put("startX", startLon);
            jsonObject.put("startY", startLat);
            jsonObject.put("endX", goalLon);
            jsonObject.put("endY", goalLat);

            routeExternal(jsonObject);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }


    public void routeExternal(JSONObject jsonObject)
    {
        try {

            Route routeApi = m_gApp.getRouteApiInstance();

            RouteParam param = new RouteParam();

            String startLat = jsonObject.getString("startY");
            String startLon = jsonObject.getString("startX");
            String goalLat = jsonObject.getString("endY");
            String goalLon = jsonObject.getString("endX");

            int nServiceType = 0;

            if(m_gApp.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_SLA)
            {
                nServiceType = RouteParam.SS_FATOS_SERVER;
            }
            else
            {
                nServiceType = RouteParam.SS_TOP2_SERVER;
            }

            param.ServiceType = nServiceType;
            param.DefaultLanguage = m_gApp.getAppSettingInfo().m_nDefaultLanguage;
            param.reqType = 0;
            param.angle = (int)NativeNavi.nativeMapGetViewAngle(m_gApp.m_MapHandle);
            param.m_nCarHeight = 105;
            param.m_nCarWeight = 290;
            param.searchOption = 41;

            // 기본경로 탐색 셋팅
            String strFeeOption = "";
            ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getNavigationOptions();

            for(int i = 0; i < arr.size(); ++i)
            {
                Boolean val = arr.get(i);

                if(val)
                {
                    strFeeOption += m_gApp.getAppSettingInfo().m_arFeeOption[i];
                }
            }

            param.feeOption = Integer.parseInt(strFeeOption);
            // 하이패스
            param.hipass = (FatosEnvironment.sharedObject().getHipass() == true) ? 1 : 0;
            // 차종
            param.carType = FatosEnvironment.sharedObject().getCarType();
            // 유종
            int nFuel = FatosEnvironment.sharedObject().getFuel();
            if(nFuel == 4)
            {
                nFuel = 0;
            }
            param.oilInfo = nFuel;


            RoutePosition st = new RoutePosition();
            RoutePosition ed = new RoutePosition();

            if(startLat.compareTo("0") == 0 || startLon.compareTo("0") == 0)
            {
                st.x = AMapPositionManager.getCurrentLonX();
                st.y = AMapPositionManager.getCurrentLatY();
            }
            else
            {
                st.x = Double.parseDouble(startLon);
                st.y = Double.parseDouble(startLat);
                // 출발지가 있으면 각도를 넘기지 않는다
                param.angle = -1;
            }

            ed.x = Double.parseDouble(goalLon);
            ed.y = Double.parseDouble(goalLat);

            param.posList.add(st);

            boolean bDir = FatosEnvironment.sharedObject().getWayPoint() == 0 ? true : false;
            JSONArray jsonArr = jsonObject.optJSONArray("viapoints");

            if(jsonArr != null)
            {
                for(int i = 0; i < jsonArr.length(); ++i)
                {
                    RoutePosition pos = new RoutePosition();

                    JSONObject node = jsonArr.getJSONObject(i);
                    String viaName = node.getString("viaName");

                    if(viaName == null || viaName.length() == 0)
                    {
                        viaName = "경유지" + Integer.toString(i);
                    }

                    pos.name = viaName;
                    pos.x = node.getDouble("viaX");
                    pos.y = node.getDouble("viaY");

                    // 방향성 셋팅
                    pos.bDir = bDir;

                    if(pos.x == 0 || pos.y == 0)
                        break;;

                    param.posList.add(pos);
                }
            }

            param.posList.add(ed);

            double carWeight = jsonObject.optDouble("carWeight", 0.0f);;
            double carLength = jsonObject.optDouble("carLength", 0.0f);;
            double carHeight = jsonObject.optDouble("carHeight", 0.0f);;

            // x.y 주의 할것
            AMapPositionManager.setStartFlagYX(Double.toString(st.x),Double.toString(st.y));
            AMapPositionManager.setGoalYX(Double.toString(ed.y),Double.toString(ed.x));

            routeApi.RequestRoute(param);

        } catch (JSONException e) {
            e.printStackTrace();
            Log.d("simsimsim", "JSONException : " + e);
        }
    }

    @ReactMethod
    public void RouteTest1() {

        Route("0","0,","37.290830", "127.050956");
    }

    @ReactMethod
    public void RouteTest2() {

        Route("0", "0", "37.565069", "126.987262");
    }

    @ReactMethod
    public void RouteTest3() {

        Route("0", "0", "37.291737", "127.050682");
    }

    @ReactMethod
    public void CancelRoute() {

        FatosMapViewManager.onStartGoalSet(0, 0,null, 0, 0, null);

        NativeNavi.nativeStopSimulation();
        NativeNavi.nativeCancelRoute();
        NativeNavi.nativeStartAndoGuidance();
    }

    @ReactMethod
    public void CancelDriving() {

        FatosWebViewManager webViewManager = FatosWebViewManager.GetInstance();

        if(webViewManager != null)
        {
            webViewManager.setWebViewVisible(true);
        }

    }

    @ReactMethod
    public void GoTask() {

        FatosWebViewManager webViewManager = FatosWebViewManager.GetInstance();

        if(webViewManager != null)
        {
            webViewManager.taskWindowOpen();
        }
    }

    @ReactMethod
    public void StartSimulation() {

        if (NativeNavi.nativeIsRoute())
        {
            NativeNavi.nativeStartSimulation();
        }
    }

    @ReactMethod
    public void DriveControl(int value) {

        if(value == 0)
        {
            NativeNavi.nativePauseSimulation();
        }
        else
        {
            NativeNavi.nativeResumeimulation();
        }
    }

    @ReactMethod
    public void DriveSpeed(int value) {

        NativeNavi.nativeSetSimulationSpeed(value);
    }

    @ReactMethod
    public void DriveClose() {

        NativeNavi.nativeStopSimulation();
        NativeNavi.nativeStartAndoGuidance();
        // 0번이 초기 재탐색
        RouteResultListener(0);
    }

    @ReactMethod
    public void Search(String searchText) {

        ShowIndicatorListener();

        Thread th = new Thread(new Runnable() {
            @Override
            public void run() {

                HideIndicatorListener();

                JSONObject obj = new JSONObject();

                try {

                    obj.put("kwd", searchText); // 1.28516, 103.84738
                    obj.put("cx", AMapPositionManager.getCurrentLonX());
                    obj.put("cy", AMapPositionManager.getCurrentLatY());
                    obj.put("stype", 0);

                    String strResult = NaviInterface.Search(obj.toString(), true);
                    SearchResultListener(strResult);

                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

        th.start();
    }

    @ReactMethod
    public void StartRouteGuidance(int index)
    {
        NativeNavi.nativeStartRouteGuidanceIndex(index);
    }

    @ReactMethod
    public void StartSimulation(int index)
    {
        NativeNavi.nativeStartSimulationIndex(index);
    }


    /** callback **/
    @ReactMethod
    public void GetRouteSummaryJson(Callback callback) {

        String summaryJson = NativeNavi.GetRouteSummaryJson();;
        callback.invoke(null, summaryJson);
    }

    public void UpdateRGListener(String strJson) {

        if(isListener) {
            sendEvent(getReactApplicationContext(), "UpdateRGListener", strJson);
        }
    }

    public void RouteResultListener(int routeType)
    {
        if(isListener) {
            String strResult = Integer.toString(routeType);
            sendEvent(getReactApplicationContext(), "RouteResultListener", strResult);
        }
    }

    public void ShowIndicatorListener() {

        if(isListener) {

            isIndicator = true;
            sendEvent(getReactApplicationContext(), "ShowIndicatorListener", "");
        }
    }

    public void HideIndicatorListener() {

        if(isListener) {
            isIndicator = false;
            sendEvent(getReactApplicationContext(), "HideIndicatorListener", "");
        }
    }

    public boolean IsIndicator()
    {
        return isIndicator;
    }

    public void ShowWebViewListener()
    {
        if(isListener) {
            sendEvent(getReactApplicationContext(), "ShowWebViewListener", "");
        }
    }

    public void HideWebViewListener()
    {
        if(isListener) {
            sendEvent(getReactApplicationContext(), "HideWebViewListener", "");
        }
    }

    public void PermissionCompleteListener()
    {
        // app js 에서 처리
        if(isListener)
        {
            sendEvent(getReactApplicationContext(), "PermissionCompleteListener", "");
        }
    }

    public void SearchResultListener(String strResult) {

        if(isListener) {
            sendEvent(getReactApplicationContext(), "SearchResultListener", strResult);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, String content) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, content);
    }
}
