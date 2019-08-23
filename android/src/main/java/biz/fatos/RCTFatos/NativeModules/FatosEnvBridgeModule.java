package biz.fatos.RCTFatos.NativeModules;

import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.google.gson.Gson;

import java.util.ArrayList;

import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.navi.NativeNavi;
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
            true,   // 고정식 // 7
            true, // 버스 전용 차선  8
            false, //이동식 //9
            false,  // 끼어들기 // 10
            true,  // 신호위반  // 14
            true,  // 신호위반 모형  // 15
            false,  // 급커브 // 31
            false,  // 어린이 보호 시작 // 33
            false,  // 어린이 보호 종료 // 34
            false,  // 사고 다발 // 30
            true,  // 교통 정보 // 13
            false,  // 트럭 높이제한(39) // 18
            false,  // 트럭 중량제한(40) // 19
            false   // 트럭 높이,중량제한(41) 20
    };

    public static boolean[] m_arAndoService = new boolean[] {
            true, // 고정식 // 0
            true, // 이동식
            true, // 신호단속
            false, // 끼어들기
            false, // 주차
            false, // 버스전용 // 5
            false, // 급커브 구간
            false, // 어린이보호구역
            false, // 사고다발
            false, // 과속방지턱
            true, // 교통정보 수집 // 10
            false, // 톨게이트
            false, // 졸음쉼터 // 12
    };

    public static int[] m_arSDIType = new int[] {
            NativeNavi.SDI_CAM_FIXED_DUMMY, // 1부터 시작해서 넣어준다
            NativeNavi.SDI_CAM_FIXED_SPEED,
            NativeNavi.SDI_CAM_FIXED_BUSSPEED,
            NativeNavi.SDI_CAM_FIXED_360,
            NativeNavi.SDI_CAM_FIXED_SECTION,
            NativeNavi.SDI_CAM_FIXED_SECTION_OR_LANE,
            NativeNavi.SDI_CAM_FIXED_LOAD_BAD,
            NativeNavi.SDI_CAM_FIXED_SIGN_UNATTACHED,   // 고정식(7)
            NativeNavi.SDI_CAM_FIXED_BUS_LANE, // 버스 전용 차선(8)
            NativeNavi.SDI_CAM_MOVE_ABLE, // 이동식 (9)
            NativeNavi.SDI_CAM_CUT_IN,  // 끼어들기 (10)
            NativeNavi.SDI_CAM_VIOLATION_SIGNAL,  // 신호위반 (11)
            NativeNavi.SDI_CAM_VIOLATION_SIGNAL_MOCKUP,  // 신호위반 모형(12)
            NativeNavi.SDI_POINT_SHARP_CURVE,  // 급커브(13)
            NativeNavi.SDI_POINT_START_PROTECTED_CHILD,  // 어린이 보호 시작(14)
            NativeNavi.SDI_POINT_END_PROTECTED_CHILD,  // 어린이 보호 종료(15)
            NativeNavi.SDI_POINT_ACCIDENT,  // 사고 다발 (16)
            NativeNavi.SDI_DVC_COLLECT_TRAFFIC,  // 교통 정보 (17)
            NativeNavi.SDI_TRUCK_HEIGHT_LIMIT,  // 트럭 높이제한(39)
            NativeNavi.SDI_TRUCK_WEIGHT_LIMIT,  // 트럭 중량제한(40)
            NativeNavi.SDI_TRUCK_BOTH_LIMIT  // 트럭 높이,중량제한(41)
    };

    private Context m_Context;

    @Override
    public String getName() {
        return "FatosEnvBridgeModule";
    }

    public FatosEnvBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);

        m_Context = reactContext;

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

        // auto ui 랑 매칭 안됨 스타트 인덱스 신경쓰자
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

        // auto ui 랑 매칭 안됨 스타트 인덱스 신경쓰자
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

        // auto ui 랑 매칭 안됨 스타트 인덱스 신경쓰자
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

        setDemBaseLayer(value);
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

        // 트럭은 안쓰니 일단 주석
//        // 위험물 추가
//        if(ANaviApplication.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_TRUCK ||
//                ANaviApplication.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_TMSDG)
//        {
//            m_arSDIEnable[18] = true;
//            m_arSDIEnable[19] = true;
//            m_arSDIEnable[20] = true;
//        }

        NativeNavi.nativeSetSDIFilter(m_arSDIType,m_arSDIEnable);
    }

    public static void UseGuideDB(int val)
    {
        // false - 구글TTS, true - 파토스가이드
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