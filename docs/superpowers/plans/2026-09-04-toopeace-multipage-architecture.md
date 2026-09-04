# Toopeace Multi-page Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the current scrolling Toopeace site into a hero-only home page plus dedicated Portfolio, Story, and Services HTML pages.

**Architecture:** Keep the framework-free static stack and create three root-level HTML documents that share `styles.css` and `app.js`. Standard anchors provide page navigation; defensive JavaScript initializers activate only the components present on each page.

**Tech Stack:** Semantic HTML5, CSS, vanilla JavaScript, Node.js `assert` static contracts, Python static HTTP server, browser QA.

**Spec:** `docs/superpowers/specs/2026-09-04-toopeace-multipage-architecture-design.md`

## Global Constraints

- `index.html` retains only the hero, social links, Contact CTA, and contact dialog.
- `portfolio.html`, `story.html`, and `services.html` are root-level files and share `./styles.css` and `./app.js`.
- Existing content, claims, social URLs, blog URL, images, animation behavior, and approved visual styles remain unchanged.
- Navigation uses native anchors, and subpages include a `TOOPEACE` home link.
- The current subpage link uses `aria-current="page"` and a visible active state.
- Desktop and 390×844 mobile layouts must have no horizontal overflow or navigation collision.
- Do not add a framework, router, build step, CMS, analytics, form backend, or Tally integration.

---

## File structure

- Modify `index.html`: keep the hero and dialog; replace hash navigation with page links; remove the three lower sections.
- Create `portfolio.html`: own the complete `.tp-results` section and shared navigation.
- Create `story.html`: own the complete `.tp-journey` section and shared navigation.
- Create `services.html`: own the complete `.tp-services` section and shared navigation.
- Modify `styles.css`: add subpage shell, home link, and active-navigation styles while preserving section styles.
- Modify `app.js`: keep page-safe initializers and restrict modal triggers to explicit modal-opening controls.
- Create `test/verify-multipage.mjs`: verify document boundaries, navigation destinations, active state, and home links.
- Modify the five existing test files: read assertions from the page that now owns each component.

---

### Task 1: Define the multi-page document contract

**Files:**
- Create: `test/verify-multipage.mjs`
- Test: `test/verify-multipage.mjs`

**Interfaces:**
- Consumes: four root-level HTML files and their navigation markup.
- Produces: a static contract that later tasks satisfy.

- [ ] **Step 1: Write the failing page-boundary test**

Create a test that reads all four documents and asserts literal ownership and navigation:

```js
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const [home, portfolio, story, services] = await Promise.all([
  read('index.html'),
  read('portfolio.html'),
  read('story.html'),
  read('services.html'),
]);

for (const html of [home, portfolio, story, services]) {
  assert.match(html, /href="\.\/portfolio\.html"/);
  assert.match(html, /href="\.\/story\.html"/);
  assert.match(html, /href="\.\/services\.html"/);
}

assert.match(home, /class="toopeace-wrap"/);
assert.doesNotMatch(home, /id="portfolio"|id="story"|id="services"/);

assert.match(portfolio, /id="portfolio"/);
assert.doesNotMatch(portfolio, /id="story"|id="services"|class="toopeace-wrap"/);
assert.match(story, /id="story"/);
assert.doesNotMatch(story, /id="portfolio"|id="services"|class="toopeace-wrap"/);
assert.match(services, /id="services"/);
assert.doesNotMatch(services, /id="portfolio"|id="story"|class="toopeace-wrap"/);

for (const html of [portfolio, story, services]) {
  assert.match(html, /class="tp-home-link" href="\.\/index\.html"/);
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
}

console.log('Multi-page document contract: PASS');
```

- [ ] **Step 2: Run the new test and verify RED**

Run: `node test/verify-multipage.mjs`

Expected: FAIL with `ENOENT` for `portfolio.html`, proving the new page boundary does not exist yet.

