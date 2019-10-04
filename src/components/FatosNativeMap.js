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
   * json 파일명
   * @param string
   */

  AddMarker(strJsonFileName) {
    this.nativeMAP.AddMarker(strJsonFileName);
  }

  /**
   * SetMarker 함수
   * json 파일명
   * @param string
   */

  SetMarker(strJsonFileName) {
    this.nativeMAP.SetMarker(strJsonFileName);
  }

  /**
   * DelMarker 함수
   * json 파일명
   * @param string
   */

  DelMarker(strJsonFileName) {
    this.nativeMAP.DelMarker(strJsonFileName);
  }

  /**
   * DelMarkerGroup 함수
   * json 파일명
   * @param string
   */

  DelMarkerGroup(strJsonFileName) {
    this.nativeMAP.DelMarkerGroup(strJsonFileName);
  }

  /**
   * ClearMarker 함수
   */

  ClearMarker() {
    this.nativeMAP.ClearMarker();
  }

  /**
   * 스크린 중심 값 좌표 변환 함수
   * @param {float, float, cb}
   */

  GetPosWorldFromScreen(fCenterX, fCenterY, cb) {
    this.nativeMAP.GetPosWorldFromScreen(
      fCenterX,
      fCenterY,
      (error, result) => {
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
}
