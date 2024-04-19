import React, { ReactElement } from "react";
import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface IconButtonProps {
  onPress: () => void;
}

export default function GoogleButton({ onPress }: IconButtonProps): ReactElement {
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

  return (
    <Pressable
      onPress={onPress}
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
