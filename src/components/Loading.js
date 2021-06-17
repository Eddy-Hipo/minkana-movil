import React from "react";
import { Colors, LoaderScreen } from "react-native-ui-lib";

const Loading = () => {
  return (
    <LoaderScreen
      message="Un momento..."
      overlay
      backgroundColor={Colors.primary + "aa"}
      loaderColor={Colors.white}
      messageStyle={{ color: Colors.white }}
      margin-10
    />
  );
};

export default Loading;
