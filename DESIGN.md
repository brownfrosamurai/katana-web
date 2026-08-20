# Katana Design System

Implementation-ready design language for the Katana portfolio. Mode: **redesign, preserve**. Evolve the existing identity into an editorial, magazine-like system. Do not replace the product or its information architecture.

**Design read:** developer portfolio for recruiters and design-conscious peers, with an editorial / magazine language, leaning toward native CSS + Tailwind v3 + Motion, with one signature GSAP moment.

**Dials**

| Dial | Value | Why |
| --- | --- | --- |
| `DESIGN_VARIANCE` | 7 | Asymmetric magazine grids, left-aligned type, mixed media ratios. Not chaotic. |
| `MOTION_INTENSITY` | 5 | Page-load and scroll reveals, hover physics on CTAs. One cinematic GSAP stack on Home. |
| `VISUAL_DENSITY` | 3 | Gallery spacing. Type and images carry the page. |

**Stack lock (do not mix systems)**

- Framework: Next.js 15 App Router, React Server Components by default
- Styling: Tailwind CSS v3 (existing). Do not migrate to v4 as part of this work.
- Motion: Framer Motion (`framer-motion`) for UI. GSAP + ScrollTrigger only for the Home project stack.
- Theme: `next-themes` with `class` strategy, `defaultTheme="system"`
- Type: `next/font` only. No Google Fonts `<link>`.
- Icons: Phosphor (`@phosphor-icons/react`) for UI glyphs. Keep existing GitHub / LinkedIn / PSN brand marks.

---

## 1. Design principles

1. **Content leads layout.** Case studies and notes are the product. Chrome (nav, labels, chrome lines) is supporting type, not decoration.
2. **Typography is the identity.** JetBrains Mono is the only face. Hierarchy comes from size, weight, and tracking, not from mixing families.
3. **One voice, one accent, one radius rule.** Lowercase copy, navy ink accent, sharp interactive edges.
4. **Preserve Katana DNA.** Keep `.katana`, leading-dot labels (`.about`, `.work`), hairline rules, and the all-lowercase register.
5. **Show the work, do not simulate it.** Real covers, real MDX, no gradient-only project tiles when a screenshot exists.
6. **Quiet motion.** Motion explains hierarchy or acknowledges input. It never loops for atmosphere except the availability state.
7. **Accessible by default.** Dual theme, WCAG AA contrast, visible focus, reduced-motion collapse.

---

## 2. Brand tokens to preserve

These already exist and should survive the editorial shift.

| Token | Current | Keep as |
| --- | --- | --- |
| Wordmark | `.katana` | Exact string, lowercase, no icon lockup |
| Voice | all-lowercase body and nav | Keep. Sentence case only in MDX article titles if the source title is cased |
| Section label | `.about` / `.work` / `.say hello` | Keep the leading-dot + mono pattern. Cap at 1 per 3 sections |
| Typeface | JetBrains Mono | Keep as the only face: display, body, meta, and code |
| Availability | green live indicator on Home | Keep as **semantic status**, not a brand accent |
| Home project stack | GSAP pinned card stack | Keep as the single cinematic motion on the site |
| IA / routes | `/`, `/projects`, `/about`, `/blog`, `/contact` | Do not rename slugs. Nav label `notes` for `/blog` stays |

Retire: rainbow per-project accents, neon glow pulse as a visual brand, decorative crosshair / circle SVGs, pure `#000` dark canvas, `ContactSection` cloned onto every page. Do not replace JetBrains Mono.

---

## 3. Color palette

One cool-neutral family (zinc). One brand accent (ink navy, already in the codebase as `--accent-blue`). Green is status only.

Do not introduce a second accent. Do not color-code project cards orange / yellow / violet. Project identity comes from photography and type.

### 3.1 CSS variables

