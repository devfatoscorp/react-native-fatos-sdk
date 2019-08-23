import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    View,
    TouchableWithoutFeedback,
    FlatList, NativeModules,
    NativeEventEmitter,
    Alert,
} from 'react-native'

import COMMON from "../../common/common";
import FastImage from 'react-native-fast-image';
import FatosLanguageManager from "../../Manager/FatosLanguageManager";
import FatosUIManager from '../../Manager/FatosUIManager';
import Toast from 'react-native-root-toast';

const Images = [
    require('../../../../res/drawable/btn_1_4_1.png'),
    require('../../../../res/drawable/icon_check.png')
];

export default class FatosCountrySelectView extends Component {

    constructor(props) {
        super(props);
        this.preloadImages();

        this.state = {
            data : [],
            language : 0,
        };

        this.languageManager = FatosLanguageManager.GetInstance();
        this.toast = null;
    }

    componentDidMount()
    {
        this.getlanguage();
    }

    getlanguage()
    {
        var native = NativeModules.FatosEnvBridgeModule;

        native.GetLanguage((error, result) => {
            if (error) {
                console.error(error);
            } else {
                this.setState({ language : Number(result)});
                this.setListData();
            }
        })
    }

    setListData()
    {
        var language = this.state.language;
        var data = [];

        var checkView = <View style={styles.checkView}>
            <FastImage style={styles.check} source={Images[1]} />
        </View>;

        var count = COMMON.wecountry_names.length;

        for(var i = 0; i < count; ++i)
        {
            data.push({
                name : COMMON.wecountry_names[i],
                index : i,
                checkView : language == i ? checkView : null,

            });
        }

        this.setState({
            data : data
        });
    }

    preloadImages()
    {
        var uris = Images.map(image => ({
            uri: Image.resolveAssetSource(image).uri
        }));

        FastImage.preload(uris);
    }

    onPressBack()
    {
        this.props.navigation.goBack();
    }

    onCountrySelect(index)
    {
        this.languageManager.setLanguage(index);
        var native = NativeModules.FatosEnvBridgeModule;
        native.SetLanguage(index);
        this.setState({ language : index });
        this.setListData();
        this.onPressBack();

        var nDriveMode = FatosUIManager.GetInstance().getDriveMode();

        if(nDriveMode === COMMON.eDriveMode.eDrive_RG || nDriveMode === COMMON.eDriveMode.eDrive_Simulation)
        {
            this.showToast();
        }
    }

    showToast()
    {
        if(this.toast != null)
            return;

        var languageManager = FatosLanguageManager.GetInstance();
        var message = languageManager.getCodeName("language_change_error");
        this.toast = Toast.show(message, {
            duration: 3000,
            position: -50,
            shadow: true,
            animation: true,
            hideOnPress: false,

            onHidden: () => {
                this.toast.destroy();
                this.toast = null;
            }
        });
    }

    showAlert(index)
    {
        var msg = this.languageManager.getCodeName("country_chang_msg");

        Alert.alert(
            'Select Country',
             msg,
            [
                {text: 'NO'},
                {text: 'YES', onPress: () => this.onCountrySelect(index)},
            ],
            {cancelable: false},
        );
    }

    render() {

        var title = this.languageManager.getCodeName("country_setting");

        return  <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onPressBack() }}>
                    <FastImage style={styles.ImageStyle}
                               source={Images[0]} />
                </TouchableOpacity>
                <Text style={ styles.text }>{title}</Text>
            </View>
            <View style={styles.listview}>
                <FlatList
                    data={this.state.data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                        <TouchableWithoutFeedback onPress={() => { this.showAlert(item.index) }}>
                            <View style={styles.listViewItem}>
                                <Text style={styles.listViewItemText} numberOfLines = { 1 } >{item.name}</Text>
                                {item.checkView}
                            </View>

                        </TouchableWithoutFeedback>
                    }
                    keyExtractor={item => item.index.toString()}
                />
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
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

    checkView :{
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'flex-end',
        marginRight : 15,
    },

    check : {
        width : 30,
        height : 30,

    },

    listview : {
        flex: 1,
    },

    listViewItem : {
        flex: 1,
        height : 60,
        paddingLeft : 10,
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomColor : 'gray',
        borderBottomWidth : 1,
    },

    listViewItemText : {
        flex: 1,
        color : 'black',
        fontSize : 22,
    },
});
