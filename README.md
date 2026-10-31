# Khashayar Gatmiry — personal website

The redesigned website is at the repository root. GitHub Pages should publish `main` → `/ (root)`.

## Original website

`old-site/` preserves every tracked file from original commit `c3d6c684aaeaf3f8fa892f7a2fccd02944f121ff`, byte for byte, in the same directory structure. Visit `/old-site/` to view the original. Do not edit these archived files.

The original supporting assets also remain in their existing root directories. Only the root `index.html` is replaced; its original is preserved at `old-site/index.html` and in Git history.

## Edit the redesigned site

- `index.html`: biography, research interests, publications, and contact links.
- `assets/style.css`: typography, colors, and responsive layout.
- `assets/site.js`: publication search and topic filters.
- `assets/portrait.jpeg`: new site's copy of the original portrait.
- `pdfs/CV.pdf`: original CV, unchanged.
- `publications.json`: data snapshot; update HTML publication entries to change the visible list.

No build step is required. Preview with `python -m http.server 8000`.
