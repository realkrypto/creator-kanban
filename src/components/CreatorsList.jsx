import React, { useState } from 'react';
import { MapPin, ChevronRight, Search } from 'lucide-react';

export default function CreatorsList({ leads, onSelectCreator }) {
    const [searchQuery, setSearchQuery] = useState('');

    const leadsList = Object.values(leads).filter(lead => {
        const query = searchQuery.toLowerCase();
        return lead.name.toLowerCase().includes(query) ||
            lead.games.some(game => game.toLowerCase().includes(query)) ||
            lead.country.toLowerCase().includes(query);
    });

    return (
        <div style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>All Creators</h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    width: '300px'
                }}>
                    <Search size={16} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search creators or games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-primary)',
                            width: '100%'
                        }}
                    />
                </div>
            </div>

            <div style={{
                flex: 1,
                backgroundColor: 'rgba(24, 24, 27, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 2fr 40px',
                    padding: '1rem 1.5rem',
                    borderBottom: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    <div>Creator</div>
                    <div>Country</div>
                    <div>Stage</div>
                    <div>Games</div>
                    <div></div>
                </div>

                {/* Body */}
                <div style={{ overflowY: 'auto', flex: 1 }}>
                    {leadsList.map(lead => (
                        <div
                            key={lead.id}
                            onClick={() => onSelectCreator(lead.id)}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '2fr 1fr 1fr 2fr 40px',
                                padding: '1rem 1.5rem',
                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                alignItems: 'center',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <img src={lead.avatar} alt={lead.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{lead.name}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                <MapPin size={14} />
                                {lead.country}
                            </div>

                            <div>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '9999px',
                                    fontSize: '0.75rem',
                                    fontWeight: 500,
                                    backgroundColor: 'var(--bg-card)',
                                    color: 'var(--text-primary)',
                                    border: '1px solid var(--border-subtle)',
                                    textTransform: 'capitalize'
                                }}>
                                    {lead.stage}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {lead.games.slice(0, 2).map(game => (
                                    <span key={game} style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{game}</span>
                                ))}
                                {lead.games.length > 2 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{lead.games.length - 2}</span>}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', color: 'var(--text-muted)' }}>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
