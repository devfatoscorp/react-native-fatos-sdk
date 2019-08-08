package biz.fatos.anavi;

import android.graphics.Color;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.Log;
import android.view.View;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import biz.fatos.anavi.NativeModules.FatosEnvBridgeModule;
import biz.fatos.anavi.NativeModules.FatosMapViewBridgeModule;

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
    static private ANaviApplication m_gApp = null;
    public FatosMainMapView mFatosMainMapView = null;
    private float autoScalePassTime = 0.0f;
    private int mn_MapMoveCurrentTimer = 0;
    private boolean mbln_MapMoveCurrentEvent = false;
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

                    if(strLocation == null || strLocation.isEmpty())
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
        // return null;
        // 여기서 만들 View를 넘겨야 한다.
        //reactContext.getJSModule(DeviceEventManageModule.RCTDeviceEventEmitter.class).emit("CallbackTest", "Android is Ready");
        mFatosMainMapView = new FatosMainMapView(reactContext);
        mFatosMainMapView.setOnFatosMapStateUpdateListenerr(this);
        mFatosMainMapView.setOnFatosMapListener(this);

        m_gApp = (ANaviApplication) reactContext.getApplicationContext();

        setEnvironmentMapSetting();

        _FatosMapViewManager = this;
        return mFatosMainMapView;
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

        // 안내설정 셋팅
        FatosEnvBridgeModule.setEnvironmentSDIInfo();

        // 음성안내 셋팅
        nIndex = FatosEnvironment.sharedObject().getGuidevoice();
        FatosEnvBridgeModule.UseGuideDB(nIndex);

        // 주기적 재탐색 셋팅
        nIndex = FatosEnvironment.sharedObject().getRediscover();
        FatosEnvBridgeModule.setRouteAutoTime(nIndex);

        // 기본 버드뷰 셋팅
        m_gApp.m_nCurMapMode = NativeNavi.MAP_VIEW_MODE_BIRD;
        mFatosMainMapView.setMapMode();
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

    }

    @Override
    public void onUpdateMapTouch(float fX, float fY)
    {

    }

    @Override
    public void onUpdateMapLongTouch(float fX, float fY)
    {

    }

    @Override
    public void onUpdateTouchBegin(float fX, float fY)
    {
        FatosMapViewBridgeModule module = FatosMapViewBridgeModule.GetInstance();

        if(module != null)
        {
            module.TouchMoveModeListener(1);
        }
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
            return;;

        if(mTouchInfo.isFling == true)
            return;

        if(NativeNavi.nativeIsSimulationMode() || NativeNavi.nativeIsDrivenMode())
        {
            if (autoScalePassTime > 0)
                return;

            int nMode = NativeNavi.nativeMapGetViewMode(ANaviApplication.m_MapHandle);

            // 버드뷰일떄만 틸트 적용
            if(nMode != NativeNavi.MAP_VIEW_MODE_BIRD)
            {
                fTilt = NativeNavi.nativeMapGetViewTilt(ANaviApplication.m_MapHandle);
            }

            mFatosMainMapView.onMapLevelInOut(fLevel, fTilt);
        }
    }

    public void checkMapMoveCurrentPos(int nMMStatus, int nCarSpeed)
    {
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
            mn_MapMoveCurrentTimer = 5;
            return;
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

        if(mbln_MapMoveCurrentEvent == true && mn_MapMoveCurrentTimer == 0)
        {
            mbln_MapMoveCurrentEvent = false;
            module.MapAuto();
            return;
        }

        if(mbln_MapMoveCurrentEvent == false)
        {
            /* 드라이브인포 지피에스 상태가 배드이면 패스 */
            if (nMMStatus <= RouteGuidanceInfo.MATCH_NOT_BAD)
                return;

            if (NativeNavi.nativeIsRoute()) {
                /* 경로가 있고 액션이 없을떼 5초뒤에 현위치 */
                mbln_MapMoveCurrentEvent = true;
                mn_MapMoveCurrentTimer = 5;

            } else {
                /* 경로가 없을떄  액션이 없을때 속도가 5키로 이상일떄 현위치 이동 */
                if (nCarSpeed > 5) {
                    mbln_MapMoveCurrentEvent = true;
                    mn_MapMoveCurrentTimer = 5;
                }
            }
        }
    }

    public void setAutoScalePassTime(float fVal)
    {
        autoScalePassTime = fVal;
    }

}
