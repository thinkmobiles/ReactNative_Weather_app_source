'use strict';

import React from 'react';
import {View, Navigator} from 'react-native';

import Splash from './Splash';
import Dashboard from './Dashboard/';

export default class RootRouter extends React.Component {
    renderScene(route, navigator) {
        var {state, actions} = this.props;
        var routeId = route.id;

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