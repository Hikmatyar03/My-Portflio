# Portfolio Architecture V2 Implementation Plan

## Scope and Current State

- The workspace currently contains the design/architecture brief in [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:1) and a prompt-oriented build breakdown in [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:1).
- There is no existing Next.js app, component tree, CMS config, or asset pipeline in the repo yet. This plan therefore starts from project bootstrap, not incremental refinement.
- The implementation target is a solo portfolio site for Hikmatyar using a minimal, editorial visual language, a singular first-person voice, and a business-impact positioning rather than generic agency presentation ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:7), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:11)).

## Requirements Summary

### Product and Brand Requirements

- The site must present a solo "Brand Identity Designer + Growth Thinker" voice, use "I" not "we", and prioritize evidence/results over adjectives ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:11)).
- The visual system must use Degular Display for display type, Satoshi for body/UI, and JetBrains Mono for metadata, with sharp corners, muted dark surfaces, and restrained accent usage ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:21), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:45), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:66), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:82)).
- Animation responsibilities are split between GSAP and Framer Motion, with specific hero reveals, scroll reveals, magnetic cursor behavior, page transitions, and case-study parallax requirements ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:90)).

### Information Architecture Requirements

- Required routes are `/`, `/work`, `/work/[slug]`, `/about`, and `/contact`, implemented with Next.js App Router and persistent layout-level navigation/cursor behavior ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:166)).
- Home must contain five sections in order: Hero, Featured Work, Work Grid preview, Authority Strip, CTA ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:192)).
- Work, case study, about, and contact pages each have explicit content and layout requirements that should be implemented as separate page-level compositions, not one-off blocks stuffed into a single file ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:279), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:289), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:356), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:384)).

### Technical and Delivery Requirements

- The required stack is Next.js 14 App Router, TypeScript, Tailwind CSS, GSAP, Framer Motion, Sanity v3, and Vercel deployment ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:403)).
- The phased build sequence is foundation -> static pages -> CMS/dynamic case studies -> animation pass -> SEO/performance/deploy, and the prompt doc already translates those phases into concrete file targets ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:446), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:8), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:94), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:265), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:368), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:448), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:563), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:664)).
- Performance constraints include client-only GSAP, image optimization, font preloading with `font-display: swap`, Sanity CDN usage, and targets of LCP < 2.5s and CLS 0 ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:419)).
- SEO scope includes route metadata, OG images, keywords, robots, and sitemap generation ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:429), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:664)).

## Acceptance Criteria

### Foundation

- A Next.js 14 App Router project exists with TypeScript, Tailwind, GSAP, Framer Motion, and Sanity client dependencies installed and committed.
- `tailwind.config.ts`, `app/globals.css`, and `app/layout.tsx` encode the documented tokens for colors, fonts, spacing, and base layout behavior.
- `components/Nav.tsx`, `components/Footer.tsx`, `components/CustomCursor.tsx`, and `lib/gsap.ts` exist and match the navigation, footer, cursor, and plugin-registration requirements from the prompt doc.

### Static Experience

- `app/page.tsx` renders the five required home sections in the documented order using dedicated components under `components/home/`.
- `app/work/page.tsx`, `app/about/page.tsx`, and `app/contact/page.tsx` exist, match the documented hierarchy/content, and are responsive at mobile, tablet, and desktop widths.
- Shared card and interaction primitives are reused across home/work pages instead of duplicated implementations.

### Dynamic Content

- Sanity schema and query utilities exist and support fetching all projects, featured projects, project slugs, and a single project by slug.
- `app/work/[slug]/page.tsx` is statically generated from Sanity data, emits route metadata, and renders the required case-study sections.
- Home featured work and work listings can switch from placeholder data to Sanity-backed data without redesigning the component API.

### Motion, SEO, and Launch

- All GSAP usage is client-safe, cleaned up correctly, and does not execute during SSR.
- Layout/page metadata, OG image route, sitemap, robots, Vercel config, and image/font optimizations are present and build successfully.
- The final build passes `npm run lint`, `npm run build`, and mobile/desktop manual QA for layout integrity and primary animations.

