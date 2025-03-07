const isDev = import.meta.env.VITE_ENVIRONMENT === "development";

export const BASE_URL = isDev
  ? "http://localhost:3000"
  : "https://showdown-reclaim-implimentation.onrender.com";
export const API_URL = `${BASE_URL}/api`;

export const USER_REGISTER = `${API_URL}/user/register`;
export const GET_ALL_USERS = `${API_URL}/user/list-users`;

export const UPDATE_USER = `${API_URL}/user`;
