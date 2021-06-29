import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, View } from "react-native-ui-lib";
import PropTypes from "prop-types";
import styles from "../styles/styles";
import Icon from "react-native-vector-icons/AntDesign";
import { useAuth } from "../utils/auth";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <>
      <SafeAreaView style={styles.screenProfile}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            paddingL-20
            paddingT-11
            paddingB-5
            row
            flex
            spread
            style={{ backgroundColor: "#3D405B" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Inicio");
              }}
              style={{ flex: 0.1 }}
            >
              <Icon name="back" size={35} color="white" />
            </TouchableOpacity>
            <Text white center h2 style={{ flex: 0.75 }}>
              Perfil
            </Text>
            <Text center h2 style={{ flex: 0.15 }} />
          </View>
          <View marginL-20 marginT-10>
            <Text h6>Nombre: {user.name}</Text>
            <Text h6>Correo electrónico: {user.email}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserProfileScreen;
