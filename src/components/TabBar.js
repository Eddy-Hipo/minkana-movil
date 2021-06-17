import React from "react";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from "react-native-vector-icons/AntDesign";
import HomeScreen from "../screens/HomeScreen";
import RecipesScreen from "../screens/RecipesScreen";
import PlanScreen from "../screens/PlanScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const TabBar = () => {
  const Tab = AnimatedTabBarNavigator();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#F4F1DE",
        inactiveTintColor: "#222222",
        activeBackgroundColor: "#3D405B",
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={size ? size : 10}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Recetas"
        component={RecipesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="filetext1"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="calendar"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="barschart"
              size={size ? size : 24}
              color={focused ? color : "#222222"}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBar;
