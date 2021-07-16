import { StyleSheet, Dimensions } from "react-native";
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
const ITEM_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F1DE",
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
  screenProfile: {
    backgroundColor: "#F4F1DE",
    marginTop: 30,
    height: "100%",
  },

  //Estilos-Carrusel
  carouselContainer: {
    marginTop: 0,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3D405B",
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewButtons: {
    position: "absolute",
    top: "80%",
    left: "25%",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 775,
  },

  itemContainer2: {
    backgroundColor: "#3D405B",
    paddingHorizontal: 15,
    flex: 1,
    // flexDirection: "column",
    justifyContent: "space-around",
    // paddingTop: 50,
  },

  //Estido de editar perfil
  screenEditProfile: {
    backgroundColor: "#F4F1DE",
    height: "100%",
  },

  background2: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  textFileRegister: {
    width: "48%",
    marginTop: 15,
    height: 45,
    paddingHorizontal: 15,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
  },

  //estilo de reportes
  textFileReport: {
    height: 45,
    marginTop: 5,
    paddingHorizontal: 10,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },

  textAreaReport: {
    height: 90,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default styles;
