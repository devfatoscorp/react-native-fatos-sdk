package biz.fatos.RCTFatos;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;


import biz.fatos.RCTFatos.NativeModules.FatosEnvBridgeModule;
import biz.fatos.RCTFatos.NativeModules.FatosMapViewBridgeModule;
import biz.fatossdk.config.FatosEnvironment;
import biz.fatossdk.navi.NativeNavi;

import javax.annotation.Nonnull;

import biz.fatossdk.nativeMap.FatosMainMapView;
import biz.fatossdk.navi.NaviInterface;
import biz.fatossdk.navi.RouteGuidanceInfo;
import biz.fatossdk.newanavi.ANaviApplication;

import static biz.fatossdk.navi.NativeNavi.ETOUCH_STATE_AUTO;

public class FatosMapViewManager extends SimpleViewManager<View> implements  FatosMainMapView.OnFatosMapStateUpdateListener, FatosMainMapView.OnFatosMapListener {

    public static final float AUTO_SCALE_PASS_TIME = 90.0f;
    public static final int MAP_MOVE_CURRENT_TIME = 7;
    static private ANaviApplication m_gApp = null;
    public FatosMainMapView mFatosMainMapView = null;
    private float autoScalePassTime = 0.0f;
    private float fPreAutoScaleLevel = 0.0f;
    private static int mn_MapMoveCurrentTimer = 0;
    private boolean mbln_MapMoveCurrentEvent = false;
    private boolean mbln_AutoCurrentPos = false;
    private ThemedReactContext m_Context = null;

    FatosMainMapView.TouchInfo mTouchInfo = null;

    private static FatosMapViewManager _FatosMapViewManager = null;

    public static FatosMapViewManager GetInstance()
    {
        return _FatosMapViewManager;
    }

    public static FatosMainMapView getFatosMainMapView()
    {
        if(_FatosMapViewManager != null)
        {
            return _FatosMapViewManager.mFatosMainMapView;
        }

        return null;
    }

    public static void onStartGoalSet(double sx, double sy, String sname, double gx, double gy, String gname)
    {
        double[] dCoordX = new double[2];
        double[] dCoordY = new double[2];
        boolean[] bMapObjVisible = new boolean[2];
        int[] mapObjType = new int[] {NativeNavi.MAP_OBJ_FLAG_START , NativeNavi.MAP_OBJ_FLAG_GOAL};

        if(sx == 0 && sy == 0 && gx == 0 || gy == 0)
        {
            bMapObjVisible[0] = false;
            bMapObjVisible[1] = false;
        }
        else
        {
            bMapObjVisible[0] = true;
            bMapObjVisible[1] = true;
        }

        dCoordX[0] = sx;
        dCoordY[0] = sy;
        dCoordX[1] = gx;
        dCoordY[1] = gy;

        NativeNavi.nativeMapSetPinPos(ANaviApplication.m_MapHandle, mapObjType,dCoordX,dCoordY);
        NativeNavi.nativeMapSetVisible(ANaviApplication.m_MapHandle, mapObjType, bMapObjVisible);
    }

    private final int LOCATION_UPDATE = 1;

