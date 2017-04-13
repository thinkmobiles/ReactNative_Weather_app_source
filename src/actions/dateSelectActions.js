import * as types from './actionTypes';

export function setVisibleState(visibleState) {
    return {
        type: types.SET_DS_VISIBLE_STATE,
        payload: visibleState
    }
}