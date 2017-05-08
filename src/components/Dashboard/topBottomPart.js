'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';

const {height} = Dimensions.get('window');
const maxMargin = new Animated.Value(height * 0.32);

@connect((store) => {
    return {
        ...store.weather.weather,
        ...store.customVars.customVars
    };
})
export default class extends React.Component {
    render() {
        const {
            current = {},
            forecast = {}
        } = this.props;

        const forecastToday = forecast.forecastday && forecast.forecastday[0] || {};

        const {
            temp_c,
            feelslike_c,
            humidity,
            vis_km
        } = current;

        const {
            maxtemp_c,
            maxtemp_f,
            maxwind_mph,
            maxwind_kph
        } = forecastToday.day;

        const {
            temp_c: overnightTempC,
            temp_f: overnightTempF
        } = forecastToday.hour[23];

        const condText = current.condition && current.condition.text || '';
        const minWind_kph = Math.min(...forecastToday.hour.map(h => h.wind_kph)).toFixed(2);
        const minWind_mph = (minWind_kph * 0.621371).toFixed(2);

        const moreInfoText = `Today - ${condText} with a high of ${maxtemp_c} C (${maxtemp_f} F). Winds variable at ${minWind_kph} to ${maxwind_kph} kph (${minWind_mph} to ${maxwind_mph} mph). The overnight ${overnightTempC < temp_c ? 'low' : 'high'} to ${overnightTempC} C (${overnightTempF} F)`;

        return (
            <Animated.View
                style={[styles.moreInfo, {
                    marginTop: Animated.add(maxMargin, this.props.dashBoardAnimatedValue)
                }]}>
                <View style={styles.moreInfoTop}>
                    <View style={styles.moreInfoTopElement}>
                        <Text style={styles.moreInfoTopElementDesc}>Feels like</Text>
                        <Text
                            style={styles.moreInfoTopElementValue}>{`${Math.round(parseInt(feelslike_c, 10))}`}</Text>
                    </View>
                    <View style={styles.moreInfoSeparator}>
                        <Text style={styles.moreInfoSeparatorText}>|</Text>
                    </View>
                    <View style={styles.moreInfoTopElement}>
                        <Text style={styles.moreInfoTopElementDesc}>Humidity</Text>
                        <Text style={styles.moreInfoTopElementValue}>{`${humidity}%`}</Text>
                    </View>
                    <View style={styles.moreInfoSeparator}>
                        <Text style={styles.moreInfoSeparatorText}>|</Text>
                    </View>
                    <View style={styles.moreInfoTopElement}>
                        <Text style={styles.moreInfoTopElementDesc}>Visibility</Text>
                        <Text style={styles.moreInfoTopElementValue}>{`${vis_km} km`}</Text>
                    </View>
                </View>
                <View style={styles.moreInfoBottom}>
                    <Text style={styles.moreInfoBottomText}>
                        {moreInfoText}
                    </Text>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    moreInfo               : {
        flex: 1
    },
    moreInfoTop            : {
        flexDirection : 'row',
        justifyContent: 'center'
    },
    moreInfoTopElement     : {
        alignItems: 'center',
        marginTop : 52
    },
    moreInfoTopElementDesc : {
        fontFamily: 'Muli-Regular',
        fontSize  : 12,
        color     : '#fff'
    },
    moreInfoTopElementValue: {
        fontFamily: 'Muli-SemiBold',
        fontSize  : 21,
        color     : '#fff'
    },
    moreInfoSeparator      : {
        marginLeft : 10,
        marginRight: 10,
        marginTop  : 52
    },
    moreInfoSeparatorText  : {
        fontSize: 24,
        color   : '#fff'
    },
    moreInfoBottom         : {
        flexDirection : 'row',
        justifyContent: 'center',
        marginLeft    : 25,
        marginRight   : 24,
        marginTop     : 34
    },
    moreInfoBottomText     : {
        color        : '#fff',
        fontSize     : 16,
        fontFamily   : 'Muli-Regular',
        lineHeight   : 21,
        letterSpacing: 0.8
    }
});
