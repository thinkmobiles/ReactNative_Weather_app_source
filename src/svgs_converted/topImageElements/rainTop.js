import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export default (width, index, style, convertToWhite, translate) => {
    return (
        <Svg
            width={width}
            height={width * 299 / 375}
            viewBox="0 0 375 299"
            style={style}
            key={`svgTop-${index}`}
        >
            <G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <G id="drizzle_element_2" stroke="#FFFFFF" strokeWidth="0.603864734" fill="#FFFFFF">
                    <G id="weather_2-09" transform={{translate: translate || "-0.019324, -0.611111"}}>
                        <G id="Слой_1">
                            <Path d="M350,28 L355.569369,37.0891206" id="Shape"/>
                            <Path d="M309.487819,0.814851247 L315.026587,9.90397185" id="Shape" opacity="0.5"/>
                            <Path d="M295.503194,86.1974993 L301.041963,95.2866199" id="Shape"/>
                            <Path d="M215.879576,158.696242 L221.418344,167.785363" id="Shape"/>
                            <Path d="M82.4289233,142.507203 L87.9676916,151.596323" id="Shape" opacity="0.5"/>
                            <Path d="M70.4027581,107.895097 L75.9415263,116.984218" id="Shape"/>
                            <Path d="M0.66324013,126.379369 L6.20200834,135.499093" id="Shape"/>
                            <Path d="M325.339101,109.425252 L330.877869,118.514373" id="Shape" opacity="0.5"/>
                        </G>
                    </G>
                </G>
            </G>
        </Svg>
    )
};
