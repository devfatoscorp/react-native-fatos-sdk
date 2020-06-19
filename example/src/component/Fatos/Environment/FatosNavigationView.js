import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  ScrollView,
  Image,
} from "react-native";

import { TabNavigator, StackNavigator, NavigationActions } from "react-navigation";

import Dialog, { DialogTitle, SlideAnimation } from "react-native-popup-dialog";

import FatosEnvManager from "../../Manager/FatosEnvManager";
import SwitchSelector from "react-native-switch-selector";
import FastImage from "react-native-fast-image";
import COMMON from "../../common/common";
import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import FatosUtil from "../../common/FatosUtil";
import FatosUIManager from "../../Manager/FatosUIManager";

const routeImg = [
  require("../../../../res/drawable/m_s_setting_map_route_01.png"),
  require("../../../../res/drawable/m_s_setting_map_route_02.png"),
  require("../../../../res/drawable/m_s_setting_map_route_03.png"),
  require("../../../../res/drawable/m_s_setting_map_route_04.png"),
];

const carvataImg = [
  require("../../../../res/drawable/m_s_setting_map_car_01.png"),
  require("../../../../res/drawable/m_s_setting_map_car_02.png"),
  require("../../../../res/drawable/m_s_setting_map_car_03.png"),
  require("../../../../res/drawable/m_s_setting_map_car_04.png"),
];

export default class FatosNavigationView extends Component {
  constructor(props) {
    super(props);
    this.preloadImages();

    this.state = {
      smart: false,
      pathLineColorDialogShow: false,
      pathLineColor: 0,
      routeOptionDialogShow: false,
      routeOption: [false, false, false, false, false],
      mapColorDialogShow: false,
      mapColor: 0,
      cameraOptionDialogShow: false,
      cameraOption: [false, false, false, false, false, false],
      operationStateDialogShow: false,
      operationState: [false, false, false],
      facilityDialogShow: false,
      facility: [false],
      guidevoiceDialogShow: false,
      guidevoice: 0,
      rediscoverDialogShow: false,
      rediscover: 0,
      wayPointDialogShow: false,
      wayPoint: 0,
      hiPass: false,
      carTypeDialogShow: false,
      carType: 0,
      fuelDialogShow: false,
      fuel: 0,
      seatPositionDialogShow: false,
      seatPosition: 0,
      carvataDialogShow: false,
      carvata: 0,
      dem: false,
    };
    var native = NativeModules.FatosEnvBridgeModule;

    native.GetPathLineColor((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.pathLineColor = Number(result);
      }
    });

