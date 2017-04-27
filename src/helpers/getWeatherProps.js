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
import FogTop from '../svgs_converted/topImageElements/fogTop';
import RainTop from '../svgs_converted/topImageElements/rainTop';
import StormTop from '../svgs_converted/topImageElements/stormTop';

const codesToProps = {
    [[1030, 1135, 1147]]                              : {
        images        : {
            top   : [FogTop],
            bottom: Fog
        },
        gradientSearch: ['#2187BE', '#72BFE5'],
        gradientImage : {
            colors: ['#2187BE', '#FFFFFF']
        },
        icon          : 'fog'
    },
    [[1000]]                                          : {
        images        : {
            top   : [],
            bottom: Sunny
        },
        gradientSearch: ['#F1AB65', '#F9D676'],
        gradientImage : {
            colors: ['#F1AB65', '#FFFFFF']
        },
        icon: 'sunny'
    },
    [[1003, 1006, 1063]]                              : {
        images        : {
            top   : [CloudTop],
            bottom: Cloud
        },
        gradientSearch: ['#f9d676', '#f2ab60'],
        gradientImage : {
            colors   : ['#FFFFFF', '#f2ab60'],
            start    : {x: -0.3, y: 0},
            end      : {x: 0.7, y: 1},
            locations: [0, 0.4]
        },
        icon: 'cloudy'
    },
    [[1066, 1114, 1213, 1216, 1219, 1258, 1261]]      : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        },
        icon: 'snowy'
    },
    [[1204, 1207, 1210, 1249, 1252, 1255]]            : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        },
        icon: 'snowy'
    },
    [[1069, 1117, 1222, 1225, 1237, 1264]]            : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        },
        icon: 'snowy'
    },
    [[1279, 1282]]                                    : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        },
        icon: 'snowy'
    },
    [[1009, 1072]]                                    : {
        images        : {
            top   : [OvercastTop],
            bottom: Overcast
        },
        gradientSearch: ['#839dae', '#A6CADF'],
        gradientImage : {
            colors: ['#839dae', '#FFFFFF']
        },
        icon: 'cloudy'
    },
    [[1087, 1273, 1276]]                              : {
        images        : {
            top   : [StormTop],
            bottom: Storm
        },
        gradientSearch: ['#616876', '#A4A9B0'],
        gradientImage : {
            colors: ['#616876', '#FFFFFF']
        },
        icon: 'storm'
    },
    [[1150, 1153, 1168, 1180, 1183, 1198, 1240]]      : {
        images        : {
            top   : [RainTop],
            bottom: Rain
        },
        gradientSearch: ['#919CA1', '#E4E9EC'],
        gradientImage : {
            colors: ['#919CA1', '#FFFFFF']
        },
        icon: 'rainy'
    },
    [[1171, 1186, 1189, 1192, 1195, 1201, 1243, 1246]]: {
        images        : {
            top   : [RainTop],
            bottom: Rain
        },
        gradientSearch: ['#919CA1', '#E4E9EC'],
        gradientImage : {
            colors: ['#919CA1', '#FFFFFF']
        },
        icon: 'rainy'
    }
};

export const getProps = (code, propName) => {
    const keys = Object.keys(codesToProps);
    const propsObject = codesToProps[keys.find((key) => key.indexOf(code) > -1)];

    if (!propName) {
        return propsObject;
    }

    return propName in propsObject && propsObject[propName];
};

export default codesToProps;
