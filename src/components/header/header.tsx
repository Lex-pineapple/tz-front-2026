import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { LoginModal } from '../login-modal'
import { useState } from 'react';

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box as="header" bg="pink.600" color="white" px={6} py={4} shadow="sm">
      <Flex justify="space-between" align="center" maxW="6xl" mx="auto">
        <Heading as="h1" size="lg" color="white" fontWeight="semibold">
          Просмотр Заявок
        </Heading>
        <Button variant="outline" borderColor="white" color="white" _hover={{color: "black"}} onClick={() => setOpenModal(true)}>
          Войти в аккаунт
        </Button>
      </Flex>
      <LoginModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  )
}

