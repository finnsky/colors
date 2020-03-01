import { randomPoint } from "@turf/random";
import voronoi from "@turf/voronoi";
import area from "area-polygon";
import centerOfMass from '@turf/center-of-mass';
import COLORS_LIST from "../constants/GameColors";

const MAX_DIFFERENCE_BETWEEN_BIGGEST_AND_NEXT = 1.2;
const MIN_DIFFERENCE_BETWEEN_BIGGEST_AND_NEXT = 1.05;

export default ({ size = [0, 0, 100, 100], count = 2 }) => {
  return checkIfBiggestTooBig(getSortedPolygons({ size, count }), {
    size,
    count,
  });
};

const checkIfBiggestTooBig = (polygons, { size, count }) => {
  if (polygons.length < 2) return false;
  const diffBetweenBiggestAndNext = polygons[0]["area"] / polygons[1]["area"];
  if (
    diffBetweenBiggestAndNext < MAX_DIFFERENCE_BETWEEN_BIGGEST_AND_NEXT &&
    diffBetweenBiggestAndNext > MIN_DIFFERENCE_BETWEEN_BIGGEST_AND_NEXT &&
    !(polygons[0]["area"] === polygons[1]["area"])
  ) {
    return polygons;
  }
  return checkIfBiggestTooBig(getSortedPolygons({ size, count }), {
    size,
    count,
  });
};

const getSortedPolygons = ({ size = [0, 0, 100, 100], count = 2 }) => {
  const options = {
    bbox: size,
  };
  const points = randomPoint(count, options);
  const voronoiPolygons = voronoi(points, options);
  const polygons = voronoiPolygons.features;

  Array.prototype.forEach.call(polygons, (feature, id) => {
    const currentArea = getPoligonArea(feature.geometry.coordinates[0]);
    polygons[id]["area"] = currentArea;
    polygons[id]["fill"] = COLORS_LIST[id]
      ? COLORS_LIST[id]
      : COLORS_LIST[id % COLORS_LIST.length];
    polygons[id]["points"] = transformArrayToPoints([feature.geometry.coordinates[0]])
    polygons[id]["center"] = centerOfMass(feature).geometry.coordinates;
  });

  return polygons.sort(compare);
};

const compare = (a, b) => {
  let comparison = 0;
  if (a.area < b.area) {
    comparison = 1;
  } else if (a.area >= b.area) {
    comparison = -1;
  }
  return comparison;
};

const getPoligonArea = (coordinatesArray) => area(coordinatesArray);

const transformArrayToPoints = coordinatesArray => {
  let pointsString = "";
  Array.prototype.map.call(
    coordinatesArray,
    (coordinate, index) => {
      pointsString = `${pointsString} ${coordinate.join(" ")}${
        index !== coordinatesArray.length - 1 ? "," : ""
      }`;
    }
  );
  return pointsString;
};
