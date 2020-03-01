import React from "react";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002F2F",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 42,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#008AE5",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    width: 290,
    marginBottom: 15
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: '#008AE5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDotStyle: {
    width: 20,
    height: 20,
    backgroundColor: '#008AE5',
    borderRadius: 10,
  },
  dotStyle: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image: {
    flex: 1,
  },
  slides: {
    flex: 1,
    backgroundColor: "#002F2F",
  },
  tut: {
    width: 291,
    height: 468,
  },
  subtitle: {
    flex: 1,
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20
  },
  title: {
    color: "#fff",
    fontSize: 100,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
});
