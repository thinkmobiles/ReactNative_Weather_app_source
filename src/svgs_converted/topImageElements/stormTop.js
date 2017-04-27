import React from 'react';
import Svg, {G, Defs, Polygon, LinearGradient, Stop} from 'react-native-svg';

export default (width) => {
    return (
        <Svg
            width={width}
            height={width * 170 / 375}
            viewBox="0 0 375 170"
            style={{flex: 1, alignSelf: 'flex-start'}}
        >
            <Defs>
                <LinearGradient x1="43.184898%" y1="0.638810418%" x2="56.0557064%" y2="98.0203824%"
                                id="linearGradient-1">
                    <Stop stopColor="#303C52" stopOpacity="0" offset="0%"/>
                    <Stop stopColor="#FFFFFF" offset="65.59%"/>
                </LinearGradient>
                <LinearGradient x1="50.0159226%" y1="0.022401104%" x2="50.0159226%" y2="99.9938362%"
                                id="linearGradient-2">
                    <Stop stopColor="#2A3447" stopOpacity="0" offset="0%"/>
                    <Stop stopColor="#FFFFFF" stopOpacity="0.8" offset="80.65%"/>
                </LinearGradient>
            </Defs>
            <G
                transform={{translate: '0,-882.36223'}}
                id="layer1">
                <G
                    id="g4006">
                    <G
                        transform={{translate: '35.349015,904.65045', scale: '1,1.2'}}
                        id="Group"
                        opacity="0.4"
                        fill="url(#linearGradient-1)">
                        <Polygon
                            points="44.423438,0 16.814598,58.241772 30.118926,60.824483 0.15116279,120.99511 55.689656,53.844624 42.81937,51.359991 72.371963,5.4106165 "
                            id="Shape"/>
                    </G>
                    <G
                        transform={{translate: '292.58157,960.12535', scale: '1,1.2'}}
                        id="g3874"
                        opacity="0.5"
                        fill="url(#linearGradient-2)">
                        <Polygon
                            points="11.155814,27.182361 17.474419,28.910719 0,56.931072 30.172093,26.475305 24.065116,24.799322 40.632558,3.6662144 27.360465,0 "
                            id="polygon3876"/>
                    </G>
                </G>
            </G>
        </Svg>
    )
};
