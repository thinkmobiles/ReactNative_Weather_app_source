import Snow from './snow';
import Overcast from './overcast';
import Cloud from './cloud';
import Fog from './fog';
import Storm from './storm';
import Rain from './rain';
import Sunny from './sunny';

import OvercastTop from './overcastTop';
import SnowTop from './snowTop';
import CloudTop from './cloudTop';
import FogTop from './fogTop';
import RainTop from './rainTop';
import StormTop from './stormTop';

const codesToProps = {
    [[1030, 1135, 1147]]                              : {
        images        : {
            top   : [FogTop],
            bottom: Fog
        },
        gradientSearch: ['#2187BE', '#72BFE5'],
        gradientImage : {
            colors: ['#2187BE', '#FFFFFF']
        }
    },
    [[1000]]                                          : {
        images        : {
            top   : [],
            bottom: Sunny
        },
        gradientSearch: ['#F1AB65', '#F9D676'],
        gradientImage : {
            colors: ['#F1AB65', '#FFFFFF']
        }
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
        }
    },
    [[1066, 1114, 1213, 1216, 1219, 1258, 1261]]      : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        }
    },
    [[1204, 1207, 1210, 1249, 1252, 1255]]            : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        }
    },
    [[1069, 1117, 1222, 1225, 1237, 1264]]            : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        }
    },
    [[1279, 1282]]                                    : {
        images        : {
            top   : [SnowTop],
            bottom: Snow
        },
        gradientSearch: ['#48a4df', '#6ecaf8'],
        gradientImage : {
            colors: ['#48a4df', '#FFFFFF']
        }
    },
    [[1009, 1072]]                                    : {
        images        : {
            top   : [OvercastTop],
            bottom: Snow
        },
        gradientSearch: ['#839dae', '#A6CADF'],
        gradientImage : {
            colors: ['#839dae', '#FFFFFF']
        }
    },
    [[1087, 1273, 1276]]                              : {
        images        : {
            top   : [StormTop],
            bottom: Storm
        },
        gradientSearch: ['#616876', '#A4A9B0'],
        gradientImage : {
            colors: ['#616876', '#FFFFFF']
        }
    },
    [[1150, 1153, 1168, 1180, 1183, 1198, 1240]]      : {
        images        : {
            top   : [RainTop],
            bottom: Rain
        },
        gradientSearch: ['#919CA1', '#E4E9EC'],
        gradientImage : {
            colors: ['#919CA1', '#FFFFFF']
        }
    },
    [[1171, 1186, 1189, 1192, 1195, 1201, 1243, 1246]]: {
        images        : {
            top   : [RainTop],
            bottom: Rain
        },
        gradientSearch: ['#919CA1', '#E4E9EC'],
        gradientImage : {
            colors: ['#919CA1', '#FFFFFF']
        }
    }
};

export const getProps = (code) => {
    const keys = Object.keys(codesToProps);

    return codesToProps[keys.find((key) => key.indexOf(code) > -1)];
};

export default codesToProps;
