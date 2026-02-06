'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Color palette
const COLORS = {
  black: '#020204',
  darkBg: '#1B1922',
  cardBg: '#373033',
  border: '#4F3D3D',
  accent: '#E86942',
  text: '#ECD7C3',
};

function GateInner() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the next destination from query params, default to /command
  const next = searchParams.get('next') || '/command';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Success - redirect to the intended destination
        router.push(next);
        router.refresh();
      } else {
        // Failed - show error
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
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
          padding: '2rem',
          borderRadius: '0.5rem',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <h1
          style={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            color: COLORS.text,
            textAlign: 'center',
            letterSpacing: '0.025em',
          }}
        >
          Command Center
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: COLORS.text,
                marginBottom: '0.25rem',
              }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                backgroundColor: COLORS.black,
                border: `1px solid ${COLORS.border}`,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                color: COLORS.text,
                boxSizing: 'border-box',
                outline: 'none',
              }}
              autoFocus
            />
          </div>

          {error && (
            <div
              style={{
                color: COLORS.accent,
                fontSize: '0.875rem',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              Wrong password.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              backgroundColor: isLoading || !password ? '#6b4a3a' : COLORS.accent,
              color: COLORS.black,
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: isLoading || !password ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (!isLoading && password) {
                e.currentTarget.style.backgroundColor = '#ff7a4f';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor =
                isLoading || !password ? '#6b4a3a' : COLORS.accent;
            }}
          >
            {isLoading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function GatePage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
      <GateInner />
    </Suspense>
  );
}
