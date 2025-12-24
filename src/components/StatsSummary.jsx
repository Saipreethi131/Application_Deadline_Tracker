import React from 'react';

const StatCard = ({ label, value, colorVar }) => (
    <div className="glass-panel flex flex-col items-start justify-between h-full" style={{ padding: '1.25rem' }}>
        <span className="text-muted text-xs font-bold uppercase tracking-wider mb-2">{label}</span>
        <span className="text-3xl font-bold" style={{ color: `var(${colorVar})` }}>{value}</span>
    </div>
);

const StatsSummary = ({ applications }) => {
    const stats = {
        total: applications.length,
        applied: applications.filter(a => a.status === 'Applied').length,
        interview: applications.filter(a => a.status === 'Interview').length,
        offer: applications.filter(a => a.status === 'Offer').length,
    };

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
        }}>
            <StatCard label="Total Apps" value={stats.total} colorVar="--text-main" />
            <StatCard label="Applied" value={stats.applied} colorVar="--status-applied" />
            <StatCard label="Interviews" value={stats.interview} colorVar="--status-interview" />
            <StatCard label="Offers" value={stats.offer} colorVar="--status-offer" />
        </div>
    );
};

export default StatsSummary;
