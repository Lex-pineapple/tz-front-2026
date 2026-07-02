import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { parseError, type TAPIError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";
import { useEffect } from "react";

type TChangeStatusPayload = {
  id: number;
  status: string;
};

export const useChangeStatus = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<TAPIError>,
    TChangeStatusPayload
  >({
    mutationKey: ["changeStatus"],
    mutationFn: async (payload) => {
      const response = await apiClient.patch(`/requests/${payload.id}`, {
        status: payload.status,
      });
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requestsQuery"] });
    },
  });

  useEffect(() => {
    if (isSuccess)
      queueMicrotask(() => {
        toaster.create({
          description: "Статус успешно изменен",
          type: "success",
        });
      });

    if (isError)
      queueMicrotask(() => {
        toaster.create({
          description:
            parseError(error) ??
            "Произошла ошибка при изменении статуса заявки",
          type: "error",
        });
      });
  }, [isSuccess, isError]);

  return {
    mutate,
    isLoading: isPending,
    error: error ? parseError(error) : false,
    isSuccess,
  };
};
