'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {
    View,
    Text
} from 'react-native';


@connect((store) => {
    return {...store.weather.weather};
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.onLocationPress = this._onLocationPress.bind(this);
    }

    _onLocationPress() {
        this.props.navigator.replace({id: 'search'});
    }

    render() {
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
                textAlign   : 'center',
            }} onPress={this.onLocationPress}>
                {`${location.name}, ${location.country}`}
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