```css
:root {
  --background: oklch(0.985 0.004 95);   /* paper, not pure white */
  --foreground: oklch(0.22 0.02 250);    /* ink */
  --muted: oklch(0.45 0.015 250);        /* secondary text */
  --muted-bg: oklch(0.96 0.004 95);      /* banded sections */
  --line: oklch(0.88 0.01 250);          /* hairlines */
  --accent: #1e3a5f;                     /* ink navy, existing --accent-blue */
  --accent-hover: #16304e;
  --status: #3f7a4c;                     /* desaturated available-green */
  --overlay: oklch(0.985 0.004 95 / 0.78);
  --radius: 0px;                         /* sharp system */
}

.dark {
  --background: oklch(0.16 0.01 250);    /* charcoal, not #000 */
  --foreground: oklch(0.96 0.005 95);
  --muted: oklch(0.72 0.01 250);
  --muted-bg: oklch(0.20 0.01 250);
  --line: oklch(0.28 0.01 250);
  --accent: #8ba3c4;                     /* lifted navy for dark contrast */
  --accent-hover: #a8bdd6;
  --status: #6ea57a;
  --overlay: oklch(0.16 0.01 250 / 0.78);
}
```

Map to Tailwind as semantic colors (`bg-background`, `text-foreground`, `text-muted`, `border-line`, `text-accent`, `bg-status`). Stop using raw `neutral-*` once tokens land.

### 3.2 Usage rules

| Role | Token | Notes |
| --- | --- | --- |
| Page canvas | `--background` | Entire site. No mid-page theme flip. |
| Primary text | `--foreground` | Headlines and body |
| Secondary text | `--muted` | Dates, labels, helper copy. Must stay AA against canvas. |
| Rules / borders | `--line` | Hairlines only. No 1px box around everything. |
| Banded section | `--muted-bg` | Alternate rhythm **within** the same theme (zinc-100 today). Tint, do not invert. |
| Links, focus, primary fill CTA | `--accent` | One accent on the whole site |
| Available / live | `--status` | Home availability dot only |
| Overlay nav | `--overlay` + backdrop-filter | Desktop header only. Solid fallback under `prefers-reduced-transparency`. |

**Banned:** `--accent-orange`, `--accent-yellow`, `--accent-green` as brand color, `grey-alt` mapping to violet, `bg-orange-500` project panels, gradient fallbacks as the primary project visual.

**Accent lock:** if a control, link, or focus ring is colored, it is navy (or its dark-mode lift). Status green never appears on buttons.

### 3.3 Contrast targets

- Body text vs canvas: 7:1 (AAA target)
- Secondary text vs canvas: 4.5:1 minimum
- Accent on canvas (links): 4.5:1
- Primary CTA: `--accent` fill + paper text, or paper fill + `--accent` text with a 1px `--foreground` border. Never white-on-white.
- Status dot: pair with the word `available`. Color is not the only signal.

---

## 4. Typography

**Type lock:** JetBrains Mono is the product typeface. Do not add a serif or a second sans. Editorial tone comes from scale, rag, hairlines, and photography, not from a display family.

### 4.1 Families

| Role | Face | Source | Used for |
| --- | --- | --- | --- |
| Display, body, meta, code | **JetBrains Mono** | `next/font/google` (`--font-mono`) | Everything. `font-sans` and `font-mono` both map to this face. |

Wordmark `.katana` stays Mono, same as header and footer.

### 4.2 Scale

Use `text-` Tailwind steps. Do not invent extra sizes.

| Name | Class | Weight | Tracking | Line-height | Use |
| --- | --- | --- | --- | --- | --- |
| Display | `text-4xl md:text-5xl lg:text-6xl` | 500 | `-0.03em` | 1.1 | Home H1 (max 2 lines) |
| Page title | `text-3xl md:text-4xl` | 500 | `-0.02em` | 1.15 | `/projects`, `/about`, `/blog`, `/contact`, article H1 |
| Section | `text-xl md:text-2xl` | 500 | `-0.01em` | 1.2 | In-page section heads (rare; prefer the content itself) |
| Lead | `text-lg md:text-xl` | 400 | `0` | 1.5 | Page intro, about lead. Max 25 words. |
| Body | `text-base` | 400 | `0` | 1.65 | Prose, forms. `max-w-[65ch]` |
| Meta | `text-xs md:text-sm font-mono` | 400 | `0.08em` | 1.4 | `.labels`, dates, nav |
| Caption | `text-sm text-muted` | 400 | `0` | 1.5 | Image captions, helper text |

Italic in display: minimum `leading-[1.1]` and `pb-1` on any italic word with descenders (`y g j p q`).

