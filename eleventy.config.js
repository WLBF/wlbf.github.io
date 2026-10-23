import { createMarkdown } from './scripts/markdown.js';

export default function (config) {
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
