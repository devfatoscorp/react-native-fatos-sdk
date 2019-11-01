package biz.fatos.RCTFatos.NativeModules;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.google.gson.Gson;

import java.util.ArrayList;

import biz.fatos.RCTFatos.FatosMapViewManager;
import biz.fatossdk.config.FatosBuildConfig;
import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.nativeMap.FatosMainMapView;
import biz.fatossdk.navi.NativeNavi;
import biz.fatossdk.navi.NaviDto.DtoBasicReq;
import biz.fatossdk.navi.NaviDto.FuncType;
import biz.fatossdk.navi.NaviInterface;
import biz.fatossdk.newanavi.ANaviApplication;
import biz.fatossdk.newanavi.manager.AMapUtil;
import biz.fatossdk.react.ReactManager;

public class FatosEnvBridgeModule extends ReactContextBaseJavaModule {

    public static boolean[] m_arSDIEnable = new boolean[] {
            true, // 0
            true, // 1
            true, // 2
            true, // 3
            true, // 4
            true, // 5
            true, // 6
            true,   // stationary // 7
            true, // bus-only lane 8
            false, // mobile //9
            false,  // cut in // 10
            true,  // signal violation // 14
            true,  // signal viloation model // 15
            false,  // sharp curve // 31
            false,  // start Children Protection Zone // 33
            false,  // end Children Protectino Zone // 34
            false,  // accident hazard // 30
            true,  // traffic information // 13
            false,  // truck height limit(39) // 18
            false,  // truck weight limit (40) // 19
            false   // truck height, weight limit (41) 20
    };

    public static boolean[] m_arAndoService = new boolean[] {
            true, // stationary // 0
            true, // mobile
            true, // signal violation
            false, // cut in
            false, // parking
            false, // bus-only lane // 5
            false, // sharp curve section
            false, // Children Protection Zone
            false, // accident hazard
            false, // speed bump
            true, // Traffic Information Collection // 10
            false, // tollgate
            false, // rest area // 12
    };

    public static int[] m_arSDIType = new int[] {
            NativeNavi.SDI_CAM_FIXED_DUMMY, // Start with 1 and put in 1부터 시작해서 넣어준다
            NativeNavi.SDI_CAM_FIXED_SPEED,
            NativeNavi.SDI_CAM_FIXED_BUSSPEED,
            NativeNavi.SDI_CAM_FIXED_360,
            NativeNavi.SDI_CAM_FIXED_SECTION,
            NativeNavi.SDI_CAM_FIXED_SECTION_OR_LANE,
            NativeNavi.SDI_CAM_FIXED_LOAD_BAD,
            NativeNavi.SDI_CAM_FIXED_SIGN_UNATTACHED,   // stationary(7)
            NativeNavi.SDI_CAM_FIXED_BUS_LANE, // bus-only lane(8)
            NativeNavi.SDI_CAM_MOVE_ABLE, // mobile (9)
            NativeNavi.SDI_CAM_CUT_IN,  // cut in (10)
            NativeNavi.SDI_CAM_VIOLATION_SIGNAL,  // signal violation (11)
            NativeNavi.SDI_CAM_VIOLATION_SIGNAL_MOCKUP,  // signal viloation model(12)
            NativeNavi.SDI_POINT_SHARP_CURVE,  // sharp curve(13)
            NativeNavi.SDI_POINT_START_PROTECTED_CHILD,  // start Children Protection Zone(14)
            NativeNavi.SDI_POINT_END_PROTECTED_CHILD,  // end Children Protectino Zone(15)
            NativeNavi.SDI_POINT_ACCIDENT,  // accident hazard (16)
            NativeNavi.SDI_DVC_COLLECT_TRAFFIC,  // traffic information (17)
            NativeNavi.SDI_TRUCK_HEIGHT_LIMIT,  // truck height limit(39)
            NativeNavi.SDI_TRUCK_WEIGHT_LIMIT,  // truck weight limit(40)
            NativeNavi.SDI_TRUCK_BOTH_LIMIT  // truck height, weight limit(41)
    };

    private Context m_Context;
    private ANaviApplication m_gApp;

    @Override
    public String getName() {
        return "FatosEnvBridgeModule";
    }

