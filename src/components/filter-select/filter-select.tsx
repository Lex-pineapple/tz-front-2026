import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from "@chakra-ui/react";
import type { RequestDto } from "../../dtos";

type FilterType = "priority" | "status";

type FilterSelectProps = {
  type: FilterType;
  value: string;
  onChange: (value: string) => void;
};

const priorityOptions: Array<RequestDto["priority"] | ""> = [
  "",
  "low",
  "normal",
  "high",
];
const statusOptions: Array<RequestDto["status"] | ""> = [
  "",
  "new",
  "in_progress",
  "done",
];

const getPriorityLabel = (value: string) => {
  switch (value) {
    case "low":
      return "Low";
    case "normal":
      return "Normal";
    case "high":
      return "High";
    default:
      return "All Priorities";
  }
};

const getStatusLabel = (value: string) => {
  switch (value) {
    case "new":
      return "New";
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return "All Statuses";
  }
};

export const FilterSelect = ({ type, value, onChange }: FilterSelectProps) => {
  const options = type === "priority" ? priorityOptions : statusOptions;
  const getLabel = type === "priority" ? getPriorityLabel : getStatusLabel;
  const placeholder = type === "priority" ? "All Priorities" : "All Statuses";

  const collection = createListCollection({
    items: options.map((opt) => ({
      value: opt,
      label: getLabel(opt),
    })),
  });

  return (
    <SelectRoot
      size="sm"
      width="150px"
      value={value ? [value] : []}
      onValueChange={(details) => onChange(details.value[0] ?? "")}
      collection={collection}
    >
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item) => (
          <SelectItem key={item.value || "all"} item={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default FilterSelect;
