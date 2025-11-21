
import React from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';

export default function Filters({ countries, activeCountry, onCountryChange, searchQuery, onSearchChange }) {
    return (
        <div className="flex items-center gap-3">
            {/* Search */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    width: '200px'
                }}>
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="Search creators..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: 'var(--text-primary)',
                            fontSize: 'inherit',
                            width: '100%'
                        }}
                    />
                </div>
            </div>

            {/* Country Filter */}
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer'
                }}>
                    <MapPin size={14} />
                    <select
                        value={activeCountry}
                        onChange={(e) => onCountryChange(e.target.value)}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            outline: 'none',
                            appearance: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontSize: 'inherit'
                        }}
                    >
                        <option value="All">All Countries</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    <ChevronDown size={12} />
                </div>
            </div>
        </div>
    );
}

