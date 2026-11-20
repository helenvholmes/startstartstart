# Showcase

A small static site that shows what people have built with *startstartstart!*, plus four example sites for fictional people.

- `index.html`, `styles.css`, `app.js`: the showcase page. It reads `sites.json` and renders a card for each site.
- `start.js`: the copy button for the starter prompt, and the looping demo next to it. The demo is plain HTML in `index.html`; edit the messages there.
- `sky.js`: the shimmering pixel sky behind the header and hero. Dots lean toward the cursor, and stir when the window is resized. It sits still for people who have reduced motion turned on.
- `sites.json`: the list. `examples` are the fictional demo sites; `community` is real submissions.
- `examples/`: the four demo sites, each a single HTML file.
- `shots/`: home-page screenshots used on the cards.
- `fonts/`: Newsreader Light, the serif, hosted here so it looks the same everywhere. Free under the SIL Open Font License (`fonts/OFL-newsreader.txt`).
- `logo.js`: the animated *startstartstart!* logo, drawn as SVG from outlines of Ancho (by Beatriz Lozano). It plays a few loops on load, then rests; hovering replays it.
- `scripts/screenshot.mjs`: takes any missing screenshots.
- `og.png`: the 1200×630 image shown when the site's link is shared. Its source is `og/index.html`, which says how to regenerate it.

## Adding a submitted site

People submit through the [showcase issue form](https://github.com/helenvholmes/startstartstart/issues/new?template=showcase.yml), which labels the issue `showcase`.

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
