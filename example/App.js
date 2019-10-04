import React, { Component } from "react";

import { createStackNavigator, createAppContainer } from "react-navigation";

console.disableYellowBox = true;

import mian from "./src/component/Fatos/FatosMainView";
import environment from "./src/component/Fatos/Environment/FatosEnvironmentView";
import terms from "./src/component/Fatos/Environment/FatosTermsView";
import copyRight from "./src/component/Fatos/Environment/FatosCopyRightView";
import versionInfo from "./src/component/Fatos/Environment/FatosVersionInfoView";
import countrySelectView from "./src/component/Fatos/Environment/FatosCountrySelectView";
import categoryView from "./src/component/Fatos/Environment/FatosCategoryView";
import labView from "./src/component/Fatos/Environment/FatosLabView";

const App = createStackNavigator(
  {
    Main: { screen: mian },
    Environment: { screen: environment },
    Terms: { screen: terms },
    Copyright: { screen: copyRight },
    VersionInfo: { screen: versionInfo },
    CountrySelectView: { screen: countrySelectView },
    CategoryView: { screen: categoryView },
    LabView: { screen: labView },
  },
  { initialRouteName: "Main", headerMode: "none" }
);

export default createAppContainer(App);
