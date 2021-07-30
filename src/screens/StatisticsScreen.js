import React from "react";
import { Text, View } from "react-native-ui-lib";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";

import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";
import { Ionicons } from "@expo/vector-icons";

const StatisticsScreen = ({ navigation }) => {
  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#E1E1E1", "#D5D5D5", "#F4F1DE"]}
        style={styles.background2}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ height: "88.5%", marginBottom: 2, marginTop: 2 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text>Estadísticas</Text>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
