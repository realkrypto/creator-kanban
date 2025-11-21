import React, { useState } from 'react';
import { authService } from '../services/authService';

export default function Signup({ onNavigateToLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        const result = authService.signup(email, password);
        if (result.success) {
            setSuccess(result.message);
            setTimeout(() => {
                onNavigateToLogin();
            }, 2000);
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
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Request Access</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Create an account to request access</p>

                {error && <div style={{ color: '#FF4B4B', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                {success && <div style={{ color: '#4CAF50', marginBottom: '1rem', fontSize: '0.875rem' }}>{success}</div>}

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Sign Up
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <button
                        onClick={onNavigateToLogin}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', padding: 0 }}
                    >
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
}