- [ ] **Step 3: Commit the failing contract**

```bash
git add test/verify-multipage.mjs
git commit -m "test: define Toopeace multipage contract"
```

---

### Task 2: Split the home and section documents

**Files:**
- Modify: `index.html:1-270`
- Create: `portfolio.html`
- Create: `story.html`
- Create: `services.html`
- Test: `test/verify-multipage.mjs`

**Interfaces:**
- Consumes: the current navigation, `.toopeace-wrap`, `.tp-results`, `.tp-journey`, `.tp-services`, and `#contact-modal` markup.
- Produces: four independently loadable HTML pages with shared asset references.

- [ ] **Step 1: Add shared native navigation to every document**

Use this exact destination contract in every page:

```html
<nav class="tp-primary-nav tp-primary-nav--floating" aria-label="주요 메뉴">
  <a class="tp-primary-nav-link" href="./portfolio.html">Portfolio</a>
  <a class="tp-primary-nav-link" href="./story.html">Story</a>
  <a class="tp-primary-nav-link" href="./services.html">Services</a>
</nav>
```

Add `aria-current="page"` only to the matching link in each subpage. Add this home link before the subpage main content:

```html
<a class="tp-home-link" href="./index.html" aria-label="Toopeace 홈으로">TOOPEACE</a>
```

- [ ] **Step 2: Reduce `index.html` to home-only content**

Keep the existing `<head>`, navigation, `.toopeace-wrap`, and `#contact-modal`. Remove `.tp-results`, `.tp-journey`, and `.tp-services` completely. Do not alter hero text, social links, Contact markup, or dialog fields.

- [ ] **Step 3: Create `portfolio.html` from the existing results section**

Use title `Portfolio | Toopeace`, shared CSS/JS references, shared navigation with Portfolio active, the home link, and the complete existing `<section class="tp-results" id="portfolio">...</section>` inside:

```html
<main class="tp-subpage tp-subpage--portfolio">
  <!-- existing .tp-results section, unchanged -->
</main>
```

- [ ] **Step 4: Create `story.html` from the existing journey section**

Use title `Story | Toopeace`, shared navigation with Story active, the home link, and the complete existing `<section class="tp-journey" id="story">...</section>` inside `.tp-subpage--story`. Do not copy `#contact-modal` into this page; the blog CTA remains a native external anchor.

- [ ] **Step 5: Create `services.html` from the existing services section**

Use title `Services | Toopeace`, shared navigation with Services active, the home link, and the complete existing `<section class="tp-services" id="services">...</section>` inside `.tp-subpage--services`.

- [ ] **Step 6: Run the new contract and verify GREEN**

Run: `node test/verify-multipage.mjs`

Expected: `Multi-page document contract: PASS`.

- [ ] **Step 7: Commit the document split**

```bash
git add index.html portfolio.html story.html services.html test/verify-multipage.mjs
git commit -m "feat: split Toopeace into dedicated pages"
```

---

### Task 3: Add the shared subpage shell and active navigation

**Files:**
- Modify: `styles.css:90-130`
- Modify: `styles.css:1365-1420`
- Test: `test/verify-multipage.mjs`

**Interfaces:**
- Consumes: `.tp-subpage`, `.tp-home-link`, and `[aria-current="page"]` markup from Task 2.
- Produces: collision-free desktop/mobile navigation and visible page identity.

- [ ] **Step 1: Extend the contract with CSS behavior**

Read `styles.css` in `verify-multipage.mjs` and add:

```js
assert.match(css, /\.tp-home-link\s*\{[^}]*position:\s*fixed;/s);
assert.match(css, /\.tp-primary-nav-link\[aria-current="page"\]/);
assert.match(css, /\.tp-subpage\s*\{[^}]*min-height:\s*100vh;/s);
```

- [ ] **Step 2: Run the contract and verify RED**

Run: `node test/verify-multipage.mjs`

