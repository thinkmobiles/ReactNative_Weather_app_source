'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';

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
        return (
            <View
                style={{
                    flex           : 1,
                    flexDirection  : 'row',
                    alignItems     : 'center',
                    justifyContent : 'center',
                    backgroundColor: '#fff73f'
                }}
            >
                <Image
                    source={require("../../src/images/logo.png")}
                    style={{width: 250, height: 250, marginBottom: 400}}
                    resizeMode="contain"
                />
                <Text>SPLASH</Text>
            </View>
        );
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