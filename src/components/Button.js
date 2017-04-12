import React, {
    Component,
} from 'react';

import {
    Text,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class RightComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let iconSize = this.props.iconSize || 25;
        return (
            <TouchableOpacity
                style={this.props.touchableStyle}
            >
                <Text
                    style={{
                        margin: (this.props.touchableStyle.width - iconSize) / 2
                    }}
                >
                    <Icon
                        name={this.props.iconName || 'menu'}
                        size={iconSize}
                        color={this.props.iconColor || 'black'}
                    />
                </Text>
            </TouchableOpacity>
        );
    }
}