/**
 * Created by 0easy-23 on 2017/2/5.
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @jone
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity} from 'react-native';
const REQUEST_URL = 'https://api.douban.com/v2/movie/';
import LoadingView from '../../common/LoadingView';
const start = 0;
const limitSize = 20;
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            loaded: false,
            moreData: false,

        };
        this.fetchData = this.fetchData.bind(this);
        this.renderMovie = this.renderMovie.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL + this.props.query + `?start=0&count=${limitSize}`).then(res => res.json()).then(resData => {
            console.log(resData)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(resData.subjects),
                loaded: true,
                total: resData.total,
                moreData: this.state.total < limitSize ? false : true,
                index: 1,
                dataList: resData.subjects,
            })

        }).catch((err) => {
            console.log('There has been a problem with your fetch operation:', err.message)
        })
        console.log(this)
    }

    _onEndReached() {
        if (this.state.moreData) {
            let offsetSize = this.state.index * limitSize;
            // console.log(offsetSize)
            if (offsetSize < this.state.total) {
                fetch(REQUEST_URL + this.props.query + `?start=${offsetSize}&count=${limitSize}`).then(res => res.json()).then(resData => {
                    // console.log(resData)
                    let resultData = resData.subjects;
                    let oldData = this.state.dataList;
                    let newData = [...oldData, ...resultData];
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(newData),
                        loaded: true,
                        dataList: newData,
                        index: this.state.index + 1
                    })
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

    renderMovie(row) {
        return (
            <TouchableOpacity style={styles.listRow}>
                <Image source={{uri: row.images.medium}} style={{width: 80, height: 100}}/>
                <View style={{paddingLeft: 10, paddingRight: 0, flex: 1}}>
                    <Text style={{paddingBottom: 3, color: '#3c6'}}>{row.title}</Text>
                    <Text style={{paddingBottom: 3}}>年份：{row.year}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text>主演：</Text>
                        <View style={styles.actors}>
                            {
                                row.casts.map((ele, i) => {
                                    return (
                                        <Text style={{paddingRight: 4}} key={i}>{ele.name}</Text>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <Text style={styles.averageText}>
                    {row.rating.average}
                </Text>
            </TouchableOpacity>

        )
    }

    render() {
        if (this.state.loaded) {
            return (
                <ListView dataSource={this.state.dataSource} renderRow={this.renderMovie} onEndReached={this._onEndReached} onEndReachedThreshold={50}
                          renderFooter={this._renderFooter}/>
            )
        } else {
            return <LoadingView loadingText="加载数据中..."/>
        }
    }


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    averageText: {
        fontSize: 20,
        color: 'red',
        width: 40,
        textAlign: 'right'
    },
    listRow: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        backgroundColor:'#fff',
    },
    actors: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    }
})