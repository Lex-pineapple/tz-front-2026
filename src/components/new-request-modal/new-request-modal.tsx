import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
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
    formState: { errors },
  } = useForm<Inputs>();
  const { isLoading, mutate, isSuccess } = useCreateRequest();

  useEffect(() => {
    if (isSuccess) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const onSubmit = (data: Inputs) => {
    mutate({
      ...data,
      status: data.status[0],
      priority: data.priority[0],
    });
    console.log(data);
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
                      required: true,
                      minLength: 3,
                      maxLength: 120,
                    })}
                  />
                </Field.Root>
                <Field.Root mb={6}>
                  <Field.Label>Description</Field.Label>
                  <Input
                    placeholder="Введите описание заявки"
                    {...register("description", { maxLength: 1000 })}
                  />
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
