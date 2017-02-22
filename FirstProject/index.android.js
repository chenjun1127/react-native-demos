/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Created by jone-chen on 2017/2/22.
 */

import React, {Component} from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,TextInput,ScrollView,ListView,Navigator,Animated} from 'react-native';
const pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};
// 父组件
export default class FirstProject extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Greeting name="Jone"/>
                <Text style={styles.welcome}>
                    This ia my first React-native App!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Text style={styles.instructions}>
                    {this.props.title}
                </Text>
                <Image source={pic} style={{width: 193, height: 110}}/>
            </View>
        );
    }
}
// 子组件
class Greeting extends Component {
    render() {
        return (
            <Text style={{fontSize:24}}>
                Hello,{this.props.name}
            </Text>
        )
    }
}
// flexBox布局组件
class FlexDimensionsBasics extends Component {
    render() {
        return (
            // 试试去掉父View中的`flex: 1`。
            // 则父View不再具有尺寸，因此子组件也无法再撑开。
            // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
            <View style={{flex: 1,flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
                <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}}/>
                <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}}/>
            </View>
        );
    }
}
// 状态
class Blink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: false
        };
        // 每1000毫秒对showText状态做一次取反操作
        setInterval(() => {
            this.setState({
                showText: !this.state.showText
            })
        }, 1000)
    };

    render() {
        let display = this.state.showText ? this.props.text : "";
        return (
            <Text style={{fontSize:24}}>{display}</Text>
        )
    }
}
class BlinkApp extends Component {
    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <Blink text="Hello,my name is jone!"/>
            </View>
        )
    }
}
// 处理文本输入TextInput
class PizzaTranslator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View>
                <TextInput style={{padding:5,height:60, borderColor: 'gray', borderWidth: 1}} placeholder="Type here to translate!" onChangeText={(text)=>{this.setState({text:text})}}/>
                <Text style={{padding:10,fontSize:30,color:'red'}}>
                    {this.state.text.split(' ').map((word) => word && "❤").join(' ')}
                </Text>
            </View>
        )
    }
}
// ScrollView--通用的可滚动的容器,默认为纵向
import MyScrollView from './js/MyScrollView';
class myScrollView extends Component {
    render() {
        return (
            <MyScrollView/>
        )
    }
}
// ListView --垂直的滚动列表
class ListViewBasics extends Component {
    constructor(props) {
        super(props)
        const peoples = ['John', 'Joel', 'James', 'Jimmy', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'Jack', 'Jone', 'Lucy', 'Eric', 'LiLei', 'Jason', 'Tomas'];
        const ds = new ListView.DataSource({
                rowHasChanged: function(r1, r2) {
                    return r1 !== r2
                }
            })
            // const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(peoples)
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView dataSource={this.state.dataSource} renderRow={(rowData)=> <Text style={styles.listView}>{rowData}</Text>}/>
            </View>
        )
    }

}
// 使用Navigator
import MyScene from './js/MyScene'
class SimpleNavigator extends Component {
    render() {
        return ( < Navigator initialRoute = {
                {
                    title: 'My Initial Scene',
                    index: 0
                }
            }
            sceneStyle = {
                {
                    backgroundColor: '#f90',
                    padding: 0
                }
            }
            renderScene = {
                (route, navigator) => {
                    return <MyScene title = {
                        route.title
                    }
                    onForward = {
                        () => {
                            const nextIndex = route.index + 1;
                            navigator.push({
                                title: 'Scene ' + nextIndex,
                                index: nextIndex
                            });
                        }
                    }
                    onBack = {
                        () => {
                            if (route.index > 0) {
                                navigator.pop();
                            }
                        }
                    }
                    />
                }
            }
            />
        )
    }
}
// 动画
class AnimatedBasic extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            bounceValue: new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                <Animated.Image source={pic} style={{width:191,height:110,transform:[
                {
                    scale:this.state.bounceValue
                }
            ]}}/>
            </View>

        )
    }
    componentDidMount() {
        this.state.bounceValue.setValue(1.5);
        Animated.spring(this.state.bounceValue, {
            toValue: 1,
            friction: 1
        }).start();
    }

}
import MyAnimatedBasic from './js/MyAnimatedBasic'
class myAnimatedBasic extends Component {
    render() {
        return (
            <MyAnimatedBasic/>
        )
    }
}
import MyAnimatedComplex from './js/MyAnimatedComplex'
class myAnimatedComplex extends Component {
    render() {
        return (
            <MyAnimatedComplex/>
        )
    }
}
// 组合动画
import MyAnimatedParallel from './js/MyAnimatedParallel'
class myAnimatedParallel extends Component {
    render() {
        return (
            <MyAnimatedParallel/>
        )
    }
}
//电影列表
import Movie from './js/Movie'
class movie extends Component {
    render() {
        return (
            <Movie/>
        )
    }
}
// 按钮组件
import MyButton from './js/MyButton'
class button extends Component {
    render() {
        return (
            <MyButton/>
        )
    }
}
// 日历组件
import DatePickerForAndroid from './js/DatePickerForAndroid'
class datePickerForAndroid extends Component {
    render() {
        return (
            <DatePickerForAndroid/>
        )
    }
}
// KeyboardAvoidingView组件
import KeyboardAvoidingView from './js/KeyboardAvoidingView'
class keyboardAvoidingView extends Component {
    render() {
        return (
            <KeyboardAvoidingView/>
        )
    }
}
// MyModal组件
import MyModal from './js/MyModal'
class myModal extends Component {
    render() {
        return (
            <MyModal/>
        )
    }
}

// SimpleViewNavigator
import SimpleViewNavigator_1 from './js/SimpleViewNavigator_1'
class simpleViewNavigator_1 extends Component {
    render() {
        return (
            <SimpleViewNavigator_1/>
        )
    }
}
// SimpleViewNavigator
import SimpleViewNavigator_2 from './js/SimpleViewNavigator_2'
class simpleViewNavigator_2 extends Component {
    render() {
        return (
            <SimpleViewNavigator_2/>
        )
    }
}
// 自定义SimpleViewNavigator
const backIcon = require('./img/arrow_left.png')
import NavigationBar from './common/NavBarCommon'
class navigationBar extends Component {
    render() {
        return (
            <NavigationBar title={'首页'} leftImage={ backIcon }  rightTitle="设置" leftAction={()=>{alert('a')}} rightAction={()=>{alert(this)}}/>
        )
    }
}
// RefreshControl
import RefreshControlExample from './js/MyRefreshControl';
class myRefreshControl extends Component {
    render() {
        return (
            <RefreshControlExample/>
        )
    }
}
// Slider
import SimpleSlider from './js/SimpleSlider';
class simpleSlider extends Component {
    render() {
        return (
            <SimpleSlider/>
        )
    }
}
// WebView
import SimpleWebView from './js/SimpleWebView';
class simpleWebView extends Component {
    render() {
        return (
            <SimpleWebView/>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    listView: {
        marginHorizontal: 10,
        paddingVertical: 10,
    }
});


AppRegistry.registerComponent('FirstProject', () => FirstProject);