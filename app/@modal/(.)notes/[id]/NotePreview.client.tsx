'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';

export default function NotePreview({ note }: { note: Note }) {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      {note.tag && <span>{note.tag}</span>}
      <p>{note.content}</p>
      <time>{new Date(note.createdAt).toLocaleDateString('uk-UA')}</time>
    </Modal>
  );
}