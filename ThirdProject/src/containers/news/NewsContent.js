/**
 * Created by 0easy-23 on 2017/7/20.
 */
import React, {Component} from 'react';
import NewsFetch from './NewsFetch';
export default class extends Component{
    render(){
        return(
            <NewsFetch chanel={this.props.tabLabel} navigator={this.props.navigator} />
        )
    }
}