# Emily Zhang — Portfolio · Design & Build Notes

A static, dependency-free site built from your Figma design. No build step, no
framework: open the HTML files and they work. Everything below documents what was
built, why, and exactly what you still need to supply.

---

## 1. Running it

```bash
cd ~/Desktop/portfolio && python3 -m http.server 4321
```

Then open <http://localhost:4321>. (Opening `index.html` by double-click works too,
but a server is closer to how it will behave when deployed.)

**Deploying** — any static host works. GitHub Pages: push this folder to a repo,
Settings → Pages → deploy from `main` / root. Netlify or Vercel: drag the folder in.
No configuration needed.

---

## 2. File map

```
portfolio/
├── index.html                        Home — hero + 3 project cards
├── about.html                        About — portrait + intro
├── wait-room.html                    Case study 1
├── keep-pennsylvania-beautiful.html  Case study 2
├── content-generation.html           Case study 3
├── design.md                         This file
└── assets/
    ├── css/style.css                 All styles, one file, numbered sections
    ├── js/main.js                    ~90 lines of vanilla JS, no dependencies
    ├── img/                          Images sliced from your Figma exports
    │   ├── favicon.svg               Red "E" mark on cream — hand-drawn in SVG
    │   ├── card-*.jpg                Home page thumbnails (3)
    │   ├── wait-room-1…4-phone.mp4   Feature clips — whole phones on a lime plate
    │   ├── wait-room-5.mp4/.webm     Feature 5 — the Forgive card
    │   ├── wait-room-*-poster.jpg    …poster frames / reduced-motion stills
    │   ├── wait-room-6-wrap.png      Feature 6 still — transparent, no baked lime
    │   ├── kpb-home.jpg              KPB final design, 1400w, from assets/KPB/high fi.png
    │   ├── kpb-home@2x.jpg           …and its retina pair, 2800w
    │   ├── kpb-old-home.jpg          KPB's site as it was — home page
    │   ├── kpb-old-events.jpg        KPB's site as it was — event search
    │   ├── about-portrait.jpg        About photo, from assets/about/IMG_2368.HEIC
    │   ├── nudge-*-body.png         Rabbit rigs — body layer, from assets/wait room/
    │   ├── nudge-*-arm*.png         Rabbit rigs — the limbs that animate
    │   ├── nudge-fume-vein.png      Rabbit rigs — the throbbing anger mark
    │   ├── doodle-frame.png          Hand-drawn photo frame (About)
    │   ├── doodle-star.png           Hand-drawn star — every bullet on the site
    │   ├── doodle-house.png          Hand-drawn house — the HOME nav link
    │   ├── doodle-bulb.png           Hand-drawn lightbulb (KPB insights)
    │   ├── apple-team.jpg            Content Generation collage — lead photo
    │   ├── apple-talk.jpg            …meeting-room screen
    │   ├── apple-bags.jpg            …Apple gift bags
    │   ├── apple-selfie.jpg          …team selfie
    │   └── content-generation-1.jpg  Old template-picker shot — no longer used
    └── resume/
        └── emily-zhang-resume.pdf    Your resume — opened directly by the nav link
```

There is no shared template/include, because that would need a build step. The nav
and footer are therefore **duplicated in all five HTML files** — if you change a link,
change it in all five. A find-and-replace across the folder is the fastest way.

### The Resume link

There is no resume page. **RESUME** in the header links straight to
`assets/resume/emily-zhang-resume.pdf` with `target="_blank"`, so it opens the PDF in a
new tab. To update your resume, overwrite that file — keep the filename and nothing else
needs editing.

---

## 3. Design tokens

All colours were sampled pixel-by-pixel from your PNG exports, so they match exactly.

| Token | Value | Where it's used |
|---|---|---|
| `--cream` | `#EFEEE3` | Page background |
| `--cream-warm` | `#F5F4EC` | Resume PDF frame |
| `--ink` | `#3E3E3E` | Body text, nav |
| `--ink-soft` | `#6F6E64` | Meta values, captions, colophon |
| `--red` | `#C23A3C` | Headings, section labels, accents, hover |
| `--red-deep` | `#A62E30` | Reserved for deeper accent states |
| `--olive` | `#CFCCAD` | Project card panels |
| `--lime` | `#E8F19A` | Case-study image panels, text selection |
| `--rule` | `#C9C6B4` | Hairlines, borders, feature block frames |

The palette is deliberately narrow: two neutrals carry the page, and red + lime do all
the "bright" work. Red is never used for large fills — only type and 1–2px lines —
which is what keeps it feeling energetic rather than loud.

### Typography

**Two faces, copied from ziaoh.com's system.**

First, a correction worth having: ziaoh does **not** use Playfair Display. Its serif is
**Instrument Serif**, and the only webfonts it loads are Instrument Serif (roman +
italic) and Caveat (a handwriting face used for small marginal accents). Everything else
on that site is system Helvetica Neue. This site now uses the same two-role structure:

| Role | Face | Used for |
|---|---|---|
| Display / editorial | **Instrument Serif** (roman + italic) | short expressive lines only |
| Working sans | **Source Sans 3** | everything functional |

The dividing line is the whole idea: **the serif is for lines you read as a statement,
the sans is for lines you read as information.** A serif line is never more than about
two lines long.

### What gets which face

| Element | Face | Size @1440 | Tracking |
|---|---|---|---|
| Home hero title | **Sans** | 52px | −0.015em |
| Home hero paragraphs | Serif | 21px / 1.5 | normal |
| Case-study title | Serif | 40px | −0.02em |
| Project name under card | Serif | 22px | normal |
| Feature headings (Planning, …) | Serif | 19px | normal |
| "Next project" name | Serif | 30px | −0.01em |
| Figure captions | Serif *italic* | 16px | +0.02em |
| About heading | Serif | 28px uppercase | +0.01em |
| Nav links | Sans | 14px uppercase | +0.11em |
| Red section labels (CONTEXT, …) | Sans | 12px uppercase | +0.1em |
| Meta strip labels | Sans | 12px uppercase | +0.1em |
| Meta strip values | Sans | 15px | normal |
| Case-study body prose | Sans | 16px / 1.62 | normal |
| Feature body copy | Sans | 15px / 1.65 | normal |
| Keyword pills | Sans | 11px | +0.02em |
| KPB lede / question | Serif | 26px | −0.005em |
| KPB section headings | Serif | 22px | normal |
| KPB bullets & numbered list | Sans | 16px | normal |
| Process pills | Sans | 12px uppercase | +0.1em |
| Process item notes | Sans | 13px, `--ink-soft` | normal |
| Footer | Sans | 14px | +0.02em |

