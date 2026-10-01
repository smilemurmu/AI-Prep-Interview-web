import { apiRequest } from "./api";

export const authService = {
  signup: (payload) =>
    apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  login: (payload) =>
    apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  me: () => apiRequest("/auth/me"),

  updateProfile: (payload) =>
    apiRequest("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
