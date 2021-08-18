import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Text, View, Button, Image } from "react-native-ui-lib";
import styles from "../styles/styles";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../utils/auth";
import { loadImageFromGallery } from "../utils/helpers";
import { uploadImage } from "../services/reports";
import Loading from "../components/Loading";
import { useToast } from "../utils/toast";
import { db } from "../utils/firebase";

const UserProfileScreen = ({ navigation }) => {
  const { user } = useAuth();
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  const [uriImage, setUriImage] = useState("");

  console.log("datos user perfil: ", user);

  const handleImage = async () => {
    setLoading(true);
    let result;
    try {
      result = await loadImageFromGallery([1, 1]);
    } catch (error) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message: "Revise su conexión de Internet",
      });
    }

    if (result.image) {
      setResultImage(true);
      setUriImage(result.image);
    } else {
      setResultImage(false);
      setUriImage("");
      setLoading(false);
    }
    if (!result.status) {
      setLoading(false);
      return;
    }

    const resultUploadImage = await uploadImage(
      result.image,
      "profile",
      user.uid
    );
    if (!resultUploadImage.statusResponse) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message:
          "Ocurrió un error al actuaizar su foto de perfil. Revise su conexión a inetrnet.",
      });
      setResultImage(false);
      setUriImage("");
      setLoading(false);
      return;
    }
    await db
      .collection("users")
      .doc(user.uid)
      .update({ photoProfile: resultUploadImage.url });

    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={styles.screenProfile}>
        <LinearGradient
          colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
          style={styles.background2}
        />
        {loading && <Loading />}
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

          <View marginT-20 marginB-10 style={{ alignItems: "center" }}>
            <Image
              borderRadius={50}
              source={{ uri: user.photoProfile }}
              style={{
                height: 140,
                width: 130,
              }}
              cover={false}
            />
          </View>
          <Button
            label="Actualizar foto de perfil"
            labelStyle={{ fontSize: 14, padding: 2 }}
            enableShadow
            onPress={handleImage}
            style={{
              backgroundColor: "#E07A5F",
              marginLeft: 100,
              marginRight: 100,
              marginBottom: 30,
            }}
          />

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
