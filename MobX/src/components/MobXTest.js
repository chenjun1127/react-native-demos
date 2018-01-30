/**
 * Created by 0easy-23 on 2018/1/29
 */
import React, {Component} from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import {observer} from "mobx-react";
import styles from "../style/Styles";


@observer
export default class MobXTest extends Component {
    constructor(props) {
        super(props);
        this.onPressPrice = this.onPressPrice.bind(this);
        this.onPressUpdate = this.onPressUpdate.bind(this);
    }

    render() {
        const {price, amount, total, name} = this.props.userOrder;
        return (
            <View style={styles.inner}>
                <Text>Price: {price}</Text>
                <Text>Amount: {amount}</Text>
                <Text>Total: {total}</Text>
                <Text>UserName: {name}</Text>
                <TouchableOpacity style={styles.btn} onPress={this.onPressPrice}>
                    <Text style={{color: '#fff', fontSize: 18}}>计算价格</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={this.onPressUpdate}>
                    <Text style={{color: '#fff', fontSize: 18}}>更新用户</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onPressPrice() {
        this.props.userOrder.increment();
    }

    onPressUpdate() {
        this.props.userOrder.updateName('Jack');
        this.props.navigation.setParams({userName: this.props.userOrder.name});
    }
}