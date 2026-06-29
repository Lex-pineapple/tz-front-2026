import { useMemo, useState } from 'react'
import './App.css'
import { CreateNewButton } from './components/create-new-button'
import { FilterSelect } from './components/filter-select'
import { Header } from './components/header'
import { RequestTable } from './components/request-table'
import { SearchBar } from './components/search-bar'
import type { RequestDto } from './dtos'
import { NewRequestModal } from './components/new-request-modal'

const initialRequests: RequestDto[] = [
  {
    id: 1,
    title: 'Access request for finance team',
    description: 'Need permissions for monthly report review',
    status: 'new',
    priority: 'high',
    created_at: '2026-06-25T10:00:00.000Z',
    updated_at: '2026-06-25T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'Workspace onboarding',
    description: 'Create a new workspace for onboarding',
    status: 'in_progress',
    priority: 'normal',
    created_at: '2026-06-26T09:30:00.000Z',
    updated_at: '2026-06-27T11:15:00.000Z',
  },
  {
    id: 3,
    title: 'VPN access approval',
    description: 'Grant temporary VPN access for remote support',
    status: 'done',
    priority: 'low',
    created_at: '2026-06-20T15:45:00.000Z',
    updated_at: '2026-06-21T08:20:00.000Z',
  },
]

function App() {
  const [requests, setRequests] = useState<RequestDto[]>(initialRequests)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Initialize filter states from URL params
  const [search, setSearch] = useState(() => new URLSearchParams(window.location.search).get('search') || '')
  const [priorityFilter, setPriorityFilter] = useState(() => new URLSearchParams(window.location.search).get('priority') || '')
  const [sortFilter, setSortFilter] = useState(() => new URLSearchParams(window.location.search).get('sort') || '')
  const [statusFilter, setStatusFilter] = useState(() => new URLSearchParams(window.location.search).get('status') || '')

  // Update URL when filters change
  const updateUrl = (newSearch: string, newPriority: string, newStatus: string, newSort: string) => {
    const params = new URLSearchParams()
    if (newSearch) params.set('search', newSearch)
    if (newPriority) params.set('priority', newPriority)
    if (newStatus) params.set('status', newStatus)
    if (newSort) params.set('sort', newSort)

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    window.history.replaceState(null, '', newUrl)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    updateUrl(value, priorityFilter, statusFilter, sortFilter)
  }

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value)
    updateUrl(search, value, statusFilter, sortFilter)
  }

  const handleStatusChange = (value: string) => {
    setStatusFilter(value)
    updateUrl(search, priorityFilter, value, sortFilter)
  }

  const handleSortChange = (value: string) => {
    setSortFilter(value)
    updateUrl(search, priorityFilter, statusFilter, value)
  }

  const handleDelete = (id: number) => {
    setRequests((currentRequests) => currentRequests.filter((request) => request.id !== id))
  }

  const filteredRequests = useMemo(() => {
    let result = requests

    // Apply search filter
    if (search.trim()) {
      const query = search.trim().toLowerCase()
      result = result.filter((request) => {
        const searchableText = `${request.title} ${request.description ?? ''} ${request.status} ${request.priority}`.toLowerCase()
        return searchableText.includes(query)
      })
    }

    // Apply priority filter
    if (priorityFilter) {
      result = result.filter((request) => request.priority === priorityFilter)
    }

    // Apply status filter
    if (statusFilter) {
      result = result.filter((request) => request.status === statusFilter)
    }

    return result
  }, [requests, search, priorityFilter, statusFilter])

  return (
    <div>
      <Header />
      <SearchBar value={search} onChange={handleSearchChange} />
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem', display: 'flex', gap: '1rem' }}>
        <FilterSelect type="priority" value={priorityFilter} onChange={handlePriorityChange} />
        <FilterSelect type="status" value={statusFilter} onChange={handleStatusChange} />
      </div>
      <RequestTable currSortQ={sortFilter} requests={filteredRequests} onDelete={handleDelete} onTableHeadClick={(sortQ) => handleSortChange(sortQ)} />
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem 2rem', display: 'flex', justifyContent: 'flex-end' }}>
        <CreateNewButton onClick={() => setIsModalOpen(true)}/>
      </div>
      <NewRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  )
}

export default App
