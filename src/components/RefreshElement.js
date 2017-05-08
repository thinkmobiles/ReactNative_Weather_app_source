import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
    Animated,
    StyleSheet,
    Alert
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
            refreshTop    : this.props.refreshAnimatedValue
        };

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
        const animatedValue = value < 1.2 * this.height ? -this.height + value : this.height;

        this.state.refreshTop.setValue(animatedValue);
    }

    _handleRelease() {
        if (this.state.refreshTop._value !== this.height) {
            return this.hideRefreshTool();
        }

        /*TODO loading animation */
        const {lat, lon} = this.props.location;
        initForecast(`${lat},${lon}`, (err, res) => {
            this.hideRefreshTool();

            if (err) {
                return Alert.alert(
                    'Error',
                    err.message,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false})
            }

            this.props.dispatch(setWeather(res));
        })
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
