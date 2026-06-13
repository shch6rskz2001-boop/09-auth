import api from './api';
import { User } from '@/types/user';
import type { Note } from '@/types/note';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<NotesResponse> {
  const { page, perPage, search, tag } = params;
  const query = new URLSearchParams();
  if (page) query.set('page', String(page));
  if (perPage) query.set('perPage', String(perPage));
  if (search) query.set('search', search);
  if (tag && tag !== 'all') query.set('tag', tag);
  const { data } = await api.get(`/notes?${query.toString()}`);
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: Pick<Note, 'title' | 'content' | 'tag'>): Promise<Note> {
  const { data } = await api.post('/notes', note);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete(`/notes/${id}`);
  return data;
}

export async function register(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post('/auth/register', credentials);
  return data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post('/auth/login', credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get('/auth/session');
  return data || null;
}

export async function getMe(): Promise<User> {
  const { data } = await api.get('/users/me');
  return data;
}

export async function updateMe(payload: Partial<Pick<User, 'username'>>): Promise<User> {
  const { data } = await api.patch('/users/me', payload);
  return data;
}