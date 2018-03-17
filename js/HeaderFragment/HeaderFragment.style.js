import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a8df3",
    alignItems: "center"
  },
  circleGroup: {
    alignItems: "center"
  },
  circleContainer: {
    height: 200,
    justifyContent: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  circleIcon: {
    width: 32,
    height: 32
  },
  defaultTitleStyle: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  reenterTitleStyle: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  successTitleStyle: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  errorTitleStyle: {
    fontSize: 24,
    color: "#FFFFFF"
  },
  defaultDotsStyle: {
    backgroundColor: "#FFFFFF"
  },
  reenterDotsStyle: {
    backgroundColor: "#FFFFFF"
  },
  successDotsStyle: {
    backgroundColor: "#037d50"
  },
  errorDotsStyle: {
    backgroundColor: "#be0000"
  },
  passcodeVisualizerContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20
  }
});

export default style;
