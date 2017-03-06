/**
 * Created by 0easy-23 on 2017/2/5.
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    ActivityIndicator
} from 'react-native';
const REQUEST_URL = 'https://api.douban.com/v2/movie/in_theaters';
export default class movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            }),
            loaded: false,
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL).then((response) => {
            return response.json()
        }).then((json) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(json.subjects),
                loaded: true,
            })
        });
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <ListView dataSource={this.state.dataSource} renderRow={this.renderMovie}/>
        )
    }

    renderLoadingView() {
        return (
            // <Text>正在加载</Text>
            <ActivityIndicator animating={true} style={[styles.centering, {height: 80}]} size="large" color="#3c6" />
        )
    }

    renderMovie(movie) {
        var authors;
        if (movie.casts.length) {
            var Authors = movie.casts.map(function(index, elem) {
                return <Greeting key={elem} name={index.name}/>
            })
            authors = (
                <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start',flex:1}}>
                    {Authors}
                </View>
            )
        }
        return (
            <View>
                <View style={[styles.listImg,{margin:10,paddingBottom:10,marginTop:0}]}>
                    <Image source={{uri: movie.images.medium}} style={{width:80,height:100}}/>
                    <View style={{paddingLeft:10,paddingRight:0,flex:1}}>
                        <Text style={{paddingBottom:3,color:'#3c6'}}>{movie.title}</Text>
                        <Text style={{paddingBottom:3}}>年份：{movie.year}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text>主演：</Text>
                            {authors}
                        </View>
                    </View>
                    <Text style={styles.averageText}>
                        {movie.rating.average}
                    </Text>
                </View>
            </View>
        )
    }

}
class Greeting extends Component {
    render() {
        return (
            <Text style={{paddingRight:4}}>
                { this.props.name }
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listImg: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },
    averageText: {
        fontSize: 20,
        color: 'red',
        width: 40,
        textAlign: 'right'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        flex: 1,
    },
});