import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import FatosUtil from "../common/FatosUtil";
import FastImage from "react-native-fast-image";

export default class FatosHiPassView extends Component {
  state = {
    visible: true,
    hipassInfo: null,
  };

  constructor(props) {
    super(props);

    this.m_bBeforeComma = false;
    this.rgData = null;
  }

  componentDidMount() {}

  setRgData(data) {
    this.rgData = data;

    if (FatosUtil.checkData(this.rgData) === false) {
      return;
    }

    this.state.hipassInfo = this.rgData.HipassInfo;
  }

  update() {
    if (FatosUtil.checkData(this.state.hipassInfo) === false) {
      this.setVisible(false);
      return;
    }

    var hipassInfo = this.state.hipassInfo;
    if (hipassInfo.HiLaneCnt > 0 && hipassInfo.RemainDist < 1000 && hipassInfo.RemainDist > 0) {
      this.setVisible(true);
      return;
    }

    this.setVisible(false);
  }

  setVisible(val) {
    this.setState({ visible: val });

    if (val === false) {
      this.clear();
    }
  }

  clear() {
    this.rgData = null;
    this.state.hipassInfo = null;
  }

  getHipassLane() {
    var hipassList = new Array();

    var count = this.state.hipassInfo.LaneCnt;
    var lane = this.state.hipassInfo.HiLane;

    for (var i = 0; i < count; ++i) {
      if (((lane >> i) & 0x01) == 0x01) {
        this.m_bBeforeComma = false;
        hipassList.push(this.settingHipass(i + 1));
      } else {
        if (this.m_bBeforeComma == false) {
          hipassList.push(this.settingHipass(-1));
        }

        this.m_bBeforeComma = true;
      }
    }
    return hipassList.map((data) => {
      return data;
    });
  }

  settingHipass(laneNum) {
    var strLaneNum = "";

    if (laneNum == -1) {
      strLaneNum = "...";
    } else {
      strLaneNum = laneNum;
    }

    return <Text style={styles.text}>{strLaneNum}</Text>;
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    if (FatosUtil.checkData(this.state.hipassInfo) === false) {
      return null;
    }

    return (
      <View style={styles.container} pointerEvents="none">
        <View style={styles.hipassView}>{this.getHipassLane()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    bottom: 100,
  },

  hipassView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "rgba(83, 166, 218, 0.8)",
    paddingLeft: 10,
    paddingRight: 10,
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
