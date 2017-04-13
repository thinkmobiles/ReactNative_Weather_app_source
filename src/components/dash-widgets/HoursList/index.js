'use strict';

import React, {
    Component,
} from 'react';

import {
    View
} from 'react-native';

export default class TopContainer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{
                flex           : 1,
                flexDirection  : 'row',
                zIndex: 5
            }}>
            </View>
        );
    }
}    