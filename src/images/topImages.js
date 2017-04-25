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
    mist       : require('./topImages/Mist.png'),
    sunny      : require('./topImages/Sunny.png'),
    snow       : require('./topImages/Snow.png'),
    lightSnow  : require('./topImages/LightSnow.png'),
    heavySnow  : require('./topImages/HeavySnow.png'),
    thunderSnow: require('./topImages/SnowThunder.png'),
    overcast   : require('./topImages/Overcast.png'),
    cloud      : require('./topImages/Cloud.png'),
    thunder    : require('./topImages/Thunder.png'),
    rain       : require('./topImages/Rain.png'),
    heavyRain  : require('./topImages/HeavyRain.png')
};

const gradColorsMap = {
    mist       : ['#2990d2', '#69c2ee'],
    sunny      : ['#ffa67e', '#f9d676'],
    snow       : ['#2990d2', '#69c2ee'],
    lightSnow  : ['#6e8290', '#a6cadf'],
    heavySnow  : ['#2990d2', '#69c2ee'],
    thunderSnow: ['#5f5f5f', '#b6bbbe'],
    overcast   : ['#6e8290', '#a6cadf'],
    cloud      : ['#ffa67e', '#f9d676'],
    thunder    : ['#5f5f5f', '#b6bbbe'],
    rain       : ['#6e8290', '#a6cadf'],
    heavyRain  : ['#6e8290', '#a6cadf']
}

export const mapCode = (code) => {
    for (let key in codesMap) {
        if (~codesMap[key].indexOf(code)) {
            return key;
        }
    }

    return 'sunny';
}

export const getImage = (code) => {
    let key = mapCode(code);

    return images[key];
}

export const getGradColors = (code) => {
    let key = mapCode(code);

    return gradColorsMap[key];
}
export default images;
