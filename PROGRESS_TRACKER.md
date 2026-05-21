# AgroConnect Progress Tracker

Last reviewed: May 21, 2026

## Product Summary

AgroConnect is a React + Vite marketplace app that connects Nigerian farmers directly with buyers. The current version is frontend-first and uses dummy JavaScript data for products, farmers, farmer listings, dashboard listings, and orders.

## Current App Foundation

- React app built with Vite.
- Routing handled with `react-router-dom`.
- Styling handled mainly with Tailwind utility classes.
- Main routes:
  - `/` - Home page
  - `/farmers` - Farmer directory
  - `/produce/:id` - Farmer produce view
  - `/order/:id` - Order form
  - `/register` - Registration screen
  - `/login` - Login screen
  - `/dashboard` - Dashboard overview
  - `/dashboard/listings` - Farmer listings management
  - `/dashboard/orders` - Orders area
  - `/dashboard/settings` - Settings area

## Features Already Present

### Navigation and Layout

- Fixed top navigation bar on desktop.
- Mobile hamburger side menu.
- Desktop and mobile search input fields.
- Active route styling for navigation links.
- Responsive layout patterns for mobile and desktop.
- Branding with AgroConnect logo and farm-focused colors.

### Home Page

- Full-screen hero section with rotating background slides.
- Slide-specific headline, subtext, and call-to-action labels.
- Dot controls for manually changing hero slides.
- Product showcase section using horizontal scroll.
- Product cards displaying image, category, price, farmer, location, quantity, and order button.
- Mission section explaining AgroConnect's purpose.
- Embedded farm video from Cloudinary.
- Footer with brand summary, quick links, and social links.

### Product Marketplace

- Dummy product catalog with 17 produce items.
- Product categories currently include grains, fruits, vegetables, and tubers.
- Product card UI includes:
  - Product image
  - Product name
  - Category badge
  - Price and unit
  - Farmer name
  - Location
  - Quantity available
  - Order button

### Farmer Directory

- Farmer listing page at `/farmers`.
- Farmer cards displaying:
  - Farmer profile icon
  - Farmer name
  - Location
  - Farm name
  - View Farmer Produce button
- Verified farmer message shown at the top of the page.
- Farmer produce navigation is started through `navigate("/produce/:id")`.

### Farmer Produce View

- `/produce/:id` page receives produce data through router state.
- Produce card layout reuses the product information structure.
- Attempts to match produce items to farmer profile data using `farmerId`.
- Includes a back link and order button UI.

### Order Flow

- `/order/:id` page finds the selected product from dummy product data.
- Displays selected product summary.
- Includes quantity, phone number, delivery address, and optional note fields.
- Calculates total estimate based on selected quantity and product price.
- Validates that phone number and delivery address are present before submission.
- Shows a simple order success state after confirmation.
- Includes fallback UI when a product ID is not found.

### Authentication Screens

- Registration page UI exists.
- Login page UI exists.
- Buyer/farmer role toggle exists on both auth screens.
- Password visibility toggle exists on both auth screens.
- Register form includes:
  - Full name
  - Email
  - Phone number
  - Age
  - Gender
  - Farmer location when farmer role is selected
  - Password
  - Terms checkbox
  - Google sign-in button UI
- Login form includes:
  - Email
  - Password
  - Google sign-in button UI
- Auth screens currently appear to be UI-only and do not submit to a backend.

### Dashboard Foundation

- Dashboard shell exists with nested routes.
- Desktop sidebar dashboard navigation.
- Mobile horizontal dashboard submenu.
- Dashboard links:
  - Overview
  - Listings
  - Orders
  - Settings
- Role flag exists in dummy data through `currentRole` and `isFarmer`.
- Dashboard can branch between farmer and buyer stats based on role.

### Dashboard Overview

- Farmer dashboard overview screen exists.
- Welcome banner with farm image.
- Stats cards display:
  - Total listings
  - Total orders
  - Pending orders
  - Total earnings placeholder
- Buyer stat card structure is also present in code, though current role is set to farmer.

### Listings Management

- Farmer listings page exists.
- Farmers can open an Add Product form.
- Add Product form captures:
  - Name
  - Category
  - Unit
  - Price
  - Quantity
- New listings are added to local component state.
- Listings can be deleted from local component state.
- Listing cards show product name, category, price, unit, and available quantity.

### Dummy Data

- `src/data/products.js` provides public product marketplace data.
- `src/data/farmers.js` provides farmer profile data.
- `src/data/listings.js` provides farmer produce/listing data.
- `src/data/dashboardData.js` provides dashboard role, listings, farmer orders, and buyer orders.

## Current Feature Status

