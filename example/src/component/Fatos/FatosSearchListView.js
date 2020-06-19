import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  NativeModules,
  NativeEventEmitter,
} from "react-native";

import FatosUtil from "../common/FatosUtil";
import FatosUIManager from "../Manager/FatosUIManager";
import FatosLanguageManager from "../Manager/FatosLanguageManager";

export default class FatosSearchListView extends React.Component {
  state = {
    loading: false,
    totalCount: "",
    count: "",
    page: 1,
    data: [],
    seed: 1,
    error: null,
    refreshing: false,
    visible: false,
  };

  constructor(props) {
    super(props);
    this.native = NativeModules.FatosNaviBridgeModule;
  }

  setSearchData(searchData) {
    var message = FatosLanguageManager.GetInstance().getCodeName("search_error");

    if (!searchData || searchData.length === 0) {
      FatosUIManager.GetInstance().showToast(message);
      return;
    }

    var node = JSON.parse(searchData);

    if (node) {
      // 기존에 있던 데이터를 지운다
      this.clearSearchData();

      var pgno = node.pgno;
      var cnt = node.cnt;
      var data = [];

      var items = node.items;

      if (items) {
        if (items.length == 0) {
          FatosUIManager.GetInstance().showToast(message);
          return;
        }

        for (var i = 0; i < items.length; ++i) {
          var id = items[i].id;
          var name = items[i].name;
          var addr1 = items[i].addr1;
          var addr2 = items[i].addr2;
          var phone = items[i].phone;
          var cate = items[i].cate;
          var posx = items[i].posx;
          var posy = items[i].posy;
          var entx = items[i].entx;
          var enty = items[i].enty;
          var dist = items[i].dist;

          var fullAddName;

          if (FatosUtil.isStringEmpty(addr2) === true) {
            fullAddName = addr1;
          } else {
            fullAddName = addr2;
          }

          var frontLat;
          var frontLon;

          if (FatosUtil.isStringEmpty(entx) === true) {
            frontLon = posx.toString();
          } else {
            frontLon = entx.toString();
          }

          if (FatosUtil.isStringEmpty(enty) === true) {
            frontLat = posy.toString();
          } else {
            frontLat = enty.toString();
          }

          data.push({
            id: id,
            name: name,
            fullAddName: fullAddName,
            key: i,
            frontLat: frontLat,
            frontLon: frontLon,
          });
        }
      }

      this.setState({
        totalCount: 0,
        count: 0,
        page: pgno,
        data: data,
      });
    }
  }

  clearSearchData() {
    while (this.state.data.length) {
      this.state.data.pop();
    }
  }

  Route(item) {
    var lat = item.frontLat;
    var lon = item.frontLon;
    var name = item.name;

    this.props.setGoalName(name);
    this.props.summarySearchListView.current.setGoalData(item);
    this.native.Route("0", "0", lat, lon);
    this.clearSearchData();
  }

  update() {
    this.setVisible(FatosUIManager.GetInstance().isDefaultViewVisible());
  }

  setVisible(val) {
    this.setState({ visible: val });
  }

  getIsData() {
    if (this.state.data.length === 0) {
      return false;
    }

    return true;
  }

  render() {
    if (this.state.visible === false) {
      return null;
    }

    if (this.state.data.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.Route(item);
                }}
              >
                <View style={styles.flatview}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.address} numberOfLines={1}>
                    {item.fullAddName}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.key.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 100,
    // top 100 + 하단ui height = 195
    paddingBottom: 195,
  },

  listContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },

  flatview: {
    justifyContent: "center",
    flex: 1,
    width: "100%",
    height: 60,
    marginBottom: 5, // 셀 여백 값
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    padding: 5,
  },
  name: {
    color: "black",
    fontSize: 18,
    marginBottom: 3,
  },
  address: {
    color: "brown",
    fontSize: 15,
  },
});
