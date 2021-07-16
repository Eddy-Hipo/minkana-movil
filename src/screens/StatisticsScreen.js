import React, { useEffect, useState } from "react";
import { Button, View } from "react-native-ui-lib";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";

const StatisticsScreen = () => {
  return (
    <>
      <View style={{ height: "80%" }}>
        <ScrollView></ScrollView>
      </View>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
