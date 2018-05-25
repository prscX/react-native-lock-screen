import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    minWidth: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  pin: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#7c7c7c"
  },
  suggestion: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#adadad",
    marginTop: 10
  },
  image: {
    height: 32,
    width: 32
  }
});

export default style;
