import React, { useState } from "react";
import { TextInput as Input } from "react-native-paper";
import { TextInputLabelProp } from "react-native-paper/lib/typescript/components/TextInput/types";

interface TextInputProps {
  mode: "outlined" | "flat" | undefined;
  label?: TextInputLabelProp;
  placeholder?: string | undefined;
  value?: string | undefined;
  onChangeText: (((text: string) => void) & Function) | undefined;
}

export default function TextInput({
  mode,
  label,
  placeholder,
  value,
  onChangeText,
}: TextInputProps): React.ReactElement {
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
    <Input
      mode={mode}
      label={label}
      placeholder={placeholder}
      style={{ backgroundColor: "#FFFFFF", borderColor: "#000000" }}
      underlineColor="transparent"
      outlineColor="#808080"
      theme={theme}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
