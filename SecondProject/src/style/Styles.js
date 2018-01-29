/**
 * Created by 0easy-23 on 2017/3/1.
 */
import React from 'react';
import { StyleSheet ,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inner:{
        flex:1,
        backgroundColor:'#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button:{
        backgroundColor:'#33cc77',
        borderRadius:15,
        margin:10,
        padding:10,
        width:width-80,
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
    },
    uploadAvatar:{
        width:200,
        height:200
    },

});

export default styles