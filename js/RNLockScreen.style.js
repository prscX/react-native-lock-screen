import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1
  },
  separatorContainer: {
    height: 35,
    width: "100%",
    position: "absolute",
    bottom: -1
  },
  lockContainer: {
    flex: 1
  },
  transparentContainer: {
    backgroundColor: undefined,
    opacity: 1
  },
  toastStyle: {
      backgroundColor: 'red'
  },
  toastTextStyle: {
      fontWeight: 'bold',
      color: 'white'
  }
});

export default style;
