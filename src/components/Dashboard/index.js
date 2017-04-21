'use strict';

import React from 'react';
import {StyleSheet, View} from 'react-native';

import Top from './top';
import Bottom from './bottom';

export default class extends React.Component {
    render() {
        return (
            <View
                style={styles.container}
            >
                <Top/>
                <Bottom/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#ffffff',
        width          : null,
        height         : null,
        justifyContent : 'space-between'
    }
});