# FUTAVerse Design System
### Direction: The Convocation Line

> A verified, university-anchored network, designed like the credential it actually is. Every visual decision below serves one idea: **trust is earned and shown, not decorated.**

---

## 0. How to read this document

This replaces the earlier "Direction D — Professional Grounded" draft in full; it is not a patch on top of it. Where I introduce a rule that contradicts that draft (color roles, radius philosophy, type pairing), the reason is explained inline rather than assumed.

I do not have access to the FUTAVerse codebase in this session — only `product-overview.md` and the four Pass 1 mockups I built. So this document is honest about two things throughout:

- **What's locked**: token values, ratios, and rules I've derived and verified myself (color math, contrast, type scale).
- **What's assumed**: anything inferred from your previous agent's doc (Tailwind v4, `.dark` class toggling, shadcn as the component layer) that I haven't verified against your actual repo. These are flagged where they appear and listed again in §14.

Per your `/write-spec` convention, §12 and §13 are left intentionally empty — they get filled in as your agent audits real screens and real installed components, not guessed at here.

---

## 1. The Concept, Stated Plainly

FUTAVerse's entire value proposition rests on one fact: **you cannot get in without a real matriculation number.** That's not a footnote in the product — it's the product. A generic "LinkedIn for FUTA" reading of this brief gives you generic SaaS. The Convocation Line instead borrows from the one visual system Nigerian universities already use to signal earned, verified status: **academic regalia** — gowns, hoods, and the wax seal on a certificate.

Three ideas carry the whole system:

1. **Squares are records. Circles are people.** Every rectangular surface (cards, inputs, containers) stays close to zero radius, like a printed document. The only circles in the interface are identity — avatars, verification rings, the seal. This is a hard rule, not a style preference (see §6).
2. **Gold is rare on purpose.** Brass/gold reads as "verified" or "achieved" only because it is almost never used for anything else. If it decorated every button, it would mean nothing.
3. **Indigo and oxblood are roles, not preferences.** Indigo marks the institution and, by extension, students (the base population). Oxblood marks alumni — the earned, graduated status. This mirrors how hood-trim colors work at a real convocation: color tells you where someone stands before you read a word of copy.

---

## 2. Design Principles

- **Restraint is the credibility signal.** An academic institution doesn't sell itself with gradients and bounce. Every generous, expressive choice (the seal's circular form, Fraunces at large sizes) is spent against a disciplined, quiet field — sharp cards, a tight neutral palette, no decorative shadows.
- **Structure encodes real status.** Badges, rings, and dividers are never purely decorative — a gold ring means "verified," a dashed ring means "pending," a rule under a heading marks a real section break. If a structural device doesn't encode something true, cut it.
- **One risk, spent once.** The seal/ID-ring motif (§10.5) is the single distinctive element this direction is remembered by. Everything else — type scale, spacing, motion — stays disciplined so the seal has room to be the one thing anyone points at.
- **Nothing here is generic-default by accident.** See §2.1 for the explicit self-critique against current AI-generated design patterns, since that's the trap this direction had to actively steer around.

### 2.1 Self-critique against generic patterns

The stone-white background sits in the same neighborhood as the clichéd warm-cream-serif-terracotta combination currently over-represented in AI-generated design. Three deliberate choices pull it out of that bucket:
- The accent family is indigo/oxblood/brass — there is no terracotta or warm clay anywhere in the palette.
- The layout logic is document-and-seal, not magazine-and-hero. Nothing here reads as an editorial blog template.
- The signature element (§10.5) is functional — it encodes real verification state — not a decorative flourish sitting on top of an otherwise-generic card grid.

The risk to keep watching for during implementation: if the seal motif gets diluted or reused decoratively on non-identity elements, this direction collapses into "generic elegant institutional site." Guard it. See §10.5's explicit do/don't list.

---

## 3. Color System

### 3.1 What each color means (read this before the tables)

