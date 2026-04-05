# DevBoard

A micro-frontend based task management system with a shared component layer and a Node.js backend.

---

## 1. Architecture

![My project logo](hld.png)

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

Clone repo:<br>
git clone https://github.com/dhruva57/devboard-mfe<br>
cd devboard-mfe

## all envs for local run are present in .env.example

Backend:<br>
cd backend-api<br>
npm install

.env:<br>
PORT=4000<br>
MONGODB_URI=mongodb+srv://bale:testbale@cluster0.jfbllbf.mongodb.net/?appName=Cluster0<br>
NODE_ENV=development<br>
SHELL_APP_URL=http://localhost:5173<br>
MFE_TASKS_URL=http://localhost:5001<br>
MFE_DASHBOARD_URL=http://localhost:5003<br>

Run:<br>
npm run dev

common_remote:<br>
cd ../common_remote<br>
npm install<br>
npm run build<br>
npm run preview

mfe-tasks:<br>
cd ../mfe-tasks<br>
npm install

.env:<br>
VITE_API_BASE_URL=http://localhost:4000/api<br>
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:<br>
npm run build<br>
npm run preview

mfe-dashboard:<br>
cd ../mfe-dashboard<br>
npm install

.env:<br>
VITE_API_BASE_URL=http://localhost:4000/api<br>
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:<br>
npm run build<br>
npm run preview

shell-app:<br>
cd ../shell-app<br>
npm install

.env:<br>
VITE_TASKS_REMOTE=http://localhost:5001/assets/remoteEntry.js<br>
VITE_DASHBOARD_REMOTE=http://localhost:5003/assets/remoteEntry.js<br>
VITE_COMMON_REMOTE=http://localhost:5002/assets/remoteEntry.js

Run:<br>
npm run dev

Ports:<br>
backend-api: 4000<br>
mfe-tasks: 5001<br>
mfe-dashboard: 5003<br>
common_remote: 5002<br>
shell-app: 5173

---

## 3. Environment Variables

backend-api:<br>
PORT=<br>
MONGODB_URI=<br>
CLIENT_URL=<br>
NODE_ENV=

mfe-tasks:<br>
VITE_API_BASE_URL=<br>
VITE_COMMON_REMOTE=

mfe-dashboard:<br>
VITE_API_BASE_URL=<br>
VITE_COMMON_REMOTE=

shell-app:<br>
VITE_TASKS_REMOTE=<br>
VITE_DASHBOARD_REMOTE=<br>
VITE_COMMON_REMOTE=

---

## 4. Live Deployment Links

Frontends:<br>
Shell: https://shell-app-mu.vercel.app<br>
Tasks: https://devboard-mfe.vercel.app<br>
Dashboard: https://mfe-dashboard-one.vercel.app<br>
Common: https://mfe-common-five.vercel.app

Backend:<br>
https://devboard-mfe.onrender.com

Remote entries:<br>
Tasks: https://devboard-mfe.vercel.app/assets/remoteEntry.js<br>
Dashboard: https://mfe-dashboard-one.vercel.app/assets/remoteEntry.js<br>
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
