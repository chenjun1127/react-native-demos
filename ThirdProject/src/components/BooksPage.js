/**
 * Created by 0easy-23 on 2017/3/29.
 */
import React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

let {height, width} = Dimensions.get('window');
let pageSize = 5;

export default class extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            index: 2,
            seletedAry: []
        };
    }
    componentDidMount() {
        fetch('https://api.douban.com/v2/book/search?q=react&count='+pageSize)
            .then(res=> {
                if(res.status === 200) {
                    let data = JSON.parse(res._bodyInit).books;
                    this.setState({
                        loading: false,
                        data: data,
                        dataSource: this.state.dataSource.cloneWithRows(data)
                    });
                }
            })
            .catch(err=> {
                alert(JSON.stringify(err));
            })
    }

    _renderRow(row) {
        return (
            <TouchableOpacity
                style = {styles.item}
                onLongPress = {this.delete.bind(this, row)}
                onPress = {this.choose.bind(this, row)}
            >
                <Image
                    source = {{uri: row.image}}
                    style = {{width: 85, height: 110, marginRight: 15}}
                    resizeMode = 'stretch'
                />
                <View style = {{flexDirection: 'column', width: width-150}}>
                    <Text style = {{fontSize: 16}}>{row.title}</Text>
                    <Text
                        numberOfLines = {3}
                        style = {{color: '#ccc'}}
                    >{row.summary}</Text>
                    <Text>{row.price}</Text>
                    <Text>{row.isCheck ? 'YES' : 'NO'}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    loadMore() {
        this.setState({
            loadingMore: true
        });
        //设定一个起始位置，从之前获取过的之后开始获取
        let start = (this.state.index-1)*pageSize;
        fetch(`https://api.douban.com/v2/book/search?q=react&start=${start}&count=${pageSize}`)
            .then(res=> {
                if(res.status === 200) {
                    let response = JSON.parse(res._bodyInit).books;
                    if(response.length === 0) {
                        alert('no data response');
                        return;
                    }else {
                        let oldAry = [...this.state.data];
                        let newAry = [...oldAry, ...response];
                        this.setState({
                            loading: false,
                            loadingMore: false,
                            data: newAry,
                            dataSource: this.state.dataSource.cloneWithRows(newAry),
                            index: this.state.index+1
                        });
                    }
                }
            })
            .catch(err=> {
                alert(JSON.stringify(err));
            })
    }
    _renderFooter() {
        if(this.state.loadingMore) {
            return (
                <View
                    style = {{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
                >
                    <Text>loading...</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity
                onPress = {this.loadMore.bind(this)}
                style = {{paddingVertical: 10, justifyContent: 'center', alignItems: 'center'}}
            >
                <Text>click it load more</Text>
            </TouchableOpacity>
        )
    }
    delete(row) {
        let oldAry = [...this.state.data];
        let index = oldAry.indexOf(row);
        oldAry.splice(index, 1);
        let newAry = oldAry;
        this.setState({
            data: newAry,
            dataSource: this.state.dataSource.cloneWithRows(newAry)
        });
    }
    choose(row) {
        let oldAry = [...this.state.data];
        let index = oldAry.indexOf(row);
        let newRow = Object.assign({}, row, {
            isCheck: !row.isCheck
        });
        let newAry = [
            ...oldAry.slice(0, index),
            newRow,
            ...oldAry.slice(index+1)
        ];
        let oldSelectedAry = [...this.state.seletedAry];
        let newSelectedAry = [];
        let seletedIndex = oldSelectedAry.indexOf(row);
        if(seletedIndex > -1) {
            oldSelectedAry.splice(seletedIndex, 1);
            newSelectedAry = oldSelectedAry;
        }else {
            newSelectedAry = [...oldSelectedAry, newRow];
        }
        this.setState({
            data: newAry,
            dataSource: this.state.dataSource.cloneWithRows(newAry),
            seletedAry: newSelectedAry
        });
    }
    render() {
        if(this.state.loading) {
            return (
                <View style = {styles.empty}>
                    <Text>loading...</Text>
                </View>
            )
        }
        return (
            <View style = {styles.container}>
                <Text style={styles.title}>{'已选中'+this.state.seletedAry.length+'个，共'+this.state.data.length+'个------按下选中，长按删除'}</Text>
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {this._renderRow.bind(this)}
                    //初始化首页显示的个数
                    initialListSize = {4}
                    //控制垂直滚动条是否可见
                    showsVerticalScrollIndicator = {false}
                    //设置固定的头部和尾部显示什么
                    renderFooter = {this._renderFooter.bind(this)}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        flexDirection: 'row'
    },
    title:{
        padding:10,
    }
});