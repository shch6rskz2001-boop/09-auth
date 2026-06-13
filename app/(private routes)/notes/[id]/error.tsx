'use client';

interface Props {
  error: Error & { digest?: string };
}

export default function NoteError({ error }: Props) {
  return <p>Could not fetch note details. {error.message}</p>;
}