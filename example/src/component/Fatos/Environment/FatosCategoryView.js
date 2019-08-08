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
const Images = [
    require('../../../../res/drawable/btn_1_4_1.png'),
    require('../../../../res/drawable/icon_check.png')
];

export default class FatosCategoryView extends Component {

    constructor(props) {
        super(props);
        this.preloadImages();

        this.state = {
            data : []
        };
    }

    componentDidMount()
    {
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
                checkView : checkView,
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
        // 국가 변경 처리할것
        this.onPressBack();
    }

    showAlert(index)
    {
        Alert.alert(
            'Select Country',
            '국가 설정을 변경하시겠습니까?',
            [
                {text: 'NO'},
                {text: 'YES', onPress: () => this.onCountrySelect(index)},
            ],
            {cancelable: false},
        );
    }

    render() {

        return  <View style={styles.container} >
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { this.onPressBack() }}>
                    <FastImage style={styles.ImageStyle}
                               source={Images[0]} />
                </TouchableOpacity>
                <Text style={ styles.text }>{'국가 설정'}</Text>
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
        backgroundColor : 'rgba(232, 232, 232, 1.0)',
    },

    listViewItem : {
        flex: 1,
        height : 60,
        paddingLeft : 10,
        flexDirection : 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius : 5,
        borderTopRightRadius : 5,
        borderBottomLeftRadius : 5,
        borderBottomRightRadius : 5,
        borderColor : "rgba(232, 232, 232, 1.0)",
        borderWidth : 1,
        marginTop : 1,
        marginLeft : 1,
        marginRight : 1,
        marginBottom : 3,
    },

    listViewItemText : {
        flex: 1,
        color : 'black',
        fontSize : 22,
    },
});
