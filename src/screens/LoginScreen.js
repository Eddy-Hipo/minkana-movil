import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/styles";
import { Button, Text, TextField, View } from "react-native-ui-lib";
import { useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../utils/auth";
import translateMessage from "../utils/translateMessage";
import { useToast } from "../utils/toast";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { Octicons } from "@expo/vector-icons";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido"),
  password: yup.string().required("Ingresa tu clave"),
});

const LoginScreen = ({ navigation }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const addToast = useToast();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [viewPassword, setViewPassword] = useState(true);

  const onLogin = async (data) => {
    setLoading(true);
    try {
      await login(data);
      setLoading(false);
    } catch (error) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message: translateMessage(error.code),
      });
      setLoading(false);
    }
  };

  const handleViewPassword = () => {
    if (viewPassword) {
      setViewPassword(false);
    } else {
      setViewPassword(true);
    }
  };

  return (
    <>
      <View style={{ backgroundColor: "#3D405B", height: "100%" }}>
        <SafeAreaView style={styles.itemContainer2}>
          <LinearGradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background}
          />
          {loading && <Loading />}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <Text h1>Iniciar sesión</Text>
                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  onFocus={() => {
                    emailRef.current.focus();
                  }}
                  render={({ onChange, value }) => (
                    <TextField
                      value={value}
                      placeholder="Correo electrónico"
                      autoCapitalize={"none"}
                      autoCorrect={false}
                      textContentType={"emailAddress"}
                      autoCompleteType={"email"}
                      onChangeText={(value) => onChange(value)}
                      keyboardType={"email-address"}
                      returnKeyType={"next"}
                      onSubmitEditing={() => passwordRef.current.focus()}
                      ref={emailRef}
                      error={errors.email?.message}
                      enableErrors={!!errors?.email}
                    />
                  )}
                />

                <View row spread>
                  <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ onChange, value }) => (
                      <TextField
                        style={styles.textFieldPassword}
                        secureTextEntry={viewPassword}
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        error={errors.password?.message}
                        ref={passwordRef}
                        enableErrors={!!errors?.password}
                      />
                    )}
                  />

                  <TouchableOpacity
                    onPress={handleViewPassword}
                    style={styles.viewPassword}
                  >
                    {viewPassword ? (
                      <Octicons name="eye" size={30} color="black" />
                    ) : (
                      <Octicons name="eye-closed" size={30} color="black" />
                    )}
                  </TouchableOpacity>
                </View>

                <Button
                  label="Iniciar sesión"
                  labelStyle={{ fontWeight: "bold", fontSize: 20, padding: 5 }}
                  enableShadow
                  onPress={handleSubmit(onLogin)}
                  disabled={loading}
                  style={{
                    backgroundColor: "#E07A5F",
                    margin: 20,
                    marginTop: 45,
                  }}
                />
                <Button
                  link
                  color="white"
                  labelStyle={{ fontWeight: "bold", fontSize: 18 }}
                  label={"¿Olvidaste tu clave?"}
                  onPress={() => navigation.navigate("RecoverPasswordScreen")}
                />
                <Button
                  link
                  color="white"
                  labelStyle={{ fontWeight: "bold", fontSize: 20 }}
                  label={"Crear una cuenta"}
                  onPress={() => navigation.navigate("RegisterScreen")}
                />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </>
  );
};
LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default LoginScreen;
