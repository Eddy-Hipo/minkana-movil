import React from "react";
import { Text } from "react-native-ui-lib";
import PropTypes from "prop-types";

const PlanScreen = ({ navigation }) => {
  return (
    <>
      <Text>Pantalla de Plan</Text>
    </>
  );
};

PlanScreen.propTypes = {
  navigation: PropTypes.object,
};
export default PlanScreen;
