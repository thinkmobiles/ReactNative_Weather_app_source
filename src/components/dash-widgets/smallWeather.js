import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native'

@connect(store => {
    return {...store.weather}
})
export default class SmallWeather extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const day = this.props.day;
        let imgUrl = 'https://' + day.condition.icon.substr(2);

        return <View style={styles.smallWeather}>

            <View style={styles.imageRow}>
                <Image
                    source={{uri: imgUrl}}
                    style={{width: 64, height: 64}}
                />
            </View>

            <View style={styles.weatherDescRow}>
                <Text>{day.condition.text}</Text>
            </View>

            <View style={styles.tempRow}>
                <View style={styles.tempColumn}>
                    <Text>min</Text>
                    <Text>{day.mintemp_c}</Text>
                </View>
                <View style={styles.tempColumn}>
                    <Text>avg</Text>
                    <Text>{day.avgtemp_c}</Text>
                </View>
                <View style={styles.tempColumn}>
                    <Text>max</Text>
                    <Text>{day.maxtemp_c}</Text>
                </View>
            </View>
        </View>

    }


}

const styles = StyleSheet.create({
    smallWeather  : {
        flex         : 1,
        flexDirection: "column"
    },
    imageRow      : {
        flexGrow  : 0.3,
        alignItems: "center"
    },
    weatherDescRow: {
        flexGrow  : 0.2,
        alignItems: "center"
    },
    tempRow       : {
        flexGrow     : 1,
        flexDirection: 'row'
    },
    tempColumn    : {
        flexGrow  : 0.3,
        alignItems: "center"
    }
});