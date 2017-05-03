'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

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
        let originImages = this.props.images || {};

        let topImagesComponents;

        let {images = originImages.top, convertToWhite = false} = originImages.top;

        if (images && images.length) {
            topImagesComponents = images.map((image, index) => {
                let {element = image, translate} = image;

                return element(width, index, styles.topSvgStyle, convertToWhite, translate);
            })
        }

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {topImagesComponents}
                </View>
                {originImages.bottom(width, styles.bottomSvgStyle)}
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
