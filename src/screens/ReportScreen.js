import React from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";
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
import { loadImageFromGallery } from "../utils/helpers";
import { uploadImage } from "../services/reports";
import { db } from "../utils/firebase";
import Loading from "../components/Loading";

const schema = yup.object().shape({
  title: yup.string().required("Ingrese un título a su denuncia."),
  description: yup.string().required("Ingrese una descripción a su denuncia."),
  incidentLocation: yup
    .string()
    .required("Ingrese el lugar en específico del abuso."),
  incidentDate: yup.string().required("Ingrese la fecha del suceso."),
  type: yup.string().required("Escoja el tipo de acoso experimentado"),
});

const ReportScreen = ({ navigation }) => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const addToast = useToast();
  const { user } = useAuth();
  const [resultImage, setResultImage] = useState(false);
  const [uriImage, setUriImage] = useState("");
  const [uriUploadImage, setUriUploadImage] = useState("");
  const [selectedValueType, setSelectedValueType] = useState("");

  const handleImage = async () => {
    setLoading(true);
    const result = await loadImageFromGallery([3, 2]);
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
    const namePhoto =
      user.uid + "Report" + moment().format("YYYY-MM-DD kk:mm:ss");
    const resultUploadImage = await uploadImage(
      result.image,
      "places",
      namePhoto
    );
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
    setLoading(false);
  };

  const onCreate = async (data) => {
    setLoading(true);
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
      await db.collection("reports").add({ ...dataTotal });
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      {loading && <Loading />}
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
                render={(props) => (
                  <TextField
                    style={styles.textFileReport}
                    placeholder="Título de la denuncia"
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    onChangeText={(value) => props.onChange(value)}
                    returnKeyType={"go"}
                    error={errors.title?.message}
                    enableErrors={!!errors.title}
                  />
                )}
              />

              <Text h6 style={{ marginTop: 15 }}>
                Descripción de la denuncia
              </Text>
              <Controller
                control={control}
                name="description"
                defaultValue=""
                render={(props) => (
                  <TextField
                    style={styles.textAreaReport}
                    autoCapitalize="sentences"
                    multiline
                    autoCorrect={false}
                    onChangeText={(value) => props.onChange(value)}
                    returnKeyType={"go"}
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
                    enableModalBlur={false}
                    topBarProps={{ title: "Tipo de acoso" }}
                    style={{
                      marginTop: 15,
                      height: 45,
                      paddingHorizontal: 15,
                      borderColor: "#E8E8E8",
                      borderWidth: 1,
                      backgroundColor: "#F6F6F6",
                      borderRadius: 5,
                    }}
                    placeholder="Escoja el tipo de acoso"
                    value={selectedValueType}
                    error={errors.type?.message}
                    enableErrors={!!errors.type}
                    onChange={(value) => {
                      props.onChange(value.value);
                      setSelectedValueType(value.value);
                    }}
                  >
                    <Picker.Item label="Físico" value="Físico" />
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
                render={(props) => (
                  <TextField
                    style={styles.textFileReport}
                    placeholder="Lugar del suceso"
                    autoCapitalize="sentences"
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
