import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import colors from "../constants/colors";
import { IMAGES, ImageKeys } from "../utils/imageMap";
import ProgressIndicator from "./ProgressIndicator";

interface OnboardingProps {
  image: ImageKeys;
  title: string;
  text: string;
  btnText: string;
  onPress: () => void;
  totalSteps: number; // Number of total steps in the onboarding process
  currentStep: number; // Current step index
}

export default function Onboarding({
  image,
  title,
  text,
  btnText,
  onPress,
  totalSteps,
  currentStep,
}: OnboardingProps): React.ReactElement {
  // Handling Notches on phones
  const insets = useSafeAreaInsets();

  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: width / 12,
    },
    imageContainer: {},
    image: {
      resizeMode: "contain",
      width: 500,
      height: 350,
    },
    upperContainer: {
      flex: 2,
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },
    bottomContainer: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
    },
    title: {
      fontSize: 36,
      fontFamily: "Roboto-Mono",
      marginHorizontal: 10,
    },
    textContainer: {
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      fontFamily: "Roboto-Mono-light",
      marginHorizontal: 30,
      textAlign: "center",
      lineHeight: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Image source={IMAGES[image]} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <ProgressIndicator totalSteps={totalSteps} currentStep={currentStep} />
        <Button
          btnTitle={btnText}
          btnTitleColor={colors.onBoardingBtnText}
          btnColor={colors.onBoardingBtn}
          onPress={onPress}
        />
      </View>
    </View>
  );
}
