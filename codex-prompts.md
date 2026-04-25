# codex-prompts.md
# Hikmatyar Portfolio — Codex Build Prompts
> Paste each prompt into Codex/Claude Code exactly as written.
> Run Phase 1 first — each phase depends on the previous.

---

## PHASE 1 — Foundation Setup

```
You are building a personal portfolio website for a solo brand identity designer named Hikmatyar.

Tech stack:
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS with a custom design token config
- GSAP (client-side only, no SSR)
- Framer Motion
- Self-hosted fonts: Degular Display + Satoshi

Tasks for this phase:

1. Initialize Next.js 14 project with App Router and TypeScript.

2. Install dependencies:
   - gsap (+ @gsap/react)
   - framer-motion
   - @sanity/client @sanity/image-url

3. Configure tailwind.config.ts with this custom theme:
   - Colors: bg=#0E0E0E, text=#D8D8D8, muted=#6B6B6B, accent=#FF4A4A, surface=#161616, line=#222222
   - Font families: display="Degular Display", sans="Satoshi", mono="JetBrains Mono"
   - Custom spacing: xs=8px, sm=16px, md=32px, lg=64px, xl=96px, 2xl=160px, 3xl=240px

4. Create globals.css with:
   - CSS custom properties matching the color system above
   - @font-face for Degular Display (regular + medium weights, woff2, placed in /public/fonts/)
   - @font-face for Satoshi (regular + medium weights, woff2, placed in /public/fonts/)
   - Base reset: box-sizing border-box, margin 0, font smoothing antialiased
   - body: background #0E0E0E, color #D8D8D8, font-family Satoshi

5. Create app/layout.tsx:
   - HTML lang="en"
   - Preload both font woff2 files in <head>
   - Import globals.css
   - Include <Nav /> and <CustomCursor /> components
   - Wrap children with Framer Motion AnimatePresence for page transitions

6. Create components/Nav.tsx:
   - Fixed position, top-0, full width, z-50
   - Left: "Hikmatyar" in Degular Display, 18px, text-[#D8D8D8], links to /
   - Right: nav links → Work (/work) · About (/about) · Contact (/contact)
     Links: Satoshi, 13px, uppercase, tracking-widest, text-[#6B6B6B]
     Hover: text-[#D8D8D8], transition 0.3s
   - On scroll past 80px: add backdrop-blur-md + bg-[rgba(14,14,14,0.92)] via useEffect/useState
   - No border, no box-shadow

7. Create components/CustomCursor.tsx (client component):
   - Two elements: dot (12px circle) and ring (40px circle, border 1px #D8D8D8)
   - Both absolutely positioned, pointer-events-none, z-[9999]
   - GSAP follows mouse: dot snaps (no lag), ring follows with lerp 0.1 (use gsap.ticker)
   - On hover over [data-cursor="hover"] elements: ring scales to 60px, opacity 0.5
   - Hide default cursor via CSS: * { cursor: none }
   - Only render on non-touch devices: check window.matchMedia('(pointer: fine)')

8. Create components/Footer.tsx:
   - Simple, minimal
   - Left: "© 2025 Hikmatyar" in Satoshi 13px muted
   - Right: Behance · Dribbble · LinkedIn · Instagram — links, same style
   - Top border: 1px solid #222222
   - Padding: 32px vertical

Folder structure to establish:
/app
  layout.tsx
  page.tsx (empty for now)
  /work/page.tsx (empty)
  /about/page.tsx (empty)
  /contact/page.tsx (empty)
/components
  Nav.tsx
  Footer.tsx
  CustomCursor.tsx
/lib
  gsap.ts (export gsap instance + register ScrollTrigger, SplitText)
  sanity.ts (client config)
/public
  /fonts (place Degular Display + Satoshi woff2 here)

Output all files with full code. No placeholder comments — complete implementations.
```

---

## PHASE 2A — Home Page (Hero + Featured Work)

