import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../portfolio.html', import.meta.url), 'utf8');
const story = await readFile(new URL('../story.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');

assert.doesNotMatch(home, /TRUE WORK, TRUE LIGHT/);
assert.doesNotMatch(js, /INTRO_TOTAL_MS|initIntroScrollLock/);
assert.match(home, /class="tp-primary-nav tp-primary-nav--floating"/);
assert.match(css, /\.tp-primary-nav--floating[\s\S]*?position:\s*fixed/);

for (const platform of ['instagram', 'youtube', 'blog']) {
  assert.match(home, new RegExp(`data-platform="${platform}"[^>]*href="https://`));
}

assert.match(story, /안녕하세요, 투피스에이전시입니다/);
assert.doesNotMatch(story, /\b저는\b|\b저 역시\b|\b저도\b|저를 거쳐간/);
assert.match(story, /assets\/client-feedback\/journey-02-replacement\.png/);
assert.match(story, /assets\/client-feedback\/journey-04-replacement\.png/);
assert.match(story, /assets\/client-feedback\/journey-05-replacement\.jpg/);
assert.match(
  story,
  /href="https:\/\/blog\.naver\.com\/apple1003_\/224295485682"[^>]*>[\s\S]*?더 보러가기/
);

for (const title of [
  '듀오링고 채널 운영',
  '김주하 아기수면연구소',
  '오드리겸',
  '오프라인 매장',
  '변호사 계정',
  '교육 수강생',
  '예방원 에스테틱',
]) {
  assert.ok(js.includes(title), `missing portfolio item: ${title}`);
}

assert.match(js, /beforeImage:/);
assert.match(js, /afterImage:/);
assert.match(portfolio, /data-portfolio-before/);
assert.match(portfolio, /data-portfolio-after/);

for (const asset of [
  'portfolio-kimjuha-before.png',
  'portfolio-audrey-before.png',
  'portfolio-lawyer-before.png',
  'portfolio-lawyer-after-01.png',
  'portfolio-student-01.png',
  'portfolio-esthetic-before.png',
  'journey-02-replacement.png',
  'journey-04-replacement.png',
  'journey-05-replacement.jpg',
]) {
  const info = await stat(new URL(`../assets/client-feedback/${asset}`, import.meta.url));
  assert.ok(info.size > 10_000, `${asset} should be a production-quality local image`);
}

console.log('Client feedback contract: PASS');
