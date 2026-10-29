# Daleel (دليل) — Style Reference
> Playful, friendly guide on white paper

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

Daleel's interface treats the page like an approachable, structured storybook: white paper canvas, chubby rounded display type, and a primary vibrant royal blue (`#134daa`) that reads as 'clarity and guidance' the moment it appears. Body copy stays calm in mid-gray or muted slate so the primary blue and deep navy (`#162661`) can do all the emotional work — royal blue for progress, primary actions, and display headings, and slate blue (`#6380aa`) for interactive links and secondary actions. Components are pill-shaped or chunky-rounded with thick 2px borders, giving every button the feel of a tactile sticker pressed onto the page rather than a flat UI control.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Daleel Blue | `#134daa` | `--color-daleel-blue` | Primary brand color for display headings, primary CTA fills, and main progress indicators |
| Soft Sky | `#c4d7f2` | `--color-soft-sky` | Soft highlight wash on light surfaces, subtle background tints, and light links on dark/blue footer bands |
| Slate Accent | `#6380aa` | `--color-slate-accent` | Secondary blue accent for interactive links, tags, outlined secondary buttons, and emphasized short phrases |
| Deep Navy | `#162661` | `--color-deep-navy` | Hero headings, high-contrast dark surfaces, and deep text emphasis |
| Paper White | `#ffffff` | `--color-paper-white` | Page canvas, card surfaces, button text on blue/navy fills |
| Charcoal | `#4b4b4b` | `--color-charcoal` | Primary body copy — the workhorse dark text that lets blue headings stand out |
| Pencil Gray | `#777777` | `--color-pencil-gray` | Muted body paragraphs, secondary descriptive text — recedes so colored elements lead |
| Faded Gray | `#afafaf` | `--color-faded-gray` | Disabled or low-emphasis nav labels and neutral button borders |

## Tokens — Typography

### daleel-display — Display headlines for section titles — a rounded display face that gives the brand its approachable, friendly voice. Substitute with 'Feather Bold', 'Nunito Black', or 'Rubik Bold' (for Arabic/English) at matching weight. letter-spacing: -0.0200em · `--font-daleel-display`
- **Weights:** 700
- **Sizes:** 48px, 64px
- **Line height:** 1.20
- **Letter spacing:** -0.0200em
- **Role:** Display headlines for major section titles — a custom rounded display face that gives the brand its friendly, approachable voice. Substitute with 'Feather Bold' or 'Nunito Black' at matching weight. letter-spacing: -0.0200em

### daleel-sans — Body paragraphs and nav links at 17px/500 — a geometric sans that stays readable while letting weight 700 carry emphasis. Substitute with 'DIN Next', 'Inter', 'Nunito Sans', or 'IBM Plex Sans Arabic' · `--font-daleel-sans`
- **Weights:** 500
- **Sizes:** 13px, 14px, 15px, 17px, 19px, 32px
- **Line height:** 1.15, 1.18, 1.20, 1.21, 1.23, 1.33, 1.40, 1.41, 1.47
- **Letter spacing:** normal
- **Role:** Body paragraphs and nav links at 17px/500 — a geometric sans that stays readable while letting weight 700 carry emphasis.

### daleel-sans (Bold) — All weight-700 uses: uppercase nav labels at 15px (ls 0.0530em), subheadings at 19px and 32px, link emphasis at 13px. Same family as body — the visual distinction is weight, not face change. letter-spacing: 0.0530em on uppercase nav · `--font-daleel-sans`
- **Weights:** 700
- **Sizes:** 13px, 14px, 15px, 17px, 19px, 32px
- **Line height:** 1.23, 1.21, 1.33, 1.40, 1.20
- **Letter spacing:** 0.0530em
- **Role:** All weight-700 uses: uppercase nav labels at 15px (ls 0.0530em), subheadings at 19px and 32px, link emphasis at 13px. Same family as body — the visual distinction is weight, not face change.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| caption | — | — | 13px | 1.23 | — | `--text-caption` |
| nav-label | — | — | 15px | 1.33 | 0.795px | `--text-nav-label` |
| body | — | — | 17px | 1.18 | — | `--text-body` |
| subheading | — | — | 19px | 1.4 | — | `--text-subheading` |
| heading-sm | — | — | 32px | 1.2 | — | `--text-heading-sm` |
| heading | — | — | 48px | 1.2 | -0.96px | `--text-heading` |
| display | — | — | 64px | 1.2 | -1.28px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 80 | 80px | `--spacing-80` |
| 96 | 96px | `--spacing-96` |

### Border Radius

| Element | Value |
|---------|-------|
| links | 12px |
| buttons | 12px |
| nav-items | 12px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80-120px
- **Card padding:** 16-24px
- **Element gap:** 12px

## Components

### Primary CTA Button
**Role:** Filled royal blue button for 'Get started' and top-of-page conversion

Fill `#134daa` (Daleel Blue), white text, daleel-sans 700 at 15px uppercase with 0.0530em tracking, 12px border-radius, 16px horizontal padding. Optional bottom border in `#162661` for tactile depth, or flat fill. Sits directly on white canvas.

