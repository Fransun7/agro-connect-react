/**
 * CROPBIT DESIGN SYSTEM — TYPOGRAPHY
 * ─────────────────────────────────────────────────────────────────────────────
 * This file defines every typographic decision made across the Cropbit platform.
 * Sections:
 *   1. Font Families  — which typefaces are used and why
 *   2. Font Sizes     — the modular size scale
 *   3. Font Weights   — weight tokens and their roles
 *   4. Line Heights   — vertical rhythm per content type
 *   5. Letter Spacing — tracking adjustments per role
 *   6. Text Styles    — composed tokens (size + weight + leading + tracking)
 *                       ready to apply directly to a component
 *
 * Typeface: Plus Jakarta Sans (Google Fonts)
 * Source: https://fonts.google.com/specimen/Plus+Jakarta+Sans
 * Import: @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap')
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────────────────────
// 1. FONT FAMILIES
// Only one family is used — Plus Jakarta Sans at all weights.
// A mono fallback is defined for numeric/data contexts.
// ─────────────────────────────────────────────────────────────────────────────
export const fontFamilies = {

  /**
   * Primary sans-serif — used for ALL text across the platform.
   * Plus Jakarta Sans is a geometric sans with friendly curves and excellent
   * legibility at both small label sizes and large display headings.
   * Applied via !important on all elements in index.css to prevent overrides.
   */
  sans: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  /**
   * Monospace fallback — reserved for order IDs, product IDs, and
   * any raw code or reference numbers that benefit from fixed-width spacing.
   * Not currently imported; add to index.css if/when needed.
   */
  mono: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. FONT SIZES
