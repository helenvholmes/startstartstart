---
name: start
description: Take someone from "I want a portfolio site" to a live site on their own GitHub and Vercel accounts — interview them about what the site is for and what they already know, recommend the simplest stack that fits and explain why, plan the pages, build it with placeholder content, show it to them as it goes, run the pre-ship audit, and launch it with their domain. Built for people who are new to GitHub and may be new to code. Use this whenever the user asks to make, start, build or set up a portfolio, personal site, or simple website from scratch, asks what stack or framework a small site should use, or says they want a site "on GitHub and Vercel", even if they've already picked part of the stack.
---

# *startstartstart!*

The person should end up with a site they own outright (code in their GitHub, hosting in their Vercel account), that they understand well enough to update, and that passed a pre-launch audit before anyone saw it.

## If you were installed as a plugin

If the person added *startstartstart!* from Claude's plugin directory, these skills are already on their computer, at `${CLAUDE_PLUGIN_ROOT}`. You can tell because that shows as a real folder path here rather than the literal text in braces. Skip the clone below and read the other files from that folder. When they come back later and say to keep going, the skills are still installed; just look at the project to find where you left off.

## If you're reading this from GitHub

The person usually starts by asking you to read this repository, rather than installing it. Before step 0, get a copy you can run scripts from, **outside their project folder** so nothing of this repository ends up in their site:

```
git clone --depth 1 https://github.com/helenvholmes/startstartstart "${TMPDIR:-/tmp}/startstartstart"
```

Then read `skills/start/SKILL.md` and `skills/accounts-setup/SKILL.md` from that copy. If git isn't installed yet, read the files from the web instead and start with `accounts-setup` step 2, which installs it; clone once it's there. When they come back in a later session and say to keep going, read the skills again the same way, then look at the project (its README, open pull requests, the Vercel project) to find where you left off.

## How to work

Three rules shape every step here:

- **Decisions the person makes on purpose are theirs.** Their taste, their words, their choice of color or layout: suggest, never override. Still say plainly when a choice fails someone (contrast too low, text too small), and offer the smallest fix that keeps the intent.
- **Test with the real content.** The person writes their own content, so check the site with what they'll actually put on it, not invented worst cases.
- **Every change is small and reversible.** Show it before committing, make each change separately, and leave no test scaffolding behind.

## Talking with the person

- **Keep every message short.** A few sentences is usually enough; a long message is one they'll skim or skip. Lead with what they need to do or decide, then stop. No recaps of what you just did, no preambles, no restating their answers back at length. Use a list only for steps they'll follow or options they'll choose between. Ask one question at a time. If there's more to say, offer it ("Want the details?") instead of writing it.
- Explain each new term in one plain sentence the first time it comes up (`../accounts-setup/references/glossary.md` has wording). Match how they talk; if they're fluent, skip the explanations.
- They want you to build. Check in after recommending the stack and pages (step 2), and use the "What's next" question in step 5 to let them steer after that. Everywhere else, keep going without asking.
- Don't narrate the process or reassure them about it: no "here's the plan", no "nothing gets built until you OK it", no "great!" openers. Just do the work, show the result, and ask the one question that needs an answer.
- Say before doing anything that's hard to undo: making a repo public, connecting a domain, deleting anything.
- Never ask for a password or token in the chat. Account setup has its own skill for that.

## 0. Accounts

First, work out whether this session runs on the person's own computer or on a remote or cloud machine (`../accounts-setup/SKILL.md` step 0 says how, and which steps depend on your tool). In the cloud, the steps marked **Cloud** below replace the local ones: nothing is installed, the work lives in the GitHub repository they made before starting, and they see drafts through Vercel preview links.

Run the checks in step 1 of `accounts-setup` (`../accounts-setup/SKILL.md`). If git, the GitHub CLI or Node is missing, or they aren't signed in to GitHub, run the `accounts-setup` skill first and come back. The Vercel connector is strongly recommended (it lets you read build logs when something fails), but not required: step 3 works through Vercel's website too.

**Cloud:** skip those checks, which are about the person's own computer. Follow "In the cloud" in `accounts-setup` instead: confirm you can push to their repository and that the Vercel tools are there.