```
Continue building the Next.js 14 portfolio for Hikmatyar (solo brand identity designer).
Foundation from Phase 1 is complete. Now build the Home page hero and featured work sections.

File to build: app/page.tsx
Component files: components/home/Hero.tsx, components/home/FeaturedWork.tsx

━━━━━━━━━━━━━━━━━━
HERO SECTION (Section 01)
━━━━━━━━━━━━━━━━━━

Design:
- Full viewport height (100svh)
- Background: #0E0E0E with a subtle SVG noise texture overlay at 3% opacity
- No image. Pure typography + texture.

Layout:
- Content positioned: bottom-left, padding-left: 64px, padding-bottom: 80px
- Headline: "I build brands" line 1, "people don't forget." line 2
  Font: Degular Display, 96px, weight 500, color #D8D8D8, line-height 0.95, letter-spacing -0.03em
- Thin horizontal rule (1px, color #222222, full width) below headline, margin-top 40px
- Sub-line below rule: "Brand Identity · Growth Thinking · Peshawar, PK"
  Font: Satoshi, 13px, uppercase, tracking-widest, color #6B6B6B, margin-top 24px
- CTA link: "View Work →" 
  Font: Satoshi, 14px, color #D8D8D8
  Style: no button border — just text with animated underline on hover (underline draws left-to-right)
  Links to: /work
  Margin-top: 32px from sub-line

Animations (GSAP, client-side only, useEffect + useLayoutEffect):
1. Headline: SplitText by chars → each char animates from y:120, opacity:0 → y:0, opacity:1
   Stagger: 0.035s per char, duration: 1.0s, ease: "power4.out", delay: 0.2s
2. Horizontal rule: scaleX from 0→1, transform-origin: left, duration: 0.8s, delay: 0.9s, ease: "power3.out"
3. Sub-line + CTA: y:20, opacity:0 → y:0, opacity:1, duration: 0.6s, delay: 1.1s, ease: "power2.out"
4. Add [data-cursor="hover"] to the CTA link for cursor interaction

SVG noise texture (inline, small, tiled):
- Use a simple feTurbulence SVG filter as a pseudo-element overlay on the hero

━━━━━━━━━━━━━━━━━━
FEATURED WORK (Section 02)
━━━━━━━━━━━━━━━━━━

Design:
- Padding: 96px top, 96px bottom
- Section label: "SELECTED WORK" — Satoshi, 12px, uppercase, tracking-widest, color #6B6B6B, margin-bottom 48px

Layout:
- 1 large card (full width, 60vh height) on top
- 2 smaller cards (50/50 grid, 45vh height each) below, gap 16px
- Gap between large and small grid: 16px

Card component (shared):
- Overflow hidden, position relative
- Background: #161616 (placeholder for image)
- Sharp corners (border-radius: 0)
- Image: Next.js <Image> fill object-cover
- Bottom overlay: gradient from transparent → rgba(14,14,14,0.8)
- Bottom info bar (absolute, bottom 0, padding 24px 32px):
  - Left: Project Name (Satoshi, 18px, #D8D8D8) · Category (Satoshi, 13px, #6B6B6B) · Year (JetBrains Mono, 13px, #6B6B6B)
  - Right: arrow → (Satoshi 20px, #FF4A4A)
- On hover: image scale 1.04 (transition 0.6s ease), cursor becomes "View" (via [data-cursor="hover"])
- Entire card is a link to /work/[slug]

For now, use static placeholder data (3 projects array) with placeholder image paths.
Export card as components/home/WorkCard.tsx for reuse.

ScrollTrigger reveal for both sections:
- Each card: y:60, opacity:0 → y:0, opacity:1 on scroll enter
- Stagger: 0.12s, start: "top 85%", ease: "power2.out"

Output: complete Hero.tsx, FeaturedWork.tsx, WorkCard.tsx, and updated app/page.tsx that composes them.
All GSAP used inside useLayoutEffect with gsap.context() for proper cleanup.
```

---

## PHASE 2B — Home Page (Work Grid + Authority Strip + CTA)

