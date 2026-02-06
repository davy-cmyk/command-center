// Color palette
const COLORS = {
  black: '#020204',
  darkBg: '#1B1922',
  cardBg: '#373033',
  border: '#4F3D3D',
  accent: '#E86942',
  text: '#ECD7C3',
};

export default function CommandPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${COLORS.black} 0%, ${COLORS.darkBg} 100%)`,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.border}`,
          padding: '3rem',
          borderRadius: '0.5rem',
          textAlign: 'center',
          maxWidth: '400px',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: COLORS.text,
            marginBottom: '0.5rem',
            letterSpacing: '0.025em',
          }}
        >
          Command Center
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            color: COLORS.accent,
            fontWeight: 500,
            marginBottom: '1rem',
          }}
        >
          Access granted
        </p>

        <p
          style={{
            fontSize: '0.875rem',
            color: COLORS.text,
            opacity: 0.7,
          }}
        >
          You are inside /command
        </p>
      </div>
    </div>
  );
}
