/**
 * Created by 0easy-23 on 2017/2/21.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated, Easing} from 'react-native';
const pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};
export default class MyScrollView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listArray: Array.from(new Array(10)).map(() => {
                return {uri: pic, text: 'Banana'}
            }),
            bool: true,
        }
        this.onclick = this.onclick.bind(this)
    }

    onclick() {
        this.setState({
            bool: !this.state.bool
        })
    }

    render() {
        const Lists = this.state.listArray.map((ele, index) => {
            return <List key={index} data={ele} styles={this.state.bool}/>
        })
        return (
            <View>
                <ScrollView horizontal={this.state.bool}>
                    {Lists}
                </ScrollView>
                {/*添加小球控制方向*/}
                <Ball onclick={this.onclick}/>
            </View>
        )
    }
}
// list组件
class List extends Component {
    render() {
        return (
            <View style={this.props.styles ? styles.viewHorizontal : styles.viewVertical}>
                <Image source={this.props.data.uri} style={this.props.styles ? styles.imagesHorizontal : styles.imagesVertical}></Image>
                <Text style={styles.text}>{this.props.data.text}</Text>
            </View>
        )
    }
}
// 小球
class Ball extends Component {
    constructor(props) {
        super(props)
        this.state = {
            height: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.AnimateHeight()
    }

    AnimateHeight() {
        this.state.height.setValue(0)
        Animated.timing(this.state.height, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
        }).start(() => this.AnimateHeight())
    }

    render() {
        const animateHeight = this.state.height.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [50, 120, 50]
        })
        return (
            <View style={styles.ball}>
                <Animated.View style={[styles.line,{height:animateHeight}]}>
                </Animated.View>
                <TouchableOpacity activeOpacity={0.3} style={styles.button} onPress={this.props.onclick}>
                    <Text style={{color:'white'}}>点击我</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    viewHorizontal: {
        marginLeft: 10,
    },
    imagesHorizontal: {
        width: 193,
        height: 110,
    },
    viewVertical: {
        marginHorizontal: 10,
    },
    imagesVertical: {
        flex: 1,
        height: 180
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
    },
    ball: {
        position: 'absolute',
        right: 20,
        top: 0,
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f80',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: 3,
        height: 50,
        backgroundColor: '#f80',
    }
})