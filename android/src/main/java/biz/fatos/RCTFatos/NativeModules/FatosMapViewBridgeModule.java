package biz.fatos.RCTFatos.NativeModules;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.ArrayList;
import java.util.StringTokenizer;

import biz.fatos.RCTFatos.FatosMapViewManager;
import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.map.FMPMapConst;
import biz.fatossdk.nativeMap.FatosMainMapView;
import biz.fatossdk.nativeMap.MapAnimation;
import biz.fatossdk.navi.NativeNavi;
import biz.fatossdk.newanavi.ANaviApplication;


public class FatosMapViewBridgeModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext mContext = null;
    private ANaviApplication m_gApp;
    private boolean isListener = false;
    private int m_PreViewMdoe = 0;
    private float m_PreViewLevel = 0.0f;
    private boolean mbln_SummaryMode = false;

    private int[] m_arBaseLayerOption = new int[5];
    private boolean[] m_arBaseLayerVisibleOption = new boolean[5];

    private static FatosMapViewBridgeModule _FatosMapViewBridgeModule = null;

    public static FatosMapViewBridgeModule GetInstance()
    {
        return _FatosMapViewBridgeModule;
    }


    @Override
    public String getName() {
        return "FatosMapViewBridgeModule";
    }

    public FatosMapViewBridgeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        _FatosMapViewBridgeModule = this;
        mContext = reactContext;
        m_gApp = (ANaviApplication) reactContext.getApplicationContext();
    }

    @ReactMethod
    public void setListener(String value) {

        if(value.equals("1"))
        {
            isListener = true;
        }
    }

    @ReactMethod
    public void setViewMode(int mode) {

        m_gApp.m_nCurMapMode = mode;

        FatosMainMapView mapView = FatosMapViewManager.getFatosMainMapView();

        if(mapView != null)
        {
            mapView.setMapMode();
        }
    }

    @ReactMethod
    public void setLayer(ReadableMap baseLayerType, ReadableMap bVisible) {

        final String baseLayerType_0 = baseLayerType.getString("0");
        final String baseLayerType_1 = baseLayerType.getString("1");
        final String baseLayerType_2 = baseLayerType.getString("2");
        final String baseLayerType_3 = baseLayerType.getString("3");
        final String baseLayerType_4 = baseLayerType.getString("4");

        final String bVisible_0 = bVisible.getString("0");
        final String bVisible_1 = bVisible.getString("1");
        final String bVisible_2 = bVisible.getString("2");
        final String bVisible_3 = bVisible.getString("3");
        final String bVisible_4 = bVisible.getString("4");

        m_arBaseLayerOption[0] = Integer.parseInt(baseLayerType_0);
        m_arBaseLayerOption[1] = Integer.parseInt(baseLayerType_1);
        m_arBaseLayerOption[2] = Integer.parseInt(baseLayerType_2);
        m_arBaseLayerOption[3] = Integer.parseInt(baseLayerType_3);
        m_arBaseLayerOption[4] = Integer.parseInt(baseLayerType_4);

        m_arBaseLayerVisibleOption[0] = Boolean.parseBoolean(bVisible_0);
        m_arBaseLayerVisibleOption[1] = Boolean.parseBoolean(bVisible_1);
        m_arBaseLayerVisibleOption[2] = Boolean.parseBoolean(bVisible_2);
        m_arBaseLayerVisibleOption[3] = Boolean.parseBoolean(bVisible_3);
        m_arBaseLayerVisibleOption[4] = Boolean.parseBoolean(bVisible_4);

        NativeNavi.nativeMapSetVisibleBaseLayer(m_gApp.m_MapHandle,m_arBaseLayerOption,m_arBaseLayerVisibleOption);
        NativeNavi.nativeMapRefresh();
    }

    @ReactMethod
    public void MapLevelIn(int nType)
    {
        FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();
        if(mapViewManager != null)
        {
            FatosMainMapView mapView = mapViewManager.mFatosMainMapView;

            if(mapView != null)
            {
                float fLevel = m_gApp.getViewLevel(m_gApp.m_MapHandle);

                int nAni = MapAnimation.MAP_ANI_TYPE_CUSTOM_ZOOMINOUT;

                if(nType == 1)
                {
                    nAni = MapAnimation.MAP_ANI_TYPE_DIRECT;
                }

                mapView.onMapLevelInOut(fLevel + 1, nAni);
            }

            mapViewManager.setAutoScalePassTime(FatosMapViewManager.AUTO_SCALE_PASS_TIME);
        }
    }

    @ReactMethod
    public void MapLevelOut(int nType)
    {
        FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();
        if(mapViewManager != null)
        {
            FatosMainMapView mapView = mapViewManager.mFatosMainMapView;

            if(mapView != null)
            {
                float fLevel = m_gApp.getViewLevel(m_gApp.m_MapHandle);

                int nAni = MapAnimation.MAP_ANI_TYPE_CUSTOM_ZOOMINOUT;

                if(nType == 1)
                {
                    nAni = MapAnimation.MAP_ANI_TYPE_DIRECT;
                }

                mapView.onMapLevelInOut(fLevel - 1, nAni);
            }

            mapViewManager.setAutoScalePassTime(FatosMapViewManager.AUTO_SCALE_PASS_TIME);
        }
    }

    @ReactMethod
    public void MapAuto()
    {
        FatosMainMapView mapView = FatosMapViewManager.getFatosMainMapView();

        if(mapView != null)
        {
            mapView.mapMoveCurPos();
        }

        TouchMoveModeListener(0);
    }

    @ReactMethod
    public void SummaryMapSetting(ReadableMap lineColor, float xScale, float yScale, float hCenter, float vCenter, boolean blnViewMode)
    {
        mbln_SummaryMode = true;

        // 라인 초기화
        NativeNavi.nativeMapReLoadRouteLine(m_gApp.m_MapHandle);

        // 요약 경로 라인 on
        setMapRoutelineOnlySelected(false);

        // 넘어온 컬러 데이터를 파싱해서 셋팅
        ArrayList<String> lineColors = new ArrayList<String>();
        lineColors.add(lineColor.getString("0"));
        lineColors.add(lineColor.getString("1"));
        lineColors.add(lineColor.getString("2"));

        for(int i = 0; i < lineColors.size(); ++i)
        {
            StringTokenizer token = new StringTokenizer(lineColors.get(i), ",");

            int[] selectRouteLineColor = new int[2];
            int[] nonSelectRouteLineColor = new int[2];

            int r = Integer.parseInt(token.nextToken());
            int g = Integer.parseInt(token.nextToken());
            int b = Integer.parseInt(token.nextToken());
            int a = Integer.parseInt(token.nextToken());

            selectRouteLineColor[0] = Color.argb(a,r,g,b);
            selectRouteLineColor[1] = Color.argb(255,0,0,0);
            nonSelectRouteLineColor[0] = Color.argb(a,r,g,b);
            nonSelectRouteLineColor[1] = Color.argb(255,0,0,0);

            NativeNavi.nativeMapSetRoutelineColor(m_gApp.m_MapHandle, i, selectRouteLineColor, nonSelectRouteLineColor);
        }

        FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();
        if(mapViewManager != null)
        {
            FatosMainMapView mapView = mapViewManager.mFatosMainMapView;

            if(mapView != null) {

                if(blnViewMode == true) {
                    // 뷰모드 변경
                    m_PreViewLevel = NativeNavi.nativeMapGetViewLevel(ANaviApplication.m_MapHandle);
                    m_PreViewMdoe = NativeNavi.nativeMapGetViewMode(ANaviApplication.m_MapHandle);
                    m_gApp.m_nCurMapMode = NativeNavi.MAP_VIEW_MODE_NORTHUP;
                    NativeNavi.nativeMapSetViewMode(ANaviApplication.m_MapHandle, NativeNavi.MAP_VIEW_MODE_NORTHUP);
                }

                // 맵위치 보정
                NativeNavi.nativeMapRefreshServiceRouteLine(ANaviApplication.m_MapHandle);

                float fLevel[] = new float[1];
                double dCenterXY[] = new double[2];
                float fScale[] = new float[2];
                fScale[0] = xScale;
                fScale[1] = yScale;
                NativeNavi.nativeMapRouteLineFitLevelPosParmScale(ANaviApplication.m_MapHandle, fLevel, dCenterXY, fScale);

                // 맵 레벨 센터 틸트 앵글 보정
                mapView.SummaryMapSetting(fLevel[0], hCenter, vCenter);
                // 위치 이동
                NativeNavi.nativeMapSetPosWGS84(ANaviApplication.m_MapHandle, dCenterXY[0], dCenterXY[1]);

                // 맵 이동이 될수 있도록 상태값 변경
                mapView.setTouchState(NativeNavi.ETOUCH_STATE_NONE);
            }
        }

        int[] MapObjType = new int[] {
                NativeNavi.MAP_OBJ_CARVATAR,
                NativeNavi.MAP_OBJ_ROUTELINE_SELECTED,
                NativeNavi.MAP_OBJ_ROUTELINE

        };
        
        boolean[] bMapObjVisible = new boolean[] {
                false,
                false,
                true
        };

        NativeNavi.nativeMapSetVisible(ANaviApplication.m_MapHandle, MapObjType, bMapObjVisible);
    }

    @ReactMethod
    public void DefaultMapSetting()
    {
        mbln_SummaryMode = false;

        setMapRoutelineOnlySelected(true);

        int nIndex = FatosEnvironment.sharedObject().getPathLineColor();
        NativeNavi.SetEnvRouteLineColor(ANaviApplication.m_MapHandle, nIndex);

        m_gApp.m_nCurMapMode = m_PreViewMdoe;

        FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();
        if(mapViewManager != null)
        {
            FatosMainMapView mapView = mapViewManager.mFatosMainMapView;

            if(mapView != null)
            {

                mapView.onMapLevelInOut(m_PreViewLevel);
            }
        }

        int[] MapObjType = new int[] {
                NativeNavi.MAP_OBJ_CARVATAR,
                NativeNavi.MAP_OBJ_ROUTELINE_SELECTED,
        };

        boolean[] bMapObjVisible = new boolean[] {
                true,
                true,
        };

        NativeNavi.nativeMapSetVisible(ANaviApplication.m_MapHandle, MapObjType, bMapObjVisible);

        MapAuto();
    }

    @ReactMethod
    public void SelectRouteLine(int index)
    {
        NativeNavi.nativeMapSelectRouteLine(m_gApp.m_MapHandle,index);
    }


    @ReactMethod
    public void ApplySelectRouteLine(int index)
    {
        NativeNavi.nativeMapApplySelectRouteLine(m_gApp.m_MapHandle,index);
    }

    public void MapLevelUpdateListener(int nLevel) {

        if(isListener)
        {
            String strResult = Integer.toString(nLevel);
            sendEvent(getReactApplicationContext(), "MapLevelUpdateListener", strResult);
        }
    }

    public void PosWorldLocationUpdateListener(String strLocation) {

        if(isListener)
        {
            String strResult = strLocation;
            sendEvent(getReactApplicationContext(), "PosWorldLocationUpdateListener", strResult);
        }
    }

    public void TouchMoveModeListener(int nMode) {

        if(isListener)
        {
            String strResult = Integer.toString(nMode);
            sendEvent(getReactApplicationContext(), "TouchMoveModeListener", strResult);
        }
    }

    private void sendEvent(ReactContext reactContext, String eventName, String content) {
        mContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, content);
    }

    public void setMapRoutelineOnlySelected(boolean var)
    {
        int[] objType = new int[2];
        boolean[] bVisible = new boolean[2];
        objType[0] = NativeNavi.MAP_OBJ_ROUTELINE_SELECTED;
        objType[1] = NativeNavi.MAP_OBJ_TARGETLINE;
        bVisible[0] = var;
        bVisible[1] = var;

        NativeNavi.nativeMapSetVisible(m_gApp.m_MapHandle, objType, bVisible);
    }

    public boolean isSummaryMode()
    {
        return mbln_SummaryMode;
    }


}
