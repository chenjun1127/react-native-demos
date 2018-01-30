/**
 * Created by 0easy-23 on 2018/1/29
 */



import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userInfoAction from '../actions/userInfo';
import Home from '../components/Home';

const mapStateToProps = (state) => {
    return state
};
const mapDispatchToProps = (dispatch) => {
    return {
        musicInfoActions: bindActionCreators(userInfoAction, dispatch),
    }

};
export default connect(mapStateToProps, mapDispatchToProps)(Home);