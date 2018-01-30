/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './src/components/Home';
import ProfileScreen from './src/components/Profile';

const Routes = StackNavigator({
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
});

export default class App extends Component<{}> {
    render() {
        return (
            <Routes/>
        );
    }
}
