import React from "react";
import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import Button from "../../components/Button";
import useAuthStore from "../../stores/useAuthStore";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebaseClient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const authState = useAuthStore();
  return (
    <View
      style={[{ paddingTop: insets.top, marginHorizontal: width / 12 }, styles.container]}
    >
      <Text>HomeScreen</Text>
      <Button
        btnColor="orange"
        btnTitle="Logout"
        btnTitleColor="white"
        onPress={async () => {
          await authState.logout();
          await signOut(firebaseAuth);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
