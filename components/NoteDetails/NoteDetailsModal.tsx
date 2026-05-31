'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { Note } from '../../lib/api/notes';

export default function NoteDetailsModal({ note }: { note: Note }) {
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