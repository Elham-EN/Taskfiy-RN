import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";
import React from "react";
import colors from "../constants/colors";
import OnboardingScreen1 from "../screens/onboarding/OnboardingScreen1";
import OnboardingScreen2 from "../screens/onboarding/OnboardingScreen2";
import OnboardingScreen3 from "../screens/onboarding/OnboardingScreen3";
import HomeScreen from "../screens/Home/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import useAuthStore from "../stores/useAuthStore";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import HomeTabNavigation from "./tab-navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation(): React.ReactElement {
  const authState = useAuthStore();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => {
          return {
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.onBoardingBackground,
            },
          };
        }}
      >
        {!authState.isOnboardingCompleted && (
          <Stack.Group>
            <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
            <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
            <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
          </Stack.Group>
        )}
        {!authState.isAuthenticated && (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignupScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgotPasswordScreen} />
          </Stack.Group>
        )}
        {authState.isAuthenticated && (
          <Stack.Group>
            <Stack.Screen name="HomeTab" component={HomeTabNavigation} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
