# WHIZZY — Personal Portfolio

A single-page, fully responsive portfolio for **Khalid (WHIZZY)** — Software & Game Engine Developer.

Pure HTML + CSS + vanilla JS. **No build step.** Just double-click `index.html`.

## Files
- `index.html` — semantic markup, SEO + Open Graph meta, inline SVG favicon
- `styles.css` — editorial design system (warm off-black + bone + muted gold, Fraunces/Inter type pairing)
- `script.js` — scroll reveals (IntersectionObserver + failsafes), sticky-header state, smooth/accessible anchor scrolling, footer year

## Bilingual — Arabic (Saudi dialect) by default, with English toggle
- The page ships as `<html lang="ar" dir="rtl">` — **Arabic (Saudi dialect) is the default**, fully RTL.
- A language toggle in the header switches every text element via `data-en` / `data-ar` attributes,
  flips `lang`/`dir`, updates the page title, and remembers the choice in `localStorage`.
- Arabic uses **IBM Plex Sans Arabic** (body + headings); the Latin display serif (Fraunces) and
  grotesk (Inter) stay for the brand, the English title line, and tech terms.
- **BiDi correctness:** every inline Latin/tech run (C/C++, UE5, SQL Server, emails, phone, URLs, …)
  is wrapped in `<bdi>` (`unicode-bidi: isolate`) so mixed Arabic/English never reorders. Western
  digits, email, phone, GitHub, and LinkedIn stay LTR. Section index numbers (001, 01–05) stay LTR.
- Layout mirrors via CSS logical properties (`margin-inline`, `padding-inline`, `inset-inline`,
  `text-align: start/end`) — no hard-coded left/right.
- Default markup is Arabic, so the page stays fully readable even with JavaScript disabled.
- To edit/add a translation, change the `data-ar` / `data-en` attribute on the element in `index.html`
  (inline `<bdi>` tags inside attributes are written escaped, e.g. `&lt;bdi&gt;C/C++&lt;/bdi&gt;`).

## Design
- Palette: `#14110E` background · `#EFE9DF` text · `#C2A878` gold accent
- Type: **Fraunces** (display serif headings) + **Inter** (body), loaded from Google Fonts with system-font fallbacks if offline
- Sections: Hero · About · Skills · Selected Work · Education · Contact
- Accessible: skip link, focus-visible states, `prefers-reduced-motion` support, no-JS fallback (content never stays hidden)
- Verified responsive at 375 / 768 / 1440 px with no horizontal overflow

## Before you publish — fill these in
The Contact section is wired with your real details (email, phone, LinkedIn). The only
placeholder left is **GitHub** — search `<!-- FILL: github -->` in `index.html` and replace:

```html
<a class="contact-value contact-empty" href="#" aria-disabled="true">add your GitHub URL</a>
```

with your real GitHub URL, e.g.:

```html
<a class="contact-value" href="https://github.com/YOUR_USERNAME" target="_blank" rel="noopener noreferrer">github.com/YOUR_USERNAME</a>
```

(Also update the `og:url`/`og:image` tags if you deploy to a public domain.)
