import { Box, Table, Pagination, ButtonGroup, Button } from "@chakra-ui/react";
import { useState } from "react";
import type { RequestDto, RequestListDto } from "../../dtos";
import { RequestModal } from "../modal";
import { RequestTableRow } from "../request-table-row";
import { SortIcon } from "../icons/sort-icon";

import "./request-table.css";

type RequestTableProps = {
  requests: RequestListDto;
  currSortQ: string;
  onTableHeadClick: (sortQ: string) => void;
  onDelete?: (id: number) => void;
  currPage: string;
  onPageChange: (page: number) => void;
};

const PAGE_SIZE = 10;

export const RequestTable = ({
  requests,
  onDelete,
  onTableHeadClick,
  currSortQ,
  currPage,
  onPageChange,
}: RequestTableProps) => {
  const [selectedRequest, setSelectedRequest] = useState<RequestDto | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = parseInt(requests.pages);

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
      <Table.Root size="sm" variant="outline">
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
              Priority{" "}
              {(currSortQ == "priorityAsc" || currSortQ === "priorityDesc") && (
                <SortIcon
                  size="xs"
                  className={`sort-icon ${currSortQ === "priorityDesc" ? "invert" : ""}`}
                />
              )}
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
              Created{" "}
              {(currSortQ == "createdAtDesc" ||
                currSortQ === "createdAtAsc") && (
                <SortIcon
                  size="xs"
                  className={`sort-icon ${currSortQ === "createdAtDesc" ? "invert" : ""}`}
                />
              )}
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
            requests.items.map((request) => (
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
          count={PAGE_SIZE * totalPages}
          pageSize={PAGE_SIZE}
          page={parseInt(currPage)}
          onPageChange={(details) => onPageChange(details.page)}
          siblingCount={1}
        >
          <ButtonGroup variant="outline" size="sm" wrap="wrap">
            <Pagination.PrevTrigger asChild>
              <Button>Prev</Button>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(pageItem) => (
                <Pagination.Item
                  key={pageItem.value}
                  type="page"
                  value={pageItem.value}
                  asChild
                >
                  <Button>{pageItem.value}</Button>
                </Pagination.Item>
              )}
            />
            <Pagination.NextTrigger asChild>
              <Button>Next</Button>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>

      {selectedRequest && (
        <RequestModal
          request={selectedRequest}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      )}
    </Box>
  );
};

export default RequestTable;
