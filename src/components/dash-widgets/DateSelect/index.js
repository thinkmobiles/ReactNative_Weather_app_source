'use strict';

import React, {
    Component,
} from 'react';

import Left from './leftList';
import Right from './rightContainer';

import {
    Text,
    View
} from 'react-native';

export default class TopContainer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{
                flex           : 1.1,
                flexDirection  : 'row',
                backgroundColor: '#333333'
            }}>
                <Left/>
                <Right/>
            </View>
        );
    }
}    