| Color | Concept | Governs |
|---|---|---|
| **Indigo** | The institution itself | Primary actions, links, active navigation, default verification ring (students) |
| **Oxblood (Maroon)** | Earned / graduated status | Alumnus-attributed content, alumnus verification ring, secondary actions |
| **Brass (Gold)** | The wax seal — verified, achieved | The verification badge, high-trust conversion actions (Apply, Get ticket), the Mentorship category (the platform's centerpiece engagement type) |
| **Forest Green** | Ratified / confirmed | Success states, completed engagements, Events category, positive availability ("slots open") |
| **Destructive Red** | Error / irreversible action only | Deletions, failed states, form errors — deliberately a different hue from oxblood so "alumnus" and "error" are never visually confused |

**Rule:** gold is reserved for verification and the mentorship category only. It must never be used as a generic "featured" or "premium" flag elsewhere — that's exactly the dilution that neutralizes what a wax seal means.

### 3.2 Light mode tokens

All values below are computed in OKLCH first, then converted to sRGB hex — not eyeballed. Every text-on-tint pairing listed in §3.4 has been contrast-checked against WCAG 2.1.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--color-bg` | `oklch(0.97 0.004 91.4)` | `#F6F5F2` | Page background — stone white, cooler than a warm cream |
| `--color-surface` | `oklch(1.00 0.000 0.0)` | `#FFFFFF` | Card, popover, modal background |
| `--color-surface-2` | `oklch(0.95 0.008 91.5)` | `#EFEDE7` | Sidebar panels, recessed/alternate surfaces |
| `--color-ink` | `oklch(0.23 0.027 287.4)` | `#1C1B29` | Primary text — near-black indigo ink |
| `--color-ink-soft` | `oklch(0.47 0.026 294.0)` | `#5B5868` | Secondary text, descriptions |
| `--color-ink-faint` | `oklch(0.63 0.028 295.2)` | `#8B879A` | Placeholder / disabled text only — see §3.4 note |
| `--color-line` | `oklch(0.89 0.014 88.7)` | `#DEDAD0` | Default borders, dividers |
| `--color-line-strong` | `oklch(0.81 0.022 88.7)` | `#C7C1B2` | Emphasized dividers, input borders on hover |
| `--color-indigo` | `oklch(0.31 0.101 285.9)` | `#2E2560` | Primary — CTAs, links, active nav, student ring |
| `--color-indigo-hover` | `oklch(0.27 0.087 286.4)` | `#241C4D` | Primary pressed/hover |
| `--color-indigo-soft` | `oklch(0.94 0.018 296.6)` | `#EDEAF7` | Primary tint background (badges, selected states) |
| `--color-maroon` | `oklch(0.39 0.125 17.9)` | `#7A1F2B` | Secondary — alumnus identity, internship category |
| `--color-maroon-hover` | `oklch(0.34 0.107 16.8)` | `#631823` | Secondary pressed/hover |
| `--color-maroon-soft` | `oklch(0.95 0.015 12.4)` | `#F7E9EA` | Secondary tint background |
| `--color-gold` | `oklch(0.65 0.118 77.6)` | `#B8862E` | Verification, achievement, mentorship category |
| `--color-gold-hover` | `oklch(0.57 0.105 76.7)` | `#9A6E22` | Gold pressed/hover (on gold surfaces) |
| `--color-gold-soft` | `oklch(0.95 0.025 86.9)` | `#F7EFDD` | Gold tint background |
| `--color-gold-on-soft` | `oklch(0.52 0.118 77.6)` | `#8B5F00` | **Text-safe gold** — use for any text sitting on `gold-soft` (see §3.4) |
| `--color-green` | `oklch(0.48 0.078 161.1)` | `#2F6B4F` | Confirmation — events, completed states |
| `--color-green-hover` | `oklch(0.41 0.065 161.6)` | `#24543E` | Green pressed/hover |
| `--color-green-soft` | `oklch(0.95 0.014 155.6)` | `#E7F1EA` | Green tint background |
| `--color-destructive` | `oklch(0.50 0.178 28.7)` | `#B3261E` | Errors, destructive actions |
| `--color-destructive-hover` | `oklch(0.42 0.178 28.7)` | `#950003` | Destructive pressed/hover |
| `--color-destructive-soft` | `oklch(0.95 0.019 25.6)` | `#FBEAE8` | Destructive tint background |

### 3.3 Dark mode tokens

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--color-bg` | `oklch(0.19 0.018 289.7)` | `#14131C` | Page background — deep ink navy |
| `--color-surface` | `oklch(0.24 0.027 290.7)` | `#1E1C2A` | Card, popover, modal background |
| `--color-surface-2` | `oklch(0.26 0.035 288.6)` | `#242235` | Sidebar panels, recessed surfaces |
| `--color-ink` | `oklch(0.94 0.010 87.5)` | `#EDEAE3` | Primary text |
| `--color-ink-soft` | `oklch(0.73 0.030 294.4)` | `#A9A5BA` | Secondary text |
| `--color-ink-faint` | `oklch(0.55 0.043 293.1)` | `#726D89` | Placeholder / disabled text only |
| `--color-line` | `oklch(0.31 0.036 291.1)` | `#312E42` | Default borders |
| `--color-line-strong` | `oklch(0.39 0.049 291.8)` | `#443F5C` | Emphasized dividers, hover borders |
| `--color-indigo` | `oklch(0.63 0.152 288.3)` | `#8676DE` | Primary |
| `--color-indigo-hover` | `oklch(0.70 0.130 289.7)` | `#9C8EE8` | Primary hover (lighter, dark-bg convention) |
| `--color-indigo-soft` | `oklch(0.29 0.061 287.4)` | `#2A2648` | Primary tint background |
| `--color-indigo-on-soft` | `oklch(0.67 0.152 288.1)` | `#9283EC` | **Text-safe indigo** on `indigo-soft` |
| `--color-maroon` | `oklch(0.61 0.122 13.5)` | `#C0616D` | Secondary |
| `--color-maroon-hover` | `oklch(0.67 0.107 12.0)` | `#CD7883` | Secondary hover |
| `--color-maroon-soft` | `oklch(0.28 0.041 10.1)` | `#3A2024` | Secondary tint background |
| `--color-maroon-on-soft` | `oklch(0.66 0.122 13.8)` | `#D2717C` | **Text-safe maroon** on `maroon-soft` |
| `--color-gold` | `oklch(0.76 0.128 82.0)` | `#D9A845` | Verification, achievement, mentorship |
| `--color-gold-hover` | `oklch(0.81 0.108 83.2)` | `#E4BC6D` | Gold hover |
| `--color-gold-soft` | `oklch(0.32 0.030 81.6)` | `#3A3121` | Gold tint background |
| `--color-gold-on-soft` | `oklch(0.76 0.128 82.0)` | `#D9A845` | Same as base — already passes AA here |
| `--color-green` | `oklch(0.68 0.091 162.8)` | `#5FA987` | Confirmation |
| `--color-green-hover` | `oklch(0.76 0.088 161.9)` | `#7BC29F` | Green hover |
| `--color-green-soft` | `oklch(0.32 0.043 160.9)` | `#1E3A2C` | Green tint background |
| `--color-green-on-soft` | `oklch(0.69 0.091 162.9)` | `#63AD8B` | **Text-safe green** on `green-soft` |
| `--color-destructive` | `oklch(0.66 0.155 26.0)` | `#E0655D` | Errors |
| `--color-destructive-hover` | `oklch(0.72 0.155 26.0)` | `#F67970` | Destructive hover |
| `--color-destructive-soft` | `oklch(0.28 0.039 24.8)` | `#3A211F` | Destructive tint background |
| `--color-destructive-on-soft` | `oklch(0.67 0.155 26.3)` | `#E56A61` | **Text-safe destructive** on `destructive-soft` |

### 3.4 Contrast audit (why the `-on-soft` tokens exist)

I ran every text-on-tint pairing through WCAG 2.1 before finalizing anything. Two real problems turned up, and both are fixed by the tokens above rather than by a footnote:

- **`gold` directly on `gold-soft` fails outright** (2.83:1 — a hard fail, not borderline). This is a real trap: gold badge text on a gold tint background is the single most likely combination someone reaches for by instinct, and it doesn't work at any normal text size. `gold-on-soft` (`#8B5F00` light / same as base in dark) fixes it to 4.5–5.6:1 across every background it can land on.
- **Four dark-mode accent-on-soft pairings landed at 3.4–4.4:1** (AA-large only) — indigo, maroon, green, and destructive text sitting on their own tint backgrounds in dark mode. Each has a corresponding `-on-soft` token that clears 4.5:1 without changing the color's identity enough to notice.

**Rule:** any time text sits directly on a `*-soft` background (badge labels, tag text, inline callouts), use the `*-on-soft` variant, not the base color. The base `indigo`/`maroon`/`green`/`gold`/`destructive` tokens are for icons, rings, borders, and solid-fill buttons — contexts where the pairing is against `surface` or `bg`, not against the matching tint.

**`ink-faint` is exempt from AA** (3.48:1 light / 3.40:1 dark) — reserved exclusively for placeholder text and disabled controls, which WCAG 1.4.3 doesn't require to meet body-text contrast. Do not use it for any text a person is expected to read as content.

### 3.5 Bridging to shadcn (if applicable)

I haven't verified shadcn is actually installed in your repo — your previous agent's doc referenced shadcn component variants, so I'm carrying that assumption forward, flagged. If it is, map the concept tokens above onto shadcn's expected slots like this:

| shadcn slot | Maps to |
|---|---|
| `--background` / `--foreground` | `bg` / `ink` |
| `--card` / `--card-foreground` | `surface` / `ink` |
| `--popover` / `--popover-foreground` | `surface` / `ink` |
| `--primary` / `--primary-foreground` | `indigo` / `surface` (white text) |
| `--secondary` / `--secondary-foreground` | `maroon` / `surface` — **note:** unlike a typical shadcn secondary (a neutral low-emphasis button), this secondary is reserved for alumnus-attributed UI specifically. For a generic low-emphasis button, use the `outline` or `ghost` variant instead, not `secondary`. |
| `--muted` / `--muted-foreground` | `surface-2` / `ink-soft` |
| `--accent` / `--accent-foreground` | `gold` / `gold-on-soft` |
| `--destructive` / `--destructive-foreground` | `destructive` / `surface` |
| `--border` / `--input` | `line` |
| `--ring` | `indigo` |

`green` has no natural shadcn slot — expose it as a standalone `--success` / `--success-foreground` extension alongside the base set, which shadcn's token system supports natively.

---

## 4. Typography

### 4.1 Typeface rationale

**Fraunces** (display) + **IBM Plex Sans** (body/UI) + **IBM Plex Mono** (data/verification).

This is a deliberate departure from the earlier draft's Crimson Pro + DM Sans pairing. Fraunces is a variable serif with real range — it can sit formal and engraved at small sizes and get expressive at display sizes without switching families. IBM Plex Sans and Plex Mono share the same design lineage (both are IBM's Plex superfamily), so body text and data/ID text read as members of the same disciplined system rather than two unrelated fonts glued together — appropriate for a platform whose whole premise is a verified record system.

