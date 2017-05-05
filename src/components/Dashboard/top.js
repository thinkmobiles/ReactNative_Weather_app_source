'use strict';

import React from 'react';
import {connect} from 'react-redux';

import Icon from '../Icons';
import TopBottomPart from './topBottomPart';

import {
    Platform,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const {width} = Dimensions.get('window');
const locationDefFont = 19;
const isIos = Platform.OS === 'ios';

@connect((store) => {
    return {
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.onLocationPress = this._onLocationPress.bind(this);
        this.onTouchablePress = this._onTouchablePress.bind(this);
    }

    _onLocationPress() {
        this.props.setModalVisible(true);
    }

    _onTouchablePress() {
        return this.props.scrollTo();
    }

    getRealFont(text) {
        const length = text.length;

        let fontSize = locationDefFont;
        let width = () => {
            return length / 2 * fontSize * 0.7;
        };

        while (width() > width - 40) {
            fontSize -= 2;
        }

        return fontSize;
    }

    render() {
        const {
            location,
            current,
            forecast
        } = this.props;

        let locationText = location ? `${location.name}, ${location.country}` : 'Change location';
        let fontSize = this.getRealFont(locationText);
        let locationFontStyle = {
            fontSize: fontSize
        };

        const condText = current.condition && current.condition.text || 'No location selected';

        return (
            <View
                style={styles.topSection}
            >
                <View onResponderTerminate={() => false} style={styles.innerContainer}>
                    <View onPress={this.onLocationPress} style={styles.locationBlock}>
                        <View style={{alignSelf: 'flex-start'}}>
                            <Icon
                                name="location"
                                height={fontSize}
                                width={fontSize}
                                fill="transparent"
                                stroke="#fff"
                                strokeWidth="1"
                            />
                        </View>
                        <Text style={[styles.headerText, styles.locationText, locationFontStyle]}
                              onPress={this.onLocationPress}>
                            {locationText}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.onTouchablePress}>
                        <View style={styles.touchableContainer}>
                            <View style={styles.tempBlock}>
                                <View>
                                    <Text style={[styles.headerText, styles.tempText]}>
                                        {current.temp_c ? Math.round(parseInt(current.temp_c, 10)).toString() : '--'}
                                    </Text>
                                </View>
                                {current.temp_c && (<View>
                                    <Text style={[styles.tempTextDimension, styles.headerText]}>°</Text>
                                </View>)}
                            </View>
                            <Text style={[styles.headerText, styles.conditionText]}>
                                {condText}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {forecast ? <TopBottomPart/> :
                        (<View style={styles.moreInfoBottom}>
                            <Text style={styles.moreInfoBottomText}>
                                You need to go to the phone’s settings screen and enable geolocation or select a
                                location
                                manually.
                            </Text>
                        </View>)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topSection        : {
        flex           : 1,
        flexDirection  : 'row',
        alignItems     : 'flex-start',
        justifyContent : 'center',
        backgroundColor: 'transparent'
    },
    innerContainer    : {
        flex           : 1,
        marginTop      : 35,
        backgroundColor: 'transparent'
    },
    headerText        : {
        fontFamily: 'Muli-SemiBold',
        textAlign : 'center',
        color     : '#fff'
    },
    locationBlock     : {
        maxWidth      : width,
        paddingLeft   : 20,
        paddingRight  : 20,
        flexDirection : 'row',
        alignItems    : 'center',
        justifyContent: 'center'
    },
    locationText      : {
        fontFamily: 'Muli-Regular'
    },
    touchableContainer: {
        paddingTop: isIos ? 20 : 0
    },
    tempBlock         : {
        flexDirection : 'row',
        alignItems    : 'flex-start',
        justifyContent: 'center'
    },
    tempText          : {
        fontSize     : 90,
        lineHeight   : 90,
        paddingBottom: 5,
    },
    tempTextDimension : {
        marginLeft: -3,
        fontSize  : 50,
        lineHeight: 55
    },
    conditionText     : {
        paddingTop: 5,
        fontSize  : 21
    },
    moreInfoBottom    : {
        flexDirection : 'row',
        justifyContent: 'center',
        marginLeft    : 25,
        marginRight   : 24,
        marginTop     : 100
    },
    moreInfoBottomText: {
        color        : '#fff',
        fontSize     : 16,
        fontFamily   : 'Muli-Regular',
        lineHeight   : 21,
        letterSpacing: 0.8
    }
});
