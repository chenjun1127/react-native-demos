/**
 * Created by 0easy-23 on 2017/1/5.
 */
import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, Easing} from 'react-native';

export default class MyAnimatedBasic extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            fadeInOpacity: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 2500,
            easing:Easing.linear,
        }).start();
    }

    render() {
        return (
            <Animated.View style={[styles.demo, {opacity: this.state.fadeInOpacity}]}>
                <Text style={styles.text}>悄悄的，我出现了</Text>
            </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    }
});