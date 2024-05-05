import React from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FabButton from "../../components/FabButton";

export default function TaskScreen(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={[{ paddingTop: insets.top }, styles.container]}>
      <FabButton />
      <View style={{ marginHorizontal: width / 12 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc",
    flex: 1,
  },
});
