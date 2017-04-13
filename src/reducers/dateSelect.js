import * as types from '../actions/actionTypes';

export default function reducer(state = {
    dateSelect: {
        visible: true
    }
}, action) {

    switch (action.type) {
        case types.SET_DS_VISIBLE_STATE:
            return {...state, dateSelect: {...state.dateSelect, visible: action.payload}};
    }

    return state;
}