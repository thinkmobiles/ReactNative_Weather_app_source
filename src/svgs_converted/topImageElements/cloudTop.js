import React from 'react';
import Svg, {G, Defs, Path, LinearGradient, Stop, Ellipse} from 'react-native-svg';

export default (width, index, style) => {
    return (
        <Svg
            width={width}
            height={width * 170 / 375}
            viewBox="0 0 375 170"
            style={style}
            key={`svgTop-${index}`}
        >
            <Defs>
                <LinearGradient x1="-0.0203036053%" y1="49.9863694%" x2="100.010816%" y2="49.9863694%"
                                id="linearGradient-1">
                    <Stop stopColor="#F5AC4B" offset="0%"/>
                    <Stop stopColor="#F2A959" offset="100%"/>
                </LinearGradient>
                <LinearGradient x1="-0.0262899263%" y1="49.9823505%" x2="100.014005%" y2="49.9823505%"
                                id="linearGradient-2">
                    <Stop stopColor="#F5AC4B" offset="0%"/>
                    <Stop stopColor="#F2A959" offset="100%"/>
                </LinearGradient>
            </Defs>
            <G
                transform={{translate: '0,-882.36223'}}
                id="layer1">
                <G
                    transform={{translate: '22.830321,914.05125'}}
                    id="Page-1">
                    <G
                        id="cloudy_elemetn_2">
                        <G
                            id="Group"
                            transform={{translate: '4,18'}}>
                            <Ellipse
                                id="Oval"
                                cx="33.542095"
                                cy="33.527794"
                                rx="33.542095"
                                ry="33.527794"
                                opacity="0.2"
                                fill="url(#linearGradient-2)"/>
                            <Ellipse
                                id="ellipse3776"
                                cx="33.904427"
                                cy="33.893383"
                                rx="25.904427"
                                ry="25.893381"
                                opacity="0.4"
                                fill="url(#linearGradient-1)"/>
                            <Path
                                opacity="0.4"
                                fill="#ffffff"
                                d="m 18,67.764809 88.2575,0 c 0,0 2.67319,-19.849472 -22.531118,-22.139796 0,0 -31.717541,-34.757782 -48.902295,11.069898 0,-0.02121 -14.532786,1.123955 -16.824087,11.069898 z"
                                id="Shape"/>
                        </G>
                    </G>
                </G>
                <Path
                    opacity="0.2"
                    fill="#ffffff"
                    d="m 302.61737,977.47913 32.74764,0 c 0,0 0.98212,-7.36715 -8.37873,-8.22665 0,0 -11.78547,-12.92321 -18.16926,4.11333 0.0307,0 -5.37098,0.42975 -6.19965,4.11332 z"
                    id="path3828"/>
            </G>
        </Svg>
    )
};
