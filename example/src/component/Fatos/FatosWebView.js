import React, {Component} from "react";
import {requireNativeComponent, findNodeHandle, processColor, StyleSheet} from "react-native";

var FatosWebViewNative = requireNativeComponent('FatosWebView', FatosWebView);

class FatosWebView extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount () {

    }

    componentWillUnmount () {

    }

    render () {

        return <FatosWebViewNative style={styles.webViewStyle} />;
    }
}

const styles = StyleSheet.create({

    webViewStyle: {
        ...StyleSheet.absoluteFill,
    },

});

module.exports = FatosWebView;
