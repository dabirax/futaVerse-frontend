
import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: { "Content-Type": "application/json"},
    withCredentials: true,

  
});


//  attach access token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//  auto logout if token expired/invalid
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);