import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
    View,
    TextInput,
    Button,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {getCities, initForecast} from '../helpers/weatherAPI';

@connect((store) => {
    return {...store.weather.weather};
})
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text     : '',
            cities   : [],
            indicator: {
                animating: false,
                color    : '#ff5843'
            }
        };

        this.onButtonPress = this._onButtonPress.bind(this);
        this.onChangeText = this._onChangeText.bind(this);
        this.renderItem = this._renderItem.bind(this);
        this.onItemPress = this._onItemPress.bind(this);
    }

    _onButtonPress() {
        this.setWeather(this.state.text);
    }

    _onItemPress(item) {
        this.setWeather(item.name);
    }

    setWeather(query) {
        this.setState({
            indicator: {
                animating: true,
                color    : '#0054ff'
            }
        });
        initForecast(query, r => {
            this.props.dispatch(setWeather(r));
            this.props.navigator.replace({id: "index"});
        });
    }

    _onChangeText(text) {
        const self = this;

        if (text.length < 3) {
            this.setState({
                text: text,
            });
            return;
        }

        this.setState({
            text     : text,
            indicator: {
                animating: true,
                color    : '#ff5843'
            }
        });

        getCities(text, r => {
            let cities = r && !r.error ? r : [];
            self.setState({
                cities   : cities,
                indicator: {
                    animating: false
                }
            });
        });
    }

    _renderItem({item}) {
        return <TouchableOpacity onPress={() => this.onItemPress(item)}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    }

    render() {
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <View style={{flex: 0.1, flexDirection: 'row'}}>
                <ActivityIndicator
                    color={this.state.indicator.color}
                    style={{opacity: this.state.indicator.animating ? 1.0 : 0.0}}
                    size={'large'}
                />
                <TextInput
                    style={{flex: 0.7}}
                    value={this.state.text}
                    onChangeText={this.onChangeText}
                />
                <Button
                    style={{flex: 1}}
                    title="Done"
                    onPress={this.onButtonPress}
                />
            </View>
            <FlatList
                style={{flex: 1}}
                data={this.state.cities.map((item, index) => {
                    return {...item, key: `item-${index}`}
                })}
                renderItem={this.renderItem}
            />
        </View>
    }
}