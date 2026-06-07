import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено | NoteHub',
  description: 'Такої сторінки не існує. Поверніться на головну NoteHub.',
  openGraph: {
    title: 'Сторінку не знайдено | NoteHub',
    description: 'Такої сторінки не існує. Поверніться на головну NoteHub.',
    url: 'https://your-domain.vercel.app/not-found',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1>404 — Сторінку не знайдено</h1>
      <p>Поверніться на головну.</p>
    </div>
  );
}