```
Continue building the Next.js 14 portfolio for Hikmatyar. Hero and FeaturedWork sections are complete.
Now build the remaining 3 sections of the Home page.

Add to: app/page.tsx
New components: components/home/WorkGrid.tsx, components/home/AuthorityStrip.tsx, components/home/CTASection.tsx

━━━━━━━━━━━━━━━━━━
WORK GRID (Section 03)
━━━━━━━━━━━━━━━━━━

Design:
- Padding: 96px top/bottom
- Header row: "ALL WORK" left (Satoshi 13px uppercase tracking-widest #6B6B6B) + "↗" link to /work right (same style)
- 3-column grid, gap 16px, margin-top 48px
- Show 6 projects max (static placeholder data for now)
- Each card: same WorkCard component from FeaturedWork, height 52vh
- On mobile: single column, full width cards

Filter row (below header, above grid):
- Text toggles: All · Branding · Identity · Strategy
- Satoshi 13px, #6B6B6B; active state: #D8D8D8 with 1px bottom border #FF4A4A
- onClick: filter projects array by category
- No animation needed for filter — simple state update

GSAP scroll stagger:
- All 6 cards: y:80, opacity:0 → y:0, opacity:1 on scroll enter
- Stagger: 0.1s, start: "top 90%", ease: "power2.out"

━━━━━━━━━━━━━━━━━━
AUTHORITY STRIP (Section 04)
━━━━━━━━━━━━━━━━━━

Design:
- Background: #161616 (surface color)
- Padding: 96px top/bottom, 64px left/right
- No border radius

Layout:
Top part (large text):
- "Selected work across brand identity," — Degular Display, 40px, #D8D8D8
- "visual systems, and growth-focused design." — same
- "Based in Peshawar, PK. Working globally." — Satoshi 16px, #6B6B6B, margin-top 24px

Stats row (below, margin-top 64px):
- 4 stat items side by side:
  01: "4+"   label: "Years"
  02: "20+"  label: "Projects"
  03: "3"    label: "Industries"
  04: "PK"   label: "Based in"
- Each: Number in Degular Display 48px #D8D8D8, label in Satoshi 13px uppercase tracking-widest #6B6B6B
- Separated by 1px vertical divider (#222222)

Animated number counter:
- On scroll enter: numbers count up from 0 to final value
- Use GSAP ScrollTrigger + gsap.to with snap: 1 and onUpdate
- Duration: 1.5s, ease: "power2.out"

━━━━━━━━━━━━━━━━━━
CTA SECTION (Section 05)
━━━━━━━━━━━━━━━━━━

Design:
- Padding: 120px top/bottom
- Background: #0E0E0E

Layout:
- Small red dot (8px, background #FF4A4A, border-radius 50%) — above headline
- Headline: "Have a project?" — Degular Display, 64px, #D8D8D8, line-height 1.0
- Sub-headline: "Let's make it impossible to ignore." — Degular Display, 64px, #6B6B6B
- CTA button: "Start a project →" — Satoshi 16px, #D8D8D8, no background, no border
  Has animated underline: 1px bottom line, scales X from 0→1 on hover, #FF4A4A, origin left
  [data-cursor="hover"]
  href="/contact"
- Below CTA: "hello@yourdomain.com" — Satoshi 14px, #6B6B6B
  On hover: color → #D8D8D8, underline in #FF4A4A

Scroll reveal:
- Red dot: scale 0→1, opacity 0→1, duration 0.4s
- Headline lines: y:40, opacity:0 → y:0, opacity:1, stagger 0.1s
- CTA: y:20, opacity:0 → y:0, opacity:1, delay 0.3s after headlines

Output: WorkGrid.tsx, AuthorityStrip.tsx, CTASection.tsx
Update app/page.tsx to include all 5 sections in order.
All GSAP in useLayoutEffect with gsap.context() cleanup.
Mobile responsive: all sections stack and scale properly.
```

---

## PHASE 2C — Work Grid Page + About + Contact

