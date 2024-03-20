import axios from "axios";

export const BASE_URL = "http://localhost:5173";

export const axiosDefault = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosAuth.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("Access-Token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// access-token 만료시 refresh-token 사용해서 재발급
axiosAuth.interceptors.response.use();
