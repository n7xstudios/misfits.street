# Project Plan: Admin Dashboard Enhancements (PLAN-admin-dashboard)

## Context Check
- **Objective:** Upgrade the internal Admin Dashboard (`/admin`) for Misfits Street.
- **Current State:** A basic layout exists with Overview (Recharts), Inventory \[CRUD\], and Acquisitions (Orders). Visuals are in the brutalist dark-mode theme.
- **Status:** Awaiting user selection from Brainstorming Phase to determine the exact feature set to implement.

## Task Breakdown (Pending Brainstorm Selection)

### Option A: The "Control Room" (Real-time Intel) 
*(If Selected)*
- [ ] Connect Supabase Realtime to track live activity.
- [ ] Build a live event log (who added to cart, who viewed, checkout status).
- [ ] Upgrade the Overview charts to auto-update without refresh.

### Option B: The "Warehouse" (Inventory Power Tools)
*(If Selected)*
- [ ] Implement bulk-edit functionality for modifying multiple products (price, status) at once.
- [ ] Build a drag-and-drop interface for ordering how products appear on the public `/shop` page.
- [ ] Advanced image uploading (drag-to-upload multi-image carousels).

### Option C: The "Dispatch Center" (Fulfillment Board)
*(If Selected)*
- [ ] Migrate the basic "Acquisitions" table to a Kanban-style board (Pending, Packing, Shipped, Delivered).
- [ ] Implement one-click status updates that auto-trigger email notifications (simulated or via Resend).
- [ ] Generate print-ready PDF invoices/packing slips for each order directly from the dashboard.

## Socratic Gate (Phase 0)
- Questions asked to user to narrow down the scope of the "Admin Enhancement".
- Awaiting confirmation on the primary objective (Data, Inventory Mgmt, or Order Fulfillment) before proceeding to code.

## Agent Assignments
- **`project-planner`**: Defining the scope and managing the brainstorm.
- **`ui-ux-pro-max`**: Designing the specialized admin interfaces.
- **`backend-specialist`**: Handling Supabase Realtime or Kanban state logic.
- **`frontend-specialist`**: Building the React/Tailwind UI.
