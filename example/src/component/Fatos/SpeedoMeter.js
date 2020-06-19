import React from "react";
import { Text, View, StyleSheet } from "react-native";

import FatosUIManager from "../Manager/FatosUIManager";

export default class SpeedoMeter extends React.Component {
  state = {
    speed: 0,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.rgData = null;
  }

  setRgData(data) {
    this.rgData = data;

    var speed = this.rgData.CarSpeed;

    this.setState({ speed: speed });
  }

  update() {
    var blnVisible = false;

    if (
      FatosUIManager.GetInstance().isDefaultViewVisible() ||
      FatosUIManager.GetInstance().isDrivingViewVisible()
    ) {
      blnVisible = true;
    }

    this.setVisible(blnVisible);
  }

  setVisible(val) {
    this.setState({ visible: val });
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    this.rgData = this.props.rgData;

    var speed = this.state.speed;

    return (
      <View style={styles.container}>
        <Text style={styles.textL}>{speed}</Text>
        <Text style={styles.textLT}>{speed}</Text>
        <Text style={styles.textT}>{speed}</Text>
        <Text style={styles.textTR}>{speed}</Text>
        <Text style={styles.textR}>{speed}</Text>
        <Text style={styles.textRB}>{speed}</Text>
        <Text style={styles.textB}>{speed}</Text>
        <Text style={styles.textLB}>{speed}</Text>
      </View>
    );
  }
}

var SpeedoMeterView = {
  width: 110,
  height: 60,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "25%",
    left: 10,
    width: SpeedoMeterView.width,
    height: SpeedoMeterView.height,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  textL: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: -2, height: 0.1 },
    textShadowRadius: 1,
  },
  textLT: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: -2, height: -1 },
    textShadowRadius: 1,
  },
  textT: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 0.1, height: -2 },
    textShadowRadius: 1,
  },
  textTR: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 2, height: -2 },
    textShadowRadius: 1,
  },
  textR: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 2, height: 0.1 },
    textShadowRadius: 1,
  },
  textRB: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  textB: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 0.1, height: 2 },
    textShadowRadius: 1,
  },
  textLB: {
    textAlign: "center",
    position: "absolute",
    width: SpeedoMeterView.width,
    top: 0,
    left: 0,
    color: "black",
    fontSize: 60,
    fontWeight: "400",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1,
  },
});
