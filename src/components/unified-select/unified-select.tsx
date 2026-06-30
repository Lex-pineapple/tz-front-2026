import { createListCollection, Portal, Select } from "@chakra-ui/react";

const priorityList = createListCollection({
  items: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
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
};

export const UnifiedSelect = ({ type, placeholder }: TUnifiedSelect) => {
  return (
    <Select.Root collection={listsMap[type]} size="sm" width="320px">
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
    </Select.Root>
  );
};
