import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native-ui-lib";
import moment from "moment";
import PropTypes from "prop-types";

const ReportInformation = ({ Report, onCancel, AttendedBy }) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={{ height: "100%" }}>
          <LinearGradient
            colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
            style={styles.background2}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              paddingL-10
              paddingT-15
              paddingB-7
              row
              spread
              style={{ backgroundColor: "#3D405B" }}
            >
              <TouchableOpacity onPress={onCancel}>
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              </TouchableOpacity>
              <Text white center h2>
                Información
              </Text>
              <Text />
            </View>
            <View margin-15>
              <Text
                h2
                marginT-5
                marginB-20
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                {Report.title}
              </Text>
              <Image
                borderRadius={25}
                source={{ uri: Report.photoURL }}
                style={{
                  height: 300,
                  width: "100%",
                }}
                cover={false}
              />
              <View marginT-25 spred row>
                <View style={{ width: "40%" }}>
                  <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Estado
                  </Text>
                  <Text h7 style={{ marginBottom: 20 }}>
                    {Report.status}
                  </Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Fecha del incidente
                  </Text>
                  <Text h7 style={{ marginBottom: 20 }}>
                    {moment(Report.incidentDate).format("YYYY-MM-DD")}
                  </Text>
                </View>
              </View>
              {AttendedBy.data ? (
                <View spred row>
                  <View style={{ width: "40%" }}>
                    {Report.status !== "En proceso" ? (
                      <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                        Atendido por
                      </Text>
                    ) : (
                      <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                        Aceptado por
                      </Text>
                    )}

                    <Text h7 style={{ marginBottom: 20 }}>
                      {AttendedBy.name} {AttendedBy.lastname}
                    </Text>
                  </View>
                  <View style={{ width: "60%" }}>
                    {Report.status !== "En proceso" ? (
                      <>
                        <Text
                          h5
                          style={{ fontWeight: "bold", marginBottom: 5 }}
                        >
                          Fecha de atención
                        </Text>
                        <Text h7 style={{ marginBottom: 20 }}>
                          {moment(Report.resolutionDate).format("YYYY-MM-DD")}
                        </Text>
                      </>
                    ) : null}
                  </View>
                </View>
              ) : null}
              <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                Tipo de acoso
              </Text>
              <Text
                h7
                style={{
                  marginBottom: 20,
                  lineHeight: 24,
                  textAlign: "justify",
                }}
              >
                {Report.type}
              </Text>
              {Report.type === "Otro" ? (
                <>
                  <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Acoso en específico
                  </Text>
                  <Text
                    h7
                    style={{
                      marginBottom: 20,
                      lineHeight: 24,
                      textAlign: "justify",
                    }}
                  >
                    {Report.anotherType}
                  </Text>
                </>
              ) : null}
              <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                IES donde ocurrio el suceso
              </Text>
              <Text
                h7
                style={{
                  marginBottom: 20,
                  lineHeight: 24,
                  textAlign: "justify",
                }}
              >
                {Report.iesOccurred}
              </Text>
              <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                Lugar específico del suceso
              </Text>
              <Text
                h7
                style={{
                  marginBottom: 20,
                  lineHeight: 24,
                  textAlign: "justify",
                }}
              >
                {Report.incidentLocation}
              </Text>
              <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                Descripción
              </Text>
              <Text
                h7
                style={{
                  marginBottom: 20,
                  lineHeight: 24,
                  textAlign: "justify",
                }}
              >
                {Report.description}
              </Text>
              {Report.status !== "En proceso" ? (
                Report.veracity !== undefined ? (
                  <View>
                    {Report.veracity ? (
                      <>
                        <Text
                          h5
                          style={{ fontWeight: "bold", marginBottom: 5 }}
                        >
                          Denuncia
                        </Text>
                        <Text
                          h7
                          style={{
                            marginBottom: 20,
                            lineHeight: 24,
                            textAlign: "justify",
                          }}
                        >
                          Atendida - Aceptada
                        </Text>
                        <Text
                          h5
                          style={{ fontWeight: "bold", marginBottom: 5 }}
                        >
                          Proceso a seguir
                        </Text>
                        <Text
                          h7
                          style={{
                            marginBottom: 20,
                            lineHeight: 24,
                            textAlign: "justify",
                          }}
                        >
                          {`1.- El administrador que atendió su denuncia se contactará por medio del correo electrónico proporcionado.\n 2.- Estar pendiente del correo electrónico para recibir más instrucciones. \n 3.- Dentro de un máximo de 5 días laborables el reporte se resolverá completamente.`}
                        </Text>
                      </>
                    ) : (
                      <View>
                        <Text
                          h5
                          style={{ fontWeight: "bold", marginBottom: 20 }}
                        >
                          Denuncia Rechazada
                        </Text>

                        {Report.rejectionReason !== undefined ? (
                          <View>
                            <Text
                              h5
                              style={{ fontWeight: "bold", marginBottom: 5 }}
                            >
                              Razón
                            </Text>
                            <Text
                              h7
                              style={{
                                marginBottom: 20,
                                lineHeight: 24,
                                textAlign: "justify",
                              }}
                            >
                              {Report.rejectionReason}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    )}
                  </View>
                ) : null
              ) : null}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

ReportInformation.propTypes = {
  Chef: PropTypes.any,
  onCancel: PropTypes.func,
  navigation: PropTypes.object,
};

export default ReportInformation;
