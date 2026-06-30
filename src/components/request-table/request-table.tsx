import {
  Box,
  Table,
  Pagination,
  IconButton,
  ButtonGroup,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import type { RequestDto, RequestListDto } from "../../dtos";
import { RequestModal } from "../modal";
import { RequestTableRow } from "../request-table-row";

type RequestTableProps = {
  requests: RequestListDto;
  currSortQ: string;
  onTableHeadClick: (sortQ: string) => void;
  onDelete?: (id: number) => void;
};

const PAGE_SIZE = 5;

export const RequestTable = ({
  requests,
  onDelete,
  onTableHeadClick,
  currSortQ,
}: RequestTableProps) => {
  const [page, setPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<RequestDto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = parseInt(requests.pages);
  const safePage = Math.min(page, totalPages);

  const pagedRequests = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return requests.items.slice(start, start + PAGE_SIZE);
  }, [safePage, requests]);

  const handleRowClick = (request: RequestDto) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <Box p={6} maxW="6xl" mx="auto">
      <Table.Root size="sm" variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() =>
                onTableHeadClick(
                  currSortQ === "priorityAsc" ? "priorityDesc" : "priorityAsc"
                )
              }
            >
              Priority
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor="pointer"
              onClick={() =>
                onTableHeadClick(
                  currSortQ === "createdAtAsc"
                    ? "createdAtDesc"
                    : "createdAtAsc"
                )
              }
            >
              Created
            </Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {requests.items.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6} textAlign="center" py={8}>
                Нет заявок.
              </Table.Cell>
            </Table.Row>
          ) : (
            pagedRequests.map((request) => (
              <RequestTableRow
                key={request.id}
                request={request}
                onDelete={onDelete}
                onRowClick={handleRowClick}
              />
            ))
          )}
        </Table.Body>
      </Table.Root>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination.Root
          count={requests.items.length}
          pageSize={PAGE_SIZE}
          page={safePage}
          onPageChange={(details) => setPage(details.page)}
          siblingCount={1}
        >
          <ButtonGroup variant="ghost" size="sm" wrap="wrap">
            <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
            <Pagination.Items
              render={(pageItem) => (
                <Pagination.Item
                  key={pageItem.value}
                  type="page"
                  value={pageItem.value}
                >
                  <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                    {pageItem.value}
                  </IconButton>
                </Pagination.Item>
              )}
            />
            <Pagination.NextTrigger>Next</Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>

      <RequestModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </Box>
  );
};

export default RequestTable;
