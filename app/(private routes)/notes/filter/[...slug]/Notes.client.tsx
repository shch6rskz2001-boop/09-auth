'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import css from './Notes.client.module.css';
import NoteList from '../../../../../components/NoteList/NoteList';
import Pagination from '../../../../../components/Pagination/Pagination';
import SearchBox from '../../../../../components/SearchBox/SearchBox';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface NotesProps {
  tag?: string;
}

export default function Notes({ tag }: NotesProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 400);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSetSearch(value);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag,
      }),
    placeholderData: (prev) => prev,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <div className={css.layout}>
        <div className={css.content}>
          <div className={css.toolbar}>
            <SearchBox value={search} onChange={handleSearchChange} />

            {totalPages > 1 && (
              <Pagination
                totalPages={totalPages}
                currentPage={page}
                onPageChange={setPage}
              />
            )}

            <Link href="/notes/action/create" className={css.button}>
              Create note +
            </Link>
          </div>

          {isLoading && <p className={css.status}>Loading notes…</p>}
          {isError && <p className={css.status}>Something went wrong.</p>}

          {notes.length > 0 && <NoteList notes={notes} />}

          {!isLoading && !isError && notes.length === 0 && (
            <p className={css.status}>No notes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}