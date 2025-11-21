import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import Card from './Card';

export default function Column({ column, leads, onCardClick, onAddLead }) {
  const handleAdd = () => {
    const name = window.prompt('Enter creator name:');
    if (name) {
      onAddLead(column.id, name);
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.05em', fontSize: '0.875rem', textTransform: 'uppercase' }}>{column.title}</h3>
        <span style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 500, padding: '2px 8px', borderRadius: '9999px' }}>{leads.length}</span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column-content"
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'rgba(255,255,255,0.02)' : 'transparent',
              transition: 'background-color 0.2s'
            }}
          >
            {leads.map((lead, index) => (
              <Card key={lead.id} lead={lead} index={index} onClick={() => onCardClick(lead.id)} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button
          onClick={handleAdd}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            border: '1px dashed var(--border-subtle)',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.color = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <Plus size={16} />
          Add Creator
        </button>
      </div>
    </div>
  );
}
