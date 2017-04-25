'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {View, Image, StyleSheet} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {initForecast} from '../helpers/weatherAPI';

@connect(store => {
    return {...store.weather};
})

export default class Splash extends React.Component {
    nav() {
        this.props.navigator.replace({
            id: 'Dashboard'
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.nav();
        }
    }

    render() {
        return <Image source={require('../images/Splash.png')} style={styles.container} />;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            const query = `${latitude},${longitude}`;

            initForecast(query, response => {
                this.props.dispatch(setWeather(response));
            });
        });

    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'transparent'
    }
});

