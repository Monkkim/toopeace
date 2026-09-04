import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const story = await readFile(new URL('../story.html', import.meta.url), 'utf8');
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
assert.match(story, /class="tp-contact tp-more-link"[\s\S]*?더 보러가기/);
assert.match(html, /class="tp-morph-icon tp-morph-icon--send"/);
assert.match(html, /class="tp-morph-icon tp-morph-icon--check"/);

assert.match(css, /\.tp-contact:hover[\s\S]*?transform:\s*scale\(1\.02\)/);
assert.match(css, /\.tp-contact:active[\s\S]*?transform:\s*scale\(0\.96\)/);
assert.match(css, /\.tp-contact\s*\{[^}]*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.16\);/s);
assert.match(css, /\.tp-contact\s*\{[^}]*linear-gradient\(\s*135deg,[^}]*rgba\(0,\s*0,\s*0,\s*0\.72\)\s*0%,[^}]*rgba\(0,\s*0,\s*0,\s*0\.6\)\s*60%,[^}]*rgba\(255,\s*255,\s*255,\s*0\.16\)\s*100%/s);
assert.match(css, /\.tp-contact\s*\{[^}]*backdrop-filter:\s*blur\(10px\) saturate\(120%\);/s);
assert.match(css, /\.tp-morph-icon--check/);
assert.match(css, /\.tp-hero-social\s*\{[^}]*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.16\);[^}]*border-radius:\s*999px;/s);
assert.match(css, /linear-gradient\(\s*135deg,[\s\S]*?rgba\(0,\s*0,\s*0,\s*0\.72\)\s*0%,[\s\S]*?rgba\(0,\s*0,\s*0,\s*0\.6\)\s*60%,[\s\S]*?rgba\(255,\s*255,\s*255,\s*0\.16\)\s*100%/);
assert.match(css, /backdrop-filter:\s*blur\(10px\) saturate\(120%\);/);
assert.match(css, /\.tp-hero-social\s*\{[^}]*height:\s*44px;/s);
assert.match(css, /\.tp-hero-social\s+svg\s*\{[^}]*width:\s*22px;[^}]*height:\s*22px;/s);
assert.match(css, /\.tp-hero-social-handle\s*\{[^}]*color:\s*#fff;[^}]*font-family:\s*Arial,\s*sans-serif;[^}]*font-size:\s*16px;/s);
assert.match(css, /@media\s*\(max-width:\s*768px\)[\s\S]*?\.tp-hero-social-handle\s*\{[^}]*font-size:\s*14px;/s);
assert.match(css, /@media\s*\(max-width:\s*768px\)[\s\S]*?\.tp-hero-socials\s*\{[^}]*flex-wrap:\s*nowrap;[^}]*gap:\s*8px;/s);
assert.match(css, /@media\s*\(max-width:\s*768px\)[\s\S]*?\.tp-hero-social\s*\{[^}]*height:\s*40px;[^}]*gap:\s*6px;[^}]*padding:\s*0 8px;/s);
assert.match(js, /mouseenter/);
assert.match(js, /mouseleave/);
assert.match(js, /classList\.toggle\("is-hovered", hovered\)/);

console.log('Requested hero UI contract: PASS');
