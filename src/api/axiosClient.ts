import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import queryString from "query-string";

import { BASE_URL_API } from "@/config";

// Request middleware
const handleRequest = (config: InternalAxiosRequestConfig) => {
  return config;
};

// Response middleware
const handleResponse = (response: AxiosResponse) => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

const handleFailedResponse = (error: any) => {
  return Promise.reject(error?.response.data);
};

// Create html client - axios client
const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: { serialize: (params) => queryString.stringify(params) },
});

// Handle request
axiosClient.interceptors.request.use(handleRequest);

// Handle response
axiosClient.interceptors.response.use(handleResponse, handleFailedResponse);

export default axiosClient;
