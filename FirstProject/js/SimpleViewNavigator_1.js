/**
 * Created by 0easy-23 on 2017/2/14.
 */
import React, {Component} from 'react';
import {View,Navigator,Text,StyleSheet,TouchableOpacity} from 'react-native';

export default class SimpleViewNavigator_1 extends Component{
    render(){
        return (
            <Navigator initialRoute={{component: FirstPage}} renderScene={this.renderScene} configureScene={this.configureScene} />
        )
    }

    /**
     *  配置场景动画
     */
    configureScene(route,routeStack){
        if(route.type=='Bottom'){
            return Navigator.SceneConfigs.FloatFromBottom
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }
    renderScene(route,navigator){
        console.log(route)
        return <route.component navigator={navigator} {...route.passProps} />
    }
}
class FirstPage extends Component{
    _navigate(name, type = 'Normal') {
        this.props.navigator.push({
            component: SecondPage,
            passProps: {
                name: name
            },
            type: type
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        {'第一页'}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this._navigate('你好! (来源第一页:右出)')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页(右出)'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this._navigate('你好! (来源第一页:底出)', 'Bottom')}>
                    <Text style={styles.buttonText}>
                        {'跳转至第二页(底部)'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
// 第二页, 点击跳出返回第一页
class SecondPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        第二页: {this.props.name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.pop()}>
                    <Text style={styles.buttonText}>
                        返回上一页
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.push({
                        component:ThirdPage,
                        passProps: {
                            name: '来源第三页'
                        },
                        type:'Bottom'
                    })}>
                    <Text style={styles.buttonText}>
                        进入第三页
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class ThirdPage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.heading}>
                    <Text style={styles.headText}>
                        第三页: {this.props.name}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.pop()}>
                    <Text style={styles.buttonText}>
                        返回上一页
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>this.props.navigator.popToTop()}>
                    <Text style={styles.buttonText}>
                        返回第一页
                    </Text>
                </TouchableOpacity>

            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // 导航栏
    heading: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#ff1046',
        marginBottom: 10
    },
    // 导航栏文字
    headText: {
        color: '#ffffff',
        fontSize: 20
    },
    // 按钮
    button: {
        height: 60,
        marginTop: 10,
        justifyContent: 'center', // 内容居中显示
        backgroundColor: '#eeeeee',
        alignItems: 'center'
    },
    // 按钮文字
    buttonText: {
        fontSize: 18
    }
});