## Implementation Steps

### 1. Bootstrap the application shell

Files:
- `package.json`
- `tsconfig.json`
- `next.config.js` or `next.config.mjs`
- `postcss.config.js`
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/globals.css`
- `public/fonts/*`

Work:
- Initialize the Next.js 14 App Router project with TypeScript and Tailwind as required by the prompt doc ([codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:11)).
- Encode the global color, type, spacing, border, and noise-texture rules from the architecture brief into CSS variables and Tailwind theme extensions ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:21), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:45), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:66), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:82)).
- Add font-loading and preload plumbing in `app/layout.tsx`, with fallback handling if the licensed font files are not available at implementation time ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:403), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:34), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:770)).

### 2. Build the persistent layout primitives

Files:
- `components/Nav.tsx`
- `components/Footer.tsx`
- `components/CustomCursor.tsx`
- `components/PageTransition.tsx`
- `lib/gsap.ts`

Work:
- Implement the fixed navigation, blur-on-scroll behavior, and mobile overlay menu using the navigation brief plus Phase 1/5 prompt details ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:182), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:48), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:586)).
- Centralize GSAP plugin registration and expose a single import surface to avoid duplicate plugin setup ([codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:575)).
- Build cursor, page transition, and shared hover affordance behavior so downstream page components only consume APIs/attributes rather than reimplementing motion rules ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:145), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:151), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:57)).

### 3. Implement the home page as composable sections

Files:
- `app/page.tsx`
- `components/home/Hero.tsx`
- `components/home/FeaturedWork.tsx`
- `components/home/WorkCard.tsx`
- `components/home/WorkGrid.tsx`
- `components/home/AuthorityStrip.tsx`
- `components/home/CTASection.tsx`

Work:
- Build the five home sections in the documented order and preserve the editorial, typography-first composition from the brief ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:192)).
- Start with placeholder project data, but shape the card props to match future Sanity fields so Phase 3 is a data swap rather than a component rewrite ([codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:148), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:160), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:186)).
- Add GSAP scroll-reveal hooks and hover/cursor affordances without coupling each section to global selectors.

### 4. Implement the remaining static pages and shared work interactions

Files:
- `app/work/page.tsx`
- `app/about/page.tsx`
- `app/contact/page.tsx`
- `components/work/ImageFollower.tsx`

Work:
- Build the work index, about, and contact pages with responsive layouts and reusable shared card/filter behavior ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:279), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:356), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:384), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:265)).
- Keep contact and about content centralized so the inevitable replacement of placeholder email/social/profile copy is low-risk.
- Implement the image-follower and filter UI as isolated client components to avoid forcing entire pages to become client-only.

### 5. Add Sanity content modeling and fetch layer

Files:
- `lib/sanity.ts`
- `lib/queries.ts`
- `sanity/schema/caseStudy.ts`
- `.env.local.example`
- optional local studio files under `studio/`

Work:
- Create a typed Sanity client and GROQ query layer for featured work, all projects, slugs, and individual case studies ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:177), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:368)).
- Model the case-study schema around the architecture brief's case-study sections so content shape maps naturally to the UI structure ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:289), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:384)).
- Keep preview/token support optional and isolated from production fetches.

### 6. Implement dynamic case-study rendering

Files:
- `app/work/[slug]/page.tsx`
- `components/case-study/*`

Work:
- Build the full case-study template with cover, info strip, problem, strategy, identity, application, results, and next-project sections ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:289), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:448)).
- Use server data fetching for route generation and metadata, but isolate motion-heavy sections into client components only where needed.
- Replace placeholder project data on the home/work pages with Sanity-backed data once the schema and queries are stable.

### 7. Run the animation/polish pass

Files:
- Existing layout, nav, home, work, and case-study components
- `components/SmoothScroll.tsx`
- `components/MagneticButton.tsx`

Work:
- Apply the dedicated motion pass only after the static/dynamic structure is working, to keep debugging localized and avoid hiding structural defects behind animation complexity ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:90), [portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:131), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:563)).
- Validate whether GSAP Club `SplitText` is actually available; if not, substitute a free character-splitting approach before depending on it broadly ([codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:775)).
- Treat Lenis as optional until it proves compatible with ScrollTrigger in the actual build; do not add it blindly if it destabilizes scroll-driven sections.

### 8. Complete SEO, performance, and deployment hardening

Files:
- `app/layout.tsx`
- `app/og/route.tsx`
- `app/sitemap.ts`
- `public/robots.txt`
- `vercel.json`
- `next.config.js` or `next.config.mjs`

Work:
- Implement route metadata, OG generation, sitemap, robots, Sanity image domain config, and Vercel headers/environment scaffolding ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:429), [codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:664)).
- Verify image `sizes`, font preload behavior, and client-only animation imports against the performance rules before deployment ([portfolio-architecture-v2.md](/D:/My%20Portofolio/Wesite/portfolio-architecture-v2.md:419)).
- Deploy only after the production build and static generation paths are stable locally.

## Risks and Mitigations

- Licensed fonts may not be present in `public/fonts/`.
  Mitigation: add fallback font strategy and keep the preload wiring ready; block final visual sign-off until actual font files are supplied.

- GSAP `SplitText` may be unavailable because it is a Club plugin.
  Mitigation: abstract text splitting behind a small utility or component boundary so a free fallback can replace it without touching every animated section ([codex-prompts.md](/D:/My%20Portofolio/Wesite/codex-prompts.md:775)).

- Sanity credentials/content model may arrive late.
  Mitigation: implement placeholder-compatible types first, then swap to Sanity with the same card/page interfaces.

- Motion-heavy features can create SSR, hydration, or mobile performance issues.
  Mitigation: keep animation logic in client components, clean up GSAP contexts rigorously, and treat motion polish as a late pass rather than foundation work.

- Several content values are placeholders (`hello@yourdomain.com`, social handles, domain, stats counts).
  Mitigation: centralize site config/content constants so final content replacement is not spread across multiple components.

- The source markdown shows mojibake in terminal output for arrows/bullets.
  Mitigation: preserve semantic intent from the brief, but normalize copied strings in source files to valid UTF-8 or plain ASCII equivalents during implementation.

## Verification Steps

### After Step 1-2

- `npm install`
- `npm run lint`
- `npm run build`
- Manual check: nav, layout shell, fonts, cursor fallback behavior on touch vs fine pointer

### After Step 3-4

- `npm run lint`
- `npm run build`
- Manual check at mobile and desktop widths for route layout, spacing scale, and reuse of shared card/filter primitives

### After Step 5-6

- `npm run lint`
- `npm run build`
- Manual check: project lists render from placeholder and then Sanity-backed data, dynamic routes generate, metadata resolves per project

### After Step 7-8

- `npm run lint`
- `npm run build`
- Run Lighthouse or Vercel performance checks for home and one case-study page
- Manual QA:
  - hero reveal and section reveals do not throw hydration errors
  - mobile menu, filters, cursor fallbacks, and page transitions behave correctly
  - SEO outputs exist (`/robots.txt`, sitemap, OG route)

## Simplifications Made in This Plan

- Consolidated the architecture brief and prompt phases into 8 implementation steps instead of mirroring every prompt as a separate task file.
- Deferred animation polish until after structural/static/dynamic work is complete to reduce rework.
- Treated Sanity integration as a data-layer swap on top of reusable UI primitives instead of a parallel second implementation track.

## Remaining Open Inputs

- Real font files for Degular Display and Satoshi
- Final email address, social handles, and domain
- Final authority-strip numbers if the displayed stats must be factual
- Sanity project ID, dataset, and whether local Studio should live in-repo or remain hosted
