# DevBoard

A micro-frontend based task management system with a shared component layer and a Node.js backend.

---

## 1. Architecture

High-level overview:

                ┌──────────────────────────┐
                │        shell-app         │
                │  (Host / Container App) │
                └──────────┬──────────────┘
                           │
        ┌──────────────────┼
        │                  │                  
        ▼                  ▼                  
┌──────────────┐  ┌──────────────┐  ┌────────────────┐
│ mfe-tasks    │  │ mfe-dashboard│  │ common_remote  │
│ (Remote MFE) │  │ (Remote MFE) │  │ (Shared MFE)   │
└──────┬───────┘  └──────┬───────┘  └──────┬─────────┘
       │                  │                │
       └──────────┬───────┴───────-────────┘
                  ▼               
           ┌──────────────────────────┐
           │       backend-api        │
           │  (Express + MongoDB)     │
           └──────────────────────────┘

Component responsibilities:

- shell-app: Routing, layout, navigation, lazy-loading MFEs
- mfe-tasks: Task CRUD, filtering, UI interactions
- mfe-dashboard: Aggregated stats, visual summaries
- common_remote: Shared UI components, constants, utilities
- backend-api: REST APIs, MongoDB persistence, stats aggregation

Communication model:
- MFEs do not communicate directly
- All data flows through backend API
- common_remote is consumed via Module Federation

---

## 2. Local Setup Instructions

Prerequisites:
- Node.js (>= 18)
- npm
- MongoDB Atlas

Clone repo:
git clone https://github.com/dhruva57/devboard-mfe
cd devboard-mfe

## all envs for local run are present in .env.example

Backend:
cd backend-api
npm install

.env:
PORT=4000
MONGODB_URI=mongodb+srv://bale:testbale@cluster0.jfbllbf.mongodb.net/?appName=Cluster0
NODE_ENV=development
SHELL_APP_URL=http://localhost:5173
MFE_TASKS_URL=http://localhost:5001
MFE_DASHBOARD_URL=http://localhost:5003

Run:
npm run dev

common_remote:
cd ../common_remote
npm install
npm run build
npm run preview

mfe-tasks:
cd ../mfe-tasks
npm install

.env:
VITE_API_BASE_URL=http://localhost:4000/api
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:
npm run build
npm run preview

mfe-dashboard:
cd ../mfe-dashboard
npm install

.env:
VITE_API_BASE_URL=http://localhost:4000/api
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:
npm run build
npm run preview

shell-app:
cd ../shell-app
npm install

.env:
VITE_TASKS_REMOTE=http://localhost:5001/assets/remoteEntry.js
VITE_DASHBOARD_REMOTE=http://localhost:5003/assets/remoteEntry.js
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:
npm run dev

Ports:
backend-api: 4000
mfe-tasks: 5001
mfe-dashboard: 5003
common_remote: 5002
shell-app: 5173

---

## 3. Environment Variables

backend-api:
PORT=
MONGODB_URI=
CLIENT_URL=
NODE_ENV=

mfe-tasks:
VITE_API_BASE_URL=
VITE_COMMON_REMOTE=

mfe-dashboard:
VITE_API_BASE_URL=
VITE_COMMON_REMOTE=

shell-app:
VITE_TASKS_REMOTE=
VITE_DASHBOARD_REMOTE=
VITE_COMMON_REMOTE=

---

## 4. Live Deployment Links

Frontends:
Shell: https://shell-app-mu.vercel.app
Tasks: https://devboard-mfe.vercel.app
Dashboard: https://mfe-dashboard-one.vercel.app
Common: https://mfe-common-five.vercel.app

Backend:
https://devboard-mfe.onrender.com

Remote entries:
Tasks: https://devboard-mfe.vercel.app/assets/remoteEntry.js
Dashboard: https://mfe-dashboard-one.vercel.app/assets/remoteEntry.js
Common: https://mfe-common-five.vercel.app/assets/remoteEntry.js

---

## 5. Design Decisions

- MFEs separated for independent deployability
- common_remote avoids duplication
- Backend is source of truth
- Hard delete used for simplicity
- Manual refresh for dashboard
- No global state
- REST APIs for simplicity
- Tailwind for UI speed

---

## 6. Improvements

- Shared types package
- React Query
- Optimistic UI
- Better charts
- Edit task
- Testing
- CI/CD
- Monitoring
- Auth

---

## 7. Notes

- MFEs are independently deployable
- Backend is central data layer
- common_remote ensures consistency
