# portfolio-architecture-v2.md
> Solo brand identity designer + growth thinker. Minimal. Sharp. Confident.
> Inspired by: nonstopbrandingagency.com · willpaterson.design

---

## 0. Core Positioning (Non-Negotiable)

I am not a designer. I am a business asset.

- **Role:** Brand Identity Designer + Growth Thinker (solo)
- **Focus:** Strategy → Identity → Business Impact
- **Tone:** Confident, minimal, slightly confrontational — editorial
- **Content Rule:** Show > Tell. Results > Adjectives.
- **Grammar Rule:** Always "I", never "we". Always singular. Never agency-speak.

---

## 1. Global Design System

### Typography

| Role        | Font              | Usage                              |
|-------------|-------------------|------------------------------------|
| Display     | Degular Display   | Hero, section headers, case study covers |
| Body/UI     | Satoshi           | Body copy, nav, labels, captions   |
| Mono (opt.) | JetBrains Mono    | Metadata, tags, year stamps        |

**Type Scale**

| Token     | Size         | Weight       | Usage                    |
|-----------|--------------|--------------|--------------------------|
| `--t-hero`    | 96–120px     | 500–600      | Hero headline            |
| `--t-h1`      | 64–80px      | 500          | Section headlines        |
| `--t-h2`      | 40–56px      | 400–500      | Sub-sections             |
| `--t-h3`      | 24–32px      | 400          | Card titles, sub-labels  |
| `--t-body`    | 16–18px      | 400          | Body copy                |
| `--t-micro`   | 11–13px      | 400          | Tags, metadata, year     |

**Tracking:** Hero → `-0.03em`. Body → `0`. Micro → `0.1em` uppercase.  
**Leading:** Hero → `0.95`. Body → `1.6`.

---

### Color System

```css
:root {
  --color-bg:       #0E0E0E;   /* Primary surface */
  --color-text:     #D8D8D8;   /* Primary text */
  --color-muted:    #6B6B6B;   /* Secondary text, borders */
  --color-accent:   #FF4A4A;   /* One accent — used sparingly */
  --color-surface:  #161616;   /* Cards, panels */
  --color-line:     #222222;   /* Dividers */
}
```

