# PulseBoard Startup Lab

A beginner-friendly product feedback app built with **React**, **NestJS**, and **PostgreSQL**. It is intentionally small, but structured like a real startup codebase: a frontend, an API, a database, validation, tests, environment variables, and a product backlog.

## The mental model

When someone opens the app, React renders the page in their browser. React calls the NestJS API over HTTP. NestJS validates the request and uses TypeORM to read or write PostgreSQL.

```text
Browser (React, :5173) → HTTP → API (NestJS, :3000) → SQL → PostgreSQL (:5432)
```

## Before you start

Install:

- Node.js 20 or newer (`node --version`)
- Docker Desktop (`docker --version`)
- A code editor such as VS Code

You do **not** need to install PostgreSQL directly; Docker runs it for you.

## Run it locally

Open a terminal in this folder, then run:

```bash
npm install
npm run db:up
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Keep the terminal running. Stop the app with `Ctrl+C`. Stop the database later with `npm run db:down`.

If port 5432 is already used, stop your local PostgreSQL service or change the port on the left side of `5432:5432` in `docker-compose.yml` and update `DATABASE_URL`.

## Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the frontend and API in watch mode |
| `npm run db:up` | Starts PostgreSQL |
| `npm run db:down` | Stops PostgreSQL |
| `npm run db:logs` | Shows database logs |
| `npm run build` | Checks that both apps can compile for production |
| `npm test` | Runs API unit tests |
| `npm run lint` | Finds common code mistakes |

## Tour of the codebase

```text
startup-lab/
├── apps/
│   ├── web/                 # React UI
│   │   └── src/App.tsx      # Current screen and browser-side behavior
│   └── api/                 # NestJS API
│       └── src/feedback/    # Entity, validation, controller, and service
├── docker-compose.yml       # Local PostgreSQL
├── .env.example             # Safe configuration template
└── TASKS.md                 # Your simulated startup backlog
```

### React words you will hear

- **Component:** a function that returns UI (JSX), such as `App`.
- **State:** data a component remembers; `useState` updates it and redraws the UI.
- **Effect:** code that synchronizes with the outside world; `useEffect` loads API data.
- **Props:** values a parent component gives a child component.

### NestJS words you will hear

- **Module:** groups a feature's parts.
- **Controller:** receives HTTP requests and returns responses.
- **Service:** contains business logic.
- **DTO:** describes and validates incoming data.
- **Entity:** maps a TypeScript class to a database table.
- **Dependency injection:** NestJS creates and supplies objects a class needs.

## First debugging checklist

1. Read the first red error in the terminal, not the last line.
2. Confirm Docker Desktop is running and `docker compose ps` says the database is healthy.
3. Open [http://localhost:3000/api/feedback](http://localhost:3000/api/feedback). JSON means the API works.
4. Open the browser developer tools (Console and Network tabs).
5. After changing `.env`, restart `npm run dev`.

## Working like a startup engineer

Take one ticket from `TASKS.md` at a time. Create a branch such as `feature/01-feedback-card`, make small commits, and write in the pull request: what changed, screenshots for UI work, how you tested it, and known limitations. Ask questions when acceptance criteria are ambiguous—clarifying product requirements is part of the job.

> Learning shortcut: type the code yourself, then explain aloud how data travels from the browser to the database and back. If you cannot explain a line yet, add a comment or look it up before moving on.

## A production note

TypeORM's `synchronize: true` is convenient for local learning but unsafe for production because it changes the schema automatically. A later ticket replaces it with migrations.
