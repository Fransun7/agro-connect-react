# AgroConnect Workflow Board

Use this as a simple Kanban-style project board. Move a task from **Backlog** to **In Progress** when you start working on it, then move it to **Done** when completed.

## Board View

| Backlog | In Progress | Done |
| --- | --- | --- |
| **Complete dashboard Orders page**<br>Build the first useful orders screen using `farmerOrders` and `buyerOrders` from `dashboardData.js`. Show product, customer/farmer name, quantity, total, and status. |  | **Created project audit**<br>Reviewed current components, routes, dummy data, existing features, gaps, and likely next steps. |
| **Add order status badges**<br>Add visual badges for Pending, Confirmed, Delivered, and Cancelled orders. |  | **Created progress tracker**<br>Added `PROGRESS_TRACKER.md` to document shipped features, current status, next features, and X post angles. |
| **Add farmer order actions**<br>Allow farmers to confirm, deliver, or cancel orders in local state first. |  | **Created Notion import package**<br>Prepared Markdown and CSV files for importing the project tracker into Notion manually. |
| **Fix desktop Login nav route**<br>The desktop Login link currently points to `/dashboard`; update it to `/login`. |  |  |
| **Create or redirect Products route**<br>Several buttons point to `/products`, but there is no `/products` route yet. Either create the route or update the links. |  |  |
| **Make farmer produce page URL-driven**<br>Update `/produce/:id` so it filters data using the URL ID instead of depending only on router state. |  |  |
| **Fix Produce page order navigation**<br>`Produce.jsx` uses `navigate` for Order Now, but `navigate` is not imported or initialized. |  |  |
| **Fix Produce back link**<br>The page says "Back to Farmers" but links to `/`; update it to `/farmers`. |  |  |
| **Calculate farmer total earnings**<br>Replace placeholder earnings with the sum of delivered farmer orders. |  |  |
| **Calculate buyer total spent**<br>Replace placeholder buyer spending with the total from buyer orders. |  |  |
| **Add search filtering**<br>The app stores `searchTerm` and passes it to `Farmers`, but filtering is not active yet. |  |  |
| **Improve farmer dummy data**<br>Give farmers unique names, locations, farm names, and `farmerId` values. |  |  |
| **Normalize farmer/listing relationships**<br>Make sure farmers, products, and listings connect consistently through IDs. |  |  |
| **Remove duplicate listing IDs**<br>`farmerListings` has duplicate IDs. Clean them up to prevent routing and rendering issues. |  |  |
| **Complete Settings page**<br>Add profile, farm details, contact info, delivery/location preferences, and account settings. |  |  |
| **Add auth form behavior**<br>Login and register screens are UI-only. Add form state, validation, and basic simulated submission. |  |  |
| **Persist listings locally**<br>Use `localStorage` so added/deleted listings survive page reloads before backend integration. |  |  |
| **Connect order form to dashboard orders**<br>When a buyer places an order, add it to the dashboard orders list. |  |  |
| **Clean encoding artifacts**<br>Fix corrupted emoji/currency characters in UI text and source files. |  |  |

## How To Use This Board

1. Pick one task from **Backlog**.
2. Move it into **In Progress** when you start working on it.
3. Keep only a small number of tasks in **In Progress** at once.
4. Move the task to **Done** after implementation and testing.
5. Add a short X post idea when a meaningful feature reaches **Done**.

## Recommended First Sprint

| Step | Task | Why It Matters |
| --- | --- | --- |
| 1 | Complete dashboard Orders page | This is the clearest next product feature because order dummy data already exists. |
| 2 | Add order status badges | Makes the orders page easier to scan and feel more real. |
| 3 | Calculate dashboard totals | Turns placeholder dashboard stats into useful information. |
| 4 | Fix broken routes | Prevents users from clicking buttons that go nowhere. |
| 5 | Make produce page URL-driven | Makes farmer produce pages reliable after refresh or direct link sharing. |
