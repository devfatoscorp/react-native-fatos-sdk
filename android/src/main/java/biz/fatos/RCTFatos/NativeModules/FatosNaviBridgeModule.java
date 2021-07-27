package biz.fatos.RCTFatos.NativeModules;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import biz.fatos.RCTFatos.FatosMapViewManager;
import biz.fatos.RCTFatos.FatosActivity;
import biz.fatos.RCTFatos.FatosWebViewManager;
import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.navi.NativeNavi;
import biz.fatossdk.navi.NaviInterface;
import biz.fatossdk.navi.RouteParam;
import biz.fatossdk.navi.RoutePosition;
import biz.fatossdk.newanavi.ANaviApplication;
import biz.fatossdk.newanavi.manager.AMapPositionManager;
import biz.fatossdk.openapi.Route;
import biz.fatossdk.tts.TTSEngine;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

public class FatosNaviBridgeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext = null;
    private boolean isListener = false;
    private boolean isIndicator = false;
    private static FatosActivity mFatosActivity = null;
    private static FatosNaviBridgeModule _FatosNaviBridgeModule = null;

    public static FatosNaviBridgeModule GetInstance()
    {
        return _FatosNaviBridgeModule;
    }

    public static void setFatosActivity(FatosActivity activity)
    {
        mFatosActivity = activity;
    }

    private Runnable runnableHardwareBackPress = new Runnable() {
        @Override
        public void run() {

            if(mFatosActivity != null)
            {
                mFatosActivity.hardwareBackPress();
            }
        }
    };


    private ANaviApplication m_gApp;

    public static boolean mbln_PermissionCompleteCall = false;

    public final int ROUTE_OPTION1 = 0x01; // 추천1
    public final int ROUTE_OPTION2 = 0x02; // 추천2
    public final int ROUTE_OPTION3 = 0x04; // 고속도로 우선
    public final int ROUTE_OPTION4 = 0x08; // 일반도로 우선
    public final int ROUTE_OPTION5 = 0x0F; // 최단거리
    public final int ROUTE_OPTION6 = 0x20; // 무료도로

    public int[] m_arRouteOption = new int[] {
            ROUTE_OPTION1,
            ROUTE_OPTION3,
            ROUTE_OPTION6
    };

    public int MAX_ROUTE_OPTION = 3;

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

            routeExternal(jsonObject, true);

        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void RouteViapoints(String strJson)
    {
        try {
            JSONObject jsonObject = new JSONObject(strJson);
            routeExternal(jsonObject, true);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void UpdateRouteParam(String strJson)
    {
        try {
            JSONObject jsonObject = new JSONObject(strJson);
            routeExternal(jsonObject, false);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }



    public void routeExternal(JSONObject jsonObject, boolean bRequest)
    {
        try {
            
            Route routeApi = m_gApp.getRouteApiInstance();

            RouteParam param = new RouteParam();

            String startPosName = jsonObject.optString("startPosName","");
            String startLat = jsonObject.getString("startY");
            String startLon = jsonObject.getString("startX");
            String endPosName = jsonObject.optString("endPosName","");
            String goalLat = jsonObject.getString("endY");
            String goalLon = jsonObject.getString("endX");
            JSONArray route_option = jsonObject.optJSONArray("route_option");

            int nServiceType = NativeNavi.nativeClientSiteToServer(m_gApp.getRoutePathInfo().m_nServiceType, false);

            param.ServiceType = nServiceType;
            param.DefaultLanguage = m_gApp.getAppSettingInfo().m_nDefaultLanguage;
            param.reqType = 0;
            param.angle = (int)NativeNavi.nativeMapGetViewAngle(m_gApp.m_MapHandle);
            param.m_nCarHeight = 105;
            param.m_nCarWeight = 290;

            int nSearchOption = 0;

            if(route_option != null)
            {
                for(int i = 0; i < route_option.length(); ++i)
                {
                    nSearchOption = nSearchOption | route_option.optInt(i,0);
                }
            }
            else
            {
                for(int i = 0; i < MAX_ROUTE_OPTION; ++i)
                {
                    nSearchOption = nSearchOption | m_arRouteOption[i];
                }
            }

            param.searchOption = nSearchOption;

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

            st.name = startPosName;
            ed.name = endPosName;

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
                    int nPoiID = node.optInt("nPoiID", -1);
                    int nFloor = node.optInt("nFloor", -1);
                    String poiFlag = node.optString("poiFlag","");

                    String bPassingPoint = node.optString("bPassingPoint","");

                    if(viaName == null || viaName.length() == 0)
                    {
                        viaName = "경유지" + Integer.toString(i);
                    }

                    pos.name = viaName;
                    pos.x = node.getDouble("viaX");
                    pos.y = node.getDouble("viaY");

                    // 방향성 셋팅
                    pos.bDir = bDir;

                    // POI ID
                    if(nPoiID != -1)
                    {
                        pos.nPoiID = nPoiID;
                    }

                    // 층수(1=1층, -2=지하2층, ...)
                    if(nFloor != -1)
                    {
                        pos.nFloor = nFloor;
                    }

                    // POI RPFlag
                    if(poiFlag.length() > 0)
                    {
                        pos.poiFlag = poiFlag;
                    }

                    if(bPassingPoint.compareTo("true") == 0){
                        pos.bPassingPoint = true;
                    } else {
                        pos.bPassingPoint = false;
                    }

                    if(pos.x == 0 || pos.y == 0)
                        break;

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

            int iret = 1;
            if(bRequest){
                iret = NativeNavi.nativeRequestRoute(false, param);
             } else {
                // 경탐 요청 하는 것이 아니라 경유지 목록 등을 업데이트 한다.
                iret = NativeNavi.nativeUpdateRouteParam(param);
            }
            if( iret != 1 ){
                RouteResultListener(0, iret);
                // return -78; (인증실패 )
                // return -10; (인스턴스 없음.)
                // return -11; (라파메터 입력 오류)
                // return -12; (이미 요청큐에 있음 : 로컬 모드일 경우 )
                // return -13; (이미 요청큐에 있음 : 통신 모드일 경우 )
            }

        } catch (JSONException e) {
            e.printStackTrace();
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
    public void StartSimulation(int value) {

        if (NativeNavi.nativeIsRoute())
        {
            NativeNavi.nativeStartSimulationIndex(value);
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
        RouteResultListener(0, 0);
    }

    @ReactMethod
    public void Search(final String searchText) {

        ShowIndicatorListener();

        Thread th = new Thread(new Runnable() {
            @Override
            public void run() {

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

                HideIndicatorListener();
            }
        });

        th.start();
    }


    @ReactMethod
    public void SearchSort(final String searchText, final int option) {

        ShowIndicatorListener();

        Thread th = new Thread(new Runnable() {
            @Override
            public void run() {

                JSONObject obj = new JSONObject();

                try {

                    obj.put("kwd", searchText); // 1.28516, 103.84738
                    obj.put("cx", AMapPositionManager.getCurrentLonX());
                    obj.put("cy", AMapPositionManager.getCurrentLatY());
                    obj.put("stype", 0);
                    obj.put("sort", option);


                    String strResult = NaviInterface.Search(obj.toString(), true);
                    SearchResultListener(strResult);

                } catch (JSONException e) {
                    e.printStackTrace();
                }

                HideIndicatorListener();
            }
        });

        th.start();
    }


    @ReactMethod
    public void SearchParam(final String strParam) {

        ShowIndicatorListener();

        Thread th = new Thread(new Runnable() {
            @Override
            public void run() {

                String strResult = NaviInterface.Search(strParam, true);
                SearchResultListener(strResult);
                HideIndicatorListener();
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
    public void AndroidBackPress()
    {
        runOnUiThread(runnableHardwareBackPress);
    }


    @ReactMethod
    public void SpeakUtterance(String strSpeech)
    {
        if(TTSEngine.getInstance()!= null && !TTSEngine.getInstance().isSpeaking())
        {
            TTSEngine.getInstance().NativeSpeak(strSpeech);
        }
    }

    @ReactMethod
    public void RequestPermissionsListener()
    {

        if(mFatosActivity != null)
        {
            mFatosActivity.initFatosNaviEngine();
        }
    }

    /** callback **/
    @ReactMethod
    public void GetRouteSummaryJson(Callback callback) {

        String summaryJson = NativeNavi.GetRouteSummaryJson();;
        callback.invoke(null, summaryJson);
    }


    @ReactMethod
    public void GetIsPermission(Callback callback) {

        String strResult = "0";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
        {
            int permissionResultWRITE_EXTERNAL_STORAGE = mContext.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            int permissionResultACCESS_FINE_LOCATION = mContext.checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION);
            int permissionResultACCESS_READ_PHONE= mContext.checkSelfPermission(Manifest.permission.READ_PHONE_STATE);

            if (permissionResultWRITE_EXTERNAL_STORAGE == PackageManager.PERMISSION_DENIED
                    || permissionResultACCESS_FINE_LOCATION == PackageManager.PERMISSION_DENIED
                    || permissionResultACCESS_READ_PHONE == PackageManager.PERMISSION_DENIED) {

                strResult = "0";
            }
            else {
                strResult = "1";
            }
        }
        else {
            strResult = "1";
        }

        callback.invoke(null, strResult);
    }

    @ReactMethod
    public void GetLastLocation(Callback callback)
    {
        int x = AMapPositionManager.m_nWSaveLonX;
        int y = AMapPositionManager.m_nWSaveLatY;

        double[] lonlat = new double[2];
        lonlat[0] = 0;
        lonlat[1] = 0;

        if(x > 0 && y > 0) {
            NativeNavi.nativeConvWorldtoWGS84(x, y, lonlat);
        }

        String strResult = "";

        JSONObject object = new JSONObject();
        try {
            object.put("xlon", lonlat[0]);
            object.put("ylat", lonlat[1]);
            strResult = object.toString();
        } catch (JSONException e) {
            e.printStackTrace();
        }

        callback.invoke(null, strResult);
    }

    @ReactMethod
    public void GetCurrentPosition(Callback callback)
    {
        Location location = m_gApp.getLastLocationEvent();
        WritableMap writableMap = FatosNaviBridgeModule.locationToMap(location);
        callback.invoke(null, writableMap);
    }


    @ReactMethod
    public void GetGeoCodeString(double lon, double lat, Callback callback)
    {
        String strResult = NativeNavi.nativeGetGeoCodeString(lon,lat);
        callback.invoke(null, strResult);
    }

    public void UpdateRGListener(String strJson) {

        if(isListener) {
            sendEvent(getReactApplicationContext(), "UpdateRGListener", strJson);
        }
    }

    public void RouteResultListener(int routeType, int ierror)
    {
        if(isListener) {

            String msg = "";

            if(ierror != 0) {
                msg = NativeNavi.nativeRouteErrorCodeString(ierror, 0);
            }

            WritableMap content = Arguments.createMap();
            content.putInt("type", routeType);
            content.putInt("error", ierror);
            content.putString("msg", msg);
            sendEvent(getReactApplicationContext(), "RouteResultListener", content);
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

    public void RouteCompleteListener()
    {
        if(isListener) {
            sendEvent(getReactApplicationContext(), "RouteCompleteListener", "");
        }
    }

    public void ViaCompleteListener(String strResult)
    {
        if(isListener) {
            sendEvent(getReactApplicationContext(), "ViaCompleteListener", strResult);
        }
    }

    public void InitializeStatusListener(int status, String value)
    {
        if(isListener) {

            WritableMap content = Arguments.createMap();
            content.putInt("status", status);
            content.putString("value", value);
            sendEvent(getReactApplicationContext(), "InitializeStatusListener", content);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, Object content) {
        mContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, content);
    }

    public static WritableMap locationToMap(Location location) {

        if(location == null)
            return null;

        WritableMap map = Arguments.createMap();
        WritableMap coords = Arguments.createMap();

        coords.putDouble("latitude", location.getLatitude());
        coords.putDouble("longitude", location.getLongitude());
        coords.putDouble("altitude", location.getAltitude());
        coords.putDouble("accuracy", location.getAccuracy());
        coords.putDouble("heading", location.getBearing());
        coords.putDouble("speed", location.getSpeed());
        map.putMap("coords", coords);
        map.putDouble("timestamp", location.getTime());

        if (Build.VERSION.SDK_INT >= 18) {
            map.putBoolean("mocked", location.isFromMockProvider());
        }

        return map;
    }
}
