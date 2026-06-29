# Rafay — Personal Site Style Reference
> Warm letterpress on cream paper for an AI Engineer's portfolio and blog — ink-black text on ivory stock, hand-drawn flourishes, and a single deliberate accent. Letterpress by day, lamplit sepia by night.

**Theme:** light + warm dark (smooth day/night toggle)

This is the design system for Rafay's personal site (portfolio first, then blog). It reads like a literary journal on cream paper — a warm ivory canvas (#faf9f5) under near-black ink (#141413), framed by taupe linen borders like printed margins. The interface is almost achromatic: color is rationed to a single dusty-blue accent. **Lora** — a warm, calligraphic serif — carries every word, display and body alike, replacing the original Anthropic Sans/Serif pairing to make the whole surface feel handwritten and editorial. Components are flat, border-defined, and gently rounded — the system trades drop shadows for hairline warmth. Scroll-driven, hand-drawn touches give it life: a pencil traces the margin of each blog post, and squiggly rules draw themselves between sections. A warm **dark mode** (sepia charcoal, never cold black) mirrors the light system through a smooth cross-fade, and an ambient music toggle lets readers set the mood while they read.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ivory Canvas | `#faf9f5` | `--color-ivory-canvas` | Page background, primary canvas — warm off-white that makes the interface feel like printed paper rather than a screen |
| Pure White | `#ffffff` | `--color-pure-white` | Card surfaces, input fields, elevated containers sitting atop the ivory canvas |
| Warm Parchment | `#f0eee6` | `--color-warm-parchment` | Secondary surface for subtle differentiation — toggle backgrounds, hover washes, muted zones |
| Ink Black | `#141413` | `--color-ink-black` | Primary text, dark filled buttons, high-emphasis UI elements — near-black with a warm cast |
| Charcoal | `#1f1e1d` | `--color-charcoal` | Secondary text, nav text, body copy — slightly lighter than Ink for hierarchical depth |
| Warm Slate | `#3d3d3a` | `--color-warm-slate` | Tertiary text, button labels, subdued body content — reads as soft graphite |
| Stone Gray | `#73726c` | `--color-stone-gray` | Muted helper text, captions, inactive nav items — quiet supporting voice |
| Pewter | `#9c9a92` | `--color-pewter` | Subtle icons, decorative strokes, low-emphasis inline elements |
| Linen Border | `#dedcd1` | `--color-linen-border` | Hairline borders, card outlines, dividers — the warm taupe that defines surfaces without harshness |
| Cool Stone | `#b7b7b5` | `--color-cool-stone` | Supporting neutral for secondary UI, dividers, and muted labels. Do not promote it to the primary CTA color |
| Dust Blue | `#ccdbe8` | `--color-dust-blue` | Sole chromatic accent — link states, decorative highlights, subtle wash backgrounds, icon tints. The only color in an otherwise monochrome system |

### Dark Mode — Warm Sepia

The night theme is the same letterpress logic inverted into warm, low-lit sepia — never a cold pure black. Semantic tokens flip on `.dark`; component recipes are unchanged.

| Role | Light | Dark | Token |
|------|-------|------|-------|
| Canvas (page) | `#faf9f5` | `#17150f` | `--canvas` |
| Surface (cards) | `#ffffff` | `#201d16` | `--surface` |
| Parchment (subtle) | `#f0eee6` | `#272319` | `--parchment` |
| Ink (primary text) | `#141413` | `#f3efe4` | `--ink` |
| Muted text | `#73726c` | `#b0a995` | `--muted` |
| Border (hairline) | `#dedcd1` | `#36322a` | `--border` |
| Accent (link) | `#5b7c99` | `#cdb892` | `--accent` |
| Pencil (graphite stroke) | `#3d3d3a` | `#d8cfb8` | `--pencil` |

## Tokens — Typography