```
Continue the Next.js 14 portfolio for Hikmatyar. Home page is complete.
Build the remaining static pages.

━━━━━━━━━━━━━━━━━━
WORK PAGE (app/work/page.tsx)
━━━━━━━━━━━━━━━━━━

Design:
- Padding top: 160px (accounts for fixed nav)
- Page header: "Work" — Degular Display, 80px, #D8D8D8, padding-bottom 64px
- Below header: thin divider (1px, #222222)

Grid:
- 3-col desktop, 2-col tablet (768px), 1-col mobile
- Gap: 16px
- All projects (8–12 items) using WorkCard component (height: 55vh)
- Static placeholder data for now (will be replaced with Sanity data in Phase 3)

Hover image follower effect:
- Create components/work/ImageFollower.tsx
- On mousemove inside the grid container, show a thumbnail that follows the cursor
- Thumbnail: 280px × 180px, sharp corners, object-cover
- Appears on card hover, disappears on mouseleave
- GSAP: x/y follow mouse with lerp 0.15 (smooth lag)
- z-index: above cards, pointer-events: none

Filter:
- Sticky below page header when scrolling
- Text toggles: All · Branding · Identity · Strategy · Campaign
- Same style as home work grid filter

GSAP:
- Page title: SplitText word reveal, y:40→0, stagger 0.06s
- Cards: stagger entry on load (not scroll trigger since above fold): stagger 0.08s

━━━━━━━━━━━━━━━━━━
ABOUT PAGE (app/about/page.tsx)
━━━━━━━━━━━━━━━━━━

Design:
- Padding top: 160px
- Two-column layout (60/40 split) on desktop, stacked on mobile

Left column:
- Label: "ABOUT" — Satoshi 12px uppercase tracking-widest #6B6B6B, margin-bottom 48px
- Headline: "I design brands that don't just look good — they perform."
  Degular Display, 48px, #D8D8D8, line-height 1.1
- Body copy (Satoshi 17px, #6B6B6B, line-height 1.7):
  "I'm Hikmatyar. A brand identity designer and growth thinker based in Peshawar, Pakistan.
  I work with founders and businesses who want their brand to do actual work in the market."
- Services list (margin-top 48px):
  Label: "WHAT I DO" — Satoshi 12px uppercase tracking-widest #6B6B6B, margin-bottom 24px
  Items (each on its own line):
  → Brand Identity
  → Visual Systems
  → Brand Strategy
  → Campaign Design
  → AI Automation + Lead Generation
  Each: Satoshi 16px, #D8D8D8, with #FF4A4A "→" prefix
- CTA: "Start a project →" link to /contact — same animated underline style as homepage

Right column:
- Photo placeholder: aspect-ratio 3/4, background #161616 with "Photo" label centered (to be replaced)
- Sharp corners, no border radius
- On scroll: slight parallax (GSAP ScrollTrigger, yPercent: -8)

Scroll reveals:
- Left column elements: y:40, opacity:0 → y:0, opacity:1, stagger 0.1s

━━━━━━━━━━━━━━━━━━
CONTACT PAGE (app/contact/page.tsx)
━━━━━━━━━━━━━━━━━━

Design:
- Padding top: 160px
- Centered layout, max-width 720px, margin auto

Content:
- Red dot (8px, #FF4A4A) above headline
- Headline: "Have a project?" — Degular Display, 72px, #D8D8D8
- Sub: "I'd like to hear about it." — Degular Display, 72px, #6B6B6B
- Divider: 1px #222222, margin 48px 0
- Contact block:
  - "Email" — Satoshi 12px uppercase tracking-widest #6B6B6B
  - "hello@yourdomain.com" — Satoshi 20px #D8D8D8, hover → #FF4A4A, mailto link
  - margin-top 32px
  - "Instagram" — same label style
  - "@hikmatyar" — same value style, links to Instagram
- Footer note: "Response within 48 hours." — Satoshi 13px #6B6B6B, margin-top 64px

Framer Motion entrance (page transition already handled by layout):
- Red dot: scale 0→1
- Headlines: y:30, opacity:0 → y:0, opacity:1, stagger 0.12s, use Framer Motion (motion.h1)
- Contact block: y:20, opacity:0 → y:0, opacity:1, delay 0.4s

Output: complete code for all three pages and the ImageFollower component.
```

