'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api/clientApi';


export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  return (
    <Modal onClose={() => router.back()}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}
      {note && (
        <>
          <h2>{note.title}</h2>
          {note.tag && <span>{note.tag}</span>}
          <p>{note.content}</p>
          <time>{new Date(note.createdAt).toLocaleDateString('uk-UA')}</time>
        </>
      )}
    </Modal>
  );
}