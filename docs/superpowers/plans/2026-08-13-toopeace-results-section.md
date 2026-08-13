# Toopeace Results Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an evidence-safe, scroll-revealed case-study section below the Toopeace hero with alternating desktop rows and responsive mobile stacking.

**Architecture:** Keep the section markup in `index.html`, its visual system in `styles.css`, and its viewport reveal behavior in `app.js`. Each case row uses the same `.tp-case` contract and alternates with `.tp-case--reverse`; `IntersectionObserver` adds `.is-visible` without introducing a framework or dependency.

**Tech Stack:** HTML5, CSS3 Grid, vanilla JavaScript, Node.js built-in `assert`, Chrome browser QA.

**Spec:** `docs/superpowers/specs/2026-08-13-toopeace-results-section-design.md`

## Global Constraints

- Do not add customer names, numeric outcomes, quotes, media URLs, or performance claims beyond the copy and screenshots supplied by the user.
- Use the exact section heading `Toopeace와 함께한 사람들은 이렇게 바뀌었습니다`.
- Use alternating desktop row order and a single-column mobile layout.
- Reveal rows with `IntersectionObserver` and provide a reduced-motion fallback.
- Keep the existing hero, Contact CTA, and black visual system intact.
- Display the three user-supplied images from `assets/case-01-marketing.png`, `assets/case-02-sleep.png`, and `assets/case-03-phone.png`.

---

### Task 1: Add the results-section contract

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`
- Modify: `test/verify.mjs`

**Interfaces:**
- `index.html` exposes `.tp-results`, `.tp-results-heading`, three `.tp-case` rows, and one `.tp-case--reverse` row.
- `styles.css` exposes `.tp-case.is-visible`, desktop grid placement, mobile stacking, and reduced-motion rules.
- `app.js` observes `.tp-case` elements and adds `.is-visible` when at least 18% of a row is visible.

- [ ] **Step 1: Extend the smoke test with the failing contract**

Add these assertions to `test/verify.mjs`:

```js
assert.match(html, /Toopeace와 함께한 사람들은 이렇게 바뀌었습니다/);
assert.match(html, /class="tp-results"/);
assert.match(html, /class="tp-case"/);
assert.match(html, /class="tp-case tp-case--reverse"/);
assert.match(html, /assets\/case-01-marketing\.png/);
assert.match(html, /assets\/case-02-sleep\.png/);
assert.match(html, /assets\/case-03-phone\.png/);
assert.match(html, /월 매출 1억 KPI 달성/);
assert.match(css, /grid-template-columns/);
assert.match(css, /prefers-reduced-motion/);
assert.match(js, /\.tp-case/);
assert.match(js, /is-visible/);
```

- [ ] **Step 2: Run the test before implementation**

Run: `node test/verify.mjs`

Expected: FAIL because the results section and observer hook do not yet exist.

- [ ] **Step 3: Add the semantic section markup**

Append the results section below the hero `</main>` in `index.html`, with these exact case rows and asset mappings:

```html
<section class="tp-results" aria-labelledby="results-title">
  <div class="tp-results-heading">
    <p class="tp-eyebrow">TRUE WORK, TRUE LIGHT</p>
    <h2 id="results-title">Toopeace와 함께한 사람들은 이렇게 바뀌었습니다</h2>
    <p>좋은 본질이 실제 업무와 결과로 이어지는 과정을 기록합니다.</p>
  </div>
  <div class="tp-cases">
    <article class="tp-case">
      <div class="tp-case-media"><img src="./assets/case-01-marketing.png" alt="연매출 n00억 회사 마케팅팀 성과 사례" /></div>
      <div class="tp-case-copy"><p class="tp-case-index">CASE 01 · MARKETING</p><h3>(현)연매출 n00억 회사 마케팅팀</h3><div class="tp-case-columns"><div><span>운영</span><p>주 1회 콘텐츠 마케팅 교육 진행</p></div><div><span>성장</span><p>3개월만에 팔로워 5만 성장</p></div></div></div>
    </article>
    <article class="tp-case tp-case--reverse">
      <div class="tp-case-media"><img src="./assets/case-02-sleep.png" alt="수면교육 카테고리 성과 사례" /></div>
      <div class="tp-case-copy"><p class="tp-case-index">CASE 02 · SLEEP EDUCATION</p><h3>(현)수면교육 카테고리 팔로워 1위</h3><div class="tp-case-columns"><div><span>성장</span><p>팔로워 400명에서 도합 9만명</p></div><div><span>성과</span><p>교보문고 베스트셀러</p></div></div><p class="tp-case-output"><span>진행 범위</span> 기획/편집/촬영/운영</p></div>
    </article>
    <article class="tp-case">
      <div class="tp-case-media"><img src="./assets/case-03-phone.png" alt="하남시 휴대폰 매장 성과 사례" /></div>
      <div class="tp-case-copy"><p class="tp-case-index">CASE 03 · PHONE RETAIL</p><h3>(현)휴대폰 매장 오픈하고 5개월만에 하남시 판매량 1등</h3><div class="tp-case-columns"><div><span>성과</span><p>월 매출 1억 KPI 달성</p></div><div><span>진행 범위</span><p>기획/편집/촬영/운영</p></div></div></div>
    </article>
  </div>
</section>
```

- [ ] **Step 4: Add the alternating visual system**

Add styles for the section spacing, heading hierarchy, supplied-image media cards, two-column case grid, `.tp-case--reverse` order swap, responsive `@media (max-width: 768px)` stack, and `.tp-case` opacity/transform transitions. Keep image cards horizontal and preserve their aspect ratio with `object-fit: contain`.

- [ ] **Step 5: Add the scroll reveal controller**

Add `initResultsReveal()` to `app.js`:

```js
function initResultsReveal() {
  const cases = [...document.querySelectorAll('.tp-case')];
  if (!cases.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    cases.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );
  cases.forEach((item) => observer.observe(item));
}
```

Call `initResultsReveal()` after `initToopeace()` so the hero animation and results observer remain independent.

- [ ] **Step 6: Run the smoke test after implementation**

Run: `node test/verify.mjs`

Expected: PASS with `Toopeace static contract: PASS`.

### Task 2: Verify scroll and responsive behavior

**Files:**
- Read: `index.html`
- Read: `styles.css`
- Read: `app.js`

- [ ] **Step 1: Reload the local page in a desktop browser**

Open `http://127.0.0.1:4173/`, wait for the hero reveal, then confirm the results section appears below the Contact CTA.

- [ ] **Step 2: Verify alternating row order**

Read the three case row bounding boxes and computed grid order. Confirm CASE 01 and CASE 03 place media first, while CASE 02 places media second on desktop.

- [ ] **Step 3: Verify scroll reveal**

Scroll the page until each row enters the viewport. Confirm `.is-visible` is added and the row opacity reaches `1` without console errors.

- [ ] **Step 4: Verify mobile stacking**

At 390px width, confirm each case row uses one column, no horizontal overflow occurs, and the supplied images/content remain readable.

- [ ] **Step 5: Report evidence boundary**

Report that the three supplied case images and claims are live as user-provided content and have not been independently verified in this implementation.
