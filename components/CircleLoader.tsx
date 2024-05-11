import React, { ReactElement } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface LoadingSpinnerProps {
  bgColor: string;
  color: string;
}

const LoadingSpinner = ({ bgColor, color }: LoadingSpinnerProps): ReactElement => {
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
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: bgColor,
      height: 50,
      borderRadius: 5,
      width: "100%",
      paddingVertical: 10,
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 25,
      backgroundColor: "transparent", // Adjust the background color as needed
      borderRightColor: "transparent",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
      borderColor: color,
      borderWidth: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, animatedStyle]} />
    </View>
  );
};

export default LoadingSpinner;
