import React, { useState, useEffect } from 'react';
import { Moon, Sun, Bell, User, Shield, Check, X } from 'lucide-react';
import { authService } from '../services/authService';

export default function Settings() {
    const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            loadPendingUsers();
        }
    }, [currentUser]);

    const loadPendingUsers = () => {
        setPendingUsers(authService.getPendingUsers());
    };

    const handleApprove = (email) => {
        if (authService.approveUser(email)) {
            loadPendingUsers();
        }
    };

    const handleReject = (email) => {
        if (window.confirm(`Reject access for ${email}?`)) {
            authService.rejectUser(email);
            loadPendingUsers();
        }
    };

    return (
        <div className="settings-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem' }}>Settings</h2>

            {/* Account Section */}
            <section style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <User size={20} /> Account
                </h3>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#333' }}></div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>{currentUser?.email}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Role: {currentUser?.role}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin: User Management Section */}
            {currentUser?.role === 'admin' && (
                <section style={{ marginBottom: '3rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Shield size={20} /> User Management
                    </h3>
                    <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 500 }}>Pending Approvals</h4>
                        {pendingUsers.length === 0 ? (
                            <div style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No pending users.</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {pendingUsers.map(user => (
                                    <div key={user.email} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: '1rem',
                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                        borderRadius: '0.5rem'
                                    }}>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{user.email}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Requested: {new Date(user.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleApprove(user.email)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '4px',
                                                    padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: 'none',
                                                    backgroundColor: '#4CAF50', color: 'white', cursor: 'pointer', fontSize: '0.875rem'
                                                }}
                                            >
                                                <Check size={14} /> Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(user.email)}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '4px',
                                                    padding: '0.5rem 0.75rem', borderRadius: '0.375rem', border: 'none',
                                                    backgroundColor: '#FF4B4B', color: 'white', cursor: 'pointer', fontSize: '0.875rem'
                                                }}
                                            >
                                                <X size={14} /> Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Appearance Section (Placeholder) */}
            <section style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Moon size={20} /> Appearance
                </h3>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Dark Mode</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Adjust the appearance of the application</div>
                        </div>
                        <div style={{ width: '48px', height: '24px', backgroundColor: 'var(--accent-primary)', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notifications Section (Placeholder) */}
            <section>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Bell size={20} /> Notifications
                </h3>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 500 }}>Email Notifications</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Receive updates about lead changes</div>
                        </div>
                        <div style={{ width: '48px', height: '24px', backgroundColor: '#333', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
                            <div style={{ width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
