import {NativeModules, NativeEventEmitter} from 'react-native';

export default class FatosNativeMap {
  static m_pInstance = null;
  // Native bridge
  nativeMAP = null; // js to native
  nativeEmt = null; // native to js

  static GetInstance() {
    if (FatosNativeMap.m_pInstance === null) {
      FatosNativeMap.m_pInstance = new FatosNativeMap();
      FatosNativeMap.m_pInstance.init();
    }
    return this.m_pInstance;
  }

  init() {
    this.nativeMAP = NativeModules.FatosMapViewBridgeModule;
    this.nativeEmt = new NativeEventEmitter(NativeModules.FatosMapViewBridgeModule);
  }

  /**
   * 리엑트가 이벤트 수신 준비가 되었을 경우 호출. (이것 설정하지 않으면 이벤트 수신이 안됨)
   */
  setListenReady() {
    this.nativeMAP.setListener('1');
  }

  /**
   * 뷰 모드
   * 0 MAP_VIEW_MODE_BIRD, 1 MAP_VIEW_MODE_NORTHUP, 2 MAP_VIEW_MODE_HEADING
   * @param int
   */

  setViewMode(value) {
    this.nativeMAP.setViewMode(value);
  }

  /**
   * 레이어 설정
   * baseLayerType : 0 BASEMAP_LAYER_AEROPHOTO, 1 BASEMAP_LAYER_BUILDING, 2 BASEMAP_LAYER_POI, 3 BASEMAP_LAYER_ROAD, 4 BASEMAP_LAYER_SATELLITE
   * bVisible : baseLayerType 타입 값에 따라 true, false
   * @param {int array, bool array}
   */

  setLayer(baseLayerType, bVisible) {
    this.nativeMAP.setLayer(baseLayerType, bVisible);
  }

  /**
   * 맵 줌인
   * nType : 0 MAP_ANI_TYPE_CUSTOM_ZOOMINOUT, 1 MAP_ANI_TYPE_DIRECT
   * @param int
   */

  MapLevelIn(nType) {
    this.nativeMAP.MapLevelIn(nType);
  }

  /**
   * 맵 아웃
   * nType : 0 MAP_ANI_TYPE_CUSTOM_ZOOMINOUT, 1 MAP_ANI_TYPE_DIRECT
   * @param int
   */

  MapLevelOut(nType) {
    this.nativeMAP.MapLevelOut(nType);
  }

  /**
   * 현 위치
   * @param
   */

  MapAuto() {
    this.nativeMAP.MapAuto();
  }

  /**
   * 좌표로 위치 이동
   * @param
   */
  MapMove(fLonX, fLatY) {
    this.nativeMAP.MapMove(fLonX, fLatY);
  }

  /**
   * 경로 요약 화면 셋팅
   * lineColor 는 r,g,b,a 정보를 ,(컴마) 로 구분지어 array 타입으로 넘겨줘야함 ex)176, 106, 255, 1.0
   * xScale, yScale 화면 축소 값
   * hCenter, vCenter 화면 중심 값
   * blnViewMode 값이 true면 이전 뷰 모드를 저장, 경로 요약화면은 MAP_VIEW_MODE_NORTHUP
   * @param {string array, float, float, float, float, bool}
   */

  SummaryMapSetting(lineColor, xScale, yScale, hCenter, vCenter, blnViewMode) {
    this.nativeMAP.SummaryMapSetting(
      lineColor,
      xScale,
      yScale,
      hCenter,
      vCenter,
      blnViewMode,
    );
  }

  /**
   * 기본 맵 화면 셋팅
   * 경로 요약 화면에서 기존 화면으로 돌아 갈떄 사용
   * @param
   */

  DefaultMapSetting() {
    this.nativeMAP.DefaultMapSetting();
  }

  /**
   * 경로 인덱스 셋팅 함수
   * @param int
   */

  SelectRouteLine(index) {
    this.nativeMAP.SelectRouteLine(index);
  }

  /**
   * ApplySelectRouteLine 함수
   * @param {int}
   */

  ApplySelectRouteLine(index)
  {
    this.nativeMAP.ApplySelectRouteLine(index);
  }

  /**
   * marker init 함수
   * json 파일명, 리소스 파일명
   * @param {string, string}
   */

  InitMarkerImage(strJsonFileName, strFileName) {
    this.nativeMAP.InitMarkerImage(strJsonFileName, strFileName);
  }

  /**
   * marker 그룹 Visible 함수
   * json 파일명
   * @param string
   */

  SetVisibleMarkerGroup(strJsonFileName) {
    this.nativeMAP.SetVisibleMarkerGroup(strJsonFileName);
  }

  /**
   * AddMarker 함수
   * json string
   * @param string
   */

  AddMarker(strJson) {
    this.nativeMAP.AddMarker(strJson);
  }

  /**
   * SetMarker 함수
   * json string
   * @param string
   */

  SetMarker(strJson) {
    this.nativeMAP.SetMarker(strJson);
  }

  /**
   * DelMarker 함수
   * json string
   * @param string
   */

  DelMarker(strJson) {
    this.nativeMAP.DelMarker(strJson);
  }

  /**
   * DelMarkerGroup 함수
   * json string
   * @param string
   */

  DelMarkerGroup(strJson) {
    this.nativeMAP.DelMarkerGroup(strJson);
  }