Expected: FAIL because `.tp-home-link` CSS is absent.

- [ ] **Step 3: Implement the desktop page shell**

Add focused rules:

```css
.tp-subpage {
  min-height: 100vh;
  background: #000;
}

.tp-home-link {
  position: fixed;
  top: 30px;
  left: 32px;
  z-index: 50;
  color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-decoration: none;
}

.tp-primary-nav-link[aria-current="page"] {
  border-color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.12);
}
```

- [ ] **Step 4: Implement the mobile collision rule**

Inside `@media (max-width: 768px)`, keep the navigation at the bottom and place the home link in the top-left safe area:

```css
.tp-home-link {
  top: 20px;
  left: 20px;
  font-size: 12px;
}
```

- [ ] **Step 5: Run the contract and verify GREEN**

Run: `node test/verify-multipage.mjs`

Expected: `Multi-page document contract: PASS`.

- [ ] **Step 6: Commit the shared shell**

```bash
git add styles.css test/verify-multipage.mjs
git commit -m "style: add Toopeace subpage navigation shell"
```

---

### Task 4: Keep shared JavaScript page-safe

**Files:**
- Modify: `app.js:399-447`
- Modify: `index.html`
- Test: `test/verify-multipage.mjs`

**Interfaces:**
- Consumes: `[data-contact-modal-open]` on the home Contact button and optional `#contact-modal`.
- Produces: `initContactModal()` that never captures the Story external CTA.

- [ ] **Step 1: Add the explicit modal-trigger contract**

Add to `verify-multipage.mjs`:

```js
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');
assert.match(home, /class="tp-contact"[^>]*data-contact-modal-open/);
assert.match(js, /querySelectorAll\("\[data-contact-modal-open\]"\)/);
assert.doesNotMatch(story, /data-contact-modal-open|id="contact-modal"/);
```

- [ ] **Step 2: Run the contract and verify RED**

Run: `node test/verify-multipage.mjs`

Expected: FAIL because the home button has no `data-contact-modal-open` hook.

- [ ] **Step 3: Implement explicit modal ownership**

Add `data-contact-modal-open` to the home Contact button. Change only the modal opener query:

```js
document.querySelectorAll("[data-contact-modal-open]").forEach((button) => {
  button.addEventListener("click", () => {
    form.reset();
    body.hidden = false;
    success.hidden = true;
    modal.showModal();
  });
});
```

Keep `initMorphButtons()` on `.tp-contact` so both the home Contact and Story blog CTA retain their icon morph.

- [ ] **Step 4: Verify page-safe JavaScript**

Run:

```bash
node test/verify-multipage.mjs
node --check app.js
```

Expected: contract PASS and no JavaScript syntax output.

- [ ] **Step 5: Commit JavaScript ownership**

```bash
git add index.html app.js test/verify-multipage.mjs
git commit -m "fix: scope contact modal to home CTA"
```

---

### Task 5: Migrate existing static contracts to page ownership

**Files:**
- Modify: `test/verify.mjs`
- Modify: `test/verify-portfolio-carousel.mjs`
- Modify: `test/verify-client-feedback.mjs`
- Modify: `test/verify-visual-adjustments.mjs`
- Modify: `test/verify-requested-hero.mjs`
- Test: all files under `test/`

**Interfaces:**
- Consumes: the four-page document structure from Tasks 2-4.
- Produces: regression contracts that inspect the correct owner page instead of assuming every section is in `index.html`.

- [ ] **Step 1: Point each component contract to its owner**

Apply these exact ownership changes:

```js
// verify-portfolio-carousel.mjs
const html = await readFile(new URL('../portfolio.html', import.meta.url), 'utf8');

// verify-client-feedback.mjs
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../portfolio.html', import.meta.url), 'utf8');
const story = await readFile(new URL('../story.html', import.meta.url), 'utf8');

// verify-visual-adjustments.mjs and verify.mjs
// read all four documents and assert each section against its owner.

// verify-requested-hero.mjs
// keep hero, social, Contact, and navigation assertions on index.html;
// move the Story blog CTA assertion to story.html.
```

