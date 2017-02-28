import React, {Component} from 'react';
import {View, Text, StyleSheet, PanResponder,PixelRatio} from 'react-native';
/**
 * 手势响应系统
 * 参考：http://www.tuicool.com/articles/IreaYfv
 * Created by jone-chen on 2017/2/22.
 */
var CIRCLE_SIZE = 80;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';

class PanResponderExample extends Component {
    // 设置一些初始值。
    _panResponder : {}
    _previousLeft : 0
    _previousTop : 0
    _circleStyles : {}
    circle : null
    constructor(props) {
        super(props)
        this.state = {
            numberActiveTouches: 0,
            moveX: 0,
            moveY: 0,
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            vx: 0,
            vy: 0
        }
        this._highlight = this._highlight.bind(this);
        this._unHighlight = this._unHighlight.bind(this);
        this._updatePosition = this._updatePosition.bind(this);
        this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
        this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
        this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
        this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
        this._handlePanResponderEnd = this._handlePanResponderMove.bind(this);
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd
        });
        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
            left: this._previousLeft,
            top: this._previousTop
        }
    }
    componentDidMount() {
        this._updatePosition();
    }
    render() {
        return (
            <View style={styles.container}>
                <View ref={(circle) => {
                    this.circle = circle
                }} style={styles.circle} {...this._panResponder.panHandlers}></View>
                <Text>
                    {this.state.numberActiveTouches}
                    touches, dx: {this.state.dx}, dy: {this.state.dy}, vx: {this.state.vx}, vy: {this.state.vy}
                </Text>
            </View>
        )
    }
    // _highlight和_unHighlight被PanResponder方法调用，
    _highlight() {
        this.circle && this.circle.setNativeProps({
          style:{
            backgroundColor:CIRCLE_HIGHLIGHT_COLOR
          }
        })
    }
    _unHighlight() {
        this.circle && this.circle.setNativeProps({
            style: {
                backgroundColor: CIRCLE_COLOR
            }
        })
    }
    // 我们使用setNativeProps直接控制圆形的位置。
    _updatePosition() {
        this.circle && this.circle.setNativeProps({style: this._circleStyles});
    }
    _handleStartShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // 当用户按下圆形时，应该被激活吗？
        return true;
    }
    _handleMoveShouldSetPanResponder(e : Object, gestureState : Object) : boolean {
        // 当用户触摸并移动圆形时，需要被激活吗？
        return true;
    }
    _handlePanResponderGrant(e : Object, gestureState : Object) {
        console.log('允许', gestureState)
        this._highlight()
    }
    _handlePanResponderMove(e : Object, gestureState : Object) {
        this.setState({
            stateID: gestureState.stateID,
            moveX: gestureState.moveX,
            moveY: gestureState.moveY,
            x0: gestureState.x0,
            y0: gestureState.y0,
            dx: gestureState.dx,
            dy: gestureState.dy,
            vx: gestureState.vx,
            vy: gestureState.vy,
            numberActiveTouches: gestureState.numberActiveTouches
        });
        // 使用差值计算当前位置。
        this._circleStyles.left = this._previousLeft + gestureState.dx;
        this._circleStyles.top = this._previousTop + gestureState.dy;
        this._updatePosition();
    }
    _handlePanResponderEnd(e : Object, gestureState : Object) {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
    }
}
var styles = StyleSheet.create({
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: CIRCLE_COLOR,
        position: 'absolute',
        left: 0,
        top: 0
    },
    container: {
        flex: 1,
        paddingTop: 64
    }
});

export default PanResponderExample
