'use strict';

import React from 'react';
import {connect} from 'react-redux';

import {StyleSheet, View, Navigator, Image} from 'react-native';

import Top from './top';
import Bottom from './bottom';
import Search from '../../components/Search';

import {getImage} from '../../images/topImages';

@connect((store) => {
    return {
        ...store.weather.weather
    };
})

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderScene = this._renderScene.bind(this);
    }

    _renderScene(route, navigator) {
        let routeId = route.id;
        switch (routeId) {
            case 'index':
                return (
                    <Image source={getImage(this.props.current.condition.code)} style={styles.container}>
                        <Top navigator={navigator}/>
                        <Bottom/>
                    </Image>
                );
            case 'search':
                return <Search navigator={navigator}/>
        }
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <Navigator
                    style={{
                        flex: 1
                    }}
                    initialRoute={{
                        id  : 'index',
                        name: 'index'
                    }}
                    renderScene={this.renderScene}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        width          : undefined,
        height         : undefined,
        backgroundColor: 'transparent'
    }
});
