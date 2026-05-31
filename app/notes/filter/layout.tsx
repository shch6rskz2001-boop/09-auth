export default function FilterLayout({
  children,
  sidebar,
  modal,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
      <aside>{sidebar}</aside>
      <main style={{ flex: 1 }}>{children}</main>
      {modal}
    </div>
  );
}