**Rules:**
- No gradients on layout elements. Gradients allowed only inside case study imagery/overlays.
- `--color-accent` used max 3× per page. Never as background fill.
- Hover states: opacity shift (`0.6`) or accent underline — not background color change.
- All text on dark: D8D8D8 primary, 6B6B6B secondary. Never pure white (#FFF).

---

### Spacing System (Tailwind custom scale)

```
xs:  8px
sm:  16px
md:  32px
lg:  64px
xl:  96px
2xl: 160px
3xl: 240px
```

Section padding: `xl` top/bottom (`96px`). Max content width: `1400px`. Gutters: `32px`.

---

### Border & Surface

- Default border: `1px solid var(--color-line)`
- Corner radius: `0` (sharp) or `2px` max — never rounded cards
- Subtle noise texture overlay on hero bg: 3% opacity SVG noise

---

## 2. Animation System

### Library Split

| Animation Type                        | Library        |
|---------------------------------------|----------------|
| Page transitions                      | Framer Motion  |
| Text reveals (char/word split)        | GSAP + SplitText |
| Scroll-triggered section entries      | GSAP ScrollTrigger |
| Magnetic cursor                       | GSAP           |
| Hover states on links/buttons         | Framer Motion  |
| Image parallax in case studies        | GSAP ScrollTrigger |
| Stagger grids (work cards)            | GSAP           |
| Nav link underline draw               | CSS + Framer   |

### Core Animation Tokens

```js
// Eases
export const ease = {
  out:    [0.16, 1, 0.3, 1],       // snappy decelerate
  inOut:  [0.87, 0, 0.13, 1],      // smooth in-out
  circ:   [0.85, 0, 0.15, 1],      // circular
}

// Durations
export const dur = {
  fast:   0.3,
  base:   0.6,
  slow:   1.0,
  crawl:  1.6,
}

// Stagger
export const stagger = {
  default: 0.08,
  tight:   0.04,
  loose:   0.15,
}
```

### Key Animation Moments

**1. Hero text reveal (GSAP SplitText)**
- Split headline by chars
- `y: 120, opacity: 0` → `y: 0, opacity: 1`
- Stagger: `0.04s` per char
- Duration: `1.0s`, ease: circ out
- Trigger: on page load, after 200ms delay

**2. Scroll section reveals (GSAP ScrollTrigger)**
- `start: "top 85%"`, `end: "top 40%"`
- Elements: `y: 60 → 0`, `opacity: 0 → 1`
- Scrub: false (snap entry, not scrub)

**3. Magnetic cursor (GSAP)**
- Custom cursor: 12px dot + 40px follower ring
- Follower lerp: `0.1` (laggy, weighty)
- On hover CTA: cursor expands, text swaps to "View"
- On hover image: ring fills white at 10% opacity

**4. Page transitions (Framer Motion)**
- Exit: `opacity: 0, y: -20`, duration `0.4s`
- Enter: `opacity: 0, y: 20` → `opacity: 1, y: 0`, duration `0.5s`
- Use `AnimatePresence` at layout level

**5. Work grid stagger (GSAP)**
- Cards enter: `y: 80 → 0, opacity: 0 → 1`
- Stagger: `0.1s` from viewport entry

**6. Case study image parallax**
- Hero image: scrolls at `0.5` speed relative to viewport
- Use `gsap.to(img, { yPercent: -15, scrollTrigger: { scrub: true } })`

---

## 3. Website Structure

```
/
├── / (Home)
├── /work (Grid)
├── /work/[slug] (Case Study — dynamic, Sanity)
├── /about
└── /contact
```

**Next.js routing:** App Router. All pages use `layout.tsx` for persistent nav + cursor.  
**CMS:** Sanity v3 for case studies. Home featured work pulled from same dataset.

---

## 4. Navigation

- Fixed, full-width, `z-50`
- Left: Logo/name in Degular Display, 18px
- Right: `Work  About  Contact` — Satoshi, 14px, `0.1em` tracking, uppercase
- Divider: none. Background: transparent → `rgba(14,14,14,0.92)` backdrop-blur on scroll
- Mobile: Full-screen overlay menu, links in Degular Display 48px, staggered entry

---

## 5. Home Page — Section Breakdown

### Section 01 — Hero

```
[Noise texture bg]

I build brands           ← Degular Display, 96px
people don't forget.

[Horizontal rule — thin, muted]

Brand Identity · Growth Thinking · Peshawar, PK    ← Satoshi micro, muted
                                     [↓ View Work]  ← accent underline, no border
```

- Text: GSAP SplitText char reveal
- Rule: draws in from left (scaleX 0→1, origin left)
- Subline + CTA: fade + y shift, 300ms after headline completes
- No hero image — pure type + texture

---

### Section 02 — Featured Work (1 large + 2 smaller)

```
[SELECTED WORK]  ← micro label, muted, 0.1em tracking

[Large case — full bleed image card, 60vh]
Project Name  ·  Category  ·  Year
[→]

[Case 2]    [Case 3]
```

- Large card: hover → image scales 1.03, cursor → "View"
- Small cards: 50/50 grid
- On scroll: cards reveal with GSAP stagger

---

### Section 03 — Work Grid (full /work preview, 6 items)

```
ALL WORK ↗

[card]  [card]  [card]
[card]  [card]  [card]
```

- 3-col desktop, 1-col mobile
- Filter tags (optional): Branding · Identity · Strategy
- Hover: project name overlays image in Degular Display

---

### Section 04 — Authority Strip

```
Selected work across brand identity, visual systems,
and growth-focused design. Based in Peshawar, PK.
Working globally.

↳ 4+ years  ·  Logos  ·  Systems  ·  Strategy
```

- Full-width, `--color-surface` bg
- Degular Display 40px, left aligned
- Animated number counter on scroll (4+ years, etc.)

---

### Section 05 — CTA

```
Have a project?
Let's make it impossible to ignore.

[Start a project →]        hello@yourdomain.com
```

- Large type (Degular Display 64px)
- Email underlines on hover with `--color-accent`
- Subtle red accent dot before headline

---

## 6. Work Page (/work)

- Header: "Work" in Degular Display 80px
- Grid: masonry or strict 3-col grid
- Hover preview: image appears near cursor (follows mouse, GSAP)
- Filter: simple text toggles (no dropdowns)
- Each card: Project Name (Satoshi 16px), Category (micro), Year (mono)

---

## 7. Case Study Page (/work/[slug])

Inspired by willpaterson.design case study format — editorial, image-led, minimal copy.

### 7.1 Cover

```
[Full-bleed image — parallax on scroll]

Project Name                    ← Degular Display 80px
Brand Identity · 2024           ← Satoshi micro

↓ Scroll                        ← animated indicator
```

### 7.2 Project Info Strip

```
Client     Industry    Year    Scope
———————    ————————    ————    —————
Name       Category    2024    Identity · Strategy
```

### 7.3 The Problem

Short. Direct. 2–3 sentences max. No padding copy.

```
[Problem statement — Degular Display 40px, full width]

Supporting detail in Satoshi body.
```

### 7.4 Strategy

Bullet approach — 3 items max:
```
01 — Positioning
02 — Identity
03 — Application
```

### 7.5 Identity System

Full-bleed image blocks. Type, logo, colors. No border. Edge-to-edge.

### 7.6 Application

Real-world mockups. 2-col grid or full-bleed alternating.

### 7.7 Result

```
What shifted:
→ Clearer market positioning
→ Stronger visual recall
→ [Specific outcome if shareable]
```

### 7.8 Next Project

```
Next →   [Project Name]   [thumbnail]
```

---

## 8. About Page

```
I design brands that don't just look good —
they perform.

I'm Hikmatyar. A brand identity designer and growth
thinker based in Peshawar, Pakistan. I work with
founders and businesses who want their brand to do
actual work in the market.

[Photo — editorial, high contrast]

What I do:
→ Brand Identity
→ Visual Systems
→ Brand Strategy
→ Campaign Design
→ AI Automation + Lead Generation

[Start a project →]
```

- No long bio. No "passionate about" language.
- Photo: grayscale, high contrast, edge-cropped (think editorial)

---

## 9. Contact Page

```
Have a project?

[Start a project →]

Or reach me directly:
hello@yourdomain.com
@instagram_handle

Response within 48 hours.
```

- No form for now — email only
- One accent dot before "Have a project?"

---

## 10. Tech Stack

```
Framework:    Next.js 14 (App Router)
Styling:      Tailwind CSS (custom config)
Animation:    GSAP (+ ScrollTrigger + SplitText)
              Framer Motion (page transitions + hover)
CMS:          Sanity v3 (case studies)
Deployment:   Vercel
Fonts:        Degular Display (self-hosted .woff2)
              Satoshi (self-hosted .woff2)
              JetBrains Mono (Google Fonts or self-hosted)
```

---

## 11. Performance Rules

- All images: Next.js `<Image>` with `priority` on above-fold
- Fonts: `font-display: swap`, preloaded in `<head>`
- GSAP loaded client-side only — no SSR conflicts
- Sanity images: use `@sanity/image-url` + CDN
- LCP target: < 2.5s. CLS: 0.

---

## 12. SEO

**Page titles:**
- Home: `Hikmatyar — Brand Identity Designer & Growth Thinker`
- Work: `Work — Hikmatyar`
- Case Study: `[Project Name] — Hikmatyar`
- About: `About — Hikmatyar`

**Meta description (Home):**
> Brand identity designer based in Peshawar, PK. I build visual systems and strategies that help businesses grow.

**Keywords:** brand identity designer, visual identity designer, logo designer Pakistan, brand strategy, brand identity Peshawar

**OG image:** Dark bg, Degular Display name + tagline, 1200×630px

---

## 13. Build Sequence

```
Phase 1 — Foundation
  ├── Next.js 14 setup + Tailwind config
  ├── Font loading (Degular Display + Satoshi)
  ├── Global CSS variables + design tokens
  ├── Layout: Nav + Footer
  └── Custom cursor (GSAP magnetic)

Phase 2 — Pages
  ├── Home (all 5 sections)
  ├── Work grid page
  ├── About
  └── Contact

Phase 3 — CMS + Dynamic
  ├── Sanity schema (case study)
  ├── Case study page template
  └── Home featured work from Sanity

Phase 4 — Animation Pass
  ├── GSAP SplitText hero
  ├── ScrollTrigger reveals (all sections)
  ├── Parallax (case study hero)
  └── Framer Motion page transitions

Phase 5 — Polish + Launch
  ├── SEO meta, OG images
  ├── Performance audit
  ├── Mobile QA
  └── Vercel deploy + domain
```

---

## 14. Final Direction

**Minimal. Sharp. Confrontational.**  
The site should feel like opening a well-designed book — immediate authority, no noise, nothing to prove. Every element earns its place.
