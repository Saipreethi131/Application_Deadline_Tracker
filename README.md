# Application & Deadline Tracker

A clean, focused frontend application to help students and job seekers track their application process. Built with a focus on React fundamentals, clean architecture, and premium aesthetics without external component libraries.

## 🚀 Features

*   **Dashboard Overview**: Real-time metrics on applications (Applied, Interviewing, Offers).
*   **Deadline Tracking**: automatic visual highlighting of upcoming deadlines (within 3 days).
*   **Management**: Create, Edit, and Delete application entries.
*   **Filtering**: Filter by Status (Offer, Rejected, etc.) and Opportunity Type.
*   **Persistence**: Data is saved locally using `localStorage`, preserving state across sessions.
*   **Responsive Design**: A glassmorphism-inspired UI that works on mobile and desktop.

## 🛠️ Tech Stack & Design Decisions

This project was intentionally built with **zero external UI libraries** (like Material UI or Bootstrap) to demonstrate strong command over CSS and React component composition.

*   **React (Hooks)**: Used `useState` for local state and `useEffect` for persistence side-effects.
*   **Vanilla CSS (CSS Variables)**: Implemented a custom design system with theming tokens for consistency and maintainability.
*   **LocalStorage**: Acts as a synchronous local database to ensure data persistence without a backend.
*   **Component Architecture**: Separation of concerns between "Smart" container components (App) and "Pure" presentational components (StatsSummary, ApplicationCard).

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ApplicationForm.jsx   # Controlled form with validation
│   ├── ApplicationList.jsx   # Renders list or empty state
│   ├── ApplicationCard.jsx   # Individual item display with deadline logic
│   └── StatsSummary.jsx      # Dashboard metrics
├── App.jsx                   # Main controller (State, Layout, Routing logic)
├── index.css                 # Global Design System (Variables, Reset, Typography)
└── main.jsx                  # Entry point
```

## 🔧 Setup & Running

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## 🧠 Engineering Highlights

*   **State Management**: Avoided Redux/Context for simpler prop-drilling suitable for this scale.
*   **Performance**: Derived state (filtering/sorting) is calculated in the render pass, which is optimal for lists < 1000 items. 
*   **Accessibility**: Semantic HTML, proper contrast ratios, and keyboard navigation support.
*   **Clean Code**: separation of logic (e.g., `isUrgent` utility) from presentation.
