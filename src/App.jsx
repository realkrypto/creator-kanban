import React, { useState, useEffect } from 'react';
import { authService } from './services/authService';
import Login from './components/Login';
import Signup from './components/Signup';
import Board from './components/Board';
import CreatorsList from './components/CreatorsList';
import CreatorDetail from './components/CreatorDetail';
import Settings from './components/Settings';
import { LayoutDashboard, Users, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { initialData } from './data/mockData';

function App() {
    const [user, setUser] = useState(null);
    const [authView, setAuthView] = useState('login'); // 'login' or 'signup'
    const [data, setData] = useState(initialData);
    const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard', 'creators', 'detail', 'settings'
    const [selectedCreatorId, setSelectedCreatorId] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        setAuthView('login');
    };

    const handleNavigate = (view, creatorId = null) => {
        setCurrentView(view);
        if (creatorId) setSelectedCreatorId(creatorId);
    };

    const handleAddNote = (leadId, note) => {
        setData(prev => ({
            ...prev,
            leads: {
                ...prev.leads,
                [leadId]: {
                    ...prev.leads[leadId],
                    notes: [note, ...(prev.leads[leadId].notes || [])]
                }
            }
        }));
    };

    const handleAddLead = (columnId, name) => {
        const newLeadId = `lead-${Date.now()}`;
        const newLead = {
            id: newLeadId,
            name: name,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
            games: [],
            stage: columnId,
            country: 'Unknown',
            notes: []
        };

        setData(prev => ({
            ...prev,
            leads: {
                ...prev.leads,
                [newLeadId]: newLead
            },
            columns: {
                ...prev.columns,
                [columnId]: {
                    ...prev.columns[columnId],
                    leadIds: [...prev.columns[columnId].leadIds, newLeadId]
                }
            }
        }));
    };

    const handleUpdateLead = (leadId, updatedData) => {
        setData(prev => ({
            ...prev,
            leads: {
                ...prev.leads,
                [leadId]: {
                    ...prev.leads[leadId],
                    ...updatedData
                }
            }
        }));
    };

    const handleDeleteLead = (leadId) => {
        if (!window.confirm('Are you sure you want to delete this creator?')) return;

        setData(prev => {
            const newLeads = { ...prev.leads };
            delete newLeads[leadId];

            const newColumns = { ...prev.columns };
            for (const colId in newColumns) {
                newColumns[colId].leadIds = newColumns[colId].leadIds.filter(id => id !== leadId);
            }

            return {
                ...prev,
                leads: newLeads,
                columns: newColumns
            };
        });
        handleNavigate('creators');
    };

    if (!user) {
        if (authView === 'signup') {
            return <Signup onNavigateToLogin={() => setAuthView('login')} />;
        }
        return (
            <Login
                onLoginSuccess={handleLoginSuccess}
                onNavigateToSignup={() => setAuthView('signup')}
                onGuestLogin={() => setUser({ email: 'guest@local', role: 'guest' })}
            />
        );
    }

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                    }}></div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '-0.025em' }}>OVDR BizDev</h1>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <NavItem
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                        active={currentView === 'dashboard'}
                        onClick={() => handleNavigate('dashboard')}
                    />
                    <NavItem
                        icon={<Users size={20} />}
                        label="Creators"
                        active={currentView === 'creators' || currentView === 'detail'}
                        onClick={() => handleNavigate('creators')}
                    />
                    <NavItem
                        icon={<SettingsIcon size={20} />}
                        label="Settings"
                        active={currentView === 'settings'}
                        onClick={() => handleNavigate('settings')}
                    />
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#333' }}></div>
                        <div style={{ fontSize: '0.875rem' }}>
                            <div style={{ fontWeight: 500 }}>{user.email.split('@')[0]}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{user.role}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            border: 'none',
                            background: 'transparent',
                            color: 'var(--text-secondary)',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left'
                        }}
                        onMouseEnter={(e) => { e.target.style.background = 'var(--bg-card)'; e.target.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-secondary)'; }}
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                {currentView === 'dashboard' && (
                    <Board
                        data={data}
                        setData={setData}
                        onCardClick={(id) => handleNavigate('detail', id)}
                        onAddLead={handleAddLead}
                    />
                )}
                {currentView === 'creators' && (
                    <CreatorsList
                        leads={data.leads}
                        onSelectCreator={(id) => handleNavigate('detail', id)}
                    />
                )}
                {currentView === 'detail' && selectedCreatorId && (
                    <CreatorDetail
                        lead={data.leads[selectedCreatorId]}
                        onBack={() => handleNavigate('creators')}
                        onAddNote={handleAddNote}
                        onDelete={() => handleDeleteLead(selectedCreatorId)}
                        onUpdate={handleUpdateLead}
                    />
                )}
                {currentView === 'settings' && (
                    <Settings />
                )}
            </main>
        </div>
    );
}

function NavItem({ icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[var(--bg-card)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-white'}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 500,
                border: 'none',
                background: active ? 'var(--bg-card)' : 'transparent',
                color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left'
            }}
        >
            {icon}
            {label}
        </button>
    );
}

export default App;
