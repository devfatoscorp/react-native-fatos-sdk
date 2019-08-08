import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
    NativeModules,
    NativeEventEmitter,
    ImageBackground, TouchableOpacity
} from 'react-native'

import FastImage from 'react-native-fast-image';
import FatosUtil from "../common/FatosUtil";
import FatosUIManager from '../Manager/FatosUIManager';

const SDI_TYPE_1 = 1; // 속도 : 중앙 , 거리 표출
const SDI_TYPE_2 = 2; // 속도 : 상단 , 거리 표출
const SDI_TYPE_3 = 3; // 속도 : 상단, 구간단속종료 , 거리 표출
const SDI_TYPE_4 = 4; // 속도 : x , 거리 표출
const SDI_TYPE_5 = 5; // 속도 : x , 거리 표출 안함

const SDI_ATTR_LIST = [
    SDI_TYPE_1, SDI_TYPE_1, SDI_TYPE_4, SDI_TYPE_2, SDI_TYPE_2, SDI_TYPE_3, // 5
    SDI_TYPE_4, SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_1, SDI_TYPE_4, // 10
    SDI_TYPE_4, SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_2, SDI_TYPE_4, // 15
    SDI_TYPE_5,SDI_TYPE_4,SDI_TYPE_4,SDI_TYPE_4, // 16~19

    SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_4,// 24 reserve
    SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_4, SDI_TYPE_4,SDI_TYPE_4,//29  reserve

    SDI_TYPE_5, SDI_TYPE_5,SDI_TYPE_5, SDI_TYPE_5, //30~33
    SDI_TYPE_5, SDI_TYPE_5, SDI_TYPE_5, SDI_TYPE_5, // 37

    SDI_TYPE_1, SDI_TYPE_1, SDI_TYPE_1
];

const SDI_IMG_LIST = [require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_2_pnd.png')
    ,require('../../../res/drawable/c_3_pnd.png')
    ,require('../../../res/drawable/c_4_pnd.png')
    ,require('../../../res/drawable/c_5_pnd.png')
    ,require('../../../res/drawable/c_6_pnd.png')
    ,require('../../../res/drawable/c_7_pnd.png')
    ,require('../../../res/drawable/c_8_pnd.png')
    ,require('../../../res/drawable/c_m_0.png')
    ,require('../../../res/drawable/c_10_pnd.png')
    ,require('../../../res/drawable/c_11_pnd.png')
    ,require('../../../res/drawable/c_12_pnd.png')
    ,require('../../../res/drawable/c_13_pnd.png')
    ,require('../../../res/drawable/c_14_pnd.png')
    ,require('../../../res/drawable/c_15_pnd.png')
    ,require('../../../res/drawable/c_16_pnd.png')
    ,require('../../../res/drawable/c_17_pnd.png')
    ,require('../../../res/drawable/c_18_pnd.png')
    ,require('../../../res/drawable/c_19_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_1_pnd.png')
    ,require('../../../res/drawable/c_30_pnd.png')
    ,require('../../../res/drawable/c_31_pnd.png')
    ,require('../../../res/drawable/c_32_pnd.png')
    ,require('../../../res/drawable/c_33_pnd.png')
    ,require('../../../res/drawable/c_34_pnd.png')
    ,require('../../../res/drawable/c_35_pnd.png')
    ,require('../../../res/drawable/c_36_pnd.png')
    ,require('../../../res/drawable/c_37_pnd.png')
    ,require('../../../res/drawable/c_38_pnd.png')
    ,require('../../../res/drawable/c_39_pnd.png')
    ,require('../../../res/drawable/c_40_pnd.png')
];

export default class FatosSDIView extends React.Component {

    state = {
        visible : false,
    };

    constructor(props) {
        super(props);
        this.rgData = null;

        this.preloadImages();
    }

    preloadImages()
    {
        const uris = SDI_IMG_LIST.map(image => ({
            uri: Image.resolveAssetSource(image).uri
        }));

        FastImage.preload(uris);
    }

    getSdiImg(res)
    {
        return <Image style={styles.ImageStyle} source={res} />
    }

    getCameraSpeedTextView(nMaxSpeed, style)
    {
        return <Text style={ style }>
            {nMaxSpeed}
        </Text>
    }

    getSectionDistView(type, StringDist)
    {
        var distViewStyle = null;

        if (type === 13)
        {
            distViewStyle = styles.layout_ando_traffic;
        }
        else if (type === 9)
        {
            distViewStyle = styles.layout_ando_movecamera;
        }
        else
        {
            distViewStyle = styles.layout_ando_round;
        }

        return <View style={distViewStyle}>

            <Text style={ styles.Text }>
                {StringDist}
            </Text>
        </View>
    }

    isShow()
    {
        if(this.rgData !== null)
        {
            if ((this.rgData.SdiShow !== null || this.rgData.SdiShow !== "undefined" ))
            {
                return this.rgData.SdiShow;
            }
        }

        return false;
    }

    setRgData(data)
    {
        this.rgData = data;

        if(this.isShow() === false)
            return;
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
    }

