/**
 * CROPBIT DESIGN SYSTEM — COLORS
 * ─────────────────────────────────────────────────────────────────────────────
 * This file defines every color used across the Cropbit platform.
 * Colors are organized into four layers:
 *   1. Primitives  — raw hex values, the source of truth
 *   2. Brand       — Cropbit's identity palette
 *   3. Semantic    — purpose-driven tokens (what a color DOES, not what it IS)
 *   4. Status      — feedback and state colors
 *
 * Usage rule: always reach for a Semantic or Status token in components.
 * Only reference Primitives or Brand tokens when building new semantic tokens.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. PRIMITIVES
// Raw color values. Do not use these directly in UI components.
// They exist so that semantic tokens have a single, auditable source.
// ─────────────────────────────────────────────────────────────────────────────
export const primitives = {

  // Emerald scale — Cropbit's primary green, drawn from nature and growth
  emerald: {
    50:  "#ECFDF5", /** Faintest emerald tint; used for light-mode page backgrounds */
    100: "#D1FAE5", /** Very light emerald; hover states on light surfaces */
    200: "#A7F3D0", /** Soft emerald; decorative accents on light mode */
    300: "#6EE7B7", /** Mid-light emerald; icons and indicators */
    400: "#34D399", /** Medium emerald; secondary CTAs */
    500: "#10B981", /** Core brand green — PRIMARY. Most used green in the UI */
    600: "#059669", /** Darker emerald; hover state for primary buttons */
    700: "#047857", /** Deep emerald; pressed/active state */
    800: "#065F46", /** Forest — secondary brand color, used for depth and contrast */
    900: "#064E3B", /** Darkest green; rarely used, only for extreme contrast */
  },

  // Slate scale — the neutral backbone of the dark UI
  slate: {
    50:  "#F8FAFC", /** Near-white; primary text on dark backgrounds */
    100: "#F1F5F9", /** Off-white; light mode page background */
    200: "#E2E8F0", /** Light border; dividers on light mode */
    300: "#CBD5E1", /** Muted light text; light mode secondary text */
    400: "#94A3B8", /** Muted text on dark surfaces — captions, labels, hints */
    500: "#64748B", /** Medium slate; less-important metadata */
    600: "#475569", /** Subtle text; placeholder text and tertiary labels */
    700: "#334155", /** Border color on dark surfaces */
    800: "#1E293B", /** Card / panel surface on dark backgrounds */
    900: "#0F172A", /** Page background — the deepest dark */
    950: "#0a0f1a", /** Footer and sidebar deep background */
  },

  // Amber scale — accent color representing value, pricing, and harvest
  amber: {
    50:  "#FFFBEB", /** Faintest amber; light mode alert backgrounds */
    100: "#FEF3C7", /** Very light amber; warning backgrounds */
    300: "#FCD34D", /** Light amber; decorative highlights */
    400: "#FBBF24", /** Medium amber; secondary price indicators */
    500: "#F59E0B", /** Core amber — used for prices, earnings, and value badges */
    600: "#D97706", /** Darker amber; hover on amber elements */
    700: "#B45309", /** Deep amber; pressed amber state */
  },

  // Sky scale — informational and trust color (order tracking, links)
  sky: {
    100: "#E0F2FE", /** Light sky; info banners on light mode */
    400: "#38BDF8", /** Medium sky; informational icons */
    500: "#0EA5E9", /** Sky blue; secondary informational elements */
    600: "#0284C7", /** Deep sky — used for "Confirmed" order badges and links */
    700: "#0369A1", /** Darker sky; hover on sky elements */
  },

  // Red scale — destructive actions and error states
  red: {
    100: "#FEE2E2", /** Light red; error backgrounds */
    400: "#F87171", /** Medium red; error icons and text */
    500: "#EF4444", /** Standard red; error messages */
    600: "#DC2626", /** Deeper red; hover on destructive buttons */
  },

  // Pure values
  white: "#FFFFFF", /** Pure white — used sparingly for max contrast on dark */
  black: "#000000", /** Pure black — used in overlays and shadows */
  transparent: "transparent",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. BRAND PALETTE
