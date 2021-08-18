import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
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

const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Ingresa tu nombre")
    .matches(nameRegex, "Solo se permiten letras"),
  lastname: yup
    .string()
    .required("Ingresa tu apellido")
    .matches(nameRegex, "Solo se permiten letras"),
  birthdate: yup.number().required("Selecciona una fecha"),
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
      await register(data);
      addToast({
        position: "top",
        backgroundColor: "green",
        message: "Cuenta creada con éxito",
      });
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
            <View>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                  <Text h1>Crear una cuenta</Text>
                  <View style={{ marginBottom: -15, marginTop: -5 }} spread row>
                    <Text style={{ flex: 0.53 }} h6>
                      Nombre
                    </Text>
                    <Text style={{ flex: 0.47 }} h6>
                      Apellido
                    </Text>
                  </View>
                  <View row spread>
                    <Controller
                      control={control}
                      name="name"
                      defaultValue=""
                      render={(props) => (
                        <TextField
                          style={styles.textFileRegister}
                          placeholder="Nombre"
                          autoCapitalize="words"
                          autoCorrect={false}
                          onChangeText={(value) => props.onChange(value)}
                          returnKeyType="go"
                          error={errors.name?.message}
                          enableErrors={!!errors.name}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="lastname"
                      defaultValue=""
                      render={(props) => (
                        <TextField
                          style={styles.textFileRegister}
                          placeholder="Apellido"
                          autoCapitalize="words"
                          autoCorrect={false}
                          onChangeText={(value) => props.onChange(value)}
                          returnKeyType="go"
                          error={errors.lastname?.message}
                          enableErrors={!!errors.lastname}
                        />
                      )}
                    />
                  </View>
                  <Text
                    h6
                    style={{
                      marginTop: 7,
                      marginBottom: -15,
                    }}
                  >
                    Correo electrónico
                  </Text>
                  <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={(props) => (
                      <TextField
                        placeholder="Correo electrónico"
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        textContentType={"emailAddress"}
                        autoCompleteType={"email"}
                        onChangeText={(value) => props.onChange(value)}
                        keyboardType={"email-address"}
                        returnKeyType="go"
                        error={errors.email?.message}
                        enableErrors={!!errors.email}
                      />
                    )}
                  />

                  <Text
                    h6
                    style={{
                      marginTop: 7,
                    }}
                  >
                    Fecha de nacimiento
                  </Text>
                  <Text
                    h8
                    style={{
                      marginTop: -5,
                      marginBottom: -13,
                      color: "#CC0000",
                    }}
                  >
                    Nota: Al momento de seleccionar una fecha, presionar el
                    botón aceptar.
                  </Text>
                  <Controller
                    control={control}
                    name="birthdate"
                    defaultValue={undefined}
                    render={(props) => (
                      <DateTimePicker
                        style={styles.textFileRegister}
                        error={errors.birthdate?.message}
                        enableErrors={!!errors.birthdate}
                        placeholder={"Fecha de nacimiento"}
                        minimumDate={
                          new Date(
                            moment().subtract(70, "years").format("YYYY-MM-DD")
                          )
                        }
                        maximumDate={
                          new Date(
                            moment().subtract(18, "years").format("YYYY-MM-DD")
                          )
                        }
                        dateFormat={"YYYY-MM-DD"}
                        onChange={(value) => {
                          const tp = moment(value).valueOf();
                          props.onChange(tp);
                        }}
                      />
                    )}
                  />

                  <Text
                    h6
                    style={{
                      marginTop: 7,
                      marginBottom: -15,
                    }}
                  >
                    Género
                  </Text>
                  <Controller
                    name="gender"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <Picker
                        enableModalBlur={false}
                        topBarProps={{ title: "Géneros" }}
                        style={{
                          marginTop: 15,
                          height: 45,
                          paddingHorizontal: 15,
                          borderColor: "#E8E8E8",
                          borderWidth: 1,
                          backgroundColor: "#F6F6F6",
                          borderRadius: 5,
                        }}
                        placeholder="Escoje tu género"
                        value={selectedValueGender}
                        error={errors.gender?.message}
                        enableErrors={!!errors.gender}
                        onChange={(value) => {
                          props.onChange(value.value);
                          setSelectedValueGender(value.value);
                        }}
                      >
                        <Picker.Item label="Femenino" value="Femenino" />
                        <Picker.Item label="Masculino" value="Masculino" />
                        <Picker.Item label="Otro" value="Otro" />
                      </Picker>
                    )}
                  />
                  <Text
                    h6
                    style={{
                      marginTop: 7,
                      marginBottom: -15,
                    }}
                  >
                    Universidad
                  </Text>
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
                        searchPlaceholder={"Busca tu universidad"}
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
                          label="Universidad Politécnica Salesiana (UPS)"
                          value="Universidad Politécnica Salesiana"
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
                  <Text
                    h6
                    style={{
                      marginTop: 7,
                      marginBottom: -15,
                    }}
                  >
                    Rol que ocupa en la universidad
                  </Text>
                  <Controller
                    name="memberType"
                    control={control}
                    defaultValue=""
                    render={(props) => (
                      <Picker
                        enableModalBlur={false}
                        topBarProps={{ title: "Rol en la universidad" }}
                        style={{
                          marginTop: 15,
                          height: 45,
                          paddingHorizontal: 15,
                          borderColor: "#E8E8E8",
                          borderWidth: 1,
                          backgroundColor: "#F6F6F6",
                          borderRadius: 5,
                        }}
                        placeholder="Escoje tu rol en la universidad"
                        value={selectedValueMemberType}
                        error={errors.memberType?.message}
                        enableErrors={!!errors.memberType}
                        onChange={(value) => {
                          props.onChange(value.value);
                          setSelectedValueMemberType(value.value);
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

                  <Text
                    h6
                    style={{
                      marginTop: 7,
                      marginBottom: -15,
                    }}
                  >
                    Contraseña
                  </Text>
                  <View row spread>
                    <Controller
                      control={control}
                      name="password"
                      defaultValue=""
                      render={(props) => (
                        <TextField
                          style={styles.textFieldPassword}
                          placeholder="Contraseña"
                          autoCapitalize={"none"}
                          autoCorrect={false}
                          textContentType={"password"}
                          secureTextEntry={viewPassword}
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
                      marginTop: 25,
                      marginBottom: 10,
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
              </ScrollView>
            </View>
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
