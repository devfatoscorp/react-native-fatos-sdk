import React, {Component} from "react";
import {
    requireNativeComponent,
    findNodeHandle,
    processColor,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    Text,
    View
} from "react-native";

var FatosMapViewNative = requireNativeComponent('FatosMapView', FatosMapView);

class FatosMapView extends Component {

    constructor(props) {
        super(props);
    }

    // handleStartShouldSetResponder(evt)
    // {
    //     Keyboard.dismiss();
    //     this.props.bottomViewRef.current.showMenu(false);
    // }
    //
    // handleMoveShouldSetResponder(evt)
    // {
    //
    // }
    //
    // handleResponderRelease(evt)
    // {
    //     // 터치 앤드 인것 같은데 호출이 안된다
    // }

    render () {

        return <FatosMapViewNative  style={styles.mapViewStyle}/>
    }
}

const styles = StyleSheet.create({

    mapViewStyle: {
        ...StyleSheet.absoluteFill,
    },

});

module.exports = FatosMapView;
