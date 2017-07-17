/**
 * Created by 0easy-23 on 2017/3/21.
 */
import React, {Component} from 'react';
import {View, Text,TouchableOpacity,StyleSheet} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view';
// react-native-scrollable-tab-view提供了两种基本的Tab控制器样式，DefaultTabBar和ScrollableTabBar。很多情况下，官方的样式并不能满足我们的需求,那么此时就需要我们自己来实现特定的样式。
import TabBar from '../common/TabBar';
export default class extends Component{
    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['音乐', '天气', '电影', '服务'],
            tabIconNames: ['ios-musical-notes', 'ios-partly-sunny-outline', 'ios-film', 'ios-list-box-outline'],
            activeColor:'#3c9',
            initColor:'#adadad',
        };
    }
    render(){
        // console.log(this)
        // tabBarUnderlineStyle={{backgroundColor:'#3c9'}} tabBarBackgroundColor={'white'} tabBarActiveTextColor ={'#3c9'} tabBarInactiveTextColor ={'#666'}
        return (
            <ScrollableTabView locked={true} renderTabBar={() => <TabBar tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames} initColor={this.state.initColor} activeColor={this.state.activeColor}/>} tabBarPosition={"overlayBottom"} >
                <MusicPage tabLabel="tab1" navigator={this.props.navigator} />
                <WeatherPage tabLabel="tab2" navigator={this.props.navigator}  />
                <BooksPage tabLabel="tab3" />
            </ScrollableTabView>
        )
    }
}



import MusicPage from './MusicPage';
import WeatherPage from  './WeatherPage';
import BooksPage from  './BooksPage';

const styles= StyleSheet.create({
    tabContanier:{
        backgroundColor:'#5f5f5f'
    }
})

