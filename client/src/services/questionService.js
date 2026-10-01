import { apiRequest } from "./api";

export const questionService = {
  list: (params = "") => apiRequest(`/questions${params}`),

  categories: () => apiRequest("/questions/categories"),
};
