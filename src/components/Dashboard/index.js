'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {StyleSheet, View, Navigator, Image} from 'react-native';

import Top from './top';
import Bottom from './bottom';

import {getImage} from '../../images/topImages';

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
        return (
            <Image source={getImage(this.props.current.condition.code)} style={styles.container}>
                <Top navigator={this.props.navigator}/>
                <Bottom/>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'transparent'
    }
});
