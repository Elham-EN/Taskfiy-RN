import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

interface DividerWithTextProps {
  text: string;
}

const DividerWithText: React.FC<DividerWithTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text.toUpperCase()}</Text>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  textWrapper: {
    paddingHorizontal: 8,
  },
  text: {
    color: "#808080",
    fontWeight: "bold",
  },
});

export default DividerWithText;
