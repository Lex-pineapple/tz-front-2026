import type { AxiosError } from "axios";
import { ERROR_MESSAGES } from "../consts/error-messages";

export const parseError = (error: AxiosError) => {
  console.log("🚀 ~ parseError ~ error:", error);
  if (error.code === "500") return ERROR_MESSAGES.general;
};
