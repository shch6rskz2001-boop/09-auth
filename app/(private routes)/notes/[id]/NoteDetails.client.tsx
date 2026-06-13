'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Note not found.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{note.title}</h1>
      {note.tag && <span>{note.tag}</span>}
      <p>{note.content}</p>
      <time>{new Date(note.createdAt).toLocaleDateString('uk-UA')}</time>
    </div>
  );
}