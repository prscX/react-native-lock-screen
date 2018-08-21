import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4a8df3",
    alignItems: "center",
    justifyContent: "space-around"
  },
  circleGroup: {
    flex: 1.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  circleContainer: {
    paddingBottom: 20
  },
  circle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(50) / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  circleIcon: {
    width: moderateScale(14),
    height: moderateScale(14)
  },
  defaultTitleStyle: {
    fontSize: moderateScale(14),
    color: "#FFFFFF"
  },
  reenterTitleStyle: {
    fontSize: moderateScale(14),
    color: "#FFFFFF"
  },
  successTitleStyle: {
    fontSize: moderateScale(14),
    color: "#FFFFFF"
  },
  errorTitleStyle: {
    fontSize: moderateScale(14),
    color: "#FFFFFF"
  },
  passcodeVisualizerContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default style;
