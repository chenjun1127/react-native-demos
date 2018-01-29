/**
 * Created by 0easy-23 on 2017/3/1.
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity,Navigator} from 'react-native';
import styles from './style/Styles'

import ImagePickerPage from './components/ImagePicker'
import CarouselPage from './components/Carousel'
import PullRefreshPage from './components/PullRefresh'
import SwipeoutPage from './components/Swipeout'


export default class SecondProject extends Component{


    render(){
        const routes = [
            {component:IndexComponent},
            {component:ImagePickerPage},
            {component:CarouselPage},
            {component:PullRefreshPage},
            {component:SwipeoutPage},
        ];
        return(
            <Navigator initialRoute={routes[0]}  initialRouteStack={routes} renderScene={(route,navigator) =>{
                return <route.component route={route} navigator={navigator} routes={routes} {...route.passProps}/>
            }} configureScene={this.configureScene} />
        )
    }
    configureScene(route,routeStack){
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }


}

class IndexComponent extends Component {
    static defaultProps = {
        title: '第三方组件',
        Data: [
            {
                id: 0,
                title: 'react-native-image-picker',
                description: 'React Native 允许使用本地UI从设备库或直接从相机中选择一个照片/视频',
                componentName:'ImagePickerPage'
            },
            {
                id: 1,
                title: 'react-native-carousel',
                description: '简单的 React Native 轮播控件',
                componentName:'CarouselPage'
            },
            {
                id: 2,
                title: 'react-native-pull',
                description: 'React Native 的下拉刷新组件',
                componentName:'PullRefreshPage',
            },
            {
                id: 3,
                title: 'react-native-swipeout',
                description: 'React Native 的 IOS 风格左滑删除组件',
                componentName:'SwipeoutPage',
            }
        ]
    }
    _navigate(name,component,type='normal') {
        this.props.navigator.push({
            component: component,
            passProps: {
                name: name
            },
            type: type
        })
    }

    render() {
        const list = this.props.Data.map((ele, index) => {
            return <TextList key={index} title={ele.title} onclick={()=>{this._navigate(ele.title,this.props.routes[index+1].component)}}/>
        })

        return (
            <View style={styles.container}>
                {list}
            </View>
        )
    }


}

class TextList extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={this.props.onclick}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}


