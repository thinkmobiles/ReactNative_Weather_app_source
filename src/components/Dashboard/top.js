'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Icon from '../Icons';

const deviseScreen = Dimensions.get('window');

@connect((store) => {
    return {
        ...store.weather.weather
    };
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

        return (
            <View style={styles.topSection}>
                <View style={styles.innerContainer}>
                    <View onPress={this.onLocationPress} style={styles.locationBlock}>
                        <View style={[styles.locationBlockElement, {maxWidth: 19, marginRight: 5}]}>
                            <Icon
                                name="location"
                                height="24"
                                width="24"
                                fill="transparent"
                                stroke="#fff"
                                strokeWidth="1"
                            />
                        </View>
                        <View style={styles.locationBlockElement}>
                            <Text style={[styles.headerText, styles.locationText]} onPress={this.onLocationPress}>
                                {`${location.name}, ${location.country}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tempBlock}>
                        <View>
                            <Text style={[styles.headerText, styles.tempText]}>
                                {currentWeather.temp_c}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.tempTextDimension, styles.headerText]}>°</Text>
                        </View>
                    </View>
                    <Text style={[styles.headerText, styles.conditionText]}>
                        {currentWeather.condition && currentWeather.condition.text}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topSection          : {
        flex          : 0.9,
        flexDirection : 'row',
        alignItems    : 'flex-start',
        justifyContent: 'center'
    },
    innerContainer      : {
        flex     : 1,
        marginTop: 35
    },
    headerText          : {
        fontFamily: 'Muli-SemiBold',
        textAlign : 'center',
        color     : '#fff'
    },
    locationBlock       : {
        maxWidth      : deviseScreen.width,
        paddingLeft   : 20,
        paddingRight  : 20,
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    locationBlockElement: {
        flex          : 1,
        alignItems    : 'center',
        justifyContent: 'center'
    },
    locationText        : {
        fontFamily: 'Muli-Regular',
        fontSize  : 24
    },
    tempBlock           : {
        flexDirection : 'row',
        alignItems    : 'flex-start',
        justifyContent: 'center'
    },
    tempText            : {
        fontSize  : 120,
        lineHeight: 110
    },
    tempTextDimension   : {
        fontSize  : 70,
        lineHeight: 100
    },
    conditionText       : {
        paddingTop: 10,
        fontSize  : 25
    }
});
