# Toopeace Landing Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a framework-free local clone of the current Toopeace landing screen with matching SVG draw animation, staged content reveal, hover/focus states, re-entry replay, and responsive navigation.

**Architecture:** Keep the page split into `index.html`, `styles.css`, and `app.js`. The HTML owns the visible structure and inline SVG; CSS owns layout and visual states; JavaScript owns only path animation state and viewport intersection. A dependency-free smoke test checks the static contract, while browser QA checks rendered behavior.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-in `assert`, Python `http.server` for local serving, Chrome browser inspection.

**Spec:** `docs/superpowers/specs/2026-08-13-toopeace-landing-clone-design.md`

## Global Constraints

- Preserve the observed black full-viewport hero and thin white SVG wordmark.
- Preserve path IDs `T`, `O1`, `O2`, `P`, `E1`, `A`, `C`, `E2` and their observed stagger delays.
- Preserve the observed reveal delays: copy at `3.0s`/`3.1s`, navigation at `3.3s`, caption at `3.6s`.
- Use no external runtime, tracking script, vendor stylesheet, or image asset.
- Keep the three observed labels and their relative destinations.
- Include a reduced-motion fallback and visible keyboard focus state.

---

### Task 1: Lock the static page contract

**Files:**
- Create: `test/verify.mjs`
- Create: `index.html`
- Create: `styles.css`
- Create: `app.js`

**Interfaces:**
- `index.html` exposes `.toopeace-wrap`, `.tp-svg-text`, eight `[data-l]` SVG nodes, `.tp-copy`, `.tp-labels`, and `.tp-caption`.
- `styles.css` exposes `.tp-visible` and `.tp-reduced-motion` visual states.
- `app.js` initializes the wordmark animation on `DOMContentLoaded` and uses `.toopeace-wrap` as its observer target.

- [ ] **Step 1: Write the failing smoke test**

Create `test/verify.mjs` with this dependency-free contract:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');

assert.match(html, /class="toopeace-wrap"/);
for (const id of ['T', 'O1', 'O2', 'P', 'E1', 'A', 'C', 'E2']) {
  assert.match(html, new RegExp(`data-l="${id}"`));
}
for (const label of ['GROWTH LAB', 'SOCIAL WAVE', 'DIGITAL SPACE']) {
  assert.match(html, new RegExp(label));
}
assert.match(css, /min-height:\s*100vh/);
assert.match(css, /@media\s*\(min-width:\s*769px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /3\.6s/);
assert.match(js, /IntersectionObserver/);
assert.match(js, /strokeDashoffset/);
console.log('Toopeace static contract: PASS');
```

- [ ] **Step 2: Run the test and confirm it fails before implementation**

Run: `node test/verify.mjs`

Expected: FAIL with an `ENOENT` error because `index.html`, `styles.css`, and `app.js` do not exist yet.

- [ ] **Step 3: Implement the minimal HTML shell**

Create `index.html` with:

```html
<main class="toopeace-wrap" aria-labelledby="page-title">
  <h1 id="page-title" class="visually-hidden">Toopeace</h1>
  <svg class="tp-svg-text" viewBox="0 0 1000 100" role="img" aria-label="Toopeace">
    <!-- the eight source paths live here with data-l IDs -->
  </svg>
  <p class="tp-copy">I build cool companies</p>
  <p class="tp-copy tp-copy-2">with cool people.</p>
  <nav class="tp-labels" aria-label="Select your experience">
    <!-- three source labels with inline icons and observed paths -->
  </nav>
  <p class="tp-caption">SELECT YOUR EXPERIENCE</p>
</main>
<script src="./app.js" defer></script>
```

Use `href="19?19=3"`, `href="19?19=1"`, and `href="19?19=2"` on the three anchors to preserve the source destinations for this pass.

- [ ] **Step 4: Implement the visual shell and responsive rules**

Create `styles.css` with the observed values: black full viewport background, 20px horizontal page padding, wordmark max width `1400px`, 1.5px white path stroke, desktop breakpoint at `769px`, 44px dividers, rounded dark pills, and staged opacity/translate transitions. Add `.visually-hidden`, `:focus-visible`, and a reduced-motion rule that sets paths to visible and content opacity to `1`.

- [ ] **Step 5: Implement the animation controller**

Create `app.js` with:

```js
const LETTERS = [
  { id: 'T', dash: 200, delay: 0 },
  { id: 'O1', dash: 289, delay: 0.25 },
  { id: 'O2', dash: 289, delay: 0.5 },
  { id: 'P', dash: 380, delay: 0.75 },
  { id: 'E1', dash: 428, delay: 1 },
  { id: 'A', dash: 310, delay: 1.25 },
  { id: 'C', dash: 241, delay: 1.5 },
  { id: 'E2', dash: 428, delay: 1.75 },
];
```

Initialize each path's dash values, animate to `0` with a `1.8s cubic-bezier(0.25, 0.1, 0.25, 1)` transition, add `.tp-visible`, erase to the configured dash when the observer reports the hero out of view, and add `.tp-reduced-motion` when the media query matches.

- [ ] **Step 6: Run the smoke test and confirm it passes**

Run: `node test/verify.mjs`

Expected: PASS with `Toopeace static contract: PASS`.

- [ ] **Step 7: Commit the self-contained page**

This workspace is not currently a Git repository, so create no commit unless a repository is initialized by the user. Preserve the files in place and report the exact local paths.

### Task 2: Render and verify the local page

**Files:**
- Read: `index.html`
- Read: `styles.css`
- Read: `app.js`

**Interfaces:**
- Local root URL: `http://127.0.0.1:4173/`
- Static smoke command: `node test/verify.mjs`

- [ ] **Step 1: Start the local server**

Run: `python3 -m http.server 4173 --bind 127.0.0.1` from the workspace root and keep the process running for browser QA.

- [ ] **Step 2: Verify desktop rendering**

Open `http://127.0.0.1:4173/` in the browser at the normal desktop viewport. Confirm the initial screenshot shows the wordmark drawing, then after at least 4 seconds confirm the full wordmark, copy, pills, and caption are visible.

- [ ] **Step 3: Verify interaction states**

Hover and keyboard-focus each pill; confirm its background brightens and focus remains visible. Scroll far enough to move the hero outside the viewport and back; confirm the wordmark erases and redraws.

- [ ] **Step 4: Verify mobile rendering**

Use a viewport narrower than `769px`; confirm the three pills stack vertically, dividers are hidden, the wordmark remains within the viewport, and text remains legible.

- [ ] **Step 5: Verify browser console and final artifact**

Confirm there are no page errors, reload once to confirm animation determinism, and report the local URL plus the files created.

## Self-review checklist

- The spec's source-animation, responsive, accessibility, and out-of-scope requirements are covered by Task 1.
- The browser-rendering and interaction requirements are covered by Task 2.
- No placeholder steps remain; commands, selectors, constants, and expected results are explicit.
- The JS constants and selectors match the HTML/CSS interfaces defined above.
