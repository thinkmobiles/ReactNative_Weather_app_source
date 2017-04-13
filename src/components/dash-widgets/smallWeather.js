import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    View,
    Image,
    Text
} from 'react-native'

@connect(store => {
    return {...store.weather}
})
export default class SmallWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hour = this.props.weather.forecast.forecastday[0].hour[0];
        let imgUrl = 'https://' + hour.condition.icon.substr(2);
        return <View>
            <Text>
                {`Temperature: ${hour.temp_c}(feels like ${hour.feelslike_c})`}
            </Text>
            <Image source={{uri: imgUrl}} style={{width: 64, height: 64}}/>
            <Text>
                {`It's ${hour.condition.text} now`}
            </Text>
        </View>

    }
}