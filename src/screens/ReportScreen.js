import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRef, useState } from "react";
import {
  Text,
  TextField,
  Button,
  View,
  DateTimePicker,
  Picker,
  Image,
} from "react-native-ui-lib";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import translateMessage from "../utils/translateMessage";
import { useToast } from "../utils/toast";
import { useAuth } from "../utils/auth";
import moment from "moment";
import { numReport } from "../hooks/useReports";
import { loadImageFromGallery } from "../utils/helpers";
import { uploadImage } from "../services/reports";
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
  const placeRef = useRef();

  //const reportsRef = dataReports.getReportsTotal(user.uid);
  const [resultImage, setResultImage] = useState(false);
  const [uriImage, setUriImage] = useState("");
  const [numReportsRef] = numReport();
  const [uriUploadImage, setUriUploadImage] = useState("");
  const [selectedValueType, setSelectedValueType] = useState("");

  const handleImage = async () => {
    const result = await loadImageFromGallery([3, 2]);
    //console.log("resultado imagen", result);
    if (result.image) {
      setResultImage(true);
      setUriImage(result.image);
    } else {
      setResultImage(false);
      setUriImage("");
    }
    if (!result.status) {
      return;
    }
    const numReport = numReportsRef + 1;
    const namePhoto = user.uid + "Report" + numReport;
    //console.log("nomreb foto a guardar", namePhoto);
    const resultUploadImage = await uploadImage(
      result.image,
      "places",
      namePhoto
    );
    //console.log("url firebase photo", resultUploadImage);
    if (!resultUploadImage.statusResponse) {
      Alert.alert(
        "Ha ocurrido un error al almacenar la evidencia de la denuncia"
      );
      setResultImage(false);
      setUriImage("");
      setUriUploadImage("");
      return;
    }
    setUriUploadImage(resultUploadImage.url);
  };

  const onCreate = async (data) => {
    try {
      let dataTotal = {};
      if (!resultImage) {
        dataTotal = {
          ...data,
          whistleblower: user.uid,
          status: "Pendiente",
          emitionDate: moment().format("YYYY-MM-DD kk:mm:ss"),
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/minkana-5ca07.appspot.com/o/places%2Fimagendenuncia.jpg?alt=media&token=02c8315f-8433-4167-b26f-58a3c59b5d0e",
        };
      } else {
        dataTotal = {
          ...data,
          whistleblower: user.uid,
          status: "Pendiente",
          emitionDate: moment().format("YYYY-MM-DD kk:mm:ss"),
          photoURL: uriUploadImage,
        };
      }

      //console.log("datos del reporte total2", dataTotal);
      //const dataReportsScreen = await dataReports();

      //console.log("datos total report en reportScreen num ", numReportsRef);

      await db.collection("reports").add({ ...dataTotal });

      setResultImage(false);
      setUriImage("");
      setUriUploadImage("");
      navigation.navigate("Home");
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
        <View style={{ marginBottom: 5, marginTop: 2 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View marginT-10 marginL-10 marginR-10>
              <Text h1>Ingrese su denuncia</Text>
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
                    autoCapitalize="sentences"
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
                  required: "Ingresa un contenido en el cuerpo de la denunciae",
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
                    autoCapitalize="sentences"
                    multiline
                    autoCorrect={false}
                    onChangeText={(value) => props.onChange(value)}
                    returnKeyType={"next"}
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
                render={(props) => (
                  <Picker
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
                    <Picker.Item label="" value="" />
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
                        moment().subtract(15, "days").format("YYYY-MM-DD")
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

              <Text h6 style={{ marginTop: 15, marginBottom: 10 }}>
                Adjunta una prueba (Opcional)
              </Text>
              <View marginH-15>
                {resultImage ? (
                  <Image
                    borderRadius={25}
                    source={{ uri: uriImage }}
                    style={{
                      height: 250,
                      width: "100%",
                    }}
                    cover={false}
                  />
                ) : null}
              </View>
              <Button
                label="Selecciona una imagen"
                labelStyle={{ fontSize: 14, padding: 2 }}
                enableShadow
                onPress={handleImage}
                style={{
                  backgroundColor: "#3D405B",
                  marginLeft: 80,
                  marginRight: 80,
                  marginTop: 15,
                  marginBottom: 20,
                }}
              />

              <Button
                label="Crear reporte"
                labelStyle={{
                  fontWeight: "bold",
                  fontSize: 20,
                  padding: 5,
                }}
                enableShadow
                onPress={handleSubmit(onCreate)}
                style={{
                  backgroundColor: "#E07A5F",
                  marginLeft: 50,
                  marginRight: 50,
                  marginTop: 20,
                  marginBottom: 20,
                }}
              />
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ReportScreen;