Long-form body copy stays **sans** deliberately. ziaoh sets its *short* hero statements
in serif but its actual paragraphs of body text in sans at 13px — a display serif like
Instrument is built for size, not for stamina.

### Line-breaking

Short display lines — the hero title and paragraphs, page titles, card names, feature
headings — carry `text-wrap: balance`, which evens out the line lengths instead of
filling each line greedily. That is what stops a paragraph from leaving one or two
orphaned words alone on a final line. Measured at 1280: the hero paragraphs break
377/398px and 445/435px — near-identical line lengths.

Long-form case-study prose uses `text-wrap: pretty` instead. Balance reflows the whole
paragraph and browsers cap it at a few lines; pretty only fixes the last line, which is
the right trade for body copy.

Both are ignored by older browsers, which just wrap normally — no fallback needed.

The hero measure is capped at **680px**, deliberately narrower than it needs to be.
Instrument Serif is a condensed face, so a wider box let the first paragraph collapse
onto a single long line at some viewport widths; 680px keeps both paragraphs at two
balanced lines across the whole laptop range.

### Weight logic

**Nothing is bold except emphasis inside a paragraph.** Every element is weight 400.
The only 600s on the site are two `<strong>` runs, both drawn bold in your own mockups:
`versatility` / `impact` on About, and the project's focus sentence in KPB's Context
paragraph. Those are the only two pages that load Source Sans 3 600 (`wght@400;600`);
the other three request `wght@400` only. To make the rule absolute, delete
`.prose strong` and `.about-body strong` and drop `;600` from those two font links.

That is ziaoh's rule, and it is the single most copyable thing about its typography. An
audit of that site turns up 400 almost everywhere; the only exceptions are a 300 on one
oversized numeral and a 500/600 on a couple of 11px accents. Hierarchy is carried
entirely by **size, face contrast (serif vs sans), colour, and tracking** — never by
weight. Everywhere except those two `<strong>` runs, hierarchy comes from size, face
contrast, colour and tracking alone.

### Tracking logic (optical sizing)

Tracking moves in the opposite direction to size — big type tightens, small type opens:

| Size band | Tracking | Reasoning |
|---|---|---|
| 28px and up | **−0.01 to −0.02em** | large letterforms drift apart; pull them back |
| 15–21px | **normal** | reading sizes need no correction |
| 11–14px uppercase | **+0.1em** | capitals need air to stay legible |
| 14px sentence case | **+0.02em** | slight opening at small sizes |

### Line-height logic

Display lines set tight (**1.1–1.2**), reading text set open (**1.5–1.65**), and
uppercase labels sit around **1.2–1.4**. Same split ziaoh uses: 46px leading on a 44px
title, 30px leading on a 20px paragraph.

### One thing I did not copy

ziaoh loads **Caveat**, a handwriting face, for tiny marginal asides ("trust me",
"Click to cue the vibe"). That is a third voice and a distinctly personal one. Easy to
add later if you want it for the About page.

### The hero title is sans, not serif

Your mockup drew "Hi, I'm Emily Zhang!" in the sans while keeping the paragraphs
beneath it in the serif, so that is what is built. It is also a pattern ziaoh itself
uses — its case-study H1 is sans at 44px while its hero paragraphs are serif. Change
`.hero-title` to `font-family: var(--font-display)` if you want it serif again.

### Swapping either face

Change the `<link>` in all five `<head>`s and `--font` / `--font-display` in
`style.css`. Both are single tokens, so nothing else needs touching.

The scale is tuned for laptop screens (1280–1512px), calibrated against the two
reference sites. Measured at 1280px: **karenlou.com** is a flat 16px for nav, hero and
body alike, with 10px labels; **ziaoh.com** runs 14px chrome, a 20px lead paragraph,
17px section headings and a 44px project title. This site sits between them.

| Role | Token | Value | Renders at 1440 |
|---|---|---|---|
| Home hero | `--fs-display` | `clamp(2rem, 3.6vw, 3.25rem)` | 52px |
| Case-study title | `--fs-title` | `clamp(1.875rem, 2.9vw, 2.5rem)` | 40px |
| Hero paragraphs | `--fs-lead` | `clamp(1.0625rem, 1.45vw, 1.1875rem)` | 19px |
| Body / prose | `--fs-body` | `1rem` (flat) | 16px |
| Dense body, meta values | `--fs-small` | `0.9375rem` | 15px |
| Red section labels | `--fs-label` | `0.75rem`, uppercase, `0.13em` | 12px |
| Nav and footer links | `--fs-nav` | `0.875rem`, uppercase, `0.11em` | 14px |
| Tags, eyebrows, colophon | `--fs-micro` | `0.6875rem`, uppercase | 11px |

Body is deliberately **flat rather than fluid** — 16px is the comfortable reading size at
every width, and karenlou.com holds it constant too. Only the display sizes scale with
the viewport, so a wide monitor gets a bigger hero without inflating the paragraphs.

Case-study prose measures 744px at 1440 — about 90 characters, right at the readable
maximum.

The hero previously computed to 79px at laptop width, which is roughly double either
reference. It is now 52px.

