'use strict';

import React, {
    Component,
} from 'react';

import {
    View
} from 'react-native';

import CustomButton from '../../Button';

export default class TopContainer extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{
                flex           : 0.9,
                flexDirection  : 'row',
                backgroundColor: '#fff'
            }}>
                <CustomButton
                    iconColor="white"
                    touchableStyle={{
                        width          : 60,
                        height         : 60,
                        alignSelf      : 'flex-start',
                        backgroundColor: '#333'
                    }}
                />
            </View>
        );
    }
}    