import { NativeModules } from "react-native";

export default class FatosEnvManager {
  static m_pInstance = null;

  seatPosition = 0;
  UUID = null;
  versionJson = null;
  versionName = null;
  versionCode = null;
  simulGps = false;
  drawGpsPoint = false;

  static GetInstance() {
    if (FatosEnvManager.m_pInstance === null) {
      FatosEnvManager.m_pInstance = new FatosEnvManager();
      FatosEnvManager.m_pInstance.init();
    }

    return this.m_pInstance;
  }

  init() {
    var native = NativeModules.FatosEnvBridgeModule;

    // 운전석위치 셋팅
    native.GetSeatPosition((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.seatPosition = Number(result);
      }
    });

    native.GetUUID((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.UUID = result;
      }
    });

    native.GetVersionJson((error, result) => {
      if (error) {
        console.error(error);
      } else {
        try {
          this.versionJson = JSON.parse(result);
        } catch (error) {
          console.log("GetVersionJson JSON parse error : " + error);
        }
      }
    });

    native.GetVersionName((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.versionName = result;
      }
    });

    native.GetVersionCode((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.versionCode = result;
      }
    });

    native.GetSimulGps((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.simulGps = result === "true" ? true : false;
      }
    });

    native.GetDrawGpsPoint((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.drawGpsPoint = result === "true" ? true : false;
      }
    });
  }

  getSeatPosition() {
    return this.seatPosition;
  }

  setSeatPosition(val) {
    this.seatPosition = val;
  }

  getUUID() {
    return this.UUID;
  }
  getVersionJson() {
    return this.versionJson;
  }

  getVersionName() {
    return this.versionName;
  }

  getVersionCode() {
    return this.versionCode;
  }

  setSimulGps(val) {
    this.simulGps = val;
  }

  getSimulGps() {
    return this.simulGps;
  }

  setDrawGpsPoint(val) {
    this.drawGpsPoint = val;
  }

  getDrawGpsPoint() {
    return this.drawGpsPoint;
  }
}
