import { HotelSearchResponse, HotelType } from "../../backend/src/shared/types";
import { RegisterForm } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_URL = import.meta.env.VITE_API_URL || "";

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

export const signIn = async (formData: SignInFormData) => {
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
};

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
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }
};

export const addHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("failed to add hotel");
  }

  return response.json();
};

export const getHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("failed to get hotels");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("failed to get hotel");
  }

  return response.json();
};

export const updateHotel = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );

  if (!response.ok) {
    throw new Error("failed to update hotel");
  }
  return response.json();
};
export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_URL}/api/hotels/search?${queryParams}`
  );
  

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotelId= async (hotelId:string):Promise<HotelType> => {
  const response = await fetch(`${API_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching hotel types");
  }
  return response.json();
}

