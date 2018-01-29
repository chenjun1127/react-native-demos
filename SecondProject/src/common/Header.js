/**
 * Created by 0easy-23 on 2017/3/1.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
class Header extends Component {
    render() {
        return (
            <View style={[styles.header,this.props.style]}>
                <TouchableOpacity style={styles.headerLeft} onPress={this.props.leftAction}>
                    <Image source={this.props.leftIcon} style={styles.leftImg}/>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={[styles.headText,this.props.style]}>{this.props.title}</Text>
                </View>
                <TouchableOpacity style={styles.headerRight}>
                    <Text style={styles.rightText}>{this.props.rightText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3c7',
        height: 44,
        flexDirection:'row',
    },
    headerLeft:{
        width:60,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:8,
    },
    headerCenter:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    headerRight:{
        width:60,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:10,
    },
    headText: {
        color: '#fff',
        fontSize: 18,


    },
    leftImg: {
        width:20,
        height: 20,
    },
    rightText:{
        color:'#fff',
    }
})

export default Header