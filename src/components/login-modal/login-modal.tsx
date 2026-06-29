import { Button, CloseButton, Dialog, Field, Input, Portal } from '@chakra-ui/react'

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} placement="center" motionPreset="slide-in-bottom">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>Войти в аккаунт</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root required mb={6}>
                <Field.Label>
                  Логин <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="Введите ваш логин" />
              </Field.Root>
              <Field.Root required mb={6}>
                <Field.Label>
                  Пароль <Field.RequiredIndicator />
                </Field.Label>
                <Input type="password" placeholder="Введите ваш пароль" />
              </Field.Root>
              <Button>Войти</Button>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

