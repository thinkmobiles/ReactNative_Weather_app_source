'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    Navigator,
    Text,
    StatusBar,
} from 'react-native';
import {Router, Route, Scene, Animations, TabBar} from 'react-native-router-flux';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

/*import Dashboard from './Dashboard';
 import Snaps from './Snaps';
 import Discover from './Discover';
 import AddMe from './AddMe';
 import Chats from './Chats';
 import Stories from './Stories';*/

import * as actions from '../actions/actions';
import Splash from './Splash';
import Dashboard from './Dashboard';

const RouterWithRedux = connect()(Router);

class RootRouter extends Component {
    constructor(props) {
        super(props);
    };

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
export default connect(state => ({
        state: state.Weather
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(RootRouter);