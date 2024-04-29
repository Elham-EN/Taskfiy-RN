import React from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import useAuthStore from "../../stores/useAuthStore";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebaseClient";

export default function HomeScreen(): React.ReactElement {
  const authState = useAuthStore();
  return (
    <View style={{ marginHorizontal: 100 }}>
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
