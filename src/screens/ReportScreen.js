import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useRef, useState } from "react";
import {
  Text,
  TextField,
  Button,
  View,
  DateTimePicker,
  Picker,
} from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../styles/styles";
import translateMessage from "../utils/translateMessage";
import { useToast } from "../utils/toast";
import { useAuth } from "../utils/auth";
import moment from "moment";
import { db } from "../utils/firebase";

const schema = yup.object().shape({
  title: yup.string().required("Ingrese un título a su denuncia."),
  description: yup.string().required("Ingrese un contenido a su denuncia."),
  incidentLocation: yup
    .string()
    .required("Ingrese el lugar en específico del abuso."),
  incidentDate: yup
    .string()
    .required("Ingrese la fecha cuando ocurrio el suceso."),
  type: yup.string().required("Escoja el tipo de acoso recibido"),
});

const ReportScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const addToast = useToast();
  const { user } = useAuth();

  const dateOccurredRef = useRef();
  const titleComplaintRef = useRef();
  const complaintRef = useRef();
  const typeRef = useRef();
  const placeRef = useRef();

  const [selectedValueType, setSelectedValueType] = useState("");

  const onCreate = async (data) => {
    try {
      const dataTotal = {
        ...data,
        whistleblower: user.uid,
        status: "Pendiente",
        emitionDate: moment().format("YYYY-MM-DD kk:mm:ss"),
      };
      //console.log("datos del reporte total2", dataTotal);
      await db.collection("reports").add({ ...dataTotal });
      navigation.navigate("Inicio");
      addToast({
        position: "top",
        backgroundColor: "green",
        message: "Reporte registrado con éxito",
      });
    } catch (error) {
      addToast({
        position: "top",
        backgroundColor: "#CC0000",
        message: translateMessage(error.code),
      });
    }
  };

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View margin-10>
                <Text
                  h1
                  style={{
                    color: "#E07A5F",
                  }}
                >
                  Ingrese su denuncia
                </Text>
                <Text h6>Titulo</Text>
                <Controller
                  control={control}
                  name="title"
                  defaultValue=""
                  onFocus={() => {
                    titleComplaintRef.current.focus();
                  }}
                  render={(props) => (
                    <TextField
                      ref={titleComplaintRef}
                      style={styles.textFileReport}
                      placeholder="Título de la denuncia"
                      autoCapitalize="words"
                      autoCorrect={false}
                      onChangeText={(value) => props.onChange(value)}
                      returnKeyType={"next"}
                      onSubmitEditing={() => complaintRef.current.focus()}
                      error={errors.title?.message}
                      enableErrors={!!errors.title}
                    />
                  )}
                />

                <Text h6 style={{ marginTop: 15 }}>
                  Cuerpo de la denuncia
                </Text>
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required:
                      "Ingresa un contenido en el cuerpo de la denunciae",
                  }}
                  defaultValue=""
                  onFocus={() => {
                    complaintRef.current.focus();
                  }}
                  render={(props) => (
                    <TextField
                      ref={complaintRef}
                      style={styles.textAreaReport}
                      //expandable
                      autoCapitalize="none"
                      multiline
                      autoCorrect={false}
                      onChangeText={(value) => props.onChange(value)}
                      returnKeyType={"next"}
                      onSubmitEditing={() => typeRef.current.focus()}
                      error={errors.description?.message}
                      enableErrors={!!errors.description}
                    />
                  )}
                />

                <Text h6 style={{ marginTop: 15 }}>
                  Tipo de acoso
                </Text>
                <Controller
                  name="type"
                  control={control}
                  defaultValue=""
                  onFocus={() => {
                    typeRef.current.focus();
                  }}
                  render={(props) => (
                    <Picker
                      ref={typeRef}
                      placeholder="Escoja el tipo de acoso"
                      useNativePicker
                      value={selectedValueType}
                      error={errors.type?.message}
                      enableErrors={!!errors.type}
                      topBarProps={{
                        title: "Tipo de acoso",
                        doneLabel: "Aceptar",
                        cancelLabel: "Cancelar",
                      }}
                      //style={styles.textFileRegister}
                      onChange={(value) => {
                        props.onChange(value);
                        setSelectedValueType(value);
                      }}
                    >
                      <Picker.Item label="Fisico" value="Físico" />
                      <Picker.Item label="Psicológico" value="Psicológico" />
                      <Picker.Item label="Verbal" value="Verbal" />
                      <Picker.Item label="Escrito" value="Escrito" />
                      <Picker.Item label="Visual" value="Visual" />
                    </Picker>
                  )}
                />

                <Text h6 style={{ marginTop: 15 }}>
                  Lugar dentro de la IES
                </Text>
                <Controller
                  control={control}
                  name="incidentLocation"
                  defaultValue=""
                  onFocus={() => {
                    placeRef.current.focus();
                  }}
                  render={(props) => (
                    <TextField
                      ref={placeRef}
                      style={styles.textFileReport}
                      placeholder="Lugar del suceso"
                      autoCapitalize="words"
                      autoCorrect={false}
                      onChangeText={(value) => props.onChange(value)}
                      error={errors.incidentLocation?.message}
                      enableErrors={!!errors.incidentLocation}
                    />
                  )}
                />
                <Text h6 style={{ marginTop: 15 }}>
                  Fecha del suceso
                </Text>
                <Controller
                  control={control}
                  name="incidentDate"
                  defaultValue=""
                  render={(props) => (
                    <DateTimePicker
                      ref={dateOccurredRef}
                      error={errors.incidentDate?.message}
                      enableErrors={!!errors.incidentDate}
                      placeholder={"Seleccione la fecha del suseso"}
                      minimumDate={
                        new Date(
                          moment().subtract(1, "months").format("YYYY-MM-DD")
                        )
                      }
                      maximumDate={
                        new Date(moment().add(1, "days").format("YYYY-MM-DD"))
                      }
                      dateFormat={"YYYY-MM-DD"}
                      onChange={(value) => {
                        let fe1 = moment(value).format("YYYY-MM-DD");
                        props.onChange(fe1);
                      }}
                    />
                  )}
                />

                <Button
                  label="Crear reporte"
                  labelStyle={{ fontWeight: "bold", fontSize: 20, padding: 5 }}
                  enableShadow
                  onPress={handleSubmit(onCreate)}
                  style={{
                    backgroundColor: "#E07A5F",
                    margin: 20,
                    marginTop: 30,
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default ReportScreen;
