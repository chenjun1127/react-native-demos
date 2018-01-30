/**
 * Created by 0easy-23 on 2018/1/30
 */
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from '../style/Styles'


class Home extends Component {
    static navigationOptions = ({navigation}) => {
        return (
            {
                title: 'Redux',
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
        this.onPressPrice = this.onPressPrice.bind(this);
        this.onPressUpdate = this.onPressUpdate.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({userName: this.props.userInfo.name})
    }

    onPressPrice() {
        this.props.musicInfoActions.add();
    }


    onPressUpdate() {
        this.props.musicInfoActions.update({name:'Jack'});
        this.props.navigation.setParams({userName: 'Jack'});
    }

    render() {
        const {price, amount, name} = this.props.userInfo;
        return (
            <View style={styles.container}>
                <View style={styles.inner}>
                    <Text>Price: {price}</Text>
                    <Text>Amount: {amount}</Text>
                    <Text>Total: {price * amount}</Text>
                    <Text>UserName: {name}</Text>
                    <TouchableOpacity style={styles.btn} onPress={this.onPressPrice}>
                        <Text style={{color: '#fff', fontSize: 18}}>计算价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.onPressUpdate}>
                        <Text style={{color: '#fff', fontSize: 18}}>更新用户</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default Home;