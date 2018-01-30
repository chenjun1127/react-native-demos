/**
 * Created by 0easy-23 on 2018/1/30
 */
'use strict';

import {createStore, applyMiddleware} from 'redux';

import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const configureStore = (initialState) => createStoreWithMiddleware(rootReducer, initialState);

export default configureStore