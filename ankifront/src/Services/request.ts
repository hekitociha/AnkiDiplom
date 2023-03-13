import axios, { AxiosError } from "axios";

export const request = axios.create({
  baseURL: "https://localhost:5001/",
  timeout: 6000,
  withCredentials: true,
});

request.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 400) {
      return Promise.reject(error);
    }    
  }
);
