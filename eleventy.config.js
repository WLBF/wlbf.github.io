import { createMarkdown } from './scripts/markdown.js';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export default function (config) {
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
