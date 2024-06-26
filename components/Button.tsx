import React, { ReactElement } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
  btnTitle: string;
  btnColor: string;
  btnTitleColor: string;
  onPress: () => void;
}

export default function Button({
  btnColor,
  btnTitle,
  btnTitleColor,
  onPress,
}: ButtonProps): ReactElement {
  const styles = StyleSheet.create({
    btnContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: btnColor,
      height: 50,
      borderRadius: 5,
      width: "100%",
      marginVertical: 20,
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
      color: btnTitleColor,
      fontSize: 18,
      fontWeight: "bold",
    },
    btnPressed: {
      opacity: 0.7,
    },
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btnContainer, pressed && styles.btnPressed]}
    >
      <Text style={styles.btnText}>{btnTitle}</Text>
    </Pressable>
  );
}
