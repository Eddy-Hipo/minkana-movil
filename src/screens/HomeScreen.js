import React, { useEffect, useState } from "react";
import { ScrollView, Modal, TouchableOpacity } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useAuth } from "../utils/auth";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import Loading from "../components/Loading";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleAccount, setModalVisibleAccount] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.role !== "ROLE_WHISTLEBLOWER") {
      handleOpenModal();
    } else {
      if (user.account !== "Habilitada") {
        handleOpenModalAccount();
      }
    }
    setLoading(false);
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
        // Background Linear Gradient
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
                    navigation.navigate("Notificaciones");
                  }}
                >
                  <View center style={{ width: "100%", height: "100%" }}>
                    <Ionicons name="notifications" size={100} color="white" />
                    <Text marginT-20 white h6 style={{ fontWeight: "bold" }}>
                      Notificaciones
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View center marginT-30>
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
            // Background Linear Gradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background2}
          />
          <Text marginT-100 h1 style={{ color: "#CC0000" }}>
            Aviso!!!
          </Text>
          <Text margin-30 h4 style={{ lineHeight: 30, textAlign: "justify" }}>
            Su cuenta esta registrada como un usuario Administrador, por esa
            razón no puede acceder a la aplicación móvil, porfavor acceder a la
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
            // Background Linear Gradient
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
