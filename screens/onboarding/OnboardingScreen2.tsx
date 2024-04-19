import React from "react";
import Onboarding from "../../components/OnBoarding";
import { OnboardingScreen2NavigationProps } from "../../types/navigationTypes";

export default function OnboardingScreen2({
  navigation,
}: OnboardingScreen2NavigationProps): React.ReactElement {
  return (
    <Onboarding
      image="Trophy"
      title="Your Tasks Effortlessly"
      text="Enjoy seamless task management with categories, priorities, and reminders"
      btnText="Next"
      onPress={() => {
        navigation.replace("Onboarding3");
      }}
      totalSteps={3}
      currentStep={1}
    />
  );
}
