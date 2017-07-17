/**
 * Created by 0easy-23 on 2017/7/15.
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, ListView, ScrollView} from 'react-native';
import NavigatorHeader from '../common/NavigatorHeader';
import Toast from 'react-native-toast';
import {request} from '../services/request';
import LoadingView from '../common/LoadingView';
const limitSize = 10;
export default class extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loaded: false,
            dataArr: ds.cloneWithRows([]),
            moreData: false,
        }
        this._onEndReached = this._onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        request.post('/api/search/pc', {'s': this.props.artistName, 'offset': 0, 'limit': limitSize, 'type': 1}).then(res => {
            if (res.code == 200) {
                this.setState({
                    songsDataSource: this.state.dataArr.cloneWithRows(res.result.songs),
                    loaded: true,
                    songList: res.result.songs,
                    index: 1,
                    moreData: limitSize < res.result.songCount ? true : false,
                    resultCount: res.result.songCount
                })
            } else {
                Toast.showShortCenter("获取数据失败，请重试");
            }
        })
    }

    _onEndReached() {
        console.log(1,Date.now())
        if (this.state.moreData) {
            let offsetSize = this.state.index * limitSize;
            if (offsetSize < this.state.resultCount) {
                request.post('/api/search/pc', {'s': this.props.artistName, 'offset': offsetSize, 'limit': limitSize, 'type': 1}).then(res => {
                    if (res.code == 200) {
                        let songData = res.result.songs
                        let oldData = this.state.songList
                        let newData = [...oldData, ...songData]
                        this.setState({
                            songsDataSource: this.state.dataArr.cloneWithRows(newData),
                            loaded: true,
                            songList: newData,
                            index: this.state.index + 1
                        })
                    } else {
                        Toast.showShortCenter("获取数据失败，请重试");
                    }
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

    render() {
        // console.log(this)
        return (
            <View style={styles.bg}>
                <NavigatorHeader title={this.props.artistName} routeIndex={1} leftAction={() => this.props.navigator.pop()}/>
                <View style={styles.scrollView}>
                    {
                        this.state.loaded ?
                            <MusicList songListArr={this.state.songList} navigator={this.props.navigator} _onEndReached={this._onEndReached} _renderFooter={this._renderFooter}
                                       songsDataSourceList={this.state.songsDataSource}/> :
                            <LoadingView loadingText="加载数据中..."/>
                    }
                </View>
            </View>
        )
    }
}
import MusicList from './MusicList';
const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
        flex: 1,
    },
    scrollView: {
        padding: 10,
        backgroundColor: '#fff',
    }
})