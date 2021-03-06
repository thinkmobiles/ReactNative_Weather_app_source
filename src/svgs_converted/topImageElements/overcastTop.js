import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export default (width, index, style) => {
    return (
        <Svg
            width={width}
            height={width * 170 / 375}
            viewBox="0 0 375 170"
            style={style}
            key={`svgTop-${index}`}
        >
            <G
                transform={{translate: '0,-882.36223'}}
                id="layer1">
                <G
                    opacity="0.2"
                    transform={{translate: '-35.62081,953.67928'}}
                    id="Page-1">
                    <G
                        fill="#ffffff"
                        id="Overcast_elements_2">
                        <G
                            id="Group"
                            transform={{translate: '9,19'}}>
                            <Path
                                d="m 0,38.397513 97.390887,0 c 0,0 2.941853,-21.924562 -24.866417,-24.463848 0,0 -34.992592,-38.367984 -53.975299,12.231924 0,0 -16.0408524,1.269643 -18.549171,12.231924 z"
                                id="Shape"/>
                            <Path
                                d="m 50,53.651641 57.47456,0 c 0,0 1.73414,-12.944163 -14.67831,-14.430574 0,0 -20.65492,-22.636801 -31.833969,7.215287 0,0.03097 -9.444903,0.774172 -10.962281,7.215287 z"
                                id="path3432"/>
                        </G>
                    </G>
                </G>
                <G
                    opacity="0.2"
                    transform={{translate: '-7.25003,861.13038'}}
                    id="Page-1-3">
                    <G
                        fill="#ffffff"
                        id="Overcast_elements_3">
                        <Path
                            d="m 45,52.035122 33.041678,0 c 0,0 0.99094,-7.432055 -8.453963,-8.299128 0,0 -11.891288,-13.037063 -18.332402,4.149564 0.06193,0 -5.38824,0.433536 -6.255313,4.149564 z"
                            id="Shape-6"/>
                    </G>
                </G>
                <G
                    opacity="0.4"
                    transform={{translate: '264.37921,923.67927'}}
                    id="Page-1-7">
                    <G
                        fill="#ffffff"
                        id="Overcast_elements_2-5">
                        <G
                            id="Group-3"
                            transform={{translate: '9,19'}}>
                            <Path
                                d="m 0,38.397513 97.390887,0 c 0,0 2.941853,-21.924562 -24.866417,-24.463848 0,0 -34.992592,-38.367984 -53.975299,12.231924 0,0 -16.0408524,1.269643 -18.549171,12.231924 z"
                                id="Shape-5"/>
                            <Path
                                d="m 50,53.651641 57.47456,0 c 0,0 1.73414,-12.944163 -14.67831,-14.430574 0,0 -20.65492,-22.636801 -31.833969,7.215287 0,0.03097 -9.444903,0.774172 -10.962281,7.215287 z"
                                id="path3473"/>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    )
};
