# Application & Deadline Tracker
A React-based web application to track job, internship, and hackathon applications with deadlines and status updates.

## Features
- Add, edit, and delete applications
- Track application status (Applied, Interview, Offer, Rejected)
- Highlight urgent deadlines (within 3 days)
- Filter applications by type and status
- Data persistence using localStorage
## Tech Stack
- React (Hooks)
- JavaScript
- HTML, CSS
- Vite
## Project Structure
src/
├── components/
│   ├── ApplicationForm.jsx   # Controlled form with validation
│   ├── ApplicationList.jsx   # Renders list or empty state
│   ├── ApplicationCard.jsx   # Individual item display with deadline logic
│   └── StatsSummary.jsx      # Dashboard metrics
├── App.jsx                   # Main controller (State, Layout, Routing logic)
├── index.css                 # Global Design System (Variables, Reset, Typography)
└── main.jsx                  # Entry point
## Setup
```bash
npm install
npm run dev