### Outlined Account Button
**Role:** Secondary CTA below primary on hero

Transparent fill, text in `#6380aa` (Slate Accent) or `#134daa`, daleel-sans 700 at 14px, 12px border-radius, 16px horizontal padding, 2px solid border in `#c4d7f2` or `#afafaf`. Pairs with the primary blue CTA as a calm ghost alternative.

### Nav Selector Pill
**Role:** Selector or tag in top header

Transparent fill, text in `#6380aa` at 15px uppercase with 0.0530em tracking, 12px border-radius, 10px vertical and 16px horizontal padding, 2px solid border in `#c4d7f2`. Behaves like a sticker tag.

### Section Headline
**Role:** Display heading for marketing sections

daleel-display 700 at 48-64px, line-height 1.2, letter-spacing -0.0200em, color `#134daa`. The signature voice of the brand — large, rounded, unmistakably Daleel Blue.

### Hero Headline
**Role:** Opening page headline above CTA

daleel-sans 700 at 32px, color `#162661` (Deep Navy). Provides deep authority while letting the vibrant `#134daa` CTA below it carry the interactive weight.

### Body Paragraph
**Role:** Marketing body text in sections

daleel-sans 500 at 17px, line-height 1.18, color `#777777` (Pencil Gray) or `#6380aa` (Slate Accent). Mid-tones intentionally recede so `#134daa` and `#162661` headlines dominate.

### Footer Background
**Role:** Full-width blue/navy band at bottom

`#162661` (Deep Navy) or `#134daa` (Daleel Blue) fill, white and `#c4d7f2` (Soft Sky) text labels, generous 48px vertical padding, contains site links and navigation grid. The colored surface that anchors the page.

### Footer Link Item
**Role:** Text links in footer nav

daleel-sans at small sizes, color `#c4d7f2` (Soft Sky) for links, `#ffffff` for section headers. 8px margin between items, stacked vertically.

### Category / Tag Pill
**Role:** Topic or category selector in mid-page band

Icon + label name in daleel-sans 700 at 15px uppercase, color `#162661`, inline arrangement with 10-12px gaps, subtle hover background in `#c4d7f2`.

### App Store Badge
**Role:** Download badge for mobile apps

Deep Navy (`#162661`) rectangular badge with white icon and daleel-sans text. Functions as a visual anchor on white sections.

### Section Feature Illustration
**Role:** Decorative character/guide illustration beside text

Flat colored illustrations placed in the right half of each section, no container or background. Illustrations use `#134daa`, `#162661`, `#c4d7f2`, and `#6380aa` alongside warm accent pops while the UI chrome stays strictly within the Daleel blue palette.

## Do's and Don'ts

### Do
- Use `#134daa` (Daleel Blue) for any heading or CTA that needs to read as 'action' or 'start' — it is the primary saturated color for large display text.
- Set display headlines at 48-64px in daleel-display 700 with -0.0200em letter-spacing; this rounded weight is the brand voice.
- Give every button and pill a 12px border-radius and pair it with a 2px solid border in `#c4d7f2`, `#6380aa`, or `#afafaf` — outlined buttons are first-class citizens, not a fallback.
- Reserve uppercase at 15px with 0.0530em tracking for nav labels and category pills; never apply it to body copy.
- Keep body text in `#777777` or `#4b4b4b` at 17px/500 so colored elements can lead.
- Use `#6380aa` (Slate Accent) for interactive links, secondary badges, and outlined secondary CTAs; it is the calm companion to the vibrant `#134daa`.
- Build sections as white-on-white with illustrations floating beside text; introduce `#134daa` and `#162661` at the footer band and within display headings.

### Don't
- Don't put bright `#134daa` text in long body paragraphs — body stays in `#777777` or `#4b4b4b` so the blue headlines own the page.
- Don't use sharp corners; even small tags and pills use 12px radius.
- Don't introduce complex drop shadows or blurry glass effects — Daleel's surfaces are flat sticker-like fills with crisp 2px borders.
- Don't use daleel-display at sizes below 48px; it is a display face only. Subheadings 19-32px use daleel-sans 700 in `#162661`.
- Don't place `#134daa` buttons directly on `#162661` backgrounds without a high-contrast border or switching the button fill to `#c4d7f2` (with `#162661` text).
- Don't over-saturate backgrounds; use `#c4d7f2` sparingly as a soft tint wash so the white canvas remains dominant.

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Paper White | `#ffffff` | Page canvas — every section sits on pure white |
| 1 | Soft Sky | `#c4d7f2` | Soft tint wash behind highlighted cards, tags, and active states |
| 2 | Daleel Blue | `#134daa` | Primary CTA fills and vibrant brand banners |
| 3 | Deep Navy | `#162661` | Deep anchor surface for footer band, hero text, and dark emphasis |

## Imagery

