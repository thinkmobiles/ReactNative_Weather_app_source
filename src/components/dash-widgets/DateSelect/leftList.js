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

export default class LeftComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource  : [],
            checkedIndex: 0
        };
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
                index     : i,
                key       : key,
                momentDate: _momentDate
            });
        }

        this.setState({
            dataSource: rangeArray
        });
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
                    flex    : 1,
                    maxWidth: 60
                }}
            >
                {this.state.dataSource.map(this._renderItem)}
            </ScrollView>
        );
    }

    _renderItem = (item, index) => (
        <TouchableOpacity
            key={index}
            style={{
                flex             : 1,
                justifyContent   : 'center',
                borderBottomWidth: 1,
                borderColor      : '#fff',
                backgroundColor  : this.state.checkedIndex === index ? '#e73535' : '#333333'
            }}
            onPress={() => this._onPress(item)}
        >
            <Text style={{
                flex    : 1,
                fontSize: 25,
                color   : '#fff',
                margin  : 12
            }}>{item.key}</Text>
        </TouchableOpacity>
    );

    _onPress = (item) => {
        this.setState({
            checkedIndex: item.index
        });
        console.log(`${item.key} pressed`);
    };

    componentDidMount() {
        this.getDatasource();
    }
}