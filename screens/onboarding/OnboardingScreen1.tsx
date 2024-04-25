import React from "react";
import Onboarding from "../../components/OnBoarding";
import { OnboardingScreen1NavigationProps } from "../../types/navigationTypes";

export default function OnboardingScreen1({
  navigation,
}: OnboardingScreen1NavigationProps): React.ReactElement {
  return (
    <Onboarding
      image="TaskList"
      title="Welcome To Taskify"
      text="Simplify your life with organized tasks. Let's get things done together"
      btnText="Next"
      onPress={() => {
        navigation.navigate("Onboarding2");
      }}
      totalSteps={3}
      currentStep={0}
    />
  );
}
