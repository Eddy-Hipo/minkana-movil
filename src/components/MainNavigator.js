import React, { useState, useEffect } from "react";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button, View, Dialog } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import StatisticsScreen from "../screens/StatisticsScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import EditUserProfileScreen from "../screens/EditUserProfileScreen";
import ReportScreen from "../screens/ReportScreen";
import NotificationScreen from "../screens/NotificationsScreen";
import { useAuth } from "../utils/auth";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStackNavigator = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerTitleStyle: {
            display: "none",
          },
          headerRight: () => (
            <Text style={{ marginRight: 20 }}>Hola {user.name}</Text>
          ),
          headerLeft: () => (
            <Icon
              onPress={() => navigation.openDrawer()}
              name="bars"
              style={{ padding: 15 }}
              size={25}
              color="#000"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Reportes"
        component={ReportScreen}
        options={{
          headerTitle: "Denuncias",
          headerStyle: {
            height: 100,
            backgroundColor: "#3D405B",
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Notificaciones"
        component={NotificationScreen}
        options={{
          headerTitle: "Notificaciones",
          headerStyle: {
            backgroundColor: "#3D405B",
            height: 100,
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Estadisticas"
        component={StatisticsScreen}
        options={{
          headerTitle: "Estadisticas",
          headerStyle: {
            backgroundColor: "#3D405B",
            height: 100,
          },
          headerTitleStyle: {
            color: "white",
            fontSize: 25,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{ headerTitle: "Perfil", headerShown: false }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfileScreen}
        options={{ headerTitle: "Actualizar Perfil", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const CustomDrawerContent = ({ ...props }) => {
  const { logout } = useAuth();
  const [visibleModal, setVisibleModal] = useState(false);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
        bottom: 0,
      }}
    >
      <DrawerItemList {...props} />
      <View
        style={{
          position: "absolute",
          bottom: 40,
          alignSelf: "center",
          width: "100%",
          height: 50,
          backgroundColor: "#3D405B",
          paddingTop: 13,
        }}
      >
        <Button
          label="Cerrar sesión"
          style={{
            alignSelf: "center",
          }}
          onPress={() => {
            setVisibleModal(true);
          }}
          labelStyle={{
            fontWeight: "bold",
            fontSize: 20,
            color: "white",
            textDecorationLine: "underline",
            textDecorationStyle: "solid",
            textDecorationColor: "#000000",
          }}
          link
        />
      </View>
      <Dialog
        migrate
        useSafeArea
        containerStyle={{
          backgroundColor: "white",
          paddingTop: 30,
          paddingBottom: 30,
          paddingRight: 20,
          paddingLeft: 20,
          marginLeft: 10,
          marginRight: 10,
        }}
        visible={visibleModal}
        onRequestClose={() => {
          setVisibleModal(false);
        }}
        onDismiss={() => {
          setVisibleModal(false);
        }}
      >
        <Text h5>¿Desea cerrar sesión?</Text>
        <View spread row marginT-25 marginH-20>
          <Button
            label="No"
            style={{
              alignSelf: "center",
            }}
            onPress={() => {
              setVisibleModal(false);
            }}
            labelStyle={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          />
          <Button
            label="Sí"
            style={{
              alignSelf: "center",
              backgroundColor: "#E07A5F",
            }}
            onPress={logout}
            labelStyle={{
              fontWeight: "bold",
              fontSize: 20,
              color: "white",
            }}
          />
        </View>
      </Dialog>
    </DrawerContentScrollView>
  );
};

const MainNavigator = ({ username, logoutAction }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent logoutAction={logoutAction} {...props} />
      )}
    >
      <Drawer.Screen name="Inicio">
        {() => <MainStackNavigator username={username} />}
      </Drawer.Screen>
      <Drawer.Screen name="Perfil" component={UserProfileScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
