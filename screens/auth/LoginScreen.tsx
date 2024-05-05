import React, { useEffect } from "react";
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
import useAuthStore from "../../stores/useAuthStore";
import { Controller, useForm } from "react-hook-form";
import { LoginFormData } from "../../types/formDataTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema } from "../../schema/loginUserSchema";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../services/auth.service";
import { showToast } from "../../utils/showToast";
import LoadingSpinner from "../../components/CircleLoader";

export default function LoginScreen({
  navigation,
}: LoginScreenNavigationProps): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const { control, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginUserSchema),
  });

  const mutation = useMutation({
    mutationFn: (newData: LoginFormData) => {
      return apiClient.signinUser(newData);
    },
    onSuccess: async (data) => {
      await useAuthStore.getState().setToken(data.token);
      await useAuthStore.getState().setIsAuthenticated();
      showToast("success", "User logged in", "Ready to start a task?");
    },
    onError: (error: Error) => {
      showToast("error", "Cannot sign in", error.message);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <View
      style={[
        { paddingTop: insets.top, marginHorizontal: width / 12 },
        styles.formContainer,
      ]}
    >
      <Image source={require("../../assets/images/login.png")} />
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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <PasswordInput value={value} onChangeText={onChange} />
          )}
          name="password"
        />
        {formState.errors.password && (
          <Text style={{ color: "#ff0000" }}>{formState.errors.password.message}</Text>
        )}
        {mutation.isPending ? (
          // <BtnLoader />
          <LoadingSpinner />
        ) : (
          <Button
            btnTitle="Sign In"
            btnColor="#da4563"
            btnTitleColor="white"
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.resetPasswordContainer}>
          <Text>FORGOT YOUR PASSWORD?</Text>
          <Pressable
            style={({ pressed }) => pressed && styles.resetPasswordPressed}
            onPress={() => {
              navigation.navigate("ForgetPassword");
            }}
          >
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
