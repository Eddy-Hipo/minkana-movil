import React from "react";
import { Text } from "react-native-ui-lib";
import PropTypes from "prop-types";

const StatisticsScreen = () => {
  return (
    <>
      <Text>Pantalla de Estadísticas</Text>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