**Emphasis:** italic or semibold of JetBrains Mono only. Do not inject a second family for accent words.

### 4.3 Voice

- Lowercase for chrome: nav, buttons, section labels, wordmark, short UI strings.
- Article and project **source titles** keep their authored capitalization in MDX.
- No filler verbs (`elevate`, `unleash`, `seamless`).
- No em-dash (`—`) or en-dash (`–`) in any visible string. Hyphen only (`2020-2021`, `end-to-end`).
- One CTA label per intent. Contact intent = `say hello` everywhere (nav already says `contact`; see Navigation).

---

## 5. Spacing scale

Use a 4px base. Prefer these utilities; do not sprinkle one-off `py-[13px]`.

| Token | Class | Use |
| --- | --- | --- |
| 4 | `gap-1` / `p-1` | Icon optical alignment |
| 8 | `gap-2` | Label-to-input |
| 12 | `gap-3` | Compact clusters |
| 16 | `gap-4` | Default inner |
| 24 | `gap-6` / `p-6` | Card-equivalent padding (when a box is required) |
| 32 | `gap-8` | Section internals |
| 48 | `gap-12` / `mb-12` | Title to nearby content |
| 64 | `py-16` / `mb-16` | Page header to first block |
| 96-192 | `py-24 md:py-36 lg:py-48` | Section vertical (`section-padding`) |

**Hero top padding cap:** `pt-24` maximum at desktop, including the 80px fixed header offset. Content must not sit mid-viewport with empty space above.

**Section rhythm:** default `section-padding` stays. Do not stack two `--muted-bg` bands in a row. Alternate paper / muted / paper.

---

## 6. Grid and layout

### 6.1 Page frame

- Outer: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (existing `Container`)
- Reading column (notes, case-study body): `max-w-[68ch]`
- Editorial spread (home, about, project index): full container
- Header offset: keep `pt-20` on the content wrapper while header is `h-20`

### 6.2 Editorial grid concepts

Use CSS Grid, never percentage flex math.

**12-column desktop (`lg:`)**

| Template | Columns | Use |
| --- | --- | --- |
| Split 7/5 | `lg:grid-cols-12` + `col-span-7` / `col-span-5` | Home about, about hero (image vs copy) |
| Index 9/3 | `col-span-9` + `col-span-3` | Project index: media + sticky caption |
| Folio 4/8 | `col-span-4` sticky meta + `col-span-8` body | Case study |
| Article 8 + rail | `col-span-8` + `col-span-3 col-start-10` | Note with see-also rail |
| Masthead | full bleed inside container | Home hero, page titles |

**Do not** use the split-header pattern (giant left H2 + small right explainer). Stack title then lead, `max-w-[65ch]`.

**Mobile (`< md`):** every multi-column layout collapses to `grid-cols-1`, `w-full`, existing container padding. Sticky sidebars become inline, above the media they describe.

### 6.3 Page templates

1. **Home masthead** - left-aligned display headline, meta row (name + availability), no decorative SVG. Hero must fit the first viewport: 2-line headline, lead ≤ 20 words, one CTA.
2. **Index** - page title + lead, then a single list of work or notes. Not a card grid of three equals.
3. **Case study** - title, one hero frame, sticky meta column, narrative MDX, related work, then a single closing CTA.
4. **Article** - kicker, title, cover, byline (date + reading time), prose, related notes.
5. **Utility** - contact, 404, error. Quiet, same type system, one action.

`/uses` is not in primary nav. Either add it to footer as `uses` or leave it unlinked. Do not restyle it as a fourth marketing template until it has a job.

---

## 7. Icons and illustrations

- UI icons: Phosphor, `strokeWidth` equivalent regular, size 16 or 20.
- One family. Do not mix Phosphor with new hand-drawn path icons.
- Brand marks (GitHub, LinkedIn, PSN): keep `components/icons/SocialIcons.tsx`.
- No decorative crosshairs, target SVGs, or corner circles. They currently repeat on Home, About, Notes, Contact, and Contact page. Remove in the first visual pass.
- No emoji in chrome or copy.
- Empty states: type + one Phosphor glyph, not a large outlined document icon as the hero of the empty page.

---

