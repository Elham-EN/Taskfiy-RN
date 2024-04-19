import React, { useState } from "react";
import { TextInput, Icon, MD3Colors } from "react-native-paper";

export default function PasswordInput() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const tooglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const theme = {
    colors: {
      // Sets the primary color used for the outline when focused
      primary: "black",
      // Optional: hide the underline if not needed
      underlineColor: "transparent",
      // Sets the background color of the TextInput
      background: "white",
    },
  };
  return (
    <TextInput
      mode={"outlined"}
      label={"Password"}
      placeholder={"Please Enter you Password"}
      secureTextEntry={!passwordVisible}
      right={
        <TextInput.Icon
          icon={passwordVisible ? "eye-off" : "eye"}
          onPress={tooglePasswordVisibility}
        />
      }
      style={{ backgroundColor: "#FFFFFF", borderColor: "#000000" }}
      underlineColor="transparent"
      outlineColor="#808080"
      theme={theme}
    />
  );
}
