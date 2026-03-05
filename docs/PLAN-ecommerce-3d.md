# Project Plan: E-Commerce Flow & 3D Experience (PLAN-ecommerce-3d)

## Context Check
- **Objective:** Overhaul the checkout flow (auth gate + delivery address), handle product sizes, sync dummy data to Supabase, and integrate high-end 3D scroll experiences.
- **Current State:** The cart allows immediate addition, no strict auth gate until perhaps the very end, and products have hardcoded strings for sizes (reflecting 1-of-1).
- **Status:** Planning & Brainstorming phase.

## Task Breakdown

### Phase 1: Database Synchronization
- [ ] Create a one-off admin script/endpoint to read all products from `lib/store.ts` and `INSERT` them into the Supabase `products` table.
- [ ] Ensure image URLs and metadata transfer correctly.

### Phase 2: Checkout Auth Flow
- [ ] Update the `Cart` component / checkout button to intercept clicks if the user is not authenticated.
- [ ] Create a seamless redirect to `/login?redirect=/checkout` so users return exactly where they left off.
- [ ] Build a multi-step checkout modal/page that collects **Delivery Address** before finalizing the order in Supabase.

### Phase 3: Add "Choose Size"
- [ ] *Requires Clarification:* Update the database schema to handle multiple sizes per product (e.g., JSON array of available sizes `['S', 'M', 'L']`) OR add a free-form text input if items are custom-made.
- [ ] Update the Product Detail Page and Shop grids to allow size selection before "Add to Cart".
- [ ] Ensure the selected size propagates to the `CartItem` and the final `orders` database record.

### Phase 4: 3D Web Experience (Landonorris.com Inspired)
- [ ] Awaiting Socratic Gate / Brainstorm selection below.

## Agent Assignments
- **`project-planner`**: Defining the scope and orchestrating the build.
- **`3d-web-experience`**: Building the React Three Fiber scenes.
- **`backend-specialist`**: Handling Supabase data sync and Order schemas.
- **`frontend-specialist`**: Building the checkout UI and size selectors.
