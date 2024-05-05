import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  ForgetPassword: undefined;
  SignUp: undefined;
  HomeTab: undefined;
};

export type OnboardingScreen1NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding1"
>;

export type OnboardingScreen2NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding2"
>;

export type OnboardingScreen3NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding3"
>;

export type LoginScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type SignUpScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "SignUp"
>;

export type ForgotPasswordScreenNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgetPassword"
>;
