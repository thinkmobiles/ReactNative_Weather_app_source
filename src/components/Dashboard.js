'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    Text
} from 'react-native';

import DateSelect from './dash-widgets/DateSelect/';
import HoursList from './dash-widgets/HoursList/';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        console.log(this.props);
    }

    render() {
        return (
            <View style={{
                flex           : 1,
                backgroundColor: '#fff73f',
                width          : null,
                height         : null,
                justifyContent : 'space-between'
            }}>
                <DateSelect/>
                <HoursList/>
            </View>
        );
    }
}