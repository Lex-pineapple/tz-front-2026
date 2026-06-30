import { Table, Badge, Button } from "@chakra-ui/react";
import type { RequestDto } from "../../dtos";
import { StatusSelect } from "../status-select";
import { priorityColorMap } from "../../consts/general";
import { useState } from "react";
import type { Status } from "../status-select/status-select";
import { useChangeStatus } from "../../hooks/use-change-status";

type RequestTableRowProps = {
  request: RequestDto;
  onDelete?: (id: number) => void;
  onRowClick?: (request: RequestDto) => void;
};

export const RequestTableRow = ({
  request,
  onDelete,
  onRowClick,
}: RequestTableRowProps) => {
  const [status, setStatus] = useState(() => [request.status]);
  const { mutate } = useChangeStatus();

  if (request.status !== status[0]) setStatus([request.status]);

  const handleStatusChange = (newStatus: Status[]) => {
    mutate({
      id: request.id,
      status: newStatus[0],
    });
    setStatus(newStatus);
  };

  return (
    <Table.Row
      key={request.id}
      _hover={{ bg: "gray.50", cursor: "pointer" }}
      onClick={() => onRowClick?.(request)}
    >
      <Table.Cell fontWeight="semibold">{request.title}</Table.Cell>
      <Table.Cell color="gray.600">{request.description ?? "—"}</Table.Cell>
      <Table.Cell>
        <StatusSelect
          defaultValue={request.status}
          value={status}
          setValue={handleStatusChange}
        />
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={priorityColorMap[request.priority]}>
          {request.priority}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        {new Date(request.created_at).toLocaleDateString()}
      </Table.Cell>
      <Table.Cell>
        <Button
          size="sm"
          colorScheme="red"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(request.id);
          }}
        >
          Удалить
        </Button>
      </Table.Cell>
    </Table.Row>
  );
};
