import React, {Component} from 'react';

import {debounce} from 'lodash';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import {
    Platform,
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    BackAndroid,
    StyleSheet,
    Keyboard,
    Alert
} from 'react-native';

import {setWeather} from '../actions/weatherActions';
import {getCities, initForecast} from '../helpers/weatherAPI';
import {getProps} from '../helpers/getWeatherProps';

import Icon from './Icons';

const isIos = Platform.OS === 'ios';

@connect((store) => {
    return {...store.weather.weather};
})
export default class Search extends Component {
    constructor(props) {
        super(props);

        let code = this.props.current.condition.code;
        let {gradient: {search}} = getProps(code);
        this.gradColors = search;

        this.state = {
            text      : '',
            cities    : [],
            loaderShow: false,
            infoMsg   : ''
        };

        this.onBackPress = this._onBackPress.bind(this);
        this.onChangeText = this._onChangeText.bind(this);
        this.onItemPress = this._onItemPress.bind(this);
        this.onSubmitEditing = this._onSubmitEditing.bind(this);
        this.search = this._search.bind(this);
        this.renderItem = this._renderItem.bind(this);

        this.debounceSearch = debounce((text) => {
            this._search(text);
        }, 500);

        BackAndroid.addEventListener('hardwareBackPress', this.onBackPress);
    }

    _onBackPress() {
        this.props.setModalVisible(false);
        return true;
    }

    _onChangeText(text) {
        if (text.length < 3) {
            this.setState({
                text      : text,
                cities    : [],
                infoMsg   : 'type 3 or more symbols',
                loaderShow: false
            });
        } else {
            this.setState({
                text: text
            });
            this.debounceSearch(text);
        }
    }

    _onItemPress(item) {
        this.setWeather(item.name);
    }

    _onSubmitEditing() {
        if (this.state.text.length >= 3) {
            this.debounceSearch(this.state.text);
        }
    }

    _search(text) {
        this.setState({
            loaderShow: true,
            infoMsg   : ''
        });

        getCities(text, (err, r) => {
            let cities = [];
            let infoMsg = 'no cities found';

            if (err) {
                infoMsg = 'Request failed. Please, check your connection and try again.'
            } else if (!r.error) {
                cities = r;
            }

            this.setState({
                cities    : cities,
                loaderShow: false,
                infoMsg   : infoMsg
            });
        });
    }

    setWeather(query) {
        Keyboard.dismiss();

        this.setState({
            loaderShow: true
        });

        initForecast(query, (err, response) => {
            this.setState({
                loaderShow: false
            });
            if (err) {
                Alert.alert(
                    'Error',
                    `Can't fetch weather. Please try later.`,
                    [
                        {text: 'OK'},
                    ],
                    {cancelable: false}
                );
            }
            else {
                this.props.setModalVisible(false);
                this.props.dispatch(setWeather(response));
            }
        });
    }

    _renderItem({item}) {
        return (
            <TouchableHighlight
                underlayColor={this.gradColors[1]}
                onPress={() => this.onItemPress(item)}
                style={styles.listItem}
            >
                <Text style={styles.listItemText}>
                    {item.name}
                </Text>
            </TouchableHighlight>
        )
    }

    render() {
        const cities = this.state.cities.map((item, index) => {
            return {
                name: item.name,
                key : `item-${index}`
            }
        });

        const bottomComponent = cities.length ? (
            <FlatList
                style={styles.list}
                data={cities}
                renderItem={this.renderItem}
                keyboardShouldPersistTaps="always"
            />) : (
            <View style={styles.infoMsg}>
                <Text style={styles.infoMsgText}>
                    {this.state.infoMsg}
                </Text>
            </View>);
        return (
            <View
                style={styles.mainView}
            >

                <LinearGradient
                    colors={this.gradColors}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.topBar}>
                    <TouchableOpacity
                        onPress={this.onBackPress}
                    >
                        <Icon
                            name="back"
                            height={isIos ? 42 : 52}
                            width={isIos ? 40 : 50}
                            fill="white"
                            stroke="none"
                        />
                    </TouchableOpacity>
                    <TextInput
                        ref={textInput => {
                            this.textInput = textInput;
                        }}
                        style={styles.textInput}
                        value={this.state.text}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEditing}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Enter your location'}
                        placeholderTextColor={'#e3e3e3'}
                        returnKeyType={'search'}
                    />
                    {this.state.loaderShow && <ActivityIndicator
                        color={this.gradColors[0]}
                        size={'large'}
                        style={styles.indicator}
                    />}
                </LinearGradient>

                {bottomComponent}
            </View>)
    }

    componentDidMount() {
        this.textInput.focus();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackPress);
    }
}

const styles = StyleSheet.create({
    indicator   : {
        marginRight: 10
    },
    infoMsg     : {
        flex          : 1,
        flexDirection : 'row',
        justifyContent: 'center',
        paddingTop    : 26,
        marginLeft    : 15,
        marginRight   : 15
    },
    infoMsgText : {
        fontSize: 18
    },
    list        : {flex: 1},
    listItem    : {
        flex         : 1,
        paddingLeft  : 22,
        paddingRight : 22,
        paddingTop   : 13,
        paddingBottom: 13
    },
    listItemText: {
        fontSize  : 20,
        color     : '#8f8f8f',
        fontFamily: 'Muli-Regular'
    },
    mainView    : {
        flex         : 1,
        flexDirection: 'column'
    },
    textInput   : {
        flex      : 1,
        color     : '#fff',
        fontFamily: 'Muli-SemiBold',
        fontSize  : isIos ? 16 : 20
    },
    topBar      : {
        flex         : 1,
        flexDirection: 'row',
        alignItems   : 'center',
        paddingTop   : isIos ? 20 : 0,
        maxHeight    : isIos ? 92 : 72
    }
});
