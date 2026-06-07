import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] ?? 'all';
  const title = `Нотатки: ${tag} | NoteHub`;
  const description = `Перегляд нотаток з фільтром «${tag}» у застосунку NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-domain.vercel.app/notes/filter/${slug.join('/')}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
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