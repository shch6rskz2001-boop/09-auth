'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import "./globals.css"; // Тут цей імпорт спрацює правильно, бо globals.css лежить поруч
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '../components/Footer/Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
       <Header/>
        <QueryClientProvider client={queryClient}>
          {children} 
        </QueryClientProvider>
          <Footer/>
      </body>
    </html>
  );
}

