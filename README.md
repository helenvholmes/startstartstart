# Portfolio starter

Go from an empty folder to your own portfolio website, live on the internet, with Claude doing the building and explaining each step as it goes. You don't need to know how to code or how GitHub works.

By the end you'll have:

- A website at your own address (or a free `yourname.vercel.app` one)
- Its code saved in your own GitHub account, so it's backed up and yours to keep
- Hosting on your own Vercel account that updates the site every time you save a change
- A site that's been checked for accessibility, layout, performance and security before anyone sees it

Claude asks what the site is for, recommends what to build it with and why, and waits for your OK before building, before showing it to anyone, and before it goes live.

## Before you start

> **You need a paid Claude plan.** Claude Code, the part of Claude that builds things on your computer, isn't on the free plan. It needs a Pro, Max, Ultra, Team, or Enterprise subscription. Pro is enough for this.

You'll also need:

- **A Mac, Windows PC, or Linux computer** where you can install apps. A phone, tablet, or Chromebook won't work, and neither will Claude in a web browser: the site gets built on your computer.
- **About an hour** for the first session. Setting up accounts takes 10 to 20 minutes; the rest is deciding what you want and looking at drafts.
- **An email address** for two free accounts, GitHub and Vercel. Don't make them in advance; Claude walks you through both, and signing up for Vercel *with* GitHub links them from the start.
- **Optional:** a domain name, like `yourname.com`, if you already own one. You can add one later.

You won't need to type any passwords into Claude. Every sign-in happens on the service's own website.

## Start in the Claude desktop app

The desktop app is the easiest way to start: no terminal needed.

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
2. Under the prompt box there's a row of controls. Make sure the first one, the environment, is set to **Local**, so Claude works on your computer. (A **Cloud** session can't use this skill.)
3. Click the folder control next to it and choose the `portfolio` folder you just made.

### 4. Install the skills

Type this into the prompt box and press Enter:

```
/plugin marketplace add helenvholmes/portfolio-starter
```

Then install the plugin:

1. Click the **+** button next to the prompt box and choose **Add plugins** (or **Plugins**, then **Browse plugins**).
2. Find **portfolio-starter** and select it.
3. When it asks where to install it, choose your **user account**, so it's there for every project.

This also installs Helen's pre-launch checks (the **helenvholmes** plugin), which the starter uses before your site goes live.

To check it worked, type `/` in the prompt box. You should see `portfolio-starter:start` in the list.

### 5. Start

Copy this into the prompt box and press Enter:

```
Run /portfolio-starter:start. I'm new to GitHub, so explain each
new term the first time it comes up, and never ask me to paste a
password or token into this chat.
```

From here, Claude leads. Expect it to:

1. **Check your computer** and install anything missing. When something needs you, like approving an install or signing in on a website, it tells you exactly what to click and waits.
2. **Connect your accounts.** You'll sign in to GitHub in your browser, then connect Claude to Vercel from the **+** menu's connectors. Nothing is shared until you approve it.
3. **Ask about your site:** what it's for, what goes on it, what you already know.
4. **Recommend a setup** and explain why it fits you. Nothing gets built until you say OK.
5. **Build a first draft** with placeholder text, and give you a private link to look at it on your phone and computer.
6. **Check it** for accessibility, layout, speed and security, and fix what you choose.
7. **Put it live** when you say so, and connect your domain if you have one.

You can stop at any point and come back later: open the Code tab, choose the same folder, and say where you left off.

## Prefer the terminal?

If you're comfortable typing commands:

1. Install Claude Code: on macOS or Linux run `curl -fsSL https://claude.ai/install.sh | bash`; on Windows, see the [quickstart](https://code.claude.com/docs/en/quickstart) (Windows also needs [Git for Windows](https://git-scm.com/downloads/win) first). Open a new terminal window and check it with `claude --version`.
2. Make a folder and go into it: `mkdir portfolio && cd portfolio`.
3. Start Claude Code with `claude` and sign in when your browser opens.
4. Install the skills: `/plugin marketplace add helenvholmes/portfolio-starter`, then `/plugin install portfolio-starter@portfolio-starter`.
5. Paste the prompt from step 5 above.

## If something goes wrong

- **The Code tab asks you to upgrade:** your account doesn't have a paid plan, or you're signed in with a different account.
- **`portfolio-starter:start` isn't in the `/` list:** open **+** → **Plugins** → **Manage plugins** and check that **portfolio-starter** is installed and turned on.
- **Claude says it's in a cloud session:** start a new session and set the environment to **Local**.
- **You pasted a password or token into the chat by mistake:** change that password, or delete the token on the site that made it (Claude can tell you where), then carry on.

## What it costs

- **Claude:** your paid plan.
- **GitHub:** free.
- **Vercel:** free on the Hobby plan, which is for personal, non-commercial sites. A portfolio about you is typically fine; a site for a business or one that sells things may need a paid plan. Claude checks Vercel's current terms with you.
- **A domain (optional):** a yearly fee to a domain registrar. A `.com` is usually somewhere around $10 to $25 a year.

## What's in here

| Skill | What it does |
|---|---|
| `start` | Interviews you about the site and what you know, recommends the simplest setup that fits, plans and builds it, gives you preview links, runs the pre-launch checks, and puts it live on your own GitHub and Vercel |
| `accounts-setup` | Installs git, the GitHub CLI and Node if they're missing, signs you in to GitHub, and connects Claude to Vercel (and optionally GitHub). Never asks you to paste a password or token. Run it on its own with `/portfolio-starter:accounts-setup`. |

The pre-launch checks come from [helenvholmes/skills](https://github.com/helenvholmes/skills), installed automatically as a dependency.

`skills/accounts-setup/scripts/check.sh` reports what's installed and signed in for shipping a site, and changes nothing:

```bash
bash skills/accounts-setup/scripts/check.sh
```

## License

MIT