**The tokens above are the global ones (home, About, nav, footer). The three case-study
pages use their own scale**, scoped by `<body class="case-study">` (CSS section 17b) so the
home page cannot move. Before, those pages ran eight near-identical sizes (40 / 26 / 22 /
19 / 16 / 15 / 13 / 12) with a hole between the 40px title and the 12px "headings", and the
same job looked different per page (Wait Room's Context / The problem / Features were
12px caps labels; KPB's Research Process was a 22px serif). Now each size has one job
(px at a 1440 viewport; phone value in brackets, every step is a `clamp`):

| Role | Token | Size | Used for |
|---|---|---|---|
| Title | `--cs-title` | 48 (36) | page title |
| Section heading (H2) | `--cs-h2` | 32 (26) | every H2 on every case study, and KPB's central question (`.lede`) |
| Sub-heading (H3) | `--cs-h3` | 24 (21) | feature titles, the "ideation" fold |
| Body | `--cs-body` | 18 (17) | prose, bullets, numbered insights, feature text, meta values, process names |
| Secondary | `--cs-small` | 16 | process notes, captions, notes, "soon to be updated" |
| Label | `--cs-label` | 13 | meta strip headings, eyebrow, process pills, "Next project" |

Rules that keep it coherent: section headings are one style (red serif, sentence case,
-0.015em); the small uppercase look is kept only for genuine labels; nothing on these pages
is below 12px (the decorative URL inside the browser frame); `.one-line` no longer shrinks
below body size, it wraps; prose caps at 66 characters except in the intro columns and the
deliberate full-width one-liner. To change the scale, edit the six `--cs-*` values.

**Case-study vertical rhythm.** Spacing between the parts of a case study also follows the
content hierarchy, scoped to `body.case-study` (CSS section 17c). It used to come from five
unrelated places and the title band sat ~100px from the first heading while the page's own
major sections sat only 44px apart. Now one token per level (px at 1440; phone value in
brackets, every one a `clamp`):

| Tier | Token | Size | Where |
|---|---|---|---|
| First | `--gap-first` | 96 (56) | title band to the first content |
| Major | `--gap-major` | 80 (48) | between top-level sections |
| Minor | `--gap-minor` | 56 (32) | stacked sections in one column (Problem to Design goals), and the two-column blocks once they stack |
| Heading | `--gap-head` | 24 (16) | a heading to the content it introduces |
| Exit | `--gap-exit` | 112 (64) | last section to the project navigation |

A divider (a `.section-break` rule or the fold) takes half the major gap on each side, so a
divider costs no more than a plain gap. Spacing now comes from the direct children of the
content wrapper (a stack with `margin-top`), not from section padding; to add a section,
just add it and it will sit one major gap below the previous block. To change the feel of
all three pages at once, edit the five `--gap-*` values.

### Layout

- `--wrap`: `min(1220px, 88vw)` — the main content column.
- `--wrap-n`: `min(820px, 88vw)` — narrow column, used on the Resume page.
- Prose is capped at `74ch`. **Deliberate deviation:** your Figma text column is ~800px
  at 16px, which runs to ~100 characters per line. 74ch is the readable maximum, so
  case-study paragraphs are slightly narrower than the mockup. Change `.prose`'s
  `max-width` to `800px` if you'd rather match Figma exactly.
- Horizontal rules span `min(1160px, 84vw)` — very slightly narrower than the content,
  as in your design.

---

## 4. Components

**Project cards (home).** Three equal columns, all three cards on one shared
`aspect-ratio: 1 / 0.78`. Padding is `9%` of card width, the inset your design uses.

Cards used to be sized from their own image (`0.8435`, `0.6905`, `0.7103` — the ratios
that make the olive band an even 9% on all four sides for each picture), and the middle
one carried a downward offset. Between them, no two cards were the same size and every
project name sat on a different line. One shared ratio fixes both: the panels match, and
because the row is `align-items: start` with nothing offset, the names and the pill rows
land on the same baseline on their own — measured identical at 1440, 900 and 780px. The
cost is that the olive band is no longer even on every card: image 1 gains a little at
the sides, images 2 and 3 a little above and below. `0.78` sits between the three source
ratios so no card carries much of it.

Below 760px they stack into one column and each card goes back to its own image's
height — with nothing beside them there is no row to keep.

**Hero.** Built from Emily's own sketch: two columns on one full screen. Left, centred on
each other: the cut-out of her (cropped at the chest) bobbing above **Emily Zhang** in
Source Sans 3 **Bold** (~120px at 1440, the one bold weight on the site, in `--red`), then
the tagline *design • product • fine arts* (small drawn dots, 0.2em) in `--blue` (#2F6EB9, sampled from the sketch;
the only blue on the page). Right: the two lines about her, left-aligned in Instrument
Serif (~30px), with the last line sitting on the tagline's baseline (`align-items: end`).
Below 900px it stacks and centres. The sketch's own typefaces (a rounded sans and a book
serif) were not adopted; the site's two faces carry it, so the hero matches the rest.

**The home grid.** One container and one split run down the whole home page. Header,
hero, the rule, the project rows and the footer all share `--wrap` (1220px at 1440), so
their left and right edges line up. The hero and every project row divide that width
the same way, `--split: 7fr 5fr` (7 of 12 columns for the picture / name, 5 of 12 for
the words), and the words in both are inset by the same `--card-pad`, so the hero's
copy and each project's copy start on one vertical line (x≈866 at 1440). Hero copy uses
`text-wrap: balance` so each paragraph breaks into even lines, with the hyphen in
"Human-Computer" tightened by hand. Below 900px the hero stacks and the rows go to one
column. If you change `--split` or `--card-pad`, both move together.

**Card labels.** Each card carries a permanent label underneath: the project name in
red serif (~22px), then a row of red outlined keyword pills. Nothing is hidden behind a
hover any more.

**Hover.** The card lifts 7px, the screenshot scales 3%, the name draws a red underline
left-to-right, and the pills fill solid red. The name's underline is the click
affordance the old centred overlay used to carry. Hovering the label works too — the
`<a>` and the label are siblings inside `.work-item`, and the hover rules key off the
wrapper.

