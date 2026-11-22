# RagabGFX — Rebuild 2026: update steps

New files (upload these 3 to the **repo root** — same folder as the old `index.html`):
- `index.html` — new single-page site (replaces the old `index.html`)
- `rgx-new.css` — new stylesheet
- `rgx-new.js` — new script + all 44 works with hologram explanations

**Do NOT touch `assets/`** — all 44 work images and the hero/about images are
loaded from the existing `assets/` folders with the same relative paths, so
they keep working on GitHub Pages.

**`category.html`: keep it in the repo, but the new site does not link to it.**
All 44 works now live on the single page with filters (All 44 / Matchdays 10 /
Hero Graphics 10 / Identities 10 / Manipulation 14). Keeping `category.html`
is harmless; deleting it is also fine — nothing links to it any more.
Old files `rgx15.css`, `rgx15.js`, `style.css`, `script.js` are no longer used
by the new `index.html` and can be left or deleted.

## What changed
- One page, all 44 works, no duplicates, no dead category links.
- **Tabs:** bold Anton typography tabs (not plain pills) with per-category
  custom SVG icons, superscript counts, and a sliding red-glow indicator
  that moves under the active tab; grid fades and cards stagger in on
  every filter change.
- **Icons:** one inline-SVG system everywhere (nav, tabs, socials, contact
  rows, copy button, lightbox prev/next/close) — consistent 1.8px stroke,
  red accents, hover micro-animations. No emoji icons.
- **Entry:** branded intro/preloader — RagabGFX letters stagger in over a
  solid #0B0B0C background with a red progress bar, ~1.1s max, click or
  Esc to skip, then the hero headline lines and portrait reveal
  dramatically. Respects `prefers-reduced-motion` (intro skipped).
- **Hologram hover:** hover a card (tap on touch) and a glass panel appears
  over the artwork with the title, client/category and 1–2 sentences
  explaining the idea. Click opens a fullscreen viewer for *that* work,
  with prev/next, counter (e.g. 3/44), Esc / arrow keys and swipe.
- Bold broadcast hero: huge layered type over the portrait, availability
  badge, stat strip (2000+ projects · 17 clients · 4 categories), parallax
  on the portrait (foreground only), staggered reveal.
- Clean solid backgrounds only — warm near-black `#0B0B0C`, charcoal panels,
  off-white, signal red used sparingly. Only texture is a 4% grain overlay
  and thin lines. No background photos anywhere.
- Motion kept: staggered reveals, pausing marquee, magnetic Let's Talk
  button, scroll-progress line, hover zoom 1.04. All motion respects
  `prefers-reduced-motion`.
- Mobile: real hamburger menu with fullscreen overlay, single-column grid,
  tap targets ≥ 44px, hero stacks.
- Performance: `loading="lazy"` on below-fold images, `decoding="async"`,
  fixed aspect ratios to avoid layout shift.
- Contact: WhatsApp is the primary action, plus Instagram / LinkedIn /
  Facebook rows and a "Copy WhatsApp number" button (+20 101 602 9558).
  Behance is shown as "Link to add" — no profile URL was invented.
  No email address is shown — none was provided.

## Option A — GitHub website (no terminal, easiest)
1. Open https://github.com/ragabgfx/RagabGFX
2. Click **Add file → Upload files**.
3. Drag in `index.html`, `rgx-new.css`, `rgx-new.js` (choose "Replace" if asked).
4. Commit directly to `main`.
5. Wait ~1 minute, then open https://ragabgfx.github.io/RagabGFX/index.html
   and hard-refresh (Ctrl/Cmd + Shift + R).

## Option B — git (terminal)
```bash
git clone https://github.com/ragabgfx/RagabGFX.git
cd RagabGFX
cp /path/to/new-site/index.html .
cp /path/to/new-site/rgx-new.css .
cp /path/to/new-site/rgx-new.js .
git add index.html rgx-new.css rgx-new.js
git commit -m "Rebuild: single-page portfolio with hologram hover, all 44 works"
git push origin main
```

## Check after publishing
- Hero loads, portrait is visible, type is layered over it.
- Filters show 44 / 10 / 10 / 10 / 14 and each filter shows the right works.
- Hover a card → hologram panel with the story appears; on a phone, tap toggles it.
- Click a card → fullscreen viewer opens *that* image, with counter and prev/next.
- Menu (☰) on a phone opens a fullscreen menu.
- No broken images — if one is broken, check that `assets/` was not moved.

---

# خطوات التحديث (عربي)

الملفات الجديدة (ارفع الـ 3 دول في **جذر الريبو** — نفس مكان `index.html` القديم):
- `index.html` — الموقع الجديد صفحة واحدة (بيبدّل القديم)
- `rgx-new.css` — الستايل الجديد
- `rgx-new.js` — السكربت الجديد + الـ 44 شغلانة مع شرح الهولوجرام

**متلمسش فولدر `assets/`** — كل الصور بتتقرأ من نفس المسارات القديمة، فهتشتغل على GitHub Pages زي ما هي.

**`category.html`: سيبه في الريبو، بس الموقع الجديد مش بيلينك عليه.** كل الشغل بقى في صفحة واحدة بالفلاتر. الملفات القديمة `rgx15.css` و `rgx15.js` و `style.css` و `script.js` مش مستخدمة خلاص.

## التحديث من موقع GitHub (أسهل، من غير تيرمينال)
1. افتح https://github.com/ragabgfx/RagabGFX
2. دوس **Add file → Upload files**
3. اسحب `index.html` و `rgx-new.css` و `rgx-new.js` واختار Replace لو سألك
4. اعمل Commit على `main`
5. استنى دقيقة وافتح https://ragabgfx.github.io/RagabGFX/index.html واعمل Hard Refresh (Ctrl/Cmd + Shift + R)

## بعد النشر اتأكد من
- الهيرو شغال والصورة باينة
- الفلاتر بتطلع 44 / 10 / 10 / 10 / 14 صح
- الـ Hover بيطلع شرح الهولوجرام، وعلى الموبايل اللمسة بتفتحه
- الضغط على تصميم بيفتح الـ Lightbox بتاع نفس التصميم مع عداد و Prev/Next
- منيو الموبايل (☰) بيفتح منيو كامل
