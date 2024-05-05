import React from "react";
import { View, Text, useWindowDimensions, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TextInput from "../../components/TextInput";
import PasswordInput from "../../components/PasswordInput";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import GoogleButton from "../../components/GoogleButton";
import { SignUpScreenNavigationProps } from "../../types/navigationTypes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData } from "../../types/formDataTypes";
import { UserSchema } from "../../schema/userschema.";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../services/user.service";
import useAuthStore from "../../stores/useAuthStore";
import { showToast } from "../../utils/showToast";
import LoadingSpinner from "../../components/CircleLoader";

export default function SignupScreen({
  navigation,
}: SignUpScreenNavigationProps): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState } = useForm<SignupFormData>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(UserSchema),
  });

  const mutation = useMutation({
    mutationFn: (newData: SignupFormData) => {
      return apiClient.createUser(newData);
    },
    onSuccess: async (data) => {
      await useAuthStore.getState().setToken(data.token);
      await useAuthStore.getState().setIsAuthenticated();
      showToast(
        "success",
        "User Account Created",
        "Now you need to login to use Taskify"
      );
      navigation.replace("HomeTab");
    },
    onError: (error: Error) => {
      showToast("error", "Failed to sign up", error.message);
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("data:", data);
    mutation.mutate(data);
  };

  return (
    <View
      style={[{ paddingTop: insets.top, marginHorizontal: width / 12 }, styles.container]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>SIGN UP</Text>
        <Text style={styles.text}>YOUR ACCOUNT</Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <TextInput
              mode="outlined"
              label={"Full Name"}
              placeholder="Please enter your fullname"
              value={value}
              onChangeText={onChange}
            />
          )}
          name="fullname"
        />
        {formState.errors.fullname && (
          <Text style={{ color: "#ff0000" }}>{formState.errors.fullname.message}</Text>
        )}
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
          <LoadingSpinner />
        ) : (
          <Button
            btnTitle="Sign Up"
            btnColor="#da4563"
            btnTitleColor="white"
            onPress={handleSubmit(onSubmit)}
          />
        )}
        <View style={styles.bottomContainer}>
          <Divider text="OR SIGN UP WITH" />
          <GoogleButton onPress={() => {}} />
          <View style={styles.SignUpContainer}>
            <Text>ALREADY HAVE AN ACCOUNT?</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={({ pressed }) => pressed && styles.resetPasswordPressed}
            >
              <Text style={styles.resetPasswordText}>SIGN IN</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
  },
  textContainer: {
    marginVertical: 16,
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
  },
  formContainer: {
    gap: 20,
  },
  bottomContainer: {},
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
