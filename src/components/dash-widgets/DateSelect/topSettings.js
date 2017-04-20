'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    TextInput,
    ActivityIndicator
} from 'react-native';

import CustomButton from '../../Button';

import {connect} from 'react-redux';
import * as dsActions from '../../../actions/dateSelectActions';
import * as weatherActions from '../../../actions/weatherActions';
import * as weatherApi from '../../../helpers/weatherAPI';


@connect(store => {
        return {...store.dateSelect, ...store.weather}
    }
)

export default class PictureTop extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cityText : '',
            animating: false
        };

        this.onChangeText = this._onChangeText.bind(this);
        this.search = this._search.bind(this);
    }

    _onChangeText(text) {
        this.setState({
            cityText: text
        });
    }

    _search() {
        this.setState({animating: true});
        weatherApi.initForecast(this.state.cityText, r => {
            this.setState({animating: false});
            if (!r.error) {
                this.props.dispatch(weatherActions.setWeather(r));
            }
        });
    }

    render() {
        const {height} = this.props;

        return (
            <View
                style={{
                    flex           : 1,
                    flexDirection  : 'row',
                    maxHeight      : height,
                    backgroundColor: '#333333',
                }}
            >
                <ActivityIndicator
                    color={'#ff5843'}
                    style={{opacity: this.state.animating ? 1.0 : 0.0}}
                    size={'large'}
                />
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
                    value={this.state.cityText}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.search}
                />
                <CustomButton
                    onButtonClick={() => {
                        this.search();
                        this.props.dispatch(dsActions.setVisibleState(true));
                    }}
                    iconCtrueolor="white"
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