import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const LoadingSpinner = () => {
  // Shared value for rotation
  const rotation = useSharedValue(0);

  // Animated style to apply rotation
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  // Starting the animation on mount
  React.useEffect(() => {
    // Rotates indefinitely, 360 degrees rotation using a linear timing function
    rotation.value = withRepeat(
      withTiming(360, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white", // Adjust the background color as needed
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 5,
  },
});

export default LoadingSpinner;