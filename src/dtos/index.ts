export type RequestDto = {
  id: number;
  title: string;
  description?: string;
  status: "new" | "in_progress" | "done";
  priority: "low" | "normal" | "high";
  created_at: string;
  updated_at: string;
}