/**
 * Created by 0easy-23 on 2017/7/20.
 */
import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import LoadingView from '../common/LoadingView';
import Toast from 'react-native-toast'
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
export default class extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            loaded: false
        }
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let url = `https://way.jd.com/jisuapi/channel?appkey=ac130be3592a68fa7266569081c0c75e`;
        fetch(url).then(res => res.json()).then(resData => {
            if ((resData.code == 10000) && resData.result.msg == 'ok') {
                this.setState({
                    nav: resData.result.result,
                    loaded: true,
                })
            } else {
                Toast.showShortCenter("获取数据失败，请重试");
            }
        }).catch((err) => {
            console.log('There has been a problem with your fetch operation:', err.message)
        })
    }

    render() {
        if (this.state.loaded) {
            const newsNav = this.state.nav.map((ele, i) => {
                return (
                    <NewsContent tabLabel={ele} key={i} navigator={this.props.navigator}/>
                )
            })
            return (
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar />}
                    ref={(tabView) => {
                        this.tabView = tabView
                    }}
                    tabBarTextStyle={{paddingTop: 0}}
                    tabBarBackgroundColor="#3c9"
                    tabBarActiveTextColor="#fff"
                    tabBarInactiveTextColor="#f9f9f9"
                    tabBarUnderlineStyle={{backgroundColor: '#3c9', borderBottomWidth: 3, borderColor: '#fff'}}
                >
                    {newsNav}

                </ScrollableTabView>
            )
        } else {
            return (
                <LoadingView loadingText="加载数据中..."/>
            )
        }

    }
}

import NewsContent from './NewsContent';