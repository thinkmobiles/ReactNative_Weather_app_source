'use strict';

import React from 'react';
import moment from 'moment';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';

@connect((store) => {
    return {collection: store.weather.weather.forecast.forecastday};
})

export default class extends React.Component {
    render() {
        return <View style={{
            flex           : 1,
            flexDirection  : 'column',
            width          : '100%',
            height         : '100%',
            backgroundColor: 'white'
        }}>
            {
                this.props.collection.map((rowElement, index) => {
                    let imgUrl = 'https://' + rowElement.day.condition.icon.substr(2);

                    return <View
                        key={'element-' + index}
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text>{moment(rowElement.date).format('dddd') + '   '}</Text>
                        <Image source={{uri: imgUrl}} style={{width: 64, height: 64}}/>
                        <Text>{rowElement.day.maxtemp_c + '   '}</Text>
                        <Text>{rowElement.day.mintemp_c}</Text>
                    </View>
                })
            }
        </View>
    }
}
