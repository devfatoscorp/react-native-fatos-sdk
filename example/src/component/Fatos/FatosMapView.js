import React, { Component } from "react";
import {
  requireNativeComponent,
  findNodeHandle,
  processColor,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";

var FatosMapViewNative = requireNativeComponent("FatosMapView", FatosMapView);

class FatosMapView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <FatosMapViewNative style={styles.mapViewStyle} />;
  }
}

const styles = StyleSheet.create({
  mapViewStyle: {
    ...StyleSheet.absoluteFill,
  },
});

module.exports = FatosMapView;
