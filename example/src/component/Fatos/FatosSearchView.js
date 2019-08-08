import React from 'react'
import {
    View,
    StyleSheet,
    TextInput, NativeModules,
} from 'react-native'

import FatosUtil from "../common/FatosUtil";
import COMMON from "../common/common";
import FatosLanguageManager from "../Manager/FatosLanguageManager";
import FatosUIManager from '../Manager/FatosUIManager';

export default class FatosSearchView extends React.Component {

    state = {
        visible : true,
    };

    constructor(props) {
        super(props);

        this.rgData = null;
        this.state = { searchText : '' };

        this.native = NativeModules.FatosNaviBridgeModule;

        this.handleChangeText = this.handleChangeText.bind(this);
        this.searchSubmit = this.searchSubmit.bind(this);
    }

    handleChangeText(text) {
        this.setState( {searchText : text} );
    }

    searchSubmit(e)
    {
        if(FatosUtil.isStringEmpty(this.state.searchText))
            return;

        this.native.Search(this.state.searchText);
        this.setState( {searchText : ''} );
    }

    setRgData(data)
    {
        this.rgData = data;
    }

    update()
    {
        this.setVisible(FatosUIManager.GetInstance().isDefaultViewVisible());
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

        var languageManager = FatosLanguageManager.GetInstance();
        var strPlaceholder = languageManager.getCodeName("search_paaceholder");

        return <View style={styles.container} >
            <View style = {styles.searchview}>
                <TextInput ref = 'textInput'
                           style = {styles.input}
                           placeholder = {strPlaceholder}
                           placeholderTextColor = 'gray'
                           returnKeyType ='search'
                           onSubmitEditing = {this.searchSubmit}
                           onChangeText = {this.handleChangeText}
                           value = {this.state.searchText}/>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        flexDirection : 'column',
        width : "100%",
        top : 40,
    },

    searchview: {
        justifyContent: 'flex-start',
        flex : 1,
        height : 50,
        backgroundColor : 'rgba(255, 255, 255, 0.9)',
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        borderColor : "gray",
        borderWidth : 1,
        marginLeft : 10,
        marginRight : 10,
    },

    input: {
        color: 'black',
        paddingLeft : 10,
        height: 50,
        fontWeight: "bold",
        fontSize : 20,
    },
});
