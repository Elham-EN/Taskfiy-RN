import React from "react";
import { View, StyleSheet, Pressable } from "react-native";

interface OptionMenuProps {
  children: React.ReactNode;
}

function OptionMenu({ children }: OptionMenuProps): React.ReactElement {
  return (
    <Pressable
      style={({ pressed }) => [styles.menuOptionContainer, pressed && styles.pressed]}
    >
      <View style={styles.mentionOption}>{children}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  menuOptionContainer: {
    backgroundColor: "#ececd7",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  mentionOption: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    gap: 5,
    marginLeft: 16,
  },
  pressed: {
    backgroundColor: "#cfcfc8",
  },
});

export default OptionMenu;
