import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1
  },
  separatorContainer: {
    height: 100,
    width: "100%",
    position: "absolute",
    bottom: -30
  },
  lockContainer: {
    flex: 1
  },
  transparentContainer: {
    backgroundColor: undefined,
    opacity: 1
  }
});

export default style;
