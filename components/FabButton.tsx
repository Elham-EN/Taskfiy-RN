import React from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const FabButton: React.FC = () => {
  const scale = useSharedValue(1);

  // Define the animated style
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Handle the press-in event
  const onPressIn = () => {
    scale.value = withSpring(0.8);
  };

  // Handle the press-out event
  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View style={styles.fabContainer}>
      <TouchableOpacity
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1} // Maintain the FAB color when pressed
      >
        <Animated.View style={[styles.fabIconContainer, animatedStyles]}>
          <Ionicons name="add" size={38} color="white" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 28,
  },
  fabIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 38,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default FabButton;
