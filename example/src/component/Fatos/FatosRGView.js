import React, { Component } from "react";
import {
  ImageBackground,
  Image,
  Text,
  Alert,
  View,
  Button,
  StyleSheet,
  NativeModules,
  TouchableWithoutFeedback,
  NativeEventEmitter,
  TouchableOpacity
} from "react-native";

import FastImage from "react-native-fast-image";
import FatosUIManager from "../Manager/FatosUIManager";
import FatosUtil from "../common/FatosUtil";

// 기본 셋팅값 상수 정의

const MAP_VIEW_MODE_BIRD = 0;
const MAP_VIEW_MODE_NORTHUP = 1;
const MAP_VIEW_MODE_HEADING = 2;

const MAPMODE_AIR_ON_BUILDING_ON = 0;
const MAPMODE_AIR_ON_BUILDING_OFF = 1;
const MAPMODE_AIR_OFF_BUILDING_ON = 2;
const MAPMODE_AIR_ROAD_ON_BUILDING_OFF = 3;

const DEFAULT_MAP_VIEW_MODE = MAP_VIEW_MODE_BIRD;
const DEFAULT_MAP_AERIAL_MODE = MAPMODE_AIR_ON_BUILDING_OFF;
const DEFAULT_MAP_LEVEL = 17;

// 외국언어 빌드
const buildVietnam = false;

const BASEMAP_LAYER_AEROPHOTO = "5"; // 항공 사진
const BASEMAP_LAYER_BUILDING = "8";
const BASEMAP_LAYER_POI = "9"; // 주기
const BASEMAP_LAYER_ROAD = "6"; // 도로
const BASEMAP_LAYER_SATELLITE = "4"; // 위성 이미지

const compass_bg = [
  require("../../../res/drawable/compass_bg.png"),
  require("../../../res/drawable/compass_bg_birdview.png")
];

const compass = [
  require("../../../res/drawable/d_compass_b_01.png"),
  require("../../../res/drawable/compass_north.png"),
  require("../../../res/drawable/compass_h_01.png")
];

//nor -> road -> on -> off 순서

const aero = [
  require("../../../res/drawable/map_air_road_on.png"),
  require("../../../res/drawable/map_nor.png"),
  require("../../../res/drawable/map_air_off.png"),
  require("../../../res/drawable/map_air_on.png")
];

const currpos = [require("../../../res/drawable/curpos_2_5_1.png")];

const zoomDown = [
  require("../../../res/drawable/d_zoom_down_nor.png"),
  require("../../../res/drawable/d_zoom_down_dis.png"),
  require("../../../res/drawable/d_zoom_down_sel.png")
];

const zoomLevel = [require("../../../res/drawable/d_zoom_level_bg.png")];

const zoomUp = [
  require("../../../res/drawable/d_zoom_up_nor.png"),
  require("../../../res/drawable/d_zoom_up_dis.png"),
  require("../../../res/drawable/d_zoom_up_sel.png")
];

const zoomIntervalTime = 100;

export default class FatosRGView extends Component {
  state = {
    mapViweMode: this.curMapViewMode,
    mapAerialMode: this.curMapAerialMode,
    maplevel: this.curMapLevel,
    TouchState: 0,
    visible: false
  };

  constructor(props) {
    super(props);

    this.native = NativeModules.FatosMapViewBridgeModule;
    this.nativesEmitter = new NativeEventEmitter(this.native);

    this.curMapViewMode = DEFAULT_MAP_VIEW_MODE;
    this.curMapAerialMode = DEFAULT_MAP_AERIAL_MODE;
    this.curMapLevel = DEFAULT_MAP_LEVEL;

    this.nativesEmitter.addListener("MapLevelUpdateListener", data =>
      this.setState({ maplevel: data })
    );

    this.native.setListener("1");

    this.zoomUpInterval = null;
    this.zoomOutInterval = null;
    this.rgData = null;

    this.preloadImages();
  }

