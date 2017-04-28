import {
    Animated
} from 'react-native';

export default function reducer(state = {
    customVars: {
        dashBoardAnimatedValue: new Animated.Value(0)
    }
}, action) {
    return state;
}