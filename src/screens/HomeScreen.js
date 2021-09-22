import React, { useEffect, useState } from "react";
import { ScrollView, Modal, TouchableOpacity } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useAuth } from "../utils/auth";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { AntDesign, Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";
import Loading from "../components/Loading";
import { db } from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAccount, setModalVisibleAccount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numNotifications, setNumNotifications] = useState(0);

  useEffect(() => {
    if (user.role !== "ROLE_WHISTLEBLOWER") {
      handleOpenModal();
    } else {
      if (user.account !== "Habilitada") {
        handleOpenModalAccount();
      }
    }
    setIsSubscribed(true);

    if (isSubscribed) {
      let aux = 0;
      aux = numNotifications;
      db.collection("reports")
        .where("whistleblower", "==", user.uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              aux = aux + 1;
              setNumNotifications(aux);
            }
          });
        });
      aux = 0;
    }
    setLoading(false);
    return () => setIsSubscribed(false);
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleOpenModalAccount = () => {
    setModalVisibleAccount(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setModalVisibleAccount(false);
    logout();
  };

  return (
    <>
      <LinearGradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      {loading && <Loading />}
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View marginT-30>
            <View marginR-25 marginL-25 spread row>
              <View center style={styles.cardHome}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Reportes");
                  }}
                >
                  <View center style={{ width: "100%", height: "100%" }}>
                    <AntDesign name="solution1" size={100} color="white" />
                    <Text marginT-20 white h6 style={{ fontWeight: "bold" }}>
                      Crear Reporte
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View center style={styles.cardHome}>
                <TouchableOpacity
                  onPress={() => {
                    setNumNotifications(0);

                    navigation.navigate("Notificaciones");
                  }}
                >
                  <View
                    center
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    {numNotifications !== 0 ? (
                      <View
                        style={{
                          position: "absolute",
                          top: "10%",
                          left: "50%",
                        }}
                      >
                        <FontAwesome name="circle" size={25} color="red" />
                      </View>
                    ) : null}

                    <Ionicons name="notifications" size={100} color="white" />
                    <Text marginT-20 white h6 style={{ fontWeight: "bold" }}>
                      Notificaciones
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View marginR-25 marginL-25 marginT-30 spread row>
              <View center style={styles.cardHome}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Estadisticas");
                  }}
                >
                  <View center style={{ width: "100%", height: "100%" }}>
                    <Entypo name="bar-graph" size={100} color="white" />
                    <Text marginT-20 white h6 style={{ fontWeight: "bold" }}>
                      Estadísticas
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View center style={styles.cardHome}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Noticias");
                  }}
                >
                  <View center style={{ width: "100%", height: "100%" }}>
                    <Entypo name="news" size={100} color="white" />
                    <Text marginT-20 white h6 style={{ fontWeight: "bold" }}>
                      Noticias
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View flex style={{ height: "100%", justifyContent: "space-around" }}>
          <LinearGradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background2}
          />
          <Text marginT-100 h1 style={{ color: "#CC0000" }}>
            Aviso!!!
          </Text>
          <Text margin-30 h4 style={{ lineHeight: 30, textAlign: "justify" }}>
            Su cuenta esta registrada como usuario Administrador, por esa razón
            no puede acceder a la aplicación móvil, porfavor acceder a la
            aplicación web para ejercer acciones de Administrador.
          </Text>
          <Text margin-30 h4>
            Gracias por su comprensión.
          </Text>
          <Button
            label="Aceptar"
            onPress={handleCloseModal}
            style={{
              backgroundColor: "#E07A5F",
              margin: 90,
            }}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={modalVisibleAccount}
        onRequestClose={handleCloseModal}
      >
        <View flex style={{ height: "100%", justifyContent: "space-around" }}>
          <LinearGradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background2}
          />
          <Text marginT-100 h1 style={{ color: "#CC0000" }}>
            Cuenta Inhabilitada
          </Text>
          <Text margin-30 h4 style={{ lineHeight: 30, textAlign: "justify" }}>
            Su cuenta ha sido inhabilitada por un Administrador, debido a que
            incumple con las normas establecidas, por esa razón no puede acceder
            a la aplicación móvil, porfavor comunicarse con el administrador de
            su IES.
          </Text>
          <Text margin-30 h4>
            Gracias por su comprensión.
          </Text>
          <Button
            label="Aceptar"
            onPress={handleCloseModal}
            style={{
              backgroundColor: "#E07A5F",
              margin: 90,
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;
