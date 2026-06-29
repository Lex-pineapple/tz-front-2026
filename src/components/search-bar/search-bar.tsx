import { Box, Input, InputGroup } from '@chakra-ui/react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar = ({ value, onChange, placeholder = 'Поиск по зявкам...' }: SearchBarProps) => {
  return (
    <Box maxW="6xl" mx="auto" px={6} pt={6}>
      <InputGroup>
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          size="md"
        />
      </InputGroup>
    </Box>
  )
}

export default SearchBar
