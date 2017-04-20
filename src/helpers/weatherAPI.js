const API_KEY = "948c1466aa944464a5c114236171104";
const BASE_URL = "http://api.apixu.com/v1";
const FORECAST = "/forecast.json";

import {Alert} from 'react-native';

export function initForecast(query, cb) {
    const url = `${BASE_URL + FORECAST}?key=${API_KEY}&q=${query}&days=${7}`;
    fetch(url)
        .then(r => r.json())
        .then(r => {
            if (r.error) {
                console.log(r.error);
                Alert.alert(r.error.code.toString(), r.error.message);
            }

            if (cb && typeof cb === 'function') {
                cb(r);
            }
        })
        .catch(err => {console.log(err);});
}


