import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    flex: 1,
    // flexDirection: "column",
    justifyContent: "space-around",
    // paddingTop: 50,
  },
  view: {
    height: "100%",
    justifyContent: "center",
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#000000",
  },
  homeHeaderText: {
    fontWeight: "400",
    fontSize: 30,
    paddingTop: 10,
    lineHeight: 36,
    color: "white",
  },
});

export default styles;
