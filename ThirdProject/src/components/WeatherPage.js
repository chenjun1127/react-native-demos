/**
 * Created by 0easy-23 on 2017/3/28.
 */

import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Animated,
    Easing
} from 'react-native';


export default class  extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zip: '',
            loaded: false,
            weatherData: null,
            weatherDesc: null
        }
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
    }

    render() {
        if (this.state.weatherData !== null) {
            var weatherInfoDetail = this.state.weatherData.map((ele, index) => {
                if (index == 0) {
                    return <TextInfoFirst key={index} date={ele.date} temp={ele.temperature} weather={ele.weather} wind={ele.wind}/>
                } else {
                    return <TextInfo key={index} picDay={ele.dayPictureUrl} picNight={ele.nightPictureUrl} date={ele.date} temp={ele.temperature} weather={ele.weather}
                                     wind={ele.wind}/>
                }
            })
        }
        if (this.state.weatherDesc !== null) {
            var weatherInfoDesc = this.state.weatherDesc.map((ele, index) => {
                return <TextDesc key={index} title={ele.title} zs={ele.zs} tipt={ele.tipt} des={ele.des}/>
            })
        }
        return (
            <View style={styles.container}>

                <TextInput onChangeText={(text) => this.setState({zip: text, weatherData: null, weatherDesc: null})} onSubmitEditing={this.onSubmitEditing} style={styles.input}
                           placeholder="请输入城市名称" maxLength={10}/>
                <View>
                    <Text style={styles.welcome}>
                        当前城市： {this.state.zip}
                    </Text>
                    {!this.state.loaded
                        ? null
                        : <LoadingView/>}

                    <ScrollView horizontal={true} style={styles.scrollView}>
                        {weatherInfoDetail}
                    </ScrollView>
                    <ScrollView >
                        {weatherInfoDesc}
                    </ScrollView>
                </View>

            </View>
        )

    }

    onSubmitEditing(event) {
        //console.log(event.nativeEvent.text);
        var zip = event.nativeEvent.text
        this.setState({
            zip: zip,
            loaded: true
        });
        let url = `http://api.map.baidu.com/telematics/v3/weather?location=${zip}&output=json&ak=00696cfe878e5d8d5b737a2a9713d8f8`
        let URL1 = `http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=${zip}`

        fetch(url).then((res) => res.json()).then((resJson) => {
            //console.log(resJson)
            var description = resJson.results[0].index;
            var weatherInfo = resJson.results[0].weather_data;
            this.setState({
                weatherData: weatherInfo,
                weatherDesc: description,
                loaded: false
            })
        }).catch((error) => {
            console.warn(error);
        })

    }
}

class TextInfo extends Component {
    render() {
        return (
            <View style={styles.TextInfo}>
                <Text style={styles.text}>
                    {this.props.date}
                </Text>
                <Text style={styles.text}>
                    {this.props.temp}
                </Text>
                <View style={styles.imgView}>
                    <Image source={{
                        uri: this.props.picDay
                    }} style={styles.imgTb}/>
                </View>
                <View style={styles.imgView}>
                    <Image source={{
                        uri: this.props.picNight
                    }} style={styles.imgTb}/>
                </View>
                <Text style={styles.text}>
                    {this.props.weather}
                </Text>
                <Text style={styles.text}>
                    {this.props.wind}
                </Text>
            </View>
        )
    }
}

class TextInfoFirst extends Component {
    render() {
        return (
            <View style={styles.TextInfo}>
                <Text style={styles.text}>
                    {this.props.date}
                </Text>
                <Text style={styles.text}>
                    {this.props.temp}
                </Text>
                <Text style={styles.text}>
                    {this.props.weather}
                </Text>
                <Text style={styles.text}>
                    {this.props.wind}
                </Text>
            </View>
        )
    }
}
class TextDesc extends Component {
    render() {
        return (
            <View style={styles.textDesc}>
                <View style={styles.textDescView}>
                    <Text style={styles.textlistLeft}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.textlistRight}>
                        {this.props.zs}
                    </Text>
                </View>
                <View style={styles.textDescView}>
                    <Text style={styles.textlistLeft}>
                        {this.props.tipt}
                    </Text>
                    <Text style={styles.textlistRight}>
                        {this.props.des}
                    </Text>
                </View>
            </View>
        )
    }
}
import LoadingView from '../common/LoadingView';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    scrollView: {
        height: 190
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        height: 40
    },
    welcome: {
        paddingVertical: 8,
        textAlign: 'center'
    },
    TextInfo: {
        width: 100,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderLeftColor: '#666'
    },
    text: {
        lineHeight: 22,
        textAlign: 'center'
    },
    textDescView: {
        paddingVertical: 10,
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center'
    },
    textlist: {
        backgroundColor: 'gray',
        paddingVertical: 10,
        flex: 1
    },
    textlistLeft: {
        flex: 1
    },
    textlistRight: {
        flex: 3,
        lineHeight: 22
    },
    imgTb: {
        width: 42,
        height: 30,
        borderRadius: 10,
        marginVertical: 3
    },
    imgView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})