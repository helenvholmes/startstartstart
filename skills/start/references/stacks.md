# Choosing a stack

Match the stack to the person's answers, not to what's fashionable. The best stack for a portfolio is usually the one with the fewest moving parts that still does what they asked for. Every choice below deploys to Vercel from GitHub.

Check current stable versions and any changed defaults in each tool's docs before recommending; this file names tools, not versions.

## Start here

| If they… | Recommend | Why |
|---|---|---|
| Want pages to read (projects, writing, about), any skill level | **Astro**, content as Markdown/MDX in content collections | Builds plain HTML with no JavaScript by default, so it's fast and hard to break. Content files are easy to read and edit. Interactive pieces can be added later, one at a time. |
| Mention they know HTML and CSS, want one or two pages, and want to see exactly what's going on | **Plain HTML and CSS**, no build step | Nothing to install or update. Vercel serves the files as they are. Outgrow it by moving to Astro, which reads like HTML. |
| Mention they already know React and want app-like interactivity (filters, transitions between pages, client-side state) | **Next.js**, static pages wherever possible | Familiar to them, and Vercel's own framework. More to learn and update than Astro, so only when the interactivity or their React knowledge earns it. |

When two rows fit, pick the simpler one and offer the other as the alternative.

## The pieces around the framework

- **Styling:** plain CSS with design tokens as custom properties in one file (colors, fonts, type scale, spacing, radii, motion durations). Component-scoped styles otherwise. Offer Tailwind only if they already know it or ask for it.
- **Fonts:** self-hosted (Fontsource, or the files in the repo). Faster, and a stricter Content-Security-Policy stays simple.
- **Images:** the framework's image component (`astro:assets`, `next/image`) so sizes are generated for them. For plain HTML, export sensible sizes and use `srcset`.
- **TypeScript:** on, in strict mode, for Astro and Next.js. It catches content-model mistakes (a missing date, a misspelled field) at build time. Explain that they mostly won't have to write it.
- **Package manager:** npm, since it comes with Node and has one less thing to install. pnpm is fine if they already use it.

## Add only when an answer needs it

| Need | Simplest option | Note |
|---|---|---|
| Contact form | A form service (such as Formspree or Basin), or a mailto link | A serverless function plus an email API is more work and another account. Spam protection matters either way. |
| Visitor numbers | Vercel Web Analytics | Turned on in the project's settings. Check current pricing and privacy terms before recommending. |
| Password-protected pages (a deck, NDA work) | **Always the free way:** a password checked on the server, protecting only the private paths, read from a `SITE_PASSWORD` environment variable. Use middleware that also runs in the local dev server, so it works the same on their computer and on Vercel: the framework's own middleware (Astro middleware with those pages rendered on demand through the Vercel adapter; Next.js middleware), rather than a Vercel-only file the dev server ignores. | Works on the free Hobby plan. **Needs a private repository**: the password protects the site, not the files on GitHub. Don't recommend Vercel's own Password Protection or a plan upgrade for this: it costs extra and covers whole deployments, not single pages. Mention it only if the person asks about it, and never turn it on without saying it costs money and getting a clear yes. Never check a password in the browser's JavaScript, and never rely on an unlisted URL: both are visible to anyone who views the source. Private pages also get `noindex`, stay out of the sitemap, and aren't linked from public pages. Say this costs a little complexity: those pages are no longer plain static files. |
| Search over their own content | Pagefind (static, builds an index at build time) | No service, no cost. |
| Comments, logins, a shop, user content | Stop and talk it through | Each adds accounts, costs and security work. Usually a separate service is better than building it. |

## Costs to mention

- GitHub: free, public or private repos.
- Vercel: the free Hobby plan is for personal, non-commercial use. A portfolio that showcases a person is typically fine; a site for a business or one that sells things may need a paid plan. Check Vercel's current terms and say what you found.
- Domain: roughly a yearly fee at a registrar. Optional; the `*.vercel.app` address works without one.

## Avoid for a first portfolio

A database, a headless CMS with its own hosting, a custom backend, server-side rendering for pages that never change, a UI component library they'll have to restyle, or any template that ships a lot of JavaScript to show static text.
