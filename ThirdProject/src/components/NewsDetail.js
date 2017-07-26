/**
 * Created by 0easy-23 on 2017/7/21.
 */
import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import NavigatorHeader from '../common/NavigatorHeader';
import HTMLView  from 'react-native-html2native';
const {width, height} = Dimensions.get('window');
export default class extends Component {
    render() {
        return (
            <View style={styles.bg}>
                <NavigatorHeader title={this.props.chanel} routeIndex={1} leftAction={() => this.props.navigator.pop()}/>
                <ScrollView >
                    <View style={styles.container}>
                        <Text style={styles.title}>{this.props.content.title}</Text>
                        <Text style={styles.subTitle}>来源：{this.props.content.src} <Text style={styles.time}>{this.props.content.time}</Text></Text>
                        {this.props.content.pic ? <Image source={{uri: this.props.content.pic}} style={styles.img}/> : null}
                        <HTMLView value={this.props.content.content} stylesheet={css}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    bg: {
        backgroundColor: '#fff',
        flex: 1,
    },
    container: {
        padding: 10,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        paddingBottom: 10,
        color: '#333',
        lineHeight: 30,
    },
    subTitle: {
        textAlign: 'center'
    },
    img: {
        width: width - 20,
        height: 180,
        marginVertical: 10,
    }
})

const css = StyleSheet.create({
    p: {
        lineHeight: 24,
        color: '#666',
    }
})