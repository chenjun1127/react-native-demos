/**
 * Created by 0easy-23 on 2017/2/5.
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, DatePickerAndroid, TouchableHighlight} from 'react-native';
import {formateDate} from '../common/tools';
export default class DatePickerForAndroid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            presetDate: new Date(2016, 3, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: '选择日期,默认今天',
            minText: '选择日期,不能比今日再早',
            maxText: '选择日期,不能比今日再晚',
            presetText: '选择日期,指定2016/3/5',
        }
    }

    async showPicker(stateKey, options) {
        try {
            var newState = {};
            const {action, year, month, day} = await DatePickerAndroid.open(options);
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                console.log(date)
                // newState[stateKey + 'Text'] = date.toLocaleDateString();
                newState[stateKey + 'Text'] = formateDate(date)
                newState[stateKey + 'Date'] = date;
            } else {
                newState[stateKey + 'Text'] = 'dismissed';
            }
            this.setState(newState);
        } catch ({code, message}) {
            console.warn(`Error in example '${stateKey}': `, message);
        }
    }

    render() {
        return (
            <View style={{backgroundColor:'#fff',flex:1,padding:10}}>
                <Text style={styles.welcome}>
                    日期选择器组件实例
                </Text>
                <TouchableHighlight underlayColor="#a5a5a5" onPress={this.showPicker.bind(this, 'simple', {date: this.state.simpleDate})}>
                    <Text style={{color:'#333'}}>点击弹出基本日期选择器</Text>
                </TouchableHighlight>
                <CustomButton text={this.state.presetText} onPress={this.showPicker.bind(this, 'preset', {date: this.state.presetDate})}/>
                <CustomButton text={this.state.minText} onPress={this.showPicker.bind(this, 'min', {date: this.state.minDate,minDate:new Date()})}/>
                <CustomButton text={this.state.maxText} onPress={this.showPicker.bind(this, 'max', {date: this.state.maxDate,maxDate:new Date()})}/>
            </View>
        )
    }
}
//简单封装一个组件
class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight style={styles.button} underlayColor="#a5a5a5" onPress={this.props.onPress}>
                <Text style={styles.buttonText}>
                    {this.props.text}
                </Text>
            </TouchableHighlight>
        );
    }
}
const styles = {
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#333',
    },
    buttonText: {
        color: '#fff',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#63B8FF',
        borderColor: '#5E93FF',
        borderWidth: 1,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
}