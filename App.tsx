import { View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import Navigation from "./navigation/main-navigation";
import useAuthStore from "./stores/useAuthStore";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Want to show App Startup Screen while we are still initializing
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const authState = useAuthStore();
  useEffect(() => {
    console.log("*******************Application's States*********************");
    console.log("Auth Token: ", authState.token);
    console.log("IsAuthenticated: ", authState.isAuthenticated);
    console.log("IsOnboardingCompleted: ", authState.isOnboardingCompleted);
    console.log("***********************************************************");
  }, [authState]);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Make any API Calls here / Initialization logic
        await authState.getIsOnboardingCompleted();
        await Font.loadAsync({
          "Roboto-Mono": require("./assets/fonts/Libre_Franklin,Roboto_Mono/Libre_Franklin/static/LibreFranklin-ExtraBoldItalic.ttf"),
          "Roboto-Mono-light": require("./assets/fonts/Libre_Franklin,Roboto_Mono/Libre_Franklin/static/LibreFranklin-MediumItalic.ttf"),
        });
        console.log("Fonts loaded.");
        // Artificially delay for two seconds to simulate a slow loading experience
        setTimeout(() => {}, 2000);
        console.log("App readiness timeout completed.");
      } catch (error) {
        console.warn(error);
      } finally {
        // Tell the app to render
        setAppIsReady(true);
        console.log("App is now ready");
      }
    };
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    console.log("Check to hide splash screen:", appIsReady);
    if (appIsReady) {
      SplashScreen.hideAsync()
        .then(() => console.log("Splash screen successfully hidden"))
        .catch((err) => console.error("Failed to hide splash screen:", err));
    }
  }, [appIsReady]);

  if (!appIsReady) {
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
