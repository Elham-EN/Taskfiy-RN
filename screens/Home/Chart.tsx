import React from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChartScreen(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      <View style={{ marginHorizontal: width / 12 }}>
        <Text>Chart Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc",
    flex: 1,
  },
});
