import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-ui-lib";
import PropTypes from "prop-types";

const ReportScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Pantalla de Reporte</Text>
      </ScrollView>
    </>
  );
};

export default ReportScreen;
