import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/HomeScreen";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons2 from "react-native-vector-icons/MaterialIcons";

import React from "react";
import SettingScreen from "../screens/Home/SettingScreen";
import TaskScreen from "../screens/Home/Task";
import ChartScreen from "../screens/Home/Chart";
import TimerScreen from "../screens/Home/Timer";

const Tab = createBottomTabNavigator();

export default function HomeTabNavigation(): React.ReactElement {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarActiveTintColor: "red",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Task"
        component={TaskScreen}
        options={{
          tabBarLabel: "Task",
          tabBarIcon: ({ color }) => (
            <MaterialIcons2 name="checklist" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerScreen}
        options={{
          tabBarLabel: "Timer",
          tabBarIcon: ({ color }) => (
            <MaterialIcons2 name="av-timer" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Chart"
        component={ChartScreen}
        options={{
          tabBarLabel: "Chart",
          tabBarIcon: ({ color }) => (
            <MaterialIcons2 name="bar-chart" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="cog-outline" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
