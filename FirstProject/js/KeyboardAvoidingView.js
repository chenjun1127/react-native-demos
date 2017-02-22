/**
 * Created by 0easy-23 on 2017/2/10.
 */
import React, {Component} from 'react';
import {KeyboardAvoidingView,View,Text,TextInput,StyleSheet,ScrollView} from 'react-native';

export default class MyKeyboardAvoidingView extends Component{
    constructor(props){
        super(props)
        this.state={
            data:'请输出关键字！',
            modalOpen: false,
        }
    }

    render(){
        return (
            <KeyboardAvoidingView behavior='padding' >
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{height:400,backgroundColor:'red',justifyContent:'center',alignItems:'center',}}>
                            <Text style={{fontSize:28,color:'#fff',textAlign:'center',}}>Top Area</Text>
                        </View>
                        <TextInput  style={styles.textInput} placeholder={this.state.data}/>
                        <View style={{height:400,backgroundColor:'blue',justifyContent:'center',alignItems:'center',}}>
                            <Text style={{fontSize:28,color:'#fff',textAlign:'center',}}>Bottom Area</Text>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    textInput:{
        height:40,
        backgroundColor:'orange',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
})
