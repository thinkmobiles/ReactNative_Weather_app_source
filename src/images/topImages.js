import Snow from '../svgs_converted/topImageElements/snow';
import Overcast from '../svgs_converted/topImageElements/overcast';
import Cloud from '../svgs_converted/topImageElements/cloud';
import Fog from '../svgs_converted/topImageElements/fog';
import Storm from '../svgs_converted/topImageElements/storm';
import Rain from '../svgs_converted/topImageElements/rain';
import Sunny from '../svgs_converted/topImageElements/sunny';

import OvercastTop from '../svgs_converted/topImageElements/overcastTop';
import SnowTop from '../svgs_converted/topImageElements/snowTop';
import CloudTop from '../svgs_converted/topImageElements/cloudTop';

const codesMap = {
    mist       : [1030, 1135, 1147],
    sunny      : [1000],
    snow       : [1066, 1114, 1213, 1216, 1219, 1258, 1261],
    lightSnow  : [1204, 1207, 1210, 1249, 1252, 1255],
    heavySnow  : [1069, 1117, 1222, 1225, 1237, 1264],
    thunderSnow: [1279, 1282],
    overcast   : [1009, 1072],
    cloud      : [1003, 1006, 1063],
    thunder    : [1087, 1273, 1276],
    rain       : [1150, 1153, 1168, 1180, 1183, 1198, 1240],
    heavyRain  : [1171, 1186, 1189, 1192, 1195, 1201, 1243, 1246]
};

const images = {
    mist       : [Fog],
    sunny      : [Sunny],
    snow       : [Snow, SnowTop],
    lightSnow  : [Snow],
    heavySnow  : [Snow],
    thunderSnow: [Snow],
    overcast   : [Overcast, OvercastTop],
    cloud      : [Cloud, CloudTop],
    thunder    : [Storm],
    rain       : [Rain],
    heavyRain  : [Rain]
};

const gradColorsMap = {
    mist       : ['#2187BE', '#72BFE5'],
    sunny      : ['#F1AB65', '#F9D676'],
    snow       : ['#48a4df', '#6ecaf8'],
    lightSnow  : ['#919CA1', '#E4E9EC'],
    heavySnow  : ['#48a4df', '#6ecaf8'],
    thunderSnow: ['#2A3447', '#A4A9B0'],
    overcast   : ['#839dae', '#A6CADF'],
    cloud      : ['#f2ab60', '#FFFFFF'],
    thunder    : ['#616876', '#A4A9B0'],
    rain       : ['#919CA1', '#E4E9EC'],
    heavyRain  : ['#919CA1', '#E4E9EC']
};

export const mapCode = (code) => {
    for (let key in codesMap) {
        if (~codesMap[key].indexOf(code)) {
            return key;
        }
    }

    return 'sunny';
}

export const getImages = (code) => {
    let key = mapCode(code);

    return images[key].slice(0);
}

export const getGradColors = (code) => {
    let key = mapCode(code);

    return gradColorsMap[key].slice(0);
}
export default images;
