import { SignupFormData } from "../types/formDataTypes";

const API_URL = "http://192.168.1.104:7000";

export async function createUser(userData: SignupFormData) {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const responseBody = await response.json();
  console.log("Fetched data from the backend", responseBody);
  if (!response.ok) {
    console.log("message", responseBody.message);
    const errorMessage =
      typeof responseBody.message === "object"
        ? JSON.stringify(responseBody.message)
        : responseBody.message;
    throw new Error(errorMessage || "Unknown error occurred");
  }
  return responseBody;
}
