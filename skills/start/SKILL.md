---
name: start
description: Take someone from "I want a portfolio site" to a live site on their own GitHub and Vercel accounts — interview them about what the site is for and what they already know, recommend the simplest stack that fits and explain why, plan the pages, build it with placeholder content, give them preview links, run the pre-ship audit, and launch it with their domain. Built for people who are new to GitHub and may be new to code. Use this whenever the user asks to make, start, build or set up a portfolio, personal site, or simple website from scratch, asks what stack or framework a small site should use, or says they want a site "on GitHub and Vercel", even if they've already picked part of the stack.
---

# Portfolio starter

The person should end up with a site they own outright (code in their GitHub, hosting in their Vercel account), that they understand well enough to update, and that passed a pre-launch audit before anyone saw it.

## If you're reading this from GitHub

The person usually starts by asking you to read this repository, rather than installing it. Before step 0, get a copy you can run scripts from, **outside their project folder** so nothing of this repository ends up in their site:

```
git clone --depth 1 https://github.com/helenvholmes/portfolio-starter "${TMPDIR:-/tmp}/portfolio-starter"
```

Then read `skills/start/SKILL.md` and `skills/accounts-setup/SKILL.md` from that copy, and run scripts from there (`skills/accounts-setup/scripts/check.sh`). If git isn't installed yet, read the files from the web instead and start with `accounts-setup` step 2, which installs it; clone once it's there. When they come back in a later session and say to keep going, read the skills again the same way, then look at the project (its README, open pull requests, the Vercel project) to find where you left off.

## How to work

Three rules shape every step here:

- **Decisions the person makes on purpose are theirs.** Their taste, their words, their choice of color or layout: suggest, never override. Still say plainly when a choice fails someone (contrast too low, text too small), and offer the smallest fix that keeps the intent.
- **Test with the real content.** The person writes their own content, so check the site with what they'll actually put on it, not invented worst cases.
- **Every change is small and reversible.** Show it before committing, make each change separately, and leave no test scaffolding behind.

## Talking with the person

- **Keep every message short.** A few sentences is usually enough; a long message is one they'll skim or skip. Lead with what they need to do or decide, then stop. No recaps of what you just did, no preambles, no restating their answers back at length. Use a list only for steps they'll follow or options they'll choose between. Ask two or three questions at a time, not a block of them. If there's more to say, offer it ("Want the details?") instead of writing it.
- Explain each new term in one plain sentence the first time it comes up (`../accounts-setup/references/glossary.md` has wording). Match how they talk; if they're fluent, skip the explanations.
- They want you to build. Check in only three times: after recommending the stack and pages (step 2), at the preview (step 5), and before going live (step 7). Everywhere else, keep going without asking.
- Don't narrate the process or reassure them about it: no "here's the plan", no "nothing gets built until you OK it", no "great!" openers. Just do the work, show the result, and ask the one question that needs an answer.
- Say before doing anything that's hard to undo: making a repo public, connecting a domain, deleting anything.
- Never ask for a password or token in the chat. Account setup has its own skill for that.

## 0. Accounts

First, work out whether this session runs on the person's own computer or on a remote or cloud machine (`../accounts-setup/SKILL.md` step 0 says how, and which steps depend on your tool). In the cloud, the steps marked **Cloud** below replace the local ones: nothing is installed, the work lives in the GitHub repository they made before starting, and they see drafts through Vercel preview links.

Run `../accounts-setup/scripts/check.sh`. If git, the GitHub CLI or Node is missing, or they aren't signed in to GitHub, run the `accounts-setup` skill first and come back. The Vercel connector is strongly recommended (it lets you read build logs when something fails), but not required: step 3 works through Vercel's website too.

**Cloud:** skip `check.sh`, which checks the person's own computer. Follow "In the cloud" in `accounts-setup` instead: confirm you can push to their repository and that the Vercel tools are there.

## 1. Interview

