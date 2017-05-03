'use strict';

import React from 'react';
import {connect} from 'react-redux';

import Icon from '../Icons';
import TopBottomPart from './topBottomPart';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity
} from 'react-native';

const {width} = Dimensions.get('window');
const locationDefFont = 19;

@connect((store) => {
    return {
        ...store.weather.weather,
        ...store.customVars.customVars
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.onLocationPress = this._onLocationPress.bind(this);
        this.onTouchablePress = this._onTouchablePress.bind(this);
    }

    _onLocationPress() {
        this.props.navigator.replace({id: 'Search'});
    }

    _onTouchablePress() {
        return this.props.scrollTo(this.props.dashBoardAnimatedValue._value >= 0);
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
            current = {}
        } = this.props;

        let locationText = `${location.name}, ${location.country}`;
        let fontSize = this.getRealFont(locationText);
        let locationFontStyle = {
            fontSize: fontSize
        };

        const condText = current.condition && current.condition.text || '';

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
                    <TouchableOpacity onPress={this.onTouchablePress}>
                        <View>
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
                        </View>
                    </TouchableOpacity>
                    <TopBottomPart/>
                </View>
            </View>
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
        fontSize     : 90,
        lineHeight   : 80,
        paddingBottom: 5,
    },
    tempTextDimension: {
        marginLeft: -7,
        fontSize  : 70,
        lineHeight: 75
    },
    conditionText    : {
        paddingTop: 5,
        fontSize  : 21
    }
});
