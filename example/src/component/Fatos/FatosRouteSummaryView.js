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
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";

import FastImage from "react-native-fast-image";
import { Pages } from "react-native-pages";
import ImageSequence from "react-native-image-sequence";
import FatosUtil from "../common/FatosUtil";
import COMMON from "../common/common";
import FatosLanguageManager from "../Manager/FatosLanguageManager";
import FatosUIManager from "../Manager/FatosUIManager";

const recommImg = [
  require("../../../res/drawable/tab_btn_icon_recomm_n.png"),
  require("../../../res/drawable/tab_btn_icon_recomm_s.png")
];

const generalImg = [
  require("../../../res/drawable/tab_btn_icon_general_n.png"),
  require("../../../res/drawable/tab_btn_icon_general_s.png")
];

const freeImg = [
  require("../../../res/drawable/tab_btn_icon_free_n.png"),
  require("../../../res/drawable/tab_btn_icon_free_s.png"),
  require("../../../res/drawable/s_info_icon_charge_sel.png")
];

const imgList = [recommImg, generalImg, freeImg];

const summaryColor = [
  COMMON.SMMMARY_COLOR_1.RGBA,
  COMMON.SMMMARY_COLOR_2.RGBA,
  COMMON.SMMMARY_COLOR_3.RGBA,
  COMMON.SMMMARY_COLOR_4.RGBA,
  COMMON.SMMMARY_COLOR_5.RGBA,
  COMMON.SMMMARY_COLOR_6.RGBA,
  COMMON.SMMMARY_COLOR_7.RGBA
];

const defaultColor = "rgba(255, 255, 255, 0.9)";

const summaryPageColor = [
  COMMON.SMMMARY_PAGE_COLOR_1.RGBA,
  COMMON.SMMMARY_PAGE_COLOR_2.RGBA,
  COMMON.SMMMARY_PAGE_COLOR_3.RGBA
];

const simImg = [
  require("../../../res/drawable/btn_sim_n.png"),
  require("../../../res/drawable/btn_sim_s.png")
];

const goImg = [
  require("../../../res/drawable/btn_go_ani_n_1.png"),
  require("../../../res/drawable/btn_go_ani_s.png")
];

const images = [
  require("../../../res/drawable/btn_go_ani_n_1.png"),
  require("../../../res/drawable/btn_go_ani_n_2.png"),
  require("../../../res/drawable/btn_go_ani_n_3.png"),
  require("../../../res/drawable/btn_go_ani_n_4.png"),
  require("../../../res/drawable/btn_go_ani_n_5.png")
];

export default class FatosRouteSummaryView extends React.Component {
  state = {
    selectIndex: 0,
    summaryData: null,
    visible: false
  };

  constructor(props) {
    super(props);

    this.rgData = null;
    this.preloadImages();

    this.pagesRef = React.createRef();
    this.native = NativeModules.FatosNaviBridgeModule;

    this.languageManager = FatosLanguageManager.GetInstance();
  }

  preloadImages() {
    var uris = recommImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = generalImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = freeImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = simImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = goImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);

    uris = images.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  onPressSummary(type) {
    var index = 0;
    var nCount = this.state.summaryData.contexts.length;

    for (var i = 0; i < nCount; ++i) {
      if (this.state.summaryData.contexts[i].Type === type) {
        index = i;
        break;
      }
    }

    if (index === this.state.selectIndex) {
      return;
    }

    this.pagesRef.current.scrollToPage(index);
    this.setState({ selectIndex: index });

    var mapViewBridgeModule = NativeModules.FatosMapViewBridgeModule;
    mapViewBridgeModule.SelectRouteLine(index);

    FatosUIManager.GetInstance().setSelectRouteLine(index);
  }

  onPressSimulation(index) {
    this.native.StartSimulation(index);
    this.props.bottomViewRef.current.showSimulatedDrivingView();

    this.props.clearSummaryData(true);

    FatosUIManager.GetInstance().setSelectRouteLine(index);
  }

  onPressStart(index) {
    var mapViewBridgeModule = NativeModules.FatosMapViewBridgeModule;
    mapViewBridgeModule.ApplySelectRouteLine(index);

    this.native.StartRouteGuidance(index);

    this.props.bottomViewRef.current.showSimulatedDrivingView();

    this.props.clearSummaryData(true);

    FatosUIManager.GetInstance().setSelectRouteLine(0);
  }

  getSummaryItem(key, context) {
    if (FatosUtil.checkData(context) === false) {
      return null;
    }

    var index = this.getIndex(context.Type);
    var summaryItemStyles;
    var img;

    if (key === this.state.selectIndex) {
      summaryItemStyles = StyleSheet.create({
        Text: {
          color: summaryColor[index],
          fontSize: 15,
          paddingTop: 5
        },

        selectViwe: {
          backgroundColor: summaryColor[index],
          height: 3,
          width: 30
        }
      });

      img = imgList[index][1];
    } else {
      summaryItemStyles = StyleSheet.create({
        Text: {
          color: "gray",
          fontSize: 15,
          paddingTop: 5
        },

        selectViwe: {
          backgroundColor: defaultColor,
          height: 3,
          width: 30
        }
      });

      img = imgList[index][0];
    }

    var summaryString = [
      this.languageManager.getCodeName("recommend"),
      this.languageManager.getCodeName("general"),
      this.languageManager.getCodeName("free")
    ];

    var item = (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.summaryButton}
        onPress={() => {
          this.onPressSummary(context.Type);
        }}
        key={key}
      >
        <View style={styles.selectViweContainer}>
          <View style={summaryItemStyles.selectViwe} />
        </View>
        <FastImage style={styles.ImageStyle} source={img} />
        <Text style={summaryItemStyles.Text}>{summaryString[index]}</Text>
      </TouchableOpacity>
    );

