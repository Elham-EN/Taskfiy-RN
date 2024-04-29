import React from "react";
import { Text, StyleSheet, Platform, View } from "react-native";

export default function BtnLoader() {
  return (
    <View style={styles.btnContainer}>
      <Text style={styles.btnText}>Loading...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#da4563",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
