import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const style = StyleSheet.create({
  container: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(16) / 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    margin: 5
  }
});

export default style;
