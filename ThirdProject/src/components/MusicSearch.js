/**
 * Created by 0easy-23 on 2017/3/22.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput,Image, TouchableHighlight,ListView,Keyboard,AsyncStorage} from 'react-native';
import LoadingView from "../common/LoadingView";
import Toast from 'react-native-toast'
import MusicPlay from './MusicPlay'
const data = ['歌手', '林俊杰', '张碧晨', '因为遇见你', 'KTV', '爱在记忆中找你', '薛之谦','张学友'];
const limitSize = 10
export default class MusicSearch extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            placeholder: '搜索音乐、歌词、歌手',
            song: ds.cloneWithRows([]),
            dataArr: [],                // 当前歌曲列表
            isData: false,              // 有无数据
            noSearchData:false,         // 无搜索数据
            noSearchDataText:null,      // 暂无搜索数据文字
            loading:false,              // 正在加载
            currentValue:null,          // 当前搜索值
            index:1,                    // 当前第一页
            moreData:false,             // 更多数据
            resultCount:0,              // 总数据
            recordArr:[],               // 搜索历史
            recordDataSource:ds.cloneWithRows([])
        }
        this._onPressTags = this._onPressTags.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.listNavigation = this.listNavigation.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._change = this._change.bind(this);
        this._renderRecordRow = this._renderRecordRow.bind(this);
        this.removeRecord = this.removeRecord.bind(this)
    }
    componentDidMount(){
        AsyncStorage.getItem("items").then(json => {
            try {
                const items=JSON.parse(json)
                this.setState({
                    recordArr:items,
                    recordDataSource:this.state.recordDataSource.cloneWithRows(items)
                })
            }catch (err){
                console.warn('error:',err)
            }
        });
    }
    _onPressTags(value) {
        const newItems = [
            ...this.state.recordArr,
            {
                key: Date.now(),
                text: value,
            }
        ];
        this.setState({
            loading:true,
            isData:true,
            currentValue:value,
            recordArr:newItems,
            recordDataSource:this.state.recordDataSource.cloneWithRows(newItems)
        })
        AsyncStorage.setItem('items',JSON.stringify(newItems))
        this.fetchData(value)
        Keyboard.dismiss(); // 点击标签按钮，隐藏键盘
    }
    // 加载数据，请求网易云API
    fetchData(val) {
        // fetch(`http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.search.catalogSug&query=${val}`)
        fetch(`http://music.163.com/api/search/pc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `s=${val}&offset=0&limit=${limitSize}&type=1`
        }).then((response) => response.json()).then((resData) => {
            //console.log('加载数据：',resData);
            if (resData.result.songCount!=0) {
                let songData = resData.result.songs
                this.setState({
                    song: this.state.song.cloneWithRows(songData),
                    currentValue: val,
                    noSearchData: false,
                    loading: false,
                    dataArr: songData,
                    moreData: limitSize < resData.result.songCount ? true : false,
                    resultCount:resData.result.songCount
                })
            } else {
                this.setState({
                    currentValue: val,
                    noSearchData: true,
                    noSearchDataText: '暂无数据',
                    loading: false,
                    dataArr: [],
                    moreData: false,
                })
            }
        }).catch((error) => {
            Toast.showShortCenter("网络连接情况不好，请重试")
            setTimeout(() => {
                this.props.navigator.pop()
            }, 2000)
        })
    }

    onSubmitEditing(event) {
        // var submitVal = event.nativeEvent.text
        let submitVal = this.state.value;
        if (submitVal != "") {
            const newItems = [
                ...this.state.recordArr,
                {
                    key: Date.now(),
                    text: submitVal,
                }
            ];
            this.setState({
                loading: true,
                isData: true,
                currentValue: submitVal,
                recordArr:newItems,
                recordDataSource:this.state.recordDataSource.cloneWithRows(newItems)
            })
            AsyncStorage.setItem('items',JSON.stringify(newItems))
            this.fetchData(submitVal)
        } else {
            this.setState({
                isData: false,
                noSearchData:true,
                noSearchDataText:null,
                currentValue:''
            })
            Toast.showShortCenter("不能为空，请重新输入")
        }
    }
    _change(value){
        this.setState({value})
    }
    onFocus(){
        this.setState({
            currentValue:''
        })
    }
    // 当前歌曲列表及音乐所在列表中的搜引
    listNavigation(songIndex,songArr){
        this.props.navigator.push({
            name:'音乐播放页',
            passProps: {
                songIndex:songIndex,
                songArrList:songArr
            },
            component:MusicPlay,
        })
    }
    // 上拉加载更多
    _onEndReached() {
        if (this.state.moreData) {
            //每次加载一页，一页10条数据；
            let offsetSize = this.state.index * limitSize;
            if(offsetSize < this.state.resultCount){
                fetch(`http://music.163.com/api/search/pc`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `s=${this.state.currentValue}&offset=${offsetSize}&limit=${limitSize}&type=1`
                }).then((response) => {
                    // console.log('加载更多数据：',response)
                    return response.json()
                }).then((resData) => {
                    let songData = resData.result.songs
                    let oldData = this.state.dataArr
                    let newData = [...oldData, ...songData]
                    this.setState({
                        dataArr: newData,
                        song: this.state.song.cloneWithRows(newData),
                        index: this.state.index + 1
                    })
                }).catch((error) => {
                    Toast.showShortCenter("网络连接情况不好，请重试")
                })
            }else{
                this.setState({
                    moreData:false
                })
            }
        }
    }

    _renderFooter(){
        return (
            <View style={{height:40,alignItems:'center',justifyContent:'center'}}>
                {this.state.moreData ? <Text>正在加载...</Text> : <Text>已加载全部数据</Text>}
            </View>
        )
    }
    // 搜索历史
    _renderRecordRow(row){
        return(
            <View style={styles.listRow}>
                <Text style={styles.listRowLeft}>{row.text}</Text>
                <TouchableOpacity style={styles.close} onPress={()=>this.removeRecord(row)}>
                    <Text style={{color:'#3c9',fontSize:18}}>×</Text>
                </TouchableOpacity>
            </View>
        )
    }
    // 清除历史
    removeRecord(row){
        const newItems = this.state.recordArr.filter((item)=>{
            return item.key !== row.key
        })
        this.setState({
            recordArr:newItems,
            recordDataSource:this.state.recordDataSource.cloneWithRows(newItems)
        })
        AsyncStorage.setItem('items',JSON.stringify(newItems))
    }
    render() {
        // console.log(this)
        const tagsData = data.map((ele, index) => {
            return (
                <TouchableHighlight underlayColor={'#3c9'} key={index} ref={index} style={styles.tagsButton} onPress={() => {
                    this._onPressTags(ele)
                }}>
                    <Text style={{lineHeight: 26}}>{ele}</Text>
                </TouchableHighlight>
            )
        })
        // 无数据
        const NoData = (
            <View>
                <Text style={{paddingVertical: 5}}>热门搜索</Text>
                <View style={styles.tags}>
                    {tagsData}
                </View>
                <Text style={styles.searchTitle}>搜索历史</Text>
                <ListView dataSource={this.state.recordDataSource} renderRow={this._renderRecordRow} enableEmptySections = {true} />
            </View>
        )
        // 有数据，
        const HaveData = (
            this.state.loading ?  <LoadingView loadingText={'正在搜索'+this.state.currentValue}/> : (
                this.state.noSearchData ? <GetNoSeasrchData data={this.state.noSearchDataText}/> :<ListView renderRow={(row,sectionId,rowId) => {
                    //console.log(row,rowId)
                    return (
                        <TouchableOpacity style={styles.listRow} onPress={()=>{this.listNavigation(rowId,this.state.dataArr)}}>
                            <Image source={{uri:row.album.picUrl}} style={styles.roundPic}/>
                            <View style={{flex:1}}>
                                <Text style={styles.list_text_1}>{row.name}</Text>
                                <Text style={styles.list_text_2}>专辑：{row.album.name}</Text>
                                <Text style={styles.list_text_2}>歌手：{row.artists[0].name}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                }} dataSource={this.state.song} onEndReached={this._onEndReached} onEndReachedThreshold={50} renderFooter={this._renderFooter}/>
            )
        )

        return (
            <View style={styles.bg}>
                <View style={styles.top}>
                    <TextInput defaultValue={this.state.currentValue} placeholder={this.state.placeholder} placeholderTextColor="#38F1B9" style={styles.textInput} underlineColorAndroid='transparent' onFocus={this.onFocus} onSubmitEditing={this.onSubmitEditing}  onChangeText={(value)=>this._change(value)} />
                    <TouchableOpacity activeOpacity={0.9} style={styles.cancel} onPress={() => {
                        this.props.navigator.pop()
                    }}>
                        <Text style={{color: '#fff'}}>取消</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ScrollView}>
                    {this.state.isData ? HaveData : NoData}
                </View>
            </View>
        )
    }
}

class GetNoSeasrchData extends Component{
    render(){
        return (
            <View style={styles.getNoSeasrchData}>
                <Text>{this.props.data}</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
        flex: 1,
    },
    textInput: {
        backgroundColor: '#279b74',
        height: 36,
        flex: 1,
        color: '#fff'
    },
    top: {
        backgroundColor: "#3c9",
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cancel: {
        paddingLeft: 10,
    },
    ScrollView: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',

    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagsButton: {
        borderColor: '#666',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 18,
        margin: 5,
        height: 34,
        paddingHorizontal: 10,
    },
    searchTitle: {
        paddingVertical: 8,
        color: '#3c9',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#3c9'
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
    getNoSeasrchData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list_text_1: {
        color: '#3c9',
    },
    list_text_2: {
        color: '#666',
        fontSize: 12,
        paddingTop: 5,
    },
    listRowLeft: {
        flex: 1
    },
    close: {
        width: 40,
        alignItems: 'flex-end'
    }
})




