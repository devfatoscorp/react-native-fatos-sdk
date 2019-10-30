import {NativeModules, NativeEventEmitter} from 'react-native';

export default class FatosEnvMng {
  static m_pInstance = null;

  language = 0;
  pathLineColor = 0;
  routeOption = [false, false, false, false, false];
  mapColor = 0;
  smart = true;
  cameraOption = [false, false, false, false, false, false];
  operationState = [false, false, false];
  facility = [false];
  guidevoice = 0;
  rediscover = 0;
  wayPoint = 0;
  hiPass = false;
  carType = 0;
  fuel = 0;
  carvata = 0;
  dem = false;
  seatPosition = 0;
  UUID = null;
  versionJson = null;
  versionName = null;
  versionCode = null;
  gpsSimulation = false;
  gpsDrawPoint = false;
  native = null;

  static GetInstance() {
    if (FatosEnvMng.m_pInstance === null) {
      FatosEnvMng.m_pInstance = new FatosEnvMng();
      FatosEnvMng.m_pInstance.init();
    }
    return this.m_pInstance;
  }

  init() {
    this.native = NativeModules.FatosEnvBridgeModule;

    this.native.GetLanguage((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.language = Number(result);
      }
    });

    this.native.GetPathLineColor((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.pathLineColor = Number(result);
      }
    });

    this.native.GetNavigationOptions((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.routeOption.length) {
          var routeOption = this.routeOption;

          for (var i = 0; i < arr.length; ++i) {
            routeOption[i] = arr[i];
          }

          this.routeOption = routeOption;
        }
      }
    });

    this.native.GetMapColor((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.mapColor = Number(result);
      }
    });

    this.native.GetSmartDrivingMode((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.smart = result == 'true';
      }
    });

    this.native.GetCamreaOptions((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.cameraOption.length) {
          var cameraOption = this.cameraOption;

          for (var i = 0; i < arr.length; ++i) {
            cameraOption[i] = arr[i];
          }

          this.cameraOption = cameraOption;
        }
      }
    });

    this.native.GetOperationState((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.operationState.length) {
          var operationState = this.operationState;

          for (var i = 0; i < arr.length; ++i) {
            operationState[i] = arr[i];
          }

          this.operationState = operationState;
        }
      }
    });

    this.native.GetFacility((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.facility.length) {
          var facility = this.facility;

          for (var i = 0; i < arr.length; ++i) {
            facility[i] = arr[i];
          }
          this.facility = facility;
        }
      }
    });

    this.native.GetGuidevoice((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.guidevoice = Number(result);
      }
    });

    this.native.GetRediscover((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.rediscover = Number(result);
      }
    });

    this.native.GetWayPoint((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.wayPoint = Number(result);
      }
    });

    this.native.GetHiPass((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.hiPass = result == 'true';
      }
    });

    this.native.GetCarType((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.carType = Number(result);
      }
    });

    this.native.GetFuel((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.fuel = Number(result);
      }
    });

    this.native.GetSeatPosition((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.seatPosition = Number(result);
      }
    });

    this.native.GetCarvata((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.carvata = Number(result);
      }
    });

    this.native.GetDem((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.dem = result === 'true';
      }
    });

    this.native.GetUUID((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.UUID = result;
      }
    });

    this.native.GetSimulGps((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.gpsSimulation = result === 'true' ? true : false;
      }
    });

    this.native.GetDrawGpsPoint((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.gpsDrawPoint = result === 'true' ? true : false;
      }
    });

    this.native.GetVersionJson((error, result) => {
      if (error) {
        console.error(error);
      } else {
        try {
          this.versionJson = JSON.parse(result);
        } catch (error) {
          console.log('GetVersionJson JSON parse error : ' + error);
        }
      }
    });

    this.native.GetVersionName((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.versionName = result;
      }
    });

    this.native.GetVersionCode((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.versionCode = result;
      }
    });
  }

  /**
   * 언어선택
   * 0 한국어, 1 영어
   * @param int
   */

  setLanguage(value) {
    this.native.SetLanguage(value);
    this.language = value;
  }

  getLanguage() {
    return this.language;
  }

  /**
   * 경로선 색상
   * 0 빨강, 1, 파랑, 2 초록, 4 보라
   * @param int
   */

  setPathLineColor(value) {
    this.native.SetPathLineColor(value);
    this.pathLineColor = value;
  }

  /**
   * 경로선 색상
   * @returns {int}
   */

  getPathLineColor() {
    return this.pathLineColor;
  }

  /**
   * 기본경로탐색옵션
   * 추천, 고속도로 우선, 무료도로 우선, 일반도로 우선, 최단거리
   * @param bool array
   */

  setNavigationOptions(array) {
    this.native.SetNavigationOptions(array);
    this.routeOption = array;
  }

  /**
   * 기본경로탐색옵션 색상
   * @returns {bool array}
   */

  getNavigationOptions() {
    return this.routeOption;
  }

  /**
   * 지도 색상
   * 0 주간, 1 야간, 2 자동
   * @param int
   */

  setMapColor(value) {
    this.native.SetMapColor(value);
    this.mapColor = value;
  }

  /**
   * 지도 색상
   * @returns {int}
   */

  getMapColor() {
    return this.mapColor;
  }

  /**
   * 카메라
   * 고정식 카메라, 이동식 카메라, 신호단속 구간, 끼어들기 단속, 주차단속, 버스전용 차선
   * @param bool array
   */

  setCamreaOptions(array) {
    this.native.SetCamreaOptions(array);
    this.cameraOption = array;
  }

  /**
   * 카메라
   * @returns {bool array}
   */

  getCamreaOptions() {
    return this.cameraOption;
  }

  /**
   * 주의운행구간
   * 급커브 구간, 어린이보호구역, 사고다발
   * @param bool array
   */

  setOperationState(array) {
    this.native.SetOperationState(array);
    this.operationState = array;
  }

  /**
   * 주의운행구간
   * @returns {bool array}
   */

  getOperationState() {
    return this.operationState;
  }

  /**
   * 시설
   * 교통정보 수집
   * @param bool array
   */

  setFacility(array) {
    this.native.SetFacility(array);
    this.facility = array;
  }

  /**
   * 시설
   * @returns {bool array}
   */

  getFacility() {
    return this.facility;
  }

  /**
   * 안내음성
   * 0 TTS안내, 1 기본안내
   * @param int
   */

  setGuidevoice(value) {
    this.native.SetGuidevoice(value);
    this.guidevoice = value;
  }

  /**
   * 안내음성
   * @returns {int}
   */

  getGuidevoice() {
    return this.guidevoice;
  }

  /**
   * 주기적 재탐색
   * 0 적용, 1 미적용
   * @param int
   */

  setRediscover(value) {
    this.native.SetRediscover(value);
    this.rediscover = value;
  }

  /**
   * 주기적 재탐색
   * @returns {int}
   */

  getRediscover() {
    return this.rediscover;
  }

  /**
   * 경유지 방향성
   * 0 5분, 1 10분
   * @param int
   */

  setWayPoint(value) {
    this.native.SetWayPoint(value);
    this.wayPoint = value;
  }

  /**
   * 경유지 방향성
   * @returns {int}
   */

  getWayPoint() {
    return this.wayPoint;
  }

  /**
   * 하이패스
   * @param bool
   */

  setHiPass(value) {
    this.native.SetHiPass(value);
    this.hiPass = value;
  }

  /**
   * 하이패스
   * @returns {bool}
   */

  getHiPass() {
    return this.hiPass;
  }

  /**
   * 차종
   * 0 경차, 1 승용차, 2 중형 승용차, 3 대형 승합차, 4 대형 화물차, 5 특수 화물차
   * @param int
   */

  setCarType(value) {
    this.native.SetCarType(value);
    this.carType = value;
  }

  /**
   * 차종
   * @returns {int}
   */

  getCarType() {
    return this.carType;
  }

  /**
   * 유종
   * 0 휘발유, 1 경유, 2 LPG, 3 전기
   * @param int
   */

  setFuel(value) {
    this.native.SetFuel(value);
    this.fuel = value;
  }

  /**
   * 유종
   * @returns {int}
   */

  getFuel() {
    return this.fuel;
  }

  /**
   * 운전석위치
   * 0 왼쪽, 1 오른쪽
   * @param int
   */

  setSeatPosition(value) {
    this.native.SetSeatPosition(value);
    this.seatPosition = value;
  }

  /**
   * 운전석위치
   * @returns {int}
   */

  getSeatPosition() {
    return this.seatPosition;
  }

  /**
   * 현위치아이콘
   * 0 기본, 1 파랑색원, 2 빨강 화살표, 3 파란화살표
   * @param int
   */

  setCarvata(value) {
    this.native.SetCarvata(value);
    this.carvata = value;
  }

  /**
   * 현위치아이콘
   * @returns {int}
   */

  getCarvata() {
    return this.carvata;
  }

  /**
   * DEM
   * @param bool
   */

  setDem(value) {
    this.native.SetDem(value);
    this.dem = value;
  }

  /**
   * DEM
   * @returns {bool}
   */

  getDem() {
    return this.dem;
  }

  /**
   * Simul Gps
   * @param bool
   */

  setSimulGps(value) {
    this.native.SetSimulGps(value);
    this.gpsSimulation = value;
  }

  /**
   * Simul Gps
   * @returns {bool}
   */

  getSimulGps() {
    return this.gpsSimulation;
  }

  /**
   * Draw Gps Point
   * @param bool
   */

  setDrawGpsPoint(value) {
    this.native.SetDrawGpsPoint(value);
    this.gpsDrawPoint = value;
  }

  /**
   * Draw Gps Point
   * @returns {bool}
   */

  getDrawGpsPoint() {
    return this.gpsDrawPoint;
  }

  /**
   * UUID
   * @returns {string}
   */

  getUUID() {
    return this.UUID;
  }

  /**
   * UUID
   * key : nMapDate, nSearchDate, nNetworkDate, listEtc
   * @returns {json string}
   */

  getVersionJson() {
    return this.versionJson;
  }

  /**
   * VersionName
   * @returns {string}
   */

  getVersionName() {
    return this.versionName;
  }

  /**
   * VersionCode
   * @returns {string}
   */

  getVersionCode() {
    return this.versionCode;
  }
}
