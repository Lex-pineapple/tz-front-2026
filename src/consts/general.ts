import type { RequestDto } from "../dtos";

export const statusColorMap: Record<RequestDto["status"], string> = {
  new: "blue",
  in_progress: "orange",
  done: "green",
};

export const priorityColorMap: Record<RequestDto["priority"], string> = {
  low: "gray",
  normal: "blue",
  high: "red",
};
