import React, {Component} from 'react';

import {connect} from 'react-redux';

import {
    View,
    TextInput,
    Button,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    BackAndroid
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {getCities, initForecast} from '../helpers/weatherAPI';

const COLOR_IND_LONG = '#0054ff';
const COLOR_IND_SHORT = '#ff5843';
const COLOR_TOP_SEARCH = "#1cd6ff";

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
                color    : COLOR_IND_SHORT
            },
            infoMsg  : ""
        };

        this.onChangeText = this._onChangeText.bind(this);
        this.renderItem = this._renderItem.bind(this);
        this.onItemPress = this._onItemPress.bind(this);
        this.onBackPress = this._onBackPress.bind(this);
        this.search = this._search.bind(this);

        BackAndroid.addEventListener("hardwareBackPress", this.onBackPress);
    }

    _onBackPress() {
        this.props.navigator.replace({id: 'index'});
        return true;
    }

    _search() {
        const msg = "No cities found";
        if (this.state.text.length < 3) {
            this.setState({
                infoMsg: "type more than 3 symbols"
            });
            return;
        }

        this.setState({
            indicator: {
                animating: true,
                color    : COLOR_IND_SHORT
            }
        });

        getCities(this.state.text, r => {
            let cities = r && !r.error ? r : [];
            this.setState({
                cities   : cities,
                indicator: {
                    animating: false
                },
                infoMsg  : msg
            });
        });
    }

    _onItemPress(item) {
        this.setWeather(item.name);
    }

    setWeather(query) {
        this.setState({
            indicator: {
                animating: true,
                color    : COLOR_IND_LONG
            }
        });

        initForecast(query, r => {
            this.props.dispatch(setWeather(r));
            this.props.navigator.replace({id: "index"});
        });
    }

    _onChangeText(text) {
        this.setState({
            text: text
        });
    }

    _renderItem({item}) {
        return (
            <TouchableOpacity
                onPress={() => this.onItemPress(item)}
                style={{}}
            >
                <Text
                    style={{fontSize: 17}}
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    render() {
        const cities = this.state.cities.map((item, index) => {
            return {...item, key: `item-${index}`}
        });


        const bottomComponent = cities.length ? (
            <FlatList
                style={{flex: 1}}
                data={cities}
                renderItem={this.renderItem}
            />) : (
            <View>
                <Text>
                    {this.state.infoMsg}
                </Text>
            </View>);

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{
                    flex           : 1,
                    flexDirection  : 'row',
                    maxHeight      : 42,
                    backgroundColor: COLOR_TOP_SEARCH
                }}>
                    <Button
                        title="Back"
                        onPress={this.onBackPress}
                        color={COLOR_TOP_SEARCH}
                    />

                    <TextInput
                        style={{
                            flex : 1,
                            color: "#fff"
                        }}
                        value={this.state.text}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.search}
                    />
                    <Button
                        title="Search"
                        onPress={this.search}
                        color={COLOR_TOP_SEARCH}
                        style={{
                            flex: 1
                        }}
                    />
                </View>
                {this.state.indicator.animating && <ActivityIndicator
                    color={this.state.indicator.color}
                    size={'large'}
                />}
                {bottomComponent}
            </View>)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackPress);
    }
}