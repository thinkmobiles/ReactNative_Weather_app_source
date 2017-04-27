'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {View, Text, StyleSheet, Dimensions} from 'react-native';

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
        let {width} = Dimensions.get('window');
        let images = this.props.images || {};

        let topImages;

        if (images.top && images.top.length) {
            topImages = images.top.map((element, index) => {
                return element(width, index, styles.topSvgStyle);
            })
        }

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {topImages}
                </View>
                {images.bottom(width, styles.bottomSvgStyle)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container     : {
        display      : 'flex',
        flex         : 1,
        flexDirection: 'column'
    },
    bottomSvgStyle: {
        flex        : 1,
        alignSelf   : 'flex-end',
        marginBottom: -1
    },
    topSvgStyle   : {
        flex     : 1,
        alignSelf: 'flex-start',
        position : 'absolute'
    }
});
