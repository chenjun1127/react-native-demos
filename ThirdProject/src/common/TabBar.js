/**
 * Created by 0easy-23 on 2017/3/21.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class extends Component{
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
        initColor:React.PropTypes.string,
        activeColor:React.PropTypes.string,
    }

    setAnimationValue({value}) {
        //console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? this.props.activeColor : this.props.initColor; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity key={i} onPress={()=>this.props.goToPage(i)} style={styles.tab}>
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]} // 图标
                        size={30}
                        color={color}/>
                    <Text style={{color: color}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 70,
        backgroundColor:'#fff',
        borderTopColor:'#d9d9d9',
        borderTopWidth:StyleSheet.hairlineWidth,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});