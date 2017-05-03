'use strict';

import React from 'react';
import moment from 'moment';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {connect} from 'react-redux';

import Icon from '../Icons';
import {getProps} from '../../helpers/getWeatherProps';

const {height} = Dimensions.get('window');

@connect((store) => {
    return {collection: store.weather.weather.forecast.forecastday};
})
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.collection.map((rowElement, index) => {
                    let {icon} = getProps(rowElement.day.condition.code);
                    icon = Math.round(Math.random()*10) >5 ? '1204':'1279';
                    let boldStyleObject = {
                        fontFamily: !index ? 'Muli-SemiBold' : 'Muli-Light'
                    };

                    return (
                        <View key={'element-' + index}
                              style={[styles.row]}>
                            <View style={[styles.rowElement, styles.dayElement]}>
                                <Text style={[
                                    styles.dayElementText,
                                    styles.bottomText,
                                    boldStyleObject
                                ]}>
                                    {moment(rowElement.date).format('dddd')}
                                </Text>
                            </View>
                            <View style={styles.iconBlock}>
                                {icon && (<Icon
                                    name={icon}
                                    height="30"
                                    width="30"
                                    fill="#C4C4C3"
                                    stroke="none"
                                />)}
                            </View>
                            <View style={styles.tempBlock}>
                                <View style={styles.tempBlockElement}>
                                    <Text style={[
                                        styles.tempBlockElementText,
                                        styles.bottomText,
                                        boldStyleObject
                                    ]}>
                                        {Math.round(parseInt(rowElement.day.maxtemp_c, 10)).toString()}
                                    </Text>
                                </View>
                                <View style={styles.tempBlockElement}>
                                    <Text style={[
                                        styles.tempBlockElementText,
                                        styles.bottomText,
                                        {opacity: !index ? 1 : 0.6},
                                        boldStyleObject
                                    ]}>
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
        flex         : 1,
        maxHeight    : height * 0.4,
        flexDirection: 'column',
        paddingLeft  : 35,
        paddingRight : 25,
        marginBottom : 15,
        zIndex       : 3
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
        fontFamily     : 'Muli-Light',
        fontSize       : 18,
        color          : '#979797',
        backgroundColor: 'transparent'
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