## 8. Elevation, borders, shadows

**Shape lock:** radius `0` for buttons, inputs, images, panels. The site is already mostly sharp. Pill badges (`Badge`) are out of system unless rewritten square, or retired (currently unused).

**Elevation:** almost none. Hierarchy comes from type size, hairlines, and photography.

| Treatment | When |
| --- | --- |
| Hairline `border-line` | Section rules, form fields, image frames |
| No border | Text lists (notes index rows, experience) |
| Tinted shadow | Desktop header only, `shadow-black/5` already exists. Do not add `shadow-lg` on project cards. |
| Fill | Primary CTA, availability dot, code block background |

Frosted header on `md+` may stay (existing `backdrop-blur-md`). Provide solid `bg-background` fallback for `prefers-reduced-transparency` and for mobile (already solid).

---

## 9. Motion

`MOTION_INTENSITY = 5`. Honor `prefers-reduced-motion: reduce` for every animation.

### 9.1 Allowed

| Motion | Tool | Why |
| --- | --- | --- |
| Home project stack | GSAP ScrollTrigger, `start: "top top"`, pin | Storytelling: work arrives as a folio |
| Section enter | Framer Motion `whileInView`, opacity + `y: 16`, once | Hierarchy |
| CTA hover / active | CSS `transition` on color; `:active` `scale-[0.98]` | Feedback |
| Cover hover | `transform: scale(1.02)`, 300ms | Feedback, images only |
| Related work stagger | Motion `staggerChildren` ≤ 0.08s | Sequence |

### 9.2 Banned

- `window.addEventListener("scroll")`
- Infinite glow / pulse as brand (replace availability with a static `--status` dot, optional 2s breathe only if reduced-motion is off)
- A second marquee or a second pinned stack
- Mixing GSAP and Framer Motion in the same component
- Animating `top`, `left`, `width`, `height`
- Magnetic cursor / custom cursor

### 9.3 Reduced motion

GSAP stack becomes a static vertical list of project covers. Motion `initial` is skipped (`useReducedMotion()` → `initial={false}`). Hover scale off.

### 9.4 Signature stack (keep, correct)

The Home stack is the only cinematic device. Implementation constraints:

- Do not mutate `project.coverImage` at render time (current `ProjectsScrollReveal` assigns `undefined` and hides photography).
- Pin at `start: "top top"`. Account for the 80px header (`start: "top 80px"` if the pin slides under the nav).
- Panels use paper or `--muted-bg`, not orange / blue / violet fills.
- Max 3-4 stacked featured projects.

---

## 10. Component standards

### 10.1 Buttons

Use `components/ui/Button.tsx` for every action. Kill one-off bordered `<Link>` CTAs.

| Variant | Look | Intent |
| --- | --- | --- |
| `primary` | `--accent` fill, paper text | One per view (Home, Contact submit) |
| `outline` | 1px `--foreground` border, transparent | Secondary (`about me`, `visit notes`) |
| `ghost` | no border | Inline text actions (back to notes) |

Sizes: `sm` 32px, `md` 40px, `lg` 48px. Labels lowercase, max 3 words, must not wrap at desktop. `:active` scale 0.98. Focus: 2px `--accent` ring, offset 2px.

**CTA intent lock**

| Intent | Label | Appears |
| --- | --- | --- |
| Contact | `contact` in nav; `say hello` as the in-page button | Nav + one closing block |
| Work | `projects` | Nav + optional home section action |
| Writing | `notes` | Nav + `visit notes` |
| About | `about` | Nav + `about me` |

Do not ship `contact me` and `say hello` and `get in touch` together.

### 10.2 Inputs

Label **above** the field (`flex flex-col gap-2`), not a side column. Current contact form uses a 80px label column that fails on small screens and puts labels in `text-neutral-500` (contrast risk).

```
[Name]
[________________]
Helper (optional)
Error (optional)
```

- Border `--line`, focus border `--accent`, no ring-0-without-replacement
- Placeholder is not a label. Placeholders empty or examples only
- Error text `--foreground` or a dedicated error token that still passes AA (prefer ink, not pale red)

### 10.3 Section header

Standardize the repeating “label + hairline” into `SectionRule`.

```
.about  —————————————————
```

