import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { parseError, type TAPIError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";
import { useEffect } from "react";

type TDeleteRequestPayload = {
  id: number;
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<TAPIError>,
    TDeleteRequestPayload
  >({
    mutationKey: ["changeStatus"],
    mutationFn: async (payload) => {
      const response = await apiClient.delete(`/requests/${payload.id}`);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["requestsQuery"] });
    },
  });

  useEffect(() => {
    if (isSuccess)
      toaster.create({
        description: "Заявка успешно удалена",
        type: "success",
      });

    if (isError)
      toaster.create({
        description:
          parseError(error) ?? "Произошла ошибка при удалении заявки",
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
