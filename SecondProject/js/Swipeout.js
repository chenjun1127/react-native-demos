/**
 * Created by 0easy-23 on 2017/3/6.
 */
import React, {Component} from  'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 * react-native-swipe-out
 * https://www.npmjs.com/package/react-native-swipe-out
 */

import Header from '../common/Header'
import Swipeout from 'react-native-swipe-out';

var swipeoutBtns = [
    {
        text: 'Del',
        backgroundColor:'red',
    },
    {
        text: 'Button',
        backgroundColor:'#f90'
    },
]
export default class SwipeoutPage extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Header title={this.props.name} leftIcon={require('../img/arrow_left.png')} leftAction={()=>{this.props.navigator.pop()}}/>
                <Swipeout right={swipeoutBtns}>
                    <View style={{padding:10}}  >
                        <Text>Swipe me left</Text>
                    </View>
                </Swipeout>
                <Swipeout right={swipeoutBtns}>
                    <View style={{padding:10}}  >
                        <Text>Swipe me left</Text>
                    </View>
                </Swipeout>
            </View>
        )
    }
}