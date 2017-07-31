/**
 * Created by 0easy-23 on 2017/7/20.
 */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ListView, Image, RefreshControl} from 'react-native';
import Toast from 'react-native-toast'
import LoadingView from "../../common/LoadingView";
import NewsDetail from './NewsDetail';
const limitSize = 10;
export default class extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listDataSource: ds,
            isRefreshing: false,
            loaded: false,
            moreData: false,
            index: 1,                    // 当前第一页
        }
        this.fetchData = this.fetchData.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        let url = `https://way.jd.com/jisuapi/get?channel=${this.props.chanel}&num=${limitSize}&start=0&appkey=ac130be3592a68fa7266569081c0c75e`;
        fetch(url).then(res => res.json()).then(resData => {
            if ((resData.code == 10000) && resData.result.msg == 'ok') {
                this.setState({
                    loaded: true,
                    initList: resData.result.result.list,
                    listDataSource: this.state.listDataSource.cloneWithRows(resData.result.result.list),
                    moreData: true,
                    isRefreshing: false,
                })
            } else {
                Toast.showShortCenter("获取数据失败，请重试");
            }
        }).catch((err) => {
            console.log('There has been a problem with your fetch operation:', err.message)
        })
    }

    _onPress(ele) {
        this.props.navigator.push({
            name: 'news',
            passProps: {
                content: ele,
                chanel: this.props.chanel
            },
            component: NewsDetail,
        })
    }

    _renderRow(row) {
        return (
            <View style={styles.bg}>
                <TouchableOpacity style={styles.newsList} onPress={() => {
                    this._onPress(row)
                }}>
                    {row.pic ? <Image source={{uri: row.pic}} style={{width: 110, height: 80, marginRight: 10}}/> : null}
                    <View style={styles.newsText}>
                        <Text style={styles.title}>{row.title}</Text>
                        <Text style={ styles.subTitle}>{row.src}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    // 上拉加载更多
    _onEndReached() {
        if (this.state.moreData) {
            //每次加载一页，一页10条数据；
            let offsetSize = (this.state.index + 1) * limitSize;
            if (offsetSize <= 50) { // 大于50条默认数据已经加载完了
                let url = `https://way.jd.com/jisuapi/get?channel=${this.props.chanel}&num=${limitSize}&start=${offsetSize}&appkey=ac130be3592a68fa7266569081c0c75e`;
                fetch(url).then(res => res.json()).then((resData) => {
                    if ((resData.code == 10000) && resData.result.msg == 'ok') {
                        let dataList = resData.result.result.list;
                        let oldData = this.state.initList;
                        let newData = [...oldData, ...dataList];
                        this.setState({
                            listDataSource: this.state.listDataSource.cloneWithRows(newData),
                            initList: newData,
                            index: this.state.index + 1,
                            loaded: true,
                        })
                    } else {
                        Toast.showShortCenter("获取数据失败，请重试");
                    }
                }).catch((err) => {
                    console.log('There has been a problem with your fetch operation:', err.message)
                })
            } else {
                this.setState({
                    moreData: false
                })
            }
        }
    }

    _renderFooter() {
        return (
            <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
                {this.state.moreData ? <Text>正在加载...</Text> : <Text>已加载全部数据</Text>}
            </View>
        )
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.fetchData();
            // this.setState({isRefreshing: false});
            console.log('刷新数据...')
        }, 1000)
    }

    render() {
        // console.log(this)
        if (this.state.loaded) {
            return (
                <ListView refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#fff']}
                        progressBackgroundColor="#3c9"
                    />} dataSource={this.state.listDataSource} renderRow={this._renderRow} onEndReached={this._onEndReached} onEndReachedThreshold={50}
                          renderFooter={this._renderFooter}/>
            )
        } else {
            return (
                <LoadingView loadingText="加载数据中..."/>
            )
        }
    }
}

const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
        flex: 1,
    },
    newsList: {
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        flexDirection: 'row',
        padding: 10
    },
    newsText: {
        flex: 1,
    },
    subTitle: {
        color: '#999',
        paddingTop: 5
    },
    title: {
        fontSize: 16,
        color: '#000'
    }
})


