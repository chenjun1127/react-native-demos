/**
 * Created by 0easy-23 on 2017/2/17.
 */
// slider组件
import React, {Component} from 'react';
import {View, Text, Slider, StyleSheet} from 'react-native';

export default class SimpleSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 10
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Slider style={styles.slider} maximumValue={100} minimumValue={0} value={this.props.value} step={2} onSlidingComplete={(value)=>{this.setState({value:value})}}/>
                <Text style={styles.text}>选择的值：{this.state.value}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slider: {
        margin: 5,
        marginTop: 100
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 0,
    },
})

