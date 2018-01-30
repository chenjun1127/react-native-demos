/**
 * Created by 0easy-23 on 2018/1/30
 */

import * as actionTypes from '../constants/index';

const update = (data) => {
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
};
const add = () => {
    return {
        type: actionTypes.ADD
    }
};
export {update, add};