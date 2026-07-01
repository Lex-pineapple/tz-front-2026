import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { UnifiedSelect } from "../unified-select";
import { useForm } from "react-hook-form";
import { useCreateRequest } from "../../hooks/use-create-request";
import { useEffect } from "react";

type TNewRequestModal = {
  isOpen: boolean;
  onClose: () => void;
};

export type Inputs = {
  title: string;
  description?: string;
  status: string[];
  priority: string[];
};

export const NewRequestModal = ({ isOpen, onClose }: TNewRequestModal) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      status: ["new"],
      priority: ["low"],
    },
  });
  const { isLoading, mutate, isSuccess } = useCreateRequest();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: Inputs) => {
    mutate({
      ...data,
      status: data.status[0],
      priority: data.priority[0],
    });
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
              <Dialog.Title>Создать новую заявку</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field.Root required mb={6}>
                  <Field.Label>
                    Title <Field.RequiredIndicator />
                  </Field.Label>
                  <Input
                    placeholder="Введите название заявки"
                    {...register("title", {
                      required: {
                        value: true,
                        message: "Необходимо для заполнения",
                      },
                      minLength: { value: 3, message: "Минимум 3 символа" },
                      maxLength: {
                        value: 120,
                        message: "Максимум 120 символов",
                      },
                    })}
                  />
                  {errors.title?.message && (
                    <Text color={"red"}>{errors.title?.message}</Text>
                  )}
                </Field.Root>
                <Field.Root mb={6}>
                  <Field.Label>Description</Field.Label>
                  <Input
                    placeholder="Введите описание заявки"
                    {...register("description", {
                      maxLength: {
                        value: 1000,
                        message: "Максимум 1000 символов",
                      },
                    })}
                  />
                  {errors.description?.message && (
                    <Text color={"red"}>{errors.description?.message}</Text>
                  )}
                </Field.Root>
                <Field.Root mb={6}>
                  <Field.Label>
                    Status <Field.RequiredIndicator />
                  </Field.Label>
                  <UnifiedSelect
                    control={control}
                    type="status"
                    placeholder="Выберите статус"
                    error={errors.status?.message}
                  />
                </Field.Root>
                <Field.Root mb={6}>
                  <Field.Label>
                    Priority <Field.RequiredIndicator />
                  </Field.Label>
                  <UnifiedSelect
                    control={control}
                    type="priority"
                    placeholder="Выберите приоритет"
                    error={errors.priority?.message}
                  />
                </Field.Root>
                <Button type="submit" variant="solid" loading={isLoading}>
                  Добавить
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