**Section rules.** Both `<hr class="rule">` elements are now `width: var(--wrap)` —
exactly the width of the project grid (1220px at 1440). Verified: rule and grid both
start at x=110 and run 1220px. They previously sat 60px narrower on each side, which
made the grid look like it was overflowing its own section.

**About page.** Two columns — portrait left, writing right — on a `1.05fr 1fr` grid,
collapsing to one column at 900px.

The portrait sits inside **her own drawn rectangle** — no CSS border, and no blue mount;
the doodle is the only edge. Its stroke is eroded 5px before export so the line reads thin
against a small photo, matching the reference. The frame is a `background` at
`100% 100%`, so it stretches with the photo at any width. Captions bracket it — the name
flush left above, the year flush right below — like a print.

The photo column is an **explicit `460px`** rather than a ratio, with the writing taking
whatever is left (702px at 1440). A ratio made the portrait grow with the viewport; a
fixed column keeps it modest and lets the text breathe.

The two are **balanced on one shared centre line** (`align-items: center`) so the page
reads as a single object rather than two stacked blocks — measured offset between the
photo block's centre and the text block's: **0px**. The writing also has no measure cap;
it was stopping at 58ch inside a 700px column, which made the text tall and thin. Filling
the column brought the block from ~900px down to **524px**, close to the photo's 437px,
which is what makes the centring read as balance rather than as a floating photo. Natural
line breaks plus `text-wrap: pretty` keep the longest line at ~65 characters, so the wider
measure costs nothing in readability.

The heading is the display serif, uppercase, in red, with the Chinese characters nudged up
`1.08em` because CJK glyphs sit optically small beside Latin capitals.

The list markers are red six-spoke asterisks drawn as an SVG in the `--asterisk` token and
applied through `mask`, rather than a text glyph — a character like ✳ renders as a colour
emoji on some systems, which would have broken the palette. They rotate slightly on hover.

**What the About page no longer has.** The old Education / Experience / Skills placeholder
blocks are gone; your design replaced them with this single piece of writing, and the
resume PDF already carries that detail. If you want a compact Education line back, the
`.meta` strip from a case-study page is the closest matching component.

**The doodles are hers.** Four elements were sliced out of
`assets/doodling/Untitled_Artwork.png` by connected-component analysis and replaced the
SVG stand-ins I had drawn: the photo frame on About, the star that marks every bullet on
the site, the lightbulb beside KPB's insights, and the house that replaces the word HOME
in the nav.

Her ink measures exactly **`rgb(194, 58, 60)` — `#C23A3C`, the site's `--red`** — she drew
them in the palette. Even so, three of the four are applied as **CSS masks** rather than
plain images, so they take their colour from the page: the star stays `--red` at any size,
and the house uses `currentColor`, which means it sits in ink and turns red on hover just
like the word it replaced. Only the lightbulb is a plain `<img>`, since nothing needs to
recolour it.

Line weights were **thickened before downscaling** (an alpha dilate, 9–13px depending on
how far the element had to shrink). Without it the house at 24px and the star at 11px
would have rendered as faint threads — the strokes now read at the same visual weight as
the type beside them.

The nav keeps a `.visually-hidden` "Home" so the link still announces itself; the house
span is `aria-hidden`.

*One CSS gotcha worth remembering: `url()` inside a stylesheet resolves relative to the
**stylesheet**, not the page. `assets/img/…` in `assets/css/style.css` silently became
`assets/css/assets/img/…`. The paths are `../img/…`.*

**Content Generation — the photo collage.** Four photos cropped from
`assets/apple/` to the layout's ratios rather than squashed into it: the lead team shot
at 1.47 (its native 1.5, so almost nothing is lost), the meeting-room screen and the gift
bags at 1.15, and the group selfie at 1.83 with its focal point held at 42% height so the
faces survive the crop.

The grid needs no hard-coded heights. The lead photo's own `aspect-ratio: 1.47` sets the
block height; the right column is `grid-template-rows: auto 1fr`, so the square-ish pair
sizes itself and the selfie takes whatever is left. Verified: both sides finish at 487px,
exactly level. Below 760px it stacks and the selfie reverts to its own ratio.

The page reuses KPB's `.brief-grid`, `.label`, `.prose` and `.bullets` rather than
inventing new classes, so the type is identical across the two case studies by
construction — 12px red labels, 16px body, 16px bullets, 600 only inside `<strong>`.

**KPB — the final-design showcase.** The source export is 5448 × 14391. Dropping a
3700px-tall screenshot into the page whole would bury everything below it; scaling it to
fit would make it unreadable. So it sits at full width inside a **browser frame with its
own scroll**: the visitor walks the real page at real size, and the case study keeps its
shape. The frame is 640px tall on a laptop (`clamp(420px, 64vh, 760px)`), sits on the
same lime stage as the rest of the page's imagery, and runs to the same L/R margin as
every other block.

Two exports are served through `srcset` — 1400w (564 KB) and 2800w (1.1 MB) — with
`sizes` matched to the real 1130px slot, so a retina laptop pulls the 2800w file for a
~2.5× effective density. That is what makes the nav labels and body copy inside the
screenshot legible; the previous asset was 1100px wide and visibly soft.

The scroll container is keyboard reachable (`tabindex="0"` with a group label) and keeps
default scroll chaining, so reaching the bottom continues the page rather than trapping
the reader.

**Keep Pennsylvania Beautiful — page structure.** The longest case study, laid out from
your design: the central question as a red serif `.lede`, then a two-column `.brief-grid`,
then the research rail, key insights, the final design, and next steps.

The brief grid **mixes writing and archive shots in both columns** so the two "before"
screenshots stagger diagonally rather than stacking: Context sits over the old event-search
page on the left, the old home page sits over Design Goals on the right. That interleaving
is what keeps the block balanced — measured column heights 590px and 612px, within 22px of
each other. The old Takeaways section is gone.

