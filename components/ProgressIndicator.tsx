import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressIndicatorProp {
  totalSteps: number;
  currentStep: number;
}

export default function ProgressIndicator({
  totalSteps,
  currentStep,
}: ProgressIndicatorProp): ReactElement {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentStep === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "red", // Active dot color
  },
  inactiveDot: {
    backgroundColor: "#ccc", // Inactive dot color
  },
});
