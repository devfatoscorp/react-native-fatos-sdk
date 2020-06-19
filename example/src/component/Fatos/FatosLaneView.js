import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import FastImage from "react-native-fast-image";
import FatosUtil from "../common/FatosUtil";
import { TouchableWithoutFeedback } from "../PopupWindow";
import FatosUIManager from "../Manager/FatosUIManager";

const Drawables = [
  ["laneguid_1_0", require("../../../res/drawable/laneguid_1_0.png")],
  ["laneguid_1_1", require("../../../res/drawable/laneguid_1_1.png")],
  ["laneguid_2_0", require("../../../res/drawable/laneguid_2_0.png")],
  ["laneguid_2_1", require("../../../res/drawable/laneguid_2_1.png")],
  ["laneguid_12_00", require("../../../res/drawable/laneguid_12_00.png")],
  ["laneguid_12_01", require("../../../res/drawable/laneguid_12_01.png")],
  ["laneguid_12_10", require("../../../res/drawable/laneguid_12_10.png")],
  ["laneguid_12_11", require("../../../res/drawable/laneguid_12_11.png")],
  ["laneguid_3_0", require("../../../res/drawable/laneguid_3_0.png")],
  ["laneguid_3_1", require("../../../res/drawable/laneguid_3_1.png")],
  ["laneguid_13_00", require("../../../res/drawable/laneguid_13_00.png")],
  ["laneguid_13_01", require("../../../res/drawable/laneguid_13_01.png")],
  ["laneguid_13_10", require("../../../res/drawable/laneguid_13_10.png")],
  ["laneguid_13_11", require("../../../res/drawable/laneguid_13_11.png")],
  ["laneguid_23_00", require("../../../res/drawable/laneguid_23_00.png")],
  ["laneguid_23_01", require("../../../res/drawable/laneguid_23_01.png")],
  ["laneguid_23_10", require("../../../res/drawable/laneguid_23_10.png")],
  ["laneguid_23_11", require("../../../res/drawable/laneguid_23_11.png")],
  ["laneguid_123_000", require("../../../res/drawable/laneguid_123_000.png")],
  ["laneguid_123_001", require("../../../res/drawable/laneguid_123_001.png")],
  ["laneguid_123_010", require("../../../res/drawable/laneguid_123_010.png")],
  ["laneguid_123_100", require("../../../res/drawable/laneguid_123_100.png")],
  ["laneguid_123_111", require("../../../res/drawable/laneguid_123_111.png")],
  ["laneguid_4_0", require("../../../res/drawable/laneguid_4_0.png")],
  ["laneguid_4_1", require("../../../res/drawable/laneguid_4_1.png")],
  ["laneguid_14_00", require("../../../res/drawable/laneguid_14_00.png")],
  ["laneguid_14_01", require("../../../res/drawable/laneguid_14_01.png")],
  ["laneguid_14_10", require("../../../res/drawable/laneguid_14_10.png")],
  ["laneguid_14_11", require("../../../res/drawable/laneguid_14_11.png")],
  ["laneguid_24_00", require("../../../res/drawable/laneguid_24_00.png")],
  ["laneguid_24_01", require("../../../res/drawable/laneguid_24_01.png")],
  ["laneguid_24_10", require("../../../res/drawable/laneguid_24_10.png")],
  ["laneguid_24_11", require("../../../res/drawable/laneguid_24_11.png")],
  ["laneguid_124_000", require("../../../res/drawable/laneguid_124_000.png")],
  ["laneguid_124_001", require("../../../res/drawable/laneguid_124_001.png")],
  ["laneguid_124_010", require("../../../res/drawable/laneguid_124_010.png")],
  ["laneguid_124_100", require("../../../res/drawable/laneguid_124_100.png")],
  ["laneguid_124_111", require("../../../res/drawable/laneguid_124_111.png")],
  ["laneguid_34_00", require("../../../res/drawable/laneguid_34_00.png")],
  ["laneguid_34_01", require("../../../res/drawable/laneguid_34_01.png")],
  ["laneguid_34_10", require("../../../res/drawable/laneguid_34_10.png")],
  ["laneguid_34_11", require("../../../res/drawable/laneguid_34_11.png")],
  ["laneguid_134_000", require("../../../res/drawable/laneguid_134_000.png")],
  ["laneguid_134_001", require("../../../res/drawable/laneguid_134_001.png")],
  ["laneguid_134_010", require("../../../res/drawable/laneguid_134_010.png")],
  ["laneguid_134_100", require("../../../res/drawable/laneguid_134_100.png")],
  ["laneguid_134_111", require("../../../res/drawable/laneguid_134_111.png")],
  ["laneguid_234_000", require("../../../res/drawable/laneguid_234_000.png")],
  ["laneguid_234_001", require("../../../res/drawable/laneguid_234_001.png")],
  ["laneguid_234_010", require("../../../res/drawable/laneguid_234_010.png")],
  ["laneguid_234_100", require("../../../res/drawable/laneguid_234_100.png")],
  ["laneguid_234_111", require("../../../res/drawable/laneguid_234_111.png")],
  ["laneguid_1234_0000", require("../../../res/drawable/laneguid_1234_0000.png")],
  ["laneguid_1234_0001", require("../../../res/drawable/laneguid_1234_0001.png")],
  ["laneguid_1234_0010", require("../../../res/drawable/laneguid_1234_0010.png")],
  ["laneguid_1234_0100", require("../../../res/drawable/laneguid_1234_0100.png")],
  ["laneguid_1234_1000", require("../../../res/drawable/laneguid_1234_1000.png")],
  ["laneguid_1234_1111", require("../../../res/drawable/laneguid_1234_1111.png")],
  ["laneguid_5_0", require("../../../res/drawable/laneguid_5_0.png")],
  ["laneguid_5_1", require("../../../res/drawable/laneguid_5_1.png")],
  ["laneguid_15_00", require("../../../res/drawable/laneguid_15_00.png")],
  ["laneguid_15_01", require("../../../res/drawable/laneguid_15_01.png")],
  ["laneguid_15_10", require("../../../res/drawable/laneguid_15_10.png")],
  ["laneguid_15_11", require("../../../res/drawable/laneguid_15_11.png")],
  ["laneguid_25_00", require("../../../res/drawable/laneguid_25_00.png")],
  ["laneguid_25_01", require("../../../res/drawable/laneguid_25_01.png")],
  ["laneguid_25_10", require("../../../res/drawable/laneguid_25_10.png")],
  ["laneguid_25_11", require("../../../res/drawable/laneguid_25_11.png")],
  ["laneguid_35_00", require("../../../res/drawable/laneguid_35_00.png")],
  ["laneguid_35_01", require("../../../res/drawable/laneguid_35_01.png")],
  ["laneguid_35_10", require("../../../res/drawable/laneguid_35_10.png")],
  ["laneguid_35_11", require("../../../res/drawable/laneguid_35_11.png")],
  ["laneguid_235_000", require("../../../res/drawable/laneguid_235_000.png")],
  ["laneguid_235_001", require("../../../res/drawable/laneguid_235_001.png")],
  ["laneguid_235_010", require("../../../res/drawable/laneguid_235_010.png")],
  ["laneguid_235_100", require("../../../res/drawable/laneguid_235_100.png")],
  ["laneguid_235_111", require("../../../res/drawable/laneguid_235_111.png")],
  ["laneguid_45_00", require("../../../res/drawable/laneguid_45_00.png")],
  ["laneguid_45_01", require("../../../res/drawable/laneguid_45_01.png")],
  ["laneguid_45_10", require("../../../res/drawable/laneguid_45_10.png")],
  ["laneguid_45_11", require("../../../res/drawable/laneguid_45_11.png")],
  ["laneguid_145_000", require("../../../res/drawable/laneguid_145_000.png")],
  ["laneguid_145_001", require("../../../res/drawable/laneguid_145_001.png")],
  ["laneguid_145_010", require("../../../res/drawable/laneguid_145_010.png")],
  ["laneguid_145_100", require("../../../res/drawable/laneguid_145_100.png")],
  ["laneguid_145_111", require("../../../res/drawable/laneguid_145_111.png")],
  ["laneguid_245_000", require("../../../res/drawable/laneguid_245_000.png")],
  ["laneguid_245_001", require("../../../res/drawable/laneguid_245_001.png")],
  ["laneguid_245_010", require("../../../res/drawable/laneguid_245_010.png")],
  ["laneguid_245_100", require("../../../res/drawable/laneguid_245_100.png")],
  ["laneguid_245_111", require("../../../res/drawable/laneguid_245_111.png")],
  ["laneguid_6_0", require("../../../res/drawable/laneguid_6_0.png")],
  ["laneguid_6_1", require("../../../res/drawable/laneguid_6_1.png")],
  ["laneguid_16_00", require("../../../res/drawable/laneguid_16_00.png")],
  ["laneguid_16_01", require("../../../res/drawable/laneguid_16_01.png")],
  ["laneguid_16_10", require("../../../res/drawable/laneguid_16_10.png")],
  ["laneguid_16_11", require("../../../res/drawable/laneguid_16_11.png")],
  ["laneguid_26_00", require("../../../res/drawable/laneguid_26_00.png")],
  ["laneguid_26_01", require("../../../res/drawable/laneguid_26_01.png")],
  ["laneguid_26_10", require("../../../res/drawable/laneguid_26_10.png")],
  ["laneguid_26_11", require("../../../res/drawable/laneguid_26_11.png")],
  ["laneguid_36_00", require("../../../res/drawable/laneguid_36_00.png")],
  ["laneguid_36_01", require("../../../res/drawable/laneguid_36_01.png")],
  ["laneguid_36_10", require("../../../res/drawable/laneguid_36_10.png")],
  ["laneguid_36_11", require("../../../res/drawable/laneguid_36_11.png")],
  ["laneguid_46_00", require("../../../res/drawable/laneguid_46_00.png")],
  ["laneguid_46_01", require("../../../res/drawable/laneguid_46_01.png")],
  ["laneguid_46_10", require("../../../res/drawable/laneguid_46_10.png")],
  ["laneguid_46_11", require("../../../res/drawable/laneguid_46_11.png")],
  ["laneguid_1236_0000", require("../../../res/drawable/laneguid_1236_0000.png")],
  ["laneguid_1236_0001", require("../../../res/drawable/laneguid_1236_0001.png")],
  ["laneguid_1236_0010", require("../../../res/drawable/laneguid_1236_0010.png")],
  ["laneguid_1236_0100", require("../../../res/drawable/laneguid_1236_0100.png")],
  ["laneguid_1236_1000", require("../../../res/drawable/laneguid_1236_1000.png")],
  ["laneguid_1236_1111", require("../../../res/drawable/laneguid_1236_1111.png")],
  ["laneguid_146_000", require("../../../res/drawable/laneguid_146_000.png")],
  ["laneguid_146_001", require("../../../res/drawable/laneguid_146_001.png")],
  ["laneguid_146_010", require("../../../res/drawable/laneguid_146_010.png")],
  ["laneguid_146_100", require("../../../res/drawable/laneguid_146_100.png")],
  ["laneguid_146_111", require("../../../res/drawable/laneguid_146_111.png")],
  ["laneguid_246_000", require("../../../res/drawable/laneguid_246_000.png")],
  ["laneguid_246_001", require("../../../res/drawable/laneguid_246_001.png")],
  ["laneguid_246_010", require("../../../res/drawable/laneguid_246_010.png")],
  ["laneguid_246_100", require("../../../res/drawable/laneguid_246_100.png")],
  ["laneguid_246_111", require("../../../res/drawable/laneguid_246_111.png")],
  ["laneguid_1246_0000", require("../../../res/drawable/laneguid_1246_0000.png")],
  ["laneguid_1246_0001", require("../../../res/drawable/laneguid_1246_0001.png")],
  ["laneguid_1246_0010", require("../../../res/drawable/laneguid_1246_0010.png")],
  ["laneguid_1246_0100", require("../../../res/drawable/laneguid_1246_0100.png")],
  ["laneguid_1246_1000", require("../../../res/drawable/laneguid_1246_1000.png")],
  ["laneguid_1246_1111", require("../../../res/drawable/laneguid_1246_1111.png")],
  ["laneguid_346_000", require("../../../res/drawable/laneguid_346_000.png")],
  ["laneguid_346_001", require("../../../res/drawable/laneguid_346_001.png")],
  ["laneguid_346_010", require("../../../res/drawable/laneguid_346_010.png")],
  ["laneguid_346_100", require("../../../res/drawable/laneguid_346_100.png")],
  ["laneguid_346_111", require("../../../res/drawable/laneguid_346_111.png")],
  ["laneguid_56_00", require("../../../res/drawable/laneguid_56_00.png")],
  ["laneguid_56_01", require("../../../res/drawable/laneguid_56_01.png")],
  ["laneguid_56_10", require("../../../res/drawable/laneguid_56_10.png")],
  ["laneguid_56_11", require("../../../res/drawable/laneguid_56_11.png")],
  ["laneguid_156_000", require("../../../res/drawable/laneguid_156_000.png")],
  ["laneguid_156_001", require("../../../res/drawable/laneguid_156_001.png")],
  ["laneguid_156_010", require("../../../res/drawable/laneguid_156_010.png")],
  ["laneguid_156_100", require("../../../res/drawable/laneguid_156_100.png")],
  ["laneguid_156_111", require("../../../res/drawable/laneguid_156_111.png")],
  ["laneguid_256_000", require("../../../res/drawable/laneguid_256_000.png")],
  ["laneguid_256_001", require("../../../res/drawable/laneguid_256_001.png")],
  ["laneguid_256_010", require("../../../res/drawable/laneguid_256_010.png")],
  ["laneguid_256_100", require("../../../res/drawable/laneguid_256_100.png")],
  ["laneguid_256_111", require("../../../res/drawable/laneguid_256_111.png")],
  ["laneguid_356_000", require("../../../res/drawable/laneguid_356_000.png")],
  ["laneguid_356_001", require("../../../res/drawable/laneguid_356_001.png")],
  ["laneguid_356_010", require("../../../res/drawable/laneguid_356_010.png")],
  ["laneguid_356_100", require("../../../res/drawable/laneguid_356_100.png")],
  ["laneguid_356_111", require("../../../res/drawable/laneguid_356_111.png")],
  ["laneguid_456_000", require("../../../res/drawable/laneguid_456_000.png")],
  ["laneguid_456_001", require("../../../res/drawable/laneguid_456_001.png")],
  ["laneguid_456_010", require("../../../res/drawable/laneguid_456_010.png")],
  ["laneguid_456_100", require("../../../res/drawable/laneguid_456_100.png")],
  ["laneguid_456_111", require("../../../res/drawable/laneguid_456_111.png")],
  ["laneguid_2456_0000", require("../../../res/drawable/laneguid_2456_0000.png")],
  ["laneguid_2456_0001", require("../../../res/drawable/laneguid_2456_0001.png")],
  ["laneguid_2456_0010", require("../../../res/drawable/laneguid_2456_0010.png")],
  ["laneguid_2456_0100", require("../../../res/drawable/laneguid_2456_0100.png")],
  ["laneguid_2456_1000", require("../../../res/drawable/laneguid_2456_1000.png")],
  ["laneguid_2456_1111", require("../../../res/drawable/laneguid_2456_1111.png")],
  ["under_a", require("../../../res/drawable/under_a.png")],
  ["high_a", require("../../../res/drawable/high_a.png")],
  ["under_b", require("../../../res/drawable/under_b.png")],
  ["high_b", require("../../../res/drawable/high_b.png")],
  ["bus_b", require("../../../res/drawable/bus_b.png")],
];

