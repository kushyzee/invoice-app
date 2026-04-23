# Invoice App

A responsive invoice management application built as part of the HNG Internship (Cohort 14) Stage 2 task. Users can create, manage, and track invoices through a complete draft → pending → paid lifecycle.

---

## Features

- Create, view, edit, and delete invoices
- Save invoices as drafts or send them immediately
- Mark pending invoices as paid
- Filter invoices by status (All, Draft, Pending, Paid)
- Light and dark mode toggle with persistence
- Fully responsive at 320px, 768px, and 1024px+
- Data persists across page reloads via localStorage

---

## Tech Stack

| Tool                    | Purpose               |
| ----------------------- | --------------------- |
| Next.js 15 (App Router) | Framework + routing   |
| React 19                | UI                    |
| TypeScript              | Type safety           |
| Tailwind CSS v4         | Styling               |
| shadcn/ui               | Component primitives  |
| TanStack Form           | Form state management |
| Zod                     | Schema validation     |
| next-themes             | Dark mode             |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd invoice-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Architecture

### Folder Structure

```
src/
  app/                        # Next.js App Router pages
    page.tsx                  # Invoice list
    invoice/[id]/page.tsx     # Invoice detail

  features/
    invoices/                 # All invoice-related code
      components/
        InvoiceCard.tsx       # Single invoice row/card
        InvoiceList.tsx       # List + empty state
        InvoiceForm.tsx       # Create & edit form (shared)
        InvoiceFormModal.tsx  # Slide-in modal shell
        InvoiceItemFields.tsx # Dynamic item rows
        StatusBadge.tsx       # Coloured status pill
        FilterDropdown.tsx    # Status filter
        DeleteModal.tsx       # Delete confirmation dialog
      context/
        InvoiceContext.tsx    # Global invoice state + actions
      hooks/
        useInvoices.ts        # Re-exports context hook
      utils/
        invoiceHelpers.ts     # formatCurrency, formatDate, calculateTotal
      types.ts                # Invoice interfaces
      schemas.ts              # Zod validation schemas

    theme/
      ThemeProvider.tsx       # next-themes wrapper
      useTheme.ts             # Theme hook

  lib/
    storage.ts                # localStorage read/write helpers
```

### State Management

All invoice state lives in `InvoiceContext`, which is a React Context provider wrapping the entire app. It exposes six actions:

- `createInvoice` — creates a new invoice with status `"pending"`
- `saveDraft` — creates a new invoice with status `"draft"`, skipping validation
- `updateInvoice` — updates an existing invoice, recalculating `total` and `paymentDue`
- `deleteInvoice` — removes an invoice by ID
- `markAsPaid` — transitions a `"pending"` invoice to `"paid"`
- `sendInvoice` — transitions a `"draft"` invoice to `"pending"`

State is synced to localStorage on every change via a `useEffect`. Reads happen once on mount.

### Data Flow

```
User action → context action → state update → localStorage sync → UI re-renders
```

Derived fields (`total`, `paymentDue`, `id`) are always calculated inside context actions — never accepted from form input — so they can never be in an inconsistent state.

### Status Rules

```
draft   → pending   (Send)
pending → paid      (Mark as Paid)
paid    → (none)    Terminal — fully read-only
```

These rules are enforced in the context actions, not just the UI, so they hold regardless of how a mutation is triggered.

---

## Trade-offs

### Next.js instead of plain React

The task brief specifies React, and Next.js is React — it is the framework that the React documentation itself recommends for production applications. Using Next.js brought meaningful advantages for this project:

- **File-based routing** — no router configuration needed; `app/invoice/[id]/page.tsx` just works
- **`next-themes`** — handles dark mode, localStorage persistence, and flash-of-unstyled-content prevention with zero custom code
- **Future-proofing** — if the project ever needs server-side data fetching or API routes, the foundation is already there

The app is fully client-side with no server actions or API routes, so it behaves identically to a plain React SPA.

---

## Accessibility

- All form inputs have associated `<label>` elements
- Interactive elements use semantic `<button>` or `<a>` tags — no `div` click handlers
- The delete confirmation modal uses shadcn `Dialog`, which provides focus trapping, ESC to close, and correct ARIA attributes (`role="dialog"`, `aria-modal="true"`) out of the box
- The filter dropdown uses shadcn `DropdownMenu`, which is keyboard navigable and screen-reader friendly
- Status badges use both colour and a text label — colour is never the only indicator
- Colour contrast meets WCAG AA in both light and dark mode
