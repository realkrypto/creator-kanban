
import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Send, MessageSquare, Mail, MessageCircle, Trash2, Edit2, Save, X, User, AtSign, Hash } from 'lucide-react';
import { countries } from '../data/countries';

export default function CreatorDetail({ lead, onBack, onAddNote, onDelete, onUpdate }) {
    const [noteContent, setNoteContent] = useState('');
    const [noteType, setNoteType] = useState('email');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    useEffect(() => {
        if (lead) {
            setEditForm({
                name: lead.name,
                legalName: lead.legalName || '',
                email: lead.email || '',
                discordId: lead.discordId || '',
                country: lead.country,
                assignee: lead.assignee || '',
                source: lead.source || '',
                games: lead.games.join(', ')
            });
        }
    }, [lead]);

    const handleSave = () => {
        onUpdate(lead.id, {
            ...editForm,
            games: editForm.games.split(',').map(g => g.trim()).filter(g => g)
        });
        setIsEditing(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noteContent.trim()) return;

        onAddNote(lead.id, {
            type: noteType,
            content: noteContent,
            date: new Date().toLocaleDateString()
        });
        setNoteContent('');
    };

    const getIcon = (type) => {
        switch (type) {
            case 'email': return <Mail size={14} />;
            case 'discord': return <MessageCircle size={14} />;
            default: return <MessageSquare size={14} />;
        }
    };

    return (
        <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>Creator Details</h2>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                    {!isEditing ? (
                        <>
                            <button
                                onClick={() => setIsEditing(true)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'var(--bg-card)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-subtle)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                <Edit2 size={16} />
                                Edit
                            </button>
                            <button
                                onClick={onDelete}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'var(--accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                <Save size={16} />
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: 'transparent',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-subtle)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '0.5rem',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 500
                                }}
                            >
                                <X size={16} />
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="creator-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
                {/* Left Column: Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{
                        backgroundColor: 'var(--bg-panel)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '0.75rem',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        <img src={lead.avatar} alt={lead.name} style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '1rem', border: '2px solid var(--border-subtle)' }} />

                        {isEditing ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Creator Name</label>
                                    <input
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        placeholder="Creator Name"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Legal Name</label>
                                    <input
                                        value={editForm.legalName}
                                        onChange={(e) => setEditForm({ ...editForm, legalName: e.target.value })}
                                        placeholder="Legal Name"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Country</label>
                                    <input
                                        value={editForm.country}
                                        onChange={(e) => {
                                            setEditForm({ ...editForm, country: e.target.value });
                                            setShowCountryDropdown(true);
                                        }}
                                        onFocus={() => setShowCountryDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowCountryDropdown(false), 100)} // Delay hiding to allow click on dropdown item
                                        placeholder="Search Country"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                    {showCountryDropdown && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            right: 0,
                                            backgroundColor: 'var(--bg-card)',
                                            border: '1px solid var(--border-subtle)',
                                            borderRadius: '0.5rem',
                                            marginTop: '0.25rem',
                                            maxHeight: '200px',
                                            overflowY: 'auto',
                                            zIndex: 10
                                        }}>
                                            {countries.filter(c => c.toLowerCase().includes(editForm.country.toLowerCase())).map(c => (
                                                <div
                                                    key={c}
                                                    onClick={() => {
                                                        setEditForm({ ...editForm, country: c });
                                                        setShowCountryDropdown(false);
                                                    }}
                                                    style={{
                                                        padding: '0.5rem 1rem',
                                                        cursor: 'pointer',
                                                        color: 'var(--text-primary)',
                                                        borderBottom: '1px solid var(--border-subtle)'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-app)'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    {c}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Email</label>
                                    <input
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                        placeholder="Email"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Discord ID</label>
                                    <input
                                        value={editForm.discordId}
                                        onChange={(e) => setEditForm({ ...editForm, discordId: e.target.value })}
                                        placeholder="Discord ID"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Assignee</label>
                                    <input
                                        value={editForm.assignee}
                                        onChange={(e) => setEditForm({ ...editForm, assignee: e.target.value })}
                                        placeholder="Assignee (e.g. Alex)"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Source</label>
                                    <input
                                        value={editForm.source}
                                        onChange={(e) => setEditForm({ ...editForm, source: e.target.value })}
                                        placeholder="Source (e.g. Game Jam)"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', display: 'block' }}>Games</label>
                                    <textarea
                                        value={editForm.games}
                                        onChange={(e) => setEditForm({ ...editForm, games: e.target.value })}
                                        placeholder="Games (comma separated)"
                                        style={{ width: '100%', background: 'var(--bg-app)', border: '1px solid var(--border-subtle)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white', minHeight: '80px' }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>{lead.name}</h3>
                                {lead.legalName && <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{lead.legalName}</div>}

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    <MapPin size={16} />
                                    {lead.country}
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', width: '100%' }}>
                                    {lead.email && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            <Mail size={14} />
                                            {lead.email}
                                        </div>
                                    )}
                                    {lead.discordId && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                            <MessageCircle size={14} />
                                            {lead.discordId}
                                        </div>
                                    )}
                                </div>

                                {lead.assignee && (
                                    <div style={{ marginBottom: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '9999px', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                                        Assigned to: {lead.assignee}
                                    </div>
                                )}

                                {lead.source && (
                                    <div style={{ marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                        Source: <span style={{ color: 'white' }}>{lead.source}</span>
                                    </div>
                                )}

                                <div style={{ width: '100%', textAlign: 'left' }}>
                                    <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>Developed Games</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {lead.games.map(game => (
                                            <span key={game} style={{
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.875rem',
                                                backgroundColor: 'var(--bg-app)',
                                                color: 'var(--text-primary)',
                                                border: '1px solid var(--border-subtle)'
                                            }}>
                                                {game}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Column: Notes */}
                <div style={{
                    backgroundColor: 'var(--bg-panel)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)' }}>
                        <h3 style={{ fontWeight: 600, color: 'white' }}>Communication Notes</h3>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {lead.notes && lead.notes.length > 0 ? (
                            lead.notes.map((note, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--bg-card)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--accent-primary)',
                                        border: '1px solid var(--border-subtle)',
                                        flexShrink: 0
                                    }}>
                                        {getIcon(note.type)}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'white', textTransform: 'capitalize' }}>{note.type}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{note.date}</span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{note.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                                No notes yet. Start a conversation!
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            {['email', 'discord', 'dm'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setNoteType(type)}
                                    style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        border: '1px solid',
                                        borderColor: noteType === type ? 'var(--accent-primary)' : 'var(--border-subtle)',
                                        backgroundColor: noteType === type ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                        color: noteType === type ? 'var(--accent-primary)' : 'var(--text-muted)',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                value={noteContent}
                                onChange={(e) => setNoteContent(e.target.value)}
                                placeholder="Add a note..."
                                style={{
                                    flex: 1,
                                    backgroundColor: 'var(--bg-app)',
                                    border: '1px solid var(--border-subtle)',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--accent-primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.5rem',
                                    width: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