// Based on a modular scale with a 1.25 ratio (Major Third).
// Values in pixels for reference; apply via Tailwind text-* classes in JSX.
// ─────────────────────────────────────────────────────────────────────────────
export const fontSizes = {

  /** 10px — Micro labels. Badge counts, timestamp fine print, icon labels.
   *  Tailwind: text-[10px]  */
  micro: "10px",

  /** 11px — Extra-small labels. Tag text, secondary metadata rows.
   *  Tailwind: text-[11px]  */
  xxs: "11px",

  /** 12px — Small labels. Category pills, table headers, stat card labels,
   *  ALL-CAPS tracking labels above form fields.
   *  Tailwind: text-xs  */
  xs: "12px",

  /** 14px — Body small. Helper text, card descriptions, nav link text,
   *  most dashboard body copy.
   *  Tailwind: text-sm  */
  sm: "14px",

  /** 16px — Body base. Form field values, product card primary text,
   *  chat messages, standard paragraph copy.
   *  Tailwind: text-base  */
  base: "16px",

  /** 18px — Body large. Section intros, feature descriptions,
   *  emphasized body paragraphs.
   *  Tailwind: text-lg  */
  lg: "18px",

  /** 20px — Small heading. Card titles, sidebar section headings,
   *  modal headings on small screens.
   *  Tailwind: text-xl  */
  xl: "20px",

  /** 24px — Medium heading. Page section titles, dashboard widget headers.
   *  Tailwind: text-2xl  */
  "2xl": "24px",

  /** 28px — Large heading. Primary page titles on desktop, stat card numbers.
   *  Tailwind: text-3xl (28px approx)  */
  "3xl": "28px",

  /** 32px — Display small. Hero sub-headings, landing section titles.
   *  Tailwind: text-3xl / text-4xl  */
  "4xl": "32px",

  /** 36px — Display medium. Login/Register hero headings.
   *  Tailwind: text-4xl  */
  "4xl+": "36px",

  /** 48px — Display large. Home hero primary headline on desktop.
   *  Tailwind: text-5xl  */
  "5xl": "48px",

  /** 60px — Display XL. Reserved for full-screen hero text on large viewports.
   *  Tailwind: text-6xl  */
  "6xl": "60px",
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. FONT WEIGHTS
// Plus Jakarta Sans ships with weights 400–800. Each has a specific role.
// ─────────────────────────────────────────────────────────────────────────────
export const fontWeights = {

  /** 400 — Regular. Long-form body copy, descriptions, testimonials.
   *  Tailwind: font-normal  */
  regular: 400,

  /** 500 — Medium. Secondary nav links, input field values, card metadata.
   *  Tailwind: font-medium  */
  medium: 500,

  /** 600 — Semibold. Nav links, sidebar items, table cell content,
   *  non-primary buttons.
   *  Tailwind: font-semibold  */
  semibold: 600,

  /** 700 — Bold. Card titles, modal headings, form labels, badge text,
   *  section headings, stat card numbers.
   *  Tailwind: font-bold  */
  bold: 700,

  /** 800 — Extrabold. Hero display headings, login page headlines,
   *  primary CTA labels, the Cropbit wordmark.
   *  Tailwind: font-extrabold  */
  extrabold: 800,
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. LINE HEIGHTS
// Controls vertical rhythm. Tighter for headings, looser for body copy.
// ─────────────────────────────────────────────────────────────────────────────
export const lineHeights = {

  /** 1 — None. Used in wordmarks, logos, and single-line display text where
   *  extra leading would break the layout.
   *  Tailwind: leading-none  */
  none: 1,

  /** 1.1 — Tight. Large display headings (hero, login) where tight stacking
   *  creates a bold, editorial impact.
   *  Tailwind: leading-tight (1.25) — custom value via leading-[1.1]  */
  tight: 1.1,

  /** 1.25 — Snug. Card titles, modal headings, section headings.
   *  Tailwind: leading-tight  */
  snug: 1.25,

  /** 1.375 — Normal. General UI text — nav links, labels, badges, buttons.
   *  Tailwind: leading-snug  */
  normal: 1.375,

  /** 1.5 — Relaxed. Body copy, descriptions, help text, testimonials.
   *  Tailwind: leading-normal  */
  relaxed: 1.5,

  /** 1.625 — Loose. Long-form paragraphs, onboarding copy, FAQs.
   *  Tailwind: leading-relaxed  */
  loose: 1.625,
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. LETTER SPACING (TRACKING)
// Adjusts character spacing for different typographic roles.
// ─────────────────────────────────────────────────────────────────────────────
export const letterSpacing = {

  /** -0.04em — Very tight. Used on large display headings (48px+) where default
   *  spacing makes glyphs feel too loose. Matches the wordmark tracking.
   *  Tailwind: tracking-tighter  */
  tighter: "-0.04em",

  /** -0.02em — Tight. Used on headings (24px–36px) for a polished, modern feel.
   *  Tailwind: tracking-tight  */
  tight: "-0.02em",

  /** 0 — Normal. Default for body copy and UI text. No adjustment needed.
   *  Tailwind: tracking-normal  */
  normal: "0em",

  /** 0.025em — Wide. Slightly open; used for semibold nav links and buttons.
   *  Tailwind: tracking-wide  */
  wide: "0.025em",

  /** 0.08em — Wider. Sub-labels and section dividers in uppercase.
   *  Tailwind: tracking-wider  */
  wider: "0.08em",

  /** 0.16em — Widest. ALL-CAPS micro labels above form fields and stat cards.
   *  e.g. "DELIVERY ADDRESS", "TOTAL EARNINGS", "PRODUCT CATEGORY"
   *  Tailwind: tracking-widest  */
  widest: "0.16em",
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. TEXT STYLES — Composed tokens
// Ready-to-use typographic presets. Each combines size, weight, line height,
// and tracking into a named role. Reference these when building new components.
// ─────────────────────────────────────────────────────────────────────────────
export const textStyles = {

  /**
   * Hero Display
   * The largest text on the platform. Used in the Home page hero section.
   * Example: "Farm Fresh, Direct to Your Door"
   */
  heroDisplay: {
    fontSize:      fontSizes["6xl"],       // 60px
    fontWeight:    fontWeights.extrabold,  // 800
    lineHeight:    lineHeights.tight,      // 1.1
    letterSpacing: letterSpacing.tighter,  // -0.04em
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Section Heading
   * Used for major section titles across the Home page and marketing pages.
   * Example: "How Cropbit Works", "Why Farmers Trust Us"
   */
  sectionHeading: {
    fontSize:      fontSizes["4xl+"],      // 36px
    fontWeight:    fontWeights.extrabold,  // 800
    lineHeight:    lineHeights.snug,       // 1.25
    letterSpacing: letterSpacing.tight,    // -0.02em
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Page Title
   * Used for dashboard page headings and authenticated section titles.
   * Example: "My Purchase Orders", "Farm Listings", "Overview"
   */
  pageTitle: {
    fontSize:      fontSizes.lg,           // 18px
    fontWeight:    fontWeights.bold,       // 700
    lineHeight:    lineHeights.snug,       // 1.25
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Card Title
   * Used for product names, farmer names, and order identifiers in cards.
   * Example: "Fresh Tomatoes", "Adeyemi Oluwaseun", "#ORD-00421"
   */
  cardTitle: {
    fontSize:      fontSizes.sm,           // 14px–16px depending on context
    fontWeight:    fontWeights.bold,       // 700
    lineHeight:    lineHeights.normal,     // 1.375
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Body
   * Standard paragraph and description text.
   * Example: product descriptions, order delivery notes, about copy.
   */
  body: {
    fontSize:      fontSizes.sm,           // 14px
    fontWeight:    fontWeights.regular,    // 400
    lineHeight:    lineHeights.relaxed,    // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Body Small
   * Used for secondary info, metadata, and helper text inside cards.
   * Example: "📍 Ibadan, Oyo State", "👤 Farmer: Chukwuemeka Obi"
   */
  bodySmall: {
    fontSize:      fontSizes.xs,           // 12px
    fontWeight:    fontWeights.regular,    // 400
    lineHeight:    lineHeights.relaxed,    // 1.5
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Label — Uppercase
   * Used for ALL-CAPS labels above form fields and stat cards.
   * Always rendered in uppercase via CSS text-transform.
   * Example: "DELIVERY ADDRESS", "TOTAL ORDERS", "PRODUCT CATEGORY"
   */
  labelUppercase: {
    fontSize:      fontSizes.xs,           // 12px
    fontWeight:    fontWeights.bold,       // 700
    lineHeight:    lineHeights.none,       // 1
    letterSpacing: letterSpacing.widest,   // 0.16em
    textTransform: "uppercase",
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Label — Inline
   * Used for badge text, category tags, and status pills.
   * Example: "Vegetables", "PENDING", "DELIVERED"
   */
  labelInline: {
    fontSize:      fontSizes.xs,           // 12px — or 10px for tight badges
    fontWeight:    fontWeights.bold,       // 700
    lineHeight:    lineHeights.none,       // 1
    letterSpacing: letterSpacing.wider,    // 0.08em
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Button — Primary
   * Text style used inside CTA buttons.
   * Example: "Get Started", "Confirm & Place Order", "Add Product"
   */
  buttonPrimary: {
    fontSize:      fontSizes.sm,           // 14px
    fontWeight:    fontWeights.bold,       // 700
    lineHeight:    lineHeights.none,       // 1
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Button — Secondary / Ghost
   * Used for less prominent actions like "Cancel", "Stay", "Login".
   */
  buttonSecondary: {
    fontSize:      fontSizes.sm,           // 14px
    fontWeight:    fontWeights.semibold,   // 600
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Nav Link
   * Navigation items in the top navbar and dashboard sidebar.
   * Example: "Home", "Marketplace", "Dashboard", "Orders"
   */
  navLink: {
    fontSize:      fontSizes.sm,           // 14px
    fontWeight:    fontWeights.semibold,   // 600
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.normal,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Price / Monetary Value
   * Used wherever currency amounts are displayed.
   * Always rendered in Solar Amber (#F59E0B) for brand consistency.
   * Example: "₦12,500", "₦0.00", Total Estimate values
   */
  price: {
    fontSize:      fontSizes.base,         // 16px (larger in checkout: 20–28px)
    fontWeight:    fontWeights.extrabold,  // 800
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.tight,    // -0.02em — numbers feel tighter
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Stat Number
   * Large numeric values in dashboard overview stat cards.
   * Example: "₦128,500", "34", "12 Orders"
   */
  statNumber: {
    fontSize:      fontSizes["2xl"],       // 24px
    fontWeight:    fontWeights.extrabold,  // 800
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.tight,
    fontFamily:    fontFamilies.sans,
  },

  /**
   * Mono / Reference
   * Used for order IDs, product IDs, and system-generated reference codes.
   * Example: "#4821", "ORD-00219"
   */
  mono: {
    fontSize:      fontSizes.xs,           // 12px
    fontWeight:    fontWeights.regular,    // 400
    lineHeight:    lineHeights.none,
    letterSpacing: letterSpacing.wide,
    fontFamily:    fontFamilies.mono,
  },
};
