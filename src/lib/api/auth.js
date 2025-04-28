import { httpClient } from "../httpClient";

export const loginUser = async (credentials) => {
  const { data } = await httpClient.post("/auth/login", credentials);
  console.log("Login response:", data);
  return data;
};
