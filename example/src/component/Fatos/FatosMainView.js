import {
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
  Platform,
  Dimensions,
  Keyboard,
  BackHandler,
  AppState,
} from "react-native";
import React, { Component, findNodeHandle } from "react";

import FatosMapView from "./FatosMapView";
import FirstTbT from "./FirstTbT";
import SecondTbT from "./SecondTbT";
import FatosRGView from "./FatosRGView";
import FatosWebView from "./FatosWebView";
import FatosBottomView from "./FatosBottomView";
import SpeedoMeter from "./SpeedoMeter";
import FatosSDIView from "./FatosSDIView";
import FatosIndicator from "./FatosIndicator";
import FatosSearchView from "./FatosSearchView";
import FatosSearchListView from "./FatosSearchListView";
import FatosRouteSummaryView from "./FatosRouteSummaryView";
import FatosSummarySearchView from "./FatosSummarySearchView";
import FatosSummarySearchListView from "./FatosSummarySearchListView";
import FatosLaneView from "./FatosLaneView";
import FatosHiPassView from "./FatosHiPassView";

import COMMON from "../common/common";
import FatosUtil from "../common/FatosUtil";
import FatosUIManager from "../Manager/FatosUIManager";
import FatosLanguageManager from "../Manager/FatosLanguageManager";
import FatosEnvManager from "../Manager/FatosEnvManager";

export default class FatosMainView extends Component {
  state = {
    indicatorVisible: false,
    permissionComplete: Platform.OS === "ios" ? true : false,
    webViewVisible: false,
    summaryData: null,
    startName: "",
    goalName: "",
    languageIndex: 0,
    searchViewVisible: false,
    render: true,
    appState: AppState.currentState,
  };

  constructor(props) {
    super(props);

    this.rgData = null;
    this.native = NativeModules.FatosNaviBridgeModule;
    this.naviEmitter = new NativeEventEmitter(NativeModules.FatosNaviBridgeModule);

    this.naviEmitter.addListener("UpdateRGListener", (data) => this.UpdateRGListener(data));

    this.naviEmitter.addListener("ShowIndicatorListener", (data) => this.ShowIndicatorListener());

    this.naviEmitter.addListener("HideIndicatorListener", (data) => this.HideIndicatorListener());

    this.naviEmitter.addListener("ShowWebViewListener", (data) => this.ShowWebViewListener());

    this.naviEmitter.addListener("HideWebViewListener", (data) => this.HideWebViewListener());

    this.naviEmitter.addListener("PermissionCompleteListener", (data) =>
      this.onPermissionComplete()
    );

    this.naviEmitter.addListener("RouteResultListener", (data) => this.RouteResultListener(data));

    this.naviEmitter.addListener("SearchResultListener", (data) => this.setSearchData(data));

    this.naviEmitter.addListener("RouteCompleteListener", (data) => this.RouteCompleteListener());

    this.naviEmitter.addListener("InitializeStatusListener", (data) =>
      this.InitializeStatusListener(data)
    );

    this.mapViewEmitter = new NativeEventEmitter(NativeModules.FatosMapViewBridgeModule);

    this.mapViewEmitter.addListener("MapLongTouchListener", (data) =>
      this.MapLongTouchListener(data)
    );

    this.mapViewEmitter.addListener("MapReadyListener", (data) => this.MapReadyListener());

    // 네이티브로 리액트 쪽으로 호출이 가능하다는 셋팅을 해준다
    this.native.setListener("1");

    this.bottomViewRef = React.createRef();
    this.searchListViewRef = React.createRef();
    this.summarySearchListViewRef = React.createRef();
    this.summarySearchViewRef = React.createRef();
    this.firstTbTViewRef = React.createRef();
    this.secondTbTViewRef = React.createRef();
    this.speedoMeterViewRef = React.createRef();
    this.SDIViewRef = React.createRef();
    this.searchViewRef = React.createRef();
    this.routeSummaryViewRef = React.createRef();
    this.laneViewRef = React.createRef();
    this.RGViewRef = React.createRef();
    this.hiPassViewRef = React.createRef();

    this.isCreateRef = false;

    this.fleetDriver = false;

    if (this.fleetDriver == true) {
      this.state.webViewVisible = true;
    }

    FatosUIManager.GetInstance().showDefaultView();
    FatosUIManager.GetInstance().setRefreshRenderRef(this.onRefreshRender.bind(this));

    this.languageManager = FatosLanguageManager.GetInstance();
    this.languageManager.addCalback(this.changeLanguage.bind(this), this.constructor.name);

    this.searchViewTimeout = null;
  }

