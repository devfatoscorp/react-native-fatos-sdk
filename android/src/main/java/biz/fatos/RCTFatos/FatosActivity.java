package biz.fatos.RCTFatos;

import android.Manifest;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.Process;
import androidx.annotation.NonNull;

import android.util.Log;
import android.view.WindowManager;
import android.widget.Toast;

import com.facebook.react.ReactActivity;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.util.HashMap;


import biz.fatos.RCTFatos.NativeModules.FatosMapViewBridgeModule;
import biz.fatos.RCTFatos.NativeModules.FatosNaviBridgeModule;
import biz.fatossdk.config.FatosBuildConfig;
import biz.fatossdk.navi.NativeNavi;
import biz.fatossdk.navi.NaviCallback;
import biz.fatossdk.navi.NaviInterface;
import biz.fatossdk.navi.rgdata.RgDataContext;
import biz.fatossdk.newanavi.ANaviApplication;
import biz.fatossdk.newanavi.base.ActivityHelper;
import biz.fatossdk.newanavi.manager.AMapPositionManager;
import biz.fatossdk.newanavi.manager.AMapUtil;
import biz.fatossdk.newanavi.splash.FatosToast;
import biz.fatossdk.react.ReactManager;
import biz.fatossdk.service.GPSService;

public class FatosActivity extends ReactActivity implements NaviCallback.OnRouteListener {
    public static final String TAG = "AMAP";
    public static final String FATOS_PACKAGENAME = "biz.fatos.anavi";
    protected ANaviApplication m_gApp;
    private Context m_Context;
    protected Intent gpsServiceIntent = null;

    private NaviMassgeHandler m_NaviHandler = null;
    private NaviCallback m_NaviCallback = null;
    protected int m_iEngineInit = 0;

    private final long FINSH_INTERVAL_TIME = 2000;
    private long backPressedTime = 0;
    protected String sdk_key = "";

    @Override
    protected String getMainComponentName() {
        return "FatosRNApp";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FatosNaviBridgeModule.setFatosActivity(this);
        m_gApp = (ANaviApplication) this.getApplicationContext();
        setVolumeControlStream(AudioManager.STREAM_MUSIC); // 하드웨어 볼륨이 미디어 볼륨을

        m_Context = this;
        ActivityHelper.setDismissKeyguard(m_Context);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
    }

    public void setDevServerMode(boolean val)
    {
        m_gApp.getAppSettingInfo().m_bDevServerMode = val;
    }