**Do not** substitute a generic humanist sans (Inter, Work Sans) for the body role here as a "safe" swap — the Plex pairing is specifically chosen so mono data (matric numbers, timestamps) feels like it belongs to the same family as the sans body text, not like a bolted-on afterthought.

### 4.2 Fraunces variable axis settings — this matters

Fraunces ships four variable axes: `wght`, `opsz` (optical size), `SOFT`, and `WONK`. `WONK` introduces intentionally eccentric, quirky letterforms — appropriate for a playful editorial brand, wrong for this one. **Set `SOFT: 0` and `WONK: 0` everywhere, no exceptions.** The type stays sharp and formal; the *only* soft, rounded form in the entire interface is the seal (§10.5). That contrast — disciplined type against one soft circular signature — is intentional and should not be blurred by letting the type get soft too.

```css
/* Display headings */
font-variation-settings: "opsz" 72, "SOFT" 0, "WONK" 0; /* display-2xl */
font-variation-settings: "opsz" 48, "SOFT" 0, "WONK" 0; /* display-xl / display-lg */
font-variation-settings: "opsz" 24, "SOFT" 0, "WONK" 0; /* display-md (card titles) */
```

### 4.3 Type scale

| Token | Size | Font / Weight | Line height | Letter spacing | Fraunces `opsz` | Usage |
|---|---|---|---|---|---|---|
| `display-2xl` | `clamp(2.25rem, 4vw, 3rem)` | Fraunces 600 | 1.08 | −0.01em | 72 | Landing hero only |
| `display-xl` | `1.875rem` (30px) | Fraunces 500 | 1.15 | −0.005em | 48 | Dashboard page headers |
| `display-lg` | `1.5rem` (24px) | Fraunces 500 | 1.2 | 0 | 36 | Section headers |
| `display-md` | `1.1875rem` (19px) | Fraunces 500 | 1.3 | 0 | 24 | Card titles |
| `body-lg` | `0.9375rem` (15px) | Plex Sans 400 | 1.6 | 0 | — | Long-form descriptions |
| `body` | `0.875rem` (14px) | Plex Sans 400 | 1.55 | 0 | — | Default UI text |
| `body-sm` | `0.8125rem` (13px) | Plex Sans 400 | 1.5 | 0 | — | Secondary descriptions |
| `label` | `0.8125rem` (13px) | Plex Sans 600 | 1.4 | 0 | — | Form labels, poster names |
| `caption` | `0.75rem` (12px) | Plex Sans 400 | 1.45 | 0 | — | Roles, secondary metadata |
| `meta` | `0.6875rem` (11px) | Plex Mono 400/500 | 1.4 | +0.02em | — | Matric IDs, timestamps, counts |
| `overline` | `0.6875rem` (11px) | Plex Sans 600, uppercase | 1.4 | +0.1em | — | Category kickers, badges |

