import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    NativeModules,
    NativeEventEmitter,
    ImageBackground
} from 'react-native'

import FastImage from 'react-native-fast-image'
import FatosEnvManager from "../Manager/FatosEnvManager";
import FatosUIManager from '../Manager/FatosUIManager';

const ImageDrawable = [require('../../../res/drawable/tbt_01_straight_pnd.png')
    ,require('../../../res/drawable/tbt_02_turn_left_pnd.png')
    ,require('../../../res/drawable/tbt_03_turn_right_pnd.png')
    ,require('../../../res/drawable/tbt_04_turn_slightbt_left_pnd.png')
    ,require('../../../res/drawable/tbt_05_turn_slightbt_right_pnd.png')
    ,require('../../../res/drawable/tbt_06_turn_sharp_left_pnd.png')
    ,require('../../../res/drawable/tbt_07_turn_sharp_right_pnd.png')
    ,require('../../../res/drawable/tbt_08_ramp_left_pnd.png')
    ,require('../../../res/drawable/tbt_09_ramp_right_pnd.png')
    ,require('../../../res/drawable/tbt_10_fork_left_pnd.png')
    ,require('../../../res/drawable/tbt_11_fork_right_pnd.png')
    ,require('../../../res/drawable/tbt_12_keep_left_pnd.png')
    ,require('../../../res/drawable/tbt_13_keep_right_pnd.png')
    ,require('../../../res/drawable/tbt_14_uturn_left_pnd.png')
    ,require('../../../res/drawable/tbt_15_uturn_right_pnd.png')
    ,require('../../../res/drawable/tbt_16_pturn_left_pnd.png')
    ,require('../../../res/drawable/tbt_17_pturn_right_pnd.png')
    ,require('../../../res/drawable/tbt_18_roundaboutbt_left_pnd.png')
    ,require('../../../res/drawable/tbt_19_roundaboutbt_right_pnd.png')
    ,require('../../../res/drawable/tbt_20_merge_pnd.png')
    ,require('../../../res/drawable/tbt_21_1st_highway_in_pnd.png')
    ,require('../../../res/drawable/tbt_22_1st_highway_exit_pnd.png')
    ,require('../../../res/drawable/tbt_23_1st_highway_in_left_pnd.png')
    ,require('../../../res/drawable/tbt_24_1st_highway_exitbt_left_pnd.png')
    ,require('../../../res/drawable/tbt_25_1st_highway_in_right_pnd.png')
    ,require('../../../res/drawable/tbt_26_1st_highway_exitbt_right_pnd.png')
    ,require('../../../res/drawable/tbt_27_2nd_highway_in_pnd.png')
    ,require('../../../res/drawable/tbt_28_2nd_highway_exit_pnd.png')
    ,require('../../../res/drawable/tbt_29_2nd_highway_in_left_pnd.png')
    ,require('../../../res/drawable/tbt_30_2nd_highway_exitbt_left_pnd.png')
    ,require('../../../res/drawable/tbt_31_2nd_highway_in_right_pnd.png')
    ,require('../../../res/drawable/tbt_32_2nd_highway_exitbt_right_pnd.png')
    ,require('../../../res/drawable/tbt_33_tunnel_pnd.png')
    ,require('../../../res/drawable/tbt_34_overpass1_pnd.png')
    ,require('../../../res/drawable/tbt_35_overpass2_pnd.png')
    ,require('../../../res/drawable/tbt_36_overpass_left_pnd.png')
    ,require('../../../res/drawable/tbt_37_overpass_right_pnd.png')
    ,require('../../../res/drawable/tbt_38_underpass_pnd.png')
    ,require('../../../res/drawable/tbt_39_underpass_left_pnd.png')
    ,require('../../../res/drawable/tbt_40_underpass_right_pnd.png')
    ,require('../../../res/drawable/tbt_41_leftbt_underpass_pnd.png')
    ,require('../../../res/drawable/tbt_42_rightbt_underpass_pnd.png')
    ,require('../../../res/drawable/tbt_43_tollgate_pnd.png')
    ,require('../../../res/drawable/tbt_44_ferry_train_pnd.png')
    ,require('../../../res/drawable/tbt_45_ferry_pnd.png')
    ,require('../../../res/drawable/tbt_46_leftbt_overpass_pnd.png')
    ,require('../../../res/drawable/tbt_47_rightbt_overpass_pnd.png')
    ,require('../../../res/drawable/tbt_48_service_area_pnd.png')
    ,require('../../../res/drawable/tbt_49_start_pnd.png')
    ,require('../../../res/drawable/tbt_50_goal_pnd.png')
    ,require('../../../res/drawable/tbt_51_via1_pnd.png')
    ,require('../../../res/drawable/tbt_52_via2_pnd.png')
    ,require('../../../res/drawable/tbt_53_via3_pnd.png')
    ,require('../../../res/drawable/tbt_54_restarea_pnd.png')
    ,require('../../../res/drawable/tbt_55_via_pnd.png')
];

