const API_KEY = "948c1466aa944464a5c114236171104";
const BASE_URL = "https://api.apixu.com/v1";
const FORECAST = "/forecast.json";
const SEARCH = "/search.json";

export function initForecast(query, cb) {
    const url = `${BASE_URL + FORECAST}?key=${API_KEY}&q=${query}&days=${7}`;
    fetch(url)
        .then(r => r.json())
        .then(r => {
            if (r.error) {
                return cb(r.error);
            }

            if (cb && typeof cb === 'function') {
                cb(null, r);
            }
        })
        .catch(err => {cb(err)});
}


export function getCities(query, cb) {
    const url = `${BASE_URL + SEARCH}?key=${API_KEY}&q=${query}`;
    fetch(url)
        .then(r => r.json())
        .then(r => {
            if (r.error) {
                console.log(r.error);
            }

            if (cb && typeof cb === 'function') {
                cb(r);
            }
        })
        .catch(err => {console.log(err);});
}