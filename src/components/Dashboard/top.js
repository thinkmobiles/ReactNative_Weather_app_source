'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Icon from '../Icons';

const deviseScreen = Dimensions.get('window');
const locationDefFont = 24;

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
        this.props.navigator.replace({id: 'Search'});
    }

    getRealFont(text) {
        const length = text.length;

        let fontSize = locationDefFont;
        let width = () => {
            return length / 2 * fontSize * 0.7;
        };

        while (width() > deviseScreen.width - 40) {
            fontSize -= 2;
        }

        return fontSize;
    }

    render() {
        let currentWeather = this.props.current || {};
        let location = this.props.location || {};

        let locationText = `${location.name}, ${location.country}`;
        let fontSize = this.getRealFont(locationText);
        let locationFontStyle = {
            fontSize: fontSize
        };

        return (
            <View style={styles.topSection}>
                <View style={styles.innerContainer}>
                    <View onPress={this.onLocationPress} style={styles.locationBlock}>
                        <View style={{alignSelf: 'flex-start'}}>
                            <Icon
                                name="location"
                                height={fontSize}
                                width={fontSize}
                                fill="transparent"
                                stroke="#fff"
                                strokeWidth="1"
                            />
                        </View>
                        <Text style={[styles.headerText, styles.locationText, locationFontStyle]}
                              onPress={this.onLocationPress}>
                            {locationText}
                        </Text>
                    </View>
                    <View style={styles.tempBlock}>
                        <View>
                            <Text style={[styles.headerText, styles.tempText]}>
                                {Math.round(parseInt(currentWeather.temp_c, 10)).toString()}
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
    topSection       : {
        flex           : 0.9,
        flexDirection  : 'row',
        alignItems     : 'flex-start',
        justifyContent : 'center',
        backgroundColor: 'transparent'
    },
    innerContainer   : {
        flex     : 1,
        marginTop: 35,
        backgroundColor: 'transparent'
    },
    headerText       : {
        fontFamily: 'Muli-SemiBold',
        textAlign : 'center',
        color     : '#fff'
    },
    locationBlock    : {
        maxWidth      : deviseScreen.width,
        paddingLeft   : 20,
        paddingRight  : 20,
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    locationText     : {
        fontFamily: 'Muli-Regular'
    },
    tempBlock        : {
        flexDirection : 'row',
        alignItems    : 'flex-start',
        justifyContent: 'center'
    },
    tempText         : {
        fontSize     : 120,
        lineHeight   : 110,
        paddingBottom: 5,
    },
    tempTextDimension: {
        marginLeft: -7,
        fontSize  : 70,
        lineHeight: 75
    },
    conditionText    : {
        paddingTop: 5,
        fontSize  : 25
    }
});
