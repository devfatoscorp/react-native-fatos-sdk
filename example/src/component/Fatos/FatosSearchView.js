import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  NativeModules,
  NativeEventEmitter,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";

import FatosUtil from "../common/FatosUtil";
import COMMON from "../common/common";
import FatosLanguageManager from "../Manager/FatosLanguageManager";
import FatosUIManager from "../Manager/FatosUIManager";
import FastImage from "react-native-fast-image";

const images = [require("../../../res/drawable/btn_close_n.png")];

export default class FatosSearchView extends React.Component {
  state = {
    visible: true,
    touchMoveMode: "0"
  };

  constructor(props) {
    super(props);

    this.rgData = null;
    this.state = { searchText: "" };

    this.native = NativeModules.FatosNaviBridgeModule;

    this.handleChangeText = this.handleChangeText.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);

    this.nativesEmitter = new NativeEventEmitter(
      NativeModules.FatosMapViewBridgeModule
    );

    this.nativesEmitter.addListener("TouchMoveModeListener", data =>
      this.setState({ touchMoveMode: data })
    );

    this.preloadImages();
  }

  preloadImages() {
    var uris = images.map(image => ({
      uri: Image.resolveAssetSource(image).uri
    }));

    FastImage.preload(uris);
  }

  handleChangeText(text) {
    this.setState({ searchText: text });
  }

  searchSubmit(e) {
    if (FatosUtil.isStringEmpty(this.state.searchText)) {
      return;
    }

    this.native.Search(this.state.searchText);
    this.setState({ searchText: "" });
  }

  setRgData(data) {
    this.rgData = data;
  }

  update() {
    this.setVisible(FatosUIManager.GetInstance().isDefaultViewVisible());
  }

  setVisible(val) {
    if (val !== this.state.visible) {
      this.setState({ visible: val });
    }
  }

  isVisible() {
    return this.state.visible;
  }

  getBackbutton() {
    var backbutton = null;

    if (Platform.OS === "ios") {
      if (FatosUIManager.GetInstance().getSearchListView() !== null) {
        if (
          FatosUIManager.GetInstance()
            .getSearchListView()
            .getIsData() == true
        ) {
          backbutton = (
            <View style={styles.backbutton}>
              <TouchableOpacity
                onPress={() => {
                  this.onPressClose();
                }}
              >
                <FastImage style={styles.buttonClose} source={images[0]} />
              </TouchableOpacity>
            </View>
          );
        }
      }
    }

    return backbutton;
  }

  onPressClose() {
    FatosUIManager.GetInstance().onSearchClose();
    FatosUIManager.GetInstance().setSearchViewVisible(false);
    FatosUIManager.GetInstance().onRefreshRender();
  }

  render() {
    // 화면 터치시 searchViewVisible 변수 값으로 show/hide 컨트롤
    // 터치시 show 7초뒤 hide
    // 현위치 이고 gps 속도가 10 이상 이면 숨김

    if (this.state.visible === false) {
      return null;
    }

    if (FatosUIManager.GetInstance().isSearchViewVisible() === false)
      return null;

    // touchMoveMode == '0' 이면 현위치

    if (this.state.touchMoveMode !== "0") {
      this.rgData = this.props.rgData;

      var speed = this.state.speed;

      if (speed > 10) {
        return null;
      }
    }

    var languageManager = FatosLanguageManager.GetInstance();
    var strPlaceholder = languageManager.getCodeName("search_paaceholder");
    var backbutton = this.getBackbutton();

    return (
      <View style={styles.container}>
        <View style={styles.searchview}>
          <TextInput
            ref="textInput"
            style={styles.input}
            placeholder={strPlaceholder}
            placeholderTextColor="gray"
            returnKeyType="search"
            onSubmitEditing={this.searchSubmit}
            onChangeText={this.handleChangeText}
            value={this.state.searchText}
          />
        </View>
        {backbutton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    top: 40
  },

  backbutton: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10
  },

  searchview: {
    justifyContent: "flex-start",
    flex: 9,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10
  },

  input: {
    color: "black",
    paddingLeft: 10,
    height: 50,
    fontWeight: "bold",
    fontSize: 20
  },

  buttonClose: {
    width: 18,
    height: 18
  }
});
