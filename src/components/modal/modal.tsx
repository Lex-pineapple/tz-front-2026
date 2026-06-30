import { Badge, CloseButton, DataList, Dialog, Portal } from "@chakra-ui/react";
import type { RequestDto } from "../../dtos";
import { priorityColorMap } from "../../consts/general";
import { StatusSelect } from "../status-select";

type RequestModalProps = {
  request: RequestDto | null;
  isOpen: boolean;
  onClose: () => void;
};

export const RequestModal = ({
  request,
  isOpen,
  onClose,
}: RequestModalProps) => {
  if (!request) return null;

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
              <Dialog.Title>{request.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <DataList.Root orientation="horizontal">
                <DataList.Item>
                  <DataList.ItemLabel>ID</DataList.ItemLabel>
                  <DataList.ItemValue>{request.id}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Description</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {request.description ?? "—"}
                  </DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Status</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <StatusSelect defaultValue={request.status} />
                  </DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Priority</DataList.ItemLabel>
                  <DataList.ItemValue>
                    <Badge colorPalette={priorityColorMap[request.priority]}>
                      {request.priority}
                    </Badge>
                  </DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Created</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {new Date(request.created_at).toLocaleString()}
                  </DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Updated</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {new Date(request.updated_at).toLocaleString()}
                  </DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>
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

export default RequestModal;
