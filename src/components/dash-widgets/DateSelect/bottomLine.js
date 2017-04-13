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

@connect(store => {
    return {...store.dateSelect, ...store.weather, ...store.calendar};
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
                        flex           : 1,
                        backgroundColor: 'white',
                        opacity        : 0.5
                    }}
                >
                    <Text
                        style={{
                            flex    : 2,
                            margin  : 7,
                            fontSize: 18,
                            opacity : 1,
                            color   : '#000'
                        }}
                    >
                        {this.props.weather.location.name}
                    </Text>
                    <Text
                        style={{
                            flex    : 1,
                            margin  : 2,
                            fontSize: 12,
                            opacity : 1,
                            color   : '#000'
                        }}
                    >
                        {this.props.calendar.checkedElement.momentDate.format('dddd DD.MM.YYYY')}
                    </Text>
                </View>
            </View>
        );
    }
}