import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Text, View, Button } from "react-native-ui-lib";
import PropTypes from "prop-types";
import styles from "../styles/styles";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../utils/auth";
import { LinearGradient } from "expo-linear-gradient";
import EditUserProfileScreen from "./EditUserProfileScreen";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.screenProfile}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
          style={styles.background2}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            paddingL-20
            paddingT-15
            paddingB-5
            row
            flex
            spread
            style={{ backgroundColor: "#3D405B" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={{ flex: 0.1 }}
            >
              <Ionicons name="arrow-back-outline" size={35} color="white" />
            </TouchableOpacity>
            <Text white center h2 style={{ flex: 0.75 }}>
              Perfil
            </Text>
            <Text center h2 style={{ flex: 0.15 }} />
          </View>
          <View
            marginB-10
            marginT-20
            style={{
              alignItems: "center",
              height: 140,
              width: 140,
              borderRadius: 50,
              marginLeft: "33%",
            }}
          >
            <FontAwesome5 name="user-secret" size={120} color="#000000" />
          </View>
          <View center>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Nombre
            </Text>
            <Text marginB-17 h5>
              {user.name} {user.lastname}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Correo electrónico
            </Text>
            <Text marginB-17 h5>
              {user.email}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Edad
            </Text>
            <Text marginB-17 h5>
              {user.age}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Género
            </Text>
            <Text marginB-17 h5>
              {user.gender}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Institución de Educación Superior
            </Text>
            <Text marginB-17 h5>
              {user.ies}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Tipo
            </Text>
            <Text marginB-20 h5>
              {user.member}
            </Text>
            <Button
              label="Actualizar Perfil"
              onPress={() => {
                navigation.navigate("EditUserProfile");
              }}
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          statusBarTranslucent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <EditUserProfileScreen onClose={handleCloseModal} />
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default UserProfileScreen;
