import { RegisterForm } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_URL = import.meta.env.VITE_API_URL ||'';

export const register = async (formData: RegisterForm) => {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const signIn= async (formData: SignInFormData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const validateToken = async () => {
  const response = await fetch(`${API_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Invalid Token");
  }
  return response.json();
};

export const signOut = async () => {
  const response=await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }

}


