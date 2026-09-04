import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');
const [home, portfolio, story, services, css, js] = await Promise.all([
  read('index.html'),
  read('portfolio.html'),
  read('story.html'),
  read('services.html'),
  read('styles.css'),
  read('app.js'),
]);

for (const html of [home, portfolio, story, services]) {
  assert.match(html, /href="\.\/portfolio\.html"/);
  assert.match(html, /href="\.\/story\.html"/);
  assert.match(html, /href="\.\/services\.html"/);
}

assert.match(home, /class="toopeace-wrap"/);
assert.doesNotMatch(home, /id="portfolio"|id="story"|id="services"/);

assert.match(portfolio, /id="portfolio"/);
assert.match(portfolio, /<h2 id="results-title">/);
assert.doesNotMatch(portfolio, /id="story"|id="services"|class="toopeace-wrap"/);
assert.match(story, /id="story"/);
assert.match(story, /<h2 id="journey-title">/);
assert.doesNotMatch(story, /id="portfolio"|id="services"|class="toopeace-wrap"/);
assert.match(services, /id="services"/);
assert.match(services, /<h2 id="services-title">/);
assert.equal((services.match(/class="tp-service-card"[\s\S]*?<h3>/g) || []).length, 3);
assert.doesNotMatch(services, /id="portfolio"|id="story"|class="toopeace-wrap"/);

for (const html of [portfolio, story, services]) {
  assert.match(html, /class="tp-home-link" href="\.\/index\.html"/);
  assert.equal((html.match(/aria-current="page"/g) || []).length, 1);
}

assert.match(css, /\.tp-home-link\s*\{[^}]*position:\s*fixed;/s);
assert.match(css, /\.tp-primary-nav-link\[aria-current="page"\]/);
assert.match(css, /\.tp-subpage\s*\{[^}]*min-height:\s*100vh;/s);
assert.match(home, /class="tp-contact"[^>]*data-contact-modal-open/);
assert.match(js, /querySelectorAll\("\[data-contact-modal-open\]"\)/);
assert.doesNotMatch(story, /data-contact-modal-open|id="contact-modal"/);

console.log('Multi-page document contract: PASS');
