import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import OnboardingScreen1 from "./screens/onboarding/OnboardingScreen1";
import OnboardingScreen2 from "./screens/onboarding/OnboardingScreen2";
import OnboardingScreen3 from "./screens/onboarding/OnboardingScreen3";
import LoginScreen from "./screens/auth/LoginScreen";
import SignupScreen from "./screens/auth/SignupScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./constants/colors";
import { RootStackParamList } from "./types/navigationTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import useAuthStore from "./stores/useAuthStore";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack(): React.ReactElement {
  return (
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
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="Onboarding3" component={OnboardingScreen3} />
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

export default function App() {
  // Want to show App Startup Screen while we are still initializing
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [fontLoaded, fontError] = Font.useFonts({
    "Roboto-Mono": require("./assets/fonts/Libre_Franklin,Roboto_Mono/Libre_Franklin/static/LibreFranklin-ExtraBoldItalic.ttf"),
    "Roboto-Mono-light": require("./assets/fonts/Libre_Franklin,Roboto_Mono/Libre_Franklin/static/LibreFranklin-MediumItalic.ttf"),
  });

  useEffect(() => {
    const prepare = async () => {
      try {
        // Make any API Calls here
        // Artificially delay for two seconds to simulate a slow loading experience
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the app to render
        setAppIsReady(true);
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady || fontLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontLoaded, fontError]);

  if (!appIsReady && !fontLoaded && !fontError) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Navigation />
          <Toast />
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