    render () {

        if(this.state.visible === false)
            return null;

        if(this.isShow() === false)
            return null;

        var sdiBackgroundImg = null;
        var sdiImg = null;
        var isRender = false;
        var sectionDistView = null;

        if(this.rgData !== null)
        {
            var nCurSpeed = this.rgData.CarSpeed;

            if (FatosUtil.checkData(this.rgData.ListSDIService))
            {
                var nCount = this.rgData.ListSDIService.length;

                for (var i = 0; i < nCount; ++i)
                {
                    var sdi = this.rgData.ListSDIService[i];

                    if(FatosUtil.checkData(sdi) === false)
                    {
                        isRender = false;
                        break;
                    }

                    if(FatosUtil.checkData(sdi.Type) && Number(sdi.Type) === 0)
                    {
                        isRender = false;
                        break;
                    }

                    if(FatosUtil.checkData(sdi.SectionDist) && Number(sdi.SectionDist) === 0)
                    {
                        isRender = false;
                        break;
                    }
                }

                var sdiStyle = styles.ImageStyle;

                // sdi 가로가 큰타입 이미지 예외처리
                if(sdi.Type === 5)
                {
                    sdiStyle = styles.ImageWidthStyle;
                }

                switch (SDI_ATTR_LIST[sdi.Type])
                {
                    case SDI_TYPE_1:
                    {
                        sdiBackgroundImg = SDI_IMG_LIST[Number(sdi.Type)];
                        sdiImg = this.getCameraSpeedTextView(sdi.MaxSpeed, styles.CameraSpeedText1);
                        if(nCurSpeed > sdi.MaxSpeed && sdi.SectionDist < 600)
                        {

                        }

                        sectionDistView = this.getSectionDistView(sdi.Type, sdi.RemainDist);
                    }
                    break;

                    case SDI_TYPE_2:
                    {
                        sdiBackgroundImg = SDI_IMG_LIST[Number(sdi.Type)];
                        sdiImg = this.getCameraSpeedTextView(sdi.MaxSpeed, styles.CameraSpeedText2);

                        if(nCurSpeed > sdi.MaxSpeed && sdi.SectionDist < 600)
                        {

                        }

                        sectionDistView = this.getSectionDistView(sdi.Type, sdi.RemainDist);
                    }
                    break;

                    case SDI_TYPE_3:
                    {
                        sdiBackgroundImg = SDI_IMG_LIST[Number(sdi.Type)];

                        var minutes = 0;
                        var seconds = 0;
                        var nGuganReminTimeSecond = 0;

                        if (nGuganReminTimeSecond < 0) {
                            minutes = (nGuganReminTimeSecond % 3600) / 60;
                            seconds = (nGuganReminTimeSecond % 60) * -1;
                        } else {
                            minutes = (nGuganReminTimeSecond % 3600) / 60;
                            seconds = nGuganReminTimeSecond % 60;
                        }

                        var strRemainTime = minutes + ';' + FatosUtil.leadingZeros(2,seconds);

                        if(nCurSpeed > sdi.MaxSpeed && sdi.SectionDist < 600)
                        {

                        }

                        sectionDistView = this.getSectionDistView(sdi.Type, sdi.RemainDist);
                    }
                    break;

                    case SDI_TYPE_4:
                    {
                        sdiBackgroundImg = SDI_IMG_LIST[Number(sdi.Type)];
                        sectionDistView = this.getSectionDistView(sdi.Type, sdi.RemainDist);
                    }
                    break;

                    case SDI_TYPE_5:
                    {
                        sdiBackgroundImg = SDI_IMG_LIST[Number(sdi.Type)];
                        sectionDistView = this.getSectionDistView(sdi.Type, sdi.RemainDist);
                    }
                    break;

                }

                isRender = true;
            }
        }
        else
        {
            isRender = false;
        }

        if(isRender === false)
            return null;

        return <View style={styles.container}>
            <FastImage source={sdiBackgroundImg} style={sdiStyle}>
                { sdiImg }
            </FastImage>
            { sectionDistView }
        </View>

    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top : '35%',
        left : 15,
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    layout_ando_traffic: {
        width : 100,
        height : 30,
        backgroundColor : 'rgba(00, 138, 61, 1.0)',
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50,
        borderBottomLeftRadius : 50,
        borderBottomRightRadius : 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    layout_ando_movecamera: {
        width : 100,
        height : 30,
        backgroundColor : 'rgba(00, 147, 231, 1.0)',
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50,
        borderBottomLeftRadius : 50,
        borderBottomRightRadius : 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    layout_ando_round: {
        width : 100,
        height : 30,
        backgroundColor : 'rgba(208, 38, 31, 1.0)',
        borderTopLeftRadius : 50,
        borderTopRightRadius : 50,
        borderBottomLeftRadius : 50,
        borderBottomRightRadius : 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ImageWidthStyle:{
        height : 100,
        width : 160,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ImageStyle:{
        height : 100,
        width : 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    Text: {
        color : 'white',
        fontSize : 20,
    },

    CameraSpeedText1: {
        color : 'black',
        fontWeight: "bold",
        fontSize : 30,
    },

    CameraSpeedText2: {
        color : 'black',
        fontWeight: "bold",
        fontSize : 25,
        marginBottom : 15,
    },
});
