/**
 * Created by 0easy-23 on 2017/3/23.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet,Animated,Easing,Image} from 'react-native';
export default class LoadingView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: new Animated.Value(0)
        }
    }
    componentDidMount() {
        this.AnimateRotate()
    }

    AnimateRotate() {
        this.state.value.setValue(0)
        Animated.timing(this.state.value, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
        }).start(() => this.AnimateRotate())
    }
    render() {
        const animateRotate = this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
        return (
            <View style ={{justifyContent: 'center', alignItems: 'center', paddingTop: 140}}>
                <Animated.View style ={{transform: [{rotateZ: animateRotate}]}}>
                   <Image source={ require('../images/loading.png')} style={{width: 60, height: 60}}/>
                </Animated.View>
                {this.props.loadingText ? <Text style={{paddingTop: 5}}>{this.props.loadingText}</Text> : null}
            </View>
        )
    }
}
