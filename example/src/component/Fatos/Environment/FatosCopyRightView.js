import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Platform
} from "react-native";

import { WebView } from "react-native-webview";
import FastImage from "react-native-fast-image";
import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import COMMON from "../../common/common";

const backImg = [require("../../../../res/drawable/btn_1_4_1.png")];

export default class FatosCopyRightView extends Component {
  constructor(props) {
    super(props);
    this.preloadImages();

    // 국가별 예외처리 할것
    // if(m_gApp.getAppSettingInfo().m_nDefaultLanguage == 0)
    //     m_WebView.loadUrl("file:///android_asset/setting_maphi/copyright_fatos.html");
    // else
    //     m_WebView.loadUrl("file:///android_asset/setting_maphi/copyright_fatos_eng.html");
  }

  preloadImages() {
    var uris = backImg.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  onPressBack() {
    this.props.navigation.goBack();
  }

  getWebView() {
    var webview = null;
    const isAndroid = Platform.OS === "android";

    if (
      FatosLanguageManager.GetInstance().getLanguageIndex() ==
      COMMON.LANGUAGE_TYPE.eLANGUAGE_TYPE_SMALL
    ) {
      webview = (
        <WebView
          originWhitelist={["file://"]}
          source={{
            uri: isAndroid
              ? "file:///android_asset/html/copyright_fatos.html"
              : "./assets/html/copyright_fatos.html"
          }}
        />
      );
    } else if (
      FatosLanguageManager.GetInstance().getLanguageIndex() ==
      COMMON.LANGUAGE_TYPE.eLANGUAGE_TYPE_ENGLISH
    ) {
      webview = (
        <WebView
          originWhitelist={["file://"]}
          source={{
            uri: isAndroid
              ? "file:///android_asset/html/copyright_fatos_eng.html"
              : "./assets/html/copyright_fatos_eng.html"
          }}
        />
      );
    }

    return webview;
  }

  render() {
    // var strCopyright = '저작권';
    var strCopyright = "Copyright";

    const isAndroid = Platform.OS === "android";

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              this.onPressBack();
            }}
          >
            <FastImage style={styles.ImageStyle} source={backImg[0]} />
          </TouchableOpacity>
          <Text style={styles.text}>{strCopyright}</Text>
        </View>
        {this.getWebView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
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

  text: {
    paddingLeft: 5,
    color: "black",
    fontSize: 20
  },

  webView: {
    flex: 1
  }
});
