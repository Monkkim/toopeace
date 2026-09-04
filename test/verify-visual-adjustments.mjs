import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const portfolio = await readFile(new URL('../portfolio.html', import.meta.url), 'utf8');
const story = await readFile(new URL('../story.html', import.meta.url), 'utf8');
const services = await readFile(new URL('../services.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');

assert.match(portfolio, /<section class="tp-results" id="portfolio"/);
assert.match(story, /<section class="tp-journey" id="story"/);
assert.match(services, /<section class="tp-services" id="services"/);

for (const html of [home, portfolio, story, services]) {
  assert.match(html, /class="tp-primary-nav tp-primary-nav--floating"/);
}

for (const label of ['Portfolio', 'Story', 'Services']) {
  assert.match(home, new RegExp(`class="tp-primary-nav-link"[^>]*>${label}<`));
}

for (const platform of ['instagram', 'youtube', 'blog']) {
  assert.match(home, new RegExp(`class="tp-hero-social"[^>]*data-platform="${platform}"`));
  assert.match(css, new RegExp(`data-platform="${platform}"`));
}

assert.match(css, /\.tp-hero-social\s*\{[^}]*border:\s*1px solid rgba\(255,\s*255,\s*255,\s*0\.16\)/s);
assert.match(css, /\.tp-primary-nav-link\s*\{[\s\S]*?color:\s*#fff/);
assert.match(css, /\.tp-primary-nav-link\s*\{[\s\S]*?border:/);
assert.match(css, /\.tp-contact\s*\{[\s\S]*?height:\s*54px/);
assert.match(css, /\.tp-contact\s*\{[\s\S]*?min-width:\s*178px/);

console.log('Visual adjustment contract: PASS');
