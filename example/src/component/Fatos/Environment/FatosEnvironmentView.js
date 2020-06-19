import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  BackHandler,
} from "react-native";

import FastImage from "react-native-fast-image";
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";

import GeneralView from "./FatosGeneralView";
import NavigationView from "./FatosNavigationView";
import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import FatosUIManager from "../../Manager/FatosUIManager";

const backImg = [require("../../../../res/drawable/btn_1_4_1.png")];

export default class FatosEnvironmentView extends Component {
  strGeneral = FatosLanguageManager.GetInstance().getCodeName("general");
  strNavigation = FatosLanguageManager.GetInstance().getCodeName("navigation");

  state = {
    index: 0,
    routes: [
      { key: "general", title: this.strGeneral },
      { key: "navigation", title: this.strNavigation },
    ],
    languageIndex: 0,
  };

  renderScene = ({ route }) => {
    switch (route.key) {
      case "general":
        return <GeneralView navigation={this.props.navigation} />;
      case "navigation":
        return <NavigationView navigation={this.props.navigation} />;
      default:
        return null;
    }
  };

  constructor(props) {
    super(props);
    this.preloadImages();

    this.languageManager = FatosLanguageManager.GetInstance();
    this.languageManager.addCalback(this.changeLanguage.bind(this), this.constructor.name);
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

  handleBackPress() {
    this.onPressBack();
    return true;
  }

  changeLanguage() {
    this.setState({
      languageIndex: this.languageManager.getLanguageIndex(),
      routes: [
        {
          key: "general",
          title: FatosLanguageManager.GetInstance().getCodeName("general"),
        },
        {
          key: "navigation",
          title: FatosLanguageManager.GetInstance().getCodeName("navigation"),
        },
      ],
    });
  }

  preloadImages() {
    var uris = backImg.map((image) => ({
      uri: Image.resolveAssetSource(image).uri,
    }));

    FastImage.preload(uris);
  }

  onPressBack() {
    this.props.navigation.goBack();
  }

  renderLabel = ({ route }) => <Text style={styles.tabText}>{route.title}</Text>;

  renderTabBar = (props: SceneRendererProps & { navigationState: State }) => {
    return (
      <TabBar
        {...props}
        style={styles.tabbar}
        renderLabel={this.renderLabel}
        indicatorStyle={styles.indicator}
        labelStyle={styles.labelStyle}
      />
    );
  };

  render() {
    var strSettings = this.languageManager.getCodeName("settings");

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
          <Text style={styles.text}>{strSettings}</Text>
        </View>
        <TabView
          style={styles.tabView}
          navigationState={this.state}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={(index) => this.setState({ index })}
          initialLayout={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },

  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  ImageStyle: {
    width: 40,
    height: 40,
  },

  text: {
    paddingLeft: 5,
    color: "black",
    fontSize: 20,
  },

  tabText: {
    paddingLeft: 5,
    color: "black",
    fontSize: 16,
  },

  tabView: {
    flex: 1,
  },

  tabbar: {
    backgroundColor: "white",
    borderBottomColor: "rgba(196, 196, 196, 1.0)",
    borderBottomWidth: 1,
  },

  indicator: {
    backgroundColor: "rgba(74, 155, 138, 1.0)",
  },

  labelStyle: {
    color: "black",
    fontSize: 15,
  },

  tabViewItem: {
    width: "100%",
    height: 50,
    borderBottomColor: "rgba(131, 143, 151, 1.0)",
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});
