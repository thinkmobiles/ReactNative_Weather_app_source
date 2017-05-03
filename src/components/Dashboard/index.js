'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import Top from './top';
import Bottom from './bottom';
import TopImage from './topImage';

import {getProps} from '../../helpers/getWeatherProps';

import {
    Platform,
    StyleSheet,
    View,
    Text,
    Navigator,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';

const {height} = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

@connect((store) => {
    return {
        ...store.weather.weather,
        ...store.customVars.customVars
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            margin: this.props.dashBoardAnimatedValue
        };

        this.scrollTo = this._scrollTo.bind(this);

        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => {
                const {pageY} = e.nativeEvent;

                this.startY = pageY;
                this.startYMargin = pageY > height / 2 ? height : 0;

                return true
            },
            onPanResponderMove          : (e, gestureState) => {
                const {pageY} = e.nativeEvent;
                const {dy} = gestureState;
                let maxMargin = height * 0.32;
                let diff;
                let value;

                if (this.startYMargin + dy >= 0 && this.startYMargin + dy <= height) {
                    diff = pageY - this.startYMargin;

                    value = diff < 0 ? -maxMargin - dy : -dy;

                    return this.state.margin.setValue(value);
                }

                return this.state.margin.setValue(this.state.margin._value);
            },
            onPanResponderRelease       : (e) => {
                const {pageY} = e.nativeEvent;
                let direction = (pageY > this.startY ? height : 0);

                this.scrollTo(direction);
            },
        });
    }

    _scrollTo(direction) {
        let end = direction ? -(height * 0.32) : 0;

        if (this.state.margin._value !== end) {
            Animated.spring(
                this.state.margin,
                {
                    toValue: end
                }
            ).start();
        }
    }

    render() {
        let code = this.props.current.condition.code;
        let {images, gradientImage} = getProps(code);

        gradientImage.style = styles.gradient;

        return (
            <Animated.View
                {...this.state.panResponder.panHandlers}
                style={[styles.fullScreen, {marginBottom: this.state.margin}]}>
                <Animated.View
                    style={[styles.gradientContainer, {bottom: this.state.margin}]}>
                    <LinearGradient
                        {...gradientImage}
                    >
                        <TopImage
                            images={images}
                        />
                    </LinearGradient>
                </Animated.View>
                <View style={[styles.contentSection]}>
                    <Top
                        navigator={this.props.navigator}
                        scrollTo={this.scrollTo}
                        indexState={this.state}
                    />
                    <Bottom />
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    fullScreen       : {
        paddingTop     : isIos ? 20 : 0,
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'white',
        minHeight      : height
    },
    gradientContainer: {
        position    : 'absolute',
        overflow    : 'hidden',
        marginBottom: height * 0.2,
        top         : 0,
        left        : 0,
        right       : 0,
        maxHeight   : height * 1.3,
        minHeight   : height,
        zIndex      : 1
    },
    gradient         : {
        flex: 1
    },
    contentSection   : {
        flex    : 1,
        position: 'relative',
        zIndex  : 2
    }
});
