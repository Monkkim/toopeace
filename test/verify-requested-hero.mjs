import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../app.js', import.meta.url), 'utf8');

assert.match(html, /class="tp-primary-nav tp-primary-nav--floating"/);
for (const label of ['Portfolio', 'Story', 'Services']) {
  assert.match(html, new RegExp(`>${label}<`));
}
assert.doesNotMatch(html, />My Portfolio</);
assert.doesNotMatch(html, />My Story</);
assert.doesNotMatch(html, />My Services</);

assert.equal((html.match(/class="tp-hero-social"/g) || []).length, 3);
assert.equal((html.match(/class="tp-hero-social-handle">@toopeace<\/span>/g) || []).length, 3);

const contactButtons = html.match(/<button class="tp-contact"[\s\S]*?<\/button>/g) || [];
assert.ok(contactButtons.length >= 1);
assert.ok(contactButtons.every((button) => button.includes('<span class="tp-contact-label">Contact</span>')));
assert.match(html, /class="tp-contact tp-more-link"[\s\S]*?더 보러가기/);
assert.match(html, /class="tp-morph-icon tp-morph-icon--send"/);
assert.match(html, /class="tp-morph-icon tp-morph-icon--check"/);

assert.match(css, /\.tp-contact:hover[\s\S]*?transform:\s*scale\(1\.02\)/);
assert.match(css, /\.tp-contact:active[\s\S]*?transform:\s*scale\(0\.96\)/);
assert.match(css, /\.tp-morph-icon--check/);
assert.match(css, /\.tp-hero-social\s*\{[^}]*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.2\);[^}]*border-radius:\s*999px;/s);
assert.match(css, /linear-gradient\(\s*135deg,[\s\S]*?rgba\(255,\s*255,\s*255,\s*0\.12\)\s*60%,[\s\S]*?rgba\(0,\s*0,\s*0,\s*0\.32\)\s*100%/);
assert.match(css, /backdrop-filter:\s*blur\(16px\) saturate\(135%\);/);
assert.match(css, /box-shadow:\s*[\s\S]*?inset 0 1px 0 rgba\(255,\s*255,\s*255,\s*0\.24\)/);
assert.match(css, /\.tp-hero-social-handle\s*\{[^}]*color:\s*#fff;/s);
assert.match(js, /mouseenter/);
assert.match(js, /mouseleave/);
assert.match(js, /classList\.toggle\("is-hovered", hovered\)/);

console.log('Requested hero UI contract: PASS');
