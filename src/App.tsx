import { useState } from "react";
import "./App.css";
import { CreateNewButton } from "./components/create-new-button";
import { FilterSelect } from "./components/filter-select";
import { Header } from "./components/header";
import { RequestTable } from "./components/request-table";
import { SearchBar } from "./components/search-bar";
import { NewRequestModal } from "./components/new-request-modal";
import { useGetRequests } from "./hooks/use-get-requests";
import { LoadingOverlay } from "./components/loading-overlay";
import { useDeleteRequest } from "./hooks/use-delete-request";
import { useDebounce } from "./hooks/use-debounce";

function App() {
  const [search, setSearch] = useState(
    () => new URLSearchParams(window.location.search).get("search") || ""
  );
  const debouncedSearch = useDebounce(search);
  const [priorityFilter, setPriorityFilter] = useState(
    () => new URLSearchParams(window.location.search).get("priority") || ""
  );
  const [sortFilter, setSortFilter] = useState(
    () => new URLSearchParams(window.location.search).get("sort") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    () => new URLSearchParams(window.location.search).get("status") || ""
  );
  const [pageFilter, setPageFilter] = useState(
    () => new URLSearchParams(window.location.search).get("page") || ""
  );

  const { requestData, isLoading } = useGetRequests({
    search: debouncedSearch,
    priority: priorityFilter,
    sort: sortFilter,
    status: statusFilter,
    page: pageFilter,
  });
  const { mutate: deleteRequest } = useDeleteRequest();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateUrl = (
    newSearch: string,
    newPriority: string,
    newStatus: string,
    newSort: string,
    newPage: string
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newPriority) params.set("priority", newPriority);
    if (newStatus) params.set("status", newStatus);
    if (newSort) params.set("sort", newSort);
    if (newPage) params.set("page", newPage);

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateUrl(value, priorityFilter, statusFilter, sortFilter, pageFilter);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    updateUrl(search, value, statusFilter, sortFilter, pageFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateUrl(search, priorityFilter, value, sortFilter, pageFilter);
  };

  const handleSortChange = (value: string) => {
    setSortFilter(value);
    updateUrl(search, priorityFilter, statusFilter, value, pageFilter);
  };

  const handlePageChange = (value: number) => {
    setPageFilter(String(value));
    updateUrl(search, priorityFilter, statusFilter, sortFilter, String(value));
  };

  const handleDelete = (id: number) => {
    if (requestData?.items.length === 1) {
      handlePageChange(parseInt(pageFilter) - 1);
    }
    deleteRequest({ id });
  };

  return (
    <div>
      <Header />
      <SearchBar value={search} onChange={handleSearchChange} />
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <FilterSelect
          type="priority"
          value={priorityFilter}
          onChange={handlePriorityChange}
        />
        <FilterSelect
          type="status"
          value={statusFilter}
          onChange={handleStatusChange}
        />
      </div>
      <RequestTable
        currSortQ={sortFilter}
        requests={requestData ?? { pages: "1", items: [] }}
        onDelete={handleDelete}
        onTableHeadClick={(sortQ) => handleSortChange(sortQ)}
        currPage={pageFilter}
        onPageChange={handlePageChange}
      />
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem 2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CreateNewButton onClick={() => setIsModalOpen(true)} />
      </div>
      <NewRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LoadingOverlay isOpen={isLoading} />
    </div>
  );
}

export default App;
