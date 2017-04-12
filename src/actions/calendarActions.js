import * as types from './actionTypes';

export function setDataSource(dataSource) {
    return {
        type: types.SET_DATA_SOURCE,
        payload: dataSource
    }
}

export function setCheckedElement(element) {
    return {
        type: types.SET_CHECKED_ELEMENT,
        payload: element
    }
}