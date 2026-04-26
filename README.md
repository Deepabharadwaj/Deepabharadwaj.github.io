# deepabharadwaj.github.io

Personal portfolio site — static HTML/CSS/JS, hosted on GitHub Pages.

## Run it locally

The site uses jQuery `$.load()` to fetch shared header/footer partials, so it
must be served over HTTP. Opening the HTML files directly with `file://` will
leave the nav and footer empty.

From the repo root, pick one:

```bash
python3 -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

Then open <http://localhost:8000/>.

Pages to check:

- `/` — homepage with the project list
- `/about.html`
- `/case-studies/amazon/index.html` (and `adultit`, `bark`, `amigas`)

## Add a new project

Project content is data-driven from `js/projects.js`. Adding a project requires
no template edits — the homepage row and every existing case study's "next
projects" carousel pick it up automatically.

1. Append an entry to `js/projects.js` (order in the file = display order):

   ```js
   {
     slug: 'my-project',
     title: 'My Project',
     shortTitle: 'My Project',
     summary: 'Long-form description used on the homepage.',
     shortSummary: 'Short description used in the next-projects carousel.',
     hero: 'case-studies/my-project/img/hero.jpg',
     thumbnail: 'case-studies/common/my-project.png',
   },
   ```

2. Create the case study folder:

   ```
   case-studies/my-project/
     index.html      # copy from one of the existing case studies
     css/style.css   # one line: .sticky-hero__media { background-image: url('../img/heroimgmockup.jpg'); }
     img/
       hero.jpg
       heroimgmockup.jpg
   ```

   In the new `index.html`, update:
   - `<title>`
   - the body content
   - `data-current-slug="my-project"` on the `[data-next-projects]` mount point

3. Drop a thumbnail at `case-studies/common/my-project.png` (used by the
   next-projects carousel).

That's it. Hard-refresh and the homepage shows a new row; every case study's
carousel shows the new project as a slide.

## Layout

```
/
  index.html              # homepage; renders #project-list from js/projects.js
  about.html              # bio / contact
  architecture.html       # placeholder
  resume.html             # placeholder
  common/                 # site-wide partials (loaded via jQuery)
    header.html
    footer.html
  css/                    # site-wide styles + bootstrap
  js/
    projects.js           # single source of truth for case studies
    render.js             # mounts project list + next-projects carousel
    index.js              # nav, loader, scroll effects, partial loading
  case-studies/
    common/               # case-study-wide partials, styles, modal, JS
    <slug>/
      index.html
      css/style.css       # one-line override (hero image)
      img/
```

## Deploy

Pushed to `master`; GitHub Pages serves it from the apex domain configured in
`CNAME`.
