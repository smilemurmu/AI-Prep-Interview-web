import { apiRequest } from "./api";

export const interviewService = {
  create: (payload) =>
    apiRequest("/interviews", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  list: () => apiRequest("/interviews"),

  getById: (id) => apiRequest(`/interviews/${id}`),

  saveAnswer: (id, payload) =>
    apiRequest(`/interviews/${id}/answers`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  complete: (id) =>
    apiRequest(`/interviews/${id}/complete`, {
      method: "PUT",
    }),

  remove: (id) =>
    apiRequest(`/interviews/${id}`, {
      method: "DELETE",
    }),

  stats: () => apiRequest("/interviews/stats"),
};
