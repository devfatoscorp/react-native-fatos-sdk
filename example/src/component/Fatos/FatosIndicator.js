import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

export default class FatosIndicator extends Component {

    componentDidMount() {

    }

    render() {

        return  <View style={StyleSheet.absoluteFill}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.loading}>
                        <ActivityIndicator size="large"  color="#FFFFFF" />
                        <Text style={styles.textstyle} >Loading</Text>
                    </View>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    content: {
        padding: 35,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        borderBottomLeftRadius : 10,
        borderBottomRightRadius : 10,
    },

    loading: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height : 50,
    },

    textstyle: {
        paddingTop : 10,
        fontSize: 18,
        fontWeight: 'bold',
        color : 'white',
    }
})