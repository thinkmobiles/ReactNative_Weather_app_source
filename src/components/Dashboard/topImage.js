'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {getImages} from '../../images/topImages';

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
        let code = this.props.current.condition.code;
        let imagesArray = getImages(1003);

        return (
            <View style={styles.container}>
                <View style={{flex: 1}}>
                    {imagesArray[1] && imagesArray[1](width)}
                </View>
                {imagesArray[0](width)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display      : 'flex',
        flex         : 1,
        flexDirection: 'column'
    }
});
