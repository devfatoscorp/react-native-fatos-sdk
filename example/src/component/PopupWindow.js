import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native'

export default class PopupWindow extends Component {
    state = {
        show: false
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                show: true
            })
        }, 3000)
    }
    render() {
        console.log('render ' + this.state.show)
        return this.state.show ? (
            <View style={StyleSheet.absoluteFill}>
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => {
                        console.log('on click')
                        this.setState({
                                show: false
                            }, () => setTimeout(() => this.setState({show: true}), 3000)
                        )}
                    }>
                        <View>
                            <Text style={styles.text}>
                                "Hi a Text"
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        ) : null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: 'white',
        width: 300,
        height: 240,
        textAlign: 'center',
        backgroundColor: 'orange',
        borderRadius: 20,
    }
})
