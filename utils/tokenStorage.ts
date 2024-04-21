import * as SecureStore from "expo-secure-store";

/**
 *  Using Expo's SecureStore module, you can securely store the token on
 *  the device. This module encrypts the data before storing it, providing
 *  a more secure storage option than AsyncStorage.
 */

export async function setToken(token: string) {
  try {
    await SecureStore.setItemAsync("authToken", token);
  } catch (error) {
    console.error("Error saving the token", error);
  }
}

export async function getToken() {
  try {
    const token = await SecureStore.getItemAsync("authToken");
    return token;
  } catch (error) {
    console.error("Error fetching the token", error);
  }
}

export async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync("authToken");
  } catch (error) {
    console.error("Error deleting the token", error);
  }
}
