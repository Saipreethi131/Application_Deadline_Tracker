import React, { useState, useEffect } from 'react';

const INITIAL_STATE = {
    company: '',
    role: '',
    type: 'Internship',
    status: 'Applied',
    deadline: '',
    notes: ''
};

const ApplicationForm = ({ onSave, onCancel, initialData }) => {
    const [formData, setFormData] = useState(INITIAL_STATE);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                    {initialData ? 'Edit Application' : 'Add New Application'}
                </h2>
                <button onClick={onCancel} className="text-muted hover:text-main text-2xl" aria-label="Close">
                    &times;
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                    <div className="form-group">
                        <label className="form-label">Company Name *</label>
                        <input
                            type="text"
                            name="company"
                            className="form-input"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Role / Title *</label>
                        <input
                            type="text"
                            name="role"
                            className="form-input"
                            placeholder="e.g. Frontend Intern"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Opportunity Type</label>
                        <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
                            <option value="Internship">Internship</option>
                            <option value="Job">Job / Full-time</option>
                            <option value="Hackathon">Hackathon</option>
                            <option value="Program">Program / Fellowship</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Application Status</label>
                        <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                            <option value="Applied">Applied</option>
                            <option value="Interview">Interview</option>
                            <option value="Offer">Offer</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            className="form-input"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group mt-4">
                    <label className="form-label">Notes</label>
                    <textarea
                        name="notes"
                        className="form-textarea"
                        rows="3"
                        placeholder="Referral details, interview notes, etc."
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button type="button" onClick={onCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        {initialData ? 'Update Application' : 'Save Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationForm;
