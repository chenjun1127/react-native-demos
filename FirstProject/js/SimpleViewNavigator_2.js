import React, {Component} from 'react';
import {View, Navigator, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';

export default class SimpleViewNavigator_2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
        }
    }

    componentDidMount() {
        this.setState({
            id: this.state.id + 1,
        })
    }

    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom;
        }
        return Navigator.SceneConfigs.PushFromRight;
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps}/>
    }

    render() {
        return (
            <Navigator style={{flex:1}} initialRoute={{name:'FistPage',component:FirstPage ,index:this.state.id}}
                       configureScene={this.configureScene} renderScene={this.renderScene} navigationBar={
          <Navigator.NavigationBar
            style={styles.heading}
            routeMapper={NavigationBarRouteMapper}/>} sceneStyle={{paddingTop: (Platform.OS === 'Android' ? 66 : 74)}}/>
        )
    }


}
var NavigationBarRouteMapper = {
    // 左键
    LeftButton(route, navigator, index, nvaState){
        if (index > 0) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        underlayColor='transparent'
                        onPress={() => {if (index > 0) {navigator.pop()}}}>
                        <Text style={styles.leftNavButtonText}>
                            返回
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null;
        }
    },
    // 右键
    RightButton(route, navigator, index, navState){
        if (route.onPress) {
            return (
                <View style={styles.navContainer}>
                    <TouchableOpacity
                        onPress={() =>  route.onPress()}>
                        <Text style={styles.rightNavButtonText}>
                            {route.rightText || '右键'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    },
    // 标题
    Title(route, navigator, index, navState) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ color: 'white', margin: 10, fontSize: 18 }}>
                    This is app
                </Text>
            </View>
        );
    }
}
/**
 * 第一页
 */
class FirstPage extends Component {
    onPress() {
        alert("我是Spike!");
    }

    toNext(name, type = 'normal') {
        console.log(this)
        this.props.navigator.push({
            component: SecondPage,
            passProps: {
                name: name
            },
            type: type,
            onPress: this.onPress,
            rightText: 'ALERT!',
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.toNext('第一页')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.toNext('第一页', 'Bottom')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页(底部)'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
/**
 * 第二页
 */
class SecondPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.pop()}>
                    <Text style={styles.buttonText}>
                        返回上一页, 来源: {this.props.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        backgroundColor: '#3c6',
    },
    // 导航栏
    navContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // 导航栏文字
    headText: {
        color: '#333',
        fontSize: 22
    },
    // 按钮
    button: {
        height: 60,
        marginBottom: 10,
        backgroundColor: '#f16500',
        justifyContent: 'center', // 内容居中显示
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18
    }, // 左面导航按钮
    leftNavButtonText: {
        fontSize: 18,
        marginLeft: 0,
        color: '#fff',
    },
    // 右面导航按钮
    rightNavButtonText: {
        color: '#fff',
        fontSize: 18,
        marginRight: 0
    },
    // 标题
    title: {
        fontSize: 18,
        color: 'white'        //Step 3
    }
});