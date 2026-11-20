# startstartstart!

Build your own portfolio website with Claude, with no coding, GitHub or Vercel experience needed. Ask Claude to make you a portfolio site, and it takes you the whole way:

1. **Interviews you** about what the site is for (getting hired, finding clients, showing your work) and what you already know.
2. **Recommends the simplest setup** that fits, and explains why in plain words.
3. **Builds the site** with placeholder content, and shows it to you as it goes so you can steer.
4. **Checks it before anyone sees it:** accessibility, layout at every screen size, performance and security.
5. **Puts it live** on your own free GitHub and Vercel accounts, at your own domain if you have one.

You end up with a site you own outright, saved in your own GitHub account, that updates every time you save a change.

See example sites and what people have built at [startstartstart.app](https://startstartstart.app).

## What you need

- A paid Claude plan (Claude Code isn't on the free plan).
- The Claude desktop app's Code tab, Claude Code in a terminal, or a cloud session at claude.ai/code. A plain chat on claude.ai can't build the site, because Claude needs to run commands on your computer.
- About an hour for the first session.

## Skills

| Skill | What it does |
|---|---|
| `start` | Interviews you, recommends a setup, plans and builds the site, shows it as it goes, runs the pre-launch checks, and puts it live |
| `accounts-setup` | Installs git, the GitHub CLI and Node.js if they're missing, signs you in to GitHub, and connects Claude to Vercel |

## What it runs and connects to

Everything here is instructions for Claude: there are no scripts or programs. Nothing runs in the background, and nothing is sent anywhere except the services below. Claude asks before each step that installs something or signs you in.

- **On your computer:** installs git, the GitHub CLI and Node.js if they're missing, using your system's own installer (Homebrew, winget, apt and so on). It sets your git name and email, and creates your site's project in the folder you chose.
- **GitHub:** signs you in through the GitHub CLI's browser sign-in, creates a repository for your site in your account, and saves your work there. It also downloads the pre-launch checks from [helenvholmes/skills](https://github.com/helenvholmes/skills) into a temporary folder.
- **Vercel:** connects Claude to your Vercel account through Vercel's official connector (`https://mcp.vercel.com`) and puts your site live there.
- **Your site's packages:** installs the packages your site needs from npm, and a browser for the pre-launch checks.
- **Passwords and tokens:** never asked for in the chat. Every sign-in happens on the service's own website.

## Source and help

Source, full setup guide and issues: [github.com/helenvholmes/startstartstart](https://github.com/helenvholmes/startstartstart). MIT licensed.

## Privacy

*startstartstart!* collects nothing: there's no service behind it, and your work stays on your computer and in your own GitHub and Vercel accounts. The full [privacy policy](https://startstartstart.app/privacy/) also covers the website.

