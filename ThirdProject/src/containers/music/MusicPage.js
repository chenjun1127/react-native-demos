/**
 * Created by 0easy-23 on 2017/3/22.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Keyboard, Dimensions, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-toast';
const {width} = Dimensions.get("window");
import {request} from '../../services/request';
export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '搜索音乐、歌词、歌单',
            text:'张学友',
            hasBanner:false,
            hasNewAlbum:false,
            hasArtists:false,
        }
        this.renderSwiper = this.renderSwiper.bind(this);
        this.renderNewAlbum = this.renderNewAlbum.bind(this);
        this.renderArtists = this.renderArtists.bind(this);
    }

    componentWillMount() {
        this._fetchData();
    }

    _fetchData() {
        request.get('/api/v2/banner/get').then(res => {
            // console.log(res);
            if(res.code == 200){
                this.setState({
                    banners:res.banners,
                    hasBanner:true,
                })
            }else{
                Toast.showShortCenter("获取数据失败，请重试");
            }
        })
        // 新碟上架
        request.post('/api/album/new', {'area': 'ALL', 'offset': 0, 'limit': '6', 'total': true}).then(res => {
            if(res.code == 200){
                this.setState({
                    newAlbum:res.albums,
                    hasNewAlbum:true
                })
            }else{
                Toast.showShortCenter("获取数据失败，请重试");
            }
        })
        // 热门歌手
        request.post('/api/artist/top', {'offset': 0, 'limit': '6', 'total': true}).then(res => {
            // console.log(res);
            if(res.code == 200){
                this.setState({
                    artists:res.artists,
                    hasArtists:true
                })
            }else{
                Toast.showShortCenter("获取数据失败，请重试");
            }
        })

    }
    renderSwiper(){
        return(
            <Swiper showsButtons={false} style={styles.wrapper} height={150} width={width} paginationStyle={{bottom: 10}}   >
                {this.state.banners.map((ele,i)=>{
                    return(
                        <View key={i}>
                            <Image source={{uri:ele.pic}} style={{height: 150}}/>
                        </View>
                    )
                })}
            </Swiper>
        )
    }
    renderNewAlbum(){
        // console.log(this)
        return(
            <View style={styles.album}>
                {this.state.newAlbum.map((ele,i)=>{
                    return(
                        <TouchableOpacity key={i} style={styles.albumBox}  activeOpacity={0.9} onPress={() => {
                            this.props.navigator.push({
                                name: '新碟上架',
                                component: Album,
                                passProps:{
                                    id:ele.id,
                                    name:ele.name
                                }
                            })
                        }}>
                            <Image source={{uri:ele.picUrl}} style={styles.albumPic}/>
                            <Text style={styles.colorAlbumText1} numberOfLines={1}>{ele.name}</Text>
                            <Text style={styles.colorAlbumText2} numberOfLines={1}>{ele.artist.name}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    renderArtists(){
        return(
            <View style={styles.album}>
                {this.state.artists.map((ele,i)=>{
                    return(
                        <TouchableOpacity key={i} style={styles.artistsBox} activeOpacity={0.9} onPress={() => {
                            this.props.navigator.push({
                                name: '新碟上架',
                                component: ArtistsList,
                                passProps:{
                                    artistName:ele.name,
                                }
                            })
                        }}>
                            <Image source={{uri:ele.picUrl}} style={styles.artistsPic}/>
                            <View style={styles.artistsView}>
                                <Text style={styles.artistsText} numberOfLines={1}>{ele.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }
    render() {
        return (
            <ScrollView style={styles.musicView}>
                <View style={styles.searchBox}>
                    <TouchableOpacity style={styles.inputBg} activeOpacity={0.9} onPress={() => {
                        this.props.navigator.push({
                            name: '音乐搜索页',
                            component: MusicSearch
                        })
                    }}>
                        <Icon name="ios-search-outline" color="#fff" size={22} style={{marginHorizontal: 10}}/>
                        <Text style={{color: '#fff'}}>{this.state.value}</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.hasBanner && this.state.hasArtists && this.state.hasNewAlbum ?
                    <View>
                        {this.renderSwiper()}
                        <View style={styles.title}>
                            <Text style={styles.titleText}>新碟上架</Text>
                        </View>
                        {this.renderNewAlbum()}
                        <View style={styles.title}>
                            <Text style={styles.titleText}>热门歌手</Text>
                        </View>
                        {this.renderArtists()}
                    </View> :
                    <LoadingView loadingText="加载数据中..."/>
                }
            </ScrollView>
        )
    }
}
import LoadingView from '../../common/LoadingView';
import ArtistsList from './ArtistsList';
import MusicSearch from './MusicSearch';
import Album from './Album';

const styles = StyleSheet.create({
    musicView: {
        backgroundColor: "#fff",
        flex: 1,
    },
    inputView: {
        height: 36,
    },
    searchBox:{
        padding:5,
        backgroundColor:'#3c9'
    },
    input: {
        backgroundColor: "#279c75",
        height: 36,
        color: '#fff',
        flex: 1,
    },
    inputBg: {
        backgroundColor: "#279c75",
        height: 36,
        flexDirection: 'row',
        alignItems: 'center',
    },
    wrapper: {
        paddingHorizontal: 10,
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    title: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16
    },
    album: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 0,
        paddingVertical: 5,
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
    albumBox: {
        width: width / 3 - 2,
        height: width / 3 - 2 + 50,
    },
    albumPic: {
        width: width / 3 - 2,
        height: width / 3 - 2,
        alignItems: 'center'
    },
    colorAlbumText1: {
        fontSize: 12,
        alignItems: 'center',
        paddingLeft: 4,
        paddingTop: 3,
    },
    colorAlbumText2: {
        fontSize: 12,
        alignItems: 'center',
        color: '#999',
        paddingLeft: 4,
    },
    artistsBox: {
        width: width / 2 - 1.5,
        height: width / 2 - 1.5,
        position: 'relative',
        marginBottom: 3,
    },
    artistsPic: {
        width: width / 2 - 1.5,
        height: width / 2 - 1.5,
        alignItems: 'center'
    },
    artistsText: {
        height: 36,
        textAlign: "center",
        paddingTop: 8,
        color: '#fff',
        fontSize: 12,
    },
    artistsView: {
        position: "absolute",
        bottom: 0, left: 0,
        height: 36,
        backgroundColor: 'rgba(0,0,0,.6)',
        width: '100%'
    }
})

