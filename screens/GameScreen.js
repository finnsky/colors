import React, { useState } from 'react';
import {
  StyleSheet,
  View
} from "react-native";
import Svg, {
  G,
  Text,
  Polygon,
  Rect,
} from 'react-native-svg';

const COLORS_LIST = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
]

import { randomPoint } from '@turf/random'
import voronoi from '@turf/voronoi'
import area from '@turf/area'
import centerOfMass from '@turf/center-of-mass'

export default function GameScreen() {

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
      >
        <Rect
          fill="#f3f3f3"
          height="100%"
          width="100%"
        ></Rect>
        <RandomPoligons />
      </Svg>
    </View>
  );
}

const RandomPoligons = () => {

  const options = {
    bbox: [0, 0, 100, 100]
  };

  const [count, setCount] = useState(2);
  const points = randomPoint(count, options);
  const voronoiPolygons = voronoi(points, options);
  const bigestArea = voronoiPolygons.features.reduce((accumulator, currentValue) => {
    const currentArea = area(currentValue);
    return currentArea > accumulator ? currentArea : accumulator;
  }, 0);
  return (
    <G>
      {
        Array.prototype.map.call(voronoiPolygons.features, (feature, id) => {
          const textPosition = centerOfMass(feature);
          const currentArea = area(feature);
          let pointsString = '';
          Array.prototype.map.call(feature.geometry.coordinates[0], coordinate => {
            console.log(coordinate)
            pointsString = `${pointsString} ${coordinate.join(' ')}`
          });
          console.log(pointsString);
          return (
            <G key={id}>
              <Polygon
                x="0"
                y="0"
                points={pointsString}
                fill={COLORS_LIST[id]}
                onClick={() => {
                  if (currentArea == bigestArea) {
                    setCount(count + 1)
                  }
                }}
              >
              </Polygon>
              <Text
                x={textPosition.geometry.coordinates[0]}
                y={textPosition.geometry.coordinates[1]}
                textAnchor="middle"
                style={[
                  { fontSize: 5 },
                ]}
              >{id}{ currentArea == bigestArea ? '!' : '' }</Text>
            </G>
          )
        })
      }
    </G>
  )
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
