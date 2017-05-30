'use strict';

import React from 'react';

import Splash from './Splash';
import Dashboard from './Dashboard/';

import {
    View,
    Navigator
} from 'react-native';

export default class RootRouter extends React.Component {
    renderScene(route, navigator) {
        const {state, actions} = this.props;
        const routeId = route.id;

        if (routeId === 'Splash') {
            return (
                <Splash
                    {...this.props}
                    navigator={navigator}/>
            );
        }

        if (routeId === 'Dashboard') {
            return (
                <Dashboard
                    actions={actions}
                    {...state}
                    navigator={navigator}/>
            );
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Navigator
                    style={{flex: 1}}
                    initialRoute={{id: 'Splash', name: 'Splash'}}
                    renderScene={this.renderScene.bind(this)}
                />
            </View>
        );
    };

}