## 1. Interview

Ask **one question at a time**, and skip any their earlier answers already cover. If your tool can show a multiple-choice question card (in Claude, see `../accounts-setup/references/claude.md`), use it for every question below: the choices make answering quick, and the person can always type their own answer instead. Keep each question to one line and each choice to a few words. Where a question has no card choices, ask it in plain text. Don't comment on each answer; go straight to the next question.

1. **What's the site mainly for?** Getting hired · Getting contracting work
2. **Do you have a resume you can share?** Yes, I'll attach it · Here's my LinkedIn instead · Not right now

   A resume gives you a head start on describing them: use it to draft the intro and about page, and to suggest which roles and projects could become case studies. Everything you draft from it is a starting point for them to edit, in their voice; never add claims, titles or numbers that aren't in it. Keep personal details off the site (phone number, home address) unless they ask for them. LinkedIn profiles usually can't be read without signing in, so if they send a link, ask them to save the profile as a PDF instead (on their profile, the **More** or **Resources** button → **Save to PDF**; LinkedIn moves it around) and attach that. If they don't have either, carry on; ask for a few lines about their work when you write the about page.
3. **What will go on it?** (pick multiple) Case studies · Writing · Photos · A resume
4. **Any add-ons?** (pick multiple) Just pages · Animations · A contact form · Something more
5. **Do you have a look in mind?** I have a Figma file · I have sites or images I like · Not yet, surprise me

   If they have a Figma file, sites or images, ask in plain text for the links or images: links and images are both great, as many as they like. Read a Figma link with your Figma tools if you have them; if you don't, or it's private, ask them to export the frames as images and attach them. Look at everything they share, and say back in a line what you take from it (type, color, layout feel) so they can correct you.
6. **Should any page be private, behind a password?** No · Yes, a deck or pitch · Yes, NDA work or references
7. **Do you have a domain name, like yourname.com?** No, not yet · Yes

   If yes, follow up: **Where did you buy it?** GoDaddy · Namecheap · Squarespace · Cloudflare. If they're not sure, they can search their email for the domain name plus "receipt" or "renewal". Ask in plain text for the domain itself, and whether it shows an existing site now, since connecting it will replace that.
8. **Anything else you need that we haven't covered?** No, let's build · Yes (they type it)

Assume they'll update the site later by asking their AI assistant, so content lives as files in the repo.

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

Doing this before building means every change you push shows up at their site's address within a minute or two, so they can check it on their phone from the start.

**Cloud:** the repository already exists, so skip creating it (steps 1 and 4 below). Push to `main` as below; if the session isn't allowed to push to `main`, it will push a branch instead: open a pull request and walk them through clicking **Merge** on GitHub each time, in one line, without explaining branches. Scaffold into the current checkout, keeping their README until the new one replaces it, commit, and push to `main` before connecting Vercel.

1. Ask for the repo name (suggest something like `portfolio` or their domain without the dot) and confirm public or private.
2. Scaffold the project with the framework's official starter, minimal template. Add a `.gitignore` covering `node_modules`, build output, `.env*` and OS files, and an `.nvmrc` with the Node major version.
3. Replace the starter's home page with a one-line placeholder ("Site coming soon") so nothing half-built goes out.
4. Commit, then create and push the repo: `gh repo create <name> --public|--private --source=. --push`. Explain commit and push as you go.
5. Connect it to Vercel so pushes deploy by themselves. Walk them through it on Vercel's website, click by click (or, if the Vercel tools can create and link a project, offer to do it for them): Add New → Project → Import the repo (the first time, Vercel asks to install its GitHub app; choosing only this repo is fine) → check the framework preset was detected → Deploy. If they belong to more than one Vercel team, check the project is going under the one they chose. If the repo isn't in Vercel's list, their GitHub app for Vercel is limited to other repositories: have them follow the link on that page to adjust its access and add this repo, rather than giving it access to everything. Tell them the `*.vercel.app` address it gives is their site: it's public, but nobody knows it until they share it, so it's fine for drafts.
6. If the Vercel connector is set up, confirm the project and its first deployment through it. If the build fails, read the logs through it and fix it.