  /**
   * ClearMarker 함수
   */

  ClearMarker() {
    this.nativeMAP.ClearMarker();
  }

  /**
   * SetMapCenter 함수
   */

  SetMapCenter(hCenter, vCenter) {
    this.nativeMAP.SetMapCenter(hCenter, vCenter);
  }


  /**
   * SetUserLine 함수
   * json string
   */

  SetUserLine(strJson) {
    this.nativeMAP.SetUserLine(strJson);
  }

  /**
   * setMapLevel 함수
   * @param 맵 레벨, 애니매이션 타입 (0 애니매이션, 1 바로이동)
   */
  setMapLevel(fLevel, aniType)
  {
    this.nativeMAP.setMapLevel(fLevel, aniType);
  }

  /**
   * GetMapCenter 함수
   * @param {cb}
   */

  GetMapCenter(cb) {
    this.nativeMAP.GetMapCenter((error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);

            var hCenter = data.hCenter;
            var vCenter = data.vCenter;

            cb(hCenter, vCenter);
          }
        },
    );
  }

  /**
   * SetMapShiftCenter 함수
   */

  SetMapShiftCenter(hCenter, vCenter) {
    this.nativeMAP.SetMapShiftCenter(hCenter, vCenter);
  }


  /**
   * SetTouchState 함수
   */

  SetTouchState(state) {
    this.nativeMAP.SetTouchState(state);
  }

  /**
   * GetMapShiftCenter 함수
   * @param {cb}
   */

  GetMapShiftCenter(cb) {
    this.nativeMAP.GetMapShiftCenter((error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);

            var hCenter = data.hCenter;
            var vCenter = data.vCenter;

            cb(hCenter, vCenter);
          }
        },
    );
  }

  /**
   * 스크린 중심 값 좌표 변환 함수
   * @param {float, float, cb}
   */

  GetPosWorldFromScreen(hCenter, vCenter, cb) {
    this.nativeMAP.GetPosWorldFromScreen(hCenter, vCenter, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          var data = JSON.parse(result);

          var posx = data.x;
          var posy = data.y;

          cb(posx, posy);
        }
      },
    );
  }

  /**
   * 좌표 변환 함수
   * @param {int, int, cb}
   */

  ConvWorldtoWGS84(x, y, cb) {
    this.nativeMAP.ConvWorldtoWGS84(x, y, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);

            var xlon = data.xlon;
            var ylat = data.ylat;

            cb(xlon, ylat);
          }
        },
    );
  }

  /**
   * 스크린 중심 값 좌표 변환 함수
   * @param {float, float, cb}
   */

  GetPosWorldtoWGS84FromScreen(hCenter, vCenter, cb) {
    this.nativeMAP.GetPosWorldtoWGS84FromScreen(hCenter, vCenter, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);

            var xlon = data.xlon;
            var ylat = data.ylat;

            cb(xlon, ylat);
          }
        },
    );
  }

  /**
   * 좌표 중심 레벨값
   * @param {map, map, cb}
   * param ex : var dmin = {
      y: 37.489147,
      x: 126.579605,
    };
   var dmax = {
      y: 37.489147,
      x: 126.50332,
    };
   */

  GetFitLevelMBR_wgs84(dmin, dmax, cb) {
    this.nativeMAP.GetFitLevelMBR_wgs84(dmin, dmax, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);
            var level = data.level;
            cb(level);
          }
        },
    );
  }

  /**
   * 좌표배열 중심값, 레벨값
   * @param {map, arr, cb}
   * param ex : var vscaleScreen = {
      x: 0.5,
      y: 0.5,
    };
   * var arr = [{ y: 37.489147, x: 126.50332 }, { y: 37.489147, x: 126.579605 }];
   */

  GetFitLevelPosArray(vscaleScreen, arr, cb) {
      this.nativeMAP.GetFitLevelPosArray(vscaleScreen, arr, (error, result) => {
          if (error) {
            console.error(error);
          } else {
            var data = JSON.parse(result);

            var level = data.level;
            var x = data.x;
            var y = data.y;

            cb(x, y, level);
          }
        },
    );
  }

  /**
   * 맵 레벨이 변경 될때 마다 호출
   * @param cb
   */

  addListener_MapLevelUpdate(cb) {
    this.nativeEmt.addListener('MapLevelUpdateListener', cb);
  }

  /**
   * 맵 이동시 행정동명이 변경 될떄 마다 호출
   * @param cb
   */

  addListener_PosWorldLocationUpdate(cb) {
    this.nativeEmt.addListener('PosWorldLocationUpdateListener', cb);
  }

  /**
   * 맵 이동 상태가 변경때 호출
   * 0 현위치, 1 터치 시작, 2 터치 종료
   * @param cb
   */

  addListener_TouchMoveMode(cb) {
    this.nativeEmt.addListener('TouchMoveModeListener', cb);
  }

  /**
   * 맵 롱터치 터치 좌표
   * @param cb
   */

  addListener_MapLongTouch(cb) {
    this.nativeEmt.addListener('TouchMoveModeListener', cb);
  }

  /**
   * 맵 뷰 생성 완료
   * @param cb
   */

  addListener_MapReady(cb) {
    this.nativeEmt.addListener('MapReadyListener', cb);
  }
}
