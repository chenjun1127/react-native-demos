/**
 * Created by 0easy-23 on 2017/2/17.
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, RefreshControl, TouchableWithoutFeedback} from 'react-native';

export default class MyRefreshControl extends Component {
    render() {
        return (
            <RefreshControlExample/>
        )
    }
}

class Row extends Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={()=>{this.props.onClick(this.props.data)}}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
class RefreshControlExample extends Component {
    static defaultProps = {
        title: '<RefreshControl>',
        description: 'Adds pull-to-refresh support to a scrollview.'
    }
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
            loaded: 0,
            rowData: Array.from(new Array(10)).map((val, i) => ({text: 'Initial row ' + i, clicks: 0}))
        }
        this._onClick = this._onClick.bind(this)
        this._onRefresh = this._onRefresh.bind(this)
    }

    _onClick(row) {
        row.clicks++;
        this.setState({
            rowData: this.state.rowData,
        });
    }

    render() {
        const rows = this.state.rowData.map((row, i) => {
            console.log(row, i)
            return <Row key={i} data={row} onClick={this._onClick}  />
        })
        return (
            <ScrollView
                style={styles.scrollview}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#ff0000"
                    title="Loading..."
                    titleColor="#00ff00"
                    colors={['#ff0000', '#00ff00', '#0000ff']}
                    progressBackgroundColor="#ffff00"
                  />
                }>
                {rows}
            </ScrollView>
        )
    }

    _onRefresh() {
        this.setState({
            isRefreshing: true
        })
        setTimeout(() => {
            const rowData = Array.from(new Array(10)).map((val, index) => {
                return {
                    text: 'Loaded row ' + (+this.state.loaded + index),
                    clicks: 0
                }

            }).concat(this.state.rowData)
            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
                rowData: rowData,
            })
        }, 5000)
    }
}


const styles = StyleSheet.create({
    row: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 20,
        backgroundColor: '#3a5795',
        margin: 5,
        marginBottom: 0
    },
    text: {
        alignSelf: 'center',
        color: '#fff',
    },
    scrollview: {
        flex: 1,
    },
});