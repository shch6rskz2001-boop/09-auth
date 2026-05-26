import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN; 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
}); 

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

// 1. Отримання списку нотаток
export async function fetchNotes(
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search } = params;
  const query: Record<string, unknown> = { page, perPage };
  if (search) query.search = search;
  const response = await axiosInstance.get<FetchNotesResponse>("/notes", {
    params: query,
  });
  return response.data;
}

// 2. Створення нотатки
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const response = await axiosInstance.post<Note>("/notes", payload);
  return response.data;
}

// 3. Видалення нотатки
export async function deleteNote(id: string): Promise<Note> {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
}

// 4. Отримання ОДНІЄЇ нотатки за її id (Додано для TanStack Query)
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
}

// Групуємо всі методи в один сервіс для зручності (опціонально)
export const noteService = {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
};


