import React from 'react';
import ApplicationCard from './ApplicationCard';

const ApplicationList = ({ applications, onEdit, onDelete }) => {
    if (!applications || applications.length === 0) {
        return (
            <div className="glass-panel text-center" style={{ padding: '3rem 1rem' }}>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>No applications found.</p>
                <p className="text-muted text-sm mt-2">Add a new one to get started!</p>
            </div>
        );
    }

    return (
        <div className="application-list">
            {applications.map(app => (
                <ApplicationCard
                    key={app.id}
                    app={app}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ApplicationList;
