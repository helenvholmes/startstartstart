# Portfolio starter

Create your own portfolio website with Claude as the builder. No coding, GitHub, or previous Vercel knowledge necessary.

By the end you'll have:

- A website at your own address (or a free `yourname.vercel.app`)
- Your code saved in your own GitHub account, so it's backed up and yours to keep
- Hosting on your own Vercel account that updates the site every time you save a change
- A site that's been checked for accessibility, layout, performance and security before anyone sees it

There's nothing to install from here. You paste one message into Claude, and Claude reads the instructions in this repository and walks you through the rest.

## Before you start

> **You need a paid Claude plan.** Claude Code, the part of Claude that builds things on your computer, isn't on the free plan. It needs a Pro, Max, Ultra, Team, or Enterprise subscription. Pro is enough for this.

You'll also need:

- **A computer.** The easiest way is the Claude desktop app on a Mac, Windows PC, or Linux computer where you can install apps. On a Chromebook, a work computer you can't install apps on, or a tablet with a keyboard, you can [use Claude in the cloud](#no-desktop-app-use-claude-in-the-cloud) from a web browser instead.
- **About an hour** for the first session. Setting up accounts takes 10 to 20 minutes; the rest is deciding what you want and looking at drafts.
- **Free GitHub and Vercel accounts.** Already have them? Great, Claude uses the ones you have and links them. If you don't, there's no need to make them in advance: Claude walks you through both, and signing up for Vercel *with* GitHub links them from the start.
- **Optional:** your resume, as a file you can attach. It gives Claude a head start on describing you and your work.
- **Optional:** a domain name, like `yourname.com`, if you already own one. You can add one later.

You won't need to type any passwords into Claude. Every sign-in happens on the service's own website.

## Start in the Claude desktop app

### 1. Install the app

