import { createGlobalStyle } from 'styled-components';

/**
 * Global style override for the Utrecht Design System in Strapi context.
 *
 * PROBLEM:
 * Strapi sets `html { font-size: 62.5%; }` globally, which means 1rem = 10px instead of 16px.
 * The Utrecht Design System uses rem units assuming the browser default (1rem = 16px).
 * This causes all typography to render at 62.5% of the intended size.
 *
 * SOLUTION:
 * Override the design system's CSS custom properties with pixel values instead of rem.
 * This ensures consistent sizing regardless of the root font-size.
 *
 * WHY THIS APPROACH:
 * 1. `createGlobalStyle` injects styles into <head> with higher specificity than component styles
 * 2. `body .utrecht-theme` selector increases specificity to override the design system's CSS
 * 3. Using `px` instead of `rem` avoids the 62.5% root font-size issue entirely
 * 4. Values are the intended pixel sizes (32px, 24px, etc.) matching the design system's spec
 *
 * ALTERNATIVE APPROACHES THAT DIDN'T WORK:
 * - Using calc(var(--variable) * 1.6) with rem - CSS load order issues
 * - Styled-component wrappers - Lower specificity than design system CSS
 * - Setting font-size: 16px on wrapper - Doesn't affect CSS variable calculations
 *
 * ORIGINAL DESIGN SYSTEM VALUES (assuming 16px root):
 * --utrecht-typography-scale-4xl-font-size: 2rem     → 32px
 * --utrecht-typography-scale-3xl-font-size: 1.5rem   → 24px
 * --utrecht-typography-scale-2xl-font-size: 1.375rem → 22px
 * --utrecht-typography-scale-xl-font-size: 1.25rem   → 20px
 * --utrecht-typography-scale-lg-font-size: 1.125rem  → 18px
 * --utrecht-typography-scale-md-font-size: 1rem      → 16px
 * --utrecht-typography-scale-sm-font-size: 0.875rem  → 14px
 */
export const UtrechtThemeStyledComponent = createGlobalStyle`

body .utrecht-theme {
  --utrecht-typography-scale-4xl-font-size: 32px;
  --utrecht-typography-scale-3xl-font-size: 24px;
  --utrecht-typography-scale-2xl-font-size: 22px;
  --utrecht-typography-scale-xl-font-size: 20px;
  --utrecht-typography-scale-lg-font-size: 18px;
  --utrecht-typography-scale-md-font-size: 16px;
  --utrecht-typography-scale-sm-font-size: 14px;
}
`;

interface UtrechtThemeProps {
  children: React.ReactNode;
}

export const UtrechtTheme = ({ children }: UtrechtThemeProps) => (
  <>
    <UtrechtThemeStyledComponent />
    <div className="utrecht-theme">{children}</div>
  </>
);
