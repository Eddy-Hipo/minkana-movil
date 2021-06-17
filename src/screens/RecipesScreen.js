import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native-ui-lib";

const RecipesScreen = ({ navigation }) => {
  return (
    <>
      <Text>Pantala de Receta</Text>
    </>
  );
};

RecipesScreen.propTypes = {
  navigation: PropTypes.object,
};
export default RecipesScreen;
