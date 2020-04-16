import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter
} from "react-native";

import FastImage from "react-native-fast-image";
import FatosUtil from "../common/FatosUtil";
import COMMON from "../common/common";
import FatosLanguageManager from "../Manager/FatosLanguageManager";
import FatosUIManager from "../Manager/FatosUIManager";

const ENUM_DRIVECONTROL_STOP = 0,
  ENUM_DRIVECONTROL_PALY = 1,
  ENUM_DRIVECONTROL_MAX = 2;

const ENUM_DRIVESPEED_1X = 0,
  ENUM_DRIVESPEED_2X = 1,
  ENUM_DRIVESPEED_4X = 2,
  ENUM_DRIVESPEED_MAX = 3;

const DEFAULT_SPEED = 120;

const menuImg = [require("../../../res/drawable/btn_1_6_2_hi.png")];

const rescanImg = [require("../../../res/drawable/m_m_button_icon_11_nor.png")];

const triangleImg = [require("../../../res/drawable/info_cion_triangle.png")];

const driveControlImg = [
  require("../../../res/drawable/drive_sim_day_stop_n.png"),
  require("../../../res/drawable/drive_sim_day_play_n.png")
];

const driveSpeedImg = [
  require("../../../res/drawable/drive_sim_day_1x_n.png"),
  require("../../../res/drawable/drive_sim_day_2x_n.png"),
  require("../../../res/drawable/drive_sim_day_4x_n.png")
];

const driveCloseImg = require("../../../res/drawable/drive_sim_day_close_n.png");

export default class FatosBottomView extends Component {
  state = {
    menuViewShow: false,
    driveSimulatedViewShow: false,
    isSimulated: false,
    driveControl: ENUM_DRIVECONTROL_STOP,
    driveSpeed: ENUM_DRIVESPEED_1X,
    strCurTime: "",
    strAmFm: "",
    strDistance: "0m",
    isTime: false,
    posWorldLocation: "",
    touchMoveMode: "0",
    visible: false
  };

  constructor(props) {
    super(props);

    this.rgData = null;

    this.native = NativeModules.FatosNaviBridgeModule;

    this.mapViewEmitter = new NativeEventEmitter(
      NativeModules.FatosMapViewBridgeModule
    );

    this.mapViewEmitter.addListener("PosWorldLocationUpdateListener", data =>
      this.setState({ posWorldLocation: data })
    );

    this.mapViewEmitter.addListener("TouchMoveModeListener", data =>
      this.setState({ touchMoveMode: data })
    );

    this.preLocation = "";
    this.languageManager = FatosLanguageManager.GetInstance();

    this.preloadImages();
  }

  componentDidMount() {
    setInterval(() => {
      var date = new Date();
      var hours = date.getHours();
      var min = date.getMinutes();
      var str = "";

      var strCurTime;

      if (this.rgData != null) {
        if (FatosUtil.checkData(this.rgData.RemainTime)) {
          strCurTime = this.rgData.RemainTime;

          var remainTime = strCurTime.split(":");

          date.setHours(hours + parseInt(remainTime[0]));
          date.setMinutes(min + parseInt(remainTime[1]));

          hours = date.getHours();
          min = date.getMinutes();
        }
      }

      if (hours > 12) {
        hours -= 12;
        str = FatosLanguageManager.GetInstance().getCodeName("pm");
      } else {
        str = FatosLanguageManager.GetInstance().getCodeName("am");
      }

      this.setState({
        strCurTime:
          FatosUtil.leadingZeros(hours, 2) +
          ":" +
          FatosUtil.leadingZeros(min, 2)
      });

      this.setState({
        strAmFm: str
      });
    }, 1000);
  }