Rules: `font-mono text-sm tracking-wide text-muted`, hairline `--line`. **Maximum 1 of these per 3 sections.** Home currently uses `.about`, `.latest notes`, `.say hello` plus a second uppercase line `three latest notes`. Drop the duplicate kicker.

### 10.4 Media frame

Images: full-bleed inside their grid cell, `object-cover` for editorial photos, `object-contain` for UI screenshots on a `--muted-bg` field. Always `next/image` with `sizes`. Hero/cover: `priority` on LCP only.

No pills, tags, or “Plate 03” captions on images. Caption below, functional (`Spend Lens, statement parser.`).

### 10.5 Cards

Do not wrap everything in `Card`. Use `Card` only if a true tiled object is needed. Project index and notes index should be **lists + photography**, not boxed cards with colored headers.

Retire the colored `ProjectCard` header bar (`bg-orange-500` etc.).

---

## 11. Forms and validation

Contact is the only form.

| State | Behavior |
| --- | --- |
| Default | Labels above, submit `say hello` |
| Submitting | Disable fields, button label `opening mail` |
| Success | Keep the composed confirmation (Gmail / Outlook). Offer `send another` |
| Error | Inline under the field. Do not use toast as the only error |
| Honeypot | Keep `website` off-screen; not `display:none` for a11y bots only |

Validation already lives in `lib/validations.ts` and HTML `required` / `minLength`. Surface Zod messages in the UI when the server action path is restored. Current form opens a mail client; that flow can stay, but the success copy must remain lowercase and specific.

Do not use `Button` `accent` (green) variant. Remove it from the variant map.

---

## 12. Navigation

**Desktop:** single row, height 80px max (current `h-20` is the cap). Items: `projects`, `about`, `notes`, `contact`. Active = foreground, inactive = muted. No colored dots.

**Mobile:** full-screen menu (current pattern is good). One close control. Do not duplicate `ThemeToggle` in the header row **and** the menu footer; keep it in the header only.

**Header treatment:** fixed, hairline bottom, blur on `md+`. Wordmark left, nav + theme right.

**Footer:** wordmark, social icons, optional `uses`. Not a second sitemap. No version string, no city/weather strip.

**Skip link:** add `Skip to content` as the first focusable element, targeting `main`.

---

## 13. Media and portfolio presentation

This is the highest-leverage surface.

### 13.1 Project covers

- Every featured project has a real `coverImage`. Dark variant optional.
- Never strip covers in the Home stack.
- Fallback when missing: `--muted-bg` + title in display type, not a saturated gradient.

### 13.2 Case study page (`/projects/[slug]`)

Restore MDX (`MdxRenderer` is written and currently commented out). Structure:

1. Display title + one-line description (not centered)
2. Hero media, 16:9 or 4:3, LCP
3. Folio grid: sticky meta (`role`, `client`, `date`, `tools`) + overview/approach
4. MDX body: short sections, full-bleed images via `MdxImage`, pull quotes, optional callout
5. Links: `view live` / `view repo` as outline buttons
6. Related: 2 items, same list language as notes (not rainbow strips)
7. Closing `say hello` once

Pull quote: display italic, `text-2xl`, max 3 lines, no quotation-as-decoration if the prose already quotes.

### 13.3 Notes (`/blog`)

- Hero latest + row list can stay (already editorial).
- Restore MDX body on `[slug]`.
- `BlogSeeAlso` exists but is unused. Place it as a right rail on `lg`, stacked below on mobile.
- Covers: prefer authored images. Default Unsplash fallback is acceptable only as last resort; prefer a typographic cover (title on `--muted-bg`) over a generic desert photo.

### 13.4 About

Keep the 7/5 portrait split. Replace picsum with a real portrait. Experience: keep the 3-column folio table on desktop; on mobile stack period / company / description as a single column with sparse bottom rules (not `border-t` + `border-b` on every row). Dates use hyphens: `April 2025 - Present`.

---

## 14. Empty, loading, success, error

