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
import { LinearGradient } from "expo-linear-gradient";

const schema = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  lastname: yup.string().required("Ingresa tu apellido"),
  age: yup
    .string()
    .required("Ingrese una edad")
    .length(2, "La edad debe ser de 2 digitos.")
    .test("", "La edad debe estar entre 18 a 65 años.", (value) => {
      return value >= 18 && value <= 65;
    }),

  email: yup
    .string()
    .required("Ingresa tu correo electrónico")
    .email("Ingresa un correo electrónico válido"),
  password: yup
    .string()
    .required("Ingresa tu contraseña")
    .min(6, "Ingresa como mínimo 6 caracteres"),
});

const RegisterScreen = ({ navigation }) => {
  const { errors, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  let nameRef = React.useRef();
  let lastnameRef = React.useRef();
  let emailRef = React.useRef();
  let ageRef = React.useRef();
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
    <>
      <View style={{ backgroundColor: "#3D405B", height: "100%" }}>
        <SafeAreaView style={styles.itemContainer2}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#E1E1E1", "#D5D5D5", "#3D405B"]}
            style={styles.background}
          />
          {loading && <Loading />}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "position" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View>
                  <Text h1>Crear una cuenta</Text>
                  <View row spread>
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
                          style={styles.textFileRegister}
                          placeholder="Nombre"
                          autoCapitalize="words"
                          autoCorrect={false}
                          onChangeText={(value) => props.onChange(value)}
                          returnKeyType={"next"}
                          onSubmitEditing={() => lastnameRef.current.focus()}
                          ref={nameRef}
                          error={errors.name?.message}
                          enableErrors={!!errors.name}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="lastname"
                      rules={{ required: "Ingresa tu apellido" }}
                      defaultValue=""
                      onFocus={() => {
                        lastnameRef.current.focus();
                      }}
                      render={(props) => (
                        <TextField
                          style={styles.textFileRegister}
                          placeholder="Apellido"
                          autoCapitalize="words"
                          autoCorrect={false}
                          onChangeText={(value) => props.onChange(value)}
                          returnKeyType={"next"}
                          onSubmitEditing={() => emailRef.current.focus()}
                          ref={lastnameRef}
                          error={errors.lastname?.message}
                          enableErrors={!!errors.lastname}
                        />
                      )}
                    />
                  </View>
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
                        onSubmitEditing={() => ageRef.current.focus()}
                        ref={emailRef}
                        error={errors.email?.message}
                        enableErrors={!!errors.email}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="age"
                    defaultValue=""
                    onFocus={() => {
                      ageRef.current.focus();
                    }}
                    render={(props) => (
                      <TextField
                        style={styles.textFileRegister}
                        placeholder="Edad"
                        autoCorrect={false}
                        onChangeText={(value) => props.onChange(value)}
                        returnKeyType={"next"}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        ref={ageRef}
                        error={errors.age?.message}
                        enableErrors={!!errors.age}
                        keyboardType="numeric"
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
                        placeholder="Contraseña"
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
                    labelStyle={{
                      fontWeight: "bold",
                      fontSize: 20,
                      padding: 5,
                    }}
                    enableShadow
                    label="Crear mi cuenta"
                    onPress={handleSubmit(onCreate)}
                    style={{
                      backgroundColor: "#E07A5F",
                      margin: 20,
                      marginTop: 45,
                    }}
                  />
                  <Button
                    color="white"
                    labelStyle={{ fontWeight: "bold", fontSize: 20 }}
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
      </View>
    </>
  );
};

RegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onChange: PropTypes.func,
};

export default RegisterScreen;