  componentDidMount() {
    setInterval(() => {
      this.update();
    }, 1000);

    Keyboard.addListener("keyboardWillShow", () => {
      FatosUIManager.GetInstance().setKeyboardShow(true);
    });

    Keyboard.addListener("keyboardDidShow", () => {
      FatosUIManager.GetInstance().setKeyboardShow(true);
    });

    Keyboard.addListener("keyboardWillHide", () => {
      FatosUIManager.GetInstance().setKeyboardShow(false);
    });

    Keyboard.addListener("keyboardDidHide", () => {
      FatosUIManager.GetInstance().setKeyboardShow(false);
    });

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress.bind(this)
    );

    AppState.addEventListener("change", this.handleAppStateChange);
  }

  MapReadyListener() {
    //초기 버드 뷰로 셋팅
    NativeModules.FatosMapViewBridgeModule.setViewMode(0);

    //기본 언어 셋팅
    FatosEnvManager.GetInstance();
    NativeModules.FatosEnvBridgeModule.GetLanguage((error, result) => {
      if (error) {
        console.error(error);
      } else {
        this.languageManager.setLanguage(result);
        this.setState({ languageIndex: result });
      }
    });

    if (COMMON.eTestFlag.USER_LINE_TEST == true) {
      var strJson =
        '{"polygon":[{"color":[241,65,45,255],"points":[126.50842,37.52799, 126.50806,37.527855,126.506714,37.527206,126.50643,37.527065,126.50664,37.526855,126.50667,37.526817,126.506966,37.526497,126.50708,37.526367,126.50723,37.526237,126.50824,37.52543,126.51007,37.523968,126.51032,37.523773]}]}';
      NativeModules.FatosMapViewBridgeModule.SetUserLine(strJson);
    }

    if (COMMON.eTestFlag.MARKER_TEST == true) {
      NativeModules.FatosMapViewBridgeModule.InitMarkerImage(
        "marker_bus_station.json",
        "marker_bus_station.png"
      );

      var strJson = {
        key: 1000,
        pos: [126.987414, 37.56339],
        name: "테스트",
        imgname: "marker_station.png",
        visible: "true",
      };

      NativeModules.FatosMapViewBridgeModule.AddMarker(JSON.stringify(strJson));

      this.nativeEmt = new NativeEventEmitter(NativeModules.FatosMapViewBridgeModule);
      this.nativeEmt.addListener(
        "UpdatePickerInfoListener",
        this.UpdatePickerInfoListener.bind(this)
      );
    }
  }

  UpdatePickerInfoListener(json) {}

  componentWillUnmount() {
    this.languageManager.removeCallback(this.constructor.name);
    this.backHandler.remove();
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      if (this.searchViewTimeout !== null) {
        clearTimeout(this.searchViewTimeout);
        this.searchViewTimeout = null;
      }
    } else {
    }

    this.setState({ appState: nextAppState });
  };

  onPermissionComplete() {
    this.setState({ permissionComplete: true });
  }

  handleBackPress() {
    if (this.state.indicatorVisible === true) {
      return true;
    }

    // 검색 리스트
    if (FatosUIManager.GetInstance().getSearchListView() !== null) {
      if (
        FatosUIManager.GetInstance()
          .getSearchListView()
          .getIsData() === true
      ) {
        FatosUIManager.GetInstance().onSearchClose();
        FatosUIManager.GetInstance().setSearchViewVisible(false);
        FatosUIManager.GetInstance().onRefreshRender();
        return true;
      }
    }

    // 경로 요약 화면
    if (FatosUIManager.GetInstance().isSummaryViewVisible() === true) {
      if (FatosUIManager.GetInstance().getSummarySearchView() !== null) {
        FatosUIManager.GetInstance()
          .getSummarySearchView()
          .onPressClose();
        return true;
      }
    }

    this.native.AndroidBackPress();
    return true;
  }

  changeLanguage() {
    this.setState({ languageIndex: this.languageManager.getLanguageIndex() });
  }

  UpdateRGListener(data) {
    if (this.state.appState === "active") {
      if (this.state.permissionComplete == true) {
        try {
          this.rgData = JSON.parse(data);

          FatosUIManager.GetInstance().setDriveMode(this.rgData.DriveMode);

          this.firstTbTViewRef.current.setRgData(this.rgData);
          this.secondTbTViewRef.current.setRgData(this.rgData);
          this.speedoMeterViewRef.current.setRgData(this.rgData);
          this.SDIViewRef.current.setRgData(this.rgData);
          this.bottomViewRef.current.setRgData(this.rgData);
          this.laneViewRef.current.setRgData(this.rgData);
          this.searchViewRef.current.setRgData(this.rgData);
          this.routeSummaryViewRef.current.setRgData(this.rgData);
          this.RGViewRef.current.setRgData(this.rgData);
          this.hiPassViewRef.current.setRgData(this.rgData);
        } catch (error) {
          this.rgData = null;
        }
      }
    }
  }

  update() {
    if (this.state.appState === "active") {
      if (this.state.permissionComplete == true) {
        this.bottomViewRef.current.update();
        this.searchListViewRef.current.update();
        this.summarySearchListViewRef.current.update();
        this.summarySearchViewRef.current.update();
        this.firstTbTViewRef.current.update();
        this.secondTbTViewRef.current.update();
        this.speedoMeterViewRef.current.update();
        this.SDIViewRef.current.update();
        this.searchViewRef.current.update();
        this.routeSummaryViewRef.current.update();
        this.laneViewRef.current.update();
        this.RGViewRef.current.update();
        this.hiPassViewRef.current.update();
      }
    }
  }

  setSearchData(data) {
    if (this.state.summaryData === null) {
      this.searchListViewRef.current.setSearchData(data);
    } else {
      this.summarySearchListViewRef.current.setSearchData(data);

      if (this.summarySearchListViewRef.current.getStartData() != null) {
        var data = this.summarySearchListViewRef.current.getStartData();
        this.summarySearchViewRef.current.setSearchStartText(data.name);
      }

      if (this.summarySearchListViewRef.current.getGoalData() != null) {
        var data = this.summarySearchListViewRef.current.getGoalData();
        this.summarySearchViewRef.current.setSearchGoalText(data.name);
      }
    }
  }

  MapLongTouchListener(data) {}

  onPosWorldToRoute(x, y) {
    var native = NativeModules.FatosMapViewBridgeModule;

    native.ConvWorldtoWGS84(x, y, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        var data = JSON.parse(result);

        var xlon = data.xlon;
        var ylat = data.ylat;

        var navi = NativeModules.FatosNaviBridgeModule;
        navi.Route("0", "0", ylat.toString(), xlon.toString());
      }
    });
  }

  RouteCompleteListener() {
    var msg = FatosLanguageManager.GetInstance().getCodeName("arrived_destination");
    FatosUIManager.GetInstance().showToast(msg);
    this.native.SpeakUtterance(msg);
  }

  InitializeStatusListener(data) {}

  ShowIndicatorListener() {
    this.setState({ indicatorVisible: true });
  }

  HideIndicatorListener() {
    this.setState({ indicatorVisible: false });
  }

  ShowWebViewListener() {
    this.setState({ webViewVisible: true });
  }

  HideWebViewListener() {
    this.setState({ webViewVisible: false });
  }

  RouteResultListener(data) {
    if (this.fleetDriver === false) {
      var nTypeRoute = Number(data.type);
      var nError = Number(data.error);
      var strMsg = data.msg;

      if (COMMON.eTypeRoute.eTYPE_ROUTE_DEFAULT == nTypeRoute) {
        // 초기재탐색일 경우에만
        this.showRouteSummary();
      } else if (COMMON.eTypeRoute.eTYPE_ROUTE_REROUTE == nTypeRoute) {
        // 주기적 재탐색 토스트
        var msg = FatosLanguageManager.GetInstance().getCodeName("reroute_status");
        FatosUIManager.GetInstance().showToast(msg);
      }
    }
  }

  showRouteSummary() {
    // 경로 요약 정보 get
    this.native.GetRouteSummaryJson((error, result) => {
      if (error) {
        console.error(error);
      } else {
        if (FatosUtil.isStringEmpty(result) === true) {
          return;
        }

        this.setState({ summaryData: JSON.parse(result) });

        var blnViewMode = true;
        if (FatosUIManager.GetInstance().isSummaryViewVisible() === true) {
          blnViewMode = false;
        }
        FatosUIManager.GetInstance().showSummaryView();

        var lineColor = {
          0:
            "" +
            COMMON.SMMMARY_COLOR_1.R +
            "," +
            COMMON.SMMMARY_COLOR_1.G +
            "," +
            COMMON.SMMMARY_COLOR_1.B +
            "," +
            COMMON.SMMMARY_COLOR_1.A,
          1:
            "" +
            COMMON.SMMMARY_COLOR_2.R +
            "," +
            COMMON.SMMMARY_COLOR_2.G +
            "," +
            COMMON.SMMMARY_COLOR_2.B +
            "," +
            COMMON.SMMMARY_COLOR_2.A,
          2:
            "" +
            COMMON.SMMMARY_COLOR_3.R +
            "," +
            COMMON.SMMMARY_COLOR_3.G +
            "," +
            COMMON.SMMMARY_COLOR_3.B +
            "," +
            COMMON.SMMMARY_COLOR_3.A,
        };

        const screenWidth = Math.round(Dimensions.get("window").width);
        const screenHeight = Math.round(Dimensions.get("window").height);

        var margin = 420;
        var xScale = 0.6;
        var yScale = 1.0 - (screenHeight - (screenHeight - margin)) / screenHeight;
        var hCenter = 0.5;
        var vCenter = 0.5;

        // 경로 요약 mapSetting
        var mapViewBridgeModule = NativeModules.FatosMapViewBridgeModule;
        mapViewBridgeModule.SummaryMapSetting(
          lineColor,
          xScale,
          yScale,
          hCenter,
          vCenter,
          blnViewMode
        );

        if (this.state.summaryData != null) {
          if (this.summarySearchListViewRef.current.getStartData() != null) {
            var data = this.summarySearchListViewRef.current.getStartData();
            this.summarySearchViewRef.current.setSearchStartText(data.name);
          }

          if (this.summarySearchListViewRef.current.getGoalData() != null) {
            var data = this.summarySearchListViewRef.current.getGoalData();
            this.summarySearchViewRef.current.setSearchGoalText(data.name);
          }
        }

        this.routeSummaryViewRef.current.setSummaryData(this.state.summaryData);

        var index = FatosUIManager.GetInstance().getSelectRouteLine();
        var mapViewBridgeModule = NativeModules.FatosMapViewBridgeModule;
        mapViewBridgeModule.SelectRouteLine(index);
        this.routeSummaryViewRef.current.onScrollEnd(index);
      }
    });
  }

  clearSummaryData(isDriving) {
    if (this.fleetDriver == false) {
      this.setState({ summaryData: null });

      var mapViewBridgeModule = NativeModules.FatosMapViewBridgeModule;
      mapViewBridgeModule.DefaultMapSetting();

      if (isDriving === true) {
        FatosUIManager.GetInstance().showDrivingView();
      } else {
        FatosUIManager.GetInstance().showDefaultView();

        this.bottomViewRef.current.hideSimulatedDrivingView();
      }

      this.routeSummaryViewRef.current.setSummaryData(null);
    }
  }

  setStartName(startName) {
    this.setState({ startName: startName });
  }

  setGoalName(goalName) {
    this.setState({ goalName: goalName });
  }

  handleStartShouldSetResponder(evt) {
    Keyboard.dismiss();

    this.bottomViewRef.current.showMenu(false);

    this.onSearchViewVisible();

    return true;
  }

  handleMoveShouldSetResponder(evt) {}

  handleResponderRelease(evt) {}

  onSearchViewVisible() {
    FatosUIManager.GetInstance().setSearchViewVisible(true);
    this.onRefreshRender();

    if (this.searchViewTimeout !== null) {
      clearTimeout(this.searchViewTimeout);
      this.searchViewTimeout = null;
    }

    this.searchViewTimeout = setTimeout(() => {
      if (FatosUIManager.GetInstance().iskeyboardShow() === true) {
        return;
      } else {
        if (this.searchListViewRef.current.getIsData() === true) {
          return;
        }
      }

      if (this.state.indicatorVisible === true) {
        return;
      }

      FatosUIManager.GetInstance().setSearchViewVisible(false);
      this.onRefreshRender();
    }, COMMON.SEARCH_VIEW_HIDE_TIME);
  }

  onRefreshRender() {
    var refresh = true;

    if (this.state.render === true) {
      refresh = false;
    }

    this.setState({ rander: refresh });
  }

  render() {
    var indicator = null;
    var mapView = null;
    var firstTbTView = null;
    var secondTbTView = null;
    var speedoMeterView = null;
    var RGView = null;
    var SDIView = null;
    var bottomView = null;
    var searchView = null;
    var searchListView = null;
    var webView = null;
    var routeSummaryView = null;
    var summarySearchView = null;
    var summarySearchListView = null;
    var laneView = null;
    var hipassView = null;

    if (this.state.indicatorVisible === true) {
      indicator = <FatosIndicator />;
    }

    if (this.state.permissionComplete == true) {
      mapView = <FatosMapView />;
      firstTbTView = <FirstTbT ref={this.firstTbTViewRef} />;
      secondTbTView = <SecondTbT ref={this.secondTbTViewRef} />;
      speedoMeterView = <SpeedoMeter ref={this.speedoMeterViewRef} />;
      RGView = <FatosRGView ref={this.RGViewRef} />;
      SDIView = <FatosSDIView ref={this.SDIViewRef} />;
      laneView = <FatosLaneView ref={this.laneViewRef} />;
      hipassView = <FatosHiPassView ref={this.hiPassViewRef} />;
      bottomView = (
        <FatosBottomView
          ref={this.bottomViewRef}
          fleetDriver={this.fleetDriver}
          showRouteSummary={this.showRouteSummary.bind(this)}
          navigation={this.props.navigation}
        />
      );
      searchView = <FatosSearchView ref={this.searchViewRef} />;
      routeSummaryView = (
        <FatosRouteSummaryView
          ref={this.routeSummaryViewRef}
          clearSummaryData={this.clearSummaryData.bind(this)}
          bottomViewRef={this.bottomViewRef}
        />
      );
      summarySearchView = (
        <FatosSummarySearchView
          ref={this.summarySearchViewRef}
          summarySearchListView={this.summarySearchListViewRef}
          startName={this.state.startName}
          goalName={this.state.goalName}
          setStartName={this.setStartName.bind(this)}
          setGoalName={this.setGoalName.bind(this)}
          clearSummaryData={this.clearSummaryData.bind(this)}
        />
      );

      if (this.fleetDriver == true) {
        if (this.state.webViewVisible == true) {
          webView = <FatosWebView />;
        }
      } else {
        summarySearchListView = (
          <FatosSummarySearchListView
            ref={this.summarySearchListViewRef}
            summarySearchView={this.summarySearchViewRef}
            setStartName={this.setStartName.bind(this)}
            setGoalName={this.setGoalName.bind(this)}
          />
        );

        searchListView = (
          <FatosSearchListView
            ref={this.searchListViewRef}
            summarySearchListView={this.summarySearchListViewRef}
            setGoalName={this.setGoalName.bind(this)}
          />
        );
      }
    }

    FatosUIManager.GetInstance().setBottomView(this.bottomViewRef.current);
    FatosUIManager.GetInstance().setSearchListView(this.searchListViewRef.current);
    FatosUIManager.GetInstance().setSummarySearchListView(this.searchListViewRef.current);
    FatosUIManager.GetInstance().setSummarySearchView(this.summarySearchViewRef.current);
    FatosUIManager.GetInstance().setFirstTbTView(this.firstTbTViewRef.current);
    FatosUIManager.GetInstance().setSecondTbTView(this.secondTbTViewRef.current);
    FatosUIManager.GetInstance().setSDIView(this.SDIViewRef.current);
    FatosUIManager.GetInstance().setSearchView(this.searchViewRef.current);
    FatosUIManager.GetInstance().setRouteSummaryView(this.routeSummaryViewRef.current);
    FatosUIManager.GetInstance().setLaneView(this.laneViewRef.current);
    FatosUIManager.GetInstance().setHipassView(this.hiPassViewRef.current);
    FatosUIManager.GetInstance().setRGView(this.RGViewRef.current);

    return (
      <View
        style={styles.container}
        onStartShouldSetResponder={(evt) => this.handleStartShouldSetResponder(evt)}
        onMoveShouldSetResponder={(evt) => this.handleMoveShouldSetResponder(evt)}
        onResponderRelease={(evt) => this.handleResponderRelease(evt)}
      >
        {mapView}
        {firstTbTView}
        {secondTbTView}
        {speedoMeterView}
        {RGView}
        {SDIView}
        {bottomView}
        {laneView}
        {hipassView}
        {searchView}
        {searchListView}
        {routeSummaryView}
        {summarySearchView}
        {summarySearchListView}
        {webView}

        {/*<PopupWindow />*/}

        {indicator}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
