import React, { useRef, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Button, TextField } from "react-native-ui-lib";
import PropTypes from "prop-types";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../utils/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../utils/toast";
import translateMessage from "../utils/translateMessage";
import { db } from "../utils/firebase";

const schema = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  lastname: yup.string().required("Ingresa tu apellido"),
});

const EditUserProfileScreen = ({ navigation, onClose }) => {
  const { errors, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  let nameRef = useRef();
  let lastnameRef = useRef();
  const addToast = useToast();
  const { user } = useAuth();

  const onUpdate = async (data) => {
    //console.log("Datos de registro:", data);
    //setLoading(true);
    console.log("ingreso al onUpdate");
    try {
      //await register(data);
      await db.collection("users").doc(user.uid).update({
        name: data.name,
        lastname: data.lastname,
      });
      addToast({
        position: "top",
        backgroundColor: "green",
        message: "Datos actualizados correctamente",
      });
      console.log("datos useredit update", data);
    } catch (error) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message: translateMessage(error.code),
      });
      //setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.screenEditProfile}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
          style={styles.background2}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    navigation.navigate("UserProfile");
                  }}
                  style={{ flex: 0.1 }}
                >
                  <Ionicons name="arrow-back-outline" size={35} color="white" />
                </TouchableOpacity>
                <Text white marginT-5 center h3 style={{ flex: 0.75 }}>
                  Actualizar Perfil
                </Text>
                <Text center h2 style={{ flex: 0.15 }} />
              </View>

              <View marginT-20 marginH-10>
                <Text style={{ fontWeight: "bold" }} h6>
                  Nombre
                </Text>
                <Controller
                  control={control}
                  name="name"
                  defaultValue={user.name}
                  onFocus={() => {
                    nameRef.current.focus();
                  }}
                  render={({ onChange, value }) => (
                    <TextField
                      defaultValue={user.name}
                      value={value}
                      placeholder="Nombre"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                      returnKeyType={"next"}
                      onSubmitEditing={() => lastnameRef.current.focus()}
                      ref={nameRef}
                      error={errors.name?.message}
                      enableErrors={!!errors?.name}
                    />
                  )}
                />
                <Text style={{ fontWeight: "bold" }} h6>
                  Apellido
                </Text>
                <Controller
                  control={control}
                  name="lastname"
                  defaultValue={user.lastname}
                  render={({ onChange, value }) => (
                    <TextField
                      defaultValue={user.lastname}
                      value={value}
                      placeholder="Apellido"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                      ref={lastnameRef}
                      error={errors.lastname?.message}
                      enableErrors={!!errors?.lastname}
                    />
                  )}
                />
                <Button
                  label="Actualizar"
                  labelStyle={{ fontWeight: "bold", fontSize: 17, padding: 3 }}
                  enableShadow
                  onPress={handleSubmit(onUpdate)}
                  style={{
                    backgroundColor: "#E07A5F",
                    margin: 20,
                    marginTop: 45,
                  }}
                />
                <Button
                  label="Cancelar"
                  onPress={() => {
                    navigation.navigate("UserProfile");
                  }}
                />
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default EditUserProfileScreen;
