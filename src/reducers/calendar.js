import * as types from '../actions/actionTypes';

export default function reducer(state = {
                                    calendar: {
                                        dataSource: [],
                                        checkedElement: {
                                            key: '1',
                                            index: 0,
                                            momentDate: null
                                        }
                                    }
                                }, action) {

    switch (action.type) {
        case types.SET_DATA_SOURCE:
            return {...state, calendar: {...state.calendar, dataSource: action.payload}};
        case types.SET_CHECKED_ELEMENT:
            return {...state, calendar: {...state.calendar, checkedElement: action.payload}};
    }

    return state;
}