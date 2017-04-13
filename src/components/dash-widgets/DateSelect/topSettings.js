'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';

import CustomButton from '../../Button';

import {connect} from 'react-redux';
import * as dsActions from '../../../actions/dateSelectActions';

@connect(store => {
    return {...store.dateSelect};
})

export default class PictureTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {height} = this.props

        return (
            <View
                style={{
                    flex           : 1,
                    flexDirection  : 'row',
                    maxHeight      : height,
                    backgroundColor: '#333333',
                }}
            >
                <TextInput
                    style={{
                        flex    : 1,
                        margin  : 10,
                        color   : 'white',
                        fontSize: 17
                    }}

                    placeholderTextColor='white'
                    underlineColorAndroid='white'
                    placeholder={'Type your city'}
                />
                <CustomButton
                    onButtonClick={() => {
                        this.props.dispatch(dsActions.setVisibleState(true));
                    }}
                    iconColor="white"
                    iconName="search"
                    touchableStyle={{
                        width          : height,
                        height         : height,
                        alignSelf      : 'flex-start',
                        backgroundColor: '#333333',
                        zIndex         : 11
                    }}
                />
            </View>
        );
    }
}