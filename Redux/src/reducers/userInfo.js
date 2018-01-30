/**
 * Created by 0easy-23 on 2018/1/30
 */
import * as actionTypes from '../constants/index';

const initialState = {
    name: 'Jone',
    price: 10,
    amount: 10,
};
const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return Object.assign({}, state, action.data);
            break;
        case actionTypes.ADD:
            return {...state, amount: state.amount + 1};
            break;
        default:
            return state
    }
};

export default userInfo;