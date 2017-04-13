import React, {Component} from 'react';

import {
    View,
    Image,
    Text
} from 'react-native'

export default class BigWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hour = this.props.hour;
        let imgUrl = 'https://' + hour.condition.icon.substr(2);

        return (
            <View
                style={this.props.style}
            >
                <Text>
                    {`Temperature: ${hour.temp_c}(feels like ${hour.feelslike_c})`}
                </Text>
                <Image source={{uri: imgUrl}} style={{width: 64, height: 64}}/>
                <Text>
                    {`It's ${hour.condition.text} now`}
                </Text>
            </View>
        )
    }
}