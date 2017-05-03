'use strict';

import React from 'react';

import {debounce} from 'lodash';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import Top from './top';
import Bottom from './bottom';
import TopImage from './topImage';

import {setWeather} from '../../actions/weatherActions';
import {getCities, initForecast} from '../../helpers/weatherAPI';
import {getProps} from '../../helpers/getWeatherProps';

import Icon from '../Icons';

import {
    Platform,
    StyleSheet,
    View,
    Text,
    Dimensions,
    Animated,
    PanResponder,
    Modal,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    FlatList,
    TouchableHighlight,
    Keyboard,
    BackAndroid
} from 'react-native';

const {height} = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

@connect((store) => {
    return {
        ...store.weather.weather,
        ...store.customVars.customVars
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            margin      : this.props.dashBoardAnimatedValue,
            text        : '',
            cities      : [],
            loaderShow  : false,
            infoMsg     : '',
            modalVisible: false
        };

        let code = this.props.current.condition.code;
        let {gradientSearch} = getProps(code);
        this.gradColors = gradientSearch;

        this.onChangeText = this._onChangeText.bind(this);
        this.renderItem = this._renderItem.bind(this);
        this.onItemPress = this._onItemPress.bind(this);
        this.onBackPress = this._onBackPress.bind(this);
        this.search = this._search.bind(this);
        this.setModalVisible = this._setModalVisible.bind(this);

        this.debounceSearch = debounce((text) => {
            this._search(text);
        }, 500);

        BackAndroid.addEventListener('hardwareBackPress', this.onBackPress);

        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => {
                const {pageY} = e.nativeEvent;

                this.startY = pageY;
                return true
            },
            onPanResponderMove          : (e, gestureState) => {
                const {pageY} = e.nativeEvent;
                let maxMargin = height * 0.32;
                let diff;

                diff = pageY - this.startY;

                if (diff < 0 && maxMargin - gestureState.dy >= 0) {
                    return this.state.margin.setValue(-maxMargin - gestureState.dy);
                } else if (diff > 0 && gestureState.dy <= maxMargin) {
                    return this.state.margin.setValue(-gestureState.dy);
                }
            },
            onPanResponderRelease       : (e) => {
                const {pageY} = e.nativeEvent;

                let end = (pageY > this.startY) ? -(height * 0.32) : 0;

                Animated.spring(
                    this.state.margin,
                    {toValue: end}
                ).start();
            },
        });

        this.changeMargin = this._changeMargin.bind(this);
    }

    _changeMargin(margin) {
        this.state.margin.setValue(margin);
    }

    _onBackPress() {
        this.setModalVisible(false);
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
            loaderShow: true,
            infoMsg   : ''
        });

        getCities(text, r => {
            let cities = r && !r.error ? r : [];
            this.setState({
                cities    : cities,
                loaderShow: false,
                infoMsg   : 'no cities found'
            });
        });
    }

    _renderItem({item}) {
        return (
            <TouchableHighlight
                underlayColor={this.gradColors[1]}
                onPress={() => this.onItemPress(item)}
                style={styles.listItem}
            >
                <Text
                    style={styles.listItemText}
                >
                    {item.name}
                </Text>
            </TouchableHighlight>
        )
    }

    setWeather(query) {
        Keyboard.dismiss();

        this.setState({
            loaderShow: true
        });

        initForecast(query, r => {
            this.props.dispatch(setWeather(r));
            this.setState({
                loaderShow: false,
                text      : '',
                infoMsg   : '',
                cities    : []
            });
            this.setModalVisible(false);
        });
    }

    _setModalVisible(state) {
        this.setState({
            modalVisible: state
        });
    }

    render() {
        let code = this.props.current.condition.code;
        let {images, gradientImage} = getProps(code);

        gradientImage.style = styles.gradient;

        const cities = this.state.cities.map((item, index) => {
            return {...item, key: `item-${index}`}
        });

        const bottomComponent = cities.length ? (
            <FlatList
                style={styles.list}
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
            <View>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={this.onBackPress}
                >
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
                                underlineColorAndroid={"transparent"}
                                placeholder={"Enter your location"}
                                placeholderTextColor={'#e3e3e3'}
                            />
                            {this.state.loaderShow && <ActivityIndicator
                                color={this.gradColors[0]}
                                size={'large'}
                            />}
                        </LinearGradient>

                        {bottomComponent}
                    </View>
                </Modal>
                <Animated.View
                    {...this.state.panResponder.panHandlers}
                    style={[styles.fullScreen, {marginBottom: this.state.margin}]}>
                    <Animated.View
                        style={[styles.gradientContainer, {bottom: this.state.margin}]}>
                        <LinearGradient
                            {...gradientImage}
                        >
                            <TopImage
                                images={images}
                            />
                        </LinearGradient>
                    </Animated.View>
                    <View style={[styles.contentSection]}>
                        <Top
                            changeMargin={this.changeMargin}
                            setModalVisible={this.setModalVisible}
                        />
                        <Bottom />
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fullScreen       : {
        paddingTop     : isIos ? 20 : 0,
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'white',
        minHeight      : height
    },
    gradientContainer: {
        position    : 'absolute',
        overflow    : 'hidden',
        marginBottom: height * 0.2,
        top         : 0,
        left        : 0,
        right       : 0,
        maxHeight   : height * 1.3,
        minHeight   : height,
        zIndex      : 1
    },
    gradient         : {
        flex: 1
    },
    contentSection   : {
        flex    : 1,
        position: 'relative',
        zIndex  : 2
    },
    infoMsg          : {
        flex          : 1,
        flexDirection : 'row',
        justifyContent: 'center',
        paddingTop    : 26
    },
    infoMsgText      : {
        fontSize: 18
    },
    list             : {flex: 1},
    listItem         : {
        flex         : 1,
        paddingLeft  : 22,
        paddingRight : 22,
        paddingTop   : 13,
        paddingBottom: 13
    },
    listItemText     : {
        fontSize  : 20,
        color     : '#8f8f8f',
        fontFamily: 'Muli-Regular'
    },
    mainView         : {
        flex         : 1,
        flexDirection: 'column'
    },
    textInput        : {
        flex      : 1,
        color     : '#fff',
        fontFamily: 'Muli-Bold',
        fontSize  : isIos ? 16 : 20
    },
    topBar           : {
        flex         : 1,
        flexDirection: 'row',
        alignItems   : 'center',
        paddingTop   : isIos ? 20 : 0,
        maxHeight    : isIos ? 92 : 72
    }
});
