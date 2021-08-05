import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, Button, TextField, Picker } from "react-native-ui-lib";
import styles from "../styles/styles";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useAuth } from "../utils/auth";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "../utils/toast";
import translateMessage from "../utils/translateMessage";
import { db } from "../utils/firebase";
import Loading from "../components/Loading";

const schema = yup.object().shape({
  name: yup.string().required("Ingresa tu nombre"),
  lastname: yup.string().required("Ingresa tu apellido"),
  gender: yup.string().required("Selecciona un género"),
  ies: yup.string().required("Selecciona una universidad"),
  memberType: yup.string().required("Selecciona un rol en la universidad"),
});

const schemaPassword = yup.object().shape({
  password: yup
    .string()
    .required("Ingresa una nueva contraseña")
    .min(6, "Ingresa como mínimo 6 caracteres"),
});

const EditUserProfileScreen = ({ navigation }) => {
  const { errors, handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    errors: errorsPassword,
    handleSubmit: handleSubmitPassword,
    control: controlPassword,
  } = useForm({
    resolver: yupResolver(schemaPassword),
  });

  const { changePasswordF } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const { user } = useAuth();
  const [selectedValueGender, setSelectedValueGender] = useState(user.gender);
  const [selectedValueIes, setSelectedValueIes] = useState(user.ies);
  const [selectedValueMemberType, setSelectedValueMemberType] = useState(
    user.memberType
  );
  const [viewPassword, setViewPassword] = useState(true);

  const onUpdate = async (data) => {
    setLoading(true);
    try {
      await db.collection("users").doc(user.uid).update({
        name: data.name,
        lastname: data.lastname,
        gender: data.gender,
        memberType: data.memberType,
        ies: data.ies,
      });
      navigation.navigate("UserProfile");
      addToast({
        position: "top",
        backgroundColor: "green",
        message: "Datos actualizados correctamente",
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

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const changePassword = async (data) => {
    setLoading(true);
    try {
      await changePasswordF(data);
      addToast({
        position: "top",
        backgroundColor: "green",
        message: "Contraseña actualizada correctamente",
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
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <SafeAreaView style={styles.screenEditProfile}>
        <LinearGradient
          colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
          style={styles.background2}
        />
        {loading && <Loading />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
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
              <View spread row>
                <Text style={{ flex: 0.53, fontWeight: "bold" }} h6>
                  Nombre
                </Text>
                <Text style={{ flex: 0.47, fontWeight: "bold" }} h6>
                  Apellido
                </Text>
              </View>
              <View spread row>
                <Controller
                  control={control}
                  name="name"
                  defaultValue={user.name}
                  render={({ onChange, value }) => (
                    <TextField
                      defaultValue={user.name}
                      style={{
                        marginTop: 5,
                        height: 45,
                        width: "48%",
                        paddingHorizontal: 15,
                        borderColor: "#E8E8E8",
                        borderWidth: 1,
                        backgroundColor: "#F6F6F6",
                        borderRadius: 5,
                      }}
                      value={value}
                      autoCapitalize="words"
                      placeholder="Nombre"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                      returnKeyType={"go"}
                      error={errors.name?.message}
                      enableErrors={!!errors?.name}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="lastname"
                  defaultValue={user.lastname}
                  render={({ onChange, value }) => (
                    <TextField
                      defaultValue={user.lastname}
                      style={{
                        marginTop: 5,
                        height: 45,
                        width: "48%",
                        paddingHorizontal: 15,
                        borderColor: "#E8E8E8",
                        borderWidth: 1,
                        backgroundColor: "#F6F6F6",
                        borderRadius: 5,
                      }}
                      value={value}
                      placeholder="Apellido"
                      autoCapitalize="words"
                      autoCorrect={false}
                      onChangeText={(value) => onChange(value)}
                      error={errors.lastname?.message}
                      enableErrors={!!errors?.lastname}
                    />
                  )}
                />
              </View>

              <Text marginT-20 style={{ fontWeight: "bold" }} h6>
                Género
              </Text>
              <Controller
                name="gender"
                control={control}
                defaultValue={user.gender}
                render={(props) => (
                  <Picker
                    enableModalBlur={false}
                    topBarProps={{ title: "Géneros" }}
                    style={styles.textFileRegisterEdit}
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

              <Text marginT-20 style={{ fontWeight: "bold" }} h6>
                Universidad
              </Text>
              <Controller
                name="ies"
                control={control}
                defaultValue={user.ies}
                render={(props) => (
                  <Picker
                    enableModalBlur={false}
                    topBarProps={{ title: "Universidades" }}
                    style={styles.textFileRegisterEdit}
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

              <Text marginT-20 style={{ fontWeight: "bold" }} h6>
                Tipo de miembro
              </Text>
              <Controller
                name="memberType"
                control={control}
                defaultValue={user.memberType}
                render={(props) => (
                  <Picker
                    enableModalBlur={false}
                    topBarProps={{ title: "Rol en la universidad" }}
                    style={styles.textFileRegisterEdit}
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

              <Button
                link
                color="#3D405B"
                labelStyle={{ fontWeight: "bold", fontSize: 20 }}
                label={"Actualizar Contraseña"}
                style={{
                  marginTop: 40,
                }}
                onPress={handleOpenModal}
              />

              <Button
                label="Actualizar"
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 18,
                  padding: 3,
                }}
                enableShadow
                onPress={handleSubmit(onUpdate)}
                style={{
                  backgroundColor: "#E07A5F",
                  marginLeft: 70,
                  marginRight: 70,
                  marginTop: 50,
                }}
              />
              <Button
                label="Cancelar"
                onPress={() => {
                  navigation.navigate("UserProfile");
                }}
                style={{
                  backgroundColor: "#3D405B",
                  marginLeft: 70,
                  marginRight: 70,
                  marginTop: 30,
                }}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
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
                  <Text h1>Actualizar Contraseña</Text>
                  <Text
                    marginT-20
                    style={{ fontWeight: "bold", marginBottom: -5 }}
                    h6
                  >
                    Nueva Contraseña
                  </Text>
                  <View row spread>
                    <Controller
                      control={controlPassword}
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
                          error={errorsPassword.password?.message}
                          enableErrors={!!errorsPassword?.password}
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
                    label="Actualizar"
                    labelStyle={{
                      fontWeight: "bold",
                      fontSize: 20,
                      padding: 5,
                    }}
                    enableShadow
                    onPress={handleSubmitPassword(changePassword)}
                    disabled={loading}
                    style={{
                      backgroundColor: "#E07A5F",
                      margin: 20,
                      marginTop: 45,
                    }}
                  />
                  <Button
                    label="Cancelar"
                    labelStyle={{ fontSize: 14, padding: 2 }}
                    enableShadow
                    onPress={handleCloseModal}
                    style={{
                      backgroundColor: "#3D405B",
                      marginLeft: 80,
                      marginRight: 80,
                      marginTop: 15,
                      marginBottom: 20,
                    }}
                  />
                </View>
              </KeyboardAvoidingView>
            </SafeAreaView>
          </View>
        </>
      </Modal>
    </>
  );
};

export default EditUserProfileScreen;
