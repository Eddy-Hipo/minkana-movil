import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Text, TextField, View } from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/styles";
import { useAuth } from "../utils/auth";
import { useToast } from "../utils/toast";
import translateMessage from "../utils/translateMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  email: yup
    .string()
    .required("Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido"),
  password: yup
    .string()
    .required("Ingresa tu clave")
    .min(6, "Ingresa como mínimo 6 caracteres"),
});

const RegisterScreen = ({ navigation }) => {
  const { errors, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  let nameRef = React.useRef();
  let emailRef = React.useRef();
  let passwordRef = React.useRef();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();

  const onCreate = async (data) => {
    console.log("Datos de registro:", data);
    setLoading(true);
    try {
      await register(data);
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
            <View>
              <Text h1>Crear una cuenta</Text>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Ingresa tu nombre" }}
                defaultValue=""
                onFocus={() => {
                  nameRef.current.focus();
                }}
                render={(props) => (
                  <TextField
                    placeholder="Nombre"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={(value) => props.onChange(value)}
                    returnKeyType={"next"}
                    onSubmitEditing={() => nameRef.current.focus()}
                    ref={nameRef}
                    error={errors.name?.message}
                    enableErrors={!!errors.name}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                rules={{ required: "Ingresa tu correo" }}
                defaultValue=""
                onFocus={() => {
                  emailRef.current.focus();
                }}
                render={(props) => (
                  <TextField
                    placeholder="Correo electrónico"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    textContentType={"emailAddress"}
                    autoCompleteType={"email"}
                    onChangeText={(value) => props.onChange(value)}
                    keyboardType={"email-address"}
                    returnKeyType={"next"}
                    onSubmitEditing={() => passwordRef.current.focus()}
                    ref={emailRef}
                    error={errors.email?.message}
                    enableErrors={!!errors.email}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                defaultValue=""
                onFocus={() => {
                  passwordRef.current.focus();
                }}
                render={(props) => (
                  <TextField
                    placeholder="Clave"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    textContentType={"password"}
                    secureTextEntry={true}
                    ref={passwordRef}
                    returnKeyType="go"
                    onChangeText={(value) => props.onChange(value)}
                    error={errors.password?.message}
                    enableErrors={!!errors.password}
                  />
                )}
              />
            </View>

            <View>
              <Button
                margin-15
                label="Crear mi cuenta"
                onPress={handleSubmit(onCreate)}
              />
              <Button
                margin-5
                link
                label="Iniciar sesión"
                onPress={() => navigation.navigate("LoginScreen")}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

RegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

export default RegisterScreen;
