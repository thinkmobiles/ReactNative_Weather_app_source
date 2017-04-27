'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import Top from './top';
import Bottom from './bottom';
import TopImage from './topImage';

import {getProps} from '../../helpers/getWeatherProps';

import {
    StyleSheet,
    View,
    Text,
    Navigator,
    Dimensions,
    Animated
} from 'react-native';

const deviseScreen = Dimensions.get('window');

@connect((store) => {
    return {
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            margin: new Animated.Value(1)
        };

        this.changeMargin = this._changeMargin.bind(this);
    }

    _changeMargin(margin) {
        this.state.margin.setValue(margin);
    }

    render() {
        let code = this.props.current.condition.code;
        let {images, gradientImage} = getProps(code);

        gradientImage.style = styles.gradient;

        return (
            <View style={styles.fullScreen}>
                <LinearGradient
                    {...gradientImage}
                >
                    <TopImage
                        images={images}
                    />
                </LinearGradient>
                <Animated.View style={[styles.contentSection, {marginBottom: this.state.margin}]}>
                    <Top
                        navigator={this.props.navigator}
                        changeMargin={this.changeMargin}
                        indexState={this.state}
                    />
                    <Bottom/>
                </Animated.View>
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
