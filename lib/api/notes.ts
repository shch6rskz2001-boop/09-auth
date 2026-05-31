export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}


export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<NotesResponse> {
  const { page, perPage, search, tag } = params;

  const query = new URLSearchParams();
  if (page) query.set('page', String(page));
  if (perPage) query.set('perPage', String(perPage));
  if (search) query.set('search', search);
  if (tag && tag !== 'all') query.set('tag', tag);

  const res = await fetch(`/api/notes?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete note');
}