Archive shots are captioned like plates: a hairline border, 4px radius, and a centred
`--ink-soft` caption at 15px — the same treatment captions get everywhere else. On mobile
the grid collapses to one column and the reading order becomes Context → old events → old
home → Design goals, which puts the two "before" shots together as a pair.

The **research rail** is a four-column grid of lime pills joined by a hairline. The line
is drawn as `.process::before` and spans exactly from the first pill's centre to the
last's — `calc((100% - 3 * var(--rail-gap)) / 8)` on each side, which is half a column
given four equal columns and three gaps, so it stays true at any width (verified: rail
ends land on the pill centres with 0px error). Below 900px the grid drops to two columns
and the line is hidden, since it would no longer connect anything.

Under each pill, item names sit in ink and their explanatory notes in `--ink-soft` at
13px. Your design bolded those names; here the colour and size split carries the same
hierarchy without adding a third bold to the site.

The **lightbulb** beside Key Insights is an inline SVG in `--red`, faded in with the
section rather than on load, and hidden below 900px where there is no margin for it.

**Wait Room — feature showcases.** The six feature blocks use two treatments, because
the source material is two different things.

*Blocks 1–5 are clips.* Blocks 1–4 come out of the 91-second screen recording of the
Figma deck. Its four scenes start at 0, 12.25, 27.25 and 43.5s (found by diffing the
caption region), and each clip is the window inside its scene where something actually
moves. Block 5 comes from a second, 12-second recording of the Forgive prototype — that
one loops three times on its own, so the clip is a single 4.05s cycle cut at the reset
frame (t=2.3333s), with the static tail trimmed to 3.5s. Because it is a widget card
rather than a phone, it is landscape (1100×896) where the others are portrait. Each
ships as MP4 + WebM with a poster frame:

```html
<figure class="feature-media feature-media--motion">
  <video autoplay muted loop playsinline preload="metadata"
         poster="assets/img/wait-room-1-poster.jpg" width="752" height="1000">
    <source src="assets/img/wait-room-1.webm" type="video/webm">
    <source src="assets/img/wait-room-1.mp4" type="video/mp4">
  </video>
  <img class="feature-media-fallback" src="assets/img/wait-room-1-poster.jpg" alt="…">
</figure>
```

**Whole phones, composited onto lime.** An earlier pass cropped these clips to the
*screen* — inside the bezel — because the first recording of the deck cut every phone off
at the slide edge, so a whole device was never captured. A second recording (`8.27.35 PM`)
frames all five scenes with the complete phone inside the slide, which is what these clips
are cut from now. Nothing is synthesised: the frame, the screen and the proportions are all
straight out of the mockup, which is why they match each other.

The presentation canvas behind the phone is black, so the clip cannot simply be cropped to
the phone's bounding box — the rounded corners would leave black wedges on the lime. Each
scene is instead composited:

1. A **silhouette mask** is built once per scene from a representative frame: threshold the
   phone against the black canvas, then fill each row between its first and last lit pixel.
   That gives a solid, correctly-rounded body outline (including the side-button bumps)
   without having to model the squircle analytically. The phone does not move within a
   scene, so one static mask serves the whole clip.
2. A **lime plate** is generated at the output size, carrying a blurred, offset copy of the
   mask as the phone's drop shadow.
3. ffmpeg crops and scales the phone, `alphamerge`s it with the mask, and overlays it on
   the plate.

The plate is padded (34px sides, 14 top, 50 bottom) so the shadow fades to flat lime before
the file's edge — without that margin the shadow is clipped and the plate's boundary reads
as a faint rectangle against the panel. The plate lime is `#E8F19A`, the same token the
panel uses, so the file's corners land within ~1/255 of the panel behind it.

Because the lime, the corners and the shadow are all in the pixels, these four clips take
`.feature-media--device`, which removes the CSS radius and box-shadow: a radius would round
lime against lime, and a box-shadow would trace a rectangle around a phone that is not one.
Feature 5 keeps both, since it really is a rounded card.

**One landscape piece among five portrait ones.** Feature 5 is a slab of a single screen
rather than a whole device, so under the shared `max-*` sizing it hit the panel's width
first and ran to 532×433 — nearly the full frame, reading far heavier than the 263×507
phones next to it. `.feature-media--card` caps it to 76% of the content width. That is
chosen by *area*, not by edge length: at 404×329 it covers 133k px², the same as a phone
at 263×507, so the two shapes carry equal weight even though neither dimension matches.

**Finding the phone's edge when the bezel is black.** The crop box for each scene comes
from scanning the frame for the phone against the deck's black canvas — but a phone's top
bezel *is* black, so a brightness test only finds the bright metal frame, and where that
frame is a thin arc over the Dynamic Island it falls under any sensible pixel-count
threshold. Features 2 and 3 lost 21px off the top that way: enough to slice the rounded
corners flat. The reliable method is to start from a row known to be inside the phone and
walk outward while the row still holds a handful of non-canvas pixels, in both axes. That
finds the true silhouette including the dark bezel.

**The duration flag has to survive the shell.** The first build of these four came out
running from each clip's start point to the *end of the recording* — 63s, 51s, 33s, 16s
instead of 7.5–11s — because `-t` never took effect. Each clip therefore played on through
every later feature, and since the crop box and the mask are cut for one scene only, the
phone appeared offset inside a silhouette that no longer fitted it, with the bare plate
showing through as a paler rectangle. Both "bugs" were the one bug. Two shell traps caused
it and are worth knowing:

- `crop=$cw:$ch:$cx:$cy[ph]` — **zsh reads `$cy[ph]` as an array subscript**, so the crop
  silently loses its last argument. Brace every variable that touches a filtergraph label:
  `crop=${cw}:${ch}:${cx}:${cy}[ph]`.
- `set -- $pair` does not word-split in zsh, so loops built that way run with the whole
  string as a single argument.

Always read the duration back off the finished file (`ffmpeg -i`) rather than trusting the
command; every one of these failures is silent.

