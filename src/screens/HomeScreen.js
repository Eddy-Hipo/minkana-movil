import React, { useEffect, useState } from "react";
import { ScrollView, Modal } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import { useAuth } from "../utils/auth";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (user.role !== "ROLE_DENUNCIANTE") {
      handleOpenModal();
    }
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    logout();
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Button
          label="Generar un reporte"
          onPress={() => {
            navigation.navigate("Reportes");
          }}
        />

        <Button
          label="Ver estadísticas"
          onPress={() => {
            navigation.navigate("Estadísticas");
          }}
        />
      </ScrollView>
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
    </>
  );
};

export default HomeScreen;