### Lora — The whole voice of the site. One warm, calligraphic serif for display, headings, UI, and body alike. Lora's gentle brushed contrast reads as literary and handwritten without sacrificing screen legibility, which is exactly the editorial-journal feeling this site wants. Display headlines use the regular weight (400) at large sizes for quiet authority — no heavy 700 hero text. 500/600 carry section headings and emphasis; 700 is reserved for the rare strong label. Italics (400) are available for blockquotes and asides. Liga features enabled for refined ligatures. · `--font-serif`
- **Substitute:** Source Serif 4, PT Serif, or Georgia
- **Weights:** 400, 500, 600, 700
- **Sizes:** 13px, 17px, 18px, 24px, 30px, 56px
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **OpenType features:** `"liga"`
- **Role:** Single typeface for the entire interface — display, headings, UI labels, and long-form body. The serif-everywhere choice is the brand signature: it makes buttons and nav feel as considered as the prose. Set body at 17px / 1.7 for comfortable reading; let display sizes breathe with the regular weight rather than bold.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 11px | 1.5 | — | `--text-caption` |
| body | 15px | 1.63 | — | `--text-body` |
| subheading | 18px | 1.56 | — | `--text-subheading` |
| heading-sm | 24px | 1.33 | — | `--text-heading-sm` |
| heading | 30px | 1.33 | — | `--text-heading` |
| display | 56px | 1.2 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 8px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
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
| nav | 9.6px |
| cards | 16px |
| inputs | 9.6px |
| buttons | 9.6px |
| containers | 24px |
| hero-panels | 32px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 32px
- **Element gap:** 8px

## Components

### Primary Dark Button
**Role:** High-emphasis call-to-action for account creation, trial activation, and form submission

