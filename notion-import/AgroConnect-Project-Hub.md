# AgroConnect Project Hub

## Product Snapshot

AgroConnect is a React + Vite marketplace app that connects Nigerian farmers directly with buyers. The current version is frontend-first and uses dummy JavaScript data for products, farmers, farmer listings, dashboard listings, and orders.

## Current Focus

Build a steady project workflow for tracking shipped features, upcoming tasks, bugs, milestones, and build-in-public content for X.

## Feature Areas

- Landing page and navigation
- Product marketplace cards
- Farmer directory
- Farmer produce view
- Order form prototype
- Login and registration UI
- Dashboard shell
- Dashboard overview
- Farmer listings management
- Dashboard orders
- Dashboard settings
- Dummy data relationships
- Future backend/authentication

## Current Feature Status

| Area | Status | Notes |
| --- | --- | --- |
| Landing page | In progress | Hero, product showcase, mission, video, and footer exist. |
| Navigation | In progress | Desktop and mobile navigation exist. Some links need route cleanup. |
| Product catalog | In progress | Product cards and dummy data exist. Dedicated products route is still missing. |
| Farmer directory | In progress | Farmer cards exist. Dummy farmer data needs more variety. |
| Farmer produce | Early version | Uses route state. Should become URL-driven. |
| Order flow | Prototype | Form, validation, estimate, and success state exist. |
| Auth screens | UI prototype | Login/register UI exists. No real auth behavior yet. |
| Dashboard overview | Early version | Stats cards exist. Some values are placeholders. |
| Listings management | Prototype | Add/delete works in local state only. |
| Dashboard orders | Placeholder | Needs table/list, statuses, and actions. |
| Settings | Placeholder | Needs profile/account/farm settings. |

## Suggested Next Feature

Complete the dashboard Orders page. The dummy order data already exists in `src/data/dashboardData.js`, but `/dashboard/orders` currently only renders a heading.

Recommended first version:

- Show farmer orders when the current role is farmer.
- Show buyer orders when the current role is buyer.
- Display product, buyer/farmer name, quantity, unit, total, and status.
- Add status badges for Pending, Confirmed, Delivered, and Cancelled.
- Add simple farmer actions like Confirm, Mark Delivered, and Cancel.

## Build-in-Public Themes

- Building the first version of a farmer-to-buyer marketplace.
- Creating reusable product and farmer cards.
- Designing a dashboard for farmers to manage listings and orders.
- Using dummy data first to shape the product before backend work.
- Turning each feature into a small documented milestone.

## Weekly Review Template

### What shipped this week

- 

### What changed in the product

- 

### What I learned

- 

### What is next

- 

### X post idea

- 
