/**
 * Created by 0easy-23 on 2018/1/29
 */
import React, {Component} from 'react';
import {Button, Text, View} from 'react-native';
import {observer} from "mobx-react";
import styles from "../style/Styles";

@observer
class ProfileScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation;
        const isInfo = state.params.mode === 'info';

        return (
            {
                title: `Profile with ${navigation.state.params.user}`,
                headerRight: <Button title={isInfo.toString()} onPress={() => setParams({mode: isInfo ? 'none' : 'info'})}/>,
                headerStyle: {
                    backgroundColor: '#3c9',
                },
                headerTintColor: '#fff',
            }
        )
    };

    render() {
        const {params} = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Text>Profile with {params.user}</Text>
                </View>
            </View>
        )
    }
}

export default ProfileScreen;