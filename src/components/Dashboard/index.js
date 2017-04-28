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
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);
        let self = this;

        this.state = {
            margin: new Animated.Value(0)
        };

        this.startY;

        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => {
                const {pageY} = e.nativeEvent;

                this.startY = pageY;
                return true
            },
            onPanResponderMove          : (e, gestureState) => {
                const {pageY} = e.nativeEvent;
                let maxMargin = height * 0.32;
                let diff;

                diff = pageY - this.startY;

                if (diff < 0 && maxMargin - gestureState.dy >= 0) {
                    return this.state.margin.setValue(-maxMargin - gestureState.dy);
                } else if (diff > 0 && gestureState.dy <= maxMargin) {
                    return this.state.margin.setValue(-gestureState.dy);
                }
            },
            onPanResponderRelease       : (e) => {
                const {pageY} = e.nativeEvent;

                let end = (pageY > this.startY) ? -(height * 0.32) : 0;

                Animated.spring(
                    this.state.margin,
                    {toValue: end}
                ).start();
            },
        });

        this.changeMargin = this._changeMargin.bind(this);
    }

    _changeMargin(margin) {
        this.state.margin.setValue(margin);
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
                        changeMargin={this.changeMargin}
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