    return item;
  }

  onScrollEnd(index) {
    this.setState({ selectIndex: index });

    if (FatosUtil.checkData(this.state.summaryData.contexts[index])) {
      this.onPressSummary(this.state.summaryData.contexts[index].Type);
    }
  }

  getPage(key, context) {
    if (FatosUtil.checkData(context) == false) {
      return <View />;
    }

    var type = context.Type;
    var Length = context.Length;
    var Time = context.Time;
    var fee = context.Fee;
    var avgSpeed = context.AvgSpeed;
    var turnCongestion = context.TurnCongestion;

    var index = this.getIndex(type);

    var pageStyles = StyleSheet.create({
      page: {
        flex: 1,
        backgroundColor: summaryPageColor[index],
        borderRadius: 5,
        flexDirection: "row"
      },

      contentsView: {
        flex: 3,
        flexDirection: "column"
      },

      content1: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
      },

      content2: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
      },

      content3: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center"
      },

      content4: {
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "row"
      },

      button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },

      ImageStyle: {
        height: 55,
        width: 55
      },

      ImageStyle2: {
        height: 65,
        width: 55
      },

      Text: {
        color: "white",
        fontSize: 12,
        position: "absolute",
        bottom: 5
      },

      time: {
        color: "white",
        fontSize: 17,
        paddingLeft: 10,
        paddingTop: 10
      },

      length: {
        color: "white",
        fontSize: 12,
        paddingLeft: 10,
        paddingBottom: 5
      },

      fee: {
        color: "white",
        fontSize: 12,
        paddingLeft: 3,
        paddingBottom: 5
      },

      feeImg: {
        marginTop: 1,
        height: 12,
        width: 12
      }
    });

    var freeView = null;
    if (fee > 0) {
      freeView = (
        <View style={pageStyles.content4}>
          <FastImage style={pageStyles.feeImg} source={freeImg[2]} />
          <Text style={pageStyles.fee}>{FatosUtil.numberWithCommas(fee)}</Text>
        </View>
      );
    }

    var simulatedButton = null;

    var strSimulation = this.languageManager.getCodeName("simulation");
    var strGo = this.languageManager.getCodeName("go");

    var selectIndex = key;

    if (FatosUtil.checkData(this.rgData.DriveMode)) {
      if (this.rgData.DriveMode !== COMMON.eDriveMode.eDrive_RG) {
        simulatedButton = (
          <View style={pageStyles.button}>
            <TouchableOpacity
              onPress={() => {
                this.onPressSimulation(selectIndex);
              }}
            >
              <FastImage style={pageStyles.ImageStyle} source={simImg[0]} />
            </TouchableOpacity>
            <Text style={pageStyles.Text}>{strSimulation}</Text>
          </View>
        );
      }
    }

    var page = (
      <View style={pageStyles.page} key={key}>
        <View style={pageStyles.contentsView}>
          <View style={pageStyles.content1}>
            <Text style={pageStyles.time}>
              {FatosUtil.getTimeStringSeconds(Time)}
            </Text>
          </View>
          <View style={pageStyles.content2}>
            <View style={pageStyles.content3}>
              <Text style={pageStyles.length}>{Length}</Text>
            </View>
            {freeView}
          </View>
        </View>

        {simulatedButton}

        <View style={pageStyles.button}>
          <TouchableOpacity
            onPress={() => {
              this.onPressStart(selectIndex);
            }}
          >
            <ImageSequence
              style={pageStyles.ImageStyle2}
              images={images}
              framesPerSecond={7}
              loop={true}
            />
          </TouchableOpacity>
          <Text style={pageStyles.Text}>{strGo}</Text>
        </View>
      </View>
    );

    return page;
  }

  getPageList() {
    var index = 0;
    return this.state.summaryData.contexts.map(data => {
      var page = this.getPage(index, data);
      ++index;
      return page;
    });
  }

  getSummaryItemList() {
    var index = 0;
    return this.state.summaryData.contexts.map(data => {
      var item = this.getSummaryItem(index, data);
      ++index;
      return item;
    });
  }

  getIndex(type) {
    var index = 0;

    if (type === 1) {
      // 추천
      index = 0;
    } else if (type === 8) {
      // 일반
      index = 1;
    } else if (type === 32) {
      // 무료
      index = 2;
    }

    return index;
  }

  setRgData(data) {
    this.rgData = data;
  }

  update() {
    this.setVisible(FatosUIManager.GetInstance().isSummaryViewVisible());
  }

  setSummaryData(data) {
    this.setState({ summaryData: data });
  }

  setVisible(val) {
    if (val !== this.state.visible) {
      this.setState({ visible: val });
    }
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    if (this.state.summaryData === null) {
      return null;
    }

    var summaryView = (
      <View style={styles.summaryView}>{this.getSummaryItemList()}</View>
    );

    var pages = (
      <View style={styles.pageView}>
        <Pages
          ref={this.pagesRef}
          startPage={this.state.selectIndex}
          indicatorPosition={"none"}
          onScrollEnd={this.onScrollEnd.bind(this)}
        >
          {this.getPageList()}
        </Pages>
      </View>
    );

    return (
      <View style={styles.container}>
        {summaryView}
        {pages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 0
  },

  summaryView: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    backgroundColor: defaultColor
  },

  pageView: {
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    height: 70,
    flexDirection: "row",
    bottom: 80
  },

  ImageStyle: {
    height: 30,
    width: 30
  },

  summaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },

  summaryItem: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  Text: {
    color: "gray",
    fontSize: 15,
    paddingTop: 5
  },

  selectViweContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 13
  },

  selectViwe: {
    backgroundColor: "rgba(255, 0, 255, 0.9)",
    height: 3,
    width: 30
  }
});
