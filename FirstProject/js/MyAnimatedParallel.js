/**
 * Created by 0easy-23 on 2017/1/6.
 */
import React,{Component} from 'react';
import {Animated,View,Text,Easing,Dimensions,PixelRatio} from 'react-native';

export default class MyAnimatedParallel extends Component{
    constructor(props){
        super(props)
        this.state={
            rotation:new Animated.Value(0),
            translate:new Animated.Value(0)
        }
    }
    componentDidMount(){
        Animated.parallel([
            Animated.timing(this.state.rotation,{
                toValue:1,
                duration:1000,
                easing:Easing.easeInEaseOut,
            }),
            Animated.timing(this.state.translate,{
                toValue:1,
                duration:1000,
                easing:Easing.easeInEaseOut,
            })
        ]).start();
    }
    render() {
        return (
            <View>
                <Animated.Text style={{
                    fontSize:30,
                    textAlign:'center',
                    transform:[
                        {

                            translateY:this.state.translate.interpolate({
                                inputRange:[0,1],
                                outputRange:[0,Dimensions.get('window').height*1/3]
                            })
                        },
                        {
                            rotateZ:this.state.rotation.interpolate({
                                inputRange:[0,1],
                                outputRange:['0deg','360deg']
                            }),
                        }
                    ]
                }}>
                    window.width={Dimensions.get('window').width + '\n'}
                    window.height={Dimensions.get('window').height + '\n'}
                    pxielRatio={PixelRatio.get()}
                </Animated.Text>
            </View>
        )
    }
}

