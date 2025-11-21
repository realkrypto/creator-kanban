import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Login({ onLoginSuccess, onNavigateToSignup, onGuestLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        const result = authService.login(email, password);
        if (result.success) {
            onLoginSuccess(result.user);
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-app)',
            color: 'white'
        }}>
            <div style={{
                padding: '3rem',
                backgroundColor: 'var(--bg-panel)',
                borderRadius: '1rem',
                border: '1px solid var(--border-subtle)',
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%'
            }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    margin: '0 auto 1.5rem auto'
                }}></div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Welcome Back</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Sign in to access the OVDR BizDev</p>

                {error && <div style={{ color: '#FF4B4B', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-app)',
                            color: 'white'
                        }}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-app)',
                            color: 'white'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '0.75rem',
                            backgroundColor: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginTop: '0.5rem'
                        }}
                    >
                        Log In
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Don't have an account?{' '}
                    <button
                        onClick={onNavigateToSignup}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0 }}
                    >
                        Request Access
                    </button>
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                        onClick={onGuestLogin}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--border-subtle)',
                            color: 'var(--text-secondary)',
                            padding: '0.75rem',
                            borderRadius: '0.5rem',
                            width: '100%',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.target.style.borderColor = 'var(--text-primary)'; e.target.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.target.style.borderColor = 'var(--border-subtle)'; e.target.style.color = 'var(--text-secondary)'; }}
                    >
                        Continue as Guest (Testing)
                    </button>
                </div>
            </div>
        </div>
    );
}
