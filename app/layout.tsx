import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub is a convenient app for creating and managing notes.',
  openGraph: {
    title: 'NoteHub',
    description: 'NoteHub is a convenient app for creating and managing notes.',
    url: 'https://08-zustand-qcem.vercel.app',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};