    final Handler handler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {

            if(msg.what == LOCATION_UPDATE){

                FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

                if(module != null)
                {
                    double[] x = new double[1];
                    double[] y = new double[1];

                    NativeNavi.nativeMapGetPosWGS84(ANaviApplication.m_MapHandle, x, y);
                    String strLocation = NaviInterface.GeoCode(x[0], y[0]);

                    if(strLocation == null || TextUtils.isEmpty(strLocation))
                    {
                        Message newMsg = handler.obtainMessage(LOCATION_UPDATE);
                        handler.sendMessageDelayed(newMsg, 1000);
                        return;
                    }

                    module.PosWorldLocationUpdateListener(strLocation);
                    module.TouchMoveModeListener(2);
                }
            }
        }
    };

    @Nonnull
    @Override
    public String getName() {
        return "FatosMapView";
    }

    @Nonnull
    @Override
    protected View createViewInstance(@Nonnull ThemedReactContext reactContext) {

        m_Context = reactContext;
        mFatosMainMapView = new FatosMainMapView(m_Context);
        mFatosMainMapView.setOnFatosMapStateUpdateListenerr(this);
        mFatosMainMapView.setOnFatosMapListener(this);

        m_gApp = (ANaviApplication) reactContext.getApplicationContext();
        mbln_AutoCurrentPos = FatosEnvironment.sharedObject().getAutoCurrentPos();
        setEnvironmentMapSetting();

        _FatosMapViewManager = this;
        return mFatosMainMapView;
    }


    public void componentDidMount()
    {
//        if(mFatosMainMapView == null)
//        {
//            mFatosMainMapView = new FatosMainMapView(m_Context);
//            mFatosMainMapView.setOnFatosMapStateUpdateListenerr(this);
//            mFatosMainMapView.setOnFatosMapListener(this);
//            addEventEmitters(m_Context,mFatosMainMapView);
//            Log.d("simsimsim", "FatosMapView componentDidMount");
//        }
    }

    public void componentWillUnmount() {

        if(mFatosMainMapView != null)
        {
            mFatosMainMapView.onDestroy();
            mFatosMainMapView = null;
        }
    }

    private void setEnvironmentMapSetting()
    {
        // 경로 컬러 셋팅
        int nIndex = FatosEnvironment.sharedObject().getPathLineColor();
        NativeNavi.SetEnvRouteLineColor(m_gApp.m_MapHandle, nIndex);

        // 카바타 셋팅
        nIndex = FatosEnvironment.sharedObject().getCarvata();
        NativeNavi.nativeMapSetCarvata(m_gApp.m_MapHandle,nIndex);

        // 맵 컬러 셋팅 (주,야간,자동)
        nIndex = FatosEnvironment.sharedObject().getMapColor();
        NativeNavi.nativeMapSetNightMode(nIndex);

        // DEM
        boolean val = FatosEnvironment.sharedObject().getDem();
        FatosEnvBridgeModule.setDemBaseLayer(val);

        ///////////////////

        FatosEnvBridgeModule.setEnvironmentSDIInfo();

        nIndex = FatosEnvironment.sharedObject().getGuidevoice();
        FatosEnvBridgeModule.UseGuideDB(nIndex);

        nIndex = FatosEnvironment.sharedObject().getRediscover();
        FatosEnvBridgeModule.setRouteAutoTime(nIndex);

//        m_gApp.m_nCurMapMode = NativeNavi.MAP_VIEW_MODE_BIRD;
//        mFatosMainMapView.setMapMode();
    }


    private void sendEvent(ReactContext reactContext,
                           String eventName, String content) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, content);
    }

    /* OnFatosMapStateUpdateListener */
    @Override
    public void MapLevelUpdateListener(int nLevel)
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.MapLevelUpdateListener(nLevel);
        }
    }

    /* OnFatosMapListener */
    @Override
    public void onMapReady()
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.MapReadyListener();
        }
    }

    @Override
    public void onUpdateMapMode(int nStatus)
    {

    }

    @Override
    public void onUpdateMapScaleInfo(int nStatus)
    {

    }

    @Override
    public void onUpdateFps(float fFps, float level)
    {

    }

    @Override
    public void onUpdateTwoTouchCenter(float fX, float fY)
    {

    }

    @Override
    public void onUpdateTwoTouchUp(boolean bTilt)
    {

    }

    @Override
    public void onUpdateMapAngle(float nAngle)
    {

    }

    @Override
    public void onUpdateFirstMapTouch()
    {

    }

    @Override
    public void onUpdatePickerInfo(String strID, int nLong, int nLat)
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.UpdatePickerInfoListener(strID,nLong,nLat);
        }
    }

    @Override
    public void onUpdateMapTouch(float fX, float fY)
    {

    }

    @Override
    public void onUpdateMapLongTouch(float fX, float fY)
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.MapLongTouchListener((int)fX, (int)fY);
        }
    }

    @Override
    public void onUpdateTouchBegin(float fX, float fY)
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.TouchMoveModeListener(1);
        }

        OnMapMoveCurrentTimer();
    }

    @Override
    public void onUpdateTouchMove(float fX, float fY)
    {

    }

    @Override
    public void onUpdateTouchEnd(float fX, float fY)
    {
        // 이전 이벤트 취소
        handler.removeMessages(LOCATION_UPDATE);

        // 이벤트 등록
        Message msg = handler.obtainMessage(LOCATION_UPDATE);
        handler.sendMessageDelayed(msg, 1000);
    }

    @Override
    public void onUpdate(FatosMainMapView.TouchInfo touchInfo)
    {
        mTouchInfo = touchInfo;

        if(autoScalePassTime > 0)
        {
            --autoScalePassTime;
        }

        if(autoScalePassTime < 0)
        {
            autoScalePassTime = 0;
        }
    }

    public void onAutoScale(float fTilt, float fLevel)
    {
        if(mTouchInfo == null)
            return;

        if(mTouchInfo.getState() != ETOUCH_STATE_AUTO)
            return;

        if(mTouchInfo.isFling == true)
            return;

        if(NativeNavi.nativeIsSimulationMode() || NativeNavi.nativeIsDrivenMode())
        {
            if (autoScalePassTime > 0)
                return;

            int nMode = NativeNavi.nativeMapGetViewMode(ANaviApplication.m_MapHandle);

            if(nMode != NativeNavi.MAP_VIEW_MODE_BIRD)
            {
                fTilt = NativeNavi.nativeMapGetViewTilt(ANaviApplication.m_MapHandle);
            }

            if(fLevel <= 0)
            {
                fLevel = fPreAutoScaleLevel;
            }

            fPreAutoScaleLevel = fLevel;

            if(mFatosMainMapView != null) {
                mFatosMainMapView.onMapLevelInOut(fLevel, fTilt);
            }

        }
    }

    public void checkMapMoveCurrentPos(int nMMStatus, int nCarSpeed)
    {
        if(mbln_AutoCurrentPos == false)
            return;

        if(mTouchInfo == null)
            return;

        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module == null)
            return;

        if(module.isSummaryMode() == true)
            return;

        if(mTouchInfo.getState() == ETOUCH_STATE_AUTO)
            return;

        if(mTouchInfo.isFling == true)
        {
            mn_MapMoveCurrentTimer = MAP_MOVE_CURRENT_TIME;
            return;
        }

        if(mbln_MapMoveCurrentEvent == true && mn_MapMoveCurrentTimer == 0)
        {
            mbln_MapMoveCurrentEvent = false;
            module.MapAuto();
            return;
        }

        if(mbln_MapMoveCurrentEvent == false)
        {
            if (nMMStatus <= RouteGuidanceInfo.MATCH_NOT_BAD)
                return;

            if (NativeNavi.nativeIsRoute())
            {
                mbln_MapMoveCurrentEvent = true;
                mn_MapMoveCurrentTimer = MAP_MOVE_CURRENT_TIME;
                return;

            }
            else
            {

                if (nCarSpeed > 5)
                {
                    mbln_MapMoveCurrentEvent = true;
                    mn_MapMoveCurrentTimer = MAP_MOVE_CURRENT_TIME;
                    return;
                }
            }
        }

        if(mn_MapMoveCurrentTimer > 0)
        {
            if(mTouchInfo.getState() == ETOUCH_STATE_AUTO)
            {
                // 타이머 초기화
                mn_MapMoveCurrentTimer = 0;
                mbln_MapMoveCurrentEvent = false;
                return;
            }

            if(mbln_MapMoveCurrentEvent == true)
            {
                --mn_MapMoveCurrentTimer;
            }
        }
    }

    public void setAutoScalePassTime(float fVal)
    {
        autoScalePassTime = fVal;
    }

    public int getTouchState()
    {
        if(mTouchInfo != null)
        {
            return mTouchInfo.getState();
        }

        return -1;
    }

    public void setAutoCurrentPos(boolean val)
    {
        mbln_AutoCurrentPos = val;
    }

    public static void OnMapMoveCurrentTimer()
    {
        mn_MapMoveCurrentTimer = MAP_MOVE_CURRENT_TIME;
    }

}