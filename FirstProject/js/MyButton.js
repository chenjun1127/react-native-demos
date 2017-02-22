/**
 * Created by 0easy-23 on 2017/2/5.
 */
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Button} from 'react-native';
export default class MyButton extends Component {
    render() {
        const onButtonPress = () => {
            Alert.alert('Button has been pressed!');
        };
        return (
            <View style={{backgroundColor:'#fff',flex:1,padding:10}}>
                <TextInput
                    style={styles.style_user_input}
                    placeholder='QQ号/手机号/邮箱'
                    numberOfLines={1}
                    autoFocus={true}
                    underlineColorAndroid={'transparent'}
                    textAlign='left'
                />
                <TextInput
                    style={styles.style_user_input}
                    placeholder='密码'
                    numberOfLines={1}
                    underlineColorAndroid={'transparent'}
                    secureTextEntry={true}
                    textAlign='left'
                />
                <View style={styles.style_view_button}>
                    <Text style={{color:'#fff'}}>
                        登录
                    </Text>
                </View>
                <View>
                    <TouchableOpacity onPress={onButtonPress} style={[styles.style_view_button,{marginTop:10}]} activeOpacity={0.7}  >
                        <Text style={{color:'#fff'}}>确定</Text>
                    </TouchableOpacity>
                </View>




            </View>
        )
    }
}

const styles = {
    style_user_input: {
        backgroundColor: '#fff',
        marginBottom: 10,
        height: 45,
    },
    style_view_button: {
        backgroundColor: '#63B8FF',
        borderColor: '#5E93FF',
        borderWidth: 1,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
}