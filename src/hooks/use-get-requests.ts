import { useQuery } from "@tanstack/react-query";
import type { RequestListDto } from "../dtos";
import apiClient from "../utils/api-client";
import { parseError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";

type TGetRequestsPayload = {
  search?: string;
  sort?: string;
  priority?: string;
  status?: string;
};

export const useGetRequests = ({
  search,
  sort,
  priority,
  status,
}: TGetRequestsPayload) => {
  const { data, isPending, error, isError } = useQuery<
    RequestListDto,
    AxiosError
  >({
    queryKey: ["requests", search, sort, priority, status],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get("/requests", {
        params: {
          search,
          sort: sort || "priorityAsc",
          priority: priority || undefined,
          status: status || undefined,
        },
        signal,
      });
      return response.data;
    },
  });

  if (isError) {
    toaster.create({
      description: parseError(error) ?? "Произошла ошибка",
      type: "error",
    });
  }

  return {
    requestData: data,
    isLoading: isPending,
    error: error ? parseError(error) : false,
  };
};