    public void initFatosNaviEngine()
    {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int permissionResultWRITE_EXTERNAL_STORAGE = checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            int permissionResultACCESS_FINE_LOCATION = checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION);
            int permissionResultACCESS_READ_PHONE= checkSelfPermission(Manifest.permission.READ_PHONE_STATE);
            if (permissionResultWRITE_EXTERNAL_STORAGE == PackageManager.PERMISSION_DENIED
                    || permissionResultACCESS_FINE_LOCATION == PackageManager.PERMISSION_DENIED
                    || permissionResultACCESS_READ_PHONE == PackageManager.PERMISSION_DENIED) {
                requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.READ_PHONE_STATE}, 1000);

            }
            else {
                try {
                    m_iEngineInit = EngineInit();

                    // 권한 획득후 react 통신후 맵뷰를 생성한다
                    FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

                    if(module != null)
                    {
                        module.PermissionCompleteListener();
                    }
                    else
                    {
                        // 모둘이 생성이 안되어 있을경우 예외처리
                        FatosNaviBridgeModule.mbln_PermissionCompleteCall = true;
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        else {
            try {
                m_iEngineInit = EngineInit();

                FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

                if(module != null)
                {
                    module.PermissionCompleteListener();
                }
                else
                {
                    FatosNaviBridgeModule.mbln_PermissionCompleteCall = true;
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        boolean bAllGranted = true;
        if (requestCode == 1000) {
            for(int i = 0; i < grantResults.length ; i++)
            {
                if(grantResults[i] != PackageManager.PERMISSION_GRANTED){
                    Toast.makeText(FatosActivity.this, "App 실행에 필요한 권한이 설정 되지 않았습니다.", Toast.LENGTH_SHORT).show();
                    finishAffinity();
                    bAllGranted = false;
                    break;
                }
            }

            if(bAllGranted) {
                try {
                    m_iEngineInit = EngineInit();

                    FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

                    if(module != null)
                    {
                        module.PermissionCompleteListener();
                    }
                    else
                    {
                        FatosNaviBridgeModule.mbln_PermissionCompleteCall = true;
                    }

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    protected int EngineInit() throws IOException {

        HashMap<String, String> strings = new HashMap<String, String>();
        strings.put("engine_init_failed_expiration_inside", getResources().getString(R.string.engine_init_failed_expiration_inside));
        strings.put("engine_init_failed_expiration_commercial", getResources().getString(R.string.engine_init_failed_expiration_commercial));
        strings.put("engine_init_failed_title", getResources().getString(R.string.engine_init_failed_title));
        strings.put("string_comfirm", getResources().getString(R.string.string_comfirm));
        strings.put("engine_init_failed_etc", getResources().getString(R.string.engine_init_failed_etc));
        strings.put("force_update", getResources().getString(R.string.force_update));
        strings.put("string_no", getResources().getString(R.string.string_no));
        strings.put("string_yes", getResources().getString(R.string.string_yes));
        strings.put("FATOS_PACKAGENAME", FATOS_PACKAGENAME);
        strings.put("engine_init_failed_localdb", getResources().getString(R.string.engine_init_failed_localdb));
        strings.put("engine_init_failed_auth", "Authentication failed");


        String strIMEI = AMapUtil.getDeviceIMEI(m_Context);
        ReactManager.sharedObject().Init(this, m_Context, m_gApp, strings, sdk_key, -1, strIMEI);

        m_NaviHandler = new NaviMassgeHandler();
        m_NaviCallback = new NaviCallback(m_NaviHandler);

        m_NaviCallback.setOnRouteListener(this);
        NaviInterface.SetCallback(m_NaviCallback);

        gpsServiceIntent = new Intent(this, GPSService.class);
        startService(gpsServiceIntent);

        return 1;
    }

    class NaviMassgeHandler extends Handler {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            boolean isSimulation = false;

            switch (msg.what) {
                case NaviCallback.NAVI_ROUTE_GUIDANCE: {
                    isSimulation = false;
                }
                break;

                case NaviCallback.NAVI_ROUTE_SIMULATION: {
                    isSimulation = true;
                }
                break;

                default:
                    break;
            }

            FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

            if(module != null)
            {
                // 로딩중일떄는 rg데이터를 전송하지 않는다
                if(module.IsIndicator() == true)
                    return;

                String strJson = NativeNavi.GetRouteGuidanceJson(isSimulation);

                FatosMapViewManager mapViewManager = FatosMapViewManager.GetInstance();

                if(mapViewManager != null)
                {
                    float fTilt = 0;
                    float fLevel = 0;
                    int nMMStatus = 0;
                    int nCarSpeed = 0;

                    double fLatY = 0;
                    double fLonX = 0;
                    int nAngle = 0;

                    JSONObject object = null;

                    try {
                        object = new JSONObject(strJson);
                        fTilt = Float.parseFloat(object.getString("AutoTilt"));
                        fLevel = Float.parseFloat(object.getString("AutoLevel"));
                        nMMStatus = object.getInt("MMStatus");
                        nCarSpeed = object.getInt("CarSpeed");

                        // 현위치 정보 갱신
                        fLatY = object.getDouble("Y");
                        fLonX = object.getDouble("X");
                        nAngle = object.getInt("Angle");

                        AMapPositionManager.m_nWSaveLonX = (int)fLonX;
                        AMapPositionManager.m_nWSaveLatY = (int)fLatY;

                        AMapPositionManager.setCurrentLocation(fLonX, fLatY, nAngle);
                        AMapPositionManager.setSimulLocation(fLonX, fLatY, nAngle);

                        object.put("TouchState", mapViewManager.getTouchState());
                        strJson = object.toString();
                    }
                    catch (JSONException e) {
                        e.printStackTrace();
                    }

                    // 요약정보 일떄 예외처리
                    if(FatosMapViewBridgeModule.GetInstance().isSummaryMode() == false)
                    {
                        mapViewManager.onAutoScale(fTilt, fLevel);
                    }

                    mapViewManager.checkMapMoveCurrentPos(nMMStatus, nCarSpeed);
                }

                module.UpdateRGListener(strJson);

            }
        }
    }


    @Override
    protected void onDestroy() {

        release();

        super.onDestroy();
    }

    @Override
    public void onStop() {

        super.onStop();
    }

    @Override
    protected void onPause() {

        super.onPause();

        // 스마트 시티 유저일떄 백그라운드 gps off
        if(m_gApp.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_SmartCityIch_User)
        {
            if (gpsServiceIntent != null) {
                stopService(gpsServiceIntent);
                gpsServiceIntent = null;

                Log.d("simsimsim","onPause gpsServiceIntent");
            }
        }
    }


    @Override
    protected void onResume() {

        super.onResume();

        // 스마트 시티 유저일떄 포그라운드 일떄 gps on
        if(m_gApp.getRoutePathInfo().m_nServiceType == FatosBuildConfig.FATOS_SITE_IS_SmartCityIch_User)
        {
            if (gpsServiceIntent == null) {
                gpsServiceIntent = new Intent(m_Context, GPSService.class);
                startService(gpsServiceIntent);
                Log.d("simsimsim","onResume gpsServiceIntent");
            }
        }
    }



    public void hardwareBackPress() {

        long tempTime = System.currentTimeMillis();
        long intervalTime = tempTime - backPressedTime;

        if(NativeNavi.nativeIsRoute())
        {
            doBack();
        }
        else
        {
            if (0 <= intervalTime && FINSH_INTERVAL_TIME >= intervalTime) {
                moveTaskToBack(true);
                new Handler().postDelayed(new Runnable()
                {
                    @Override
                    public void run()
                    {
                        release();

                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                            finishAndRemoveTask();
                        }
                        else
                        {
                            finishAffinity();
                        }

                        System.exit(0);
                        Process.killProcess(Process.myPid());

                    }
                }, 500);

            } else {
                backPressedTime = tempTime;
                FatosToast.ShowFatosYellow(getResources().getString(R.string.string_backbtnexit));
            }
        }
    }

    public void release()
    {
        m_NaviCallback.release();

        ReactManager.sharedObject().release();

        if (gpsServiceIntent != null) {
            stopService(gpsServiceIntent);
            gpsServiceIntent = null;
        }
    }

    @Override
    public void OnRouteStart(int routeType, int ierror, String value, boolean bLocalResult)
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

        if(module != null)
        {
            // 이탈 재탐은 보이고 주탐만 안보이게

            switch (routeType) {
                case NaviCallback.NAVI_ROUTE_TYPE_DEFAULT:
                    module.ShowIndicatorListener();
                    break;

                case NaviCallback.NAVI_ROUTE_TYPE_REROUTE:
                    module.ShowIndicatorListener();
                    break;

                case NaviCallback.NAVI_ROUTE_TYPE_PERIODIC:
                    break;
            }
        }
    }

    @Override
    public void OnRouteResult(int routeType, int ierror, RgDataContext context, boolean bLocalResult)
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

        if(module != null)
        {
            module.HideIndicatorListener();

            RgDataContext rgDataContext = NativeNavi.nativeReqeustRouteContext();

            if(rgDataContext == null)
            {

            }
            else
            {
                double startX = AMapPositionManager.getSelectStartFlagLonX();
                double startY = AMapPositionManager.getSelectStartFlagLatY();

                double endX = AMapPositionManager.getDestLongX();
                double endY = AMapPositionManager.getDestLatY();

                FatosMapViewManager.onStartGoalSet(startX, startY,null, endX, endY, null);

                switch (routeType) {
                    case NaviCallback.NAVI_ROUTE_TYPE_DEFAULT:
                        break;

                    case NaviCallback.NAVI_ROUTE_TYPE_REROUTE:
                    {
                        NativeNavi.nativeStartRouteGuidance();
                    }
                    break;

                    case NaviCallback.NAVI_ROUTE_TYPE_PERIODIC:
                    {
                        NativeNavi.nativeStartRouteGuidance();
                    }
                    break;
                }
            }

            module.RouteResultListener(routeType, ierror);
        }
    }

    @Override
    public void OnRouteCancel()
    {

    }

    @Override
    public void OnRouteComplete()
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

        if(module != null)
        {
            module.CancelRoute();
            module.RouteCompleteListener();
        }
    }

    @Override
    public void OnRouteViaComplete(String strJson)
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();
        if(module != null)
        {
            module.ViaCompleteListener(strJson);
        }
    }


    @Override
    public void OnInitializeStatus(int status, String value)
    {
        FatosNaviBridgeModule module = FatosNaviBridgeModule.GetInstance();

        if(module != null)
        {
            module.InitializeStatusListener(status, value);
        }
    }

    public void doBack() {

        String strMessage = "";

        if(NativeNavi.nativeIsSimulationMode())
        {
            strMessage = getResources().getString(biz.fatossdk.anavi.R.string.string_routesimul_exit);
        }
        else
        {
            strMessage = getResources().getString(biz.fatossdk.anavi.R.string.string_routeguidance_exit);
        }

        new AlertDialog.Builder(this)
                .setTitle(/*getString(R.string.app_name)*/ "")
                .setMessage(strMessage)
                .setPositiveButton(getResources().getString(biz.fatossdk.anavi.R.string.string_no), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {

                        dialogInterface.dismiss();;
                    }
                })
                .setNegativeButton(getResources().getString(biz.fatossdk.anavi.R.string.string_yes), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        updateRouteCancel(true);
                        dialogInterface.dismiss();;
                    }
                })
                .show();
    }

    public void updateRouteCancel(boolean bUserCancel)
    {
        ReactManager.sharedObject().updateRouteCancel(bUserCancel);
    }

}