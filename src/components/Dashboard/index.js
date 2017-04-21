'use strict';

import React from 'react';
import {StyleSheet, View, Navigator} from 'react-native';

import Top from './top';
import Bottom from './bottom';
import Search from '../../components/Search';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.renderScene = this._renderScene.bind(this);
    }

    _renderScene(route, navigator) {
        let routeId = route.id;
        switch (routeId) {
            case 'index':
                return <View
                    style={styles.container}
                >
                    <Top navigator={navigator}/>
                    <Bottom/>
                </View>;
            case 'search':
                return <Search navigator={navigator}/>
        }
    }

    render() {
        return <View style={{flex: 1}}>
            <Navigator
                style={{flex: 1}}
                initialRoute={{id: 'index', name: 'index'}}
                renderScene={this.renderScene}>
            </Navigator>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex           : 1,
        backgroundColor: '#ffffff',
        width          : null,
        height         : null,
        justifyContent : 'space-between'
    }
});