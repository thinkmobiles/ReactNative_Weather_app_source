import React, {
    Component,
} from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import Top from './top';
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
                <Top/>
                <CustomButton
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