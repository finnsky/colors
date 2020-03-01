import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  Button,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import Svg, { G, Polygon, Text } from "react-native-svg";
import Layout from "../constants/Layout";
import { LuckyText } from "../components/StyledText";
import polygonCalculated from "../services/poligons";
import Styles from '../components/Styles';
const ANIMATION_DELAY = 1000;

export default function GameScreen({ navigation }) {
  const barHeight = 50;
  const size = [0, 0, Layout.window.width, Layout.window.height - barHeight];
  const [count, setCount] = useState(3);
  const [pressed, setPressed] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [error, setError] = useState(false);
  const [win, setWin] = useState(false);
  useEffect(() => {
    const calculated = polygonCalculated({ size, count });
    setPressed([]);
    setTimeout(() => {
      setWin(false);
      setPolygons(calculated);
    }, 1000);
  }, [count]);

  return (
    <ImageBackground
      source={require("../assets/images/pattern.png")}
      resizeMode="repeat"
      style={{ width: "100%", height: "100%" }}
    >
      <View
        style={[
          StyleSheet.absoluteFill,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        {win && (
          <View
            style={
              (StyleSheet.absoluteFill,
              {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                top: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 1000,
                backgroundColor: "#002F2F90",
              })
            }
          >
            <View>
              <LuckyText style={Styles.title}>WIN!</LuckyText>
              <LuckyText style={Styles.subtitle}>Now {count} chips</LuckyText>
            </View>
          </View>
        )}

        <Svg
          height={Layout.window.height - barHeight}
          width="100%"
          viewBox={size}
          style={{ flex: 1 }}
        >
          {Array.prototype.map.call(polygons, (polygon, id) => {
            const displayError = pressed.includes(id) && id !== 0;
            const displayVictory = pressed.includes(id) && id == 0;
            const fill = pressed.includes(id)
              ? displayVictory
                ? "#00000090"
                : "#ffffff90"
              : polygon.fill;
            return (
              <G key={id}>
                <Polygon
                  points={polygon.points}
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill={fill}
                  onPress={() => {
                    pressed.push(id);
                    if (id === 0) {
                      setPressed(pressed);
                      setWin(true);
                      setCount(count + 1);
                    } else {
                      setPressed(pressed);
                      setError(true);
                      setTimeout(() => {
                        setError(false);
                      }, 300);
                    }
                  }}
                />
                {displayError && (
                  <Text
                    x={polygon.center[0]}
                    y={polygon.center[1]}
                    fontSize="16"
                    textAnchor="middle"
                  >
                    ❌
                  </Text>
                )}
                {displayVictory && (
                  <Text
                    x={polygon.center[0]}
                    y={polygon.center[1]}
                    fill="#000"
                    fontSize="60"
                    textAnchor="middle"
                    fontWeight="bold"
                    fontFamily="Courier"
                  >
                    ✌️
                  </Text>
                )}
              </G>
            );
          })}
        </Svg>
        <View
          style={{
            flexBasis: barHeight,
            height: barHeight,
            flexDirection: "row",
            width: Layout.window.width,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#002F2F",
            padding: 10,
          }}
        >
          <Button title="Help" onPress={() => navigation.navigate("How")} />
          <LuckyText style={{ color: "#fff" }}>{count}</LuckyText>
          <Button title="Home" onPress={() => navigation.navigate("Start")} />
        </View>
      </View>
    </ImageBackground>
  );
}
