import type { AxiosError } from "axios";
import apiCLient from "../utils/api-client";

type TMakeRequest = {
  method: "get" | "post" | "patch" | "delete";
  payload: unknown;
  route: "/requests" | "/auth/token";
};

export const useClientRequest = () => {
  const makeRequest = async <T>({ method, payload, route }: TMakeRequest) => {
    try {
      const response = await apiCLient[method](route, {
        params: method === "get" && payload,
        data: method !== "get" && payload,
      });
      return {
        status: 200,
        data: response.data as T,
        error: null,
      };
    } catch (error) {
      console.error("Error fetching request: ", method, route, payload);
      const axiosError = error as AxiosError;
      return {
        status: axiosError.code,
        data: null,
        error: axiosError.cause,
      };
    }
  };

  return makeRequest;
};
