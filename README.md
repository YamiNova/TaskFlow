# TaskFlow

A minimal task collaboration system with a Spring Boot backend and Vue 3 frontend.

## Prerequisites

- Java 17+
- Node.js 20+

## Backend

```sh
cd backend
mvn spring-boot:run
```

Backend runs at `http://localhost:8080`.

## Frontend

```sh
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies `/api` requests to the backend.

## API

- `GET /api/projects` — list projects
- `POST /api/projects` — create project
- `GET /api/tasks/project/{projectId}` — list tasks by project
- `POST /api/tasks` — create task
- `PATCH /api/tasks/{taskId}/status` — update task status
- `DELETE /api/tasks/{taskId}` — delete task
