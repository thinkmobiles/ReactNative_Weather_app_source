'use strict';

import React from 'react';
import {connect} from 'react-redux';

import Icon from '../Icons';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';

const {height, width} = Dimensions.get('window');
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

        while (width() > width - 40) {
            fontSize -= 2;
        }

        return fontSize;
    }

    render() {
        const {
            location = {},
            current = {},
            forecast = {}
        } = this.props;

        const forecastToday = forecast.forecastday && forecast.forecastday[0] || {};

        let locationText = `${location.name}, ${location.country}`;
        let fontSize = this.getRealFont(locationText);
        let locationFontStyle = {
            fontSize: fontSize
        };

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

        const moreInfoText = `Today - ${condText} with a high of ${maxtemp_f} F (${maxtemp_c} C). Winds variable at ${minWind_mph} to ${maxwind_mph} mph (${minWind_kph} to ${maxwind_kph} kph). The overnight ${overnightTempC < temp_c ? 'low' : 'high'} to ${overnightTempF} F (${overnightTempC} C)`;

        return (
            <View
                style={styles.topSection}
            >
                <View onResponderTerminate={() => false} style={styles.innerContainer}>
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
                                {Math.round(parseInt(current.temp_c, 10)).toString()}
                            </Text>
                        </View>
                        <View>
                            <Text style={[styles.tempTextDimension, styles.headerText]}>°</Text>
                        </View>
                    </View>
                    <Text style={[styles.headerText, styles.conditionText]}>
                        {condText}
                    </Text>
                    <View style={styles.moreInfo}>
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
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topSection             : {
        flex           : 1,
        flexDirection  : 'row',
        alignItems     : 'flex-start',
        justifyContent : 'center',
        backgroundColor: 'transparent'
    },
    innerContainer         : {
        flex           : 1,
        marginTop      : 35,
        backgroundColor: 'transparent'
    },
    headerText             : {
        fontFamily: 'Muli-SemiBold',
        textAlign : 'center',
        color     : '#fff'
    },
    locationBlock          : {
        maxWidth      : width,
        paddingLeft   : 20,
        paddingRight  : 20,
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    locationText           : {
        fontFamily: 'Muli-Regular'
    },
    tempBlock              : {
        flexDirection : 'row',
        alignItems    : 'flex-start',
        justifyContent: 'center'
    },
    tempText               : {
        fontSize     : 120,
        lineHeight   : 110,
        paddingBottom: 5,
    },
    tempTextDimension      : {
        marginLeft: -7,
        fontSize  : 70,
        lineHeight: 75
    },
    conditionText          : {
        paddingTop: 5,
        fontSize  : 25
    },
    moreInfo               : {
        flex: 0.2
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
