import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, ListView} from 'react-native';
import NavigatorHeader from '../../common/NavigatorHeader';
import Toast from 'react-native-toast';
import {request} from '../../services/request';
import LoadingView from '../../common/LoadingView';
export default class extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loaded: false,
            dataArr: ds.cloneWithRows([]),
        }
    }

    componentWillMount() {
        this._fetchData();
    }

    _fetchData() {
        request.get(`/api/album/${this.props.id}`).then(res => {
            if (res.code == 200) {
                this.setState({
                    songsDataSource: this.state.dataArr.cloneWithRows(res.album.songs),
                    loaded: true,
                    songList: res.album.songs,
                })
            } else {
                Toast.showShortCenter("获取数据失败，请重试");
            }
        })
    }

    render() {
        return (
            <View style={styles.bg}>
                <NavigatorHeader title={this.props.name} routeIndex={1} leftAction={() => this.props.navigator.pop()}/>
                <ScrollView style={styles.scrollView}>
                    {
                        this.state.loaded ?
                            <MusicList songListArr={this.state.songList} navigator={this.props.navigator} songsDataSourceList={this.state.songsDataSource}/> :
                            <LoadingView loadingText="加载数据中..."/>
                    }
                </ScrollView>
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

