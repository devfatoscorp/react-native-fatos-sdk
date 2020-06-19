"use strict";

var React = require("react-native");

var { StyleSheet } = React;

module.exports = StyleSheet.create({
  zoomContainer: {
    flexDirection: "column",
    width: 50
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
    // borderBottomLeftRadius: 25,
    // borderBottomRightRadius: 25,
  },

  firstTbTContainer: {
    backgroundColor: "rgba(55, 59, 68, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "gray",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  FirstTbtComment: {
    flex: 1,
    color: "white",
    // textAlign : 'center',
    textAlignVertical: "center",
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },

  FirstTbtRemainDist: {
    color: "rgb(236,215,159)",
    // textAlign : 'center',
    textAlignVertical: "center",
    fontSize: 27,
    marginLeft: 10
  },

  SecondTbtRemainDist: {
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
  },

  SecondTbtContainer: {
    backgroundColor: "rgba(55, 59, 68, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    borderColor: "gray",
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  }
});