---

## PHASE 3 — Sanity CMS Integration

```
Continue the Next.js 14 portfolio for Hikmatyar.
All static pages are complete. Now integrate Sanity v3 as the CMS for case studies.

━━━━━━━━━━━━━━━━━━
SANITY SETUP
━━━━━━━━━━━━━━━━━━

1. Install: @sanity/client @sanity/image-url next-sanity

2. Create lib/sanity.ts:
   - Sanity client with projectId, dataset ("production"), apiVersion "2024-01-01", useCdn: true
   - createClient for server fetches, createClient with token for preview

3. Create sanity/schema/caseStudy.ts with these fields:
   - title: string (required)
   - slug: slug (required, generated from title)
   - category: string (required) — options: "Branding", "Identity", "Strategy", "Campaign"
   - year: number (required)
   - coverImage: image (required, with hotspot)
   - thumbnailImage: image (for grid/cards)
   - excerpt: text (short, 2 sentences max — shown on cards)
   - client: string
   - industry: string
   - scope: array of strings
   - problemStatement: text (the problem headline — Degular Display display)
   - problemBody: portable text (supporting detail)
   - strategyItems: array of objects { number, title, description }
   - identityImages: array of images
   - applicationImages: array of images
   - results: array of strings (→ bullet outcomes)
   - featured: boolean (shown in Home featured section)
   - featuredOrder: number (1 = large card, 2–3 = small cards)
   - order: number (for work grid ordering)

4. Create lib/queries.ts with GROQ queries:
   - getAllProjects(): fetch all, ordered by order asc
   - getFeaturedProjects(): where featured == true, ordered by featuredOrder asc
   - getProjectBySlug(slug): single project with all fields
   - getProjectSlugs(): for generateStaticParams

━━━━━━━━━━━━━━━━━━
PAGE UPDATES
━━━━━━━━━━━━━━━━━━

5. Update app/work/page.tsx:
   - Fetch getAllProjects() at page level (server component)
   - Pass to WorkGrid and WorkCard components
   - Use @sanity/image-url builder for image src

6. Update app/page.tsx (Home):
   - Fetch getFeaturedProjects()
   - Pass to FeaturedWork and WorkGrid sections

7. Create app/work/[slug]/page.tsx (Case Study — see Phase 4 for full template)
   - Add generateStaticParams using getProjectSlugs()
   - Add generateMetadata for dynamic title + OG

8. Update WorkCard component:
   - Accept Sanity image object + urlBuilder
   - Use next/image with Sanity URL as src
   - Link dynamically to /work/[slug]

━━━━━━━━━━━━━━━━━━
SANITY STUDIO
━━━━━━━━━━━━━━━━━━

9. Create a minimal Sanity Studio config at /studio (or use hosted studio):
   - defineConfig with the caseStudy schema
   - Structure builder: single list "Case Studies"
   - This is for local content editing only — not deployed with portfolio

Output: lib/sanity.ts, lib/queries.ts, sanity/schema/caseStudy.ts, updated page files.
Type everything — export TypeScript interfaces for the case study schema.
```

---

## PHASE 4 — Case Study Page Template

