# UPM Student Graduate Portal - React Version

A modern React application for Universiti Putra Malaysia's School of Graduate Studies (SGS), designed to improve the postgraduate student experience.

**Created by:** Hazwani, Yinzhu, Faris, Ze Liang  
**Date:** April 2026

## Features

### For Students

- Secure login with role-based authentication
- Visual degree progress tracking with animated circular indicator
- Interactive task checklist with notifications
- Step-by-step workflow wizards (Thesis, Payment, Extension, Graduation)
- Upcoming deadlines calendar with urgency indicators
- Quick actions for common tasks
- Real-time toast notifications

### For Admin Staff

- Statistics dashboard with trend indicators
- Application management with status tracking
- Data table with filtering capabilities
- Activity feed

### For Supervisors

- Student cards with progress bars
- Meeting scheduler
- Document review queue
- Quick messaging to students

## Technology Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router** - Navigation
- **Lucide React** - Icons
- **CSS Modules** - Component styling

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Header, Navigation)
│   ├── Login/           # Login page
│   ├── Student/         # Student dashboard components
│   ├── Admin/           # Admin dashboard
│   └── Supervisor/      # Supervisor dashboard
├── context/             # React Context (User, Notifications)
├── App.tsx              # Main app with routing
└── index.css            # Global styles
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Demo Credentials

Use these usernames to test different roles (any password works):

- `student` - Student dashboard
- `admin` - Admin dashboard
- `supervisor` - Supervisor dashboard

## UX Design Implementation

### UX Pyramid Levels

1. **Functional** - Core features work reliably
2. **Reliable** - HTTPS security, smart forms, notifications
3. **Usable** - Clear navigation, step-by-step wizards
4. **Convenient** - Quick actions, mobile responsive
5. **Pleasurable** - UPM Maroon branding, smooth animations

### Design Decisions

- **Colors:** UPM Maroon (#7B1F3A), White, semantic colors for states
- **Typography:** Inter (body), Merriweather (headings)
- **Spacing:** 4px grid system for consistency
- **Mobile-first:** Hamburger menu, touch-friendly targets

## Key Components

### WorkflowModal

Interactive step-by-step guides that replace PDF manuals:

- Thesis Submission (5 steps)
- Fee Payment (4 steps)
- Extension Request (5 steps)
- Graduation Application (4 steps)

### ProgressCard

Animated circular progress indicator showing:

- Overall completion percentage
- Individual stage status (Coursework, Proposal, Thesis, Viva)

### Notification System

Toast notifications for:

- Task completion
- Deadline reminders
- Success/error messages

## Available Scripts

- `npm start` - Development server (port 3000)
- `npm run build` - Production build
- `npm test` - Run tests

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Credits

Universiti Putra Malaysia  
School of Graduate Studies (SGS)

2026 UPM. All rights reserved.
