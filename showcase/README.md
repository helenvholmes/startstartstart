# Showcase

A small static site that shows what people have built with the portfolio starter, plus three example sites for fictional people.

- `index.html`, `styles.css`, `app.js`: the showcase page. It reads `sites.json` and renders a card for each site.
- `sites.json`: the list. `examples` are the fictional demo sites; `community` is real submissions.
- `examples/`: the three demo sites, each a single HTML file.
- `shots/`: home-page screenshots used on the cards.
- `scripts/screenshot.mjs`: takes any missing screenshots.

## Adding a submitted site

People submit through the [showcase issue form](https://github.com/helenvholmes/portfolio-starter/issues/new?template=showcase.yml), which labels the issue `showcase`.

1. Open the site and check it's live, has real content, and is something you're happy to link to.
2. Add an entry to `community` in `sites.json`:

   ```json
   {
     "name": "Alex Rivera",
     "role": "Product designer, Brooklyn",
     "purpose": "Getting hired",
     "url": "https://alexrivera.com",
     "features": ["Case studies", "A custom domain"]
   }
   ```

   `features` comes from the boxes they ticked. Add `"scheme": "dark"` if the site is dark-first, so its screenshot is too.
3. Take the screenshot: `node showcase/scripts/screenshot.mjs`. It saves `shots/<name>.jpg` and adds `shot` to the entry. (Needs Playwright with Chromium.)
4. Commit, push, and close the issue with a link to the showcase.

To take a site down, remove its entry and its screenshot.

## Running it locally

It's plain files, so any static server works:

```bash
python3 -m http.server --directory showcase 8000
```

Then open http://localhost:8000. Opening `index.html` straight from disk won't load the cards, because browsers block reading `sites.json` that way.

## Deploying

Import this repository into Vercel and set **Root Directory** to `showcase`. There's no build step; `vercel.json` adds the security headers.
