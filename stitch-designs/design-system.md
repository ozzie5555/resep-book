---
name: Idul Fitri Artisanal Bakery Operations
colors:
  surface: '#fff8f5'
  surface-dim: '#f1d4c2'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e9'
  surface-container: '#ffeadd'
  surface-container-high: '#ffe3d1'
  surface-container-highest: '#faddcb'
  on-surface: '#27180d'
  on-surface-variant: '#3f4943'
  inverse-surface: '#3e2d21'
  inverse-on-surface: '#ffede3'
  outline: '#6f7a73'
  outline-variant: '#bec9c1'
  surface-tint: '#196b4c'
  primary: '#00563a'
  on-primary: '#ffffff'
  primary-container: '#1f6f50'
  on-primary-container: '#a1efc8'
  inverse-primary: '#8ad6b0'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#fec65a'
  on-secondary-container: '#745200'
  tertiary: '#8a2908'
  on-tertiary: '#ffffff'
  tertiary-container: '#aa401f'
  on-tertiary-container: '#ffd6cb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a5f3cc'
  primary-fixed-dim: '#8ad6b0'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffdea7'
  secondary-fixed-dim: '#f5be53'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0a00'
  on-tertiary-fixed-variant: '#842505'
  background: '#fff8f5'
  on-background: '#27180d'
  surface-variant: '#faddcb'
typography:
  headline-xl:
    fontFamily: Epilogue
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
  headline-xl-mobile:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg:
    fontFamily: Epilogue
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-lg-mobile:
    fontFamily: Epilogue
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-md:
    fontFamily: Epilogue
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Epilogue
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-lg-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-lg-semibold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.5px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves an internal production and order management web application for an artisanal Eid al-Fitr (Lebaran) bakery. The tool is purpose-built for busy operational windows: pre-order intake, batch baking runs, deposit/payment reconciliations, and distribution logistics. 

### Brand Personality
- **Warm & Domestic Elegance:** Rooted in festive Indonesian Eid traditions—evoking the aroma of roasted butter, roasted pineapple jam (nastar), and warm vanilla without sacrificing operational clarity.
- **Calm & Focused Efficiency:** Built to alleviate high-season holiday stress through clear statuses, legible tracking cards, and tactile ergonomics designed for bakers and order managers on the move.
- **Reliable & Artisanal:** Projects the dignity of a heritage pastry workshop, balancing premium aesthetic touches with fast, error-free accounting interactions.

### Design Movement & Visual Expression
The aesthetic blends **Warm Editorial Minimalism** with **Tactile Heritage Craft**:
- High-contrast, warm cream surfaces with deep forest green and golden-honey accents.
- Soft, grounded visual weight instead of cold clinical gray administration dashboards.
- Generous mobile-first interaction targets tailored for one-handed operation on kitchen tablets and smartphones, scaling seamlessly to desktop dispatch tables.

## Colors

The palette directly models the sensorial elements of Lebaran delicacies and traditional Islamic aesthetics: deep forest palm green, burnished oven gold, warm pastry crumb cream, and terracotta accents.

### Core Roles
- **Primary (`#1F6F50`):** Forest Green. Conveys stability, Islamic festive elegance, and confidence. Used for primary navigation, primary action buttons, key metrics, and brand touchpoints.
- **Primary Hover / Active (`#17583F`):** Deepened forest green for button presses, focused states, and selected side-rail navigation anchors.
- **Secondary / Gold Accent (`#C8962E`):** Burnished gold leaf. Applied to quick-action triggers (Floating Action Button for new sales entries), high-priority badges, and celebratory operational callouts.
- **Tertiary / Terracotta Accent (`#C2512F`):** Warm terracotta red-orange. Reserved for secondary critical alerts, inventory deficit warnings, and urgent customer delivery requests.

### Surfaces & Neutrals
- **Background (`#FBF6EC`):** Warm pastry cream tint. Soft on eyes during extended screen time, eliminating harsh sterile whites.
- **Surface / Card (`#FFFFFF`):** Pure white container surfaces layered above the warm cream background for crisp contrast.
- **Border / Divider (`#E8DFCC`):** Soft biscuit-toned structural line color for cards, table dividers, and input borders.
- **Text Main (`#3B2A1E`):** Deep roasted cocoa brown. Replaces harsh synthetic pure black with high-contrast, warm legibility.
- **Text Secondary (`#7A6A5C`):** Muted spice taupe for metadata, helper strings, timestamps, and secondary table headings.

### Operational Payment Status System
- **Lunas (Paid in Full):** `#2E8B57` (Sea Green). Indicates zero outstanding balance.
- **DP / Uang Muka (Partial Down Payment):** `#D99A00` (Warm Amber). Highlights orders requiring settlement prior to dispatch.
- **Belum Lunas (Unpaid):** `#B93A2E` (Crimson Brick). Instant visual flag for cash-on-delivery or pending receivables.

## Typography

The typography pairings unify warmth, structure, and operational legibility.

### Headline Font: Epilogue
Used with a semi-bold weight (600) for screen titles, metrics, modal headers, and order invoice names. Its structured geometric proportions echo the circular geometry of cookie jars, nastar rounds, and festive pastry packaging while maintaining authority.

### Body & Data Font: Inter
Used across all transaction records, batch lists, input fields, and financial figures.
- **Base Size:** 16px (`body-lg`) to prevent mobile auto-zooming on form fields and ensure immediate readability under kitchen lighting.
- **Currency & Numbers:** Indonesian Rupiah must be formatted with standard delimiters (`Rp 175.000`, `Rp 1.250.000`) utilizing tabular numbers (`font-variant-numeric: tabular-nums;`) for clean accounting alignment.
- **Date Formatting:** Normalized to Indonesian locale standard: `21 Okt 2026`.

