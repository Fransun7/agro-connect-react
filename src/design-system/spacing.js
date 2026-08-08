/**
 * CROPBIT DESIGN SYSTEM — SPACING, LAYOUT & EFFECTS
 * ─────────────────────────────────────────────────────────────────────────────
 * This file covers every spatial and visual-depth decision on the platform:
 *   1. Base Unit & Scale  — the 4px grid everything is built on
 *   2. Semantic Spacing   — named slots for padding, gaps, and margins
 *   3. Border Radius      — corner rounding scale
 *   4. Shadows            — elevation and depth effects
 *   5. Breakpoints        — responsive layout thresholds
 *   6. Z-Index            — stacking order for layered UI
 *   7. Transitions        — motion timing and easing
 *   8. Layout Constraints — max-widths, sidebar widths, navbar height
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. BASE UNIT & SPACING SCALE
// Every spacing value is a multiple of 4px (the base unit).
// This keeps the grid consistent and prevents arbitrary "magic numbers".
// Reference Tailwind's default scale — spacing-1 = 4px, spacing-2 = 8px, etc.
// ─────────────────────────────────────────────────────────────────────────────

/** The atomic unit of the spacing system. All values are multiples of this. */
export const baseUnit = 4; // px

export const scale = {
  /** 0px  — No spacing. Used to reset default margins/padding. Tailwind: p-0 m-0 */
  0:  "0px",

  /** 2px  — Hairline gap. Icon-to-text micro spacing, badge inner padding vertical.
   *  Tailwind: p-0.5 m-0.5 gap-0.5 */
  0.5: "2px",

  /** 4px  — Micro. Inline icon padding, tight badge gaps, dot indicator offset.
   *  Tailwind: p-1 m-1 gap-1 */
  1:  "4px",

  /** 6px  — Extra small. Badge padding (py), small icon buttons.
   *  Tailwind: p-1.5 gap-1.5 */
  1.5: "6px",

  /** 8px  — Small. Tight component internal padding, compact list row gaps.
   *  Tailwind: p-2 m-2 gap-2 */
  2:  "8px",

  /** 10px — Small+. Card action button padding, icon row gaps.
   *  Tailwind: gap-2.5 p-2.5 */
  2.5: "10px",

  /** 12px — Base small. Nav link horizontal padding, badge px, input icon spacing.
   *  Tailwind: p-3 gap-3 */
  3:  "12px",

  /** 14px — Base small+. Sidebar nav item padding, compact form gap.
   *  Tailwind: gap-3.5 p-3.5 */
  3.5: "14px",

  /** 16px — Base. Standard internal padding for cards, form fields, buttons.
   *  The most-used spacing value in the UI.
   *  Tailwind: p-4 m-4 gap-4 */
  4:  "16px",

  /** 20px — Medium small. Section sub-gaps, card grid column gaps (tight).
   *  Tailwind: p-5 gap-5 */
  5:  "20px",

  /** 24px — Medium. Dashboard page padding (mobile), card padding, modal padding.
   *  Tailwind: p-6 gap-6 */
  6:  "24px",

  /** 28px — Medium+. Hero inner content padding, form section spacing.
   *  Tailwind: p-7 gap-7 */
  7:  "28px",

  /** 32px — Large. Desktop page section padding, order card padding.
   *  Tailwind: p-8 gap-8 */
  8:  "32px",

  /** 36px — Large+. Generous modal padding, auth panel content spacing.
   *  Tailwind: p-9 gap-9 */
  9:  "36px",

  /** 40px — XL. Hero content vertical breathing room, large section gaps.
   *  Tailwind: p-10 gap-10 */
  10: "40px",

  /** 48px — 2XL. Page section vertical padding (desktop), hero top/bottom inset.
   *  Tailwind: p-12 gap-12 */
  12: "48px",

  /** 56px — 3XL. Large hero insets, generous section separators.
   *  Tailwind: p-14 */
  14: "56px",

  /** 64px — 4XL. Page-level vertical rhythm between major sections.
   *  Tailwind: p-16 gap-16 */
  16: "64px",

  /** 80px — 5XL. Hero top padding on desktop, section breathing room.
   *  Tailwind: p-20 */
  20: "80px",

  /** 96px — 6XL. Maximum section vertical padding, hero fullscreen spacing.
   *  Tailwind: p-24 */
  24: "96px",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. SEMANTIC SPACING
// Named slots that describe HOW spacing is used, not just HOW MUCH.
// Prefer these over raw scale values when building new components.
// ─────────────────────────────────────────────────────────────────────────────
export const spacing = {

  // ── Component Internal Padding ───────────────────────────────────────────

  /** Badge padding — small pill labels like "PENDING", "Vegetables".
   *  px: 10px, py: 2px  →  Tailwind: px-2.5 py-0.5  */
  badgePadding: { x: scale[2.5], y: scale[0.5] },

  /** Button padding — standard action buttons.
   *  px: 20px, py: 8px  →  Tailwind: px-5 py-2  */
  buttonPadding: { x: scale[5], y: scale[2] },

  /** Button padding large — hero and checkout CTA buttons.
   *  px: 24px, py: 14px  →  Tailwind: px-6 py-3.5  */
  buttonPaddingLg: { x: scale[6], y: scale[3.5] },

  /** Input padding — text inputs, textareas, select fields.
   *  px: 16px, py: 12px  →  Tailwind: px-4 py-3  */
  inputPadding: { x: scale[4], y: scale[3] },

  /** Card padding — standard product cards and dashboard widget cards.
   *  Tailwind: p-4 (mobile) → p-5 (desktop)  */
  cardPadding: scale[4],

  /** Card padding large — modals, checkout panels, auth forms.
   *  Tailwind: p-8  */
  cardPaddingLg: scale[8],

  /** Nav item padding — links inside navbar and sidebar.
   *  px: 16px, py: 8px  →  Tailwind: px-4 py-2  */
  navItemPadding: { x: scale[4], y: scale[2] },

  // ── Layout Gaps ──────────────────────────────────────────────────────────

  /** Gap between icon and label text (button, nav, badge).
   *  Tailwind: gap-2  */
  iconGap: scale[2],

  /** Gap between items in a horizontal action group (e.g. button row).
   *  Tailwind: gap-3  */
  actionGroupGap: scale[3],

  /** Gap between stacked form fields within a single form.
   *  Tailwind: gap-5  */
  formFieldGap: scale[5],

  /** Gap between cards in a product or listing grid.
   *  Tailwind: gap-4 (mobile) → gap-5 (tablet) → gap-6 (desktop)  */
  cardGridGap: scale[4],

  /** Gap between major sections on a page (dashboard widgets, home sections).
   *  Tailwind: gap-6  */
  sectionGap: scale[6],

  /** Gap between page-level sections with generous breathing room.
   *  Tailwind: gap-16 or mt-16  */
  pageSectionGap: scale[16],

  // ── Page Padding ─────────────────────────────────────────────────────────

  /** Horizontal page inset on mobile — keeps content off screen edges.
   *  Tailwind: px-4  */
  pagePaddingMobile: scale[4],

  /** Horizontal page inset on tablet.
   *  Tailwind: px-6  */
  pagePaddingTablet: scale[6],

  /** Horizontal page inset on desktop — wide layouts.
   *  Tailwind: px-8  */
  pagePaddingDesktop: scale[8],

  /** Dashboard page content padding (inside the sidebar content area).
   *  Tailwind: p-4 md:p-6  */
  dashboardPadding: { mobile: scale[4], desktop: scale[6] },
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. BORDER RADIUS
// Controls corner rounding. Cropbit uses large radius for a friendly,
// modern feel — small elements get proportionally smaller radius.
// ─────────────────────────────────────────────────────────────────────────────
export const borderRadius = {

  /** 4px — Micro. Category dot indicators, small decorative accents.
   *  Tailwind: rounded  */
  micro: "4px",

  /** 6px — Extra small. Tag chips, very small badges, inline code blocks.
   *  Tailwind: rounded-md  */
  xs: "6px",

  /** 8px — Small. File input buttons, secondary small buttons, icon containers.
   *  Tailwind: rounded-lg  */
  sm: "8px",

  /** 10px — Base. Standard UI badges, compact buttons, tab items.
   *  Tailwind: rounded-[10px]  */
  base: "10px",

  /** 12px — Medium. Nav links, sidebar items, search bars, stat card icon wells.
   *  Tailwind: rounded-xl  */
  md: "12px",

  /** 16px — Large. Standard cards (product, farmer, order, listing),
   *  dashboard widgets, form containers.
   *  Tailwind: rounded-2xl  */
  lg: "16px",

  /** 20px — Extra large. Checkout card, auth panels, featured section cards.
   *  Tailwind: rounded-[20px] or rounded-2xl with padding  */
  xl: "20px",

  /** 24px — 2XL. Large modals (logout confirm, order success), hero image cards.
   *  Tailwind: rounded-3xl  */
  "2xl": "24px",

  /** 9999px — Full. Avatar circles, dot indicators, loading spinner,
   *  pill badges, the search input bar.
   *  Tailwind: rounded-full  */
  full: "9999px",
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SHADOWS
// Elevation and depth effects. Cropbit uses very subtle shadows on dark surfaces
// since the dark bg already provides strong contrast. Shadows are more visible
// in light mode.
// ─────────────────────────────────────────────────────────────────────────────
export const shadows = {

  /** No shadow. Flat surface with no elevation.
   *  Tailwind: shadow-none  */
  none: "none",

  /** Subtle card shadow — barely-visible depth for standard card surfaces.
   *  Tailwind: shadow-sm  */
  card: "0 1px 3px rgba(0,0,0,0.20), 0 1px 2px rgba(0,0,0,0.12)",

  /** Medium shadow — elevated panels, dropdown menus, search results.
   *  Tailwind: shadow-md  */
  md: "0 4px 6px rgba(0,0,0,0.20), 0 2px 4px rgba(0,0,0,0.12)",

  /** Large shadow — modals, drawers, side menus.
   *  Tailwind: shadow-lg  */
  lg: "0 10px 15px rgba(0,0,0,0.25), 0 4px 6px rgba(0,0,0,0.15)",

  /** Extra large shadow — floating panels, full-screen overlays.
   *  Tailwind: shadow-xl  */
  xl: "0 20px 25px rgba(0,0,0,0.30), 0 10px 10px rgba(0,0,0,0.20)",

  /** Black shadow — the mobile side drawer, max depth UI.
   *  Tailwind: shadow-2xl  */
  "2xl": "0 25px 50px rgba(0,0,0,0.40)",

  /** Emerald glow — applied to primary CTA buttons to give them lift.
   *  Creates a soft green halo that reinforces the brand color.
   *  Tailwind: shadow-lg shadow-[#10B981]/20  */
  emeraldGlow: "0 10px 15px rgba(16,185,129,0.20)",

  /** Emerald glow medium — used on prominent action buttons in checkout.
   *  Tailwind: shadow-md shadow-[#10B981]/20  */
  emeraldGlowMd: "0 4px 6px rgba(16,185,129,0.20)",

  /** Inner shadow — used on pressed/active state for depth on dark inputs.
   *  Not a Tailwind default; applied via inline style or custom class.  */
  inner: "inset 0 2px 4px rgba(0,0,0,0.30)",
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. BREAKPOINTS
// Responsive thresholds. Matches Tailwind CSS v4 defaults.
// Design for mobile-first: each breakpoint adds layout for larger screens.
// ─────────────────────────────────────────────────────────────────────────────
export const breakpoints = {

  /** 640px — sm. Small tablet landscape, large phone.
   *  Grid shifts from 1-column to 2-column (product cards, form fields).
   *  Tailwind prefix: sm:  */
  sm: "640px",

  /** 768px — md. Tablet portrait. Navbar switches from hamburger to full links.
   *  Dashboard sidebar becomes visible. Login/Register split-screen activates.
   *  Tailwind prefix: md:  */
  md: "768px",

  /** 1024px — lg. Laptop / small desktop. Full dashboard layout, 3-col grid.
   *  Tailwind prefix: lg:  */
  lg: "1024px",

  /** 1280px — xl. Standard desktop. Product grid expands to 4 columns.
   *  Tailwind prefix: xl:  */
  xl: "1280px",

  /** 1536px — 2xl. Large desktop / wide monitors. Max-width container kicks in.
   *  Tailwind prefix: 2xl:  */
  "2xl": "1536px",
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. Z-INDEX SCALE
// Controls the stacking order of layered UI elements.
// Always use these named values instead of arbitrary numbers.
// ─────────────────────────────────────────────────────────────────────────────
export const zIndex = {

  /** 0 — Base. Static content with no stacking context. */
  base: 0,

  /** 10 — Raised. Slightly elevated cards on hover, sticky table headers. */
  raised: 10,

  /** 20 — Sticky. Sticky elements like the mobile tab bar inside the dashboard. */
  sticky: 20,

  /** 30 — Fixed. The dashboard sidebar (desktop) — sits above content scroll. */
  sidebar: 30,

  /** 40 — Navbar. The top navigation bar — always visible above page content. */
  navbar: 40,

  /** 50 — Overlay. Modal backdrop, drawer backdrop — sits above the navbar. */
  overlay: 50,

  /** 60 — Modal / Drawer. The mobile side drawer and all dialog modals. */
  modal: 60,

  /** 100 — Toast / Notification. Future toast messages sit above everything. */
  toast: 100,
};

// ─────────────────────────────────────────────────────────────────────────────
// 7. TRANSITIONS
// Motion timing for interactive elements. Keep transitions fast and purposeful.
// Slow transitions feel sluggish; too-fast feels jarring.
// ─────────────────────────────────────────────────────────────────────────────
export const transitions = {

  /**
   * Instant — 0ms. No animation. Used when immediate feedback is critical
   * (e.g. checkbox toggles, radio buttons, hidden→visible text).
   */
  instant: "0ms",

  /**
   * Fast — 150ms. Micro-interactions: button hover color, icon swap,
   * badge appearance, focus ring.
   * Tailwind: duration-150
   */
  fast: "150ms",

  /**
   * Base — 200ms. Standard hover states: nav links, card borders,
   * sidebar item backgrounds, input border color.
   * Tailwind: duration-200
   */
  base: "200ms",

  /**
   * Smooth — 300ms. Theme toggle (bg + text color), drawer slide-in delay,
   * modal fade. Gives the eye time to follow the change.
   * Tailwind: duration-300
   */
  smooth: "300ms",

  /**
   * Slow — 500ms. Page-level transitions, hero image cross-fades.
   * Tailwind: duration-500
   */
  slow: "500ms",

  /**
   * Progress — 3500ms. The order-success modal progress bar.
   * Matches the navigate-away timeout after order placement.
   * Tailwind: duration-[3500ms]
   */
  progress: "3500ms",

  // Easing functions
  easing: {
    /** Default ease-in-out — most transitions. Tailwind: ease-in-out */
    default: "cubic-bezier(0.4, 0, 0.2, 1)",

    /** Ease-out — elements entering the screen (drawer sliding in).
     *  Tailwind: ease-out  */
    out: "cubic-bezier(0, 0, 0.2, 1)",

    /** Ease-in — elements leaving the screen (drawer sliding out).
     *  Tailwind: ease-in  */
    in: "cubic-bezier(0.4, 0, 1, 1)",

    /** Linear — loading spinners, progress bars.
     *  Tailwind: ease-linear  */
    linear: "linear",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 8. LAYOUT CONSTRAINTS
// Fixed measurements for structural UI elements.
// ─────────────────────────────────────────────────────────────────────────────
export const layout = {

  /**
   * Max content width — the widest a content container ever gets on desktop.
   * Applied to max-w-7xl containers inside the navbar and page sections.
   * Tailwind: max-w-7xl (1280px)
   */
  maxContentWidth: "1280px",

  /**
   * Max form width — constrains auth forms and settings forms for readability.
   * Tailwind: max-w-md (448px)
   */
  maxFormWidth: "448px",

  /**
   * Max card content width — dashboard inner content column.
   * Tailwind: max-w-5xl (1024px)
   */
  maxDashboardWidth: "1024px",

  /**
   * Navbar height — the fixed top navigation bar.
   * Mobile: 64px, Desktop: 72px (h-16 / h-18)
   * Components below the navbar need top padding matching this value.
   */
  navbarHeight: { mobile: "64px", desktop: "72px" },

  /**
   * Dashboard sidebar width — the fixed left navigation panel on desktop.
   * Tailwind: w-64 (256px)
   */
  sidebarWidth: "256px",

  /**
   * Mobile side drawer width — the slide-in nav menu on small screens.
   * Tailwind: w-80 (320px)
   */
  drawerWidth: "320px",

  /**
   * Product card width — fixed width for marketplace product cards.
   * Allows consistent grid sizing without stretching.
   * Tailwind: w-72 md:w-80
   */
  productCardWidth: { mobile: "288px", desktop: "320px" },

  /**
   * Product card image height — the image area inside a product card.
   * Consistent crop height prevents layout shifts in the grid.
   * Tailwind: h-44 (176px)
   */
  productCardImageHeight: "176px",

  /**
   * Avatar sizes — used for user profile pictures throughout the app.
   * sm: navbar mobile, md: desktop navbar + sidebar, lg: side drawer header
   */
  avatar: { sm: "32px", md: "36px", lg: "48px" },
};
