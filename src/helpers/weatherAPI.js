const API_KEY = "948c1466aa944464a5c114236171104";
const BASE_URL = "http://api.apixu.com/v1";
const FORECAST = "/forecast.json";

export default class WeatherAPI {
    initForecast(query, cb) {
        const url = `${BASE_URL + FORECAST}?key=${API_KEY}&q=${query}&days=${7}`;
        fetch(url)
            .then(r => r.json())
            .then(r => {
                if (r.error) {
                    return new Error(r.error)
                }

                if (cb && typeof cb === 'function') {
                    cb(r);
                }
            })
            .catch(err => console.error(err));
    }
}

