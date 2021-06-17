import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Ingresa tu correo")
    .email("Ingresa un correo válido"),
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

  const onLogin = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      await login(data);
      console.log("Inicio de sesión exitoso");
    } catch (error) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message: translateMessage(error.code),
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
                  placeholder="Email"
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

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ onChange, value }) => (
                <TextField
                  secureTextEntry={true}
                  placeholder="Clave"
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

            <Button
              label="Iniciar sesión"
              enableShadow
              onPress={handleSubmit(onLogin)}
              disabled={loading}
            />
            <Button
              link
              label={"¿Olvidaste tu clave?"}
              onPress={() => navigation.navigate("RecoverPasswordScreen")}
            />
            <Button
              link
              labelStyle={{ fontWeight: "bold", fontSize: 20 }}
              label={"Crear una cuenta"}
              onPress={() => navigation.navigate("RegisterScreen")}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default LoginScreen;