```
Continue the Next.js 14 portfolio for Hikmatyar.
Sanity is integrated. Now build the full case study page template.

File: app/work/[slug]/page.tsx + supporting components in components/case-study/

This page is inspired by willpaterson.design case study format — editorial, image-led, minimal copy.

━━━━━━━━━━━━━━━━━━
COVER SECTION
━━━━━━━━━━━━━━━━━━

- Full viewport height (100svh), overflow hidden
- Full-bleed background image (coverImage from Sanity)
  - Next.js <Image> with fill + object-cover
  - Dark overlay: linear-gradient(to bottom, rgba(14,14,14,0.3) 0%, rgba(14,14,14,0.85) 100%)
- Content (absolute, bottom-left, padding 64px):
  - Project title: Degular Display, 80px, #D8D8D8, z-index above overlay
  - Meta line: "[Category] · [Year]" — Satoshi 13px uppercase tracking-widest #6B6B6B
  - Scroll indicator: "↓ Scroll" — Satoshi 13px #6B6B6B, animated bounce (CSS keyframe)

GSAP parallax:
- On scroll: coverImage moves at 0.5× scroll speed
- gsap.to(imageRef, { yPercent: 20, ease: "none", scrollTrigger: { scrub: true } })

━━━━━━━━━━━━━━━━━━
PROJECT INFO STRIP
━━━━━━━━━━━━━━━━━━

- White-on-dark horizontal strip: padding 48px 64px
- Background: #161616
- 4 columns: Client · Industry · Year · Scope
- Each: label (Satoshi 12px uppercase #6B6B6B) + value (Satoshi 16px #D8D8D8)
- Separated by 1px vertical dividers (#222222)
- Full width, no max-width constraint
- Scroll reveal: y:20, opacity:0 → y:0, opacity:1, stagger 0.08s

━━━━━━━━━━━━━━━━━━
PROBLEM SECTION
━━━━━━━━━━━━━━━━━━

- Padding: 96px 64px
- Max-width: 900px
- Section label: "THE PROBLEM" — Satoshi 12px uppercase tracking-widest #6B6B6B
- Problem statement: Degular Display, 40px, #D8D8D8, line-height 1.2, margin-top 32px
  (from problemStatement field)
- Body copy: Satoshi 17px, #6B6B6B, line-height 1.7, max-width 640px, margin-top 24px
  (from problemBody — render as plain text for now, Portable Text renderer optional)

━━━━━━━━━━━━━━━━━━
STRATEGY SECTION
━━━━━━━━━━━━━━━━━━

- Padding: 96px 64px
- Background: #0E0E0E
- Section label: "THE APPROACH"
- Strategy items (from strategyItems array, 3 max):
  Layout: full-width rows
  Each row: number (JetBrains Mono 13px #6B6B6B "01") · title (Degular Display 32px #D8D8D8) · description (Satoshi 16px #6B6B6B, right column)
  Separated by 1px horizontal dividers
  On hover: title color → #FF4A4A, transition 0.3s
- Scroll reveal: each row enters from y:30, stagger 0.12s

━━━━━━━━━━━━━━━━━━
IDENTITY SYSTEM
━━━━━━━━━━━━━━━━━━

- Section label: "THE IDENTITY"
- Images: full-bleed edge-to-edge (no horizontal padding)
  - First image: full viewport width, 70vh height, object-cover
  - Remaining: alternating 2-col grid (50/50) OR single full-bleed
  - Each image: slight parallax via ScrollTrigger scrub
- Between images: minimal 16px gap (no padding, no margin beyond gap)

━━━━━━━━━━━━━━━━━━
APPLICATION SECTION
━━━━━━━━━━━━━━━━━━

- Section label: "IN USE" — padding 96px 64px for label only
- Images: same full-bleed approach as Identity
- Application images alternate: full-bleed → 2-col → full-bleed

━━━━━━━━━━━━━━━━━━
RESULTS SECTION
━━━━━━━━━━━━━━━━━━

- Padding: 96px 64px
- Background: #161616
- Section label: "WHAT SHIFTED"
- Results list (from results array):
  Each: "→ [result text]" — Satoshi 18px, #D8D8D8, padding 20px 0, border-bottom 1px #222222
  "→" prefix in #FF4A4A
- Last item has no border-bottom
- Scroll reveal: each item slides up staggered

━━━━━━━━━━━━━━━━━━
NEXT PROJECT
━━━━━━━━━━━━━━━━━━

- Full width, padding 64px
- Left: "Next →" label (Satoshi 13px uppercase #6B6B6B) + project name (Degular Display 48px #D8D8D8)
- Right: thumbnail image (280px × 180px, object-cover, sharp corners)
- Entire section is a link to /work/[nextSlug]
- On hover: thumbnail scales 1.04, name color → #FF4A4A
- Determine nextProject in page.tsx: fetch all projects, find next by order

Output: complete app/work/[slug]/page.tsx and all case-study section components.
All GSAP in useLayoutEffect with gsap.context() cleanup.
Use TypeScript throughout with proper typing from Sanity schema interfaces.
```