**Always work on `main`.** Don't create branches or pull requests: they're one more idea for a beginner to hold, and this site doesn't need them. Each push to `main` updates their site's address. Never push anything that must stay private (real content for a password-protected page, personal details) until the protection is in place and checked.

## 4. Build

Build the plan with placeholder content that is clearly fake ("Project title", lorem-style summaries, gray placeholder images) so nobody mistakes it for real. Include:

- Responsive layouts from 320px up, light and dark themes from the same tokens, `prefers-reduced-motion` respected (gentler, not necessarily none)
- Semantic HTML, visible focus styles, alt text fields required in the content model
- A 404 page, page titles and descriptions, social share images, a sitemap, `robots.txt`
- **Case studies shown once, as cards.** The work page (and any selected work on the home page) lists each case study a single time, as a card: cover image, title, a one-line summary, and the year. Don't also add a table or text list of the same projects; showing everything twice reads as filler.
- **Contact: email first.** The site's job is getting them hired or contract work, so the easiest way to reach them is an email link, shown first and most prominently wherever contact appears (footer, about page, end of case studies). LinkedIn comes next. Add other profiles (GitHub, Dribbble, Instagram, …) only if they ask for them. Use clearly fake placeholders until they give real ones, and when you ask for the email, suggest one they're happy to have public, since anything on the page can be seen by anyone.
- Security headers in `vercel.json` (or the framework's equivalent): CSP, `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`
- A README in plain language: how to run it, how to add a project or post, how publishing works

**Show it right away.** As soon as the first version builds, start the dev server in the background and open its address in a browser the person can see: your tool's built-in browser or preview pane if it has one (in Claude, see `../accounts-setup/references/claude.md`), otherwise their default browser. Leave it running while you work, so every change shows up as you make it, and tell them the address in one line. **Cloud:** there's no server they can open; skip this and use their site's address in step 5.

Commit in small steps with messages that say why, and push to `main` when there's something worth looking at. Explain commit and push in a sentence the first time.

## 5. What's next (repeat until done)

Give them their site's `*.vercel.app` address in one line, so they can look on their phone too (it opens without signing in, unlike Vercel's preview links, so don't send those). Don't recap what you built or list what's left. Then ask, as a question card:

**What do you want to work on next?**

- Adding real content
- Setting up my custom domain (only if they have one)
- Setting up password protection (only if they asked for a private page)
- Running the pre-launch check (only once real content is in)

They can always type something else instead, like a change to how it looks; make it, push, and ask again. After each task, ask the same question again with what's left, until everything is done; then go to step 6.

### Adding real content

Help them swap the placeholders for real content, or show them how to do it themselves, whichever they'd rather. Use what they gave you in the interview (their resume, links, images) to draft first, for them to edit.

**Once they've added real case studies**, offer a review in one line: "Want me to review your case studies the way a hiring manager would?" If yes, run the `review` skill from [helenvholmes/skills](https://github.com/helenvholmes/skills): if it isn't installed, read `skills/review/SKILL.md` from that repository, the same way as the audit skills. Offer it once; if they say not now, mention it again at hand-off.

### Setting up password protection

Never ask for the password in the chat, and never write it into a file yourself. Do these in order, one step at a time:

1. **Make the repository private first.** A password on the site doesn't hide the files on GitHub: in a public repository, anyone can read the NDA case study there. Check with `gh repo view --json visibility`. If it's public, explain that in one line and ask, as a question card, to make it private (Make it private · Keep it public and leave the private material out). With a yes, run `gh repo edit --visibility private --accept-visibility-change-consequences`. Vercel's free plan deploys private repositories too.
2. **Build the check** the free way in `references/stacks.md`, with the private pages in their own section of the site (for example `/private/…`). Read the password from an environment variable called `SITE_PASSWORD`, and make sure the check runs in the local dev server as well as on Vercel, so what they see locally is what visitors get.
3. **Let them see the NDA work locally.** Confirm `.gitignore` covers `.env*`, then create `.env.local` in the project with one line, `SITE_PASSWORD=`, and nothing after the equals sign. Have them open that file (give them its full path, or open it in your tool's editor if it has one), type the password they want right after `=`, and save. Tell them this file stays on their computer: it's never saved to GitHub. Then restart the dev server so it reads the file, open a private page in the browser, and have them enter the password. Also open it once in a private window (or after clearing the cookie) to show it's blocked without the password.
4. **Set the same password on Vercel.** Walk them through it on Vercel's website: their project → **Settings** → **Environment Variables** → add `SITE_PASSWORD` with their password, for **Production** and **Preview**, and save. Don't use your Vercel tools for this step: they'd need the password in the chat. Then push, and once the new version is live, have them check the private page on their phone: it should ask for the password.
5. Only now add their real NDA content, and check once more that the private pages are left out of the sitemap and search, and aren't linked from public pages unless they want a visible "password required" link.

If they forget the password, they can change it the same way: edit `.env.local` for their computer, and the environment variable on Vercel (then push or redeploy) for the live site.

### Setting up my custom domain

If the site still has placeholder content, say in one line that the domain will show it as it is now, and let them choose whether to go ahead.

In Vercel, Project → Settings → Domains → add it, then give them the exact DNS records Vercel shows, and walk them through where those go at the registrar they named in the interview (look up that registrar's current steps rather than guessing menu names). If the domain points at an existing site, confirm before changing anything, since that site will stop showing at the address. DNS can take from minutes to a day; say so. Add both `example.com` and `www.example.com`, with one redirecting to the other.

### Running the pre-launch check

**Cloud:** the audit needs a browser running against the site. Try starting it in the session as below; if packages or a browser can't be installed because of the session's network settings, run whatever checks you can (the security and dependency checks need no browser), run the browser checks against their site's address if your browser tool can reach it, and list what wasn't checked.

Start the dev server and a production build (`build`, then `preview` or the framework's equivalent), then run the `audit` skill from [helenvholmes/skills](https://github.com/helenvholmes/skills). If it isn't already installed, clone that repository next to this one (outside their project folder) and follow `skills/audit/SKILL.md`, which runs the other check skills in that repository. It checks layout, accessibility, motion, performance and security, and needs a browser you can drive; if none is available, install Playwright for it and say so. If you can't get the audit skills, skip this step and say what wasn't checked.

Show the report and fix only the findings they choose, each as its own commit.

### Analytics

Only if they ask: Vercel Web Analytics is the simplest; it's turned on in the project's settings and needs one small package.

## 6. Hand off

Leave them able to carry on without you. Summarize in a few lines:

- Where everything lives: the GitHub repo URL, the Vercel project, the live address
- How to update the site: ask their AI assistant for the change (or edit a content file themselves), commit and push to `main`, and it's live in a minute or two. In the cloud: start a new session on the same repository and ask for the change
- What to keep an eye on: the domain's yearly renewal
- What's left that they mentioned but you didn't do
- If they have case studies and haven't had one yet: the `review` skill, which critiques them the way a hiring manager reads them

Then, if the site is live with their real content, offer once, in one line: "Want to add your site to the *startstartstart!* showcase, so others can see what's possible?" See "Adding a site to the showcase" below. If they say no, drop it.

## Adding a site to the showcase

Use this when they say yes at hand-off, or ask for it any time ("Submit my site to the *startstartstart!* showcase").

Never submit it for them, even if your GitHub tools could: it puts their name and site on a public page, so they send it themselves. Build a link to the showcase form with what you already know filled in, URL-encoding each value:

```
https://github.com/helenvholmes/startstartstart/issues/new?template=showcase.yml&title=Showcase:%20<name>&url=<live address>&name=<name>&role=<what they do>
```

Use the custom domain if it's connected, otherwise the `*.vercel.app` address. Take the name and role from the site itself. Give them the link in one line: it opens a form on GitHub (they're already signed in from setup) where they can check the details, tick what's on the site, add a note about how it went, and click **Create**. Don't fill in the notes for them; that's their feedback to give.

## Don't

- Add a database, CMS, auth or paid service unless an interview answer needs it, and never without saying what it costs.
- Create branches or pull requests, force-push, or rewrite history.
- Commit anything secret, or any real personal details the person didn't put in themselves (address, phone number).
- Leave demo pages, sample data or starter-template leftovers behind.
