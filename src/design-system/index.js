/**
 * CROPBIT DESIGN SYSTEM — ENTRY POINT
 * ─────────────────────────────────────────────────────────────────────────────
 * Import everything from here in a single line:
 *
 *   import { brand, dark, status, textStyles, spacing, layout } from '@/design-system';
 *
 * Or import from individual files for tree-shaking:
 *
 *   import { brand } from '@/design-system/colors';
 *   import { textStyles } from '@/design-system/typography';
 *   import { layout } from '@/design-system/spacing';
 * ─────────────────────────────────────────────────────────────────────────────
 */

export {
  primitives,
  brand,
  dark,
  light,
  status,
  overlays,
} from "./colors";

export {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textStyles,
} from "./typography";

export {
  baseUnit,
  scale,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  zIndex,
  transitions,
  layout,
} from "./spacing";
