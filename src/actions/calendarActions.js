import * as types from './actionTypes';

export function setDataSource(dataSource) {
    return {
        type   : types.SET_DATA_SOURCE,
        payload: dataSource
    }
}
export function setHoursDataSource(hoursDataSource) {
    return {
        type   : types.SET_HOURS_DATA_SOURCE,
        payload: hoursDataSource
    }
}

export function setCheckedElement(element) {
    return {
        type   : types.SET_CHECKED_ELEMENT,
        payload: element
    }
}