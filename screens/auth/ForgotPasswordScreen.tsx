import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ForgotPasswordSchema } from "../../schema/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../../firebaseClient";
import { ForgotPasswordScreenNavigationProps } from "../../types/navigationTypes";

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenNavigationProps): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(false);

  const { control, handleSubmit, formState } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(firebaseAuth, data.email);
      setLoading(false);
      // Navigate to login screen after successful reset email sent
      navigation.replace("Login");
    } catch (error) {
      console.log("Failed to send password reset email", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ paddingTop: insets.top, marginHorizontal: width / 12 }, styles.container]}
    >
      <Text style={styles.text}>Forgot Password</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/forgotPassword.jpg")}
        />
      </View>
      <View style={styles.formContainer}>
        <Text>
          Enter your email and link will be sent to your email to create new password
        </Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                mode="outlined"
                label={"Email"}
                placeholder="Please enter your email"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="email"
          />
          {formState.errors.email && (
            <Text style={{ color: "#ff0000" }}>{formState.errors.email.message}</Text>
          )}
          <Button
            btnTitle={loading ? "loading" : "Reset Password"}
            btnColor="#da4563"
            btnTitleColor="white"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    height: 400,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 10,
  },
  inputContainer: {
    width: "100%",
  },
});
