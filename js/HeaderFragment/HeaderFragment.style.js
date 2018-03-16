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
  passcodeVisualizerContainer: {
    width: "100%",
    alignItems: "center",
    padding: 20
  }
});

export default style;
