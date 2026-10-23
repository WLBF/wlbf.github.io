import fs from 'node:fs';
export default {
  layout: 'post.njk',
  permalink: data => `/posts/${data.page.fileSlug}.html`,
  eleventyComputed: {
    title: data => data.title || fs.readFileSync(data.page.inputPath, 'utf8').match(/^#\s+(.+)$/m)?.[1] || data.page.fileSlug
  }
};
