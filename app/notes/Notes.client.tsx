'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes  } from '@/lib/api';
import css from "./Notes.client.module.css"
import NoteList from "../../components/NoteList/NoteList";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Sidebar from "../../components/SidebarNotes/SidebarNotes";

export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 400);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSetSearch(value);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.status}>Loading notes…</p>}
      {isError && (
        <p className={css.status}>
          Something went wrong. Check your token in <code>.env</code>.
        </p>
      )}

           <div className={css.layout}>
            <Sidebar />

            <div className={css.content}>
              {notes.length > 0 && <NoteList notes={notes} />}
            </div>
          </div>

      {!isLoading && !isError && notes.length === 0 && (
        <p className={css.status}>No notes found.</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}