**Why the filenames carry `-phone`.** These four filenames held three different cuts in
one sitting — full-bleed, screen-only, then whole-phone. Browsers cache video hard enough
that a normal reload keeps serving the old file, which shows up as a phone that looks
offset or double-framed inside a correctly-sized panel. Renaming on a change of content is
cheaper than debugging a cache. The posters are cut from the finished MP4 rather than from
a second filtergraph, so they cannot drift from the clip they stand in for.

**Bitrate.** These clips are expensive — a whole phone screen packs far more small,
high-contrast detail per pixel than the old zoomed crops. Denoising does not help (the cost
is genuine spatial detail, not source noise) and neither does dropping the frame rate (the
scenes are static between beats, so the bits go to intra, not motion). The lever that works
is resolution plus CRF, and it is safe to push CRF here because the clips display at ~45%
of their encoded width, which hides the artifacts. VP9 lost decisively to H.264 on this
content — it needed CRF 54 to match x264's CRF 33 file size — so blocks 1–4 ship as MP4
only. Feature 5, whose card compresses very differently, still ships both and WebM still
wins there.

**The panel is a fixed shape; the clip fits inside it.** Left to size themselves, those
mismatched aspects gave every block a different height — feature 4 alone was 1289px tall,
more than a laptop viewport holds at once, so you could not watch one feature without
scrolling. `.feature-media` therefore carries its own `aspect-ratio` (`604 / 579` above
the one-column breakpoint, `3 / 4` below it, where a landscape panel would leave the
phones too small to read), and the media inside is sized by `max-width`/`max-height`
rather than `width: 100%`. Two details make that work: the panel needs explicit
`minmax(0, 1fr)` grid tracks so the percentages have a definite box to resolve against,
and the rule has to sit after the plain `.feature-media img, .feature-media video` block
— `--motion` is one class, so it ties on specificity and order decides.

The result is one panel size everywhere (604×579 at a 1440px viewport, 557×534 at 1280px),
clips at ~88% of the panel's height — the proportion the reference showcases use — and
every feature block short enough to sit inside an 800px viewport. Feature 6's flat export
fills its panel exactly, since the panel borrowed its proportion in the first place.

The clips' lime comes from `.feature-media` rather than the pixels. The poster does double
duty: it holds the frame while the video loads, and under `prefers-reduced-motion` the CSS
hides the `<video>` and shows the `<img>` instead, so the block never loops for anyone who
asked it not to.

*Block 6 is a still.* It is a composition rather than a single screen — a phone with the
wrap card laid over it — and only reads correctly whole, so it is never cropped to the
phone. It comes from `Frame 40.png` (14354×20733) exported **with its alpha intact** and
cropped to the artwork's own bounds, which is the tidiest case of the three: nothing is
baked in, so the panel's `--lime` shows through the transparent margins directly and
there is no colour to match. Its own shadow and the pink glow travel in the alpha, which
is why it takes no `box-shadow` of its own.

One consequence worth knowing: the plate carries the artwork's designed margins, so its
phone reads smaller than the clips', and its panel is shorter. Matching them would mean
re-framing the clips to the same margins, not the other way round — the plate is what the
Figma page actually specifies.

**Cropping inside a rounded corner.** The clips are cropped to the artwork's bounding box,
which for a rounded card leaves wedges of the dark Figma canvas in the four corners — very
visible against lime. Cropping inset by more than `0.293 × radius` puts the crop corner
inside the arc and the wedges disappear. Block 5's card has a 41px radius at source scale,
so it is cropped 18px in on every side.

**Export MP4/WebM, not GIF.** A GIF of a phone screen recording is typically 5–15 MB and
capped at 256 colours, which wrecks the gradients in these mockups; the same clip as MP4
is usually 200–500 KB and smoother. Six GIFs would add tens of megabytes to one page.

**Wait Room — the nudges.** Three rabbits hang around the top of the page and scroll
away with it. They are `position: absolute` inside `.page-head`, not fixed, which is the
whole point: they turn up, they are ignorable, and they leave — the same contract as the
feature they illustrate.

Each rabbit is a **small rig, not a flat picture**. The ink limbs were sliced out of your
artwork by colour (any pixel dark enough to be brush ink, inside a hand-picked region)
into their own transparent layers on the original canvas, then stacked *under* the body
so the shoulder joints stay hidden, and rotated about the point where the limb meets the
body. The body layer carries no animation at all — only the limbs move:

| Rabbit | Source | Moving layers | Pivot | Reads as |
|---|---|---|---|---|
| `--scratch` | `image 48.png` | raised arm | 77% 50% | scrubbing the back of its head, −8° to +3° |
| `--fume` | `image 40.png` | both arms + anger mark | 30%/70% 60%, 66% 47% | elbows pumping, the vein throbbing to 1.27× on the offbeat |
| `--wave` | `image 49.png` | upper arm | 76% 28% | leaning in sideways and waving, ±14° |

**Every position is relative — no pixel or rem offsets anywhere.** Two mechanisms do it:
`left` / `right` / `top` as a percentage of the *container*, and `--shift` as a percentage
of the *rabbit's own height* (which is what a percentage inside `translateY` resolves
against). The fumer and waver are children of the lime band itself, so they follow it
wherever it goes.

Measured across five widths — the relationships hold proportionally:

| Viewport | Scratcher top | Fumer feet into band | Waver below band | Waver overhang | Text collisions |
|---|---|---|---|---|---|
| 1024 | −49px | 4px | 0px | 39px | none |
| 1280 | −66px | 6px | 0px | 49px | none |
| 1440 | −78px | 6px | 0px | 53px | none |
| 1512 | −79px | 6px | 0px | 53px | none |
| 1920 | −92px | 6px | 0px | 53px | none |

A negative scratcher top means it clips the page edge, which is the intended look. The
collision check tests the rabbits against the *text* rectangles of the title, eyebrow and
every meta cell — not their block boxes, which would report false hits since an `h1`
spans the full column.

