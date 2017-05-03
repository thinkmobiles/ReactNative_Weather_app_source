import React from 'react';
import Svg, {G, Ellipse} from 'react-native-svg';

export default (width, index, style, convertToWhite, translate) => {
    return (
        <Svg
            width={width}
            height={width * 170 / 375}
            viewBox="0 0 375 170"
            style={style}
            key={`svgTop-${index}`}
        >
            <G
                id="layer1">
                <G
                    transform={{translate: translate || '0,0', scale: '1.2052603, 1'}}
                    id="Page-1">
                    <G
                        fill="#ffffff"
                        id="snow_element_2">
                        <Ellipse id="Oval" cx="327.064237" cy="16.1176732" rx="1.52167506" ry="1.52038767"/>
                        <Ellipse id="Oval" opacity="0.5" cx="25.4378067" cy="136.927678" rx="1.52167506"
                                 ry="1.52038767"/>
                        <Ellipse id="Oval" cx="51.9453863" cy="39.2579736" rx="1.52167506" ry="1.52038767"/>
                        <Ellipse id="Oval" opacity="0.5" cx="25.4378067" cy="9.82326821" rx="1.52167506"
                                 ry="1.52038767"/>
                        <Ellipse id="Oval" opacity="0.5" cx="23.5216751" cy="55.5203877" rx="1.52167506"
                                 ry="1.52038767"/>
                        <Ellipse id="Oval" opacity="0.5" cx="336.521675" cy="78.5203877" rx="1.52167506"
                                 ry="1.52038767"/>
                        <Ellipse id="Oval" cx="264.521675" cy="115.520388" rx="1.52167506" ry="1.52038767"/>
                        <Ellipse id="Oval" cx="142.521675" cy="156.520388" rx="1.52167506" ry="1.52038767"/>
                        <Ellipse id="Oval" cx="286.521675" cy="150.520388" rx="1.52167506" ry="1.52038767"/>
                    </G>
                </G>
            </G>
        </Svg>
    )
};
