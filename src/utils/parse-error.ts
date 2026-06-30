import type { AxiosError } from "axios";
import { ERROR_MESSAGES } from "../consts/error-messages";

export type TAPIError = {
  detail: {
    success: false;
    status: number;
    data: unknown;
    error: {
      type: string;
      code: number;
      message: string;
      metadata: any;
    };
    message: string;
    timestamp: string;
  };
};

export const parseError = (error: AxiosError<TAPIError>) => {
  const errorMsg = error.response?.data.detail.error.type;
  if (errorMsg && errorMsg in ERROR_MESSAGES)
    return ERROR_MESSAGES[errorMsg as keyof typeof ERROR_MESSAGES];
  return ERROR_MESSAGES.general;
};
