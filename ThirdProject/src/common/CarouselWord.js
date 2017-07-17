/**
 * Created by jone-chen on 2017/3/31.
 * 文字轮播组件
 * Sample React Native App
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text, Animated} from 'react-native';

const ListHeight = 40;
export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listHeight: ListHeight,
            speed: -ListHeight,
            maxNum: 5,
            fadeAnim: new Animated.Value(0),
            arr: [
                {msg: 111}, {msg: 222},
                {msg: 333}, {msg: 444},
                {msg: 555}, {msg: 666},
                {msg: 777}, {msg: 888},
                {msg: 999}, {msg: 101010},

            ],
        }
        this.timer = null
        this.speed = -ListHeight
        this.toValue = 1
        this.delay = 3000
    }

    carousel() {
        const {maxNum} = this.state;
        Animated.timing(
            this.state.fadeAnim,
            {toValue: this.toValue}
        ).start();
        if (this.toValue == maxNum) {
            this.state.fadeAnim.setValue(0);
            this.toValue = 0
        } else {
            this.toValue++
        }
    }

    componentDidMount() {
        this.timing()
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    //轮播内容
    renderList() {
        const {arr, listHeight} = this.state
        const listContent = arr.map((ele, i) => {
            return (
                <View style={{height: listHeight}} key={i}>
                    <Text style={styles.listText}>{ele.msg}</Text>
                </View>
            )
        })
        return listContent
    }

    timing() {
        this.timer = setInterval(() => {
            this.carousel()
        }, this.delay);
    }

    render() {
        return (

            <View style={styles.parentStyle}>
                <Animated.View
                    style={{
                        transform: [{
                            translateY: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, this.speed]
                            }),
                        }],
                    }}>
                    <View >{this.renderList()}</View>
                </Animated.View>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    parentStyle: {
        //flex: 1,
        height:ListHeight,
        overflow:'hidden',
        borderBottomWidth:1,
        borderBottomColor:'#000',
        paddingTop:8,
        paddingLeft:10,



    },
    area: {
        height: 300,
    },

    listText: {
        fontSize: 16,
        color: '#3f8fff'
    },

})