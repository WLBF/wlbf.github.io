import { createMarkdown } from './scripts/markdown.js';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export default function (config) {
  config.addFilter('withPostDate', (html) => {
    const metadata = html.match(/<!--\s*---([\s\S]*?)---\s*-->/)?.[1];
    const date = metadata?.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    if (!date) return html;
    return html.replace('</h1>', `</h1>\n<p class="post-date">Published <time datetime="${date}">${date}</time></p>`);
  });
  config.addFilter('assetVersion', (path) =>
    createHash('sha256').update(readFileSync(`.${path}`)).digest('hex').slice(0, 12)
  );
  config.setLibrary('md', createMarkdown());
  config.ignores.add('README.md');
  config.ignores.add('node_modules/**');
  config.addPassthroughCopy('assets');
  config.addPassthroughCopy({ 'node_modules/katex/dist': 'assets/katex' });
  config.addPassthroughCopy('draws');
  return {
    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: false,
    dir: { includes: '_includes', output: '_site' }
  };
}
