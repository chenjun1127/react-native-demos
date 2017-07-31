/**
 * Created by 0easy-23 on 2017/2/5.
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @jone
 */

import React, {Component} from 'react';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
export default class extends Component {
    static defaultProps = {
        nav: [{"name": "正在热映", "query": "in_theaters"}, {"name": "即将上映", "query": "coming_soon"},{"name": "Top250", "query": "top250"}]
    }
    static propTypes = {
        nav: React.PropTypes.array.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const newsNav = this.props.nav.map((ele, i) => {
            return (
                <MovieContent tabLabel={ele.name} query={ele.query} key={i} navigator={this.props.navigator} />
            )
        })
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarTextStyle={{paddingTop: 0}}
                tabBarBackgroundColor="#3c9"
                tabBarActiveTextColor="#fff"
                tabBarInactiveTextColor="#f9f9f9"
                tabBarUnderlineStyle={{backgroundColor: '#3c9', borderBottomWidth: 3, borderColor: '#fff'}}
            >
                {newsNav}
            </ScrollableTabView>


        )
    }
}
import MovieContent from './MovieContent'

