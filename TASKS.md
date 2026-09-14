# PulseBoard: 20-ticket startup backlog

Work in order at first. Estimates are intentionally rough; startups learn and adjust. **S** ≈ a few hours, **M** ≈ one day, **L** ≈ two or more days.

## Sprint 1 — Learn the product and React

### PB-001 — Extract a feedback card component (S)

**Story:** As an engineer, I want the list UI split into reusable pieces so future features are safer to add.

**Acceptance criteria:** Create `FeedbackCard.tsx`; pass one item and an `onAdvance` callback as props; keep behavior and styling unchanged; define a typed props interface.

### PB-002 — Add client-side form feedback (S)

**Story:** As a customer, I want clear feedback while submitting so I do not click twice.

**Acceptance criteria:** Disable the button during the request; show “Sending…”; show a useful error if the request fails; preserve typed values after failure; reset only after success.

### PB-003 — Filter requests by status (S)

**Story:** As a product manager, I want to focus on new, planned, or completed requests.

**Acceptance criteria:** Add All/New/Planned/Done controls; filtering happens without another API request; selected state is visible and keyboard accessible; show a filtered empty state.

### PB-004 — Add loading skeletons (S)

**Story:** As a user, I want the page to feel responsive while data loads.

**Acceptance criteria:** Replace “Loading…” with three CSS skeleton cards; respect `prefers-reduced-motion`; skeletons disappear on success or error.

### PB-005 — Add a request detail route (M)

**Story:** As a customer, I want a shareable page for one request.

**Acceptance criteria:** Add React Router; `/feedback/:id` renders a detail page; cards link to it; direct refresh works in Vite; unknown IDs show a not-found view.

## Sprint 2 — NestJS and database fundamentals

### PB-006 — Create a GET-by-ID endpoint (S)

**Story:** As the detail page, I need to fetch one request.

**Acceptance criteria:** Add `GET /api/feedback/:id`; return 200 with the item; return 404 with Nest's standard error body; add service unit tests.

### PB-007 — Replace status cycling with an explicit update (M)

**Story:** As a product manager, I want to set the exact status and avoid accidental transitions.

**Acceptance criteria:** Add `UpdateFeedbackStatusDto`; accept `PATCH /api/feedback/:id/status` with `{ "status": "planned" }`; reject invalid statuses with 400; update the UI; test success, invalid input, and missing ID.

### PB-008 — Add request categories (M)

**Story:** As a product manager, I want to group feedback into Bug, Feature, and Improvement.

**Acceptance criteria:** Add a database enum and required DTO field; update form and cards; API validation rejects unsupported categories; existing local data can be reset or migrated, with the choice documented.

### PB-009 — Introduce database migrations (M)

**Story:** As a team, we need repeatable, reviewable schema changes.

**Acceptance criteria:** Disable `synchronize`; configure TypeORM CLI; commit an initial migration; document generate/run/revert commands; a clean database starts successfully after migrations.

### PB-010 — Add pagination (M)

**Story:** As a user, I want the board to remain fast with thousands of requests.

**Acceptance criteria:** `GET /api/feedback?page=1&limit=20` validates and caps limit at 100; response includes `items`, `page`, `limit`, and `total`; UI includes previous/next controls; tests cover boundaries.

## Sprint 3 — Product features

### PB-011 — Add voting (M)

**Story:** As a customer, I want to upvote important requests.

**Acceptance criteria:** Store a non-negative vote count; add an atomic API increment; display and update votes optimistically; roll back on failure; rapid clicks do not lose votes.

### PB-012 — Search feedback (M)

**Story:** As a user, I want to find duplicate ideas before submitting.

**Acceptance criteria:** Search title and description case-insensitively; use a debounced search field; keep query in the URL; add an index or explain why one is premature; test special characters and no results.

### PB-013 — Edit and delete feedback (M)

**Story:** As an author, I want to correct or remove my request.

**Acceptance criteria:** Add validated update and delete endpoints; add edit UI; require a confirmation dialog before deletion; show success/error messages; tests prove deleted records return 404.

### PB-014 — Add user accounts (L)

**Story:** As a customer, I want my feedback associated with my account.

**Acceptance criteria:** Register/login/logout; password hashing (never plaintext); authenticated `/me`; feedback stores an owner; secrets live in environment variables; document threat-model limitations.

### PB-015 — Enforce authorization (M)

**Story:** As a customer, I want only me to edit or delete my feedback.

**Acceptance criteria:** Protect mutations with a NestJS guard; return 401 when signed out and 403 for another user's item; hide unavailable UI actions; add integration tests for both cases.

## Sprint 4 — Reliability and team practices

### PB-016 — API integration tests (M)

**Story:** As a team, we want confidence that HTTP endpoints and PostgreSQL work together.

**Acceptance criteria:** Add a separate test database; test create/list/update/delete through HTTP; isolate or clean test data; one command runs the suite; tests never touch development data.

### PB-017 — Frontend tests (M)

**Story:** As a team, we want confidence in critical customer flows.

**Acceptance criteria:** Add Vitest, React Testing Library, and Mock Service Worker; test loading, successful list, failed list, and form submission; query by accessible role/text instead of CSS classes.

### PB-018 — Accessibility pass (M)

**Story:** As a keyboard or screen-reader user, I want to use the complete product.

**Acceptance criteria:** Run axe or Lighthouse; fix labels, focus states, heading order, contrast, and status announcements; all flows work keyboard-only; document before/after findings.

### PB-019 — CI quality gate (M)

**Story:** As a team, we want every proposed change checked automatically.

**Acceptance criteria:** Add GitHub Actions for install, lint, test, and build; use a PostgreSQL service container; cache npm safely; fail on any broken step; add a status badge to README.

### PB-020 — Production readiness review (L)

**Story:** As a founder, I want to know what is required before inviting real customers.

**Acceptance criteria:** Add health/readiness endpoints; structured request logging and a global error policy; document backups, rate limiting, monitoring, secrets, migrations, rollback, privacy, and costs; containerize both apps; produce a short go/no-go checklist without pretending all risks are solved.

## Definition of done for every ticket

- Acceptance criteria are met and manually checked.
- `npm run lint`, `npm test`, and `npm run build` pass.
- New behavior has an appropriate test (once test tooling exists).
- No secrets, generated build output, or unrelated changes are committed.
- README or API notes are updated when setup or behavior changes.
- The pull request explains the user impact and includes UI screenshots when relevant.
