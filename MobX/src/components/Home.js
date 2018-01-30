/**
 * Created by 0easy-23 on 2018/1/29
 */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../style/Styles'
import MobXTest from './MobXTest';
import UserOrder from '../MobX/UserOrder';
import {observer} from "mobx-react";

@observer
class HomeScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return (
            {
                title: 'Mobx-Demo',
                headerStyle: {
                    backgroundColor: '#3c9',
                },
                headerTintColor: '#fff',
                headerRight: (
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', {user: navigation.state.params.userName})}>
                        <Text style={{color: '#fff', fontSize: 18}}>Next</Text>
                    </TouchableOpacity>
                ),
            }
        )
    };

    constructor(props) {
        super(props);
        this.userOrder = new UserOrder();
    }

    componentDidMount() {
        this.props.navigation.setParams({userName: this.userOrder.name})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line}>
                    <Text>父组件：{this.userOrder.name} -- {this.userOrder.amount} -- {this.userOrder.total}</Text>
                </View>
                <MobXTest userOrder={this.userOrder} {...this.props}/>
            </View>
        );
    }
}


export default HomeScreen;