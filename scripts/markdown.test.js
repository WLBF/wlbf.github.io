import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdown } from './markdown.js';
const md = createMarkdown();
test('inline and display math render at build time', () => {
  const html = md.render('Inline $x_i^2 + y_i^2$.\n\n$$\n\\frac{a}{b} = \\sqrt{c}\n$$');
  assert.match(html, /class="katex"/);
  assert.match(html, /class="katex-display"/);
  assert.doesNotMatch(html, /katex-error/);
});
test('code and escaped currency stay literal', () => {
  const html = md.render('`$x$` and \\$5\n\n```sh\necho "$HOME"\n```');
  assert.doesNotMatch(html, /class="katex/);
  assert.match(html, /\$HOME/);
});
test('local Markdown links preserve query and heading; external links stay unchanged', () => {
  const html = md.render('[post](./hello-world.md#hello) [external](https://example.com/a.md)');
  assert.match(html, /href="\.\/hello-world.html#hello"/);
  assert.match(html, /href="https:\/\/example.com\/a.md"/);
});
test('Obsidian relative image links and headings render', () => {
  const html = md.render('# Hello world\n\n![Diagram](../assets/images/diagram%20one.png)');
  assert.match(html, /id="hello-world"/);
  assert.match(html, /src="..\/assets\/images\/diagram%20one.png"/);
});