// The six colors that define Cropbit's visual identity.
// These are the colors referenced in brand guidelines, pitch decks, and logos.
// ─────────────────────────────────────────────────────────────────────────────
export const brand = {

  /** Primary brand green. Used on CTAs, active states, and the logomark leaves. */
  emerald: primitives.emerald[500],

  /** Secondary green. Used for depth in the logomark, sidebar gradients, and
   *  hero panel backgrounds. Represents the forest / earth beneath the crop. */
  forest: primitives.emerald[800],

  /** Accent / harvest color. Replaces the dot on the 'i' in the wordmark.
   *  Used for prices, earnings, and value-highlight badges. */
  amber: primitives.amber[500],

  /** Page background — the deep charcoal that grounds the dark theme. */
  charcoal: primitives.slate[900],

  /** Informational accent. Used for order-confirmed states, tracking links. */
  sky: primitives.sky[600],

  /** Near-white text color used on dark backgrounds. */
  chalk: primitives.slate[50],
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SEMANTIC TOKENS — DARK THEME (default)
// What each color slot means in context.
// These map directly to the CSS custom properties in src/index.css (:root).
// ─────────────────────────────────────────────────────────────────────────────
export const dark = {

  // Backgrounds
  /** Main page background. Applied to <body> and full-screen wrappers. */
  bg:        primitives.slate[900],   // #0F172A

  /** Deeper background. Used for footers, sidebar bases, and nested layouts. */
  bgDeep:    primitives.slate[950],   // #0a0f1a

  /** Sidebar gradient starting point — very dark green tint. */
  surface2:  "#0a1f14",

  // Surfaces
  /** Card and panel background. All modals, product cards, form containers. */
  surface:   primitives.slate[800],   // #1E293B

  // Borders
  /** Primary border — dividers, card outlines, input borders. */
  border:    primitives.slate[700],   // #334155

  /** Secondary border — subtle separators between sections within a card. */
  border2:   primitives.slate[800],   // #1E293B

  // Text
  /** Primary text — headings, labels, and high-importance content. */
  text:      primitives.slate[50],    // #F8FAFC

  /** Muted text — captions, helper text, secondary labels, placeholder icons. */
  muted:     primitives.slate[400],   // #94A3B8

  /** Subtle text — placeholder text, tertiary metadata, disabled labels. */
  subtle:    primitives.slate[600],   // #475569

  // Interactive
  /** Primary action color — buttons, active nav links, focus rings. */
  primary:   brand.emerald,           // #10B981

  /** Primary hover — applied on hover of emerald buttons and links. */
  primaryHover: primitives.emerald[600], // #059669

  /** Accent — prices, earnings totals, harvest value indicators. */
  accent:    brand.amber,             // #F59E0B

  /** Informational — confirmed orders, tracking states, info badges. */
  info:      brand.sky,               // #0284C7
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. SEMANTIC TOKENS — LIGHT THEME
// Applied when <html data-theme="light"> is active.
// Maps to CSS custom properties in src/index.css ([data-theme="light"]).
// ─────────────────────────────────────────────────────────────────────────────
export const light = {

  // Backgrounds
  /** Light page background — a very pale green tint, fresh and agricultural. */
  bg:        primitives.emerald[50],  // #ECFDF5

  /** Slightly deeper light background — section alternates. */
  bgDeep:    "#F0FDF4",

  /** Light sidebar / secondary surface tint. */
  surface2:  primitives.emerald[100], // #D1FAE5

  // Surfaces
  /** Card and panel background in light mode — clean white. */
  surface:   primitives.white,        // #FFFFFF

  // Borders
  /** Light mode primary border — soft emerald hairline. */
  border:    primitives.emerald[100], // #D1FAE5

  /** Light mode secondary border — neutral divider. */
  border2:   primitives.slate[200],   // #E2E8F0

  // Text
  /** Primary text in light mode — same deep charcoal as dark bg for contrast. */
  text:      primitives.slate[900],   // #0F172A

  /** Muted text in light mode. */
  muted:     primitives.slate[500],   // #64748B (mapped to #4B5563 in CSS)

  /** Subtle text in light mode — placeholders and tertiary labels. */
  subtle:    primitives.slate[400],   // #9CA3AF

  // Interactive (same brand colors — they work on both themes)
  primary:      brand.emerald,
  primaryHover: primitives.emerald[600],
  accent:       brand.amber,
  info:         brand.sky,
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. STATUS COLORS
// Used for feedback states: order statuses, form validation, alerts.
// Always pair with a background tint (10% opacity) and a border (20% opacity).
// ─────────────────────────────────────────────────────────────────────────────
export const status = {

  /**
   * Success — order delivered, payment confirmed, listing active.
   * Badge: bg-[#10B981]/10  text-[#10B981]  border-[#10B981]/20
   */
  success: {
    base:       primitives.emerald[500], // #10B981
    background: "#10B98118",             // 10% opacity
    border:     "#10B98133",             // 20% opacity
    text:       primitives.emerald[500],
  },

  /**
   * Warning — order pending, payment processing, low stock.
   * Badge: bg-[#F59E0B]/10  text-[#F59E0B]  border-[#F59E0B]/20
   */
  warning: {
    base:       primitives.amber[500],   // #F59E0B
    background: "#F59E0B18",
    border:     "#F59E0B33",
    text:       primitives.amber[500],
  },

  /**
   * Info — order confirmed, shipment in transit, verification pending.
   * Badge: bg-[#0284C7]/10  text-[#0284C7]  border-[#0284C7]/20
   */
  info: {
    base:       primitives.sky[600],     // #0284C7
    background: "#0284C718",
    border:     "#0284C733",
    text:       primitives.sky[600],
  },

  /**
   * Danger — order cancelled, payment failed, item deleted.
   * Badge: bg-red-500/10  text-red-400  border-red-500/20
   */
  danger: {
    base:       primitives.red[500],     // #EF4444
    background: "#EF444418",
    border:     "#EF444433",
    text:       primitives.red[400],     // #F87171 — slightly lighter for readability on dark
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. OVERLAY & SHADOW COLORS
// Used in modals, drawers, and depth effects.
// ─────────────────────────────────────────────────────────────────────────────
export const overlays = {

  /** Full-screen modal backdrop — darkens the page behind dialogs. */
  modalBackdrop: "rgba(0, 0, 0, 0.70)",

  /** Hero image overlay — gradient from page bg for text legibility on photos. */
  heroOverlayDark:  "rgba(15, 23, 42, 0.70)",  // dark theme
  heroOverlayLight: "rgba(6, 95, 70, 0.60)",   // light theme — forest tint

  /** Card shadow — subtle depth for elevated surfaces. */
  shadowCard:    "rgba(0, 0, 0, 0.30)",

  /** Button glow — used on primary CTA shadows. */
  shadowEmerald: "rgba(16, 185, 129, 0.20)",
};