export default class FirstTbT extends React.Component {

    state = {
        seatPosition : -1,
        type : -1,
        dist : '',
        text : '',
        visible : true,
    };

    constructor(props) {
        super(props);
        this.rgData = null;
        this.preloadImages();
    }

    preloadImages()
    {
        const uris = ImageDrawable.map(image => ({
            uri: Image.resolveAssetSource(image).uri
        }));

        FastImage.preload(uris);
    }

    isShow()
    {
        if(this.rgData !== null)
        {
            if ((this.rgData.FirstTbTShow !== null || this.rgData.FirstTbTShow !== "undefined" ))
            {
                return this.rgData.FirstTbTShow;
            }
        }

        return false;
    }

    setRgData(data)
    {
        this.rgData = data;

        var nType = Number(this.rgData.CurType);
        var strDist = this.rgData.CurDist;
        var strText = this.rgData.StringText;

        if(nType !== this.state.type)
        {
            this.setState({type : nType});
        }

        if(strDist !== this.state.dist)
        {
            this.setState({dist : strDist});
        }

        if(strText !== this.state.text)
        {
            this.setState({text : strText});
        }
    }

    setSeatPosition(val)
    {
        if(val !== this.state.seatPosition)
        {
            this.setState({seatPosition : val});
        }
    }

    update()
    {
        this.setVisible(FatosUIManager.GetInstance().isDrivingViewVisible());
    }

    setVisible(val)
    {
        if(val !== this.state.visible)
        {
            this.setState({visible : val});
        }

        if(val === false)
        {
            this.clear();
        }
    }

    clear()
    {
        this.state.type = 0;
        this.state.dist = '';
        this.state.text = '';
    }

    render () {

        if(this.state.visible === false)
            return null;

        if(this.isShow() === false)
            return null;

        var nType = this.state.type;
        var strDist = this.state.dist;
        var strText = this.state.text;

        // 운전석위치 셋팅
        if(FatosEnvManager.GetInstance().getSeatPosition() === 1 && nType === 14){
            nType = 15;
        }

        return <View style={styles.container}>
            <ImageBackground style={styles.firstTbtContainer}>
                <FastImage style={styles.ImageStyle} source={ImageDrawable[nType]} />
                <Text style={styles.FirstTbtRemainDist}>{strDist}</Text>
                <Text style={styles.FirstTbtComment} numberOfLines = { 1 } >{strText}</Text>
            </ImageBackground>
        </View>
    }
}

const firstTbtContainer = require('./styles').firstTbTContainer;
const firstTbtComment = require('./styles').FirstTbtComment;
const firstTbtRemainDist = require('./styles').FirstTbtRemainDist;

const styles = StyleSheet.create({

    container: {
        // alignItems: 'center',
        justifyContent: 'flex-start',
        // tbt top 위치 보정
        marginTop : 40,
        marginLeft : 10,
        marginRight : 10,
    },

    firstTbtContainer: {
      ...firstTbtContainer,
    },

    buttonContainer: {
        flexDirection : 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },

    box: {
        width : '90%',
        alignItems: 'center',
        justifyContent: 'center',

    },

    ImageStyle:{
        height : 60,
        width : 60,
    },

    FirstTbtComment:{
      ...firstTbtComment,
    },

    FirstTbtRemainDist:{
        ...firstTbtRemainDist,
    },

});
