import React, { Component } from 'react'
import {
    ImageBackground,
    Image,
    Text,
    Alert,
    View,
    Button,
    StyleSheet,
    NativeModules,
    TouchableWithoutFeedback,
    NativeEventEmitter,
    TouchableOpacity,
    Platform,
    Dimensions,
    TextInput,
} from 'react-native'

import FastImage from 'react-native-fast-image'
import FatosUtil from "../common/FatosUtil"
import COMMON from "../common/common";
import FatosLanguageManager from '../Manager/FatosLanguageManager'
import FatosUIManager from '../Manager/FatosUIManager';

const images = [
    require('../../../res/drawable/summary_icon_start.png')
    ,require('../../../res/drawable/summary_icon_middle.png')
    ,require('../../../res/drawable/summary_icon_destination.png')
    ,require('../../../res/drawable/btn_close_n.png')
    ,require('../../../res/drawable/btn_change_n.png')
];

export default class FatosSummarySearchView extends React.Component {

    state = {
        searchStartText : '',
        searchEndText : '',
        visible : false,
    };

    constructor(props) {
        super(props);

        this.handleStartChangeText = this.handleStartChangeText.bind(this);
        this.searchStartSubmit = this.searchStartSubmit.bind(this);
        this.handleEndChangeText = this.handleEndChangeText.bind(this);
        this.searchEndSubmit = this.searchEndSubmit.bind(this);

        this.preloadImages();

        this.native = NativeModules.FatosNaviBridgeModule;

        this.state.searchStartText = this.props.startName;
        this.state.searchEndText = this.props.goalName;
    }

    preloadImages()
    {
        var uris = images.map(image => ({
            uri: Image.resolveAssetSource(image).uri
        }));

        FastImage.preload(uris);
    }

    setSearchStartText(text)
    {
        this.setState( {searchStartText : text} );
    }

    setSearchGoalText(text)
    {
        this.setState( {searchEndText : text} );
    }

    onPressClose()
    {
        this.native.CancelRoute();
        this.props.clearSummaryData(false);
    }

    onPressChange()
    {
        var startData = this.props.summarySearchListView.current.getStartData();
        var goalData = this.props.summarySearchListView.current.getGoalData();

        if(startData != null && goalData != null)
        {
            this.setState( {searchStartText : startData.name} );
            this.setState( {searchEndText : goalData.name} );
            this.props.summarySearchListView.current.OnChangeStartGoal();
        }
    }

    handleStartChangeText(text) {
        this.setState( {searchStartText : text} );
    }

    searchStartSubmit(e)
    {
        if(FatosUtil.isStringEmpty(this.state.searchStartText))
            return;

        this.native.Search(this.state.searchStartText);
        // this.setState( {searchStartText : ''} );
        this.props.summarySearchListView.current.setStartFlag(true);
    }

    handleEndChangeText(text) {
        this.setState( {searchEndText : text} );
    }

    searchEndSubmit(e)
    {
        if(FatosUtil.isStringEmpty(this.state.searchEndText))
            return;

        this.native.Search(this.state.searchEndText);
        // this.setState( {searchEndText : ''} );
        this.props.summarySearchListView.current.setGoalFlag(true);
    }

    update()
    {
        this.setVisible(FatosUIManager.GetInstance().isSummaryViewVisible());
    }

    setVisible(val)
    {
        if(val !== this.state.visible)
        {
            this.setState({visible : val});
        }
    }

    render()
    {
        if(this.state.visible === false)
            return null;

        var languageManager = FatosLanguageManager.GetInstance();

        var strPlaceholder1 = languageManager.getCodeName("summary_placeholder1");
        var strPlaceholder2 = languageManager.getCodeName("summary_placeholder2");

        return <View style={styles.container} >
            <View style={styles.summarySearchView} >
                <View style={styles.iconView} >
                    <FastImage style={ styles.icon1 } source={ images[0] } />
                    <FastImage style={ styles.icon2 } source={ images[1] } />
                    <FastImage style={ styles.icon3 } source={ images[1] } />
                    <FastImage style={ styles.icon4 } source={ images[2] } />
                </View>
                <View style={styles.searchView} >
                    <TextInput style = {styles.inputStart}
                               underlineColorAndroid = "transparent"
                               placeholder = {strPlaceholder1}
                               placeholderTextColor = "gray"
                               autoCapitalize = "none"
                               returnKeyType ='search'
                               onSubmitEditing = {this.searchStartSubmit}
                               onChangeText = {this.handleStartChangeText}
                               value = {this.state.searchStartText}/>
                    <TextInput style = {styles.inputEnd}
                               underlineColorAndroid = "transparent"
                               placeholder = {strPlaceholder2}
                               placeholderTextColor = "gray"
                               autoCapitalize = "none"
                               onSubmitEditing = {this.searchEndSubmit}
                               onChangeText = {this.handleEndChangeText}
                               value = {this.state.searchEndText}/>
                </View>
                <View style={styles.buttonView} >
                    <TouchableOpacity  onPress={() => { this.onPressClose() }}>
                        <FastImage style={ styles.buttonClose } source={ images[3] } />
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => { this.onPressChange() }}>
                        <FastImage style={ styles.buttonChange } source={ images[4] } />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        width : "100%",
        top: 40,
    },

    summarySearchView: {
        flexDirection : 'row',
        flex : 1,
        height : 85,
        backgroundColor : 'rgba(255, 255, 255, 1.0)',
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        borderColor : 'rgba(219, 221, 210, 1.0)',
        borderWidth : 1,
        marginLeft : 10,
        marginRight : 10,
    },

    iconView : {
        flexDirection : 'column',
        width : 30,
        height : 85,
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon1 : {
        width: 12,
        height : 12,
    },

    icon2 : {
        width: 3,
        height : 3,
        marginTop: 7,
        marginBottom: 3,
    },

    icon3 : {
        width: 3,
        height : 3,
        marginTop: 3,
        marginBottom: 7,
    },

    icon4 : {
        width: 12,
        height : 13,
    },

    searchView : {
        flex : 1,
        flexDirection : 'column',
        justifyContent: 'center',
    },

    inputStart: {
        margin: 1,
        height: 35,
        borderWidth: 1,
        backgroundColor : 'rgba(244, 244, 244, 1.0)',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
        borderColor : 'rgba(230, 230, 230, 1.0)',
        color: 'black',
        paddingLeft : 10,
        fontWeight: "bold",
        fontSize : 12,
        marginBottom : 2,
        marginLeft: 3,
        marginRight: 3,
    },

    inputEnd: {
        margin: 1,
        height: 35,
        borderWidth: 1,
        backgroundColor : 'rgba(244, 244, 244, 1.0)',
        borderTopLeftRadius : 20,
        borderTopRightRadius : 20,
        borderBottomLeftRadius : 20,
        borderBottomRightRadius : 20,
        borderColor : 'rgba(230, 230, 230, 1.0)',
        color: 'black',
        paddingLeft : 10,
        fontWeight: "bold",
        fontSize : 12,
        marginTop : 2,
        marginLeft: 3,
        marginRight: 3,
    },

    buttonView : {
        flexDirection : 'column',
        width : 30,
        height : 85,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonClose : {
        width : 15,
        height : 15,
        marginBottom : 13,
    },

    buttonChange : {
        width : 15,
        height : 15,
        marginTop : 13,
    },
});


