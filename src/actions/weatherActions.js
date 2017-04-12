import * as types from './actionTypes';

export function setCurrent(current) {
    return {
        type: types.SET_CURRENT,
        payload: current
    }
}

export function setWeather(weather) {
    return {
        type: types.SET_WEATHER,
        payload: weather
    }
}