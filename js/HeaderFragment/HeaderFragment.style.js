import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a8df3",
    alignItems: "center",
    justifyContent: "space-around"
  },
  circleGroup: {
    flex: 1.5,
    width: '100%',
    alignItems: "center",
    justifyContent: 'center'
  },
  circleContainer: {
    paddingBottom: 20
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
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: 'center'
  }
});

export default style;
