import type { Status } from "../components/status-select/status-select";

export type RequestDto = {
  id: number;
  title: string;
  description?: string;
  status: Status;
  priority: "low" | "normal" | "high";
  created_at: string;
  updated_at: string;
};

export type RequestListDto = {
  pages: string;
  items: RequestDto[];
};
