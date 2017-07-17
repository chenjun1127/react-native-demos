/**
 * Created by 0easy-23 on 2017/3/17.
 */
import React, {Component} from 'react';
import { Navigator} from 'react-native';

export default class extends Component {
    render() {
        return (
            <Navigator initialRoute={{name: 'start page', index: 0,component:TabView}} renderScene={this.renderScene} configureScene={this.configureScene}/>
        )
    }

    /**
     *  配置场景动画
     */
    configureScene(route, routeStack) {
        if (route.type == 'Bottom') {
            return Navigator.SceneConfigs.FloatFromBottom
        }
        return Navigator.SceneConfigs.FloatFromRight;
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator} {...route.passProps} />
    }
}




import TabView from './TabView';



