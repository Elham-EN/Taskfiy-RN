import React, { ReactElement } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
      width: "80%",
      height: 50,
      borderRadius: 50,
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
