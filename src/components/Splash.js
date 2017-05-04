'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Alert
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {initForecast} from '../helpers/weatherAPI';

import Icon from './Icons';

@connect(store => {
    return {...store.weather};
})
export default class Splash extends React.Component {
    constructor(props) {
        super(props);

        this._locationReceived = false;
        this._locationWatchID = null;

        this.nav = this._nav.bind(this);
    }

    _nav() {
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
        this._locationReceived = false;

        if (Platform.OS == 'android' && Platform.Version >= 23) {
            this._getInitialAndroid23Location();
        } else {
            this._getInitialLocation();
        }
    }

    _getInitialAndroid23Location = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title'  : 'Location',
                    'message': 'Application needs your location ' +
                    'for getting weather by it.'
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this._getInitialLocation();
            } else {
                this.nav();
            }
        } catch (err) {
            Alert.alert(
                'Error',
                err,
                [
                    {text: 'OK', onPress: this.nav}
                ],
                {cancelable: false}
            )
        }
    };

    _getInitialLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this._setLocation(position);
            },
            (error) => {
                Alert.alert(
                    'Error',
                    `Can't get your current location`,
                    [
                        {text: 'OK', onPress: this.nav},
                    ],
                    {cancelable: false}
                );
            },
            {
                enableHighAccuracy: true,
                timeout           : 1000,
                maximumAge        : 1000
            }
        );

        if (Platform.OS == 'android' && !this._locationReceived) {
            this._locationWatchID = navigator.geolocation.watchPosition((position) => {
                this._setLocation(position);
                navigator.geolocation.clearWatch(this._locationWatchID);
            });
        }
    };

    _setLocation = (position) => {
        this._locationReceived = true;

        const {latitude, longitude} = position.coords;
        const query = `${latitude},${longitude}`;

        initForecast(query, (err, response) => {
            if (err) {
                Alert.alert(
                    'Error',
                    err.message,
                    [
                        {text: 'OK', onPress: this.nav},
                    ],
                    {cancelable: false}
                );
            }

            this.props.dispatch(setWeather(response));
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

