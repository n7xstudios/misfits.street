# PLAN-admin-dashboard.md

## Task: Admin Dashboard for Misfits Street (Phase 4)

**Context:**
- **Goal:** Build an Admin Dashboard to manage inventory (products), view orders, and see basic analytics.
- **Tech Stack:** Next.js 15 App Router, Supabase (Auth + PostgreSQL), Tailwind CSS, Recharts.
- **Current State:** Phase 1 (Migration), Phase 2 (SEO), and Phase 3 (Supabase Auth via `@supabase/ssr` & Client/Server helpers) are complete. The project has a dark, raw, brutalist "misfit" aesthetic.

## Orchestration Strategy

This task requires multiple expertise domains. We will coordinate the following agents:
1.  **`database-architect`**: Design and implement the Supabase SQL schema for `products`, `orders`, and related tables. Formulate RLS policies.
2.  **`security-auditor`**: Implement an Admin Auth Guard. The dashboard must strictly verify that the logged-in user has "admin" privileges (e.g., matching a specific email or a role flag in Supabase) before granting access. Protect API routes.
3.  **`backend-specialist`**: Create Server Actions or API routes for Product CRUD (Create, Read, Update, Delete) and Order Management (viewing, fulfilling). Handle image uploads to Supabase Storage if necessary.
4.  **`frontend-specialist`**: Build the Admin UI layout, navigation, and pages (Overview, Products, Orders). Integrate `recharts` for the analytics overview. Maintain the established design system (monochrome, brutalist typography).

## Implementation Phases (After User Approval)

### Group 1: Foundation (Parallel)
-   **`database-architect`**: Define schema (SQL scripts/migrations).
    -   Table: `products` (id, slug, title, price, image_url, category, size, condition, is_sold, created_at).
    -   Table: `orders` (id, user_id, status, total_amount, created_at).
    -   Table: `order_items` (id, order_id, product_id, price_at_purchase).
-   **`security-auditor`**: Implement `requireAdmin` helper in `lib/supabase/server.ts` or a layout wrapper. Verify RLS policies on tables to block public mutation.

### Group 2: Core (Parallel)
-   **`backend-specialist`**: Implement Next.js Server Actions in `app/admin/actions.ts` for mutating the database.
-   **`frontend-specialist`**: Build `app/admin/layout.tsx` and the core dashboard structure.

### Group 3: Polish (Parallel)
-   **`frontend-specialist`**: Build the specific pages: `app/admin/page.tsx` (Charts), `app/admin/products/page.tsx` (Grid & Forms), `app/admin/orders/page.tsx` (List).
-   **`test-engineer` / `security-auditor`**: Run verification scripts (`security_scan.py`, `lint_runner.py`) and ensure unauthorized access to `/admin` redirects to login.

## Verification Checklist
-   [ ] Admin route (`/admin/*`) is inaccessible to non-admins.
-   [ ] Database schema is deployed to Supabase.
-   [ ] Can add, edit, and delete products from the dashboard.
-   [ ] Can view list of orders.
-   [ ] Analytics chart renders mock or real data without errors.
-   [ ] Core verification scripts pass.
