'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import SplashSvg from '../svgs_converted/splash';

import {
    View,
    Text,
    StyleSheet,
    Platform,
    PermissionsAndroid,
    Alert,
    Dimensions
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {initForecast} from '../helpers/weatherAPI';

const {width, height} = Dimensions.get('window');

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
                    {SplashSvg(width, height)}
                </View>
            </LinearGradient>
        );
    }

    componentDidMount() {
        this._locationReceived = false;

        if (Platform.OS === 'android' && Platform.Version >= 23) {
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
                    'title'  : 'Location Permission',
                    'message': 'Application needs permissions to get your location ' +
                    'for displaying current weather. You can deny it and chose location ' +
                    'manually.'
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
        const getCurrentPositionOptions = {
            enableHighAccuracy: true,
            timeout           : 20000,
            maximumAge        : 1000
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this._setLocation(position);
            },
            () => {
                Alert.alert(
                    'Error',
                    `Can't get your current location`,
                    [
                        {text: 'OK', onPress: this.nav},
                    ],
                    {cancelable: false}
                );

                if (!this._locationReceived) {
                    this._locationWatchID = navigator.geolocation.watchPosition(
                        (position) => {
                            this._setLocation(position);
                            navigator.geolocation.clearWatch(this._locationWatchID);
                        },
                        getCurrentPositionOptions
                    );
                }
            },
            getCurrentPositionOptions
        );
    };

    _setLocation = (position) => {
        this._locationReceived = true;

        const {latitude, longitude} = position.coords;
        const query = `${latitude},${longitude}`;

        initForecast(query, (err, response) => {
            if (err) {
                return Alert.alert(
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
    contentBlock: {
        flex          : 1,
        alignItems    : 'center',
        justifyContent: 'flex-start'
    }
});

