import MarkdownIt from 'markdown-it';
import { katex } from '@mdit/plugin-katex';
import anchor from 'markdown-it-anchor';

export function createMarkdown() {
  const md = new MarkdownIt({ html: true, linkify: true })
    .use(katex, { delimiters: 'all', throwOnError: true })
    .use(anchor);
  const link = md.renderer.rules.link_open || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options));
  md.renderer.rules.link_open = (tokens, i, options, env, self) => {
    const href = tokens[i].attrGet('href');
    if (href && !/^(?:[a-z]+:|\/\/)/i.test(href)) {
      tokens[i].attrSet('href', href.replace(/\.md(?=$|[?#])/, '.html'));
    }
    return link(tokens, i, options, env, self);
  };
  return md;
}
