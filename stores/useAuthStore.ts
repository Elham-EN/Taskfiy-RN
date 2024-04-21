import { create } from "zustand";
import * as tokenStorage from "../utils/tokenStorage";

// Define the shape of the store's state
interface AuthState {
  token: string | null;
  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<void>;
  logout: () => Promise<void>;
}

// Create a global state store
const useAuthStore = create<AuthState>((set, get) => ({
  token: null, // Initial state with token set to null
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
    set({ token }); // Update Zustand store with the retrieved token
  },
  /**
   * Clears the token from storage and state, effectively logging out
   * the user.
   */
  logout: async () => {
    await tokenStorage.deleteToken();
    // Update Zustand store to reflect that user is logged out
    set({ token: null });
  },
}));

export default useAuthStore;
