export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#020204',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#1B1922',
          border: '1px solid #4F3D3D',
          borderRadius: 12,
          padding: '3rem',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <h1
          style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: '#ECD7C3',
            marginBottom: '0.5rem',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            color: '#ECD7C3',
            opacity: 0.8,
            marginBottom: '1.5rem',
          }}
        >
          Page not found
        </p>
        <a
          href="/"
          style={{
            color: '#E86942',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
        >
          Return to Command Center
        </a>
      </div>
    </div>
  );
}
