import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN as string,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID as string,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET_ID as string,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID as string,
  appId: process.env.EXPO_PUBLIC_APP_ID as string,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID as string,
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
