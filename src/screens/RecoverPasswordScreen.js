import React, { useRef, useState } from "react";
import {
  Button,
  Colors,
  LoaderScreen,
  Text,
  TextField,
  View,
} from "react-native-ui-lib";
import { KeyboardAvoidingView, Platform } from "react-native";
import styles from "../styles/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../utils/auth";
import { useToast } from "../utils/toast";
import translateMessage from "../utils/translateMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";

const ReviewSchema = yup.object().shape({
  email: yup
    .string()
    .email("Ingresa un correo electrónico válido")
    .required("Ingresa tu correo"),
});

const RecoverPasswordScreen = ({ navigation }) => {
  const emailRef = useRef();
  const { sendPasswordResetEmail } = useAuth();
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      await sendPasswordResetEmail(data.email);
      addToast({
        backgroundColor: "green",
        message:
          "Se ha enviado un correo a " +
          data.email +
          " que te permitirá restablecer tu contraseña. Revisa tu bandeja de entrada.",
      });
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      addToast({
        backgroundColor: "#CC0000",
        message: translateMessage(error.code),
      });
      setLoading(false);
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "#3D405B", height: "100%" }}>
        <SafeAreaView style={styles.itemContainer2}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background}
          />
          {loading && (
            <LoaderScreen
              message="Un momento..."
              overlay
              backgroundColor={Colors.primary + "aa"}
              loaderColor={Colors.white}
              messageStyle={{ color: Colors.white }}
              margin-10
            />
          )}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
          >
            <View>
              <View>
                <Text h1 black>
                  Recuperar contraseña
                </Text>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  onFocus={() => {
                    emailRef.current.focus();
                  }}
                  render={({ onChange, value }) => (
                    <TextField
                      placeholder="Correo electrónico"
                      autoCapitalize={"none"}
                      autoCorrect={false}
                      ref={emailRef}
                      keyboardType={"email-address"}
                      autoCompleteType={"email"}
                      onChangeText={(value) => onChange(value)}
                      onSubmitEditing={() => emailRef.current.focus()}
                      value={value}
                      error={errors.email?.message}
                      enableErrors={!!errors.email}
                    />
                  )}
                />
                <Button
                  margin-15
                  label="Enviar"
                  labelStyle={{ fontWeight: "bold", fontSize: 20, padding: 5 }}
                  enableShadow
                  style={{
                    backgroundColor: "#E07A5F",
                    margin: 20,
                    marginTop: 45,
                    marginLeft: 50,
                    marginRight: 50,
                  }}
                  onPress={handleSubmit(onSubmit)}
                />
                <Button
                  link
                  margin-20
                  color="white"
                  label={"Cancelar"}
                  labelStyle={{ fontWeight: "bold", fontSize: 20 }}
                  onPress={() => navigation.navigate("LoginScreen")}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
};

RecoverPasswordScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default RecoverPasswordScreen;
