import { Button } from "@chakra-ui/react";

type TCreateNewButton = {
  onClick: () => void;
};

export const CreateNewButton = ({ onClick }: TCreateNewButton) => {
  return (
    <Button
      colorPalette="pink"
      size="md"
      alignSelf="flex-end"
      variant="solid"
      onClick={onClick}
    >
      Добавить новую заявку
    </Button>
  );
};

export default CreateNewButton;
