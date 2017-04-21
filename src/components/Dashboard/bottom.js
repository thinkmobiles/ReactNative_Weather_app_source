'use strict';

import React from 'react';
import moment from 'moment';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';

@connect((store) => {
    return {collection: store.weather.weather.forecast.forecastday};
})

export default class extends React.Component {
    render() {
        return <View style={{
            width          : '100%',
            height         : '100%',
            backgroundColor: 'white'
        }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustContentInsets={false}
                scrollEventThrottle={200}
                style={{
                    flex         : 1,
                    flexDirection: 'column'
                }}
            >
                <View>
                    {
                        this.props.collection.map((rowElement, index) => <View
                            key={'element-' + index}
                            style={{
                                flexDirection: 'row'
                            }}
                        >
                            <Text>{moment(rowElement.date).format('dddd') + '   '}</Text>
                            <Text>{rowElement.day.maxtemp_c + '   '}</Text>
                            <Text>{rowElement.day.mintemp_c}</Text>
                        </View>)
                    }
                </View>
            </ScrollView>
        </View>
    }
}