---

## PHASE 5 — Animation Polish Pass

```
The Next.js 14 portfolio for Hikmatyar is functionally complete.
This phase is a dedicated animation polish pass — refining, adding, and ensuring consistency.

File: This pass modifies existing components. Identify and update as needed.

━━━━━━━━━━━━━━━━━━
GSAP PLUGIN REGISTRATION
━━━━━━━━━━━━━━━━━━

Create lib/gsap.ts (if not already done):
- Import gsap, ScrollTrigger, SplitText from "gsap/all"
- gsap.registerPlugin(ScrollTrigger, SplitText)
- Export { gsap, ScrollTrigger, SplitText }
- All components import from this file, NOT from "gsap" directly
- This prevents duplicate plugin registration

━━━━━━━━━━━━━━━━━━
FRAMER MOTION PAGE TRANSITIONS
━━━━━━━━━━━━━━━━━━

In app/layout.tsx:
- Wrap children in <AnimatePresence mode="wait">
- Create components/PageTransition.tsx:
  - motion.div with:
    initial: { opacity: 0, y: 20 }
    animate: { opacity: 1, y: 0 }
    exit: { opacity: 0, y: -20 }
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  - All page.tsx files wrap their content in <PageTransition>

━━━━━━━━━━━━━━━━━━
NAV LINK HOVER ANIMATION
━━━━━━━━━━━━━━━━━━

In Nav.tsx:
- Each nav link: add animated underline using Framer Motion
  - Span inside link: initial scaleX 0, on parent hover scaleX 1
  - Width 100%, height 1px, background #FF4A4A, transform-origin left
  - Transition: 0.3s ease

━━━━━━━━━━━━━━━━━━
SMOOTH SCROLL
━━━━━━━━━━━━━━━━━━

Install: lenis (npm install lenis)
Create components/SmoothScroll.tsx (client component):
- Initialize Lenis with smooth: true, lerp: 0.1, duration: 1.2
- Connect Lenis to GSAP ticker: gsap.ticker.add((time) => lenis.raf(time * 1000))
- Set gsap.ticker.lagSmoothing(0)
- Wrap in useEffect with cleanup lenis.destroy()
- Place <SmoothScroll /> in app/layout.tsx

━━━━━━━━━━━━━━━━━━
MAGNETIC BUTTON EFFECT
━━━━━━━━━━━━━━━━━━

Create components/MagneticButton.tsx:
- Wraps any children (use for CTAs and nav links)
- On mousemove within button bounds: 
  gsap.to(element, { x: offsetX * 0.3, y: offsetY * 0.3, duration: 0.3, ease: "power2.out" })
- On mouseleave: gsap.to(element, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" })
- Apply to: all CTA buttons + "Start a project →" links

━━━━━━━━━━━━━━━━━━
WORK CARD HOVER — IMAGE ZOOM
━━━━━━━━━━━━━━━━━━

In WorkCard.tsx:
- Use Framer Motion whileHover on the inner image wrapper:
  scale: 1.05, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
- Project name overlay on hover (Framer Motion):
  initial: { opacity: 0, y: 10 }
  whileHover: { opacity: 1, y: 0 }
  This overlay shows only the project name in Degular Display 24px centered

━━━━━━━━━━━━━━━━━━
CASE STUDY — ENTRANCE
━━━━━━━━━━━━━━━━━━

On case study cover:
- Title chars: SplitText reveal, but start AFTER page transition completes (delay: 0.5s)
- Cover image: on load, scale from 1.1 → 1.0 over 1.4s, ease: "power3.out" (Ken Burns opening)

━━━━━━━━━━━━━━━━━━
FINAL CHECKS
━━━━━━━━━━━━━━━━━━

- Ensure all GSAP ScrollTriggers are killed in useLayoutEffect cleanup
- Ensure no GSAP runs server-side (all in useLayoutEffect or useEffect with client check)
- Test Lenis + GSAP ScrollTrigger integration: ScrollTrigger.scrollerProxy or use lenis's own ScrollTrigger integration
- All [data-cursor="hover"] attributes present on: CTA links, work cards, nav links, next project strip

Output: modified versions of all affected components.
List every file changed at the top of your response.
```

