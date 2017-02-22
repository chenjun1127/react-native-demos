/**
 * Created by 0easy-23 on 2017/2/10.
 */
import React,{Component} from 'react';
import {StyleSheet,View,Text,TouchableHighlight,Alert,Modal,Image} from 'react-native';
export default class MyModal extends Component{
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }
    render() {
        return (
            <View style={{flex:1}}>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                >
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <View style={{justifyContent:'center',flexDirection:'row'}}>
                                <Text style={{paddingBottom:15,paddingTop:5,fontSize:16}}>选择分享方式</Text>
                            </View>
                            <View style={{justifyContent:'space-between',flexDirection:'row',paddingBottom:15, marginLeft:30,marginRight:30}}>
                                <View style={styles.share}>
                                    <Image resizeMode='contain' style={styles.img} source={require('../img/weixin.png')}/>
                                    <Text>微信好友</Text>
                                </View>
                                <View style={styles.share}>
                                    <Image resizeMode='contain' style={styles.img} source={require('../img/weixin_pengyou.png')}/>
                                    <Text>微信朋友圈</Text>
                                </View>
                                <View style={styles.share}>
                                    <Image resizeMode='contain' style={styles.img} source={require('../img/sina.png')}/>
                                    <Text>新浪微博</Text>
                                </View>
                            </View>
                            <TouchableHighlight style={styles.cancel} underlayColor="#63B8FF" onPress={() => {
                              this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>取消</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <View style={{padding:10}}>
                    <TouchableHighlight  style={styles.button}  underlayColor="#63B8FF"  onPress={() => {
                  this.setModalVisible(true)
                }}>
                    <Text style={{color:'#fff'}}>Show Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor:'rgba(0,0,0,.4)',
    },
    innerContainer: {
        padding:10,
        backgroundColor:'white',
    },
    button: {
        backgroundColor: '#63B8FF',
        borderColor: '#5E93FF',
        borderWidth: 1,
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        borderRadius:100,
        width:50,
        height:50,
        marginBottom:5,
    },
    share:{
        alignItems:'center',
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d9d9d9',
        padding: 10,
        paddingBottom: 0
    }
});

