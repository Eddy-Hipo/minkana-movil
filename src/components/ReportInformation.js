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
                    <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                      Atendido por
                    </Text>
                    <Text h7 style={{ marginBottom: 20 }}>
                      {AttendedBy.name} {AttendedBy.lastname}
                    </Text>
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text h5 style={{ fontWeight: "bold", marginBottom: 5 }}>
                      Fecha de atención
                    </Text>
                    <Text h7 style={{ marginBottom: 20 }}>
                      {moment(Report.resolutionDate).format("YYYY-MM-DD")}
                    </Text>
                  </View>
                </View>
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
              {Report.veracity !== undefined ? (
                <View>
                  {Report.veracity ? (
                    <Text h5 style={{ fontWeight: "bold", marginBottom: 20 }}>
                      Denuncia Aceptada
                    </Text>
                  ) : (
                    <View>
                      <Text h5 style={{ fontWeight: "bold", marginBottom: 20 }}>
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
