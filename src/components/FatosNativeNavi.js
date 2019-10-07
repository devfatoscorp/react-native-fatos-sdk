import {NativeModules, NativeEventEmitter} from 'react-native';

export default class FatosNativeNavi {
  static m_pInstance = null;

  // Native bridge
  nativeAPI = null; // js to native
  nativeEmt = null; // native to js

  static GetInstance() {
    if (FatosNativeNavi.m_pInstance === null) {
      FatosNativeNavi.m_pInstance = new FatosNativeNavi();
      FatosNativeNavi.m_pInstance.init();
    }
    return this.m_pInstance;
  }

  init() {
    this.nativeAPI = NativeModules.FatosNaviBridgeModule;
    // eslint-disable-next-line no-undef
    this.nativeEmt = new NativeEventEmitter(NativeModules.FatosNaviBridgeModule);
  }

  /**
   * 리엑트가 이벤트 수신 준비가 되었을 경우 호출. (이것 설정하지 않으면 이벤트 수신이 안됨)
   */
  setListenReady() {
    this.nativeAPI.setListener('1');
  }

  /**
   * 수동 재탐색
   */

  rescan() {
    this.nativeAPI.Rescan();
  }

  /**
   * 경로 요청
   * startLat, startLon 출발지 좌표
   * goalLat, goalLon 목적지 좌표
   * 출발지 좌표가 '0', '0' 이면 현위치 경로 요청
   * @param {string, string, string, string}
   */

  route(startLat, startLon, goalLat, goalLon) {
    this.nativeAPI.Route(startLat, startLon, goalLat, goalLon);
  }

  /**
   * 경로 취소
   */

  cancelRoute() {
    this.nativeAPI.CancelRoute();
  }

  /**
   * 모의 주행 경로 셋팅.
   * @param int
   */

  startSimulation(index) {
    this.nativeAPI.StartSimulation(index);
  }

  /**
   * 모의 주행 정지/시작
   * 0 정지, 1 시작
   * @param int
   */

  driveControl(value) {
    this.nativeAPI.DriveControl(value);
  }

  /**
   * 모의 주행 속도
   * @param int
   */

  driveSpeed(value) {
    this.nativeAPI.DriveSpeed(value);
  }

  /**
   * 모의 주행 취소
   */

  DriveClose() {
    this.nativeAPI.DriveClose();
  }

  /**
   * 검색
   * @param string
   */

  search(searchText) {
    this.nativeAPI.Search(searchText);
  }

  /**
   * 선택된 경로로 주행 시작
   * @param int
   */

  startRouteGuidance(index) {
    this.nativeAPI.StartRouteGuidance(index);
  }

  /**
   * 안드로이드 백키 눌렀을떄 토스트 연출 처리
   */

  androidBackPress() {
    this.nativeAPI.AndroidBackPress();
  }

  /**
   * 경로 요약 정보
   * @returns {json string}
   */

  addListener_GetRouteSummaryJson(cb) {
    this.nativeEmt.GetRouteSummaryJson((error, result) => {
      if (error) {
        console.error(error);
      } else {
        cb(result);
      }
    });
  }

  /**
   * 1 초에 한번식 주행 안내 정보 업데이트 하기 위함.
   * @param cb
   */

  addListener_UpdateRG(cb) {
    this.nativeEmt.addListener('UpdateRGListener', cb);
  }

  /**
   * 경탐요청 결과를 받는다.
   * @param cb
   */

  addListener_RouteResult(cb) {
    this.nativeEmt.addListener('RouteResultListener', cb);
  }

  /**
   * 경탐요청 또는 검색시 인디게이터 표출
   * @param cb
   */

  addListener_ShowIndicator(cb) {
    this.nativeEmt.addListener('ShowIndicatorListener', cb);
  }

  /**
   * 경탐처리 또는 검색 처리 종료시 인디게이터 표출
   * @param cb
   */

  addListener_HideIndicator(cb) {
    this.nativeEmt.addListener('HideIndicatorListener', cb);
  }

  /**
   * 안드로이드 경우 권한을 허용하지 않을 경우 지도 표출 하지 않도록
   * @param cb
   */

  addListener_PermissionComplete(cb) {
    this.nativeEmt.addListener('PermissionCompleteListener', cb);
  }

  /**
   * 검색 결과 데이터
   * @param cb
   */

  addListener_SearchResult(cb) {
    this.nativeEmt.addListener('SearchResultListener', cb);
  }

  /**
   * 목적지 도착시 이벤트
   * @param cb
   */

  addListener_RouteComplete(cb) {
    this.nativeEmt.addListener('RouteCompleteListener', cb);
  }
}
