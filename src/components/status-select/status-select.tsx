import { Badge, createListCollection, Portal, Select } from "@chakra-ui/react";
import { statusColorMap } from "../../consts/general";

const statusList = createListCollection({
  items: [
    { label: "New", value: "new" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ],
});

type TUnifiedSelect = {
  defaultValue: string;
  placeholder?: string;
};

export const StatusSelect = ({ placeholder, defaultValue }: TUnifiedSelect) => {
  return (
    <Select.Root
      onClick={(e) => e.stopPropagation()}
      collection={statusList}
      size="sm"
      width="320px"
      defaultValue={[defaultValue]}
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
            {statusList.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                <Badge
                  colorPalette={
                    statusColorMap[item.value as keyof typeof statusColorMap]
                  }
                >
                  {item.label}
                </Badge>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
