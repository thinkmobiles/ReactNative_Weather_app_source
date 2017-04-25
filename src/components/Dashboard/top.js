'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet} from 'react-native';

import Icon from '../Icons';

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
                    <View style={styles.locationBlock}>
                        <View style={styles.locationBlockElement}>
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
                                {location.country + ', ' + location.name}
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
        flex          : 1,
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
        flexDirection : 'row',
        justifyContent: 'center'
    },
    locationBlockElement: {
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