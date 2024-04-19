import React from "react";
import Onboarding from "../../components/OnBoarding";
import { OnboardingScreen3NavigationProps } from "../../types/navigationTypes";

export default function OnboardingScreen3({
  navigation,
}: OnboardingScreen3NavigationProps): React.ReactElement {
  return (
    <Onboarding
      image="Urban"
      title="Ready to Stay Productive?"
      text="Start creating your tasks and feel the productivity boost!"
      btnText="Get Started"
      onPress={() => {
        navigation.replace("Login");
      }}
      totalSteps={3}
      currentStep={2}
    />
  );
}
