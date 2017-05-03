'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {initForecast} from '../helpers/weatherAPI';

import Icon from './Icons';

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
            <LinearGradient
                colors={['#45B4E5', '#AEEFFF']}
                start={{x: 0.7, y: 0}}
                end={{x: 0.3, y: 1}}
                style={styles.container}>
                <View style={styles.contentBlock}>
                    <Icon
                        name="appIcon"
                        height="150"
                        width="150"
                        fill="#FFF"
                        stroke="none"
                    />
                    <Text style={styles.text}>React Native</Text>
                    <Text style={styles.text}>Weather</Text>
                </View>
            </LinearGradient>
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

const styles = StyleSheet.create({
    container   : {
        flex      : 1,
        width     : undefined,
        height    : undefined,
        alignItems: 'center'
    },
    text        : {
        fontFamily: 'Muli-Bold',
        fontSize  : 30,
        color     : 'white'
    },
    contentBlock: {
        flex          : 1,
        alignItems    : 'center',
        justifyContent: 'flex-start',
        paddingTop    : 75
    }
});

