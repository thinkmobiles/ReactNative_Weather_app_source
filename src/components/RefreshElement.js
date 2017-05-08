import React, {Component} from 'react';

import {
    View,
    Animated,
    StyleSheet,
    Image
} from 'react-native';

export default class Search extends Component {
    constructor(props) {
        super(props);

        this.height = props.height || 20;

        this.state = {
            readyToRefresh: false,
            refreshTop    : new Animated.Value(-this.height)
        }
    }

    hideRefreshTool() {
        Animated.spring(
            this.state.refreshTop,
            {
                toValue: -this.height
            }
        ).start();
    }

    handleScroll(value) {
        var animatedValue = value < 3 * this.height ? -this.height + value : 2 * this.height;

        this.state.refreshTop.setValue(animatedValue);
    }

    handleRelease() {
        if (this.state.refreshTop._value !== 2 * this.height) {
            return this.hideRefreshTool();
        }


    }

    render() {
        return (
            <Animated.View
                style={[styles.mainView, {maxHeight: this.height, top: this.state.refreshTop}]}>
                <Animated.Image
                    style={[
                        styles.element,
                        {
                            paddingTop: this.height / 2,
                            maxHeight : this.height * 0.8,
                            maxWidth  : this.height * 0.8,
                        }
                    ]}
                    source={require('../images/images.png')}
                />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        position: 'absolute',
        left    : 0,
        right   : 0,
        zIndex  : 20,
    },
    element : {
        flex     : 1,
        alignSelf: 'center'
    }
});
