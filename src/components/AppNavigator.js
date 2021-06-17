import React, { useEffect } from "react";
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import { useAuth } from "../utils/auth";
import * as SplashScreen from "expo-splash-screen";
import Loading from "./Loading";

const AppNavigator = () => {
  const { user } = useAuth();
  const isAuthenticated = !!user; // Esto equivale a hacer user !== null && user !== false;

  useEffect(() => {
    const init = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.log(e);
      }
    };
    init().then();
  }, []);

  if (user === null) {
    return <Loading />;
  } else {
    SplashScreen.hideAsync();
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};
export default AppNavigator;