Filled with Charcoal (#1f1e1d), white (#ffffff) text in Anthropic Sans weight 430 at 15px. 9.6px border-radius. 20px horizontal padding, 8px vertical. No shadow, no border — the dark fill against the ivory canvas is the only visual weight needed. Examples: "Try Claude" in nav, "Continue with email" in auth form.

### Ghost Outlined Button
**Role:** Secondary action that needs visibility without competing with the primary CTA

Transparent fill, Charcoal (#1f1e1d) text in Anthropic Sans weight 430 at 15px. 9.6px border-radius. 20px horizontal padding, 8px vertical. Hairline border in Cool Stone (#b7b7b5) or Linen (#dedcd1). Example: "Contact sales" in nav bar.

### Download Button
**Role:** Platform-specific action with leading icon

Ghost button variant with a platform icon (Apple logo, etc.) preceding the label. Charcoal text, Linen border, 9.6px radius. Subdued visual weight to avoid competing with primary CTAs. Example: "Download desktop app" with Apple icon.

### Social Auth Button
**Role:** Third-party authentication entry point

White (#ffffff) fill, Charcoal text in Anthropic Sans weight 430 at 15px. 9.6px border-radius, Linen border. Provider icon (Google "G" in brand color) left-aligned with consistent 12px gap. Full-width within form container. No fill on hover — border darkens to Charcoal.

### Email Input Field
**Role:** Primary text input for email capture and form fields

White (#ffffff) fill, Linen (#dedcd1) 1px border. 9.6px border-radius. 16px horizontal padding, 12px vertical. Placeholder text in Stone Gray (#73726c). Focus state: border darkens to Charcoal (#1f1e1d) with no ring or shadow — the border transition is the focus indicator.

### Plan Pricing Card
**Role:** Pricing tier display for subscription plans

White (#ffffff) surface on Ivory Canvas background. Linen (#dedcd1) 1px border, 16px border-radius. 32px internal padding. Contains: decorative line-art icon at top, plan name in Anthropic Serif weight 400 at 24px, tagline in Anthropic Sans body-sm, price in Anthropic Serif weight 400 at 30px, full-width Primary Dark Button, and feature checklist below a hairline divider. No shadow — the border defines the card edge.

### Segmented Toggle
**Role:** Tab-style switch between plan categories or view modes

Anthropic Sans weight 500 at 14px. Two states: selected tab has white (#ffffff) fill with Linen border and Charcoal text on Warm Parchment (#f0eee6) track; unselected tab is text-only in Stone Gray. 9.6px radius on the track container and individual selected pill. 4px internal padding. Example: "Individual" / "Team and Enterprise" toggle above pricing grid.

### Feature Checklist Item
**Role:** Bulleted benefit list within plan cards and feature sections

Checkmark icon in Charcoal (#1f1e1d) at 16px, followed by Anthropic Sans weight 400 at 15px in Charcoal text. 12px vertical gap between items. The checkmark is a simple stroke — not a filled circle or decorative graphic.

### Navigation Bar
**Role:** Primary site navigation and brand identity

Transparent or Ivory Canvas background, no shadow or bottom border. Left: Claude logo (asterisk/sparkle glyph + wordmark). Center: nav links in Anthropic Sans weight 430 at 14px in Charcoal. Right: Ghost Button ("Contact sales") + Primary Dark Button ("Try Claude"). 16px gap between nav items. Logo wordmark in Charcoal.

### Logo Mark
**Role:** Brand identity — the Claude sparkle/asterisk icon and wordmark

Asterisk-like glyph in a warm orange/amber tone (subtle chromatic break from the monochrome system — this is the brand's signature mark, appearing only in the logo and favicon context). Wordmark "Claude" in Anthropic Serif weight 400. Logo sits at ~28px height in nav.

### Auth Form Card
**Role:** Login/signup container with stacked authentication options

White (#ffffff) surface, 16px border-radius, Linen border. 32px padding. Contains: Social Auth Button → "or" divider → Email Input + Primary Dark Button stacked vertically. Fine print below in Stone Gray at 12px. Subtle elevation through background contrast only — no shadow.

### Interactive Demo Panel
**Role:** Product showcase panel displaying Chat/Cowork toggle on a simulated workspace

Large rounded container (32px radius) on Ivory Canvas. White inner surface with Linen border. Contains a pill-shaped segmented control: "Chat" (active, white fill with subtle shadow or border) and "Cowork" (inactive, transparent). Cursor arrow as a decorative element suggesting interactivity. This panel is the visual counterweight to the auth form on the hero.

### Decorative Plan Icon
**Role:** Line-art illustration above each pricing tier name

Simple stroke illustration (tree, branching structure, tree-with-fruit) in Charcoal (#1f1e1d) stroke at ~40px height. Drawn at a consistent stroke weight, centered above the plan name. The organic line-art style softens the data-dense pricing card.

### Squiggly Divider
**Role:** Animated section break in long-form content (the blog's `<hr>` / `---`)

A hand-drawn sine-wave rule in graphite (`--pencil`) at 2.5px stroke, centered at ~420px max width. Hidden by default via `stroke-dasharray`; it *draws itself left-to-right* over ~1.1s the first time it scrolls into view, triggered by a global IntersectionObserver adding `.in-view`. No fill, rounded caps. Replaces every Markdown horizontal rule. Honors `prefers-reduced-motion` by rendering fully drawn with no animation. Reference: the Astro blog template's animated horizontal rules.

### Pencil Tracing Beam
**Role:** Reading-progress rail down the left margin of a blog post

A faint dashed guide line runs the full article height in `--border`; as the reader scrolls, a graphite stroke (`--pencil`) draws over it via scroll-linked `pathLength`, with a small line-art **pencil** riding the leading edge. Spring-smoothed for a hand-dragged feel. Desktop only (`md+`); hidden on narrow screens. The scroll-driven, hand-drawn answer to aceternity's tracing beam.

### Link Preview
**Role:** Hover card over the company names in the profile summary

Inline underlined link (decoration in `--border`, brightening to `--accent` on hover). On hover, a small framed screenshot (200×125) springs up above the text — a Pure White card with Linen border, 12px radius, no shadow. Image is a live microlink.io screenshot or a committed static asset. Pointer-events disabled on the popover so it never blocks the link. After aceternity's link-preview.

### Theme Toggle
**Role:** Day/night switch in the nav

36px square, Linen border, 9.6px radius, transparent fill that warms to Parchment on hover. Holds a stroke-only sun (light) or moon (dark) glyph in `--ink`. Flips the `.dark` class on `<html>` and persists to `localStorage`; initial state is set by an inline head script to prevent a flash. The whole page cross-fades colors over 0.5s.

### Music Toggle
**Role:** Ambient audio control, fixed bottom-right

A pill (`--surface` at 90% with backdrop blur, Linen border, fully rounded — the one place pill-rounding is allowed, as a floating control rather than a content button) with a three-bar equalizer that animates while playing. Persists playback across blog navigations via Astro View Transitions `transition:persist`. Hides itself gracefully if the track file is missing. Inspired by creative.inc.

### Project Video Card
**Role:** Portfolio entry showcasing a project demo

Pure White (dark: `--surface`) card, Linen border, 16px radius, no shadow. A 16:9 self-hosted `<video>` (lazy `preload="none"`, poster image, muted/loop/controls) sits flush at the top over a Parchment placeholder; title (Lora 24px 600), muted description, and hairline-bordered tag chips fill the 24px-padded body. Falls back to a "demo video coming soon" placeholder when no source is set.

## Do's and Don'ts

### Do
- Use Lora weight 400 at large sizes (up to 56px) for hero display headlines — let the serif breathe at regular weight rather than going bold
- Maintain the Ivory Canvas (#faf9f5) as the base background for all pages; never substitute pure white (#ffffff) at the page level
- Use 9.6px border-radius for all interactive elements (buttons, inputs, toggles, nav elements) — this is the system's defining corner treatment
- Use Linen (#dedcd1) 1px borders for card and container edges instead of drop shadows
- Use Charcoal (#1f1e1d) fill with white text for primary action buttons — the only acceptable filled-button treatment
- Use Lora weight 500–600 for section headings, button labels, and nav links; reserve 700 for rare strong labels
- Apply 32px padding inside cards and major content containers, 16-20px inside buttons and inputs
- Keep the palette nearly monochrome; use Dust Blue (#ccdbe8) only for link states and subtle accent washes, never for filled buttons
- Drive depth through semantic tokens that flip on `.dark`, and cross-fade colors over ~0.5s when the day/night toggle flips

### Don't
- Do not use drop shadows or box-shadow on cards, buttons, or containers — this system is flat and border-defined
- Do not use pure black (#000000) for body text — Ink (#141413) is the correct near-black with warm cast
- Do not use rounded pill shapes (border-radius: 9999px) for buttons — 9.6px is the maximum
- Do not use bold (700+) heavy weights for hero/display headings — Lora at 400 carries the editorial authority
- Do not introduce additional chromatic colors — Dust Blue is the sole accent in an achromatic system
- Do not use the Cool Stone border (#b7b7b5) for content cards — reserve it only for nav-level interactive elements
- Do not set body, headings, or display in a sans-serif — Lora is the single typeface for the entire interface
- Do not use cold pure black (#000000) for dark mode — the night theme is warm sepia charcoal (#17150f)
- Do not add gradients, glows, or color transitions to surfaces — warmth comes from the cream canvas, not visual effects

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Ivory Canvas | `#faf9f5` | Base page background — the warm off-white that defines the entire visual atmosphere |
| 1 | Pure White | `#ffffff` | Card surfaces, input fields, form containers — elements that need to lift off the canvas |
| 2 | Warm Parchment | `#f0eee6` | Tertiary surfaces for toggle tracks, subtle hover zones, and areas needing quiet differentiation from the base canvas |
| 3 | Charcoal Block | `#1f1e1d` | Inverted surface for primary buttons and interactive dark elements — the only non-white opaque surface in the light system |

## Elevation

This system deliberately avoids drop shadows. Depth and separation are achieved through three techniques instead: (1) hairline Linen borders (#dedcd1) that define edges with the subtlety of a printed rule line, (2) background contrast shifts between Ivory Canvas, Pure White, and Warm Parchment, and (3) the dark-to-light inversion of Primary Dark Buttons. This flat-but-bordered approach is a defining signature — it rejects the glassmorphism/neumorphism conventions of mainstream tech UI and instead references editorial print design, where pages have structure through typography and rules rather than depth illusions.

## Imagery

Minimal photographic imagery. The visual language is dominated by typography and line-art illustration rather than photography. The decorative plan icons (trees, branching structures) are hand-drawn-feeling line art at consistent stroke weight in Charcoal. The interactive demo panel uses a simulated product interface as the visual hero rather than a marketing photograph. The brand's asterisk/sparkle logo mark provides the only chromatic warmth in the identity. Overall: text-dominant with sparse, deliberate illustration accents — the interface is the product, not a photograph of it.

## Layout

Full-width pages with centered max-width content containers (~1200px). The hero follows a two-column split: left column holds the serif headline and auth form card, right column holds the interactive product demo panel. Both columns occupy roughly equal visual weight. Navigation is a clean top bar with logo left, links center, CTAs right. Section rhythm uses generous vertical spacing (64px section gaps) with alternating background bands — Ivory Canvas as the default, with cards in Pure White creating subtle section breaks. Content is left-aligned for body text and centered for hero headlines. The pricing section shifts to a three-column card grid with consistent card widths. No dark sections — the entire page stays in the light/warm spectrum with only the Primary Dark Buttons providing contrast.

## Agent Prompt Guide

**Quick Color Reference**
- Page background: #faf9f5 (Ivory Canvas)
- Card surface: #ffffff (Pure White)
- Primary text: #141413 (Ink Black)
- Secondary text: #1f1e1d (Charcoal)
- Borders: #dedcd1 (Linen)
- Accent: #ccdbe8 (Dust Blue)
- primary action: no distinct CTA color

**Example Component Prompts**

No distinct primary action color was observed; use the extracted neutral button treatments instead of inventing a filled CTA color.



4. Build a form input: White (#ffffff) fill, #dedcd1 1px border, 9.6px radius, 16px×12px padding. Placeholder text in #73726c at 15px Anthropic Sans weight 400. On focus: border transitions to #1f1e1d with no ring or shadow.

5. Create a segmented toggle: Warm Parchment (#f0eee6) track, 9.6px radius, 4px padding. Active segment: white fill with #dedcd1 border, #141413 text at 14px Anthropic Sans weight 500. Inactive segment: transparent, #73726c text.

## Typographic System

The single-typeface approach is the core brand signature: **Lora** sets everything — display headlines, section headings, plan names, prices, hero text, *and* all functional UI (buttons, nav, body, labels, inputs). There is no serif/sans boundary to manage; warmth and hierarchy come from weight (400 body and display, 500–600 headings and labels, 700 rare emphasis) and size, not from switching families. Display sizes stay at weight 400 — this is not a brand that shouts with its type. Letter-spacing stays at normal across all sizes — no tracked-out caps, no tight display tracking. The "liga" feature is enabled to ensure refined ligatures in all contexts.

## Similar Brands

- **Linear** — Same editorial restraint with serif-influenced display type, hairline borders instead of shadows, and a warm minimal palette that rejects generic SaaS conventions
- **Notion** — Similar warm-toned minimal interface with clean typography hierarchy and flat border-defined components rather than heavy elevation
- **Stripe** — Shared approach of using refined typography (Stripe uses its own custom serif/sans pairing) and generous whitespace with a nearly monochromatic palette punctuated by a single accent
- **Arc Browser** — Both systems use warm cream/off-white canvases with near-black text, creating a paper-like editorial feel rather than the typical stark-white tech aesthetic

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-ivory-canvas: #faf9f5;
  --color-pure-white: #ffffff;
  --color-warm-parchment: #f0eee6;
  --color-ink-black: #141413;
  --color-charcoal: #1f1e1d;
  --color-warm-slate: #3d3d3a;
  --color-stone-gray: #73726c;
  --color-pewter: #9c9a92;
  --color-linen-border: #dedcd1;
  --color-cool-stone: #b7b7b5;
  --color-dust-blue: #ccdbe8;

  /* Typography — Font Family (Lora for everything) */
  --font-serif: 'Lora', ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.5;
  --text-body: 15px;
  --leading-body: 1.63;
  --text-subheading: 18px;
  --leading-subheading: 1.56;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1.33;
  --text-heading: 30px;
  --leading-heading: 1.33;
  --text-display: 56px;
  --leading-display: 1.2;

  /* Typography — Weights (Lora) */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
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
  --section-gap: 64px;
  --card-padding: 32px;
  --element-gap: 8px;

  /* Border Radius */
  --radius-lg: 9.6px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-3xl-2: 32px;

  /* Named Radii */
  --radius-nav: 9.6px;
  --radius-cards: 16px;
  --radius-inputs: 9.6px;
  --radius-buttons: 9.6px;
  --radius-containers: 24px;
  --radius-hero-panels: 32px;

  /* Surfaces */
  --surface-ivory-canvas: #faf9f5;
  --surface-pure-white: #ffffff;
  --surface-warm-parchment: #f0eee6;
  --surface-charcoal-block: #1f1e1d;
}
```

### Dark Mode (warm sepia)

Semantic tokens flip on `.dark`; everything else stays the same.

```css
.dark {
  --canvas: #17150f;
  --surface: #201d16;
  --parchment: #272319;
  --ink: #f3efe4;
  --muted: #b0a995;
  --faint: #8a8474;
  --border: #36322a;
  --accent: #cdb892;
  --dust: #33414d;
  --pencil: #d8cfb8;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-ivory-canvas: #faf9f5;
  --color-pure-white: #ffffff;
  --color-warm-parchment: #f0eee6;
  --color-ink-black: #141413;
  --color-charcoal: #1f1e1d;
  --color-warm-slate: #3d3d3a;
  --color-stone-gray: #73726c;
  --color-pewter: #9c9a92;
  --color-linen-border: #dedcd1;
  --color-cool-stone: #b7b7b5;
  --color-dust-blue: #ccdbe8;

  /* Typography (Lora for everything) */
  --font-serif: 'Lora', ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.5;
  --text-body: 15px;
  --leading-body: 1.63;
  --text-subheading: 18px;
  --leading-subheading: 1.56;
  --text-heading-sm: 24px;
  --leading-heading-sm: 1.33;
  --text-heading: 30px;
  --leading-heading: 1.33;
  --text-display: 56px;
  --leading-display: 1.2;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;

  /* Border Radius */
  --radius-lg: 9.6px;
  --radius-2xl: 16px;
  --radius-3xl: 24px;
  --radius-3xl-2: 32px;
}
```