**Numerals:** any figure a user needs to compare or scan precisely — matric numbers, ₦ amounts, slot counts, dates — uses Plex Mono with `font-variant-numeric: tabular-nums`. This is not a stylistic flourish; it's why the mono face exists in this system at all — a matric ID is a record, and records should look like records.

---

## 5. Spacing & Layout

### 5.1 Base grid

4px base unit. Every spacing value is a multiple of 4.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Icon-to-label gaps, tight internal padding |
| `--space-2` | 8px | Tag/chip padding, small gaps |
| `--space-3` | 12px | Form field gaps, meta-row gaps |
| `--space-4` | 16px | Compact card padding, list item gaps |
| `--space-5` | 20px | Standard section gaps |
| `--space-6` | 24px | Standard card padding, sidebar item padding |
| `--space-8` | 32px | Compact section padding |
| `--space-10` | 40px | Sidebar horizontal padding |
| `--space-12` | 48px | Standard section padding |
| `--space-16` | 64px | Spacious section padding, hero padding |

### 5.2 Layout patterns

- **Page shell**: fixed sidebar (`264px`) + fluid main content, matching the dashboard structure already described in the product overview.
- **Main content max-width**: `1120px`, centered, with `48px` horizontal padding at desktop, collapsing to `20px` at mobile.
- **Card grid**: `grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 20px;`
- **Sidebar composition, top to bottom**: brand mark → primary nav → verification/record card (§10.5) pinned near the bottom, never at the very top — the seal is a credential you carry, not a logo lockup.

