import * as SecureStore from "expo-secure-store";

export async function setCompleteOnboardingKey(): Promise<void> {
  try {
    await SecureStore.setItemAsync("hasCompletedOnboarding", "true");
  } catch (error) {
    console.error("Failed to set onboarding completion flag:", error);
  }
}

export async function getCompleteOnboardingKey(key: string) {
  try {
    const hasCompleted = await SecureStore.getItemAsync("hasCompletedOnboarding");
    return hasCompleted;
  } catch (error) {
    console.error("Failed to retrieve onboarding completion flag:", error);
  }
}

export async function removeCompleteOnboardingKey() {
  try {
    await SecureStore.deleteItemAsync("hasCompletedOnboarding");
  } catch (error) {
    console.error("Failed to delete onboarding completion flag:", error);
  }
}
