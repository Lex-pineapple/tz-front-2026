import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { parseError, type TAPIError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";
import { useEffect } from "react";

type TLoginPayload = {
  login: string;
  password: string;
};

type TLoginData = {
  access_token: string;
  type: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError, isSuccess } = useMutation<
    TLoginData,
    AxiosError<TAPIError>,
    TLoginPayload
  >({
    mutationKey: ["changeStatus"],
    mutationFn: async ({ login, password }) => {
      const formData = new FormData();
      formData.append("username", login);
      formData.append("password", password);
      const response = await apiClient.postForm("/auth/token", formData);
      return response.data;
    },
    onSuccess: async (data) => {
      localStorage.setItem("access_token", data.access_token);
      window.dispatchEvent(new Event("storage"));
      await queryClient.invalidateQueries({ queryKey: ["requestsQuery"] });
    },
  });

  useEffect(() => {
    if (isSuccess)
      toaster.create({
        description: "Успешный вход",
        type: "success",
      });

    if (isError)
      toaster.create({
        description:
          parseError(error) ?? "Произошла ошибка при входе в аккаунт",
        type: "error",
      });
  }, [isSuccess, isError]);

  return {
    mutate,
    isLoading: isPending,
    error: error ? parseError(error) : false,
    isSuccess,
  };
};
