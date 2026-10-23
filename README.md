# wlbf.github.io

A Markdown notebook, built with Eleventy and published on GitHub Pages.

## Write

Keep notes in `posts/*.md`. Start with a `# Title`; no front matter is required.
Add a link to `index.md` when a note is ready to appear on the homepage. Its order
is the reading order. All files in `posts/` are public when deployed, including
notes not linked from the index. Existing `/posts/name.html` URLs are preserved.

## Use Obsidian and local pictures

Open this repository folder as an Obsidian vault. The included `.obsidian/app.json`
sets new notes to `posts/`, attachments to `assets/images/`, and links to ordinary
Markdown with relative paths. Paste or drag a picture into a note; Obsidian saves
the file locally and inserts a link such as:

```md
![A diagram](../assets/images/diagram.png)
```

Commit both the note and its image. This works in Obsidian, GitHub, and the built
site. Use Markdown links, not Obsidian `![[wiki embeds]]`. If you already have vault
settings, check Settings → Files and links for these same options.

The 40 existing article images have also been saved locally; original source URLs
are recorded in `assets/images/sources.json`. For a future remote image, save its
original file in `assets/images/` and use a relative link. Workspace state and
plugins are ignored.

## Math

Inline: `$E = mc^2$`. Display equations go on their own lines:

```tex
$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

KaTeX renders equations during the build; its styles and fonts are hosted locally.
Supported syntax follows [KaTeX](https://katex.org/docs/supported.html), rather than
full LaTeX documents. Use `\$` for a literal dollar sign. Code blocks stay literal.
Bracket delimiters `\(...\)` and `\[...\]` also work on the site.

## Preview

Install Node.js 22 or newer, then:

```sh
npm ci
npm run dev
```

Open the local URL printed by Eleventy (usually `http://localhost:8080`).
`npm test` checks math, links, and image rendering; `npm run build` writes `_site/`.
Edit `assets/style.css` for the design and `_includes/` for page layouts.

## Publish

In the GitHub repository, select **Settings → Pages → Build and deployment →
Source: GitHub Actions** once. Push this change to the publishing branch. The
workflow builds and deploys `_site/` to <https://wlbf.github.io>.

The workflow runs on `simple`, the repository’s current default branch. Update
`.github/workflows/pages.yml` if you rename your publishing branch.
The build does not publish README, Obsidian settings, or development scripts.
