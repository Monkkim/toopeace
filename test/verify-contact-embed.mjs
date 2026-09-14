import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
assert.match(html, /<iframe[^>]+data-src="https:\/\/smore.im\/form\/tjaM4diNYU"/);
assert.doesNotMatch(html, /문의가 접수되었습니다|name="phone"/);
console.log('Smore contact embed: PASS');
