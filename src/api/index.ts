import axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import queryString from "query-string";
import { BASE_URL_API } from "../config";

const axiosClient = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  paramsSerializer: { serialize: (params) => queryString.stringify(params) },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    return config;
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
