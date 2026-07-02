import { useQuery } from "@tanstack/react-query";
import type { RequestListDto } from "../dtos";
import apiClient from "../utils/api-client";
import { parseError, type TAPIError } from "../utils/parse-error";
import type { AxiosError } from "axios";
import { toaster } from "../components/toaster";
import { useEffect } from "react";

type TGetRequestsPayload = {
  search?: string;
  sort?: string;
  priority?: string;
  status?: string;
  page?: string;
};

export const useGetRequests = ({
  search,
  sort,
  priority,
  status,
  page,
}: TGetRequestsPayload) => {
  const { data, isPending, error, isError } = useQuery<
    RequestListDto,
    AxiosError<TAPIError>
  >({
    queryKey: ["requestsQuery", search, sort, priority, status, page],
    queryFn: async ({ signal }) => {
      const response = await apiClient.get("/requests", {
        params: {
          query: search,
          sort: sort || "priorityAsc",
          priority: priority || undefined,
          status: status || undefined,
          page: page || undefined,
        },
        signal,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (isError) {
      toaster.create({
        description: parseError(error) ?? "Произошла ошибка",
        type: "error",
      });
    }
  }, [isError]);

  return {
    requestData: data ?? {
      pages: "0",
      items: [],
    },
    isLoading: isPending,
    error: error ? parseError(error) : false,
  };
};
