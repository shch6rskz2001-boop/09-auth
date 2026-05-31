import NoteDetailsModal from '@/components/NoteDetails/NoteDetailsModal';

async function getNote(id: string) {
  const res = await fetch(
    `https://notehub-public-api.goit.global/notes/${id}`,
    {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

export default async function InterceptedNotePage({
  params,
}: {
  params: { id: string };
}) {
  const note = await getNote(params.id);
  return <NoteDetailsModal note={note} />;
}