/**
 * Created by 0easy-23 on 2017/3/23.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet,Animated,Easing,Image,TouchableOpacity,Dimensions,Slider} from 'react-native';
import Control from './ControlPlayer'
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
export default class  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: new Animated.Value(0),
            playing: true,
            currentTime:0,
            currentIndex:this.props.songIndex, //当前音乐索引
            SongList:this.props.songArrList,// 当前音乐列表
        }
        this.playAction = this.playAction.bind(this)
        this.prevAction = this.prevAction.bind(this)
        this.nextAction = this.nextAction.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.onProgress = this.onProgress.bind(this)
        this.timer = null;
        this.toValue = 1;
        this.speed = 50;
    }

    componentDidMount() {
        this.timing()
    }

    AnimateRotate() {
        // this.state.value.setValue(0)
        Animated.timing(this.state.value, {
            toValue: this.toValue,
            easing: Easing.linear
        }).start()
        if (this.toValue == this.state.SongList[this.state.currentIndex].duration) {
            this.state.value.setValue(0)
            this.toValue = 0
        } else {
            this.toValue++
        }
    }

    // 播放暂停
    playAction() {
        this.setState({
            playing: !this.state.playing
        })
        if (this.state.playing) {
            clearInterval(this.timer)
        } else {
            this.timing()
        }
    }

    // 上一首
    prevAction(index){
        this.setState({
            currentIndex:index == 0 ? this.state.SongList.length - 1 : index - 1
        })
        this.video.seek(0)
    }

    // 下一首
    nextAction(index){
        // console.log(this)
        this.setState({
            currentIndex:index == this.state.SongList.length - 1 ? 0 : index + 1
        })
        this.video.seek(0)
    }

    timing() {
        this.timer = setInterval(() => {
            this.AnimateRotate()
        }, this.speed)
    }

    componentWillUnMount() {
        this.timer && clearInterval(this.timer)
    }

    formatTime(timeTemp) {
        let m = Math.floor(timeTemp  / 60);
        let s = Math.floor(timeTemp % 60);
        let time = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
        return time
    }

    onLoad(e){
        //console.log(e.duration)
        this.setState({
            duration:e.duration,
        })
    }

    onProgress(e){
        let val = parseInt(e.currentTime)
        const currentSong = this.state.SongList[this.state.currentIndex]
        this.setState({
            currentTime:e.currentTime,
            sliderValue:val
        })
        // console.log('250ms:',e.currentTime,this.state.currentTime,parseInt(currentSong.duration / 1000))
        // 播放完毕，进行下一曲
        if (e.currentTime >= parseInt(currentSong.duration / 1000)) {
            this.nextAction(parseInt(this.state.currentIndex))
        }

    }

    render() {
        // console.log(this)
        const animateRotate = this.state.value.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '1deg']
        })
        var currentSong = this.state.SongList[this.state.currentIndex]
        return (
            <Image style={styles.musicBg} source={{uri:currentSong.album.picUrl}}>
                <View style={styles.mask}>
                    <TouchableOpacity onPress={()=>this.props.navigator.pop()} style={styles.backIcon}>
                        <Icon name="ios-arrow-back" size={32} color="#fff"/>
                    </TouchableOpacity>
                    <View style ={{justifyContent: 'center', alignItems: 'center', flex:1}}>
                        {/*旋转唱片*/}
                        <Animated.Image style ={[{transform: [{rotateZ: animateRotate}]},styles.albumPic]}  source={{uri:currentSong.album.picUrl}}>
                        </Animated.Image>
                        {/*控制按钮*/}
                        <Control style={styles.control} prevAction={()=>{this.prevAction(parseInt(this.state.currentIndex))}} nextAction={()=>{this.nextAction(parseInt(this.state.currentIndex))}} playing={this.state.playing} playAction={this.playAction}/>
                        {/*视频组件*/}
                        <Video
                            ref={(c) => this.video = c}
                            source={{uri: currentSong.mp3Url}}  // 视频的URL地址，或者本地地址，都可以.{/*this.props.songSrc*/}
                            rate={1.0}                          // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
                            volume={1.0}                        // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                            muted={false}                       // true代表静音，默认为false.
                            paused={!this.state.playing}        // true代表暂停，默认为false
                            onLoad={this.onLoad}                // 当视频加载完毕时的回调函数
                            onProgress={this.onProgress}        // 进度控制，每250ms调用一次，以获取视频播放的进度
                            style={styles.backgroundVideo}
                        />


                        {/*进度条及时间*/}
                        <View style={styles.progress}>
                            <Text style={{color:'#fff'}}>{this.formatTime(this.state.currentTime)}</Text>
                            <Slider
                                style={styles.progressBg}
                                value={this.state.sliderValue}
                                step={1}
                                thumbTintColor="#3c9"
                                maximumValue={parseInt(currentSong.duration / 1000)}
                                minimumTrackTintColor='#FFDB42'
                                maximumTrackTintColor="#3c9"
                                onValueChange={(value) => {
                                    this.setState({
                                        currentTime: value
                                    })
                                    this.video.seek(value)
                                }}
                            />
                            <Text style={{color:'#fff',textAlign:'right'}}>{this.formatTime(currentSong.duration/1000)}</Text>
                        </View>
                        {/*歌曲名称及歌手*/}
                        <View style={styles.description}>
                            <Text style={{color:'#fff',fontSize:16}}>
                                {currentSong.name}
                            </Text>
                            <Text style={{color:'#fff',fontSize:12,paddingTop:3}}>
                                {'-- '+currentSong.artists[0].name+' --'}
                            </Text>
                        </View>
                    </View>

                </View>
            </Image>
        )
    }
}

const styles=StyleSheet.create({
    backIcon:{
        position:'absolute',
        left:15,
        top:18
    },
    musicBg: {
        flex:1,
    },
    mask:{
        backgroundColor:"rgba(0,0,0,.7)",
        flex:1,
    },
    albumPic:{
        width:220,
        height:220,
        borderRadius:110,
        borderWidth:4,
        borderColor:'rgba(20,20,20,.6)',
        marginBottom:60
    },
    controlButton:{
        backgroundColor:"#3c9",
        paddingVertical:10,
        borderRadius:10,
        position:'absolute',
        left:10,
        top:100,  
    },
    progress:{
        position:'absolute',
        width:Dimensions.get('window').width-20,
        alignItems:'center',
        flexDirection:'row',
        bottom:100,
    },
    progressBg:{
        flex:1,
    },
    description:{
        position:'absolute',
        top:20,
        justifyContent:'center',
        alignItems:'center',
        width:Dimensions.get('window').width,
    },
    control: {
        position: 'absolute',
        bottom: 20
    }
})