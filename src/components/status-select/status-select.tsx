import { Badge, createListCollection, Portal, Select } from "@chakra-ui/react";
import { statusColorMap } from "../../consts/general";

const statusList = createListCollection({
  items: [
    { label: "New", value: "new" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ],
});

export type Status = "new" | "in_progress" | "done";

type TUnifiedSelect = {
  defaultValue: string;
  placeholder?: string;
  value: Status[];
  setValue: (val: Status[]) => void;
};

export const StatusSelect = ({
  placeholder,
  defaultValue,
  value,
  setValue,
}: TUnifiedSelect) => {
  return (
    <Select.Root
      onClick={(e) => e.stopPropagation()}
      collection={statusList}
      size="sm"
      width="320px"
      defaultValue={[defaultValue]}
      value={value}
      onValueChange={(e) => setValue(e.value as Status[])}
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