---

## 6. Radius — the core geometric rule

This is the one rule everything else in the component layer defers to: **rectangles stay close to zero radius; circles are reserved for identity.** A card, input, or button is a record — it should look printed, not squeezed. An avatar, ring, or badge is a person — it earns the soft form.

| Token | Value | Usage |
|---|---|---|
| `--radius-none` | 0px | Table cells, full-bleed containers, dividers |
| `--radius-xs` | 2px | Inputs, tags, chips, small controls |
| `--radius-sm` | 3px | Buttons |
| `--radius-md` | 4px | Cards, modals, dropdowns — **this is the ceiling for every rectangular surface in the system** |
| `--radius-full` | 9999px | **Reserved exclusively** for the seal, avatars, profile photos, and status dots. Never apply to a card, button, input, or container. |

If a future component needs more than 4px on a rectangle to "feel right," that's a signal to redesign the component, not to add a `--radius-lg` token.

---

## 7. Elevation & Shadows

Shadows are neutral (ink-tinted), never colored, and used sparingly — a document doesn't cast a coloured shadow.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--shadow-xs` | `0 1px 2px oklch(0.23 0.027 287.4 / 0.06)` | `0 1px 2px oklch(0 0 0 / 0.30)` | Resting card |
| `--shadow-sm` | `0 8px 24px oklch(0.23 0.027 287.4 / 0.05)` | `0 8px 30px oklch(0 0 0 / 0.35)` | Card on hover, popovers |
| `--shadow-focus` | `0 0 0 3px oklch(0.31 0.101 285.9 / 0.35)` | `0 0 0 3px oklch(0.63 0.152 288.3 / 0.40)` | Visible keyboard focus — required on every interactive element, no exceptions |
| `--shadow-seal` | `inset 0 1px 1px oklch(1 0 0 / 0.6), 0 1px 3px oklch(0.23 0.027 287.4 / 0.18)` | `inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 3px oklch(0 0 0 / 0.4)` | The verification ring only — a subtle emboss, like a stamp pressed into paper |

