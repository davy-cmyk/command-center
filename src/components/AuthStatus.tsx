'use client';

import { useState, useEffect } from 'react';

const COLORS = {
  cardBg: '#373033',
  border: '#4F3D3D',
  accent: '#E86942',
  text: '#ECD7C3',
  success: '#22c55e',
};

export function AuthStatus() {
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gate/status')
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.authenticated);
        setLoading(false);
      })
      .catch(() => {
        setStatus(null);
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '1rem',
        backgroundColor: COLORS.cardBg,
        border: `1px solid ${COLORS.border}`,
        padding: '0.75rem 1rem',
        borderRadius: '0.375rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '0.75rem',
        color: COLORS.text,
        minWidth: '140px',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: COLORS.accent }}>
        Auth Status
      </div>
      {loading ? (
        <div style={{ opacity: 0.7 }}>Checking...</div>
      ) : status === true ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ color: COLORS.success }}>●</span>
          <span>Authenticated (cookie set)</span>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ color: COLORS.accent }}>●</span>
          <span>Not authenticated</span>
        </div>
      )}
    </div>
  );
}
