import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');

assert.match(html, /data-portfolio-carousel/);
assert.match(html, /data-carousel-prev/);
assert.match(html, /data-carousel-next/);
assert.match(html, /data-carousel-dots/);
assert.match(html, /class="tp-portfolio-detail"/);
assert.doesNotMatch(html, /class="tp-case(?:\s|"|\/)/);

const detailCategoryIndex = html.indexOf('data-portfolio-category');
const detailResultsIndex = html.indexOf('data-portfolio-results');
const carouselStageIndex = html.indexOf('class="tp-portfolio-stage"');
const detailMediaIndex = html.indexOf('data-portfolio-media');
assert.ok(carouselStageIndex < detailCategoryIndex, 'carousel should appear above the case heading');
assert.ok(carouselStageIndex < detailResultsIndex, 'carousel should appear above the case results');
assert.ok(detailResultsIndex < detailMediaIndex, 'case images should appear below the case results');

assert.match(js, /const PORTFOLIO_ITEMS = \[/);
for (const asset of [
  'case-01-marketing.png',
  'case-02-sleep-profile.png',
  'case-03-phone.png',
  'portfolio-extra-01.png',
  'portfolio-lawyer-before.png',
  'portfolio-esthetic-after.png',
]) {
  assert.match(js, new RegExp(asset));
}
for (const title of [
  '듀오링고 채널 운영',
  '김주하 아기수면연구소',
  '오드리겸',
  '오프라인 매장',
  '김서한(에이그라운드)',
  '월트의 영감노트',
  '즉흥베이커리',
  '탭샵바',
]) {
  assert.ok(js.includes(title));
}
assert.equal((js.match(/category:/g) || []).length, 15);
assert.match(js, /image:\s*null/);
assert.match(js, /beforeImage:/);
assert.match(js, /afterImage:/);
assert.match(js, /function initPortfolioCarousel\(\)/);
assert.match(js, /renderPortfolio\(/);
assert.match(js, /data-carousel-prev/);
assert.match(js, /data-carousel-next/);
assert.match(js, /setAttribute\("aria-current"/);
assert.doesNotMatch(js, /images\.unsplash\.com/);
assert.doesNotMatch(js, /tp-portfolio-card-title/);

assert.match(css, /\.tp-portfolio-carousel/);
assert.match(css, /\.tp-portfolio-card/);
assert.match(css, /data-position="0"/);
assert.match(css, /\.tp-portfolio-detail/);
assert.match(css, /\.tp-results-heading\s*\{[^}]*text-align:\s*center/s);
assert.match(css, /--card-step:\s*190px/);
assert.match(css, /--card-step:\s*138px/);
assert.match(css, /@media \(max-width: 768px\)/);

console.log('Portfolio carousel contract: PASS');