Illustration-driven guide language: flat 2D characters and modular UI graphics with rounded geometric shapes, bold `#162661` outlines, and soft fills in `#c4d7f2` and `#6380aa`. Illustrations sit beside text in the right half of each section on pure white, with no heavy containers. Iconography uses thick outlined strokes consistent with the rounded component style. Image density is moderate: each section gets one primary visual illustration, leaving the rest of the page to typography and whitespace.

## Layout

Single-column full-width sections stacked vertically, each ~800-900px tall. Max content width ~1200px centered. Sections alternate text-left/illustration-right with generous vertical breathing room (80-120px between sections). Minimal top navigation bar with the Daleel logo and action pill, reappearing as a sticky bar between sections. Footer is a full-bleed `#162661` or `#134daa` band spanning the page width. The rhythm is editorial: headline, paragraph, CTA, illustration, repeat.

## Agent Prompt Guide

Quick Color Reference:
- text (display heading): `#134daa`
- text (hero/heading dark): `#162661`
- text (body): `#777777`
- text (secondary/muted blue): `#6380aa`
- background (page): `#ffffff`
- background (soft tint / highlight): `#c4d7f2`
- background (footer band): `#162661`
- border (outlined button): `#c4d7f2` or `#afafaf`
- accent (interactive link): `#6380aa`
- primary action CTA: `#134daa`

Example Component Prompts:
1. Primary CTA Button: Fill `#134daa`, text `#ffffff`, daleel-sans 700 at 15px uppercase, 12px border-radius, 16px horizontal padding.
2. Outlined Secondary Button: Transparent fill, 2px solid border `#c4d7f2`, text `#134daa` or `#6380aa`, 12px border-radius.
3. Section Headline: daleel-display 700 at 48px, line-height 1.2, letter-spacing -0.0200em, color `#134daa`.
4. Hero Headline: daleel-sans 700 at 32px, line-height 1.2, color `#162661`.
5. Body Paragraph: daleel-sans 500 at 17px, line-height 1.18, color `#777777`, max-width ~480px to keep reading comfortable.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors — Daleel Palette */
  --color-daleel-blue: #134daa;
  --color-deep-navy: #162661;
  --color-soft-sky: #c4d7f2;
  --color-slate-accent: #6380aa;
  --color-paper-white: #ffffff;
  --color-charcoal: #4b4b4b;
  --color-pencil-gray: #777777;
  --color-faded-gray: #afafaf;

  /* Typography — Font Families */
  --font-daleel-display: 'daleel-display', 'Feather Bold', 'Nunito', 'Rubik', ui-sans-serif, system-ui, sans-serif;
  --font-daleel-sans: 'daleel-sans', 'Nunito Sans', 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.23;
  --text-nav-label: 15px;
  --leading-nav-label: 1.33;
  --tracking-nav-label: 0.795px;
  --text-body: 17px;
  --leading-body: 1.18;
  --text-subheading: 19px;
  --leading-subheading: 1.4;
  --text-heading-sm: 32px;
  --leading-heading-sm: 1.2;
  --text-heading: 48px;
  --leading-heading: 1.2;
  --tracking-heading: -0.96px;
  --text-display: 64px;
  --leading-display: 1.2;
  --tracking-display: -1.28px;

  /* Typography — Weights */
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1200px;
  --section-gap: 80-120px;
  --card-padding: 16-24px;
  --element-gap: 12px;

  /* Border Radius */
  --radius-xl: 12px;

  /* Named Radii */
  --radius-links: 12px;
  --radius-buttons: 12px;
  --radius-nav-items: 12px;

  /* Surfaces */
  --surface-paper-white: #ffffff;
  --surface-soft-sky: #c4d7f2;
  --surface-daleel-blue: #134daa;
  --surface-deep-navy: #162661;
}
```

### Tailwind v4

```css
@theme {
  /* Colors — Daleel Palette */
  --color-daleel-blue: #134daa;
  --color-deep-navy: #162661;
  --color-soft-sky: #c4d7f2;
  --color-slate-accent: #6380aa;
  --color-paper-white: #ffffff;
  --color-charcoal: #4b4b4b;
  --color-pencil-gray: #777777;
  --color-faded-gray: #afafaf;

  /* Typography */
  --font-daleel-display: 'daleel-display', 'Feather Bold', 'Nunito', 'Rubik', ui-sans-serif, system-ui, sans-serif;
  --font-daleel-sans: 'daleel-sans', 'Nunito Sans', 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;

  /* Typography — Scale */
  --text-caption: 13px;
  --leading-caption: 1.23;
  --text-nav-label: 15px;
  --leading-nav-label: 1.33;
  --tracking-nav-label: 0.795px;
  --text-body: 17px;
  --leading-body: 1.18;
  --text-subheading: 19px;
  --leading-subheading: 1.4;
  --text-heading-sm: 32px;
  --leading-heading-sm: 1.2;
  --text-heading: 48px;
  --leading-heading: 1.2;
  --tracking-heading: -0.96px;
  --text-display: 64px;
  --leading-display: 1.2;
  --tracking-display: -1.28px;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;

  /* Border Radius */
  --radius-xl: 12px;
}
```