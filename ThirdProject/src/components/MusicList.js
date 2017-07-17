/**
 * Created by 0easy-23 on 2017/7/15.
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, ListView, TouchableOpacity, Image} from 'react-native';
import MusicPlay from './MusicPlay';
export default class extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {}

        this.listNavigation = this.listNavigation.bind(this);

    }

    // 当前歌曲列表及音乐所在列表中的搜引

    listNavigation(songIndex, songArr) {
        this.props.navigator.push({
            name: '音乐播放页',
            passProps: {
                songIndex: songIndex,
                songArrList: songArr
            },
            component: MusicPlay,
        })
    }

    render() {
        // console.log(this)
        return (
            <ListView renderRow={(row, sectionId, rowId) => {
                return (
                    <TouchableOpacity style={styles.listRow} onPress={() => {
                        this.listNavigation(rowId, this.props.songListArr)
                    }}>
                        <Image source={{uri: row.album.picUrl}} style={styles.roundPic}/>
                        <View style={{flex: 1}}>
                            <Text style={styles.list_text_1}>{row.name}</Text>
                            <Text style={styles.list_text_2}>专辑：{row.album.name}</Text>
                            <Text style={styles.list_text_2}>歌手：{row.artists[0].name}</Text>
                        </View>
                    </TouchableOpacity>
                )

            }} dataSource={this.props.songsDataSourceList}  onEndReached={this.props._onEndReached} onEndReachedThreshold={50} renderFooter={this.props._renderFooter}/>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
        flex: 1,
    },
    listRow: {
        borderBottomColor: '#999',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    roundPic: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    list_text_1: {
        color: '#3c9',
    },
    list_text_2: {
        color: '#666',
        fontSize: 12,
        paddingTop: 5,
    },

})
