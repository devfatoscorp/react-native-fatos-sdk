import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules,
  Image,
  BackHandler,
} from "react-native";

import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import FatosEnvManager from "../../Manager/FatosEnvManager";
import FastImage from "react-native-fast-image";

const backImg = [require("../../../../res/drawable/btn_1_4_1.png")];

export default class FatosLabView extends Component {
  state = {
    languageIndex: 0,
    render: false
  };

  constructor(props) {
    super(props);

    this.languageManager = FatosLanguageManager.GetInstance();
    this.state.languageIndex = this.languageManager.getLanguageIndex();
    this.languageManager.addCalback(
      this.changeLanguage.bind(this),
      this.constructor.name
    );

    this.preloadImages();
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress.bind(this)
    );
  }

  componentWillUnmount() {
    this.languageManager.removeCallback(this.constructor.name);
    this.backHandler.remove();
  }

  changeLanguage() {
    this.setState({ languageIndex: this.languageManager.getLanguageIndex() });
  }

  preloadImages() {
    var uris = backImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  handleBackPress() {
    this.onPressBack();
    return true;
  }

  onPressBack() {
    this.props.navigation.goBack();
  }

  setSimulGPS() {
    var blnSimulGPS = true;
    if (FatosEnvManager.GetInstance().getSimulGps() === true) {
      blnSimulGPS = false;
    }
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetSimulGps(blnSimulGPS);
    FatosEnvManager.GetInstance().setSimulGps(blnSimulGPS);
    this.setState({ render: blnSimulGPS });
  }

  setDrawGPSPoint() {
    var blnDrawGPSPoint = true;
    if (FatosEnvManager.GetInstance().getDrawGpsPoint() === true) {
      blnDrawGPSPoint = false;
    }
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetDrawGpsPoint(blnDrawGPSPoint);
    FatosEnvManager.GetInstance().setDrawGpsPoint(blnDrawGPSPoint);
    this.setState({ render: blnDrawGPSPoint });
  }

  render() {
    var title = FatosLanguageManager.GetInstance().getCodeName("lab");
    var simulGPS =
      FatosEnvManager.GetInstance().getSimulGps() === true ? "On" : "Off";
    var drawGpsPoint =
      FatosEnvManager.GetInstance().getDrawGpsPoint() === true ? "On" : "Off";

    return (
      <View style={styles.labView}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressBack();
            }}
          >
            <FastImage style={styles.ImageStyle} source={backImg[0]} />
          </TouchableOpacity>
          <Text style={styles.text}>{title}</Text>
        </View>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.setSimulGPS();
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{"Simul GPS"}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{simulGPS}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.setDrawGPSPoint();
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{"Draw GPS Point"}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{drawGpsPoint}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  labView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },

  tabViewItem: {
    width: "100%",
    height: 50,
    borderBottomColor: "rgba(131, 143, 151, 1.0)",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  tabViewItemLeft: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },

  tabViewItemRight: {
    flex: 1,
    height: 50,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  tabViewItemRight2: {
    flex: 3,
    height: 50,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },

  tabViewItemText1: {
    color: "black",
    fontSize: 20
  },

  tabViewItemText2: {
    color: "rgba(196, 196, 196, 1.0)",
    fontSize: 20
  },

  tabViewItemText3: {
    color: "rgba(196, 196, 196, 1.0)",
    fontSize: 16
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
    marginBottom: 15
  },

  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  },

  ImageStyle: {
    width: 40,
    height: 40
  },
});
