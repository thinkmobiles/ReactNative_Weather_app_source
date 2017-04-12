'use strict';

import React, {
    Component,
} from 'react';

import {
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';

// import IconI from 'react-native-vector-icons/MaterialIcons';

export default class PictureTop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*return (
         <View>
         <View style={{flexDirection: 'row', height: 90, justifyContent: 'space-between'}}>
         <View style={{flexDirection: 'row'}}>
         <TouchableOpacity style={{flexGrow: 1}}>
         /!*<IconI
         name="close"
         style={{margin: 20, alignSelf: 'center'}}
         size={30}
         color="#000"
         />*!/
         <Text style={{margin: 20, alignSelf: 'center'}}>Close</Text>
         </TouchableOpacity>
         </View>
         <View style={{flexDirection: 'row',}}>
         <TouchableOpacity style={{flexGrow: 1,}}>
         <IconI name="tag-faces" style={{margin: 20, marginLeft: 0, alignSelf: 'center'}} size={30}
         color="#fff"/>
         </TouchableOpacity>
         <TouchableOpacity style={{flexGrow: 1,}}>
         <IconI name="format-size" style={{margin: 20, marginLeft: 0, alignSelf: 'center'}} size={35}
         color="#fff"/>
         </TouchableOpacity>
         <TouchableOpacity style={{flexGrow: 1,}}>
         <IconI name="colorize" style={{margin: 20, marginLeft: 0, alignSelf: 'center'}} size={35}
         color="#fff"/>
         </TouchableOpacity>
         </View>
         </View>
         </View>
         );*/
        return (
            <Text style={{
                padding : 12,
                fontSize: 25,
                color   : '#fff'
            }}>
                Month will be here
            </Text>
        );
    }
}       