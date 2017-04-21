'use strict';

import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

@connect((store) => {
    return {...store.weather.weather};
})

export default class extends React.Component {
    render() {
        console.dir(this.props);
        let currentWeather = this.props.current || {};
        let location = this.props.location || {};

        return <View style={{
            width          : '100%',
            height         : 325,
            backgroundColor: 'yellow'
        }}>
            <Text style={{
                marginTop   : 40,
                marginBottom: 20,
                textAlign   : 'center'
            }}>
                {location.country + ', ' + location.name}
            </Text>
            <Text style={{
                fontSize    : 40,
                marginBottom: 20,
                textAlign   : 'center'
            }}>
                {currentWeather.temp_c}
            </Text>
            <Text style={{
                textAlign: 'center'
            }}>
                {currentWeather.condition && currentWeather.condition.text}
            </Text>
        </View>
    }
}
