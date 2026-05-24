 import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { noteService } from '@/lib/api'; 
import NotesClient from './Notes.client'; 

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
      queryKey: ['notes'],
      queryFn : () =>
          noteService({
        page: 1,
        search: undefined,
        perPage: 12,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
