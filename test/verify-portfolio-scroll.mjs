import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
const html = await readFile(new URL('../portfolio.html', import.meta.url), 'utf8');
assert.doesNotMatch(html, /data-carousel|data-portfolio-carousel/);
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Document IDs must be unique');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert.ok(ids.includes(match[1]), `Missing section: ${match[1]}`);
}
const images = [...html.matchAll(/<img\b[^>]+>/g)].map(m => m[0]);
assert.equal(images.length, 43, 'YouTube before/after pair retained; 16.4만 finance card removed');
const sources = new Set();
for (const image of images) {
  const src = image.match(/src="([^"]+)"/)[1];
  assert.ok(!sources.has(src), `Duplicate image displayed: ${src}`);
  sources.add(src);
  assert.match(image, /alt="[^"]+"/);
  assert.match(image, /width="\d+" height="\d+"/);
  assert.ok((await stat(new URL(`../${src}`, import.meta.url))).size > 1000);
}
const results = html.match(/<section[^>]+id="content-results"[\s\S]*?<\/section>/)[0];
assert.doesNotMatch(results, /<a\b/, 'Content result photos must not link externally');
for (const name of ['baby_joohalab', 'audrey_gyeom', 'jeukheung_cake']) {
  assert.ok(html.includes(`https://www.instagram.com/${name}/`));
}
assert.ok(html.includes('589 → 9.8만'));
assert.ok(html.includes('10.5만 → 18.1만'));
assert.ok(html.includes('캡처 시점 기준'));
console.log('Portfolio scroll, assets and link behavior contract: PASS');
