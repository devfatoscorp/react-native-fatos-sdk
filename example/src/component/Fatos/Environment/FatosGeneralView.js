import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  NativeModules
} from "react-native";

import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import FatosEnvManager from "../../Manager/FatosEnvManager";
import COMMON from "../../common/common";

export default class FatosGeneralView extends Component {
  state = {
    uuid: "",
    languageIndex: 0,
    simulGps: false
  };

  constructor(props) {
    super(props);

    this.languageManager = FatosLanguageManager.GetInstance();
    this.state.languageIndex = this.languageManager.getLanguageIndex();
    this.languageManager.addCalback(
      this.changeLanguage.bind(this),
      this.constructor.name
    );

    this.state.uuid = FatosEnvManager.GetInstance().getUUID();
  }

  componentWillUnmount() {
    this.languageManager.removeCallback(this.constructor.name);
  }

  onPressGeneralItem(tag) {
    switch (tag) {
      case 0:
        this.goCountrySelectView();
        break;
      case 1:
        // 버튼 반응 없도록 주석처리
        // this.goCategoryView();
        break;
      case 2:
        this.goTerms();
        break;
      case 3:
        this.goVersionInfo();
        break;
      case 4:
        this.goCopyright();
        break;
      default:
        break;
    }
  }

  goCountrySelectView() {
    this.props.navigation.navigate("CountrySelectView");
  }

  goCategoryView() {
    this.props.navigation.navigate("CategoryView");
  }

  goTerms() {
    this.props.navigation.navigate("Terms");
  }

  goVersionInfo() {
    this.props.navigation.navigate("VersionInfo");
  }

  goCopyright() {
    this.props.navigation.navigate("Copyright");
  }

  changeLanguage() {
    this.setState({ languageIndex: this.languageManager.getLanguageIndex() });
  }

  onSimulGps(val) {
    this.setState({ simulGps: val });
    var native = NativeModules.FatosEnvBridgeModule;
    native.SetSimulGps(val);
  }

  showSimulGps() {
    this.props.navigation.navigate("LabView");
  }

  render() {
    var country = COMMON.wecountry_names[this.state.languageIndex];
    var category = "All Category";

    var strCountry = this.languageManager.getCodeName("country");
    var strCategory = this.languageManager.getCodeName("category");
    var strTerm = this.languageManager.getCodeName("term");
    var strVer = this.languageManager.getCodeName("version");
    var strCopyright = this.languageManager.getCodeName("copyright");

    return (
      <View style={styles.generalView}>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.onPressGeneralItem(0);
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{strCountry}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{country + " >"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.onPressGeneralItem(1);
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText2}>{strCategory}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText2}>{category}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.onPressGeneralItem(2);
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{strTerm}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{">"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.onPressGeneralItem(3);
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{strVer}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{">"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onPress={() => {
            this.onPressGeneralItem(4);
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText1}>{strCopyright}</Text>
          </View>
          <View style={styles.tabViewItemRight}>
            <Text style={styles.tabViewItemText1}>{">"}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabViewItem}
          activeOpacity={0.7}
          onLongPress={() => {
          }}
        >
          <View style={styles.tabViewItemLeft}>
            <Text style={styles.tabViewItemText2}>{"UUID"}</Text>
          </View>
          <View style={styles.tabViewItemRight2}>
            <Text style={styles.tabViewItemText3}>{this.state.uuid}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  generalView: {
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
  }
});
