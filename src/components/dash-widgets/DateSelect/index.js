'use strict';

import React, {
    Component,
} from 'react';

import Left from './leftList';
import Right from './rightContainer';
import Bottom from './bottomLine';
import Top from './topSettings';

import {
    View,
    Dimensions,
    Animated,
    StyleSheet
} from 'react-native';

import {connect} from 'react-redux';

const deviceScreen = Dimensions.get('window');
const shownPartHeight = 60;
const widgetHeight = deviceScreen.height * 0.5 + shownPartHeight;
const hideTranslate = -(widgetHeight - shownPartHeight);

@connect(store => {
    return {...store.dateSelect};
})

export default class TopContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            settingsVisible : false,
            translateY      : 0,
            bounceValueStart: new Animated.Value(-shownPartHeight)
        }
    }

    _createAnimation = (toValue) => {
        return Animated.spring(
            this.state.bounceValueStart,
            {
                toValue : toValue,
                velocity: 3,
                tension : 2,
                friction: 8,
            }
        )
    };

    _toggleSubview(visibleState, distance) {
        let toValue = -shownPartHeight;
        let _visibleState = typeof visibleState !== 'undefined' ? visibleState : !this.props.dateSelect.visible;
        let _visibleSettingsState;

        if (!_visibleState) {
            toValue = hideTranslate;
            _visibleSettingsState = false;
        } else {
            if (distance < 0 && this.state.settingsVisible) {
                toValue = -shownPartHeight;
                _visibleSettingsState = false;
            } else if (distance > 0 && !this.state.settingsVisible) {
                toValue = 0;
                _visibleSettingsState = true;
            }
        }

        this._createAnimation(toValue).start();

        this.setState({
            settingsVisible: _visibleSettingsState,
            translateY     : toValue,
            visible        : _visibleState
        });
    }

    _onMove(e) {
        const {pageY} = e.nativeEvent;

        if (pageY > widgetHeight - shownPartHeight * 2) {
            return false;
        }

        let distance = -(this.pageY - pageY);

        // this._createAnimation(this.state.translateY + distance).start();

        this.setState({
            translateY: this.state.translateY + distance
        });
        this.pageY = pageY;
        this.state.bounceValueStart.setValue(this.state.translateY + distance);

    }

    _onMoveStart(e) {
        const {locationX, pageY} = e.nativeEvent;

        this.pageY = pageY;

        return locationX > 60 && pageY > 60;
    }

    _onMoveEnd(e) {
        const {pageY} = e.nativeEvent;
        let distance = -(this.pageY - pageY);

        this._toggleSubview(pageY >= deviceScreen.height * 0.3, distance);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.dateSelect.visible !== nextProps.dateSelect.visible) {
            this._toggleSubview(nextProps.dateSelect.visible);
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    height   : widgetHeight,
                    marginTop: this.state.bounceValueStart,
                    zIndex   : 10
                }}
                onResponderMove={this._onMove.bind(this)}
                onResponderRelease={this._onMoveEnd.bind(this)}
                onMoveShouldSetResponderCapture={this._onMoveStart.bind(this)}
                hitSlop={{top: 0, bottom: 100, left: 0, right: 0}}
            >
                <Top
                    height={shownPartHeight}
                />
                <View
                    style={styles.topPart}
                >
                    <Left/>
                    <Right/>
                </View>
                <Bottom
                    height={shownPartHeight}
                />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    topPart: {
        flex           : 1,
        height         : null,
        flexDirection  : 'row',
        backgroundColor: '#333333'
    }
});