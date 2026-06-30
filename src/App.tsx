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

function App() {
  const [search, setSearch] = useState(
    () => new URLSearchParams(window.location.search).get("search") || ""
  );
  const [priorityFilter, setPriorityFilter] = useState(
    () => new URLSearchParams(window.location.search).get("priority") || ""
  );
  const [sortFilter, setSortFilter] = useState(
    () => new URLSearchParams(window.location.search).get("sort") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    () => new URLSearchParams(window.location.search).get("status") || ""
  );

  const { requestData, isLoading } = useGetRequests({
    search,
    priority: priorityFilter,
    sort: sortFilter,
    status: statusFilter,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update URL when filters change
  const updateUrl = (
    newSearch: string,
    newPriority: string,
    newStatus: string,
    newSort: string
  ) => {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newPriority) params.set("priority", newPriority);
    if (newStatus) params.set("status", newStatus);
    if (newSort) params.set("sort", newSort);

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchBlur = (value: string) => {
    setSearch(value);
    updateUrl(value, priorityFilter, statusFilter, sortFilter);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    updateUrl(search, value, statusFilter, sortFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateUrl(search, priorityFilter, value, sortFilter);
  };

  const handleSortChange = (value: string) => {
    setSortFilter(value);
    updateUrl(search, priorityFilter, statusFilter, value);
  };

  const handleDelete = (id: number) => {
    // implement deleting
  };

  return (
    <div>
      <Header />
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onBlur={handleSearchBlur}
      />
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