Ask two or three questions at a time, conversationally, and skip any their earlier answers already cover:

1. Who is the site for, and what should they do after visiting? (hire you, read your writing, book you, just know you exist)
2. What goes on it: projects or case studies, writing, photos, a resume, links?
3. Does anything need to move, respond or change: animation, filters, a contact form, a shop, logins? Or is it pages to read?
4. What do you already know? (nothing yet, HTML and CSS, JavaScript, React, something else)
5. Do you have a look in mind? If you have a design in Figma, share the link. Sites you like, sketches, screenshots or photos of things whose style you love are great too: links and images both work, as many as you like.

   If they share a Figma link, read it with your Figma tools if you have them; if you don't, or it's private, ask them to export the frames as images and attach them. Look at everything they share, and say back in a few words what you take from it (type, color, layout feel) so they can correct you before you plan.
6. Should any page be private, so only people you give a password to can see it? (a pitch deck, a case study under NDA, references)
7. Do you have a domain name, like `yourname.com`? (Fine if not: you can add one later.) If they do, follow up: where did you buy it? (GoDaddy, Namecheap, Squarespace, Google Domains, Cloudflare, Porkbun…) If they're not sure, they can search their email for the domain name plus "receipt" or "renewal". Note too whether it's pointing at an existing site, since connecting it will replace that.
8. Anything else you might need that we haven't covered?

Assume they'll update the site later by asking their AI assistant, so content lives as files in the repo. Only consider a visual editor if they bring one up.

Summarize what you heard in three or four short lines and ask if it's right.

## 2. Recommend a stack and plan (one check-in)

Choose with `references/stacks.md`, then send one short message they can read in under a minute:

- **What you'll build it with**, each piece with a few words on why it fits *them* ("mostly projects to read, so plain pages with no JavaScript to break")
- **The pages** (`/`, `/work`, `/work/<project>`, `/about`, …)
- **What it costs** (usually nothing) and what they'll have to keep up
- One alternative, in one line, only if it's a close call

Default to the simplest thing that works: static pages, content as files in the repo, no database, no client-side JavaScript unless an answer needs it. Look up current stable versions before naming them; don't rely on memory.

End with a plain question ("Sound good?"), and start building as soon as they say yes. If they change something, adjust and go; don't ask again.

Keep the details to yourself unless they ask: the content model, folder structure, and design tokens are your call. Put the look in one file of design tokens (colors, fonts, type sizes, spacing), so restyling never means hunting through components. If they have no design direction, pick a tasteful neutral one from what they told you and say so in a line; they'll react to the preview, which is easier than choosing in the abstract.

## 3. Create the repo and connect Vercel

Doing this before building means every change gets its own preview link from the start.

**Cloud:** the repository already exists, so skip creating it (steps 1 and 4 below). Scaffold into the current checkout, keeping their README until the new one replaces it, commit, and push to `main` before connecting Vercel.

1. Ask for the repo name (suggest something like `portfolio` or their domain without the dot) and confirm public or private.
2. Scaffold the project with the framework's official starter, minimal template. Add a `.gitignore` covering `node_modules`, build output, `.env*` and OS files, and an `.nvmrc` with the Node major version.
3. Replace the starter's home page with a one-line placeholder ("Site coming soon") so nothing half-built goes out.
4. Commit, then create and push the repo: `gh repo create <name> --public|--private --source=. --push`. Explain commit and push as you go.
5. Connect it to Vercel so pushes deploy by themselves. Walk them through it on Vercel's website, click by click (or, if the Vercel tools can create and link a project, offer to do it for them): Add New → Project → Import the repo (the first time, Vercel asks to install its GitHub app; choosing only this repo is fine) → check the framework preset was detected → Deploy. If they belong to more than one Vercel team, check the project is going under the one they chose. If the repo isn't in Vercel's list, their GitHub app for Vercel is limited to other repositories: have them follow the link on that page to adjust its access and add this repo, rather than giving it access to everything. Tell them the `*.vercel.app` address it gives is public but nobody knows it yet.
6. If the Vercel connector is set up, confirm the project and its first deployment through it. If the build fails, read the logs through it and fix it.

