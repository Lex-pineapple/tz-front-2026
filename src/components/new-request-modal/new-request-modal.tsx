import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
} from "@chakra-ui/react";
import { UnifiedSelect } from "../unified-select";

type TNewRequestModal = {
  isOpen: boolean;
  onClose: () => void;
};

export const NewRequestModal = ({ isOpen, onClose }: TNewRequestModal) => {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Создать новую заявку</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root required mb={6}>
                <Field.Label>
                  Title <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Введите название заявки" />
              </Field.Root>
              <Field.Root mb={6}>
                <Field.Label>Description</Field.Label>
                <Input placeholder="Введите описание заявки" />
              </Field.Root>
              <Field.Root mb={6}>
                <Field.Label>Status</Field.Label>
                <UnifiedSelect type="status" placeholder="Выберите статус" />
              </Field.Root>
              <Field.Root mb={6}>
                <Field.Label>Priority</Field.Label>
                <UnifiedSelect
                  type="priority"
                  placeholder="Выберите приоритет"
                />
              </Field.Root>
              <Button variant="solid">Добавить</Button>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
