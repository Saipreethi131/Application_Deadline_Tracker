import { useState, useEffect } from 'react'
import StatsSummary from './components/StatsSummary';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import './App.css'

function App() {
  // Initialize state from localStorage
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('tracker_db_v1');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to parse local storage", e);
      return [];
    }
  });

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");

  // UI State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('tracker_db_v1', JSON.stringify(applications));
  }, [applications]);

  // Actions
  const handleAddNew = () => {
    setEditingApp(null);
    setIsFormOpen(true);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(prev => prev.filter(app => app.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (editingApp) {
      // Update existing
      setApplications(prev => prev.map(app =>
        app.id === editingApp.id ? { ...formData, id: app.id } : app
      ));
    } else {
      // Create new
      const newApp = {
        ...formData,
        id: crypto.randomUUID()
      };
      setApplications(prev => [newApp, ...prev]);
    }
    setIsFormOpen(false);
    setEditingApp(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setEditingApp(null);
  };

  // Derive Data
  const filteredApps = applications.filter(app => {
    const statusMatch = filterStatus === "All" || app.status === filterStatus;
    const typeMatch = filterType === "All" || app.type === filterType;
    return statusMatch && typeMatch;
  });

  // Sort by deadline (urgent first), then created (implicit by array order logic, or we sort by deadline)
  // Let's sort by deadline nearest first for utility.
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <div className="container">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 style={{ marginBottom: '0.5rem' }}>Application Tracker</h1>
        </div>
        {!isFormOpen && (
          <button onClick={handleAddNew} className="btn btn-primary text-sm" style={{ padding: '0.4rem 0.8rem' }}>
            + New Application
          </button>
        )}
      </header>

      {/* Main Content */}
      <main>
        {isFormOpen ? (
          <ApplicationForm
            onSave={handleSave}
            onCancel={handleCancel}
            initialData={editingApp}
          />
        ) : (
          <>
            <StatsSummary applications={applications} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-main">
                All Applications <span className="text-muted text-sm font-normal">({sortedApps.length})</span>
              </h2>

              <div className="flex gap-3 w-full sm:w-auto">
                <select
                  className="form-select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="All">All Types</option>
                  <option value="Internship">Internship</option>
                  <option value="Job">Job full-time</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Program">Program</option>
                </select>

                <select
                  className="form-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ width: 'auto', minWidth: '150px' }}
                >
                  <option value="All">All Statuses</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <ApplicationList
              applications={sortedApps}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <footer className="text-center text-muted text-sm mt-12 pb-8 opacity-60 hover:opacity-100 transition-opacity">
        &copy; {new Date().getFullYear()} Application Tracker. Built with React & Vanilla CSS.
      </footer>
    </div>
  )
}

export default App
