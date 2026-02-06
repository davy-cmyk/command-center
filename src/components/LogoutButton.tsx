'use client';

const COLORS = {
  border: '#4F3D3D',
  text: '#ECD7C3',
  accent: '#E86942',
};

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch('/api/gate/logout', { method: 'POST' });
    } finally {
      // Always redirect to gate page, even if request fails
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        border: `1px solid ${COLORS.border}`,
        borderRadius: '0.375rem',
        color: COLORS.text,
        fontSize: '0.875rem',
        fontWeight: 500,
        cursor: 'pointer',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'border-color 0.15s ease, color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = COLORS.accent;
        e.currentTarget.style.color = COLORS.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = COLORS.border;
        e.currentTarget.style.color = COLORS.text;
      }}
    >
      Logout
    </button>
  );
}
