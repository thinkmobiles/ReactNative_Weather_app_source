import * as types from './actionTypes';

export function setWeather(weather) {
    return {
        type: types.SET_WEATHER,
        payload: weather
    }
}