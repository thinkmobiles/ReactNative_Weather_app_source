import React, {
    Component,
} from 'react';
import {
    ScrollView,
    Animated,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

import moment from 'moment';

import * as calendarActions from '../../../actions/calendarActions';

import {connect} from 'react-redux';

@connect(store => {
    return {...store.calendar, ...store.weather};
})

export default class LeftComponent extends Component {
    constructor(props) {
        super(props);

    }

    getDatasource(date) {
        let _date = date ? new Date(date) : new Date();
        let _momentDate = moment(_date).subtract(1, 'd');

        let rangeArray = [];

        for (let i = 0; i < 7; i++) {
            let key;

            _momentDate.add(1, 'd');
            key = _momentDate.date().toString();

            if (key.length === 1) {
                key = '0' + key;
            }

            rangeArray.push({
                index: i,
                key: key,
                momentDate: _momentDate
            });
        }

        this.props.dispatch(calendarActions.setDataSource(rangeArray));
    }

    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                onScroll={() => {
                    console.log('onScroll!');
                }}
                scrollEventThrottle={200}
                style={{
                    flex: 1,
                    maxWidth: 60
                }}
            >
                {this.props.calendar.dataSource.map(this._renderItem)}
            </ScrollView>
        );
    }

    _renderItem = (item, index) => {
        const checkedIndex = this.props.calendar.checkedElement.index;
        return (
            <TouchableOpacity
                key={index}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#fff',
                    backgroundColor: checkedIndex === index ? '#e73535' : '#333333'
                }}
                onPress={() => this._onPress(item)}
            >
                <Text style={{
                    flex: 1,
                    fontSize: 25,
                    color: '#fff',
                    margin: 12
                }}>{item.key}</Text>
            </TouchableOpacity>
        )
    };

    _onPress = (item) => {
        this.props.dispatch(calendarActions.setCheckedElement({
            index: item.index,
            key: item.key,
            momentDate: item.momentDate
        }));
    };

    componentDidMount() {
        this.getDatasource();
    }
}