| State | Pattern |
| --- | --- |
| Empty notes | Existing idea is right. Copy: `no notes yet` + one sentence. No giant file icon. |
| Empty projects | Same: `no projects yet` + `say hello` |
| Loading | Skeleton that matches the **final** layout (cover rect + title line). `SkeletonCard` currently mimics a generic card; rebuild to match index rows. |
| 404 | Display `404`, one sentence, `back home`. Already close. Align type with display font. |
| Error | Existing `error.tsx` + `Try again`. Lowercase the button. Do not dump `error.digest` in the UI. |
| Form success | Keep mail-compose confirmation. |

---

## 15. Responsive guidelines

| Breakpoint | Behavior |
| --- | --- |
| `< 768` | One column. Nav hamburger. Hero type `text-4xl`. Project stack is a static list if GSAP pin is costly. |
| `md 768` | Two-column splits allowed. Header blur on. |
| `lg 1024` | Folio meta column, article rail, 12-col grid. Nav must remain one line. |
| `xl 1280` | Container still `max-w-7xl`. Do not stretch prose. |

Viewport: use `min-h-[100dvh]` only where a full viewport is required (Home hero, mobile menu). Do not use `h-screen`.

Touch: 44px minimum hit area for nav, theme, hamburger, submit.

---

## 16. Accessibility

- `lang="en"` already set. Keep.
- Focus visible on every interactive control. Re-enable ThemeToggle rings (currently commented out).
- `aria-current="page"` already on nav. Keep.
- Availability: text + color. `aria-hidden` on the dot is fine if the text remains.
- Images: real `alt`. Decorative images `alt=""`.
- Motion: Section 9.3.
- Contrast: Section 3.3. Audit `text-neutral-500` labels on paper and on `--muted-bg`.
- Keyboard: mobile menu already traps Escape and closes on route change. Add focus move into the open menu.
- Forms: labels associated via `htmlFor`. Errors `aria-describedby`.
- Do not ship `outline-none` without a replacement ring.

---

## 17. Dark mode

Strategy: **system default**, manual toggle, one theme family for the whole page.

- Tokens in Section 3.1. Never `bg-black` / `bg-neutral-950` mixed with `bg-amber-50` bands.
- Covers: `coverImageDark` when the screenshot is UI chrome; photographic covers can be shared.
- Accent lifts in dark so navy still reads as the same brand, not as a new color.
- Test every template in both modes before a visual pass is done.
- Header overlay tokens must keep AA for nav text on the blurred bar.

---

## 18. File-level mapping (for implementers)

| Concern | Primary files |
| --- | --- |
| Tokens, type | `app/globals.css`, `tailwind.config.ts`, `app/layout.tsx` |
| Chrome | `components/layout/Header.tsx`, `Nav.tsx`, `MobileNav.tsx`, `Footer.tsx` |
| Home | `app/page.tsx`, `ProjectsScrollReveal.tsx`, `AboutSection.tsx`, `NotesSection.tsx`, `ContactSection.tsx` |
| Work | `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`, `ProjectCard.tsx`, `ProjectSeeAlso.tsx` |
| Notes | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `NotesList.tsx`, `PostCard.tsx`, `BlogSeeAlso.tsx` |
| About | `app/about/page.tsx`, `AboutHeroSection.tsx`, `WorkExperienceSection.tsx` |
| Contact | `app/contact/page.tsx`, `contact/ContactForm.tsx` |
| Primitives | `components/ui/Button.tsx`, `Container.tsx` |
| MDX | `components/mdx/*` (restore on slug pages) |

---

## 19. Pre-flight (every visual PR)

- [ ] One accent (navy). No per-project rainbow.
- [ ] Zero em-dashes in visible copy.
- [ ] Section labels ≤ ceil(sectionCount / 3).
- [ ] One contact CTA intent.
- [ ] Hero ≤ 2 lines + ≤ 20-word lead + CTA in first viewport.
- [ ] No decorative crosshair SVGs.
- [ ] MDX rendered on project and note slugs.
- [ ] Covers not stripped in the Home stack.
- [ ] Sharp radius everywhere.
- [ ] Dark canvas is charcoal, not `#000`.
- [ ] Reduced motion: no pin, no pulse, no hover scale.
- [ ] ThemeToggle has a visible focus ring.
- [ ] Form labels above inputs, AA contrast.
- [ ] Nav one line on desktop, header ≤ 80px.
- [ ] Typeface is JetBrains Mono only.
