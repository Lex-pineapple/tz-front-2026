import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/use-login";
import { useEffect } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  login: string;
  password: string;
};

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { isLoading, mutate, isSuccess } = useLogin();

  useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess]);

  const onSubmit = (data: Inputs) => {
    mutate(data);
  };
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
              <Dialog.Title>Войти в аккаунт</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field.Root required mb={6}>
                  <Field.Label>
                    Логин <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Введите ваш логин"
                    {...register("login", {
                      required: "Поле обязательно для заполнения",
                    })}
                  />
                  {errors.login?.message && (
                    <Text>{errors.login?.message}</Text>
                  )}
                </Field.Root>
                <Field.Root required mb={6}>
                  <Field.Label>
                    Пароль <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    type="password"
                    placeholder="Введите ваш пароль"
                    {...register("password", {
                      required: "Поле обязательно для заполнения",
                    })}
                  />
                  {errors.password?.message && (
                    <Text>{errors.password?.message}</Text>
                  )}
                </Field.Root>
                <Button type="submit" loading={isLoading}>
                  Войти
                </Button>
              </form>
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
