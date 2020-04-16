import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  NativeModules
} from "react-native";

const ImageDrawable = [
  require("../../../res/drawable/list_01_straight_pnd.png"),
  require("../../../res/drawable/list_02_turn_left_pnd.png"),
  require("../../../res/drawable/list_03_turn_right_pnd.png"),
  require("../../../res/drawable/list_04_turn_slight_left_pnd.png"),
  require("../../../res/drawable/list_05_turn_slight_right_pnd.png"),
  require("../../../res/drawable/list_06_turn_sharp_left_pnd.png"),
  require("../../../res/drawable/list_07_turn_sharp_right_pnd.png"),
  require("../../../res/drawable/list_08_ramp_left_pnd.png"),
  require("../../../res/drawable/list_09_ramp_right_pnd.png"),
  require("../../../res/drawable/list_10_fork_left_pnd.png"),
  require("../../../res/drawable/list_11_fork_right_pnd.png"),
  require("../../../res/drawable/list_12_keep_left_pnd.png"),
  require("../../../res/drawable/list_13_keep_right_pnd.png"),
  require("../../../res/drawable/list_14_uturn_left_pnd.png"),
  require("../../../res/drawable/list_15_uturn_right_pnd.png"),
  require("../../../res/drawable/list_16_pturn_left_pnd.png"),
  require("../../../res/drawable/list_17_pturn_right_pnd.png"),
  require("../../../res/drawable/list_18_roundabout_left_pnd.png"),
  require("../../../res/drawable/list_19_roundabout_right_pnd.png"),
  require("../../../res/drawable/list_20_merge_pnd.png"),
  require("../../../res/drawable/list_21_1st_highway_in_pnd.png"),
  require("../../../res/drawable/list_22_1st_highway_exit_pnd.png"),
  require("../../../res/drawable/list_23_1st_highway_in_left_pnd.png"),
  require("../../../res/drawable/list_24_1st_highway_exit_left_pnd.png"),
  require("../../../res/drawable/list_25_1st_highway_in_right_pnd.png"),
  require("../../../res/drawable/list_26_1st_highway_exit_right_pnd.png"),
  require("../../../res/drawable/list_27_2nd_highway_in_pnd.png"),
  require("../../../res/drawable/list_28_2nd_highway_exit_pnd.png"),
  require("../../../res/drawable/list_29_2nd_highway_in_left_pnd.png"),
  require("../../../res/drawable/list_30_2nd_highway_exit_left_pnd.png"),
  require("../../../res/drawable/list_31_2nd_highway_in_right_pnd.png"),
  require("../../../res/drawable/list_32_2nd_highway_exit_right_pnd.png"),
  require("../../../res/drawable/list_33_tunnel_pnd.png"),
  require("../../../res/drawable/list_34_overpass1_pnd.png"),
  require("../../../res/drawable/list_35_overpass2_pnd.png"),
  require("../../../res/drawable/list_36_overpass_left_pnd.png"),
  require("../../../res/drawable/list_37_overpass_right_pnd.png"),
  require("../../../res/drawable/list_38_underpass_pnd.png"),
  require("../../../res/drawable/list_39_underpass_left_pnd.png"),
  require("../../../res/drawable/list_40_underpass_right_pnd.png"),
  require("../../../res/drawable/list_41_left_underpass_pnd.png"),
  require("../../../res/drawable/list_42_right_underpass_pnd.png"),
  require("../../../res/drawable/list_43_tollgate_pnd.png"),
  require("../../../res/drawable/list_44_ferry_train_pnd.png"),
  require("../../../res/drawable/list_45_ferry_pnd.png"),
  require("../../../res/drawable/list_46_left_overpass_pnd.png"),
  require("../../../res/drawable/list_47_right_overpass_pnd.png"),
  require("../../../res/drawable/list_48_service_area_pnd.png"),
  require("../../../res/drawable/list_49_start_pnd.png"),
  require("../../../res/drawable/list_50_goal_pnd.png"),
  require("../../../res/drawable/list_51_via1_pnd.png"),
  require("../../../res/drawable/list_52_via2_pnd.png"),
  require("../../../res/drawable/list_53_via3_pnd.png"),
  require("../../../res/drawable/list_54_restarea_pnd.png"),
  require("../../../res/drawable/list_55_via_pnd.png")
];

import FastImage from "react-native-fast-image";
import COMMON from "../common/common";
import FatosEnvManager from "../Manager/FatosEnvManager";
import FatosUIManager from "../Manager/FatosUIManager";

export default class SecondTbT extends React.Component {
  state = {
    seatPosition: 0,
    type: 0,
    dist: "",
    visible: false
  };

  constructor(props) {
    super(props);
    this.state = { CurrentFirstTbTIndex: 0 };
    this.rgData = null;

    this.preloadImages();
  }

  preloadImages() {
    const uris = ImageDrawable.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  isShow() {
    if (this.rgData != null) {
      if (
        this.rgData.SecondTbTShow !== null ||
        this.rgData.SecondTbTShow !== "undefined"
      ) {
        return this.rgData.SecondTbTShow;
      }
    }

    return false;
  }

  setRgData(data) {
    this.rgData = data;

    var nType = Number(this.rgData.NextType);
    var strDist = this.rgData.NextDist;

    if (nType !== this.state.type) {
      this.setState({ type: nType });
    }

    if (strDist !== this.state.dist) {
      this.setState({ dist: strDist });
    }
  }

  setSeatPosition(val) {
    if (val !== this.state.seatPosition) {
      this.setState({ seatPosition: val });
    }
  }

  update() {
    this.setVisible(FatosUIManager.GetInstance().isDrivingViewVisible());
  }

  setVisible(val) {
    this.setState({ visible: val });

    if (val === false) {
      this.clear();
    }
  }

  clear() {
    this.state.type = 0;
    this.state.dist = "";
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    if (this.isShow() === false) {
      return null;
    }

    var nType = this.state.type;
    var strDist = this.state.dist;

    if (FatosEnvManager.GetInstance().getSeatPosition() === 1 && nType === 14) {
      nType = 15;
    }

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.secondTbtContainer}>
          <FastImage style={styles.ImageStyle} source={ImageDrawable[nType]} />
          <Text style={styles.secondTbtRemainDist}>{strDist}</Text>
        </ImageBackground>
      </View>
    );
  }
}

const secondTbTContainer = require("./styles").SecondTbtContainer;
const secondTbTRemainDist = require("./styles").SecondTbtRemainDist;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    marginTop: 3,
    marginLeft: 10,
    marginRight: 10
  },

  ImageStyle: {
    height: 40,
    width: 40
  },

  secondTbtContainer: {
    ...secondTbTContainer
  },

  secondTbtRemainDist: {
    ...secondTbTRemainDist
  }
});
