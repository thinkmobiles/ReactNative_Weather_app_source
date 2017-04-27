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


const deviceScreen = Dimensions.get('window');
const locationDefFont = 24;

@connect((store) => {
    return {
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isSwiped        : false,
            bounceValueStart: new Animated.Value()
        };

        this.onLocationPress = this._onLocationPress.bind(this);

        this.onMoveStart = this._onMoveStart.bind(this);
        this.onMove = this._onMove.bind(this);
        this.onMoveEnd = this._onMoveEnd.bind(this);
    }

    _onLocationPress() {
        this.props.navigator.replace({id: 'Search'});
    }

    _createAnimation(toValue) {
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
        const {pageY, locationX} = e.nativeEvent;
        this.startY = pageY;
        return locationX > 80 && pageY > 80;
    }

    _onMove(e) {
        const {pageY} = e.nativeEvent;
        let diff = pageY - this.startY;
        // diff += diff / 1.3;
        if (diff < 0) {
            diff = 0;
        }

        this.props.changeMargin(-diff);
    }

    _onMoveEnd(e) {
        const {pageY} = e.nativeEvent;
        if(this.state.isSwiped){
            this.setState({isSwiped: false});
        }
        else {
            if (pageY > deviceScreen.height * 0.55) {
                this._createAnimation(-360).start();
                this.setState({isSwiped: true});
            }
            else {
                this._createAnimation(0).start();
                this.setState({isSwiped: false});
            }
        }

    }

    getRealFont(text) {
        const length = text.length;

        let fontSize = locationDefFont;
        let width = () => {
            return length / 2 * fontSize * 0.7;
        };

        while (width() > deviceScreen.width - 40) {
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
            >
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
            </Animated.View>

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
        maxWidth      : deviceScreen.width,
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