---

## PHASE 6 — SEO, OG Images, Performance, Deploy

```
Final phase for the Hikmatyar portfolio. Build is complete. Optimize and deploy.

━━━━━━━━━━━━━━━━━━
METADATA (app/layout.tsx + each page)
━━━━━━━━━━━━━━━━━━

In app/layout.tsx — base metadata:
export const metadata: Metadata = {
  title: { default: "Hikmatyar — Brand Identity Designer", template: "%s — Hikmatyar" },
  description: "Brand identity designer based in Peshawar, PK. I build visual systems and strategies that help businesses grow.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Hikmatyar",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }]
  },
  twitter: { card: "summary_large_image" },
  keywords: ["brand identity designer", "visual identity", "logo designer Pakistan", "brand strategy", "Peshawar designer"]
}

Per-page metadata:
- /work: title "Work"
- /about: title "About"
- /contact: title "Contact"
- /work/[slug]: dynamic — title = project.title, description = project.excerpt, OG image = project.coverImage URL

━━━━━━━━━━━━━━━━━━
OG IMAGE GENERATION
━━━━━━━━━━━━━━━━━━

Create app/og/route.tsx using Next.js ImageResponse:
- Default OG: dark bg (#0E0E0E), "Hikmatyar" in Degular Display large, tagline below in muted
- For case studies: pull project title + thumbnail from Sanity via fetch in the route
- Dimensions: 1200 × 630

━━━━━━━━━━━━━━━━━━
PERFORMANCE
━━━━━━━━━━━━━━━━━━

next.config.js:
- images.domains: ["cdn.sanity.io"]
- images.formats: ["image/webp", "image/avif"]

Font optimization:
- All woff2 files preloaded in layout.tsx <head> with rel="preload" as="font" crossOrigin="anonymous"
- font-display: swap in @font-face declarations

GSAP:
- Import GSAP plugins only on client: use dynamic import with { ssr: false } if needed
- Bundle size check: only import used plugins

Image:
- All <Image> components: add sizes prop appropriate to layout
- Hero image on case study: priority={true}
- Below-fold images: no priority (lazy by default)

━━━━━━━━━━━━━━━━━━
VERCEL DEPLOYMENT
━━━━━━━━━━━━━━━━━━

1. Create vercel.json:
{
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}

2. Environment variables needed in Vercel:
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token (for preview, optional)

3. Create .env.local.example with the above vars (no real values)

4. robots.txt in /public:
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml

5. Create app/sitemap.ts:
- Static routes: /, /work, /about, /contact
- Dynamic: fetch all project slugs from Sanity, add /work/[slug] for each
- lastModified: new Date()

Output: all SEO/performance files + updated next.config.js + vercel.json.
List every file created or modified.
```

---

## USAGE NOTES

```
Order of execution:
Phase 1 → 2A → 2B → 2C → 3 → 4 → 5 → 6

Each phase is self-contained but references prior output.
Tell Codex: "Phase N is complete. Now run Phase N+1."

Font files (Degular Display + Satoshi .woff2):
- Degular Display: purchase from OH no Type Co. (ohno.pizza/fonts/degular)
- Satoshi: free from Fontshare (fontshare.com/fonts/satoshi)
- Place both in /public/fonts/ before Phase 1

GSAP license note:
- SplitText requires GSAP Club membership (greensock.com/club/)
- If not available, use a free alternative: splitting.js or custom char-split via JS
- Update lib/gsap.ts accordingly

Sanity project:
- Create at sanity.io/manage before Phase 3
- Note your projectId + dataset name
- Add to .env.local
```
