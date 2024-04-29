import React, { ReactElement, useEffect, useState } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "../firebaseClient";
import { androidClient, iosClient, webClient } from "../utils/contants";
import useAuthStore from "../stores/useAuthStore";

interface IconButtonProps {
  onPress: () => void;
}

// This going to capture, when using want to sign in, open the modal screen
// display the web browser inside the application
WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton({ onPress }: IconButtonProps): ReactElement {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClient,
    iosClientId: iosClient,
    webClientId: webClient,
  });

  useEffect(() => {
    const OAuthSignIn = async () => {
      if (response?.type === "success") {
        // Build Firebase credential with the Google ID token.
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        try {
          const userInfo = await signInWithCredential(firebaseAuth, credential);
          const authToken = await userInfo.user.getIdToken();
          await useAuthStore.getState().setToken(authToken);
          await useAuthStore.getState().setIsAuthenticated();
        } catch (error) {
          console.log("Failed to sign in with google", error);
        }
      }
    };
    OAuthSignIn();
  }, [response]);

  return (
    <Pressable
      // When invoked, a web browser will open up and prompt the user for authentication
      onPress={() => promptAsync()}
      style={({ pressed }) => [styles.btnContainer, pressed && styles.btnPressed]}
    >
      <Image
        source={require("../assets/images/icons8-google-48.png")}
        style={{ width: 40, height: 35 }}
      />
      <Text style={styles.btnText}>Continue with Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    height: 50,
    gap: 20,
    borderRadius: 5,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        overflow: "hidden",
        elevation: 4,
      },
    }),
  },
  btnText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "500",
  },
  btnPressed: {
    opacity: 0.7,
    backgroundColor: "#d3d3d3",
  },
});
