import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Root from '../components/RootRouter';

import store from '../store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Root />
            </Provider>
        );
    }
}