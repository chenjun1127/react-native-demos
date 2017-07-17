/**
 * Created by 0easy-23 on 2017/3/1.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class NavigatorHeader extends Component {

    render() {
        const backIcon = <Icon name="ios-arrow-back" size={32} color="#fff"/>;
        const right=(
            <TouchableOpacity style={styles.headerRight} onPress={this.props.rightAction}>
                <Text style={styles.rightText}>{this.props.rightText}</Text>
            </TouchableOpacity>
        )
        return (
            <View style={[styles.header,this.props.style]}>
                <TouchableOpacity style={styles.headerLeft} onPress={this.props.leftAction}>
                    {this.props.routeIndex > 0 ? backIcon : null }
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={[styles.headText,this.props.style]}>{this.props.title}</Text>
                </View>
                {right}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3c9',
        height: Platform.OS === 'android' ? 44:64,
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

export default NavigatorHeader