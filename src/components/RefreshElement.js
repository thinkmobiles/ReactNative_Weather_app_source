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
    return {...store.weather.weather};
})
export default class Search extends Component {
    constructor(props) {
        super(props);

        this.height = props.height || 20;

        this.state = {
            readyToRefresh: false,
            refreshTop    : new Animated.Value(-this.height)
        }
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

    handleRelease() {
        if (this.state.refreshTop._value !== 2 * this.height) {
            return this.hideRefreshTool();
        }

        // /*TODO loading animation */
        // const {lat, lon} = this.props.current;
        // initForecast(`${lat},${lon}`, (err, res) => {
        //     this.hideRefreshTool();
        //
        //     if(err){
        //         return Alert.alert(
        //             'Error',
        //             err.message,
        //             [
        //                 {text: 'OK'},
        //             ],
        //             {cancelable: false})
        //     }
        //
        //     this.props.dispatch(setWeather(res));
        // })

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