Go to [claude.com/download](https://claude.com/download), download the version for your computer, and open it.

- **Mac:** open the downloaded file and drag Claude into Applications, then open it from there.
- **Windows:** open the downloaded file and follow the installer, then open Claude from the Start menu.
- **Linux (Ubuntu or Debian):** follow [Claude Desktop on Linux](https://code.claude.com/docs/en/desktop-linux).

Sign in with the account that has your paid plan.

### 2. Make an empty folder for your site

Claude works inside one folder on your computer, and everything for your site goes in it. Make a new, empty one now, somewhere easy to find, for example a folder called `portfolio` inside Documents.

Keep it empty. Claude will fill it.

### 3. Open the Code tab and start a session

1. Click **Code** at the top of the sidebar.
2. Under the prompt box there's a row of controls. Make sure the first one, where Claude runs, is set to your computer (**Local** or **This computer**), not the cloud.
3. Click the folder control next to it and choose the `portfolio` folder you just made.

### 4. Paste this and press Enter

```
Read the portfolio starter at github.com/helenvholmes/portfolio-starter
and follow skills/start/SKILL.md to help me build a portfolio site in
this folder. I'm new to GitHub, so explain each new term the first time
it comes up, and never ask me to paste a password or token into this chat.
```

From here, Claude leads. Expect it to:

1. **Check your computer** and install anything missing. When something needs you, like approving an install or signing in on a website, it tells you exactly what to click and waits.
2. **Connect your accounts.** You'll sign in to GitHub and Vercel in your browser.
3. **Ask about your site:** what it's for, what goes on it, what you already know.
4. **Suggest a setup**, then start building once you say it sounds good.
5. **Build a first draft** with placeholder text and open it in a browser right away, so you can watch it change as Claude works. Then you'll get your site's address to check it on your phone.
6. **Check it** for accessibility, layout, speed and security, and fix what you choose.
7. **Put it live** when you say so, and connect your domain if you have one.

Once you've written your case studies, Claude offers to review them the way a hiring manager would. You can ask for that any time: "Review my case studies with the portfolio starter at github.com/helenvholmes/portfolio-starter."

You can stop at any point and come back later: start a new session on the same folder and say "Let's keep going with the portfolio starter at github.com/helenvholmes/portfolio-starter."

## No desktop app? Use Claude in the cloud

If you can't install the desktop app, Claude can build your site on its own computer in the cloud and save everything straight to GitHub. Nothing gets installed on yours, and you can do it from a web browser. It takes a little more setup at the start, because a cloud session needs your GitHub project to exist before it begins.

### 1. Make a GitHub account and an empty project

1. Sign up at [github.com/signup](https://github.com/signup) if you don't have an account.
2. Go to [github.com/new](https://github.com/new). This makes a *repository*: the online folder your site's code will live in.
3. Name it something like `portfolio`, choose **Public**, and tick **Add a README file**. (A cloud session can only start from a repository that has something in it.)
4. Click **Create repository**.

### 2. Connect Vercel to your Claude account

Vercel is the service that puts your site on the internet.

1. In your browser, go to [claude.ai/customize/connectors](https://claude.ai/customize/connectors).
2. Find **Vercel** and connect it. If it isn't listed, add a custom connector with the address `https://mcp.vercel.com`.
3. Sign in on Vercel's page. If you don't have a Vercel account, choose **Continue with GitHub** to make one that's linked to GitHub from the start.

### 3. Start a cloud session on your project

1. Go to [claude.ai/code](https://claude.ai/code).
2. The first time, it asks you to connect GitHub. Allow it, and give it access to the repository you just made.
3. Choose that repository and start a session.

### 4. Paste this and press Enter

```
Read the portfolio starter at github.com/helenvholmes/portfolio-starter
and follow skills/start/SKILL.md to help me build a portfolio site in
this repository. This is a cloud session. I'm new to GitHub, so explain
each new term the first time it comes up, and never ask me to paste a
password or token into this chat.
```

From here it's the same as the desktop app, except there's nothing to install, and you'll look at your drafts at your site's address instead of on your computer. To come back later, start a new session on the same repository at claude.ai/code and say "Let's keep going with the portfolio starter at github.com/helenvholmes/portfolio-starter."

## Prefer the terminal?

If you're comfortable typing commands:

1. Install Claude Code: on macOS or Linux run `curl -fsSL https://claude.ai/install.sh | bash`; on Windows, see the [quickstart](https://code.claude.com/docs/en/quickstart) (Windows also needs [Git for Windows](https://git-scm.com/downloads/win) first). Open a new terminal window and check it with `claude --version`.
2. Make a folder and go into it: `mkdir portfolio && cd portfolio`.
3. Start Claude Code with `claude` and sign in when your browser opens.
4. Paste the message from [step 4 of the desktop steps](#4-paste-this-and-press-enter).

## If something goes wrong

- **The Code tab asks you to upgrade:** your account doesn't have a paid plan, or you're signed in with a different account.
- **Claude says it can't read the repository:** check the address in your message is exactly `github.com/helenvholmes/portfolio-starter`, then try again.
- **Claude says it's in a cloud session but you meant to work on your computer:** start a new session and set where Claude runs to your computer. If you meant the cloud, follow [the cloud steps](#no-desktop-app-use-claude-in-the-cloud) instead.
- **You pasted a password or token into the chat by mistake:** change that password, or delete the token on the site that made it (Claude can tell you where), then carry on.

## What it costs

- **Claude:** your paid plan.
- **GitHub:** free.
- **Vercel:** free on the Hobby plan, which is for personal, non-commercial sites. A portfolio about you is typically fine; a site for a business or one that sells things may need a paid plan. Claude checks Vercel's current terms with you.
- **A domain (optional):** a yearly fee to a domain registrar. A `.com` is usually somewhere around $10 to $25 a year.

## Using another AI coding agent

The same message works in other AI coding agents (Codex, Cursor, Copilot, Gemini CLI and others), as long as the agent can read from GitHub and run commands on your computer. The instructions tell each agent to use its own way of connecting to Vercel and GitHub. If it doesn't know one, Vercel's helper configures most agents: `npx -y add-mcp https://mcp.vercel.com -g`.

## What's in here

| Skill | What it does |
|---|---|
| `start` | Interviews you about the site and what you know, recommends the simplest setup that fits, plans and builds it, shows it to you as it goes, runs the pre-launch checks, and puts it live on your own GitHub and Vercel |
| `accounts-setup` | Installs git, the GitHub CLI and Node if they're missing, signs you in to GitHub, and connects your agent to Vercel (and optionally GitHub). Never asks you to paste a password or token. Claude-specific steps live in `references/claude.md`. |

The pre-launch checks and the case study review come from [helenvholmes/skills](https://github.com/helenvholmes/skills), which `start` reads the same way. The review follows Brian Lovin's [advice on presenting design work](https://brianlovin.com/writing/how-to-give-a-great-product-design-portfolio-presentation).

`skills/accounts-setup/scripts/check.sh` reports what's installed and signed in for shipping a site, and changes nothing:

```bash
bash skills/accounts-setup/scripts/check.sh
```

## License

MIT
