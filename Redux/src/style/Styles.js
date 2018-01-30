/**
 * Created by 0easy-23 on 2017/3/1.
 */
import React from 'react';
import { StyleSheet ,Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    inner:{
        backgroundColor:'#F5FCFF',
        padding:15
    },

    button:{
        backgroundColor:'transparent',
        paddingRight:15
    },
    buttonText:{
        color:'#fff',
        textAlign:'center',
    },
    btn:{
        backgroundColor:'#3c9',
        paddingVertical:10,
        justifyContent:'center',
        borderRadius:5,
        alignItems:'center',
        marginVertical:10,
    },
    line:{
        borderBottomColor:'#d9d9d9',
        borderBottomWidth:1,
        padding:15,

    }
});

export default styles