  preloadImages() {
    var uris = menuImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = rescanImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = triangleImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = driveControlImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = driveSpeedImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  menuTimer = () =>
    setTimeout(() => {
      if (this.state.menuViewShow == true) {
        this.setState({
          menuViewShow: false
        });
      }
    }, 10000);

  showMenu(isShow) {
    if (this.state.menuViewShow !== isShow) {
      this.setState({ menuViewShow: isShow });
    }
  }

  onPressMenu() {
    this.showMenu(!this.state.menuViewShow);
  }

  onPressRescan() {
    this.native.Rescan();
  }

  onPressRouteTest1() {
    this.native.RouteTest1();
    this.showMenu(false);
  }

  onPressRouteTest2() {
    this.native.RouteTest2();
    this.showMenu(false);
  }

  onPressRouteTest3() {
    this.native.RouteTest3();
    this.showMenu(false);
  }

  onPressCancelRoute() {
    this.native.CancelRoute();
    this.showMenu(false);

    FatosUIManager.GetInstance().setSelectRouteLine(0);
    FatosUIManager.GetInstance().showDefaultView();
  }

  onPressCancelDriving() {
    this.native.CancelDriving();
    this.showMenu(false);

    FatosUIManager.GetInstance().showDefaultView();
  }

  onPressRouteSummary() {
    this.props.showRouteSummary();
    this.showMenu(false);
  }

  onPressEnvironment() {
    const navigation = this.props.navigation;
    navigation.navigate("Environment");
    this.showMenu(false);
  }

  onGoTask() {
    this.native.GoTask();
    this.showMenu(false);
  }

  showSimulatedDrivingView() {
    this.setState({ driveSimulatedViewShow: true });
    this.setState({ isSimulated: true });
    this.showMenu(false);
    this.setState({ isTime: false });
  }

  hideSimulatedDrivingView() {
    this.setState({ driveSimulatedViewShow: false });
    this.setState({ isSimulated: false });
    this.setState({ isTime: true });
    this.setState({ driveSpeed: ENUM_DRIVESPEED_1X });
    this.showMenu(false);
  }

  onSimulatedDriving() {
    this.showSimulatedDrivingView();
    this.native.StartSimulation();
  }

  onDrivingTime() {
    this.setState({
      isTime: !this.state.isTime
    });
  }

  onDriveControl() {
    var nIndex = this.state.driveControl;
    this.native.DriveControl(Number(nIndex));
    ++nIndex;

    if (ENUM_DRIVECONTROL_MAX <= nIndex) {
      nIndex = ENUM_DRIVECONTROL_STOP;
    }

    this.setState({ driveControl: nIndex });
  }

  onDriveSpeed() {
    var nIndex = this.state.driveSpeed;
    ++nIndex;

    if (ENUM_DRIVESPEED_MAX <= nIndex) {
      nIndex = ENUM_DRIVESPEED_1X;
    }

    this.setState({ driveSpeed: nIndex });

    var num = 0;

    if (ENUM_DRIVESPEED_1X === nIndex) {
      num = 1;
    } else if (ENUM_DRIVESPEED_2X === nIndex) {
      num = 2;
    } else if (ENUM_DRIVESPEED_4X === nIndex) {
      num = 4;
    }

    var nSpeed = DEFAULT_SPEED * num;
    this.native.DriveSpeed(Number(nSpeed));
  }

  onDriveClose() {
    this.hideSimulatedDrivingView();
    this.native.DriveClose();
  }

  getFleetDriverMenuView() {
    var menuView;

    if (
      this.rgData.DriveMode === COMMON.eDriveMode.eDrive_RG ||
      this.rgData.DriveMode === COMMON.eDriveMode.eDrive_Simulation
    ) {
      menuView = (
        <View style={styles.menuView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onGoTask();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"GO TASK"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onSimulatedDriving();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"모의주행"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      // 주행중이 아닐떄만 모의주행 버튼 show
      var simulatedButton = null;

      if (this.rgData.DriveMode !== COMMON.eDriveMode.eDrive_RG) {
        simulatedButton = (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onSimulatedDriving();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"모의주행"}</Text>
            </View>
          </TouchableOpacity>
        );
      }

      menuView = (
        <View style={styles.menuView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteTest1();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"집으로"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteTest2();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"회사로"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCancelRoute();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"경로안내 취소"}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCancelDriving();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{`CANCEL\nDRIVING`}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onGoTask();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{"GO TASK"}</Text>
            </View>
          </TouchableOpacity>

          {simulatedButton}
        </View>
      );
    }

    return menuView;
  }

  gethiMenuView() {
    var menuView;

    var strCancelRoute = this.languageManager.getCodeName("cancel_route");
    var strRouteInfo = this.languageManager.getCodeName("route_info");
    var strSettings = this.languageManager.getCodeName("settings");

    if (
      this.rgData.DriveMode === COMMON.eDriveMode.eDrive_RG ||
      this.rgData.DriveMode === COMMON.eDriveMode.eDrive_Simulation
    ) {
      menuView = (
        <View style={styles.menuView}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressCancelRoute();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{strCancelRoute}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressRouteSummary();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{strRouteInfo}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressEnvironment();
            }}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuText}>{strSettings}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (COMMON.TEST_BUTTON === true) {
        menuView = (
          <View style={styles.menuView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.onPressRouteTest1();
              }}
            >
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>{"집으로"}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.onPressRouteTest2();
              }}
            >
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>{"회사로"}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.onPressEnvironment();
              }}
            >
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>{strSettings}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        menuView = (
          <View style={styles.menuView}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.onPressEnvironment();
              }}
            >
              <View style={styles.menuItem}>
                <Text style={styles.menuText}>{strSettings}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }

    return menuView;
  }

  setRgData(data) {
    this.rgData = data;
  }

  update() {
    var blnVisible = false;

    if (
      FatosUIManager.GetInstance().isDefaultViewVisible() ||
      FatosUIManager.GetInstance().isDrivingViewVisible()
    ) {
      blnVisible = true;
    }

    this.setVisible(blnVisible);
  }

  setVisible(val) {
    this.setState({ visible: val });
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    var menuView = null;
    var driveSimulatedView = null;
    var drivingInfoView = null;
    var bottomView = null;
    var rescanButton = null;

    if (this.state.menuViewShow === true) {
      if (this.props.fleetDriver === true) {
        menuView = this.getFleetDriverMenuView();
      } else {
        menuView = this.gethiMenuView();
      }
    }

    if (this.state.driveSimulatedViewShow === true) {
      if (this.rgData.DriveMode === COMMON.eDriveMode.eDrive_Simulation) {
        driveSimulatedView = (
          <View style={styles.driveSimulatedView}>
            <TouchableOpacity
              style={styles.driveSimulatedItem}
              activeOpacity={0.7}
              onPress={() => {
                this.onDriveControl();
              }}
            >
              <FastImage
                style={styles.driveSimulatedItem}
                source={driveControlImg[this.state.driveControl]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.driveSimulatedItem}
              activeOpacity={0.7}
              onPress={() => {
                this.onDriveSpeed();
              }}
            >
              <FastImage
                style={styles.driveSimulatedItem}
                source={driveSpeedImg[this.state.driveSpeed]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.driveSimulatedItem}
              activeOpacity={0.7}
              onPress={() => {
                this.onDriveClose();
              }}
            >
              <FastImage
                style={styles.driveSimulatedItem}
                source={driveCloseImg}
              />
            </TouchableOpacity>
          </View>
        );
      }
    }

    var strCurTime = "";
    var strAmFm = "";
    var strDistance = "0m";

    if (this.state.isTime) {
      strCurTime = this.state.strCurTime;
      strAmFm = this.state.strAmFm;
    } else {
      if (this.rgData != null) {
        if (FatosUtil.checkData(this.rgData.RemainTime)) {
          strCurTime = this.rgData.RemainTime;
        } else {
          strCurTime = "00:01";
        }
      } else {
        strCurTime = "00:01";
      }

      strAmFm = this.languageManager.getCodeName("eta");
    }

    if (this.rgData != null) {
      if (FatosUtil.checkData(this.rgData.RemainDistance)) {
        strDistance = this.rgData.RemainDistance;
      }

      if (
        this.rgData.DriveMode === COMMON.eDriveMode.eDrive_RG ||
        this.rgData.DriveMode === COMMON.eDriveMode.eDrive_Simulation
      ) {
        drivingInfoView = (
          <View style={styles.drivingInfoView}>
            <TouchableOpacity
              style={styles.drivingTimeInfoView}
              activeOpacity={0.7}
              onPress={() => {
                this.onDrivingTime();
              }}
            >
              <Text style={styles.drivingTimeInfoText1}>{strCurTime}</Text>

              <Text style={styles.drivingTimeInfoText2}>{strAmFm}</Text>

              <FastImage style={styles.ImageStyle2} source={triangleImg[0]} />
            </TouchableOpacity>

            <View style={styles.divisionView}>
              <View style={styles.division} />
            </View>

            <View style={styles.drivingKmInfoView}>
              <Text style={styles.drivingTimeInfoText3}>{strDistance}</Text>
            </View>
          </View>
        );
      }
    }

    var location = this.preLocation;

    if (this.state.touchMoveMode === "0") {
      // 현재 위치일때
      if (this.rgData != null) {
        if (FatosUtil.checkData(this.rgData.LocationText)) {
          if (this.rgData.LocationText !== "") {
            location = this.rgData.LocationText;
          }
        }
      }
    } else if (this.state.touchMoveMode === "1") {
    } else if (this.state.touchMoveMode === "2") {
      if (this.state.posWorldLocation !== "") {
        location = this.state.posWorldLocation;
      }
    }

    this.preLocation = location;

    var nDriveMode = FatosUIManager.GetInstance().getDriveMode();

    if (nDriveMode === COMMON.eDriveMode.eDrive_RG) {
      rescanButton = (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.onPressRescan();
          }}
        >
          <FastImage source={rescanImg[0]} style={styles.rescan}>
            <FastImage style={styles.ImageStyle} source={rescanImg[0]} />
          </FastImage>
        </TouchableOpacity>
      );
    }

    bottomView = (
      <View style={styles.bottomView}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.onPressMenu();
          }}
        >
          <FastImage source={menuImg[0]} style={styles.menu}>
            <FastImage style={styles.ImageStyle} source={menuImg[0]} />
          </FastImage>
        </TouchableOpacity>

        <View style={styles.TextView}>
          <Text style={styles.text} numberOfLines={1}>
            {location}
          </Text>
        </View>

        {rescanButton}
      </View>
    );

    return (
      <View style={styles.container}>
        {bottomView}
        {drivingInfoView}
        {menuView}
        {driveSimulatedView}
      </View>
    );
  }
}

