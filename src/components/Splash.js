'use strict';

import React, {
    Component,
} from 'react';

import * as weatherActions from '../actions/weatherActions';
import WeatherApi from '../helpers/weatherAPI';
const weatherApi = new WeatherApi();

import {connect} from 'react-redux';


import {
    View,
    Text,
    Image
} from 'react-native';

@connect(store => {
    return {...store.weather};
})
export default class Splash extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

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
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff73f'
                }}
            >
                <Image
                    source={require("../../src/images/logo.png")}
                    style={{width: 250, height: 250, marginBottom: 400}}
                    resizeMode="contain"
                />
                <Text>DDDDDDDDD</Text>
            </View>
        );
    }

    componentDidMount() {
        weatherApi.initForecast('uzhhorod', r => {
            this.props.dispatch(weatherActions.setWeather(r));
        });
    }
}	