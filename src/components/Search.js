import React, {Component} from 'react';

import {debounce} from 'lodash';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import {
    View,
    TextInput,
    Button,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    BackAndroid,
    StyleSheet
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {getCities, initForecast} from '../helpers/weatherAPI';

const COLOR_IND_LONG = '#0054ff';
const COLOR_IND_SHORT = '#ff5843';
const COLOR_TOP_SEARCH = '#1cd6ff';
const colorsDict = {

}
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
            infoMsg  : ''
        };

        this.onChangeText = this._onChangeText.bind(this);
        this.renderItem = this._renderItem.bind(this);
        this.onItemPress = this._onItemPress.bind(this);
        this.onBackPress = this._onBackPress.bind(this);
        this.search = this._search.bind(this);

        this.debounceSearch = debounce((text) => {
            this._search(text);
        }, 500);

        BackAndroid.addEventListener('hardwareBackPress', this.onBackPress);
    }

    _onBackPress() {
        this.props.navigator.replace({id: 'Dashboard'});
        return true;
    }

    _onChangeText(text) {
        this.setState({
            text: text
        });
        this.debounceSearch(text);
    }

    _onItemPress(item) {
        this.setWeather(item.name);
    }

    _search(text) {
        if (text.length < 3) {
            this.setState({
                infoMsg: 'type 3 or more symbols'
            });
            return;
        }

        this.setState({
            indicator: {
                animating: true,
                color    : COLOR_IND_SHORT
            }
        });

        getCities(text, r => {
            let cities = r && !r.error ? r : [];
            this.setState({
                cities   : cities,
                indicator: {
                    animating: false
                },
                infoMsg  : 'no cities found'
            });
        });
    }

    _renderItem({item}) {
        return (
            <TouchableHighlight
                underlayColor={COLOR_TOP_SEARCH}
                onPress={() => this.onItemPress(item)}
                style={{
                    flex         : 1,
                    paddingLeft  : 12,
                    paddingRight : 8,
                    paddingTop   : 6,
                    paddingBottom: 6
                }}
            >
                <Text
                    style={{fontSize: 16}}
                >
                    {item.name}
                </Text>
            </TouchableHighlight>
        )
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
            this.props.navigator.replace({id: 'Dashboard'});
        });
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
                keyboardShouldPersistTaps="always"
            />) : (
            <View style={styles.infoMsg}
            >
                <Text
                    style={styles.infoMsgText}
                >
                    {this.state.infoMsg}
                </Text>
            </View>);

        return (
            <View
                style={{
                    flex         : 1,
                    flexDirection: 'column'
                }}
            >

                <LinearGradient
                    colors={['red','blue']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={{
                        flex         : 1,
                        flexDirection: 'row',
                        maxHeight    : 42
                    }}>
                    <TouchableOpacity>
                        <Button
                            title='Back'
                            onPress={this.onBackPress}
                            color={COLOR_TOP_SEARCH}
                        />
                    </TouchableOpacity>
                    <TextInput
                        ref="textInput"
                        style={{
                            flex : 1,
                            color: '#fff'
                        }}
                        value={this.state.text}
                        onChangeText={this.onChangeText}
                        underlineColorAndroid={"#fff"}
                    />
                </LinearGradient>

                {this.state.indicator.animating && <ActivityIndicator
                    color={this.state.indicator.color}
                    size={'large'}
                />}
                {bottomComponent}
            </View>)
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackPress);
    }
}


const styles = StyleSheet.create({
    infoMsg       : {
        flex          : 1,
        flexDirection : 'row',
        justifyContent: 'center',
        paddingTop    : 24
    },
    infoMsgText   : {
        fontSize: 18
    },
    linearGradient: {
        flex        : 1,
        paddingLeft : 15,
        paddingRight: 15,
        borderRadius: 5
    }
});
