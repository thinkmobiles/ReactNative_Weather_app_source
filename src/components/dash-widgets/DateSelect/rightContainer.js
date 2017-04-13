import React, {
    Component,
} from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import CustomButton from '../../Button';

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
                    Month will be here
                </Text>
                <CustomButton
                    onButtonClick={this.props.onMenuClick}
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