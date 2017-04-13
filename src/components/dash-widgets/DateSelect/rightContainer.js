import React, {
    Component,
} from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';
import * as dsActions from '../../../actions/dateSelectActions';

import CustomButton from '../../Button';
import SmallWeather from '../smallWeather';

@connect(store => {
    return {...store.dateSelect, ...store.calendar};
})

export default class RightComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={{
                    flex          : 1,
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{
                    padding : 12,
                    fontSize: 25,
                    color   : '#fff'
                }}>
                    {this.props.calendar.checkedElement.momentDate.format('MMMM')}
                </Text>

                <SmallWeather/>

                <CustomButton
                    onButtonClick={() => {
                        this.props.dispatch(dsActions.setVisibleState(false));
                    }}
                    iconColor="#777"
                    touchableStyle={{
                        justifyContent : 'center',
                        width          : 60,
                        height         : 60,
                        alignSelf      : 'flex-end',
                        backgroundColor: '#fff'
                    }}
                />
            </View>
        );
    }
}