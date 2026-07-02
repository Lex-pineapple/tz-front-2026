import type { AxiosError } from "axios";
import { ERROR_MESSAGES } from "../consts/error-messages";

type TError = {
  type: string;
  code: number;
  message: string;
  metadata: unknown;
};

export type TAPIError = {
  detail: {
    success: false;
    status: number;
    data: unknown;
    error: TError;
    message: string;
    timestamp: string;
  };
};

type TAPIQueryError = {
  error: TError;
};

export const parseError = (error?: AxiosError<TAPIError | TAPIQueryError>) => {
  let errorMsg = ERROR_MESSAGES.general;
  if (error) {
    if (error.response && "detail" in error.response.data)
      errorMsg = error?.response?.data.detail.error.type;
    if (error.response && "error" in error.response.data)
      errorMsg = error.response.data.error.type;
    if (errorMsg && errorMsg in ERROR_MESSAGES)
      return ERROR_MESSAGES[errorMsg as keyof typeof ERROR_MESSAGES];
  }
  return ERROR_MESSAGES.general;
};
