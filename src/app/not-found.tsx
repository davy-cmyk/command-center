import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: '#111827',
            marginBottom: '1rem',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            marginBottom: '1.5rem',
          }}
        >
          Page not found
        </p>
        <Link
          href="/"
          style={{
            color: '#2563eb',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          ← Go back home
        </Link>
      </div>
    </div>
  );
}
