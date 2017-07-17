/**
 * Created by 0easy-23 on 2017/4/13.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
class Control extends Component{
    render(){
        return(
            <View style={[this.props.style,styles.controlPlayer]}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.prevAction}>
                    <Icon name="skip-previous-circle-outline" size={50} color="#3c9"/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.controlBtn} onPress={this.props.playAction}>
                    <Icon name={this.props.playing ? 'pause-circle-outline' : 'play-circle-outline'} size={60} color="#3c9"/>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={this.props.nextAction}>
                    <Icon name="skip-next-circle-outline" size={50} color="#3c9"/>
                </TouchableOpacity>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    controlPlayer:{
        flexDirection:'row',
        width:Dimensions.get('window').width,
        justifyContent:'center',
        alignItems:'center',

    },
    controlBtn:{
        marginHorizontal:50,
    }
})
export default Control