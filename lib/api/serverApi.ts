import { cookies } from 'next/headers';
import api from './api';
import { User } from '@/types/user';

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<NotesResponse> {
  const { page, perPage, search, tag } = params;
  const query = new URLSearchParams();
  if (page) query.set('page', String(page));
  if (perPage) query.set('perPage', String(perPage));
  if (search) query.set('search', search);
  if (tag && tag !== 'all') query.set('tag', tag);
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get(`/notes?${query.toString()}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const cookieHeader = await getCookieHeader();
  const { data } = await api.get('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
}

export async function checkSession(): Promise<User | null> {
  try {
    const cookieHeader = await getCookieHeader();
    const { data } = await api.get('/auth/session', {
      headers: { Cookie: cookieHeader },
    });
    return data || null;
  } catch {
    return null;
  }
}