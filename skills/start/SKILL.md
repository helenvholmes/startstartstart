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

- **Keep every message short.** A few sentences is usually enough; a long message is one they'll skim or skip. Lead with what they need to do or decide, then stop. No recaps of what you just did, no preambles, no restating their answers back at length. Use a list only for steps they'll follow or options they'll choose between. Ask one question at a time. If there's more to say, offer it ("Want the details?") instead of writing it.
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

Ask **one question at a time**, and skip any their earlier answers already cover. If your tool can show a multiple-choice question card (in Claude, see `../accounts-setup/references/claude.md`), use it for every question below: the choices make answering quick, and the person can always type their own answer instead. Keep each question to one line and each choice to a few words. Where a question has no card choices, ask it in plain text. Don't comment on each answer; go straight to the next question.

1. **What's the site mainly for?** Getting hired · Getting contracting work
2. **What will go on it?** (pick multiple) Case studies · Writing · Photos · A resume
3. **Any add-ons?** (pick multiple) Just pages · Animations · A contact form · Something more
4. **Do you have a look in mind?** I have a Figma file · I have sites or images I like · Not yet, surprise me

   If they have a Figma file, sites or images, ask in plain text for the links or images: links and images are both great, as many as they like. Read a Figma link with your Figma tools if you have them; if you don't, or it's private, ask them to export the frames as images and attach them. Look at everything they share, and say back in a line what you take from it (type, color, layout feel) so they can correct you.
5. **Should any page be private, behind a password?** No · Yes, a deck or pitch · Yes, NDA work or references
6. **Do you have a domain name, like yourname.com?** No, not yet · Yes

   If yes, follow up: **Where did you buy it?** GoDaddy · Namecheap · Squarespace · Cloudflare. If they're not sure, they can search their email for the domain name plus "receipt" or "renewal". Ask in plain text for the domain itself, and whether it shows an existing site now, since connecting it will replace that.
7. **Anything else you need that we haven't covered?** No, let's build · Yes (they type it)

Assume they'll update the site later by asking their AI assistant, so content lives as files in the repo. Only consider a visual editor if they bring one up.

Go straight to step 2; its message opens with a line or two of what you heard, so there's no separate summary to confirm.

## 2. Recommend a stack and plan (one check-in)

Choose with `references/stacks.md`, then send one short message they can read in under a minute. Open with one or two lines of what you heard, then:

- **What you'll build it with**, each piece with a few words on why it fits *them* ("mostly projects to read, so plain pages with no JavaScript to break")
- **The pages** (`/`, `/work`, `/work/<project>`, `/about`, …)
- **What it costs** (usually nothing) and what they'll have to keep up
- One alternative, in one line, only if it's a close call

Default to the simplest thing that works: static pages, content as files in the repo, no database, no client-side JavaScript unless an answer needs it. Look up current stable versions before naming them; don't rely on memory.

End with one question, as a card if you can: **Sound good?** Yes, build it · Change something. Start building as soon as they say yes. If they change something, adjust and go; don't ask again.

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
- **Case studies shown once, as cards.** The work page (and any selected work on the home page) lists each case study a single time, as a card: cover image, title, a one-line summary, and the year. Don't also add a table or text list of the same projects; showing everything twice reads as filler.
- **Contact: email first.** The site's job is getting them hired or contract work, so the easiest way to reach them is an email link, shown first and most prominently wherever contact appears (footer, about page, end of case studies). LinkedIn comes next. Add other profiles (GitHub, Dribbble, Instagram, …) only if they ask for them. Use clearly fake placeholders until they give real ones, and when you ask for the email, suggest one they're happy to have public, since anything on the page can be seen by anyone.
- Security headers in `vercel.json` (or the framework's equivalent): CSP, `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`
- A README in plain language: how to run it, how to add a project or post, how publishing works

**Show it right away.** As soon as the first version builds, start the dev server in the background and open its address in a browser the person can see: your tool's built-in browser or preview pane if it has one (in Claude, see `../accounts-setup/references/claude.md`), otherwise their default browser. Leave it running while you work, so every change shows up as you make it, and tell them the address in one line. **Cloud:** there's no server they can open; skip this and use the Vercel preview link in step 5.

Commit in small steps with messages that say why. Push the branch and open a pull request with `gh pr create`, describing what's in it in plain words.

## 5. Preview (check-in)

Vercel posts a preview link on the pull request (`gh pr view --web` opens it; the connector can fetch it too). Give them the link and ask them to look on their phone and their computer. Make the changes they ask for on the same branch; each push updates the preview.

Then help them swap the placeholders for real content, or show them how to do it themselves, whichever they'd rather. The audit should run on real content where possible.

**Once they've added real case studies**, offer a review in one line: "Want me to review your case studies the way a hiring manager would?" If yes, run the `review` skill from [helenvholmes/skills](https://github.com/helenvholmes/skills): if it isn't installed, read `skills/review/SKILL.md` from that repository, the same way as the audit skills. Offer it once; if they say not now, mention it again at hand-off.

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
- If they have case studies and haven't had one yet: the `review` skill, which critiques them the way a hiring manager reads them

## Don't

- Add a database, CMS, auth or paid service unless an interview answer needs it, and never without saying what it costs.
- Push to `main` directly after step 3, force-push, or rewrite history.
- Commit anything secret, or any real personal details the person didn't put in themselves (address, phone number).
- Leave demo pages, sample data or starter-template leftovers behind.
