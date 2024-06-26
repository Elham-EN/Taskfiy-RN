import { create } from "zustand";
import * as tokenStorage from "../utils/tokenStorage";
import {
  getCompleteOnboardingKey,
  setCompleteOnboardingKey,
} from "../utils/completeOnboarding";

// Define the shape of the store's state
type State = {
  token: string | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
};

type Actions = {
  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<void>;
  logout: () => Promise<void>;
  setIsAuthenticated: () => Promise<void>;
  getIsOnboardingCompleted: () => Promise<void>;
};

// Create a global state store
const useAuthStore = create<State & Actions>()((set, get) => ({
  token: null, // Initial state with token set to null
  isAuthenticated: false,
  isOnboardingCompleted: false,
  /**
   * This method is called to update the token both in the secure storage
   * and the global state. It’s useful when you log in a user and receive
   * a token that you want to persist across sessions.
   * @param token
   */
  setToken: async (token: string) => {
    await tokenStorage.setToken(token);
    set({ token: token });
  },
  /**
   *  This method is used to load the token into the state when the app
   *  starts, helping to restore sessions if the token is still valid.
   */
  getToken: async () => {
    const token = await tokenStorage.getToken();
    set({ token: token }); // Update Zustand store with the retrieved token
    set({ isAuthenticated: !!get().token });
  },
  /**
   * Clears the token from storage and state, effectively logging out
   * the user.
   */
  logout: async () => {
    await tokenStorage.deleteToken();
    // Update Zustand store to reflect that user is logged out
    set({ token: null });
    set({ isAuthenticated: !!get().token });
  },
  /**
   * Check if user is has token, if it has the token than it is
   * authenticated or logged in already.
   */
  setIsAuthenticated: async () => {
    // Get the auth token from the phone storage
    await get().getToken();
    set({ isAuthenticated: !!get().token });
    console.log("IsAuthenticated:", get().isAuthenticated);
  },
  /**
   * Update state if first time user has completed the onboarding process
   */
  getIsOnboardingCompleted: async () => {
    try {
      // Get the key "hasCompletedOnboarding"'s value from phone storage
      const hasCompletedOnboarding = await getCompleteOnboardingKey(
        "hasCompletedOnboarding"
      );
      if (hasCompletedOnboarding) {
        // if phone'storage key hasCompletedOnboarding's value is true then
        // Onboarding process is completed
        set({ isOnboardingCompleted: hasCompletedOnboarding === "true" });
        console.log("hasCompletedOnboarding", get().isOnboardingCompleted);
      }
    } catch (error) {
      console.error("Failed to retrieve onboarding completion flag:", error);
    }
  },
}));

export default useAuthStore;
