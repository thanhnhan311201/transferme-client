import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosError, AxiosRequestConfig } from "axios";

import axiosClient from "./axiosClient";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async (request) => {
    try {
      const response = axiosClient(request);
      return response;
    } catch (axiosError: any) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery;
