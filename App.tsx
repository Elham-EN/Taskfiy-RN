import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import OnboardingScreen1 from "./screens/onboarding/OnboardingScreen1";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack(): React.ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Only authenticated users can access these screen
function AuthenticatedStack(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function Navigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App(): React.JSX.Element {
  return (
    <>
      <StatusBar style="light" />
      <Navigation />
    </>
  );
}