From here on, work on branches. Explain once: `main` is the live site; each branch is a draft with its own preview link, and merging the pull request publishes it.

## 4. Build

On a branch (`first-version`), build the plan with placeholder content that is clearly fake ("Project title", lorem-style summaries, gray placeholder images) so nobody mistakes it for real. Include:

- Responsive layouts from 320px up, light and dark themes from the same tokens, `prefers-reduced-motion` respected (gentler, not necessarily none)
- Semantic HTML, visible focus styles, alt text fields required in the content model
- A 404 page, page titles and descriptions, social share images, a sitemap, `robots.txt`
- Security headers in `vercel.json` (or the framework's equivalent): CSP, `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`
- A README in plain language: how to run it, how to add a project or post, how publishing works

Commit in small steps with messages that say why. Push the branch and open a pull request with `gh pr create`, describing what's in it in plain words.

## 5. Preview (check-in)

Vercel posts a preview link on the pull request (`gh pr view --web` opens it; the connector can fetch it too). Give them the link and ask them to look on their phone and their computer. Make the changes they ask for on the same branch; each push updates the preview.

Then help them swap the placeholders for real content, or show them how to do it themselves, whichever they'd rather. The audit should run on real content where possible.

## 6. Audit

**Cloud:** the audit needs a browser running against the site. Try starting it in the session as below; if packages or a browser can't be installed because of the session's network settings, run whatever checks you can (the security and dependency checks need no browser), run the browser checks against the Vercel preview link if your browser tool can reach it, and list what wasn't checked.

With the branch checked out, start the dev server and a production build (`build`, then `preview` or the framework's equivalent), then run the `audit` skill from [helenvholmes/skills](https://github.com/helenvholmes/skills). If it isn't already installed, clone that repository next to this one (outside their project folder) and follow `skills/audit/SKILL.md`, which runs the other check skills in that repository. It checks layout, accessibility, motion, performance and security, and needs a browser you can drive; if none is available, install Playwright for it and say so. If you can't get the audit skills, skip this step and say what wasn't checked.

Show the report and fix only the findings they choose, each as its own commit on the branch.

## 7. Launch (check-in)

1. Confirm they're ready, then merge the pull request (`gh pr merge --squash --delete-branch`, or have them click Merge on GitHub so they've done it once). Vercel publishes `main` within a minute or two. Check the live address.
2. **Domain**, if they have one: in Vercel, Project → Settings → Domains → add it, then give them the exact DNS records Vercel shows, and walk them through where those go at the registrar they named in the interview (look up that registrar's current steps rather than guessing menu names). If the domain points at an existing site, confirm before changing anything, since that site will stop showing at the address. DNS can take from minutes to a day; say so. Add both `example.com` and `www.example.com`, with one redirecting to the other.
3. **Analytics**, if they asked: Vercel Web Analytics is the simplest; it's turned on in the project's settings and needs one small package.

## 8. Hand off

Leave them able to carry on without you. Summarize in a few lines:

- Where everything lives: the GitHub repo URL, the Vercel project, the live address
- How to update the site: edit or add a content file, commit, push (or ask their AI assistant), check the preview, merge. In the cloud: start a new session on the same repository and ask for the change
- What to keep an eye on: dependency update pull requests, the domain's yearly renewal
- What's left that they mentioned but you didn't do

## Don't

- Add a database, CMS, auth or paid service unless an interview answer needs it, and never without saying what it costs.
- Push to `main` directly after step 3, force-push, or rewrite history.
- Commit anything secret, or any real personal details the person didn't put in themselves (address, phone number).
- Leave demo pages, sample data or starter-template leftovers behind.
