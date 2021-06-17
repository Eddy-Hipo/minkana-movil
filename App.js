import React from "react";
import "./src/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/utils/auth";
import AppNavigator from "./src/components/AppNavigator";
import { ToastProvider } from "./src/utils/toast";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