const CoverDrawables = [
  ["pocket_a", require("../../../res/drawable/pocket_a.png")],
  ["pocket_b", require("../../../res/drawable/pocket_b.png")],
];

export default class FatosLaneView extends Component {
  state = {
    visible: true,
    laneInfo: null,
  };

  constructor(props) {
    super(props);

    this.rgData = null;
    this.preloadImages();
  }

  componentDidMount() {}

  preloadImages() {
    var uris = Drawables.map((image) => ({
      uri: Image.resolveAssetSource(image[1]).uri,
    }));

    FastImage.preload(uris);

    uris = CoverDrawables.map((image) => ({
      uri: Image.resolveAssetSource(image[1]).uri,
    }));

    FastImage.preload(uris);
  }

  getDrawable(key) {
    var nCount = Drawables.length;

    for (var i = 0; i < nCount; ++i) {
      var node = Drawables[i];

      if (node[0] === key) {
        return node[1];
      }
    }

    return null;
  }

  getCoverDrawable(key) {
    var nCount = CoverDrawables.length;

    for (var i = 0; i < nCount; ++i) {
      var node = CoverDrawables[i];

      if (node[0] === key) {
        return node[1];
      }
    }

    return null;
  }

  getlaneImageList(list) {
    var index = 0;
    return list.map((data) => {
      var drawable = data.Drawable;
      var coverDrawable = data.CoverDrawable;
      var view = null;

      if (FatosUtil.isStringEmpty(coverDrawable) === false) {
        view = this.getCoverlaneImage(drawable, coverDrawable, index);
      } else if (FatosUtil.isStringEmpty(drawable) === false) {
        var img = this.getDrawable(drawable);

        if (img != null) {
          view = <FastImage style={styles.laneImage} source={img} key={index} />;
        }
      }

      ++index;
      return view;
    });
  }

