import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
} from 'react-native'

import FastImage from 'react-native-fast-image'
import FatosLanguageManager from "../../Manager/FatosLanguageManager";

const backImg = [
    require('../../../../res/drawable/btn_1_4_1.png')
];

export default class FatosVersionInfoView extends Component {


    constructor(props) {
        super(props);
        this.preloadImages();
    }

    componentDidMount()
    {

    }

    preloadImages()
    {
        var uris = backImg.map(image => ({
            uri: Image.resolveAssetSource(image).uri
        }));

        FastImage.preload(uris);
    }

    onPressBack()
    {
        this.props.navigation.goBack();
    }

    onPressVersionInfoItem(tag)
    {
        switch (tag) {
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
            default:
                break;
        }
    }

    render() {

        var languageManager = FatosLanguageManager.GetInstance()

        var app = 'v1.3.0(bata) Dev mode';
        var buildnumber = '30';
        var background = '20181112';
        var searchdata = '20181104';
        var roaddata = '20190509';
        var safedrivingdata = '20190622';

        var strVer = languageManager.getCodeName("version");
        var strBuild = languageManager.getCodeName("build");
        var strBaseMapDB = languageManager.getCodeName("base_map");
        var strPoi = languageManager.getCodeName("poi");
        var strRoaddata = languageManager.getCodeName("roaddata");
        var strSafetyDrive = languageManager.getCodeName("safetyDrive");

        return  <View style={styles.generalView} >
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onPressBack() }}>
                    <FastImage style={styles.ImageStyle}
                               source={backImg[0]} />
                </TouchableOpacity>
                <Text style={ styles.text }>{strVer}</Text>
            </View>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(0) }}>
                <View style={styles.tabViewItemLeft}>
                    <Text style={ styles.tabViewItemText1 }>{'App'}</Text>
                </View>
                <View style={styles.tabViewItemRight2}>
                    <Text style={ styles.tabViewItemText1 }>{ app }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(1) }}>
                <View style={styles.tabViewItemLeft}>
                    <Text style={ styles.tabViewItemText1 }>{strBuild}</Text>
                </View>
                <View style={styles.tabViewItemRight1}>
                    <Text style={ styles.tabViewItemText1 }>{ buildnumber }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(2) }}>
                <View style={styles.tabViewItemLeft}>
                    <Text style={ styles.tabViewItemText1 }>{strBaseMapDB}</Text>
                </View>
                <View style={styles.tabViewItemRight1}>
                    <Text style={ styles.tabViewItemText1 }>{ background }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(3) }}>
                <View style={styles.tabViewItemLeft}>
                    <Text style={ styles.tabViewItemText1 }>{strPoi}</Text>
                </View>
                <View style={styles.tabViewItemRight1}>
                    <Text style={ styles.tabViewItemText1 }>{ searchdata }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(4) }}>
                <View style={styles.tabViewItemLeft}>
                    <Text style={ styles.tabViewItemText1 }>{strRoaddata}</Text>
                </View>
                <View style={styles.tabViewItemRight1}>
                    <Text style={ styles.tabViewItemText1 }>{ roaddata }</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tabViewItem} activeOpacity={0.7} onPress={() => { this.onPressVersionInfoItem(5) }}>
                <View style={styles.tabViewItemLeft2}>
                    <Text style={ styles.tabViewItemText1 }>{strSafetyDrive}</Text>
                </View>
                <View style={styles.tabViewItemRight1}>
                    <Text style={ styles.tabViewItemText1 }>{ safedrivingdata }</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}

const styles = StyleSheet.create({

    generalView: {
        flex: 1,
        flexDirection : 'column',
        backgroundColor: 'white',
    },

    header : {
        width :'100%',
        height : 50,
        alignItems: 'center',
        flexDirection : 'row',
        justifyContent: 'flex-start',
    },

    text : {
        paddingLeft : 5,
        color : 'black',
        fontSize : 20,
    },

    ImageStyle : {
        width : 40,
        height : 40,
    },

    tabViewItem : {
        width : '100%',
        height : 50,
        borderBottomColor : 'rgba(131, 143, 151, 1.0)',
        borderBottomWidth : 1,
        alignItems: 'center',
        flexDirection : 'row',
        justifyContent: 'flex-start',
    },

    tabViewItemLeft : {
        flex: 1,
        height : 50,
        paddingLeft : 10,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    tabViewItemLeft2 : {
        flex: 2,
        height : 50,
        paddingLeft : 10,
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    tabViewItemRight1 : {
        flex: 1,
        height : 50,
        paddingRight : 10,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    tabViewItemRight2 : {
        flex: 2,
        height : 50,
        paddingRight : 10,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    tabViewItemText1 : {
        color : 'rgba(196, 196, 196, 1.0)',
        fontSize : 20,
    },
});