---

## 8. Motion

The pacing should feel like a ceremony, not a consumer app: deliberate, settled, never bouncy or springy.

| Property | Duration | Easing | Usage |
|---|---|---|---|
| Color / background / border | 200ms | `ease-out` | Hover, focus, active states |
| Box shadow | 180ms | `ease-out` | Button and card hover lift |
| Opacity (fade in/out) | 220ms | `ease-out` | Modal, toast, dropdown entry |
| **Seal confirmation** (see below) | 320ms | `cubic-bezier(0.16, 1, 0.3, 1)` | The one orchestrated motion moment in the system |

**The one deliberate motion moment**: when a profile becomes verified, or an application/offer is accepted, the seal briefly scales from 92% to 100% with a fade-in, using the settling `cubic-bezier(0.16, 1, 0.3, 1)` curve — a stamp coming down, not a bounce. This animation is reserved for genuine verification/confirmation events only. It does not run on page load, on hover, or on routine list updates. `prefers-reduced-motion` disables it entirely (swap to an instant opacity change).

No spring physics anywhere. No stagger animations on feed lists. No scale-on-hover for buttons.

---

## 9. Iconography

Thin architectural line icons, `1.5px` stroke, no fills, no rounded-blob icon sets — icons should read like technical drawing marks on a document, consistent with the sharp-rectangle rule in §6. **Phosphor Icons (Light weight)** or **Lucide** both fit; avoid anything with a playful/rounded default stroke (e.g. Heroicons' solid set, Feather's rounded caps at large sizes). *This is a recommendation, not a verified constraint — confirm against whatever icon set is already installed before introducing a second one.*

---

## 10. Component Conventions

### 10.1 Buttons

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| `default` (primary) | `indigo` | `surface` (white) | none | `indigo-hover` |
| `secondary` | `maroon` | `surface` (white) | none | `maroon-hover` — alumnus-attributed actions only, see §3.5 |
| `gold` | `gold` | **`ink`, never white** | none | `gold-hover` |
| `outline` | transparent | `ink` | `line-strong` | border → `indigo`, bg → `indigo-soft` |
| `ghost` | transparent | `ink-soft` | none | bg → `surface-2` |
| `destructive` | `destructive` | `surface` (white) | none | `destructive-hover` |
| `link` | transparent | `indigo` | none | underline, offset 3px |

**Why gold buttons use ink text, not white:** white-on-gold measures 3.24:1 — AA-large only, which fails for normal button label sizes. Ink-on-gold measures 5.24:1. This is a hard rule, not a preference, and it's the reason the gold button variant looks different from the others (dark text on a light-mid-tone fill) — don't "fix" it to match the white-text pattern of the other variants.

Sizes: `sm` (32px height, `body-sm`), `default` (38px height, `body`), `lg` (44px height, `body-lg`). Radius: `--radius-sm` (3px) on all sizes.

### 10.2 Inputs

- Height: `42px`. Radius: `--radius-xs` (2px).
- Border: `1.5px solid var(--color-line)`; on focus, `var(--color-indigo)` + `--shadow-focus`.
- Background: `surface`. Placeholder text: `ink-faint`.

### 10.3 Cards

- Radius: `--radius-md` (4px). Padding: `--space-6` (24px). Border: `1px solid var(--color-line)`.
- Shadow: `--shadow-xs` at rest, `--shadow-sm` on hover, paired with `border-color` shifting to `line-strong`.
- **Feed card anatomy** (top to bottom): role badge (top-right corner, absolute) → category kicker with gold rule → title (`display-md`) → description (`body-sm`) → metadata row (mono, `meta`) → footer with poster identity (§10.5 mini ring) + primary action button.

