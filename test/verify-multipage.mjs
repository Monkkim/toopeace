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
