/**
 * Created by 0easy-23 on 2017/3/2.
 */
import React, {Component} from  'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';

import styles from '../style/Styles'
import Header from '../common/Header'
import ImagePicker from 'react-native-image-picker';
/**
 * react-native-image-picker
 * https://github.com/marcshilling/react-native-image-picker
 */
var options = {
    title: '选择图片',
    customButtons: [{
        name: 'fb',
        title: 'Choose Photo from Facebook'
    }, ], // [按钮文字] : [当选择这个按钮时返回的字符串]
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
    chooseFromLibraryButtonTitle: '从图库选择' // 调取相册的按钮，可以设置为空使用户不可选择相册照片

};
export default class ImagePickerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        };
    }
    render() {
        return (
            <View style={styles.inner}>
                <Header title={this.props.name} leftIcon={require('../img/arrow_left.png')} leftAction={()=>{this.props.navigator.pop()}} rightText="确定"/>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={()=>this.openMycamera()}>
                        <Text style={styles.welcome}>
                            相机&相册
                        </Text>
                    </TouchableOpacity>
                    <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
                </View>
            </View>
        )
    }
    openMycamera() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = {
                    uri: response.uri
                };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
}