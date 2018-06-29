import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const style = StyleSheet.create({
  container: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(12) / 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    margin: 5
  }
});

export default style;
