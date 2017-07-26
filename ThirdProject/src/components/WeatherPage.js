/**
 * Created by 0easy-23 on 2017/3/28.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, Dimensions,RefreshControl} from 'react-native';
const {width, height} = Dimensions.get("window");
import Toast from 'react-native-toast'
import LoadingView from '../common/LoadingView';
import moment from 'moment';
import zhcn from 'moment/locale/zh-cn';
moment.locale('zh-cn', zhcn);
// console.log(moment.locale())
// console.log(moment('2010-10-20'))
export default class  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            loaded: false,
            position: 'unknown',
            lastPosition: 'unknown',
            havaData: false,
            isRefreshing:false,
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.request = this.request.bind(this);
        this.getData = this.getData.bind(this);
        this.getGeolocation = this.getGeolocation.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    componentDidMount() {
        this.getGeolocation();

    }

    getGeolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({position, loaded: true,isRefreshing: false});
            if (this.state.loaded) {
                this.getData();
            }
        }, (error) => {
            Toast.showShortCenter("获取位置失败，请重试");
            this.setState({isRefreshing: false})
        }, {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000});
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({position: lastPosition,isRefreshing: false});
        });
    }

    request(url) {
        return fetch(url).then((res) => res.json()).catch((error) => ({error}));
    }


    getData() {
        let BAIDU_URL = 'http://api.map.baidu.com/geocoder/v2/?output=json&location=';
        let BAIDU_AK = "00696cfe878e5d8d5b737a2a9713d8f8";
        let QQ_KEY = 'LJZBZ-2CQK6-4ILSS-MGBUZ-QGQB7-WCB5J';
        let QQ_URL = 'http://apis.map.qq.com/ws/geocoder/v1/?location=';
        let latitude = this.state.position.coords.latitude;
        let longitude = this.state.position.coords.longitude;
        let apiURL = BAIDU_URL + latitude + "," + longitude + "&ak=" + BAIDU_AK;
        this.request(apiURL).then((resData) => {
            console.log(resData)
            this.setState({city: resData.result.addressComponent});
            let url = `https://way.jd.com/jisuapi/weather?city=${this.state.city.city}&appkey=ac130be3592a68fa7266569081c0c75e`;
            this.request(url).then((resData) => {
                console.log("weatherData:", resData);
                if ((resData.code == 10000) && resData.result.msg == 'ok') {
                    this.setState({
                        WeatherData: resData.result.result,
                        havaData: true,
                    })
                } else {
                    Toast.showShortCenter("获取数据失败，请重试");
                }
            })
        })

    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onChangeText(text) {
        this.setState({city: text})
    }
    _onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(()=>{
            this.getGeolocation();
            console.log('下拉刷新了')
            // this.setState({isRefreshing: false});
        },1000);
    }
    render() {
        if (this.state.havaData) {
            let dailyList = this.state.WeatherData.daily;
            let indexList = this.state.WeatherData.index;
            for (var i = 0; i < dailyList.length; i++) {
                dailyList[i].index = indexList[i];
            }
            const daily = dailyList.map((ele, i) => {
                return (
                    <View key={i} style={ i == 0 ? styles.viewListFirst : styles.viewList}>
                        <View style={styles.leftWidth}>
                            <Text style={styles.color}>{ele.week} </Text>
                            <Image source={{uri: `http://otc043t55.bkt.clouddn.com/${ele.day.img}.png`}} resizeMode="contain" style={styles.weatherIcon}/>
                            <Text style={styles.color}>{ele.night.templow} - <Text style={styles.color}>{ele.day.temphigh}</Text>℃</Text>
                            <Text style={styles.color}>{ele.day.weather}</Text>
                            <Text style={styles.color}>{ele.day.winddirect}<Text style={styles.color}>{ele.day.windpower}</Text></Text>
                        </View>
                        <View style={styles.rightWidth}>
                            <Text style={[styles.color, {paddingBottom: 10}]}>相关指数：</Text>
                            <Text style={styles.color}>{ele.index.detail}</Text>
                            <Text style={styles.color}>{ele.index.iname}：<Text style={styles.color}>{ele.index.ivalue || ele.index.index}</Text></Text>
                            <Text style={[styles.color, {paddingTop: 10}]}>{moment(ele.date).format('MM月DD日')}</Text>
                        </View>
                    </View>
                )
            })

            return (
                <Image style={styles.bgImg} source={{uri: 'http://tianqitong.sina.cn/img/bg1.jpg'}}>
                    <ScrollView style={styles.container} refreshControl={<RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="Loading..."
                        titleColor="#00ff00"
                        colors={['#fff']}
                        progressBackgroundColor="#3c9"
                    />}>
                        <View style={styles.titleList}>
                            <Text style={styles.title}>{this.state.city.city}</Text>
                            <Text style={styles.color}>{this.state.WeatherData.week}  </Text>
                            <Text style={styles.color}>{this.state.WeatherData.date}</Text>
                            <View style={styles.updateTime}>
                                <Text style={[styles.color, {textAlign: 'right'}]}>最后更新</Text>
                                <Text style={[styles.color, {textAlign: 'right'}]}>{moment(this.state.WeatherData.updatetime).fromNow()}</Text>
                            </View>
                            <View style={styles.quality}>
                                <Text style={[styles.color, {textAlign: 'right'}]}>空气质量</Text>
                                <Text style={[styles.color, {textAlign: 'left'}]}>{this.state.WeatherData.aqi.aqi}{this.state.WeatherData.aqi.quality}</Text>
                            </View>
                        </View>
                        <View style={styles.bigTemp}>
                            <Text style={styles.mainTemp}>{this.state.WeatherData.temp}</Text>
                            <Text style={styles.tempDeg}></Text>
                            <Text style={styles.weatherText}>{this.state.WeatherData.weather}</Text>
                        </View>
                        <Text style={styles.publicTitle}>未来7天天气预报</Text>
                        <ScrollView horizontal={false} style={styles.scrollView}>
                            {daily}
                        </ScrollView>
                    </ScrollView>
                </Image>
            )
        } else {
            return (
                <LoadingView loadingText="正在获取位置，加载数据中..."/>
            )
        }
    }
}


const styles = StyleSheet.create({
    bgImg: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 10,
        paddingBottom: 0,
    },
    updateTime: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 10,
        paddingTop: 15,
    },
    quality: {
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 10,
        paddingTop: 15,
    },
    titleList: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    titleTime: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    leftWidth: {
        width: width / 3,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#f3f3f3',
        paddingVertical: 10,
    },
    rightWidth: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    indexTitle: {
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    publicTitle: {
        color: '#fff',
        padding: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    viewList: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        paddingHorizontal: 0,
        paddingVertical: 10,
    },
    bigTemp: {
        flexDirection: 'row',
        position: 'relative',
        justifyContent: 'center',
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginVertical: 10,
    },
    color: {
        color: '#fff',
    },
    mainTemp: {
        fontSize: 100,
        color: '#fff',
    },
    viewListFirst: {
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        paddingHorizontal: 0,
        paddingVertical: 10,
    },
    update: {
        color: '#fff',
    },
    indexList: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#fff',
        padding: 10,
    },
    scrollView: {
        backgroundColor: 'rgba(0,0,0,.3)'
    },
    tempDeg: {
        borderRadius: 7,
        width: 14,
        height: 14,
        borderColor: '#fff',
        borderWidth: 2,
        marginTop: 36,
        paddingLeft: 7
    },
    weatherText: {
        color: '#fff',
        marginTop: 73,
        fontSize: 26
    }
})