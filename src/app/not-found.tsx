export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020204', color: '#ECD7C3', fontFamily: 'system-ui' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>404</h1>
        <p style={{ opacity: 0.8 }}>Page not found</p>
        <a href="/" style={{ color: '#E86942', marginTop: 16, display: 'inline-block' }}>
          Return to Command Center
        </a>
      </div>
    </div>
  );
}
