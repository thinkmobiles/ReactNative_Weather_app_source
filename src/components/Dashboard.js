'use strict';

import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Animated
} from 'react-native';

import DateSelect from './dash-widgets/DateSelect/';
import HoursList from './dash-widgets/HoursList/';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <DateSelect/>
                <HoursList/>
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