  getCoverlaneImage(drawable, coverDrawable, index) {
    var cover = null;
    var lane = null;
    var view = null;
    var img1 = this.getCoverDrawable(coverDrawable);
    var img2 = this.getDrawable(drawable);

    if (img1 != null) {
      cover = <FastImage style={styles.coverlaneImage1} source={img1} />;
    }

    if (img2 != null) {
      lane = <FastImage style={styles.coverlaneImage2} source={img2} />;
    }

    view = (
      <View style={styles.coverlaneImage} key={index}>
        {cover}
        {lane}
      </View>
    );

    return view;
  }

  setRgData(data) {
    this.rgData = data;

    if (FatosUtil.checkData(this.rgData) === false) {
      this.setVisible(false);
    }

    var laneInfo = this.rgData.LaneInfo;

    this.setState({ laneInfo: laneInfo });
    this.setVisible(FatosUtil.checkData(laneInfo));
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
    this.rgData = null;
    this.state.laneInfo = null;
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    if (FatosUtil.checkData(this.state.laneInfo) === false) {
      return null;
    }

    var drawableList = this.state.laneInfo.DrawableList;

    if (FatosUtil.checkData(drawableList) === false) {
      return null;
    }

    return (
      <View style={styles.container} pointerEvents="none">
        <View style={styles.laneView}>
          {this.getlaneImageList(drawableList)}
          <Text style={styles.text}>{this.state.laneInfo.Dist + "m"}</Text>
        </View>
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

  laneView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    backgroundColor: "rgba(54, 58, 68, 0.9)",
    paddingLeft: 10,
    paddingRight: 10,
  },

  text: {
    color: "rgba(143, 197, 220, 1.0)",
    textAlign: "center",
    fontSize: 20,
    paddingLeft: 5,
  },

  laneImage: {
    width: 30,
    height: 30,
  },

  coverlaneImage: {
    width: 30,
    height: 30,
  },

  coverlaneImage1: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
  },

  coverlaneImage2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 30,
    height: 30,
  },
});
