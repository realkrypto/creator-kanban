
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MapPin, Code2 } from 'lucide-react';

export default function Card({ lead, index, onClick }) {
    return (
        <Draggable draggableId={lead.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    style={{
                        backgroundColor: 'var(--bg-card)',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'grab',
                        boxShadow: snapshot.isDragging ? '0 10px 15px -3px rgba(0, 0, 0, 0.5)' : 'none',
                        transition: 'all 0.2s',
                        ...provided.draggableProps.style,
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                                src={lead.avatar}
                                alt={lead.name}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-subtle)', backgroundColor: '#27272a' }}
                            />
                            <div>
                                <h4 style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.875rem', margin: 0 }}>{lead.name}</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.125rem' }}>
                                    <MapPin size={12} />
                                    <span>{lead.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.375rem' }}>
                            <span>Developed Games</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
                            {lead.games.map(game => (
                                <span key={game} style={{
                                    padding: '0.125rem 0.5rem',
                                    borderRadius: '0.25rem',
                                    fontSize: '0.625rem',
                                    backgroundColor: 'var(--bg-panel)',
                                    color: 'var(--text-secondary)',
                                    border: '1px solid var(--border-subtle)'
                                }}>
                                    {game}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                        {lead.assignee && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', color: 'white', fontSize: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {lead.assignee.charAt(0)}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{lead.assignee}</span>
                            </div>
                        )}
                        {lead.source && (
                            <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>
                                {lead.source}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </Draggable>
    );
}
