import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Button, View, Text, Image } from "react-native-ui-lib";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { scrollInterpolator, animatedStyles } from "../utils/animations";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Entypo } from "@expo/vector-icons";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

const LandingScreen = ({ navigation }) => {
  const DATA = [];
  for (let i = 0; i < 3; i++) {
    DATA.push(i);
  }
  const [aux, setAux] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <LinearGradient
          colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
          style={styles.background}
        />
        {item === 0 ? (
          <View
            marginB-80
            style={{
              width: "90%",
              height: 150,
              backgroundColor: "transparent",
            }}
          >
            <Image
              source={require("../../assets/logo-minkana-saturato.png")}
              style={{
                height: 100,
                width: "100%",
              }}
              cover={false}
            />
          </View>
        ) : item === 1 ? (
          <View
            marginB-120
            style={{ width: "80%", backgroundColor: "transparent" }}
          >
            <Text marginB-40 h1 style={{ color: "#E07A5F" }}>
              Sabías que...
            </Text>
            <View center spread>
              <View
                marginB-30
                style={{
                  alignItems: "center",
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                  backgroundColor: "#E07A5F",
                }}
              >
                <Entypo
                  name="location-pin"
                  size={50}
                  color="white"
                  style={{ paddingTop: 20 }}
                />
              </View>
            </View>

            <Text
              marginB-30
              h5
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              En Ecuador
            </Text>
            <Text
              h6
              style={{ textAlign: "center", color: "#565656", lineHeight: 30 }}
            >
              El acoso sexual en las Instituciones de Educación Superior (IES)
              es una forma de violencia de género que, a día de hoy, afecta a
              colectivos de estudiantes, docentes, personal administrativo y de
              servicios.
            </Text>
          </View>
        ) : (
          <View
            marginB-100
            style={{ width: "80%", backgroundColor: "transparent" }}
          >
            <View spread center>
              <View
                marginB-30
                style={{
                  alignItems: "center",
                  height: 90,
                  width: 90,
                  borderRadius: 50,
                  backgroundColor: "#E07A5F",
                }}
              >
                <AntDesign
                  name="rocket1"
                  size={40}
                  color="white"
                  style={{ paddingTop: 25 }}
                />
              </View>
            </View>
            <Text
              marginB-25
              h5
              style={{ textAlign: "center", fontWeight: "bold" }}
            >
              Minkana te ofrece...
            </Text>
            <Text
              h6
              style={{ textAlign: "center", color: "#565656", lineHeight: 30 }}
            >
              Un sistema de auxilio donde los miembros de las diferentes IES de
              la ciudad de Quito pueden reportar situaciones de acoso sexual
              para posteriormente recibir ayuda inmediata.
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={{ backgroundColor: "#3D405B", height: "100%" }}>
        <SafeAreaView>
          <Carousel
            data={DATA}
            loop={true}
            loopClonesPerSide={1}
            autoplay={true}
            autoplayDelay={800}
            autoplayInterval={6000}
            renderItem={renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            scrollInterpolator={scrollInterpolator}
            slideInterpolatedStyle={animatedStyles}
            useScrollView={true}
          />
          <View
            style={{
              flex: 1,
              position: "absolute",
              top: "73%",
              left: "50%",
              transform: [
                { translateX: -Dimensions.get("window").width * 0.13 },
              ],
            }}
          >
            <Pagination
              dotsLength={3}
              activeDotIndex={aux}
              dotColor={"rgba(0, 0, 0, 0.92)"}
              inactiveDotColor={"black"}
              inactiveDotOpacity={0.92}
              inactiveDotScale={0.92}
            />
          </View>

          <View style={styles.viewButtons}>
            <View style={{ marginRight: 70, marginLeft: 70 }}>
              <Button
                style={{
                  backgroundColor: "#E07A5F",
                  marginBottom: 20,
                }}
                labelStyle={{ fontWeight: "bold", fontSize: 20 }}
                label={"Iniciar sesión"}
                onPress={() => navigation.navigate("LoginScreen")}
              />
              <Button
                link
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "white",
                }}
                label={"Crear una cuenta"}
                onPress={() => navigation.navigate("RegisterScreen")}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default LandingScreen;
