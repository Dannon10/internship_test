# TaxStreem — Transaction Dashboard

A client-side transaction dashboard built with Next.js 13+ (App Router), TypeScript, and Tailwind CSS.

---

## How to Run

```bash
node -v        # must be v18+
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To test the **error state**, open `src/hooks/useTransactions.ts`, comment out the real export at the bottom, and uncomment the simulated error block above it. A commented guide is already in that file.

---

## Approach

### State Management

Async fetch state uses a discriminated union driven by `useReducer` inside `useTransactions`:

```ts
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };
```

This was a deliberate choice over the common `isLoading + error + data` trio. A boolean trio allows impossible states — you can have `isLoading: true` and `error: "..."` simultaneously. The discriminated union makes these states mutually exclusive at the type level, so the compiler enforces correctness and every render branch is exhaustive.

### Data Flow

```
useTransactions (fetch + reducer)
       ↓
   Home (page.tsx)
   ├── filters, pagination, sort → applyFilters()
   ├── TransactionList → TransactionCard (list view)
   └── TransactionDetail (detail view)
```

All derived state (filtered results, total pages) is computed synchronously in `applyFilters` on each render — no secondary `useEffect` chains to sync derived state back into `useState`. Filters and pagination live in `Home` as plain `useState` values and are passed down as props.

### URL-Based State

All interactive state (search query, account filter, page, sort direction, selected record ID) is mirrored to URL search params via `router.replace` in a single `useEffect` that watches all five values. This means the view is fully bookmarkable and survives a refresh.

### Search Debouncing

`useDebounce` wraps the raw search input value with a 300ms delay. The debounced value (not the live value) is what `applyFilters` and the URL sync receive — so filtering and URL writes only fire when the user pauses typing, not on every keystroke.

---

## Assumptions

- The spec didn't say anything about refreshing data, and since `jsonplaceholder` is static anyway, I just fetch once on mount and leave it at that. No polling, no cache logic — didn't feel necessary here.
- "Short description preview" wasn't defined so I made it one line with `line-clamp-1`. Felt like the cleanest way to keep the list scannable without truncating too aggressively.
- I didn't hardcode any account IDs for the filter dropdown. I derived them straight from the data using `getUniqueAccountIds` — that way if the data ever changes, the dropdown just works without any manual updates.
- Whenever the search query or account filter changes, I reset back to page 1. Staying on page 5 after narrowing results down to 8 records would just be confusing, so resetting felt like the obvious call.
- I run sort after search and filter, then paginate last. That's the order that makes sense to me — you filter down to what's relevant, sort that, then slice into pages.

---

## Trade-offs & What Was Skipped

| Area | Decision | Reason |
|---|---|---|
| No `React.memo` on `TransactionCard` | Skipped | With 10 rows per page the re-render cost is negligible; premature optimisation here adds noise |
| No virtualization | Skipped | 100 records total, paginated to 10 — no need |
| No toast/snackbar for retry feedback | Skipped | The `ErrorState` component already shows the error inline with a retry button — a toast would be redundant |
| `SortState` interface defined but sort managed as raw `SortDirection` | Left in types | Minor — would clean up on a second pass |
| No `<form>` wrapper on search | Intentional | No submission event needed; `onChange` + debounce is sufficient, and a bare `<form>` would require `e.preventDefault()` for no gain |

---

## What I'd Improve With More Time

**Error boundary**
There's no React error boundary catching unexpected render errors. The `ErrorState` component only handles the fetch failure path — a boundary would catch anything else.

**Persistent dark mode preference**
The dark mode toggle resets on refresh. Persisting to `localStorage` (or reading `prefers-color-scheme` on first load) would make the preference stick.

**Loading state for page transitions**
When paginating there's no visual feedback between page changes, since data is already local. If this ever moved to a server-paginated API, a per-page loading indicator would be needed.

---

## Project Structure

```
frontend_task/
├── src/
│   ├── components/
│   │   ├── TransactionList.tsx     — list shell, column headers, pagination
│   │   ├── TransactionCard.tsx     — single row, staggered entry animation
│   │   ├── TransactionDetail.tsx   — full record view
│   │   ├── SearchBar.tsx           — debounced search input
│   │   ├── Pagination.tsx          — page controls with ellipsis
│   │   └── states/
│   │       ├── LoadingSkeleton.tsx
│   │       ├── ErrorState.tsx
│   │       └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useTransactions.ts      — fetch + useReducer, exposes retry
│   │   └── useDebounce.ts          — generic debounce hook
│   ├── types/
│   │   └── index.ts                — RawPost, TransactionRecord, AsyncState, etc.
│   └── utils/
│       └── filter.ts               — mapPost, applyFilters, getUniqueAccountIds
├── app/
│   ├── page.tsx                    — entry point, renders Home
│   ├── Home.tsx                    — all state, URL sync, layout
│   ├── layout.tsx                  — root layout, metadata
│   └── globals.css                 — global styles, row-enter animation
└── README.md
```

---

## Bonus Features Completed

- Pagination (10 records per page) with ellipsis
- Sort by ID ascending / descending
- URL-based state — search, filter, page, sort, and selected record all reflected in params
- Accessible markup — ARIA labels, keyboard navigation (`Enter`/`Space` on cards), `aria-current` on active page
- Dark mode toggle