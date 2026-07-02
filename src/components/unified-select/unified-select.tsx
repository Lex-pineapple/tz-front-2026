import { createListCollection, Portal, Select, Text } from "@chakra-ui/react";
import { Controller, type Control } from "react-hook-form";
import type { Inputs } from "../new-request-modal/new-request-modal";

const priorityList = createListCollection({
  items: [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
  ],
});

const statusList = createListCollection({
  items: [
    { label: "New", value: "new" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ],
});

const listsMap = {
  priority: priorityList,
  status: statusList,
};

type TUnifiedSelect = {
  type: "priority" | "status";
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<Inputs, any, Inputs>;
  error?: string;
};

export const UnifiedSelect = ({
  type,
  placeholder,
  control,
  error,
}: TUnifiedSelect) => {
  return (
    <Controller
      control={control}
      name={type}
      rules={{ required: "Необходимое поле" }}
      render={({ field }) => (
        <Select.Root
          name={field.name}
          value={field.value}
          onValueChange={({ value }) => field.onChange(value)}
          onInteractOutside={() => field.onBlur()}
          collection={listsMap[type]}
          size="sm"
          width="320px"
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger cursor="pointer">
              <Select.ValueText placeholder={placeholder} />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {listsMap[type].items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          {error && <Text color="red">{error}</Text>}
        </Select.Root>
      )}
    />
  );
};
