/**
 * Created by 0easy-23 on 2018/1/30
 */
import React,{Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';
import App from './App';
const store = configureStore();
export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}