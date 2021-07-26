import React, { useEffect, useState } from "react";
import { Text, DateTimePicker, Button, View, Image } from "react-native-ui-lib";
import { ScrollView } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { loadImageFromGallery } from "../utils/helpers";
//import { launchCamera, launchImageLibrary } from "react-native-image-picker";
//import ImagePicker from "react-native-image-picker";

const StatisticsScreen = () => {
  const [resultImage, setResultImage] = useState(false);
  const [uriImage, setUriImage] = useState("");

  const handleImage = async () => {
    const result = await loadImageFromGallery([1, 1]);
    console.log("resultado imagen", result);
    if (result.image) {
      setResultImage(true);
      setUriImage(result.image);
    }
  };

  return (
    <>
      <View style={{ height: "80%" }}>
        <ScrollView>
          <Text>Estadisticas</Text>
        </ScrollView>
      </View>
    </>
  );
};

StatisticsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default StatisticsScreen;
