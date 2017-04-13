'use strict';

import React, {
    Component,
} from 'react';

import Left from './leftList';
import Right from './rightContainer';
import Bottom from './bottomLine';

import {
    Text,
    View,
    Dimensions,
    Animated,
    StyleSheet
} from 'react-native';

const deviceScreen = Dimensions.get('window');
const widgetHeight = deviceScreen.height * 0.6;
const shownPartHeight = 60;
const hideTranslate = -(widgetHeight - shownPartHeight);

export default class TopContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            translateY      : 0,
            bounceValueStart: new Animated.Value(0),
            visible         : true
        }
    }

    _createAnimatiom = (toValue) => {
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

    _toggleSubview(visibleState) {
        let toValue = 0;
        let _visibleState = typeof visibleState !== 'undefined' ? visibleState : !this.state.visible;

        if (!_visibleState) {
            toValue = hideTranslate;
        }

        this._createAnimatiom(toValue).start();

        this.setState({
            translateY: toValue,
            visible   : _visibleState
        });
    }

    _onMove(e) {
        const {pageY} = e.nativeEvent;

        if (pageY > widgetHeight - shownPartHeight) {
            return false;
        }

        let distance = -(this.pageY - pageY);

        this._createAnimatiom(this.state.translateY + distance).start();

        this.setState({
            translateY: this.state.translateY + distance
        });
        this.pageY = pageY;
        this.state.bounceValueStart.setValue(this.state.translateY + distance);

    }

    _onMoveStart(e) {
        const {locationX, pageY} = e.nativeEvent;

        this.pageY = pageY;

        return locationX > 60;
    }

    _onMoveEnd(e) {
        const {pageY} = e.nativeEvent;

        this._toggleSubview(pageY >= deviceScreen.height * 0.3);
    }

    render() {
        return (
            <Animated.View
                style={{
                    height   : widgetHeight,
                    transform: [{translateY: this.state.bounceValueStart}]
                }}
                onResponderMove={this._onMove.bind(this)}
                onResponderRelease={this._onMoveEnd.bind(this)}
                onMoveShouldSetResponderCapture={this._onMoveStart.bind(this)}
            >
                <View
                    style={styles.topPart}
                >
                    <Left/>
                    <Right
                        onMenuClick={this._toggleSubview.bind(this, false)}
                    />
                </View>
                <Bottom
                    onMenuClick={this._toggleSubview.bind(this, true)}
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