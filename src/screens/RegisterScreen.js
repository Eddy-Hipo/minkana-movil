import React, { useState, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Button,
  Text,
  TextField,
  View,
  Picker,
  DateTimePicker,
} from "react-native-ui-lib";
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
import moment from "moment";
import { Octicons } from "@expo/vector-icons";

const schema = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  lastname: yup.string().required("Ingresa tu apellido"),
  birthdate: yup.string().required("Selecciona una fecha"),
  gender: yup.string().required("Selecciona un género"),
  ies: yup.string().required("Selecciona una universidad"),
  memberType: yup.string().required("Selecciona un rol en la universidad"),
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
  let nameRef = useRef();
  let lastnameRef = useRef();
  let emailRef = useRef();
  let ageRef = useRef();
  let passwordRef = useRef();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const [selectedValueGender, setSelectedValueGender] = useState("");
  const [selectedValueIes, setSelectedValueIes] = useState("");
  const [selectedValueMemberType, setSelectedValueMemberType] = useState("");

  const [viewPassword, setViewPassword] = useState(true);

  const onCreate = async (data) => {
    setLoading(true);
    try {
      //console.log("datos con create", data);
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
                  <View row spread>
                    <Controller
                      control={control}
                      name="birthdate"
                      defaultValue=""
                      render={(props) => (
                        <DateTimePicker
                          style={styles.textFileRegister}
                          error={errors.birthdate?.message}
                          enableErrors={!!errors.birthdate}
                          placeholder={"Fecha nacimiento"}
                          minimumDate={
                            new Date(
                              moment()
                                .subtract(70, "years")
                                .format("YYYY-MM-DD")
                            )
                          }
                          maximumDate={
                            new Date(
                              moment()
                                .subtract(18, "years")
                                .format("YYYY-MM-DD")
                            )
                          }
                          dateFormat={"YYYY-MM-DD"}
                          onChange={(value) => {
                            let fe1 = moment(value).format("YYYY-MM-DD");
                            props.onChange(fe1);
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={(props) => (
                        <Picker
                          placeholder="Escoja un género"
                          useNativePicker
                          topBarProps={{
                            title: "Género",
                            doneLabel: "Aceptar",
                            cancelLabel: "Cancelar",
                          }}
                          value={selectedValueGender}
                          error={errors.gender?.message}
                          enableErrors={!!errors.gender}
                          style={styles.textFileRegister}
                          onChange={(value) => {
                            props.onChange(value);
                            setSelectedValueGender(value);
                          }}
                        >
                          <Picker.Item label="Masculino" value="Masculino" />
                          <Picker.Item label="Femenino" value="Femenino" />
                        </Picker>
                      )}
                    />
                  </View>

                  <Controller
                    name="ies"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <Picker
                        enableModalBlur={false}
                        topBarProps={{ title: "Universidades" }}
                        style={{
                          marginTop: 15,
                          height: 45,
                          paddingHorizontal: 15,
                          borderColor: "#E8E8E8",
                          borderWidth: 1,
                          backgroundColor: "#F6F6F6",
                          borderRadius: 5,
                        }}
                        showSearch
                        searchPlaceholder={"Busqua tu universidad"}
                        searchStyle={{
                          color: "black",
                          placeholderTextColor: "black",
                        }}
                        placeholder="Escoje tu universidad"
                        value={selectedValueIes}
                        error={errors.ies?.message}
                        enableErrors={!!errors.ies}
                        onChange={(value) => {
                          props.onChange(value.value);
                          setSelectedValueIes(value.value);
                        }}
                      >
                        <Picker.Item
                          label="Escuela Politécnica Nacional (EPN)"
                          value="Escuela Politécnica Nacional"
                        />
                        <Picker.Item
                          label="Universidad Central del Ecuador (UCE)"
                          value="Universidad Central del Ecuador"
                        />
                        <Picker.Item
                          label="Pontificia Uni. Católica del Ecuador (PUCE)"
                          value="Pontificia Uni. Católica del Ecuador"
                        />
                        <Picker.Item
                          label="Escuela Politécnica del Ejército (ESPE)"
                          value="Escuela Politécnica del Ejército"
                        />
                        <Picker.Item
                          label="Escuela Sup. Politécnica del Litoral (ESPOL)"
                          value="Escuela Sup. Politécnica del Litoral"
                        />
                        <Picker.Item
                          label="Universidad Andina Simón Bolívar (UASB)"
                          value="Universidad Andina Simón Bolívar"
                        />

                        <Picker.Item
                          label="Universidad Internacional del Ecuador (UIDE)"
                          value="Universidad Internacional del Ecuador"
                        />
                        <Picker.Item
                          label="Universidad San Francisco de Quito (USFQ)"
                          value="Universidad San Francisco de Quito"
                        />
                        <Picker.Item
                          label="Universidad Tecnológica Equinoccial (UTE)"
                          value="Universidad Tecnológica Equinoccial"
                        />
                        <Picker.Item
                          label="Universidad de las Américas (UDLA)"
                          value="Universidad de las Américas"
                        />
                      </Picker>
                    )}
                  />

                  <Controller
                    name="memberType"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <Picker
                        placeholder="Escoje tu rol en la universidad"
                        useNativePicker
                        topBarProps={{
                          title: "Rol en la universidad",
                          doneLabel: "Aceptar",
                          cancelLabel: "Cancelar",
                        }}
                        value={selectedValueMemberType}
                        error={errors.memberType?.message}
                        enableErrors={!!errors.memberType}
                        style={styles.textFileRegister}
                        onChange={(value) => {
                          props.onChange(value);
                          setSelectedValueMemberType(value);
                        }}
                      >
                        <Picker.Item label="Estudiante" value="Estudiante" />
                        <Picker.Item label="Docente" value="Docente" />
                        <Picker.Item
                          label="Administrativo"
                          value="Administrativo"
                        />
                        <Picker.Item label="Servicios" value="Servicios" />
                      </Picker>
                    )}
                  />

                  <View row spread>
                    <Controller
                      control={control}
                      name="password"
                      defaultValue=""
                      onFocus={() => {
                        passwordRef.current.focus();
                      }}
                      render={(props) => (
                        <TextField
                          style={styles.textFieldPassword}
                          placeholder="Contraseña"
                          autoCapitalize={"none"}
                          autoCorrect={false}
                          textContentType={"password"}
                          secureTextEntry={viewPassword}
                          ref={passwordRef}
                          returnKeyType="go"
                          onChangeText={(value) => {
                            props.onChange(value);
                          }}
                          error={errors.password?.message}
                          enableErrors={!!errors.password}
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
