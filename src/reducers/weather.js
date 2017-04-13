import * as types from '../actions/actionTypes';

export default function reducer(state = {
                                    weather: {
                                        current: {},
                                        location: {},
                                        forecast: {}
                                    }
                                }, action) {

    switch (action.type) {
        case types.SET_WEATHER:
            return {...state, weather: action.payload};
    }

    return state;
}