import Link from 'next/link'; 

export default function HomePage() {
  return (
    
    <main style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontWeight: 'bold', color: '#111' }}>
          Welcome to NoteHub
        </h1>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444', marginBottom: '20px' }}>
          NoteHub is a simple and efficient application designed for
          managing personal notes. It helps keep your thoughts organized
          and accessible in one place, whether you are at home or on the go.
        </p>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444', marginBottom: '30px' }}>
          The app provides a clean interface for writing, editing, and
          browsing notes. With support for keyword search and structured
          organization, NoteHub offers a streamlined experience for anyone
          who values clarity and productivity.
        </p>

        <Link 
          href="/notes" 
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#0076fe', 
            color: 'white',
            borderRadius: '8px',       
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Open My Notes →
        </Link>
      </div>
    </main>
  );
}
