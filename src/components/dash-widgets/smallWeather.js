import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

const deviceScreen = Dimensions.get('window');

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
                    style={{width: deviceScreen.height * 0.2, height: deviceScreen.height * 0.2}}
                />
                <Text style={[styles.textElements, {fontSize: 14}]}>{day.condition.text}</Text>
            </View>

            <View style={styles.tempRow}>
                <View style={styles.tempColumn}>
                    <Text style={styles.textElements}>min</Text>
                    <Text style={[styles.textElements, {fontSize: 22}]}>{day.mintemp_c}</Text>
                </View>
                <View style={[styles.tempColumn, {borderBottomWidth: 2, borderTopWidth: 2, borderColor: 'white'}]}>
                    <Text style={styles.textElements}>avg</Text>
                    <Text style={[styles.textElements, {fontSize: 22}]}>{day.avgtemp_c}</Text>
                </View>
                <View style={styles.tempColumn}>
                    <Text style={styles.textElements}>max</Text>
                    <Text style={[styles.textElements, {fontSize: 22}]}>{day.maxtemp_c}</Text>
                </View>
            </View>
        </View>

    }

}

const styles = StyleSheet.create({
    smallWeather  : {
        flex         : 1,
        flexDirection: "row",
        marginTop    : -60,
        alignItems   : "center"
    },
    imageRow      : {
        flex      : 3,
        alignItems: "center"
    },
    weatherDescRow: {
        flexGrow  : 0.2,
        alignItems: "center"
    },
    tempRow       : {
        flexGrow     : 1,
        flexDirection: 'column',
        marginBottom : 60,
        maxWidth     : 60
    },
    tempColumn    : {
        flexGrow  : 0.3,
        alignItems: "center"
    },
    textElements  : {
        color: 'white'
    }
});