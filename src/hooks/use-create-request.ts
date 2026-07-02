import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { parseError, type TAPIError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";
import { useEffect } from "react";

type TCreateRequestPayload = {
  title: string;
  description?: string;
  priority: string;
  status: string;
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<TAPIError>,
    TCreateRequestPayload
  >({
    mutationKey: ["createRequest"],
    mutationFn: async (payload) => {
      const response = await apiClient.post("/requests", {
        ...payload,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requestsQuery"] });
    },
  });

  useEffect(() => {
    if (isError) {
      toaster.create({
        description:
          parseError(error) ?? "Произошла ошибка при создании заявки",
        type: "error",
      });
    }
  }, [isError]);

  return {
    mutate,
    isLoading: isPending,
    error: error ? parseError(error) : false,
    isSuccess,
  };
};
