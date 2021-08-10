import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Text, View, Button } from "react-native-ui-lib";
import styles from "../styles/styles";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../utils/auth";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useAuth();

  return (
    <>
      <SafeAreaView style={styles.screenProfile}>
        <LinearGradient
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
          <View marginH-30>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Nombre
            </Text>
            <Text marginL-5 marginB-17 h6>
              {user.name} {user.lastname}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Correo electrónico
            </Text>
            <Text marginL-5 marginB-17 h6>
              {user.email}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Edad
            </Text>
            <Text marginL-5 marginB-17 h6>
              {moment().diff(user.birthdate, "years")} años
            </Text>

            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Género
            </Text>
            <Text marginL-5 marginB-17 h6>
              {user.gender}
            </Text>

            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Institución de Educación Superior
            </Text>
            <Text marginL-5 marginB-17 h6>
              {user.ies}
            </Text>
            <Text style={{ fontWeight: "bold" }} marginB-7 h6>
              Tipo
            </Text>
            <Text marginL-5 marginB-20 h6>
              {user.memberType}
            </Text>
            <Button
              label="Actualizar Perfil"
              onPress={() => {
                navigation.navigate("EditUserProfile");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserProfileScreen;
