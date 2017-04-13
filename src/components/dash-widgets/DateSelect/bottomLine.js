'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

import CustomButton from '../../Button';

import {connect} from 'react-redux';
import * as dsActions from '../../../actions/dateSelectActions';

// import IconI from 'react-native-vector-icons/MaterialIcons';

@connect(store => {
    return {...store.dateSelect};
})

export default class PictureTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let size = this.props.height;

        return (
            <View
                style={{
                    flex         : 1,
                    flexDirection: 'row',
                    maxHeight    : size
                }}
            >
                <CustomButton
                    onButtonClick={() => {
                        this.props.dispatch(dsActions.setVisibleState(true));
                    }}
                    iconColor="white"
                    touchableStyle={{
                        width          : size,
                        height         : size,
                        alignSelf      : 'flex-start',
                        backgroundColor: '#333333',
                        zIndex         : 11
                    }}
                />
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text>Something</Text>
                </View>
            </View>
        );
    }
}