Entrances are staggered well apart — **0.3s, 1.5s, 2.7s** — so they arrive one at a time
rather than all at once, each with a small overshoot before settling. The idle tics then
run on uneven cycles (3.6s / 2.4s / 3.1s) that are mostly still, so the three never fall
into step. All of it stops under `prefers-reduced-motion`. Below 640px only the scratcher
survives; the other two would land on the title.

To re-slice after editing the artwork, the regions and the ink threshold are in the
build snippet recorded in this file's history — or just re-cut by hand into
`nudge-<name>-<layer>.png`, keeping every layer at the same canvas size so they stack.

**One margin, everywhere.** Every block on a case-study page runs to exactly the same
left and right edge — verified at 1440: page head, lime band, intro columns, FEATURES
label, all six feature frames, the project nav and the footer rule all sit at L=110 /
R=1330. The two-column intro prose has **no measure cap**, so the right column's text
ends flush with the band and the frames rather than stopping short. Long-form prose on
the other two case studies is still capped at 74ch — that is a reading measure, not a
block edge, and those pages are single-column.

The FEATURES label now sits **33px** above its first frame, not 77px. A section label
belongs to what it labels; at the old distance it read as floating free.

**Wait Room — layout.** Context sits left, Problem and Design Goals stack right, on a
two-column `.intro-grid`. Three full-width blocks in a column left the top of the page
very tall with a lot of dead space on the right; two columns let the reader take the
framing in at once. The `ROLE / TIMELINE / SKILLS / TOOLS` strip sits on a full-width lime band, with the
four parts on equal shares of the panel and each one centred in its share — so the row
is evenly distributed and the group's centre lands exactly on the panel's centre
(verified: cell centres at 273 / 571 / 869 / 1167 in a band from 110 to 1330). **All
three case studies use this band.**

**Project navigation.** One compact pill at the bottom right of each case study: the label
"Next project" and the project's name on one line, then an arrow ("Keep Pennsylvania
Beautiful →"). Naming the destination is the actual UX fix; "Next project →" alone asks the
reader to commit without telling them to what. On hover it fills with `--red` and the text
turns cream, the way the tag pills do. On a phone the label and name stack on two lines in
a rounded rectangle. There is deliberately no "All work" link here any more: the pinned
header's WORK link is the way back. All three case studies use it, in a loop
(Wait Room → Keep Pennsylvania Beautiful → Content Generation → Wait Room).

**Placeholder styling.** Any element with `class="is-placeholder"` gets a dashed red
frame and a small uppercase caption drawn from its `data-placeholder` attribute. Once
you've written the real content, **delete the `class` and `data-placeholder` attributes**
and the frame disappears — no other cleanup needed.

---

## 5. Delightful details

Small, quiet, and all of them switch off under `prefers-reduced-motion: reduce`.

1. **Hero entrance.** "Emily" and "Zhang" rise into place one at a time, then the
   tagline, then the copy, then the "Selected work" cue.
1b. **Full-screen hero.** Header + hero are exactly one viewport tall (`100svh`), the copy
   is centred, and a "Selected work ↓" cue at the foot links to `#work`. The work section
   is also one screen tall with the cards centred, so the cue and the WORK nav link land
   on a composed screen with the grid right under the pinned header.
2. **The cut-out and her "hi!".** Emily, arms up, rocks above her name and never stops
   (the rocking does not change on hover). Hovering *her* (not the name) makes her say
   hi, drawn from your reference: a thin blue line is drawn out from the right side of
   her mouth heading right, bends gradually upward through the gap between her hat and
   raised arm, and meets the underside of a circle just left of its centre, almost
   vertically; the circle with "hi!" then springs open. It uses the tag pills' thin blue
   outline, the lighter warm cream fill and "hi!" in Instrument Serif italic in `--blue`.
   The line, circle and text are one SVG (`.hero-hi`, in `index.html`) whose units are
   fractions of her width, so the line stays on her mouth at every screen size, and it
   rocks with her so it never detaches. On phones the drawing is scaled up 1.45x from her
   mouth so the word stays readable. To change the bubble, edit the path (curve) and
   circle (`cx`, `cy`, `r`) coordinates there; her mouth is at x 50, y 25.
3. **Nav underlines** wipe in from the left and out to the right — direction-aware, so
   they feel like a physical stroke rather than a fade.
4. **Project rows (home).** The three projects are stacked as wide rows: the picture
   fills the whole left side edge to edge (cropped to cover), the copy panel is the page's
   own cream, and a soft shadow — not an outline — defines the card. On a phone the
   picture sits on top. The whole row is one click target via the title's link. On hover
   (or keyboard focus) a 2px red stroke is drawn over the card's edge and the shadow is
   removed; the row also rises 6px, the image scales slightly, the keyword pills fill
   solid red, and "View case study →" underlines and slides its arrow. Each row's
   one-line description and year live in `index.html`. Wait Room uses
   `card-wait-room-phone.jpg` (the widget inside an iMessage chat, with the annoyed rabbit).
5. **Pinned header.** The nav (house · WORK · ABOUT · RESUME) never hides, so Home and
   Work are always one click away, even at the foot of a long case study. At the top of
   the page it has a little extra room above it; that room scrolls off and a 64px bar
   (`--header-bar`) stays pinned as a translucent cream fill with a blur and no outline.
   WORK is underlined while the project grid is on screen (home) and on every case-study
   page.
6. **Reading progress.** A 2px red line across the top of the case-study pages.
6b. **The nudges.** Three rabbits arrive one after another at the top of the Wait Room
   page and scroll away as you read. Their arms are separate layers pivoted at the
   shoulder, so they really scratch, pump and wave rather than wobbling as a whole.
7. **Scroll reveal.** Content fades up as it enters view; the three home cards stagger
   100ms apart.
8. **Lime text selection.** Highlighting any text turns it `#E8F19A`.
9. **Next project.** The pill fills red on hover and its arrow slides right.

*(A beating ♥ in the old multi-line footer was removed when the footer was simplified to
a single "Emily Zhang, 2026" line.)*

---

## 6. Accessibility & performance

