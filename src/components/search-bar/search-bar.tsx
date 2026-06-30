import { Box, Input, InputGroup } from "@chakra-ui/react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  placeholder?: string;
};

export const SearchBar = ({
  value,
  onChange,
  onBlur,
  placeholder = "Поиск по зявкам...",
}: SearchBarProps) => {
  return (
    <Box maxW="6xl" mx="auto" px={6} pt={6}>
      <InputGroup>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          size="md"
          onBlur={(event) => onBlur(event.target.value)}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