  preloadImages() {
    var uris = compass_bg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = compass.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = aero.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = currpos.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = zoomDown.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = zoomLevel.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = zoomUp.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  setRgData(data) {
    this.rgData = data;
    if (this.rgData != null && FatosUtil.checkData(this.rgData.TouchState)) {
      this.setState({ TouchState: this.rgData.TouchState });
    }
  }

  onPressViewMode = () => {
    var mode = this.curMapViewMode;

    mode -= 1;

    if (mode < 0) {
      mode = MAP_VIEW_MODE_HEADING;
    }

    this.native.setViewMode(mode);
    this.curMapViewMode = mode;

    this.setState({ mapViweMode: this.curMapViewMode });
  };

  onPressAirlineMode = () => {
    var mode = this.curMapAerialMode;

    mode += 1;

    if (mode > MAPMODE_AIR_ROAD_ON_BUILDING_OFF) {
      mode = MAPMODE_AIR_ON_BUILDING_ON;
    }

    var baseLayerType;
    var bVisible;

    var blnbuildVietnam = "true";

    if (buildVietnam == true) {
      blnbuildVietnam = "false";
    } else {
      blnbuildVietnam = "true";
    }

    baseLayerType = {
      0: BASEMAP_LAYER_AEROPHOTO,
      1: BASEMAP_LAYER_BUILDING,
      2: BASEMAP_LAYER_POI,
      3: BASEMAP_LAYER_ROAD,
      4: BASEMAP_LAYER_SATELLITE
    };

    if (mode === MAPMODE_AIR_ON_BUILDING_ON) {
      var option_5 = "true";

      bVisible = {
        0: option_5,
        1: "false",
        2: blnbuildVietnam,
        3: "true",
        4: option_5
      };
    } else if (mode === MAPMODE_AIR_ON_BUILDING_OFF) {
      var option_5 = "false";

      bVisible = {
        0: option_5,
        1: "true",
        2: blnbuildVietnam,
        3: "true",
        4: option_5
      };
    } else if (mode === MAPMODE_AIR_OFF_BUILDING_ON) {
      var option_5 = "true";

      bVisible = {
        0: option_5,
        1: "false",
        2: blnbuildVietnam,
        3: "false",
        4: option_5
      };
    } else if (mode === MAPMODE_AIR_ROAD_ON_BUILDING_OFF) {
      var option_5 = "true";

      bVisible = {
        0: option_5,
        1: "true",
        2: blnbuildVietnam,
        3: "true",
        4: option_5
      };
    }

    this.native.setLayer(baseLayerType, bVisible);
    this.curMapAerialMode = mode;
    this.setState({ mapAerialMode: this.curMapAerialMode });
  };

  onMapLevelIn(type) {
    this.native.MapLevelIn(type);
  }

  onMapLevelOut(type) {
    this.native.MapLevelOut(type);
  }

  onPressMapAuto() {
    this.native.MapAuto();
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

  onZoomUpPressIn() {
    if (this.zoomUpInterval != null) {
      return;
    }

    this.onMapLevelIn(0);

    this.zoomUpInterval = setInterval(() => {
      this.onMapLevelIn(1);
    }, zoomIntervalTime);
  }

  onZoomUpPress() {
    if (this.zoomUpInterval != null) {
      clearInterval(this.zoomUpInterval);
      this.zoomUpInterval = null;
    }
  }

  onZoomOutPressIn() {
    if (this.zoomOutInterval != null) {
      return;
    }

    this.onMapLevelOut(0);

    this.zoomOutInterval = setInterval(() => {
      this.onMapLevelOut(1);
    }, zoomIntervalTime);
  }

  onZoomOutPress() {
    if (this.zoomOutInterval != null) {
      clearInterval(this.zoomOutInterval);
      this.zoomOutInterval = null;
    }
  }
  render() {
    if (this.state.visible === false) {
      return null;
    }

    // 뷰모드 이미지 조건
    var viewmode_bg;
    var viewmode_img;

    if (this.curMapViewMode === MAP_VIEW_MODE_BIRD) {
      viewmode_bg = compass_bg[1];
      viewmode_img = compass[0];
    } else if (this.curMapViewMode === MAP_VIEW_MODE_NORTHUP) {
      viewmode_bg = compass_bg[0];
      viewmode_img = compass[1];
    } else if (this.curMapViewMode === MAP_VIEW_MODE_HEADING) {
      viewmode_bg = compass_bg[0];
      viewmode_img = compass[2];
    }

    //항공모드 이미지 조건
    var aero_img;

    if (this.curMapAerialMode === MAPMODE_AIR_ON_BUILDING_ON) {
      aero_img = aero[0];
    } else if (this.curMapAerialMode === MAPMODE_AIR_ON_BUILDING_OFF) {
      aero_img = aero[1];
    } else if (this.curMapAerialMode === MAPMODE_AIR_OFF_BUILDING_ON) {
      aero_img = aero[2];
    } else if (this.curMapAerialMode === MAPMODE_AIR_ROAD_ON_BUILDING_OFF) {
      aero_img = aero[3];
    }

    var mapAutoButton = null;

    if (this.state.TouchState != 2) {
      mapAutoButton = (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.onPressMapAuto();
          }}
        >
          <FastImage source={compass_bg[0]} style={styles.TextBackgroundStyle2}>
            <FastImage style={styles.ImageStyle} source={currpos[0]} />
          </FastImage>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.zoomContainer}>
          {/* Compass Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressViewMode();
            }}
          >
            <FastImage source={viewmode_bg} style={styles.TextBackgroundStyle2}>
              <FastImage style={styles.ImageStyle} source={viewmode_img} />
            </FastImage>
          </TouchableOpacity>

          {/* Aero Button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressAirlineMode();
            }}
          >
            <FastImage
              source={compass_bg[0]}
              style={styles.TextBackgroundStyle2}
            >
              <FastImage style={styles.ImageStyle} source={aero_img} />
            </FastImage>
          </TouchableOpacity>

          {/* Map Level Button */}

          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => {
              this.onZoomUpPressIn();
            }}
            onPressOut={() => {
              this.onZoomUpPress();
            }}
            onPress={() => {
              this.onZoomUpPress();
            }}
          >
            <FastImage style={styles.ImageStyle} source={zoomUp[0]} />
          </TouchableOpacity>

          <FastImage
            activeOpacity={0.7}
            source={zoomLevel[0]}
            style={styles.TextBackgroundStyle3}
          >
            <Text style={styles.TextStyle}>{this.state.maplevel}</Text>
          </FastImage>

          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={() => {
              this.onZoomOutPressIn();
            }}
            onPressOut={() => {
              this.onZoomOutPress();
            }}
            onPress={() => {
              this.onZoomOutPress();
            }}
          >
            <FastImage style={styles.ImageStyle} source={zoomDown[0]} />
          </TouchableOpacity>

          {mapAutoButton}
        </View>
      </View>
    );
  }
}

const zoomContainer = require("./styles").zoomContainer;

const styles = StyleSheet.create({
  //flex가 없으면 wrap-content 처럼 보임
  container: {
    //position을 absoulte로 주면 각 컴포넌트의  zIndex 값에 따라 표출 순서가 정의 된다.
    //zIndex가 높은 순서대로 전면에 그려짐
    position: "absolute",
    top: "30%",
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  zoomContainer: {
    ...zoomContainer
    //뷰에 직접 style을 적용하기보다, import하는 스타일을 한번 거치면 style을 override 할 수 있다.
    //zoomContainer에 height이 50으로 적용되어있지만 여기서 다시 선언하면 해당 사이즈가 적용됨
    //height : 1000,
  },

  ImageStyle: {
    height: 50,
    width: 50
  },

  TextBackgroundStyle: {
    alignItems: "center",
    justifyContent: "center"
  },

  TextBackgroundStyle2: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2.5,
    marginBottom: 2.5
  },

  TextBackgroundStyle3: {
    alignItems: "center",
    justifyContent: "center",
    left: 1.5,
    width: 48.5
  },

  TextStyle: {
    marginTop: 5,
    marginBottom: 5,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20
  }
});
