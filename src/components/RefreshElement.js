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
    return {...store.weather.weather};
}, null, null, {withRef: true})
export default class RefreshElement extends Component {
    constructor(props) {
        super(props);

        this.height = props.height || 20;

        this.state = {
            readyToRefresh: false,
            refreshTop    : new Animated.Value(-this.height),
            spinValue     : new Animated.Value(0)
        };

        this.rotate = false;
        this.spin = this.state.spinValue.interpolate({
            inputRange : [0, 1],
            outputRange: ['0deg', '360deg']
        });
    }

    hideRefreshTool() {
        Animated.spring(
            this.state.refreshTop,
            {
                toValue: -this.height
            }
        ).start();
    }

    handleScroll(value) {
        const animatedValue = value < 3 * this.height ? -this.height + value : 2 * this.height;

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

    handleRelease() {
        if (this.state.refreshTop._value !== 2 * this.height || !this.props.location) {
            return this.hideRefreshTool();
        }

        this.rotate = true;
        this.animateLoading();

        const {lat, lon} = this.props.location;
        initForecast(`${lat},${lon}`, (err, res) => {
            if (err) {
                return Alert.alert(
                    'Error',
                    err.message,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false})
            }
            this.hideRefreshTool();
            this.rotate = false;
            this.props.dispatch(setWeather(res));
        });
    }


    render() {
        return (
            <Animated.View
                style={[styles.mainView, {maxHeight: this.height, top: this.state.refreshTop}]}>
                <Animated.Image
                    style={[
                        styles.element,
                        {
                            paddingTop: this.height / 2,
                            maxHeight : this.height * 0.8,
                            maxWidth  : this.height * 0.8,
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
        position: 'absolute',
        left    : 0,
        right   : 0,
        zIndex  : 20,
    },
    element : {
        flex     : 1,
        alignSelf: 'center'
    }
});
