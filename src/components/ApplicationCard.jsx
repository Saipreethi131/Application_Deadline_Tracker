import React from 'react';

const isUrgent = (deadline) => {
    if (!deadline) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(deadline);
    // fix timezone offsetting if needed, but simple string parsing usually works for YYYY-MM-DD in local time if we aren't careful.
    // Actually new Date("YYYY-MM-DD") is UTC. best to append "T00:00:00" or simple parse.
    // For interview simplicity, we'll assume standard behavior but let's be safe.
    const [y, m, d] = deadline.split('-').map(Number);
    const localDue = new Date(y, m - 1, d);

    const diffTime = localDue - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= 3;
};

// Format for display
const formatDate = (dateString) => {
    if (!dateString) return 'No Deadline';
    const [y, m, d] = dateString.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const ApplicationCard = ({ app, onEdit, onDelete }) => {
    const urgent = isUrgent(app.deadline) && app.status !== 'Rejected' && app.status !== 'Offer';

    return (
        <div
            className={`glass-panel ${urgent ? 'urgent-border' : ''}`}
            style={{
                padding: '1.5rem',
                marginBottom: '1rem',
                position: 'relative',
                borderLeft: urgent ? '4px solid var(--status-rejected)' : undefined,
            }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <span className="text-muted text-xs font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                        {app.type}
                    </span>
                    <h3 className="font-bold text-main mt-2" style={{ fontSize: '1.25rem' }}>{app.role}</h3>
                    <p className="text-primary font-medium text-lg">{app.company}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`badge status-${app.status.toLowerCase()}`}>
                        {app.status}
                    </span>
                    {urgent && <span className="text-xs font-semibold text-red-600">Urgent</span>}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="text-sm text-muted">
                    <div className="flex items-center gap-2">
                        <span>📅 <span style={{ color: urgent ? 'var(--status-rejected)' : 'inherit', fontWeight: urgent ? 'bold' : 'normal' }}>{formatDate(app.deadline)}</span></span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button onClick={() => onEdit(app)} className="btn btn-secondary text-sm" style={{ padding: '0.4rem 0.8rem' }}>
                        Edit
                    </button>
                    <button onClick={() => onDelete(app.id)} className="btn btn-danger text-sm" style={{ padding: '0.4rem 0.8rem' }}>
                        Delete
                    </button>
                </div>
            </div>

            {app.notes && (
                <div className="mt-4 bg-gray-50 p-3 rounded text-sm text-muted">
                    {app.notes}
                </div>
            )}
        </div>
    );
};

export default ApplicationCard;
