/**
 * Created by 0easy-23 on 2017/2/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
    Text,
    Navigator
} from 'react-native';

const {width, height} = Dimensions.get('window');
const url = "http://www.baidu.com";
export default class SimpleWebView extends Component{
    render(){
        return(
            <Navigator initialRoute={{component: FirstPage}} renderScene={this.renderScene} configureScene={this.configureScene} />
        )
    }
    configureScene(route,routeStack){
        return Navigator.SceneConfigs.FloatFromRight;
    }
    renderScene(route,navigator){
        console.log(route,navigator)
        return <route.component navigator={navigator} {...route.passProps} />
    }
}
class MyWebView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Text style={[styles.text,{backgroundColor:'#fff',color:'#666',textAlign:'left'}]} onPress={()=>this.props.navigator.pop()}>返回</Text>
                    <View style={{ flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Text>{this.props.name}:{url}</Text>
                    </View>
                </View>
                <WebView style={styles.webView}
                     source={{uri:url}}
                     javaScriptEnabled={true}
                     domStorageEnabled={true}
                     scalesPageToFit={false}
                />
            </View>
        )
    }
}
class FirstPage extends Component{
    static defaultProps = {
        title: '简单的WebView',
    }
    constructor(props){
        super(props)
        this.click=this.click.bind(this)
    }
    click(name) {
        console.log('click')
        this.props.navigator.push({
            component: MyWebView,
            passProps:{
                name:name
            }
        })
    }
    render(){
        return(
            <Text style={styles.text} onPress={()=>{this.click('WebView')}}>
                {this.props.title}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: '#ff6530',
        color: '#fff',
        padding: 15,
        textAlign: 'center'
    },
    container: {
        flex: 1,
    },
    webView: {
        width: width ,
        height: height ,
    },
    navBar:{
        flexDirection:'row',
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'#000',
    }
})