import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Column from './Column';
import Filters from './Filters';

export default function Board({ data, setData, onCardClick, onAddLead }) {
    const [filterCountry, setFilterCountry] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const onDragEnd = (result) => {
        // ... (keep existing drag logic)
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newLeadIds = Array.from(start.leadIds);
            newLeadIds.splice(source.index, 1);
            newLeadIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                leadIds: newLeadIds,
            };

            setData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [newColumn.id]: newColumn,
                },
            }));
            return;
        }

        // Moving from one list to another
        const startLeadIds = Array.from(start.leadIds);
        startLeadIds.splice(source.index, 1);
        const newStart = {
            ...start,
            leadIds: startLeadIds,
        };

        const finishLeadIds = Array.from(finish.leadIds);
        finishLeadIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            leadIds: finishLeadIds,
        };

        setData((prev) => ({
            ...prev,
            columns: {
                ...prev.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }));
    };

    // Get all unique countries for filter
    const allCountries = Array.from(new Set(Object.values(data.leads).map(lead => lead.country)));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ padding: '1.5rem', paddingBottom: 0 }}>
                <div className="board-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem' }}>Campaign Overview</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Manage your creator partnerships</p>
                    </div>
                    <Filters
                        countries={allCountries}
                        activeCountry={filterCountry}
                        onCountryChange={setFilterCountry}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>
            </div>

            <div className="board-container">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="board-columns">
                        {data.columnOrder.map((columnId) => {
                            const column = data.columns[columnId];
                            let leads = column.leadIds.map((leadId) => data.leads[leadId]);

                            // Apply Search
                            if (searchQuery) {
                                const query = searchQuery.toLowerCase();
                                leads = leads.filter(lead =>
                                    lead.name.toLowerCase().includes(query) ||
                                    lead.games.some(game => game.toLowerCase().includes(query)) ||
                                    lead.country.toLowerCase().includes(query)
                                );
                            }

                            // Apply Filters
                            if (filterCountry !== 'All') {
                                leads = leads.filter(lead => lead.country === filterCountry);
                            }

                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    leads={leads}
                                    onCardClick={onCardClick}
                                    onAddLead={onAddLead}
                                />
                            );
                        })}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}