| Area | Status | Notes |
| --- | --- | --- |
| Landing page | In progress / strong UI foundation | Hero, product showcase, mission, video, footer exist. Some CTA links point to routes that do not currently exist. |
| Navigation | In progress | Desktop and mobile navigation exist. Login desktop link currently points to dashboard instead of login. |
| Product catalog | In progress | Product data and cards exist. Dedicated `/products` route does not currently exist. |
| Farmer directory | In progress | Farmer cards exist, but current dummy farmers are mostly repeated. |
| Farmer produce | Early version | Data is passed through route state. Direct page refresh may show no produce because data is not loaded by URL ID. |
| Order flow | Prototype | Form, validation, estimate, and success state exist. Orders are not saved globally or sent to a backend. |
| Auth | UI prototype | Login and register screens exist, but no real authentication yet. |
| Dashboard overview | Early version | Layout and stat cards exist. Some values are placeholders. |
| Listings management | Prototype | Add/delete works only in local state. No persistence yet. |
| Orders dashboard | Placeholder | Route and page title exist only. |
| Settings dashboard | Placeholder | Route and page title exist only. |

## Likely Next Required Features

### 1. Complete Dashboard Orders

The most natural next feature is the Orders page because order dummy data already exists in `dashboardData.js`, but the `/dashboard/orders` route currently only renders a heading.

Suggested scope:

- Show farmer orders when current role is farmer.
- Show buyer orders when current role is buyer.
- Display product, customer/farmer name, quantity, unit, total, and status.
- Add visual status badges for Pending, Confirmed, Delivered, and Cancelled.
- Add simple actions for farmer orders, such as Confirm, Mark Delivered, or Cancel.
- Optionally calculate dashboard totals from this same orders data.

### 2. Improve Dashboard Overview Calculations

- Replace placeholder total earnings with the sum of delivered farmer orders.
- Replace placeholder buyer total spent with the sum of buyer orders.
- Keep stats consistent with the role shown.

### 3. Connect Order Flow to Dashboard State

- After a buyer places an order, add it to an orders list.
- Make the new order appear in `/dashboard/orders`.
- Later, persist this with backend storage.

### 4. Add a Real Products Route or Adjust Links

Several CTAs point to `/products`, but there is no `/products` route at the moment.

Possible decisions:

- Create a dedicated Products page.
- Redirect `/products` to the product section or to `/farmers`.
- Rename CTAs so they point to the current `/farmers` flow.

### 5. Make Farmer Produce URL-Driven

The produce page currently depends on router state passed from the Farmers page. A more reliable version should read the farmer ID from the URL and filter `farmerListings` directly, so `/produce/:id` works even after refresh or direct navigation.

### 6. Improve Dummy Data Relationships

- Give every farmer a unique `farmerId`.
- Connect product listings to farmer IDs consistently.
- Remove duplicate listing IDs.
- Replace repeated farmer names with more realistic farmers across Nigerian locations.

### 7. Complete Settings Page

Suggested settings features:

- Profile details.
- Farm details for farmers.
- Contact details.
- Delivery/location preferences for buyers.
- Password/security section.

### 8. Add Form Submission Behavior for Auth

Current login/register forms are UI-only.

Possible next step:

- Capture form state.
- Add validation.
- Simulate account creation/login with local dummy users.
- Later connect to real authentication.

## Known Implementation Notes

- `navigate` is used in `App.jsx` button handlers but is not defined inside `App`.
- Desktop Login nav link currently routes to `/dashboard`.
- Some hero/footer CTAs point to `/products` or `/signup`, but current routes are `/farmers` and `/register`.
- `Produce.jsx` uses `navigate` in the Order Now button but does not import or initialize it.
- `Produce.jsx` back link says "Back to Farmers" but points to `/`.
- The product search term is passed to `Farmers`, but the farmers page currently does not filter by search term.
- `Products` is imported from `./Components/Farmers` in `App.jsx`, but the variable is unused.
- Several comments and characters appear with encoding artifacts in the rendered source, especially emoji and currency text.
- `Register.jsx` contains a `class` attribute instead of React's `className` on one div.
- Dashboard `Orders.jsx` and `Settings.jsx` are placeholders.
- Listing additions and deletions are local only and reset on page reload.

## Suggested X Documentation Angles

- "Built the first AgroConnect landing page with a rotating hero and farm marketplace feel."
- "Added product cards for grains, fruits, vegetables, and tubers using dummy data."
- "Created a farmer directory so buyers can browse verified farmers."
- "Added the first order flow: quantity, delivery address, phone number, note, and total estimate."
- "Started the farmer dashboard with overview stats and listing management."
- "Next up: building the dashboard orders table so farmers can track incoming orders."

## Next Review Checklist

- Confirm which feature should come next.
- Decide whether the app should focus next on dashboard orders, product route cleanup, or auth behavior.
- Update this file after each completed feature.
- Turn each completed section into a short X build-in-public post.