In `verify-client-feedback.mjs`, use `home` for social links, `portfolio` for carousel media hooks, and `story` for journey copy/assets/blog CTA.

- [ ] **Step 2: Run the full suite and inspect expected failures**

Run:

```bash
for test_file in test/*.mjs; do node "$test_file"; done
```

Expected before all migrations are complete: failures that name a component still being read from `index.html`; no `ENOENT` failures.

- [ ] **Step 3: Finish ownership assertions and remove obsolete single-page assumptions**

Replace assertions that require `id="portfolio"`, `id="story"`, or `id="services"` in `index.html` with assertions against the dedicated page. Preserve all existing case counts, image checks, animation hooks, glass styles, and responsive checks.

- [ ] **Step 4: Run the full suite and verify GREEN**

Run:

```bash
for test_file in test/*.mjs; do node "$test_file"; done
node --check app.js
git diff --check
```

Expected: every contract prints `PASS`, JavaScript syntax is clean, and `git diff --check` has no output.

- [ ] **Step 5: Commit migrated contracts**

```bash
git add test/*.mjs
git commit -m "test: align contracts with multipage ownership"
```

---

### Task 6: Verify local navigation and responsive rendering

**Files:**
- Verify: `index.html`
- Verify: `portfolio.html`
- Verify: `story.html`
- Verify: `services.html`
- Verify: `styles.css`
- Verify: `app.js`

**Interfaces:**
- Consumes: the complete four-page implementation.
- Produces: browser and HTTP evidence that the split works at real URLs.

- [ ] **Step 1: Verify all four HTTP routes**

Run:

```bash
for page in index.html portfolio.html story.html services.html; do
  curl -sS -o /dev/null -w "$page HTTP %{http_code}\n" "http://127.0.0.1:8765/$page?v=20260904-multipage"
done
```

Expected: four `HTTP 200` lines.

- [ ] **Step 2: Verify desktop navigation and behavior**

At the normal in-app browser viewport:

- Load each page directly.
- Use each primary navigation link and the subpage `TOOPEACE` home link.
- Confirm exactly one active link on each subpage and none on home.
- On Portfolio, click next/previous and a dot; confirm card, title, results, and detail media update.
- On Story, confirm five rows and the external blog CTA; do not activate the external link during QA.
- On Services, confirm three service cards.
- On Home, open and close the Contact modal.
- Confirm no console errors or horizontal overflow on every page.

- [ ] **Step 3: Verify the 390×844 mobile layout**

Set viewport to 390×844 and repeat direct loads for all four pages. Confirm the bottom navigation does not cover the last actionable content, the home link remains visible, carousel controls fit, story content remains single-column, service cards remain readable, and `scrollWidth <= clientWidth` everywhere. Reset the viewport afterward.

- [ ] **Step 4: Run the final verification command**

```bash
set -e
for test_file in test/*.mjs; do node "$test_file"; done
node --check app.js
git diff --check
for page in index.html portfolio.html story.html services.html; do
  curl -sS -o /dev/null -w "$page HTTP %{http_code}\n" "http://127.0.0.1:8765/$page?v=20260904-multipage"
done
git status --short --branch
```

Expected: every test passes, every page returns HTTP 200, and only intended implementation files are modified.

- [ ] **Step 5: Record any defect correction discovered by browser QA**

When Step 2 or Step 3 exposes a defect, add a failing assertion that reproduces that defect, make the smallest correction, rerun the full command, and commit only the touched files. When browser QA exposes no defect, confirm `git status --short` is empty and do not create an empty commit.

```bash
git add index.html portfolio.html story.html services.html styles.css app.js test/*.mjs
git commit -m "fix: complete Toopeace multipage QA"
```