- Skip-to-content link on every page (visible on keyboard focus).
- Focus rings are red, offset 4px, and never removed.
- Every image has a real, descriptive `alt`; decorative items are `aria-hidden`.
- Hidden section headings (`.visually-hidden`) keep the heading outline valid on pages
  where the design shows no visible heading.
- `aria-current="page"` marks the active nav item.
- All motion respects `prefers-reduced-motion`.
- Card captions stay reachable by keyboard (`:focus-visible` reveals them).
- Images carry `width`/`height` (no layout shift), `loading="lazy"`, and
  `decoding="async"`. Total image weight ≈ 1MB across the whole site.
- No JavaScript is required to read anything — JS only adds motion.
- A print stylesheet strips the chrome.

**Breakpoints:** 900px (About and meta strip collapse), 760px (cards and features stack),
460px (meta strip goes single-column, nav tightens).

---

## 7. ⚠️ Placeholders — exactly what you need to supply

### Everywhere (all five pages)

Nothing left — the footer contacts are live on all five pages:

| Link | Target | Behaviour |
|---|---|---|
| Email | `mailto:yunhanzh@andrew.cmu.edu` | opens the visitor's mail client |
| Linkedin | `https://www.linkedin.com/in/yunhan-zhang-52885b339` | new tab, `rel="noopener"` |
| Resume (header) | `assets/resume/emily-zhang-resume.pdf` | new tab |

### `index.html`

| Placeholder | What it stands for |
|---|---|
| `assets/img/og-image.jpg` | The preview image shown when someone shares your site in Slack, iMessage, LinkedIn, etc. Make it **1200 × 630 px** — the hero line on the cream background works well. Until it exists, links share with no image (harmless). |
| `<meta property="og:image">` path | Once you have a domain, change this to the full URL (`https://yourdomain.com/assets/img/og-image.jpg`) — relative paths don't resolve on some platforms. |

### `about.html`

Nothing left — the page is fully written, and the portrait is exported from
`assets/about/IMG_2368.HEIC` to `assets/img/about-portrait.jpg` (1400×1050).

### `keep-pennsylvania-beautiful.html` — one placeholder

| Placeholder | What it stands for |
|---|---|
| **Process & research artefacts** | Optional. This project is marked "September 2025 – Present" and your design only showed the final home page. When the research is shareable, add think-aloud findings, interview synthesis, wireframes, and what changed between rounds. Copy a `.feature` block from `wait-room.html` for an alternating image/text layout. Delete the dashed box when done. |

---

## 8. Copy notes

All case-study text is transcribed **verbatim** from your Figma files — I didn't rewrite
your voice. A few things you may want to fix, since they'll be read by recruiters:

- **Home hero:** "a traditional artist about weaving medium" — "about" reads oddly here.
  Possibly "interested in weaving mediums" or "who weaves mediums together"?
- **Wait Room / Context:** "a product that aim to make" → "aims".
- **Wait Room / Tracking:** "Interactive Timeline turns when the event approaches" —
  "turns" may be a typo for "starts" or "turns on".
- **Wait Room / Customization:** "Costume settings" → almost certainly "Custom settings".
- **Wait Room / Ending:** "every members arrive, the post could press" — "the post" may
  be "the host".
- **Content Generation:** "The current manual process are time-consuming" → "processes
  are" or "process is".
- I corrected one heading: your design reads "Lateness Annul Wrap"; the page says
  **"Lateness Annual Wrap"**. Change it back if "Annul" was the joke.

**One thing to fix in the resume PDF itself:** it says you redesigned *"Keep **Pittsburgh**
Beautiful's"* website, but the organisation — and your case study, and the screenshot — is
*Keep **Pennsylvania** Beautiful*. Worth correcting before you send the PDF anywhere.

Two other judgement calls worth knowing about:

- The KPB page title keeps your "(Home Page)" qualifier, set `nowrap` so it never breaks
  awkwardly. Drop it once more of the project is on the page.
- Content Generation's timeline shows "June 2025 – August 2025" (your export used
  `-->`); an en dash reads better on the web.

---

## 9. Adding a new project

1. Copy `wait-room.html` → `your-project.html`.
2. Replace the title, the four `<dl class="meta">` values, and the prose sections.
3. Add or delete `.feature` blocks — alternation handles itself.
4. Update the "Next project" link at the bottom of your new page, and point the previous
   project's "Next project" link at it. (The three current pages form a loop:
   Wait Room → KPB → Content Generation → Wait Room.)
5. Add a card to `.work-grid` in `index.html`. The grid is built for three cards; for
   four or more, change `grid-template-columns` and decide which cards get the vertical
   offset — currently `:nth-child(2)`.
6. Export a thumbnail (~1000px wide, JPEG) to `assets/img/card-your-project.jpg`.
7. Fill in `.card-name` and add two or three `.tag` pills. Keep the keyword sets
   **disjoint** across projects — the whole point is that each card claims a distinct
   territory. Current sets:
   Wait Room → Interaction Design, Rapid Prototyping ·
   Keep Pennsylvania Beautiful → UX Research, Information Architecture, Storytelling ·
   Apple → AI-assisted Prototype, Design System, Workflow Automation.

---

## 10. Where the images came from

Your four Figma PNG exports on the Desktop were the source. I sampled the palette from
them, then sliced out the artwork programmatically:

- **Card thumbnails** — cropped from the project cards in `Frame 2.png` at full export
  resolution, then downscaled to 1000px wide.
- **Wait Room features** — the six lime panels were located by scanning for `#E8F19A`.
  Block 6 is still exported whole (lime background included), re-cut from the 8388px
  full-page export at 1208px wide so the composition keeps its designed margins;
  blocks 1–5 became clips (see below).
- **KPB result** — the lime panel from `KPB.png`, 1100px wide.
- **Content Generation** — the framed screenshot from `Content Generation.png`, 1300px wide.

All are JPEG at quality 84–88. If you re-export anything from Figma later, keep the same
filenames and nothing else needs to change.
