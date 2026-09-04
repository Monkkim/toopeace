import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');

assert.match(html, /class="toopeace-wrap"/);
for (const id of ['T', 'O1', 'O2', 'P', 'E1', 'A', 'C', 'E2']) {
  assert.match(html, new RegExp(`data-l="${id}"`));
}

assert.doesNotMatch(html, /TRUE WORK, TRUE LIGHT/);
assert.match(html, /투피스 에이전시는 '고객사를 빛낸다'라는 사명 아래/);
assert.match(html, /class="tp-primary-nav tp-primary-nav--floating"/);
assert.equal((html.match(/class="tp-hero-social"/g) || []).length, 3);
assert.match(html, /class="tp-contact"/);

assert.match(html, /id="portfolio"/);
assert.match(html, /id="story"/);
assert.match(html, /id="services"/);
assert.match(html, /data-portfolio-carousel/);
assert.match(html, /안녕하세요, 투피스에이전시입니다/);
assert.equal((html.match(/class="tp-journey-step(?:\s[^"]*)?"/g) || []).length, 5);

assert.match(css, /@media\s*\(max-width:\s*768px\)/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /\.tp-primary-nav--floating/);
assert.match(css, /\.tp-portfolio-detail-media/);

assert.match(js, /function initToopeace\(\)/);
assert.match(js, /function initPortfolioCarousel\(\)/);
assert.match(js, /function initResultsReveal\(\)/);
assert.match(js, /function initJourneyReveal\(\)/);
assert.doesNotMatch(js, /initIntroScrollLock|INTRO_TOTAL_MS/);

console.log('Toopeace static contract: PASS');
