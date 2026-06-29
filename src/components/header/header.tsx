import { Box, Button, Flex, Heading } from '@chakra-ui/react'

export const Header = () => {
  return (
    <Box as="header" bg="cyan.600" color="white" px={6} py={4} shadow="sm">
      <Flex justify="space-between" align="center" maxW="6xl" mx="auto">
        <Heading as="h1" size="lg" fontWeight="semibold">
          Requests Viewer
        </Heading>
        <Button variant="outline" borderColor="white" color="white">
          Open admin account
        </Button>
      </Flex>
    </Box>
  )
}

