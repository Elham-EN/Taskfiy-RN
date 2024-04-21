import Toast from "react-native-toast-message";

type Type = "success" | "error";

export function showToast(type: Type, title: string, text: string) {
  Toast.show({
    type: type,
    text1: title,
    text2: text,
    text1Style: {
      fontSize: 18,
    },
    text2Style: {
      fontSize: 14,
    },
    position: "bottom",
  });
}
