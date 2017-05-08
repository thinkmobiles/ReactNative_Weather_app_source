'use strict';

import React from 'react';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';

import Top from './top';
import Bottom from './bottom';
import TopImage from './topImage';
import Search from '../Search';
import Refresh from '../RefreshElement';

import {getProps} from '../../helpers/getWeatherProps';

import {
    Platform,
    StyleSheet,
    View,
    Dimensions,
    Animated,
    PanResponder,
    Modal,
    Text
} from 'react-native';

const {height} = Dimensions.get('window');
const isIos = Platform.OS === 'ios';

const refreshHeight = 40;

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
            modalVisible: false
        };

        this.modalAnimType = isIos ? 'slide' : 'fade';

        this.scrollTo = this._scrollTo.bind(this);
        this.setModalVisible = this._setModalVisible.bind(this);

        this.collapsed = false;

        this.state.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e) => {
                const {pageY} = e.nativeEvent;

                this.startY = pageY;

                return true;
            },
            onPanResponderMove          : (e, gestureState) => {
                const {pageY} = e.nativeEvent;
                const {dy} = gestureState;
                const collapsedState = this.collapsed;

                let maxMargin = height * 0.32;
                let diff;

                diff = pageY - this.startY;

                if (diff < 0 && !collapsedState && (-maxMargin - dy <= 0)) {
                    return this.state.margin.setValue(-maxMargin - dy);
                } else if (diff > 0 && collapsedState && (dy <= maxMargin)) {
                    return this.state.margin.setValue(-dy);
                } else if (pageY > this.startY && !collapsedState) {
                    return this.refreshElement.handleScroll(dy);
                }
            },
            onPanResponderRelease       : (e) => {
                const {pageY} = e.nativeEvent;
                let direction = (pageY > this.startY ? height : 0);

                this.refreshElement.handleRelease();

                this.scrollTo(direction);
            },
        });
    }

    _scrollTo(direction) {
        let checkState = typeof direction !== 'undefined' ? direction : this.collapsed;
        let end = checkState ? -(height * 0.32) : 0;

        this.collapsed = !end;

        if (this.state.margin._value !== end) {
            Animated.spring(
                this.state.margin,
                {
                    toValue: end
                }
            ).start();
        }
    }

    _setModalVisible(state) {
        this.setState({
            modalVisible: state
        });
    }

    componentWillMount() {
        this.scrollTo(1);
    }

    render() {
        let code = this.props.current.condition.code;
        let {images, gradient: {background}} = getProps(code);

        background.style = styles.gradient;

        return (
            <View>
                <Modal
                    animationType={this.modalAnimType}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}
                >
                    <Search setModalVisible={this.setModalVisible}/>
                </Modal>
                <Refresh
                    ref={(component) => {
                        this.refreshElement = component
                    }}
                    height={refreshHeight}
                />
                <Animated.View
                    {...this.state.panResponder.panHandlers}
                    style={[styles.fullScreen, {marginBottom: this.state.margin}]}>
                    <Animated.View
                        style={[styles.gradientContainer, {bottom: this.state.margin}]}>
                        <LinearGradient
                            {...background}
                        >
                            <TopImage
                                images={images}
                            />
                        </LinearGradient>
                    </Animated.View>
                    <View style={[styles.contentSection]}>
                        <Top
                            setModalVisible={this.setModalVisible}
                            scrollTo={this.scrollTo}
                        />
                        {this.props.forecast && <Bottom />}
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
    }
});
