import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const style = StyleSheet.create({
  container: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(14) / 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    margin: 5
  }
});

export default style;
