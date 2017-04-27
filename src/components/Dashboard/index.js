'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import Top from './top';
import Bottom from './bottom';
import TopImage from './topImage';

import {mapCode, getGradColors} from '../../svgs_converted/topImageElements/';

import {StyleSheet, View, Text, Navigator, Dimensions} from 'react-native';

const deviseScreen = Dimensions.get('window');

@connect((store) => {
    return {
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let code = this.props.current.condition.code;
        let weather = mapCode(code);
        let gradColors = getGradColors(code);

        let gradientProps = {
            style: styles.gradient
        };

        gradColors[1] = '#fff';

        gradientProps.colors = gradColors;

        if (weather === 'cloud') {
            gradientProps.colors = gradientProps.colors.reverse();
            gradientProps.start = {x: -0.3, y: 0};
            gradientProps.end = {x: 0.7, y: 1};
            gradientProps.locations = [0, 0.4]
        }

        return (
            <View style={styles.fullScreen}>
                <LinearGradient
                    {...gradientProps}
                >
                    <TopImage />
                </LinearGradient>
                <View style={styles.contentSection}>
                    <Top navigator={this.props.navigator}/>
                    <Bottom/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullScreen    : {
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'white'
    },
    gradient      : {
        height  : deviseScreen.height * 0.76,
        position: 'absolute',
        overflow: 'hidden',
        top     : 0,
        left    : 0,
        right   : 0,
        zIndex  : 1
    },
    contentSection: {
        flex    : 1,
        position: 'relative',
        zIndex  : 2
    }
});
