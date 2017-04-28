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

        /*this.state = {
            bounceValueStart: new Animated.Value()
        };*/

        this.onLocationPress = this._onLocationPress.bind(this);

        /*this.onMoveStart = this._onMoveStart.bind(this);
        this.onMove = this._onMove.bind(this);
        this.onMoveEnd = this._onMoveEnd.bind(this);*/
    }

    _onLocationPress() {
        this.props.navigator.replace({id: 'Search'});
    }

    /*_createAnimation(toValue) {
        const start = this.props.indexState.margin;
        return Animated.spring(
            start,
            {
                toValue : toValue,
                velocity: 3,
                tension : 2,
                friction: 8
            }
        )
    }

    _onMoveStart(e) {
        const {pageY, locationY} = e.nativeEvent;
        this.startY = pageY;

        return locationY > 60;
    }

    _onMove(e) {
        const {pageY} = e.nativeEvent;
        let diff;

        diff = pageY - this.startY;

        this.props.changeMargin(-diff);
    }

    _onMoveEnd(e) {
        const {pageY} = e.nativeEvent;

        if (pageY > this.startY)/!*(pageY > height * 0.55)*!/ {
            this._createAnimation(-height * 0.4).start();
        }
        else {
            this._createAnimation(0).start();
        }

    }*/

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
        let currentWeather = this.props.current || {};
        let location = this.props.location || {};

        let locationText = `${location.name}, ${location.country}`;
        let fontSize = this.getRealFont(locationText);
        let locationFontStyle = {
            fontSize: fontSize
        };

        return (
            <Animated.View
                style={styles.topSection}
                onResponderMove={this.onMove}
                onResponderRelease={this.onMoveEnd}
                onMoveShouldSetResponderCapture={this.onMoveStart}
                hitSlop={{top: 0, bottom: 70, left: 0, right: 0}}
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
                    {/*<View style={styles.moreInfo}>
                        <Text>dsfdsfdsf</Text>
                        <Text>dsfdsfdsf</Text>
                        <Text>dsfdsfdsf</Text>
                        <Text>dsfdsfdsf</Text>
                        <Text>dsfdsfdsf</Text>
                    </View>*/}
                </View>
            </Animated.View>

        );
    }
}

const styles = StyleSheet.create({
    topSection       : {
        flex           : 1,
        flexDirection  : 'row',
        alignItems     : 'flex-start',
        justifyContent : 'center',
        backgroundColor: 'transparent'
    },
    innerContainer   : {
        flex           : 1,
        marginTop      : 35,
        backgroundColor: 'transparent'
    },
    headerText       : {
        fontFamily: 'Muli-SemiBold',
        textAlign : 'center',
        color     : '#fff'
    },
    locationBlock    : {
        maxWidth      : width,
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
    },
    moreInfo         : {
        flex: 0.2
    }
});
