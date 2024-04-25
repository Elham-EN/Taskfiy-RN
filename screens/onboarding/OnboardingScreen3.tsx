import React from "react";
import Onboarding from "../../components/OnBoarding";
import { OnboardingScreen3NavigationProps } from "../../types/navigationTypes";
import { setCompleteOnboardingKey } from "../../utils/completeOnboarding";
import useAuthStore from "../../stores/useAuthStore";

export default function OnboardingScreen3({
  navigation,
}: OnboardingScreen3NavigationProps): React.ReactElement {
  const authState = useAuthStore();
  return (
    <Onboarding
      image="Urban"
      title="Ready to Stay Productive?"
      text="Start creating your tasks and feel the productivity boost!"
      btnText="Get Started"
      onPress={async () => {
        // user completes the onboarding process
        await setCompleteOnboardingKey();
        await authState.getIsOnboardingCompleted();
        navigation.navigate("Login");
      }}
      totalSteps={3}
      currentStep={2}
    />
  );
}
