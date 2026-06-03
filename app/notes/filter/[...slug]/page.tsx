import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function FilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>; // ← змінено
}) {
  const { slug } = await params; // ← додано await
  const tag = slug?.[0];
  const resolvedTag = tag === 'all' ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', resolvedTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: undefined,
        tag: resolvedTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={resolvedTag} />
    </HydrationBoundary>
  );
}