## Layout & Spacing

The application employs a mobile-first responsive layout that evolves into an administrative dashboard for desktop monitors.

### Layout Rhythm & Grids
- **Mobile PWA Viewport (< 768px):** Single-column vertical stream. Global margins set to `16px` (`margin`). Navigation lives in an ergonomic bottom dock with the floating Gold action button anchored above it.
- **Tablet Viewport (768px - 1024px):** 2-column card layout with `16px` gutters (`gutter`). Navigation expands to a collapsible side drawer.
- **Desktop Dashboard (> 1024px):** Fixed 260px administrative sidebar paired with a fluid 12-column content area using `24px` gutters (`gutter-desktop`) and `32px` page canvas margins (`margin-desktop`). Max content container is capped at 1440px to retain scanability.

### Spacing Rules
- Element padding and stacked data use strict 4px/8px multiples (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px).
- Every touch target strictly adheres to a minimum touch boundary of 44×44px (with button heights defaulting to 48px).

## Elevation & Depth

Visual hierarchy uses **Tonal Warm Layering** supported by **Ambient Honey-Tinted Shadows**. Cold gray drop shadows are prohibited.

### Elevation Hierarchy
- **Level 0 (Background Canvas):** Base canvas `#FBF6EC`. Flat, un-shadowed.
- **Level 1 (Default Cards & Tables):** Surface `#FFFFFF` with a 1px solid border in `#E8DFCC`. Shadow is an ambient warm tint: `0 2px 8px -2px rgba(59, 42, 30, 0.05)`.
- **Level 2 (Dropdowns, Popovers & Active Cards):** Surface `#FFFFFF` with `0 6px 16px -4px rgba(59, 42, 30, 0.08)`. Border remains `#E8DFCC`.
- **Level 3 (Modal Sheets & Drawers):** Raised operational modal overlays. `0 12px 32px -6px rgba(59, 42, 30, 0.12)`.
- **Level 4 (Floating Action Button):** Accent Gold `#C8962E` with a directional warm shadow: `0 8px 20px -2px rgba(200, 150, 46, 0.35)`.

## Shapes

The shape system balances modern SaaS efficiency with soft, comforting edges.

### Corner Curvature Rules
- **Data & Content Cards:** Exactly `16px` border-radius (`rounded-lg`). Creates a friendly, soft containment boundary for order lists and production summaries.
- **Buttons, Form Inputs, & Select Boxes:** Exactly `12px` border-radius (`rounded-md`). Provides comfortable finger affordances on handheld screens.
- **Status Badges & Chips:** Completely rounded pills (`9999px` radius) to differentiate them from actionable rectangular inputs.
- **Floating Action Button (FAB):** Fully circular or `9999px` rounded pill.

## Components

All user interface labels and messages must strictly use formal Indonesian business vernacular (`Bahasa Indonesia`). Icons follow the thin, precise stroke language of Lucide Icons (2px stroke, 20px default dimension).

### 1. Buttons
- **Primary Button:** Height `48px`, radius `12px`. Background `#1F6F50`, text `#FFFFFF`, typography `label-md`. Hover/active state transitions to `#17583F`.
- **Secondary Button:** Height `48px`, radius `12px`. Background `#FFFFFF`, border 1px solid `#E8DFCC`, text `#3B2A1E`. Hover background `#FBF6EC`.
- **Destructive Button:** Background `#FFFFFF`, border 1px solid `#B93A2E`, text `#B93A2E`. Active fill transitions to `rgba(185, 58, 46, 0.08)`.
- **Floating Action Button (FAB):** Positioned bottom-right on mobile screens (16px from edge, above bottom bar). Size `56×56px` circular, or extended `48px` pill with icon plus text `+ Penjualan`. Background `#C8962E`, text `#FFFFFF`.

### 2. Form Inputs & Selectors
- **Input Fields:** Height `48px`, border-radius `12px`. Background `#FFFFFF`, 1px border `#E8DFCC`. Text color `#3B2A1E`, placeholder `#7A6A5C`. Focus ring: 2px solid `#1F6F50` with an outer halo of `rgba(31, 111, 80, 0.15)`.
- **Price Input:** Fixed prefix label `Rp` tinted in `#7A6A5C`, auto-formatting thousands separator during entry (e.g., `Rp 250.000`).

### 3. Order Status Chips
Pill-shaped badges with height `28px`, horizontal padding `12px`, typography `label-sm`:
- **Lunas:** Background `#EAF5EE`, text `#2E8B57`, border 1px solid `#B8E2C8`.
- **DP (Down Payment):** Background `#FDF6E2`, text `#9E7000`, border 1px solid `#F4DB96`. Includes remaining balance footnote where applicable.
- **Belum Lunas:** Background `#FBEBE9`, text `#B93A2E`, border 1px solid `#F1BFBA`.

### 4. Cards & Order List Items
- **Order Card:** White background (`#FFFFFF`), `16px` radius, 1px solid `#E8DFCC`.
- **Card Anatomy:** Header contains customer name and formatted invoice date (`21 Okt 2026`), followed by ordered jar items (e.g., `2x Nastar Wijsman`, `1x Kastengel Keju`), status pill on the right, and the total Rupiah value highlighted in `Inter 600` `#1F6F50`.

### 5. Checkboxes & Radio Buttons
- Box/circle size `20×20px` embedded inside a minimum `44×44px` invisible tap target. 
- Border 1.5px `#E8DFCC`, checked fill `#1F6F50` with pure white Lucide checkmark icon.

### 6. Production Batch Counter
- Dedicated batch counting stepper for kitchen tracking. Increment/decrement buttons are 44×44px with a center number display in `headline-md` `#3B2A1E`.