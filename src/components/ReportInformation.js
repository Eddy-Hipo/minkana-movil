import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Button, Image } from "react-native-ui-lib";

import PropTypes from "prop-types";

const ReportInformation = ({ Report, onCancel, navigation }) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <View style={{ height: "100%" }}>
          <LinearGradient
            // Background Linear Gradient
            colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
            style={styles.background2}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              paddingL-10
              paddingT-15
              paddingB-7
              row
              flex
              spread
              style={{ backgroundColor: "#3D405B" }}
            >
              <TouchableOpacity onPress={onCancel}>
                <Ionicons name="arrow-back-outline" size={35} color="white" />
              </TouchableOpacity>
              <Text white center h2>
                Información del reporte
              </Text>
              <Text />
            </View>
            <View margin-15>
              <Text h1>{Report.title}</Text>
              <View spred row>
                <View style={{ width: "38%" }}>
                  <Text h4 style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Estado
                  </Text>
                  <Text h6 style={{ marginBottom: 20 }}>
                    {Report.status}
                  </Text>
                </View>
                <View style={{ width: "58%" }}>
                  <Text h4 style={{ fontWeight: "bold", marginBottom: 5 }}>
                    Fecha del incidente
                  </Text>
                  <Text h6 style={{ marginBottom: 20 }}>
                    {Report.incidentDate}
                  </Text>
                </View>
              </View>
              <Text h4 style={{ fontWeight: "bold", marginBottom: 5 }}>
                Descripción
              </Text>
              <Text h6 style={{ marginBottom: 20 }}>
                {Report.description}
              </Text>
              <Text h4 style={{ fontWeight: "bold", marginBottom: 10 }}>
                Prueba
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