### 10.4 Badges & Tags

- Border-only style: `1px solid` in the token's on-soft color, background in the matching `*-soft` token, text in `*-on-soft`.
- Radius: `--radius-xs` (2px) — deliberately sharper than cards, since a badge reads more like a stamped label than a container.
- Size: `overline` scale, padding `4px 10px`.
- **Category mapping**: Mentorship → gold. Internship → maroon. Event → green. Milestone/completed post → green with a small "Closed"/"Verified" stamp variant (dashed border, `overline` text, rotated −3°, echoing a rubber-stamp mark without becoming a second signature element).

### 10.5 The Verification Seal — signature component

This is the one element the entire direction is built to be remembered by. It is not decorative — it always represents a real verified identity or a real verification state, never a placeholder avatar or a stylistic flourish.

**Structure**: a circular ring (`--radius-full`) around either initials (Fraunces, `SOFT:0 WONK:0`) or a photo, with `--shadow-seal` applied for the embossed feel.

**Sizes**:
| Context | Diameter | Ring stroke |
|---|---|---|
| Inline in card footers (poster identity) | 28–30px | 1.5px |
| Sidebar / header | 34–38px | 1.5–2px |
| Profile page | 56–64px | 2.5px |

**Ring color = role, always**:
- Indigo ring → student
- Maroon ring → alumnus
- Gold ring, solid → verified organisation/admin account (e.g. FUTA Alumni Association)

**Ring state (independent of role color)**:
- Solid ring = verified (default, since this platform gates entry on verification)
- Dashed ring, `ink-faint` = unverified / pending — this state should be rare and visually unmistakable, since an unverified account is the one thing this platform exists to prevent
- Gold ring, animated per §8, on the moment verification completes

**Do:**
- Use it for every real person or verified organisation shown anywhere in the product.
- Keep the ring-color-means-role rule absolute — never reassign indigo/maroon for a one-off visual reason.

**Don't:**
- Never use the ring styling on a purely decorative or placeholder avatar (e.g. a generic "invite a friend" empty-state graphic).
- Never stack a second circular signature element (a badge-on-badge, a corner flourish) on top of it — it stays the only circle doing symbolic work.

### 10.6 Navigation

- Sidebar link height: `44px`. Active state: `indigo-soft` background, `indigo` text, `label` weight (600).
- Inactive: `ink-soft` text, no background. Hover: `surface-2` background only, no text color change (color change is reserved for the active/current state).

### 10.7 Filter chips

- Radius: `--radius-xs` (2px) — matches badges, not the fully-rounded "pill" convention. Padding `8px 16px`.
- Active: `indigo` fill, white text. Inactive: `surface` background, `line` border, `ink-soft` text.

---

## 11. Voice & Terminology

Brief, since copy deserves its own pass, but the register should already be set correctly wherever placeholder text appears:

- **Formal but not stiff.** "Apply" not "Submit your interest!"; "Get ticket" not "Grab your spot!!"
- **Verification language is literal, not marketing-speak.** Say "Verified via matriculation number," not "Trusted member." The whole point is that it's checkable, not vibes-based.
- **Errors state what happened, plainly.** "This slot is no longer available" rather than "Oops! Something went wrong."
- **Milestones are stated as fact, not hyped.** "Bolu Damilare completed the UI/UX Foundations mentorship" — the achievement is the content; it doesn't need an exclamation point doing the work for it.

---

## 12. Screen-by-Screen Log

<!-- Filled in as each screen is actually migrated and reviewed — intentionally empty here. -->

| Screen | Route | Status | Notes |
|---|---|---|---|

---

## 13. Component Inventory

<!-- Filled in once your agent audits which components are actually installed and how — intentionally empty here. -->

| Component | Installed | Custom Variants | Notes |
|---|---|---|---|

---

## 14. Assumptions to verify before implementation

I'm flagging these explicitly rather than building further on top of them silently:

1. **Tailwind v4 + `.dark` class toggling** — inferred from your previous agent's doc (`@custom-variant dark (&:is(.dark *))`). The four Pass 1 mockups use a `data-theme` attribute instead, purely for standalone-file demo convenience — don't carry that attribute pattern into the real app if `.dark` is actually your convention.
2. **shadcn as the component layer** — inferred from the same prior doc, not verified here. §3.5's mapping table is only relevant if this is accurate.
3. **Icon library** — not specified anywhere in `product-overview.md`; Phosphor Light is a recommendation in §9, not a confirmed constraint.
4. **Current brand values I know are real** (from `product-overview.md`, not assumed): existing purple `#5E0B80` / `#7b2fbe` and Montserrat. This document fully replaces that palette and typeface per the direction you chose — flagging it so the migration is a conscious swap, not a surprise when someone diffs the CSS.

---

## 15. Reference: full CSS custom properties

```css
:root {
  /* Neutrals */
  --color-bg: #F6F5F2;
  --color-surface: #FFFFFF;
  --color-surface-2: #EFEDE7;
  --color-ink: #1C1B29;
  --color-ink-soft: #5B5868;
  --color-ink-faint: #8B879A;
  --color-line: #DEDAD0;
  --color-line-strong: #C7C1B2;

  /* Indigo — primary / student */
  --color-indigo: #2E2560;
  --color-indigo-hover: #241C4D;
  --color-indigo-soft: #EDEAF7;
  --color-indigo-on-soft: #2E2560;

  /* Maroon — secondary / alumnus */
  --color-maroon: #7A1F2B;
  --color-maroon-hover: #631823;
  --color-maroon-soft: #F7E9EA;
  --color-maroon-on-soft: #7A1F2B;

  /* Gold — verification / achievement */
  --color-gold: #B8862E;
  --color-gold-hover: #9A6E22;
  --color-gold-soft: #F7EFDD;
  --color-gold-on-soft: #8B5F00;

  /* Green — confirmation */
  --color-green: #2F6B4F;
  --color-green-hover: #24543E;
  --color-green-soft: #E7F1EA;
  --color-green-on-soft: #2F6B4F;

  /* Destructive */
  --color-destructive: #B3261E;
  --color-destructive-hover: #950003;
  --color-destructive-soft: #FBEAE8;
  --color-destructive-on-soft: #B3261E;

  /* Radius */
  --radius-none: 0px;
  --radius-xs: 2px;
  --radius-sm: 3px;
  --radius-md: 4px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs: 0 1px 2px oklch(0.23 0.027 287.4 / 0.06);
  --shadow-sm: 0 8px 24px oklch(0.23 0.027 287.4 / 0.05);
  --shadow-focus: 0 0 0 3px oklch(0.31 0.101 285.9 / 0.35);
  --shadow-seal: inset 0 1px 1px oklch(1 0 0 / 0.6), 0 1px 3px oklch(0.23 0.027 287.4 / 0.18);
}

.dark {
  --color-bg: #14131C;
  --color-surface: #1E1C2A;
  --color-surface-2: #242235;
  --color-ink: #EDEAE3;
  --color-ink-soft: #A9A5BA;
  --color-ink-faint: #726D89;
  --color-line: #312E42;
  --color-line-strong: #443F5C;

  --color-indigo: #8676DE;
  --color-indigo-hover: #9C8EE8;
  --color-indigo-soft: #2A2648;
  --color-indigo-on-soft: #9283EC;

  --color-maroon: #C0616D;
  --color-maroon-hover: #CD7883;
  --color-maroon-soft: #3A2024;
  --color-maroon-on-soft: #D2717C;

  --color-gold: #D9A845;
  --color-gold-hover: #E4BC6D;
  --color-gold-soft: #3A3121;
  --color-gold-on-soft: #D9A845;

  --color-green: #5FA987;
  --color-green-hover: #7BC29F;
  --color-green-soft: #1E3A2C;
  --color-green-on-soft: #63AD8B;

  --color-destructive: #E0655D;
  --color-destructive-hover: #F67970;
  --color-destructive-soft: #3A211F;
  --color-destructive-on-soft: #E56A61;

  --shadow-xs: 0 1px 2px oklch(0 0 0 / 0.30);
  --shadow-sm: 0 8px 30px oklch(0 0 0 / 0.35);
  --shadow-focus: 0 0 0 3px oklch(0.63 0.152 288.3 / 0.40);
  --shadow-seal: inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 3px oklch(0 0 0 / 0.4);
}
```