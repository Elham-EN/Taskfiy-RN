import { LoginFormData } from "../types/formDataTypes";

const API_URL = "http://192.168.1.104:7000";

export async function signinUser(userLogin: LoginFormData) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  });
  const responseBody = await response.json();
  console.log("Fetched data from the backend", responseBody);
  if (!response.ok) {
    const errorMessage =
      typeof responseBody.message === "object"
        ? JSON.stringify(responseBody.message)
        : responseBody.message;
    throw new Error(errorMessage || "Unknown error occurred");
  }
  return responseBody;
}
