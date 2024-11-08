import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "./RefreshTokens";

//Create a custom axios request config interface with a _retry property
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

//Define base url

//Staging base url
export const BASE_URL = 'http://13.201.220.245:3007';
//Local Base Url
//export const BASE_URL = 'http://localhost:3007';
//Production Base Url
//export const BASE_URL = 'http://13.201.220.245:3005/api';


//Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Set-up interceptor request
api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : ''
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (!config._retry) {
      config._retry = false;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Set up interceptor response
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    // Always return the response
    if (response.data && response.data.statusCode) {
      // Check if statusCode indicates a retry is needed
      if (response.data.statusCode === 401 && !(response.config as CustomAxiosRequestConfig)._retry) {
        (response.config as CustomAxiosRequestConfig)._retry = true;
        try {
          //Refresh token
          const newToken = await refreshToken();
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return api(response.config);
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          //typeof window !== "undefined" ? window.localStorage.removeItem("accessToken") : ''
          //typeof window !== "undefined" ? window.localStorage.removeItem("refreshToken") : ''
          //window.location.href = "/";
          //Return a rejected promise so that the error is caught by the catch block
          return Promise.reject(refreshError);

        }
      }
    }
    return Promise.resolve(response);
  },
  async (error: AxiosError) => {
    // Handle errors that don't match the 401 retry condition
    console.error("API response error:", error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default api;
