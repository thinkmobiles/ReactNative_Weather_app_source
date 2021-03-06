import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
    Animated,
    StyleSheet,
    Alert,
    Easing
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {initForecast} from '../helpers/weatherAPI';

@connect((store) => {
    return {
        ...store.weather.weather,
        ...store.customVars.customVars
    };
}, null, null, {withRef: true})

export default class RefreshElement extends Component {
    constructor(props) {
        super(props);

        this.height = props.height || 20;

        this.state = {
            readyToRefresh: false,
            refreshTop    : this.props.refreshAnimatedValue,
            spinValue     : new Animated.Value(0)
        };

        this.rotate = false;
        this.spin = this.state.spinValue.interpolate({
            inputRange : [0, 1],
            outputRange: ['0deg', '360deg']
        });
        this.handleRelease = this._handleRelease.bind(this);
        this.handleScroll = this._handleScroll.bind(this);
    }

    hideRefreshTool() {
        Animated.spring(
            this.state.refreshTop,
            {
                toValue: -this.height
            }
        ).start();
    }

    _handleScroll(value) {
        const animatedValue = value <= this.height ? -this.height + value : 10;

        this.state.refreshTop.setValue(animatedValue);
    }

    animateLoading() {
        if (this.rotate) {
            this.state.spinValue.setValue(0);
            Animated.timing(
                this.state.spinValue,
                {
                    toValue : 1,
                    duration: 600,
                    easing  : Easing.linear
                }
            ).start(() => this.animateLoading())
        }
    }

    _getInitialLocation = (cb) => {
        const getCurrentPositionOptions = {
            enableHighAccuracy: false,
            timeout           : 3000,
            maximumAge        : 1000
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (cb && typeof cb === 'function') {
                    cb(position);
                }
            },
            () => {
                this.hideRefreshTool();
            },
            getCurrentPositionOptions
        );
    };

    _refreshData(position) {
        const {lat, lon} = position;

        this.rotate = true;
        this.animateLoading();

        initForecast(`${lat},${lon}`, (err, res) => {
            this.hideRefreshTool();

            if (err) {
                return Alert.alert(
                    'Error',
                    err.message,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false});
            }
            this.rotate = false;
            this.props.dispatch(setWeather(res));
        });
    }

    _handleRelease(refresh) {
        if (this.state.refreshTop._value !== 10 && !refresh) {
            return this.hideRefreshTool();
        }

        if (refresh) {
            this.handleScroll(this.height);
        }

        if (!this.props.location) {
            return this._getInitialLocation((position) => {
                const {latitude, longitude} = position.coords;

                this._refreshData({lat: latitude, lon: longitude});
            });
        }

        this._refreshData(this.props.location);
    }

    render() {
        return (
            <Animated.View
                style={[styles.mainView, {height: this.height, top: this.state.refreshTop}]}>
                <Animated.Image
                    style={[
                        styles.element,
                        {
                            maxHeight: this.height * 0.8,
                            maxWidth : this.height * 0.8,
                        },
                        {
                            transform: [
                                {rotate: this.spin}
                            ]
                        }
                    ]}
                    source={require('../images/images.png')}
                />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex          : 1,
        position      : 'absolute',
        justifyContent: 'flex-start',
        display       : 'flex',
        left          : 0,
        right         : 0,
        zIndex        : 20,
    },
    element : {
        flex     : 1,
        alignSelf: 'center'
    }
});
