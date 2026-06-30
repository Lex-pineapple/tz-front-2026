import { Box, Center, Spinner } from "@chakra-ui/react";

type TLoadingOverlay = {
  isOpen: boolean;
};

export const LoadingOverlay = ({ isOpen }: TLoadingOverlay) => {
  return (
    <Box
      display={isOpen ? "block" : "none"}
      pos="absolute"
      inset="0"
      bg="bg/80"
    >
      <Center h="full">
        <Spinner color="teal.500" />
      </Center>
    </Box>
  );
};
