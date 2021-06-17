import React from "react";
import { ScrollView } from "react-native";
import { Text } from "react-native-ui-lib";
import PropTypes from "prop-types";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>Pantalla de incio</Text>
      </ScrollView>
    </>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HomeScreen;
