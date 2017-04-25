'use strict';

import React from 'react';
import moment from 'moment';
import {View, Text, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import Icon from '../Icons';

const mapCodeToIcon = (code) => {
    const codesMap = {
        fog   : [1030, 1135, 1147],
        sunny : [1000],
        snowy : [
            1066, 1114, 1213, 1216, 1219,
            1258, 1261, 1069, 1117, 1222,
            1225, 1237, 1264
        ],
        cloudy: [1009, 1072, 1003, 1006, 1063],
        storm : [1087, 1273, 1276, 1279, 1282],
        rainy : [
            1150, 1153, 1168, 1180, 1183,
            1198, 1240, 1171, 1186, 1189,
            1192, 1195, 1201, 1243, 1246,
            /* lightSnow */
            1204, 1207, 1210, 1249, 1252, 1255
        ]
    };

    for (let key in codesMap) {
        if (~codesMap[key].indexOf(code)) {
            return key;
        }
    }

    return 'sunny';
};

@connect((store) => {
    return {collection: store.weather.weather.forecast.forecastday};
})

export default class extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.collection.map((rowElement, index) => {
                    return (
                        <View key={'element-' + index} style={styles.row}>
                            <View style={[styles.rowElement, styles.dayElement]}>
                                <Text style={[styles.dayElementText, styles.bottomText]}>
                                    {moment(rowElement.date).format('dddd')}
                                </Text>
                            </View>
                            <View style={styles.iconBlock}>
                                <Icon
                                    name={mapCodeToIcon(rowElement.day.condition.code)}
                                    height="30"
                                    width="30"
                                    fill="#C4C4C3"
                                    stroke="none"
                                />
                            </View>
                            <View style={styles.tempBlock}>
                                <View style={styles.tempBlockElement}>
                                    <Text style={[styles.tempBlockElementText, styles.bottomText]}>
                                        {Math.round(parseInt(rowElement.day.maxtemp_c, 10)).toString()}
                                    </Text>
                                </View>
                                <View style={styles.tempBlockElement}>
                                    <Text style={[styles.tempBlockElementText, styles.bottomText]}>
                                        {Math.round(parseInt(rowElement.day.mintemp_c, 10)).toString()}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container           : {
        flex         : 0.8,
        flexDirection: 'column',
        paddingLeft  : 35,
        paddingRight : 25,
        paddingTop   : 5,
        paddingBottom: 10
    },
    row                 : {
        flex         : 1,
        alignItems   : 'center',
        flexDirection: 'row'
    },
    rowElement          : {
        flex         : 1,
        flexDirection: 'row'
    },
    bottomText          : {
        fontFamily: 'Muli-Light',
        fontSize  : 18,
        color     : '#979797'
    },
    dayElement          : {
        flex: 1
    },
    dayElementText      : {
        flex: 1
    },
    iconBlock           : {
        flex          : 1,
        alignItems    : 'center',
        justifyContent: 'center'
    },
    tempBlock           : {
        flex          : 0.6,
        alignItems    : 'center',
        justifyContent: 'center',
        flexDirection : 'row'
    },
    tempBlockElement    : {
        flex: 1
    },
    tempBlockElementText: {
        textAlign: 'center'
    }
});