var bottomView = {
  height: 50
};

var drivingInfoView = {
  width: 180,
  height: 35
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: bottomView.height,
    bottom: 0
  },

  bottomView: {
    zIndex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 2,
    borderTopColor: "gray"
  },

  ImageStyle: {
    height: bottomView.height,
    width: bottomView.height
  },

  ImageStyle2: {
    height: 12 * 0.8,
    width: 18 * 0.8,
    paddingBottom: 5
  },

  text: {
    color: "black",
    fontSize: 25
  },

  menu: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  rescan: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  TextView: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },

  menuView: {
    zIndex: 2,
    flexDirection: "column",
    position: "absolute",
    bottom: bottomView.height,
    marginLeft: 5
  },

  menuItem: {
    alignSelf: "flex-end",
    flex: 1,
    height: 50,
    width: 120,
    backgroundColor: "gray",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5
  },

  menuText: {
    color: "white",
    fontSize: 14,
    textAlign: "center"
  },

  drivingInfoView: {
    position: "absolute",
    bottom: bottomView.height,
    right: 0,
    width: drivingInfoView.width,
    height: drivingInfoView.height,
    flexDirection: "row",
    backgroundColor: "white",
    borderTopWidth: 2,
    borderTopColor: "gray",
    borderLeftWidth: 2,
    borderLeftColor: "gray",
    borderTopLeftRadius: 10
  },

  drivingTimeInfoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },

  drivingKmInfoView: {
    // flex : 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 5
  },

  divisionView: {
    margin: 5
  },

  division: {
    flex: 1,
    backgroundColor: "black",
    width: 1,
    height: "100%"
  },

  drivingTimeInfoText1: {
    color: "black",
    fontSize: 13,
    paddingLeft: 10,
    paddingRight: 5
  },

  drivingTimeInfoText2: {
    color: "black",
    fontSize: 13,
    paddingLeft: 5,
    paddingRight: 5
  },

  drivingTimeInfoText3: {
    color: "black",
    fontSize: 13,
    paddingLeft: 5,
    paddingRight: 5
  },

  driveSimulatedView: {
    zIndex: 2,
    flexDirection: "row",
    position: "absolute",
    width: 153,
    height: 50,
    backgroundColor: "gray",
    opacity: 0.8,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    bottom: bottomView.height + drivingInfoView.height + 10
  },

  driveSimulatedItem: {
    width: 45,
    height: 45,
    marginLeft: 2.5,
    marginRight: 2.5
  }
});
