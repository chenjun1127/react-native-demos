import React, {Component} from  'react';
import {View, Text, StyleSheet,Image,Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
import styles from '../style/Styles'
import Header from '../common/Header'
import Carousel from 'react-native-carousel';
/**
 * react-native-carousel
 * https://github.com/nick/react-native-carousel
 */
export default class CarouselPage extends Component {
    render() {
        return (
            <View style={styles.inner}>
                <Header title={this.props.name} leftIcon={require('../img/arrow_left.png')} leftAction={()=>{this.props.navigator.pop()}} />
                <Carousel animate={false} indicatorColor="#fff" inactiveIndicatorColor="#3c9" indicatorAtBottom={false} indicatorOffset={150} >
                    <View style={[Styles.CarouselContainer,{backgroundColor:'#f00'}]}>
                        <Image source={{uri:'http://img4.kwcdn.kuwo.cn/star/upload/7/7/1488166093399_.jpg'}} style={{width:width,height:200}}/>
                    </View>
                    <View style={[Styles.CarouselContainer,{backgroundColor:'#ffb03c'}]}>
                        <Image source={{uri:'http://img4.kwcdn.kuwo.cn/star/upload/10/10/1487659846202_.jpg'}} style={{width:width,height:200}}/>
                    </View>
                    <View style={[Styles.CarouselContainer,{backgroundColor:'#cb80ff'}]}>
                        <Text>Page 3</Text>
                    </View>
                </Carousel>
            </View>

        )
    }
}

const Styles = StyleSheet.create({
    CarouselContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
