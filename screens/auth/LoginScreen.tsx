import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Image,
  Text,
  Pressable,
} from "react-native";
import TextInput from "../../components/TextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import GoogleButton from "../../components/GoogleButton";
import { LoginScreenNavigationProps } from "../../types/navigationTypes";

export default function LoginScreen({
  navigation,
}: LoginScreenNavigationProps): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  return (
    <View
      style={[
        { paddingTop: insets.top, marginHorizontal: width / 12 },
        styles.formContainer,
      ]}
    >
      <Image source={require("../../assets/images/login.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label={"Email"}
          placeholder="Please enter your email"
          onChangeText={() => {}}
        />
        <PasswordInput />
        <Button
          btnTitle="Sign In"
          btnColor="#da4563"
          btnTitleColor="white"
          onPress={() => {}}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.resetPasswordContainer}>
          <Text>FORGOT YOUR PASSWORD?</Text>
          <Pressable style={({ pressed }) => pressed && styles.resetPasswordPressed}>
            <Text style={styles.resetPasswordText}>RESET PASSWORD</Text>
          </Pressable>
        </View>
        <Divider text="OR LOGIN WITH" />
        <GoogleButton onPress={() => {}} />
        <View style={styles.SignUpContainer}>
          <Text>DONT HAVE AN ACCOUNT?</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("SignUp");
            }}
            style={({ pressed }) => pressed && styles.resetPasswordPressed}
          >
            <Text style={styles.resetPasswordText}>SIGN UP</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    gap: 20,
  },
  bottomContainer: {
    width: "100%",
    marginVertical: 16,
    flex: 2,
  },
  resetPasswordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  resetPasswordText: {
    color: "#2196F3",
    fontWeight: "bold",
  },
  resetPasswordPressed: {
    opacity: 0.7,
  },
  SignUpContainer: {
    marginVertical: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
