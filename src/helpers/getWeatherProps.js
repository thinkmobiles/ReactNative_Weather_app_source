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

const topImages = {
    [[1030, 1135, 1147]]: [FogTop],
    [[1000]]            : [],
    [[1003]]            : [CloudTop],
    [[1006]]            : [OvercastTop],
    [[1063, 1180, 1186]]: [CloudTop, RainTop],
    [[1192]]            : {
        images        : [
            CloudTop,
            RainTop,
            {element: RainTop, translate: "0, -60"}
        ],
        convertToWhite: true
    },
    [[1195, 1246]]      : {
        images        : [
            OvercastTop,
            RainTop,
            {element: RainTop, translate: "0, -60"}
        ],
        convertToWhite: true
    },
    [[1069]]            : {
        images        : [CloudTop, RainTop, SnowTop],
        convertToWhite: true
    },
    [[1066]]            : [OvercastTop, SnowTop],
    [[1222]]            : [
        OvercastTop,
        SnowTop,
        {element: SnowTop, translate: "-60, -30"}
    ],
    [[1225, 1258]]      : [
        SnowTop,
        {element: SnowTop, translate: "-60, -30"}
    ],
    [[1072, 1189]]      : [RainTop],
    [[
        1171, 1201, 1204, 1207,
        1237, 1249, 1252, 1261,
        1264
    ]]                  : [RainTop, SnowTop],
    [[1210]]            : {
        images        : [CloudTop, SnowTop],
        convertToWhite: true
    },
    [[1273]]            : [StormTop, RainTop],
    [[1279]]            : [StormTop, SnowTop],
    [[1276]]            : [
        StormTop,
        RainTop,
        {element: RainTop, translate: "0, -60"}
    ],
    [[1282]]            : [
        StormTop,
        SnowTop,
        {element: SnowTop, translate: "-60, -30"}
    ],
    [[
        1114, 1213, 1216, 1219,
        1258, 1255, 1069, 1117,
        1282, 1261
    ]]                  : [SnowTop],
    [[1009]]            : [OvercastTop],
    [[1087]]            : [StormTop],
    [[
        1150, 1153, 1168, 1183,
        1198, 1189, 1195, 1243,
        1246, 1240
    ]]                  : [RainTop]
};

const gradients = {
    [[1030, 1135, 1147]]: {
        search    : ['#2187BE', '#72BFE5'],
        background: {
            colors: ['#2187BE', '#FFFFFF']
        }
    },
    [[1000]]            : {
        search    : ['#F1AB65', '#F9D676'],
        background: {
            colors: ['#F1AB65', '#FFFFFF']
        }
    },
    [[1003, 1063, 1186]]: {
        search    : ['#f2ab60', '#f9d676'],
        background: {
            colors   : ['#FFFFFF', '#f2ab60'],
            start    : {x: -0.3, y: 0},
            end      : {x: 0.7, y: 1},
            locations: [0, 0.4]
        },
    },
    [[
        1066, 1114, 1213, 1216, 1219, 1258,
        1204, 1207, 1210, 1249, 1252, 1255,
        1117, 1222, 1225, 1237, 1264,
        1279, 1282, 1261, 1171
    ]]                  : {
        search    : ['#48a4df', '#6ecaf8'],
        background: {
            colors: ['#48a4df', '#FFFFFF']
        },
    },
    [[1009, 1006, 1069]]: {
        search    : ['#839dae', '#A6CADF'],
        background: {
            colors: ['#839dae', '#FFFFFF']
        },
    },
    [[1087, 1273, 1276]]: {
        search    : ['#616876', '#A4A9B0'],
        background: {
            colors: ['#616876', '#FFFFFF']
        },
    },
    [[
        1150, 1153, 1168, 1180, 1183, 1198,
        1189, 1192, 1195, 1201,
        1243, 1246, 1240, 1072
    ]]                  : {
        search    : ['#919CA1', '#E4E9EC'],
        background: {
            colors: ['#919CA1', '#FFFFFF']
        },
    }
};

const icons = {
    [[1000]]                              : 'sunny',
    [[1003, 1006, 1009, 1063, 1072]]      : 'cloudy',
    [[1030, 1135, 1147]]                  : 'fog',
    [[1066, 1210, 1216, 1255]]            : 'snowy', /*TODO cloud, little snow and sun*/
    [[1069, 1249, 1252]]                  : 'snowy', /*TODO rain and snow and sun*/
    [[1114, 1117, 1213, 1219, 1225]]      : 'snowy',
    [[1204, 1207]]                        : 'snowy', /*TODO rain and snow*/
    [[1216, 1222, 1258]]                  : 'snowy', /*TODO cloud, more snow and sun*/
    [[1237, 1261]]                        : 'snowy', /*TODO ice cloud*/
    [[1264]]                              : 'snowy', /*TODO ice ice cloud*/
    [[1087, 1273]]                        : 'storm', /*TODO sun, cloud and thunder*/
    [[1276]]                              : 'storm', /*TODO cloud and thunder*/
    [[1279]]                              : 'storm', /*TODO sun, cloud, snow and thunder*/
    [[1282]]                              : 'storm', /*TODO cloud, snow and thunder*/
    [[
        1150, 1153, 1168, 1171, 1183,
        1189, 1195, 1198, 1201

    ]]                                    : 'rainy',
    [[1240, 1243, 1246, 1180, 1186, 1192]]: 'rainy', /*TODO rain, cloud and sun*/

};

const bottomImages = {
    [[1030, 1135, 1147]]: Fog,
    [[1000]]            : Sunny,
    [[1003, 1063, 1186]]: Cloud,
    [[
        1066, 1114, 1213, 1216, 1219, 1258,
        1204, 1207, 1210, 1249, 1252, 1255,
        1117, 1222, 1225, 1237, 1264,
        1279, 1282, 1261, 1171
    ]]                  : Snow,
    [[1009, 1006, 1069]]: Overcast,
    [[1087, 1273, 1276]]: Storm,
    [[
        1150, 1153, 1168, 1180, 1183, 1198,
        1189, 1192, 1195, 1201,
        1243, 1246, 1240, 1072
    ]]                  : Rain
};

export const getProps = (code) => {
    const bottomImagesKeys = Object.keys(bottomImages);
    const gradientKeys = Object.keys(gradients);
    const iconsKeys = Object.keys(icons);
    const topImagesKeys = Object.keys(topImages);

    return {
        images  : {
            top   : topImages[topImagesKeys.find((key) => key.indexOf(code) > -1)],
            bottom: bottomImages[bottomImagesKeys.find((key) => key.indexOf(code) > -1)]
        },
        gradient: gradients[gradientKeys.find((key) => key.indexOf(code) > -1)],
        icon    : icons[iconsKeys.find((key) => key.indexOf(code) > -1)]
    };

};
