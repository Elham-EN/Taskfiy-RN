import { SignupFormData } from "../types/formDataTypes";

const API_URL = "http://localhost:7000/";

export async function createUser(userData: SignupFormData) {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
}
