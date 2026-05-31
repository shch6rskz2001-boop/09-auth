import NoteList from '@/components/NoteList/NoteList';

async function getFilteredNotes(tag?: string) {
  const query = new URLSearchParams();
  query.set('perPage', '50');
  if (tag && tag !== 'all') query.set('tag', tag);

  const res = await fetch(
    `https://notehub-public-api.goit.global/notes?${query.toString()}`,
    {
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${process.env.NOTEHUB_TOKEN}`,
      },
    }
  );
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export default async function FilteredNotesPage({
  params,
}: {
  params: { tag?: string[] };
}) {
  const tag = params.tag?.[0];
  const data = await getFilteredNotes(tag);
  const notes = data.notes ?? [];

  return notes.length > 0 ? (
    <NoteList notes={notes} />
  ) : (
    <p>No notes found.</p>
  );
}