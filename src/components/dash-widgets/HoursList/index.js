'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import {connect} from 'react-redux'

import HourLine from '../bigWeather';

const deviceScreen = Dimensions.get('window');

@connect(store => {
    return {...store.calendar}
})

export default class TopContainer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        let sourceHourLines = this.props.calendar.hoursDataSource;

        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={styles.container}
            >
                {sourceHourLines.map((element, index) => (
                    <HourLine
                        hour={element}
                        key={index}
                        style={styles.line}
                    />))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex         : 1,
        zIndex       : 5,
        flexDirection: 'column',
        minHeight    : deviceScreen.height,
        width        : deviceScreen.width,

    },
    line     : {
        flex: 1
    }
});