    native.GetNavigationOptions((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.state.routeOption.length) {
          var routeOption = this.state.routeOption;

          for (var i = 0; i < arr.length; ++i) {
            routeOption[i] = arr[i];
          }

          this.state.routeOption = routeOption;
        }
      }
    });

    native.GetMapColor((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.mapColor = Number(result);
      }
    });

    native.GetSmartDrivingMode((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.smart = result == "true";
      }
    });

    native.GetCamreaOptions((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.state.cameraOption.length) {
          var cameraOption = this.state.cameraOption;

          for (var i = 0; i < arr.length; ++i) {
            cameraOption[i] = arr[i];
          }

          this.state.cameraOption = cameraOption;
        }
      }
    });

    native.GetOperationState((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.state.operationState.length) {
          var operationState = this.state.operationState;

          for (var i = 0; i < arr.length; ++i) {
            operationState[i] = arr[i];
          }

          this.state.operationState = operationState;
        }
      }
    });

    native.GetFacility((error, result) => {
      if (error) {
        console.error(error);
      } else {
        var arr = JSON.parse(result);

        if (arr.length == this.state.facility.length) {
          var facility = this.state.facility;

          for (var i = 0; i < arr.length; ++i) {
            facility[i] = arr[i];
          }
          this.state.facility = facility;
        }
      }
    });

    native.GetGuidevoice((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.guidevoice = Number(result);
      }
    });

    native.GetRediscover((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.rediscover = Number(result);
      }
    });

    native.GetWayPoint((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.wayPoint = Number(result);
      }
    });

    native.GetHiPass((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.hiPass = result == "true";
      }
    });

    native.GetCarType((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.carType = Number(result);
      }
    });

    native.GetFuel((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.fuel = Number(result);
      }
    });

    native.GetSeatPosition((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.seatPosition = Number(result);
      }
    });

    native.GetCarvata((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.carvata = Number(result);
      }
    });

    native.GetDem((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.state.dem = result === "true";
      }
    });
  }

  preloadImages() {
    var uris = routeImg.map((image) => ({
      uri: Image.resolveAssetSource(image).uri,
    }));

    uris = carvataImg.map((image) => ({
      uri: Image.resolveAssetSource(image).uri,
    }));
  }

  showPathLineColor() {
    this.setState({ pathLineColorDialogShow: true });
  }

  showRouteOption() {
    this.setState({ routeOptionDialogShow: true });
  }

  showMapColor() {
    this.setState({ mapColorDialogShow: true });
  }

  showCameraOption() {
    this.setState({ cameraOptionDialogShow: true });
  }

  showOperationStateDialog() {
    this.setState({ operationStateDialogShow: true });
  }

  showFacilityDialog() {
    this.setState({ facilityDialogShow: true });
  }

  showGuidevoiceDialog() {
    this.setState({ guidevoiceDialogShow: true });
  }

  showRediscoverDialog() {
    this.setState({ rediscoverDialogShow: true });
  }

  showWayPointDialog() {
    // this.setState( { wayPointDialogShow : true});
  }

  showCarTypeDialog() {
    this.setState({ carTypeDialogShow: true });
  }

  showFuelDialog() {
    this.setState({ fuelDialogShow: true });
  }

  showSeatPositionDialog() {
    this.setState({ seatPositionDialogShow: true });
  }

  showCarvataDialog() {
    this.setState({ carvataDialogShow: true });
  }

  setHiPass() {
    var hiPass = true;
    if (this.state.hiPass === true) {
      hiPass = false;
    }
    this.setState({ hiPass: hiPass });

    var native = NativeModules.FatosEnvBridgeModule;
    native.SetHiPass(hiPass);
  }

  setSmartMode() {
    var smart = true;
    if (this.state.smart === true) {
      smart = false;
    }

    this.setState({ smart: smart });

    var native = NativeModules.FatosEnvBridgeModule;
    native.SetSmartDrivingMode(smart);
  }

  setDem() {
    var dem = true;
    if (this.state.dem === true) {
      dem = false;
    }
    this.setState({ dem: dem });

    var native = NativeModules.FatosEnvBridgeModule;
    native.SetDem(dem);
  }

  onPressPathLineColor(tag) {
    this.setState({ pathLineColor: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetPathLineColor(tag);
  }

  onPressRouteOption(tag) {
    var routeOption = this.state.routeOption;

    var nCurCheckCount = 0;
    // 체크할때만 맥스 카운트 검사
    if (routeOption[tag] == false) {
      for (var i = 0; i < routeOption.length; ++i) {
        if (routeOption[i] == true) {
          ++nCurCheckCount;
        }
      }
    }

    if (nCurCheckCount >= COMMON.MAX_ROUTE_OPTION) {
      this.showRouteOptionToast();
      return;
    }

    var arr = [];
    for (var i = 0; i < routeOption.length; ++i) {
      if (i == tag) {
        arr.push(!routeOption[i]);
      } else {
        arr.push(routeOption[i]);
      }
    }

    this.setState({ routeOption: arr });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetNavigationOptions(arr);
  }

  onPressMapColor(tag) {
    this.setState({ mapColor: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetMapColor(tag);
  }

  onPressOperationState(tag) {
    var operationState = this.state.operationState;

    var arr = [];
    for (var i = 0; i < operationState.length; ++i) {
      if (i == tag) {
        arr.push(!operationState[i]);
      } else {
        arr.push(operationState[i]);
      }
    }

    this.setState({ operationState: arr });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetOperationState(arr);
  }

  onPressCameraOption(tag) {
    var cameraOption = this.state.cameraOption;

    var arr = [];
    for (var i = 0; i < cameraOption.length; ++i) {
      if (i == tag) {
        arr.push(!cameraOption[i]);
      } else {
        arr.push(cameraOption[i]);
      }
    }

    this.setState({ cameraOption: arr });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetCamreaOptions(arr);
  }

  onPressFacility(tag) {
    var facility = this.state.facility;

    var arr = [];
    for (var i = 0; i < facility.length; ++i) {
      if (i == tag) {
        arr.push(!facility[i]);
      } else {
        arr.push(facility[i]);
      }
    }

    this.setState({ facility: arr });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetFacility(arr);
  }

  onPressGuidevoice(tag) {
    this.setState({ guidevoice: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetGuidevoice(tag);
  }

  onPressRediscover(tag) {
    this.setState({ rediscover: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetRediscover(tag);
  }

  onPressWayPoint(tag) {
    this.setState({ wayPoint: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetWayPoint(tag);
  }

  onPressCarType(tag) {
    this.setState({ carType: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetCarType(tag);
  }

  onPressFuel(tag) {
    this.setState({ fuel: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetFuel(tag);
  }

  onPressSeatPosition(tag) {
    this.setState({ seatPosition: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetSeatPosition(tag);

    FatosEnvManager.GetInstance().setSeatPosition(tag);
  }

  onPressCarvata(tag) {
    this.setState({ carvata: tag });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetCarvata(tag);
  }

  getPathLineColorDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strRouteColor = languageManager.getCodeName("map_themes");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ pathLineColorDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ pathLineColorDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ pathLineColorDialogShow: false });
        }}
        visible={this.state.pathLineColorDialogShow}
        dialogTitle={<DialogTitle title={strRouteColor} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getPathLineColorDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getPathLineColorDiglogContent() {
    var pathLineColor = this.state.pathLineColor;

    var dialogContent = (
      <View style={styles.optionView2}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={pathLineColor == 0 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressPathLineColor(0);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={routeImg[0]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={pathLineColor == 1 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressPathLineColor(1);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={routeImg[1]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={pathLineColor == 2 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressPathLineColor(2);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={routeImg[2]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={pathLineColor == 3 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressPathLineColor(3);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={routeImg[3]} />
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getRouteOptionDialog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strRouteOption = languageManager.getCodeName("route_option");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ routeOptionDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ routeOptionDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ routeOptionDialogShow: false });
        }}
        visible={this.state.routeOptionDialogShow}
        dialogTitle={<DialogTitle title={strRouteOption} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getRouteOptionDialogContent()}
      </Dialog>
    );

    return dialog;
  }

  getRouteOptionDialogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strRecommended = languageManager.getCodeName("recommended");
    var strExpresswayPriority = languageManager.getCodeName("expressway_priority");
    var strFreeroodfirst = languageManager.getCodeName("freerood_first");
    var strAvoidTollroads = languageManager.getCodeName("avoid_toll_roads");
    var strShortestRoute = languageManager.getCodeName("shortest_route");

    var dialogContent = (
      <View style={styles.optionView1}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.routeOption[0] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteOption(0);
            }}
          >
            <Text style={styles.optionText}>{strRecommended}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.routeOption[1] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteOption(1);
            }}
          >
            <Text style={styles.optionText}>{strExpresswayPriority}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.routeOption[2] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteOption(2);
            }}
          >
            <Text style={styles.optionText}>{strFreeroodfirst}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.routeOption[3] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteOption(3);
            }}
          >
            <Text style={styles.optionText}>{strAvoidTollroads}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.routeOption[4] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteOption(4);
            }}
          >
            <Text style={styles.optionText}>{strShortestRoute}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getMapColorDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strMapthemes = languageManager.getCodeName("map_themes");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ mapColorDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ mapColorDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ mapColorDialogShow: false });
        }}
        visible={this.state.mapColorDialogShow}
        dialogTitle={<DialogTitle title={strMapthemes} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getMapColorDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getMapColorDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strOption1 = languageManager.getCodeName("day");
    var strOption2 = languageManager.getCodeName("night");
    var strOption3 = languageManager.getCodeName("auto");

    const options = [
      { label: strOption1, value: 0 },
      { label: strOption2, value: 1 },
      { label: strOption3, value: 2 },
    ];

    var dialogContent = (
      <View style={styles.optionView2}>
        <SwitchSelector
          initial={this.state.mapColor}
          options={options}
          textColor={"rgba(0, 0, 0, 1.0)"}
          selectedColor={"rgba(255, 255, 255, 1.0)"}
          buttonColor={"rgba(92, 184, 182, 1.0)"}
          borderColor={"rgba(92, 184, 182, 1.0)"}
          onPress={(value) => this.onPressMapColor(value)}
        />
      </View>
    );

    return dialogContent;
  }

  getCameraOptionDialog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strSpeedAlert = languageManager.getCodeName("speed_alert");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ cameraOptionDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ cameraOptionDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ cameraOptionDialogShow: false });
        }}
        visible={this.state.cameraOptionDialogShow}
        dialogTitle={<DialogTitle title={strSpeedAlert} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getCameraOptionDialogContent()}
      </Dialog>
    );

    return dialog;
  }

  getCameraOptionDialogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strFixedCam = languageManager.getCodeName("fixed_cam");
    var strMobileCam = languageManager.getCodeName("mobile_cam");
    var strSignalControl = languageManager.getCodeName("signal_control");
    var strIntervention = languageManager.getCodeName("intervention");
    var strPaking = languageManager.getCodeName("paking");
    var strBuslane = languageManager.getCodeName("buslane");

    var dialogContent = (
      <View style={styles.optionView1}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.cameraOption[0] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(0);
            }}
          >
            <Text style={styles.optionText}>{strFixedCam}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.cameraOption[1] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(1);
            }}
          >
            <Text style={styles.optionText}>{strMobileCam}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.cameraOption[2] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(2);
            }}
          >
            <Text style={styles.optionText}>{strSignalControl}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.cameraOption[3] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(3);
            }}
          >
            <Text style={styles.optionText}>{strIntervention}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.cameraOption[4] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(4);
            }}
          >
            <Text style={styles.optionText}>{strPaking}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.cameraOption[5] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCameraOption(5);
            }}
          >
            <Text style={styles.optionText}>{strBuslane}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getOperationStateDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strDriveCatefully = languageManager.getCodeName("drive_catefully");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ operationStateDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ operationStateDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ operationStateDialogShow: false });
        }}
        visible={this.state.operationStateDialogShow}
        dialogTitle={<DialogTitle title={strDriveCatefully} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getOperationStateDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getOperationStateDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strSharpCurve = languageManager.getCodeName("sharp_curve");
    var strChild = languageManager.getCodeName("child_zone");
    var strAccident = languageManager.getCodeName("accident");

    var dialogContent = (
      <View style={styles.optionView2}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.operationState[0] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressOperationState(0);
            }}
          >
            <Text style={styles.optionText}>{strSharpCurve}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.operationState[1] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressOperationState(1);
            }}
          >
            <Text style={styles.optionText}>{strChild}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={this.state.operationState[2] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressOperationState(2);
            }}
          >
            <Text style={styles.optionText}>{strAccident}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getFacilityDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strFacilty = languageManager.getCodeName("facilty");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ facilityDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ facilityDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ facilityDialogShow: false });
        }}
        visible={this.state.facilityDialogShow}
        dialogTitle={<DialogTitle title={strFacilty} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getFacilityDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getFacilityDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strTrafficInfo = languageManager.getCodeName("traffic_info");

    var dialogContent = (
      <View style={styles.optionView2}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={this.state.facility[0] == true ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressFacility(0);
            }}
          >
            <Text style={styles.routeOptionText}>{strTrafficInfo}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getGuidevoiceDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strGuideType = languageManager.getCodeName("guide_type");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ guidevoiceDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ guidevoiceDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ guidevoiceDialogShow: false });
        }}
        visible={this.state.guidevoiceDialogShow}
        dialogTitle={<DialogTitle title={strGuideType} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getGuidevoiceDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getGuidevoiceDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strOption1 = languageManager.getCodeName("detail_guide");
    var strOption2 = languageManager.getCodeName("simple_guide");

    const options = [{ label: strOption1, value: 0 }, { label: strOption2, value: 1 }];

    var dialogContent = (
      <View style={styles.optionView2}>
        <SwitchSelector
          initial={this.state.guidevoice}
          options={options}
          textColor={"rgba(0, 0, 0, 1.0)"}
          selectedColor={"rgba(255, 255, 255, 1.0)"}
          buttonColor={"rgba(92, 184, 182, 1.0)"}
          borderColor={"rgba(92, 184, 182, 1.0)"}
          onPress={(value) => this.onPressGuidevoice(value)}
        />
      </View>
    );

    return dialogContent;
  }

  getRediscoverDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strAutoReRoute = languageManager.getCodeName("auto_reroute");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ rediscoverDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ rediscoverDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ rediscoverDialogShow: false });
        }}
        visible={this.state.rediscoverDialogShow}
        dialogTitle={<DialogTitle title={strAutoReRoute} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getRediscoverDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getRediscoverDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strOption1 = languageManager.getCodeName("on");
    var strOption2 = languageManager.getCodeName("off");

    const options = [{ label: strOption1, value: 0 }, { label: strOption2, value: 1 }];

    var dialogContent = (
      <View style={styles.optionView2}>
        <SwitchSelector
          initial={this.state.rediscover}
          options={options}
          textColor={"rgba(0, 0, 0, 1.0)"}
          selectedColor={"rgba(255, 255, 255, 1.0)"}
          buttonColor={"rgba(92, 184, 182, 1.0)"}
          borderColor={"rgba(92, 184, 182, 1.0)"}
          onPress={(value) => this.onPressRediscover(value)}
        />
      </View>
    );

    return dialogContent;
  }

  getWayPointDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strWatpoint = languageManager.getCodeName("way_point");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ wayPointDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ wayPointDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ wayPointDialogShow: false });
        }}
        visible={this.state.wayPointDialogShow}
        dialogTitle={<DialogTitle title={strWatpoint} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getWayPointDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getWayPointDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strMin = languageManager.getCodeName("min");
    var strOption1 = "5" + strMin;
    var strOption2 = "10" + strMin;

    const options = [{ label: strOption1, value: 0 }, { label: strOption2, value: 1 }];

    var dialogContent = (
      <View style={styles.optionView2}>
        <SwitchSelector
          initial={this.state.wayPoint}
          options={options}
          textColor={"rgba(0, 0, 0, 1.0)"}
          selectedColor={"rgba(255, 255, 255, 1.0)"}
          buttonColor={"rgba(92, 184, 182, 1.0)"}
          borderColor={"rgba(92, 184, 182, 1.0)"}
          onPress={(value) => this.onPressWayPoint(value)}
        />
      </View>
    );

    return dialogContent;
  }

  getCarTypeDialog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strVehicleType = languageManager.getCodeName("vehicle_type");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ carTypeDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ carTypeDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ carTypeDialogShow: false });
        }}
        visible={this.state.carTypeDialogShow}
        dialogTitle={<DialogTitle title={strVehicleType} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getCarTypeDialogContent()}
      </Dialog>
    );

    return dialog;
  }

  getCarTypeDialogContent() {
    var carType = this.state.carType;

    var languageManager = FatosLanguageManager.GetInstance();

    var strCompact = languageManager.getCodeName("compact");
    var strPassenger = languageManager.getCodeName("passenger");
    var strSuv = languageManager.getCodeName("suv");
    var strMpv = languageManager.getCodeName("mpv");
    var strTruck = languageManager.getCodeName("truck");
    var strSpecialequipment = languageManager.getCodeName("special_equipment");

    var dialogContent = (
      <View style={styles.optionView1}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={carType == 0 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(0);
            }}
          >
            <Text style={styles.optionText}>{strCompact}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={carType == 1 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(1);
            }}
          >
            <Text style={styles.optionText}>{strPassenger}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={carType == 2 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(2);
            }}
          >
            <Text style={styles.optionText}>{strSuv}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={carType == 3 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(3);
            }}
          >
            <Text style={styles.optionText}>{strMpv}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={carType == 4 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(4);
            }}
          >
            <Text style={styles.optionText}>{strTruck}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={carType == 5 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarType(5);
            }}
          >
            <Text style={styles.optionText}>{strSpecialequipment}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getFuelDialog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strFuel = languageManager.getCodeName("fuel");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ fuelDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ fuelDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ fuelDialogShow: false });
        }}
        visible={this.state.fuelDialogShow}
        dialogTitle={<DialogTitle title={strFuel} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getFuelDialogContent()}
      </Dialog>
    );

    return dialog;
  }

  getFuelDialogContent() {
    var fuel = this.state.fuel;

    var languageManager = FatosLanguageManager.GetInstance();

    var strGasoline = languageManager.getCodeName("gasoline");
    var strDiesel = languageManager.getCodeName("diesel");
    var strElectricity = languageManager.getCodeName("electricity");

    var dialogContent = (
      <View style={styles.optionView2}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={fuel == 0 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressFuel(0);
            }}
          >
            <Text style={styles.optionText}>{strGasoline}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={fuel == 1 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressFuel(1);
            }}
          >
            <Text style={styles.optionText}>{strDiesel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={fuel == 2 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressFuel(2);
            }}
          >
            <Text style={styles.optionText}>{"LPG"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={fuel == 3 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressFuel(3);
            }}
          >
            <Text style={styles.optionText}>{strElectricity}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  getSeatPositionDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strDriverPos = languageManager.getCodeName("DriverPos");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ seatPositionDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ seatPositionDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ seatPositionDialogShow: false });
        }}
        visible={this.state.seatPositionDialogShow}
        dialogTitle={<DialogTitle title={strDriverPos} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getSeatPositionDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getSeatPositionDiglogContent() {
    var languageManager = FatosLanguageManager.GetInstance();

    var strLeft = languageManager.getCodeName("left");
    var strRight = languageManager.getCodeName("right");

    const options = [{ label: strLeft, value: 0 }, { label: strRight, value: 1 }];

    var dialogContent = (
      <View style={styles.optionView2}>
        <SwitchSelector
          initial={this.state.seatPosition}
          options={options}
          textColor={"rgba(0, 0, 0, 1.0)"}
          selectedColor={"rgba(255, 255, 255, 1.0)"}
          buttonColor={"rgba(92, 184, 182, 1.0)"}
          borderColor={"rgba(92, 184, 182, 1.0)"}
          onPress={(value) => this.onPressSeatPosition(value)}
        />
      </View>
    );

    return dialogContent;
  }

  getCarvataDiglog() {
    var languageManager = FatosLanguageManager.GetInstance();
    var strCarIconStyle = languageManager.getCodeName("car_icon_style");

    var dialog = (
      <Dialog
        onHardwareBackPress={() => {
          this.setState({ carvataDialogShow: false });
          return true;
        }}
        onDismiss={() => {
          this.setState({ carvataDialogShow: false });
        }}
        onTouchOutside={() => {
          this.setState({ carvataDialogShow: false });
        }}
        visible={this.state.carvataDialogShow}
        dialogTitle={<DialogTitle title={strCarIconStyle} align="left" />}
        dialogAnimation={new SlideAnimation({ slideFrom: "bottom" })}
      >
        {this.getCarvataDiglogContent()}
      </Dialog>
    );

    return dialog;
  }

  getCarvataDiglogContent() {
    var carvata = this.state.carvata;

    var dialogContent = (
      <View style={styles.optionView2}>
        <View style={styles.optionCol}>
          <TouchableOpacity
            style={carvata == 0 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarvata(0);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={carvataImg[0]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={carvata == 1 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarvata(1);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={carvataImg[1]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={carvata == 2 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarvata(2);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={carvataImg[2]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={carvata == 3 ? styles.optionItem1 : styles.optionItem2}
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCarvata(3);
            }}
          >
            <FastImage style={styles.routeImageStyle} source={carvataImg[3]} />
          </TouchableOpacity>
        </View>
      </View>
    );

    return dialogContent;
  }

  showRouteOptionToast() {
    var languageManager = FatosLanguageManager.GetInstance();
    var msg = languageManager.getCodeName("route_option_max_msg");
    FatosUtil.sprintf(msg, COMMON.MAX_ROUTE_OPTION);
    var message = FatosUtil.sprintf(msg, COMMON.MAX_ROUTE_OPTION);
    FatosUIManager.GetInstance().showToast(message);
  }

  render() {
    var languageManager = FatosLanguageManager.GetInstance();

    var pathLineColor = this.state.pathLineColor;
    var varvatga = this.state.carvata;
    var smart = this.state.smart === true ? "On" : "Off";
    var hiPass = this.state.hiPass === true ? "On" : "Off";
    var dem = this.state.dem === true ? "On" : "Off";

    var strMapthemes = languageManager.getCodeName("map_themes");
    var strRouteColor = languageManager.getCodeName("route_color");
    var strCarIconStyle = languageManager.getCodeName("car_icon_style");
    var strUseDynamic = languageManager.getCodeName("use_dynamic");
    var strSpeedAlert = languageManager.getCodeName("speed_alert");
    var strDriveCatefully = languageManager.getCodeName("drive_catefully");
    var strFacilty = languageManager.getCodeName("facilty");
    var strGuideType = languageManager.getCodeName("guide_type");
    var strRouteOption = languageManager.getCodeName("route_option");
    var strAutoReRoute = languageManager.getCodeName("auto_reroute");
    var strWaypoint = languageManager.getCodeName("way_point");
    var strVehicleType = languageManager.getCodeName("vehicle_type");
    var strFuel = languageManager.getCodeName("fuel");
    var strHipass = languageManager.getCodeName("hipass");
    var strDriverPos = languageManager.getCodeName("DriverPos");

    return (
      <View style={styles.navigationView}>
        <ScrollView>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.2}
            onPress={() => {
              this.showPathLineColor();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strRouteColor}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <FastImage style={styles.routeImageStyle} source={routeImg[pathLineColor]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showCarvataDialog();
            }}
          >
            <View style={styles.tabViewItemLeft2}>
              <Text style={styles.tabViewItemText1}>{strCarIconStyle}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <FastImage style={styles.carvataImageStyle} source={carvataImg[varvatga]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showRouteOption();
            }}
          >
            <View style={styles.tabViewItemLeft2}>
              <Text style={styles.tabViewItemText1}>{strRouteOption}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showMapColor();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strMapthemes}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.setDem();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{"DEM"}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{dem}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.setSmartMode();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strUseDynamic}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{smart}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showCameraOption();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strSpeedAlert}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showOperationStateDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strDriveCatefully}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showFacilityDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strFacilty}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showGuidevoiceDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strGuideType}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showRediscoverDialog();
            }}
          >
            <View style={styles.tabViewItemLeft2}>
              <Text style={styles.tabViewItemText1}>{strAutoReRoute}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showWayPointDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText2}>{strWaypoint}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText2}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.setHiPass();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strHipass}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{hiPass}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showCarTypeDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strVehicleType}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showFuelDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strFuel}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabViewItem}
            activeOpacity={0.7}
            onPress={() => {
              this.showSeatPositionDialog();
            }}
          >
            <View style={styles.tabViewItemLeft}>
              <Text style={styles.tabViewItemText1}>{strDriverPos}</Text>
            </View>
            <View style={styles.tabViewItemRight}>
              <Text style={styles.tabViewItemText1}>{">"}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {this.getPathLineColorDiglog()}
        {this.getRouteOptionDialog()}
        {this.getMapColorDiglog()}
        {this.getCameraOptionDialog()}
        {this.getOperationStateDiglog()}
        {this.getFacilityDiglog()}
        {this.getGuidevoiceDiglog()}
        {this.getRediscoverDiglog()}
        {this.getWayPointDiglog()}
        {this.getCarTypeDialog()}
        {this.getFuelDialog()}
        {this.getSeatPositionDiglog()}
        {this.getCarvataDiglog()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },

  tabViewItem: {
    width: "100%",
    height: 50,
    borderBottomColor: "rgba(131, 143, 151, 1.0)",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  tabViewItemLeft: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  tabViewItemLeft2: {
    flex: 2,
    height: 50,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  routeColor: {
    width: 80,
    height: 10,
    backgroundColor: "rgba(255, 0, 0, 1.0)",
  },

  tabViewItemRight: {
    flex: 1,
    height: 50,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  tabViewItemText1: {
    color: "black",
    fontSize: 20,
  },

  tabViewItemText2: {
    color: "rgba(196, 196, 196, 1.0)",
    fontSize: 20,
  },

  optionView1: {
    flexDirection: "column",
    width: 260,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  optionView2: {
    flexDirection: "column",
    width: 260,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  optionCol: {
    flexDirection: "row",
    flex: 1,
    height: 20,
    backgroundColor: "rgba(208, 208, 208, 1.0)",
  },

  optionItem1: {
    flex: 1,
    backgroundColor: "rgba(92, 184, 182, 1.0)",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },

  optionItem2: {
    flex: 1,
    backgroundColor: "rgba(208, 208, 208, 1.0)",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },

  optionText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },

  routeImageStyle: {
    width: 25,
    height: 25,
  },

  carvataImageStyle: {
    width: 25,
    height: 25,
  },
});
