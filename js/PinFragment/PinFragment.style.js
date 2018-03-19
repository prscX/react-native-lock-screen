import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pinContainer: {
    width: "80%",
    height: "80%",
    justifyContent: "space-around",
    backgroundColor: '#FFFFFF'
  },
  pinRowContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

export default style;
