# MERN Job Portal (Frontend Mock Version)

This is a frontend-only demonstration of the Job Portal application, using mock data and decoupled from the backend for easy viewing and testing.

## Features
- **Mock Authentication**: Log in with any email/password.
- **Dummy Data**: Pre-loaded jobs, applications, and user profiles.
- **Full UI Flows**: Explore the Job Seeker and Employer dashboards, post jobs, and apply to openings without a database.
- **Modern UI**: Built with Tailwind CSS 4 and Lucide icons.
- **State Management**: Optimized data flow using Zustand with simulated network delays.

## Setup Instructions

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Navigation Guide
- **Job Seeker**: Log in (or just use the default mock user) to view applications and apply to jobs.
- **Employer**: To see the employer view, use an email containing "employer" (e.g., `recruiter@employer.com`) during login.
- **Dashboards**: Specialized views for managing your activity.

## Original Backend (Optional)
The original backend code is still available in the `/server` directory if you wish to connect a real database later.