    public FatosEnvBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        m_Context = reactContext;
        m_gApp = (ANaviApplication) m_Context.getApplicationContext();
    }

    /** js -> ios **/
    @ReactMethod
    public void SetLanguage(int value) {

        FatosEnvironment.sharedObject().setLanguage(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        ReactManager.sharedObject().updateLanguage();
    }

    @ReactMethod
    public void SetPathLineColor(int value) {

        FatosEnvironment.sharedObject().setPathLineColor(value);
        FatosEnvironment.sharedObject().saveEnvironment();
        NativeNavi.SetEnvRouteLineColor(ANaviApplication.m_MapHandle, value);
    }

    @ReactMethod
    public void SetNavigationOptions(ReadableArray arr) {

        ArrayList<Boolean> options = new ArrayList();
        for (int i = 0; i < arr.size(); ++i)
        {
            options.add(arr.getBoolean(i));
        }

        FatosEnvironment.sharedObject().setNavigationOptions(options);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetMapColor(int value) {

        FatosEnvironment.sharedObject().setMapColor(value);
        FatosEnvironment.sharedObject().saveEnvironment();
        NativeNavi.nativeMapSetNightMode(value);
    }

    @ReactMethod
    public void SetSmartDrivingMode(boolean value) {

        FatosEnvironment.sharedObject().setSmartDrivingMode(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetCamreaOptions(ReadableArray arr) {

        int start = 0;
        ArrayList<Boolean> options = new ArrayList();

        for (int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.getBoolean(i);
            options.add(val);
            m_arAndoService[start + i] = val;
        }

        FatosEnvironment.sharedObject().setCamera(options);
        FatosEnvironment.sharedObject().saveEnvironment();

        updateSDIInfo();
    }

    @ReactMethod
    public void SetOperationState(ReadableArray arr) {

        int start = 6;
        ArrayList<Boolean> options = new ArrayList();
        for (int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.getBoolean(i);
            options.add(val);
            m_arAndoService[start + i] = val;
        }

        FatosEnvironment.sharedObject().setOperationState(options);
        FatosEnvironment.sharedObject().saveEnvironment();

        updateSDIInfo();
    }

    @ReactMethod
    public void SetFacility(ReadableArray arr) {

        int start = 10;
        ArrayList<Boolean> options = new ArrayList();
        for (int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.getBoolean(i);
            options.add(val);
            m_arAndoService[start + i] = val;
        }

        FatosEnvironment.sharedObject().setFacility(options);
        FatosEnvironment.sharedObject().saveEnvironment();

        updateSDIInfo();
    }

    @ReactMethod
    public void SetGuidevoice(int value) {

        FatosEnvironment.sharedObject().setGuidevoice(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        UseGuideDB(value);
    }

    @ReactMethod
    public void SetRediscover(int value) {

        FatosEnvironment.sharedObject().setRediscover(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        setRouteAutoTime(value);
    }

    @ReactMethod
    public void SetWayPoint(int value) {

        FatosEnvironment.sharedObject().setWayPoint(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetHiPass(boolean value) {

        FatosEnvironment.sharedObject().setHipass(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetCarType(int value) {

        FatosEnvironment.sharedObject().setCarType(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetFuel(int value) {

        FatosEnvironment.sharedObject().setFuel(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetSeatPosition(int value) {

        FatosEnvironment.sharedObject().setSeatPosition(value);
        FatosEnvironment.sharedObject().saveEnvironment();
    }

    @ReactMethod
    public void SetCarvata(int value) {

        FatosEnvironment.sharedObject().setCarvata(value);
        FatosEnvironment.sharedObject().saveEnvironment();
        NativeNavi.nativeMapSetCarvata(ANaviApplication.m_MapHandle,value);
    }

    @ReactMethod
    public void SetDem(boolean value) {

        FatosEnvironment.sharedObject().setDem(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        setDemBaseLayer(value);
    }

    @ReactMethod
    public void SetSimulGps(boolean value) {

        FatosEnvironment.sharedObject().setSimulGps(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        if (value) {
            // 모의위치 모드...
            m_gApp.setLocationMode(m_gApp.LOCATION_MOCK);

            NativeNavi.nativeSetLocationSimulGpsNSaveLog(false,true);

        } else {
            // GPS모드
            m_gApp.setLocationMode(m_gApp.LOCATION_GPS);

            NativeNavi.nativeSetLocationSimulGpsNSaveLog(true,false);

            // GPS 로그 저장.
            m_gApp.setEnableSaveGPSLog(FatosBuildConfig.getSaveGPSLog());
        }
    }

    @ReactMethod
    public void SetAutoCurrentPos(boolean value) {

        FatosEnvironment.sharedObject().setAutoCurrentPos(value);
        FatosEnvironment.sharedObject().saveEnvironment();


        FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();
        if(mapViewManager != null)
        {
            mapViewManager.setAutoCurrentPos(value);
        }
    }

    @ReactMethod
    public void SetDrawGpsPoint(boolean value) {

        FatosEnvironment.sharedObject().setDrawGpsPoint(value);
        FatosEnvironment.sharedObject().saveEnvironment();

        if (value) {

            NativeNavi.nativeNaviStartDrawGpsLog(true,true);
        } else {
            NativeNavi.nativeNaviStopDrawGpsLog();
        }
    }

    /** callback **/
    @ReactMethod
    public void GetLanguage(Callback callback) {

        int nLanguage = FatosEnvironment.sharedObject().getLanguage();
        callback.invoke(null, nLanguage);
    }

    @ReactMethod
    public void GetPathLineColor(Callback callback) {

        int nLanguage = FatosEnvironment.sharedObject().getPathLineColor();
        callback.invoke(null, nLanguage);
    }

    @ReactMethod
    public void GetNavigationOptions(Callback callback) {

        ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getNavigationOptions();
        String json = new Gson().toJson(arr);
        callback.invoke(null, json);
    }

    @ReactMethod
    public void GetMapColor(Callback callback) {

        int nType = FatosEnvironment.sharedObject().getMapColor();
        callback.invoke(null, nType);
    }

    @ReactMethod
    public void GetSmartDrivingMode(Callback callback) {

        boolean bMode = FatosEnvironment.sharedObject().getSmartDrivingMode();
        String str = bMode == true ? "true" : "false";
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetCamreaOptions(Callback callback) {

        ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getCamera();
        String json = new Gson().toJson(arr);
        callback.invoke(null, json);
    }

    @ReactMethod
    public void GetOperationState(Callback callback) {

        ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getOperationState();
        String json = new Gson().toJson(arr);
        callback.invoke(null, json);
    }

    @ReactMethod
    public void GetFacility(Callback callback) {

        ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getFacility();
        String json = new Gson().toJson(arr);
        callback.invoke(null, json);
    }

    @ReactMethod
    public void GetGuidevoice(Callback callback) {

        int nMode = FatosEnvironment.sharedObject().getGuidevoice();
        callback.invoke(null, nMode);
    }

    @ReactMethod
    public void GetRediscover(Callback callback) {

        int nMode = FatosEnvironment.sharedObject().getRediscover();
        callback.invoke(null, nMode);
    }

    @ReactMethod
    public void GetWayPoint(Callback callback) {

        int nMode = FatosEnvironment.sharedObject().getWayPoint();
        callback.invoke(null, nMode);
    }

    @ReactMethod
    public void GetHiPass(Callback callback) {

        Boolean hipass = FatosEnvironment.sharedObject().getHipass();
        String str = hipass == true ? "true" : "false";
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetCarType(Callback callback) {

        int nType = FatosEnvironment.sharedObject().getCarType();
        callback.invoke(null, nType);
    }

    @ReactMethod
    public void GetFuel(Callback callback) {

        int nType = FatosEnvironment.sharedObject().getFuel();
        callback.invoke(null, nType);
    }

    @ReactMethod
    public void GetSeatPosition(Callback callback) {

        int nType = FatosEnvironment.sharedObject().getSeatPosition();
        callback.invoke(null, nType);
    }

    @ReactMethod
    public void GetCarvata(Callback callback) {

        int nType = FatosEnvironment.sharedObject().getCarvata();
        callback.invoke(null, nType);
    }

    @ReactMethod
    public void GetDem(Callback callback) {

        Boolean dem = FatosEnvironment.sharedObject().getDem();
        String str = dem == true ? "true" : "false";
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetUUID(Callback callback) {

        String str = AMapUtil.getDeviceIMEI(m_Context);;
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetSimulGps(Callback callback) {

        Boolean val = FatosEnvironment.sharedObject().getSimulGps();
        String str = val == true ? "true" : "false";
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetDrawGpsPoint(Callback callback) {

        Boolean val = FatosEnvironment.sharedObject().getDrawGpsPoint();
        String str = val == true ? "true" : "false";
        callback.invoke(null, str);
    }

    @ReactMethod
    public void GetVersionJson(Callback callback) {

        Gson gson = new Gson();
        DtoBasicReq dto = new DtoBasicReq(FuncType.eFuncType_GetVersion.getValue(), "GetVersion");
        String reqJson = gson.toJson(dto);
        String resJson = NativeNavi.nativeMglFunction(reqJson);
        callback.invoke(null, resJson);
    }

    @ReactMethod
    public void GetVersionName(Callback callback) {

        PackageInfo pInfo = null;
        String versionName = "";

        try {
            pInfo = m_Context.getPackageManager().getPackageInfo(m_Context.getPackageName(), 0);
            versionName = pInfo.versionName;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        callback.invoke(null, versionName);
    }

    @ReactMethod
    public void GetVersionCode(Callback callback) {

        PackageInfo pInfo = null;
        String versionCode = "";

        try {
            pInfo = m_Context.getPackageManager().getPackageInfo(m_Context.getPackageName(), 0);
            versionCode = Integer.toString(pInfo.versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        callback.invoke(null, versionCode);
    }

    @ReactMethod
    public void GetAutoCurrentPos(Callback callback) {

        Boolean val = FatosEnvironment.sharedObject().getAutoCurrentPos();
        String str = val == true ? "true" : "false";
        callback.invoke(null, str);
    }

    /** native api call **/
    public static void setEnvironmentSDIInfo()
    {
        int start = 0;
        ArrayList<Boolean> arr = FatosEnvironment.sharedObject().getCamera();

        for(int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.get(i);
            m_arAndoService[start + i] = val;
        }

        start = 6;
        arr = FatosEnvironment.sharedObject().getOperationState();

        for(int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.get(i);
            m_arAndoService[start + i] = val;
        }

        start = 10;
        arr = FatosEnvironment.sharedObject().getFacility();

        for(int i = 0; i < arr.size(); ++i)
        {
            Boolean val = arr.get(i);
            m_arAndoService[start + i] = val;
        }

        updateSDIInfo();
    }

    public static void updateSDIInfo()
    {
        for(int i = 0 ; i < 8 ; i++)
        {
            m_arSDIEnable[i] = m_arAndoService[0];
        }

        // 버스 정보
        m_arSDIEnable[8] = m_arAndoService[5];

        // 이동식
        m_arSDIEnable[9] = m_arAndoService[1];

        // 끼어들기
        m_arSDIEnable[10] = m_arAndoService[3];

        // 신호위반
        m_arSDIEnable[11] = m_arAndoService[2];
        m_arSDIEnable[12] = m_arAndoService[2];

        // 급커브
        m_arSDIEnable[13] = m_arAndoService[6];

        // 어린이 보호 구역
        m_arSDIEnable[14] = m_arAndoService[7];
        m_arSDIEnable[15] = m_arAndoService[7];

        // 사고 다발
        m_arSDIEnable[16] = m_arAndoService[8];
        // 교통 정보
        m_arSDIEnable[17] = m_arAndoService[10];

        // 높이,중량 안내
        m_arSDIEnable[18] = false;
        m_arSDIEnable[19] = false;
        m_arSDIEnable[20] = false;


        NativeNavi.nativeSetSDIFilter(m_arSDIType,m_arSDIEnable);
    }

    public static void UseGuideDB(int val)
    {
        // false - TTS, true - FatosGuide
        boolean blnFatosGuide = false;

        if(val == 1)
        {
            blnFatosGuide = true;
        }

        NaviInterface.UseGuideDB(blnFatosGuide);
    }

    public static void setRouteAutoTime(int val)
    {
        int nMin = 5;
        if(val == 1)
        {
            nMin = 10;
        }

        NativeNavi.nativeSetRouteAutoTime(nMin);
    }

    public static void setDemBaseLayer(boolean val)
    {
        int[] baseLayerType = new int[] {
                NativeNavi.BASEMAP_LAYER_DEM,
        };
        boolean[] bVisible = new boolean[] {
                val,
        };

        NativeNavi.nativeMapSetVisibleBaseLayer(ANaviApplication.m_MapHandle, baseLayerType, bVisible);
    }
}