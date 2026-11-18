---
name: accounts-setup
description: "Get someone who is new to GitHub ready to build and ship a website with an AI coding agent — install the tools they're missing (git, the GitHub CLI, Node.js), sign them in to GitHub with the GitHub CLI, set their git name and email, and connect the agent to their Vercel account (and, if they want it, their GitHub account) through MCP. Use this whenever the user says they're new to GitHub or git, asks to \"set up GitHub\", \"connect Vercel\", \"log in to GitHub\", fix \"gh: command not found\" or \"not logged in\" errors, or is about to create their first repo or deploy, even if they only mention one of the two services."
---

# Accounts setup

The goal is a person who can save their work to GitHub and see it live on Vercel, who understands each step well enough to do it again, and who never had to paste a password or token into the chat.

Work so everything can be undone: show changes before making them, make each one separately, and leave nothing behind the person didn't ask for.

## How to talk to the person

- **Keep every message short.** A few sentences is usually enough; a long message is one they'll skim or skip. Lead with what they need to do or decide, then stop. No recaps of what you just did, no preambles, no restating their answers back at length. Use a list only for steps they'll follow or options they'll choose between. Ask one question at a time. If there's more to say, offer it ("Want the details?") instead of writing it.
- Assume nothing about what they know. The first time a term comes up (repository, commit, push, terminal, CLI, MCP, token), explain it in one plain sentence. `references/glossary.md` has wording to borrow. Don't explain it again after that.
- One step at a time. Say what the step is for, do it or tell them exactly what to do, then confirm it worked before moving on.
- When a step needs their hands (a browser sign-in, a password prompt, an installer window), tell them precisely what to type or click, then stop and wait. Don't guess that it worked; check.
- If something fails, say what happened in plain words before trying to fix it.

## Never handle secrets in the chat

- Never ask for a password, token, or one-time code. If the person offers one, tell them not to paste it, and if they already have, tell them to revoke it and make a new one (say where).
- Prefer browser sign-ins (OAuth) everywhere. They need no token at all.
- When a token truly can't be avoided, the person creates it and enters it in **a terminal window of their own, outside the agent's app**, so it never enters the conversation.
- Say where every credential ends up stored on their computer, and how to remove it.

## 0. Know your own tool

Three steps depend on which agent and app you're running in: how the person runs a command themselves (step 3), how an MCP server is added and signed in to (steps 4 and 5), and how they're removed (step 6). Everything else is the same everywhere.

- **If you are Claude** (Claude Code in a terminal, the Claude desktop app's Code tab, or an IDE extension), read `references/claude.md` now and follow it at those steps.
- **Otherwise**, use your own tool's documented way of letting the person run a command themselves and of adding a remote MCP server, and say which you're using. If you don't know your tool's way, Vercel's `add-mcp` helper configures most agents: `npx -y add-mcp https://mcp.vercel.com -g`.

### In the cloud

If the session is running on a remote or cloud machine rather than the person's own computer, the work happens in a GitHub repository they made before starting, and most of this skill doesn't apply:

- **Skip steps 2 and 3.** Nothing is installed on their computer, and the session reaches GitHub through the agent's own GitHub connection. Check it works: `git remote -v` points at their repository and `git push --dry-run` succeeds. If not, tell them to reconnect GitHub in the agent's settings and give it access to this repository.
- **Step 4** happens in their agent account's connector settings, not in this session. If the Vercel tools aren't there, walk them through connecting Vercel in those settings (the reference file for your tool says where), then have them start a new session on the same repository.
- **Skip step 5.** The agent's GitHub connection already covers it.
- **Step 6:** say what's connected and where to disconnect it.

If they don't have a repository yet, stop and walk them through making one on github.com (Public, with a README), connecting it to the agent, and starting a new session on it.

## 1. See where they're starting

Run `scripts/check.sh` (from this skill's folder). It prints what's installed and what's signed in, and changes nothing. Read it back to the person in plain words ("You have git and Node, but not the GitHub CLI yet"), then only do the steps they still need. If they've done all of this before, finish in a minute.

Then ask, one question at a time, using a multiple-choice card if your tool has one (the person can always type their own answer):

1. **Do you have a GitHub account?** Yes · No, help me make one. If yes, ask for the username in plain text, unless `check.sh` already showed them signed in. If they have more than one (a personal and a work account, say), ask which one this site belongs to.
2. **Do you have a Vercel account?** Yes · No · Not sure. If not, plan to sign up for one **with GitHub** (step 4), so the two are linked from the start. If they do, use it as it is: it doesn't matter how it was created, since Vercel links to GitHub when the repository is imported. If they belong to more than one Vercel team, ask which one the site goes under (their personal account is usual).
3. **What name should appear on your saved work?** It shows publicly next to every change on GitHub. Offer their GitHub display name (from `gh api user --jq .name`, once signed in) as the first choice; most people use their real name, and a handle is fine.
4. **Should your code be public or private?** Public (normal for portfolios) · Private

Don't ask for their email address yet; step 3 suggests a private one.

## 2. Install what's missing

Required: **git**, the **GitHub CLI** (`gh`), and **Node.js** (the current LTS version). Detect the operating system and package manager, then:

| | macOS | Windows | Linux |
|---|---|---|---|
| With a package manager | `brew install git gh node` | `winget install --id Git.Git`, `winget install --id GitHub.cli`, `winget install --id OpenJS.NodeJS.LTS` | the distro's packages; for `gh`, follow cli.github.com, since distro versions are often old |
| Without | `xcode-select --install` gives git; get `gh` from cli.github.com and Node from nodejs.org | installers from git-scm.com, cli.github.com, nodejs.org | — |

You may run an install yourself when it needs no password and opens no window. Anything that asks for a password (`sudo`, an admin prompt) or opens an installer is the person's to run: give them the exact command or link and wait. If Homebrew isn't installed on a Mac, don't install it unasked; offer it or use the direct installers.

After installing, a new terminal window may be needed before the commands are found. Re-run `scripts/check.sh` to confirm.

## 3. Sign in to GitHub (required)

The GitHub CLI is how you create repositories and save work to GitHub on the person's behalf. It signs in through the browser, so no token changes hands.

1. If they have no account, send them to github.com/signup and wait. Suggest turning on two-factor authentication when GitHub offers it.
2. Have them run the sign-in themselves, using your tool's way of letting the person run a command (see step 0). It needs their browser and a one-time code, so you can't run it for them:

   ```
   gh auth login --hostname github.com --git-protocol https --web
   ```

   Tell them what will happen: a code appears, they press Enter to open the browser, paste the code there, and approve. Then they tell you they're done.
3. Run `gh auth status` and confirm the username matches what they told you. If `check.sh` showed them already signed in, skip the sign-in and just confirm the username. If they're signed in to a different account (often a work one), don't sign it out: running the sign-in again adds the right account, and `gh auth switch --user <username>` makes it the active one. Tell them which account is active, and how to switch back.
4. Run `gh auth setup-git` so git uses that same sign-in when saving to GitHub.
5. Set their name and email for git. For the email, suggest GitHub's private address, which keeps their real one off every public change:

   ```
   gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"'
   ```

   Then `git config --global user.name "<name>"` and `git config --global user.email "<that address>"`. Only change these if they're unset, or if the person says to; someone else's existing setup is theirs.
6. Set `git config --global init.defaultBranch main` if it's unset.

Checkpoint: `gh auth status` shows them signed in, and `git config --global user.email` is set.

## 4. Connect to Vercel

Vercel's official MCP server, at `https://mcp.vercel.com`, lets you read their projects, deployments and build logs, and deploy, using a browser sign-in. Vercel's setup guide for each tool is at vercel.com/docs/agent-resources/vercel-mcp.

1. Explain MCP in a sentence: it's how you get permission to use another service on their behalf, and they can remove it any time.
2. Add the server using your tool's way (step 0), for all their projects rather than just this folder.
3. Have them sign in in the browser that opens. If they have no Vercel account, the sign-in page offers to create one: choose **Continue with GitHub**.
4. Confirm it works by listing their Vercel projects or teams with the Vercel tools. An empty list is fine for a new account.

If the Vercel tools are already connected, confirm they show the account and team the person expects, and skip the rest of this step.

Checkpoint: the Vercel tools answer.

## 5. GitHub through MCP (optional)

The GitHub CLI already covers everything a website needs. GitHub's MCP server, at `https://api.githubcopilot.com/mcp/`, adds tools for issues, reviews and searching code. Offer it once, in one sentence; skip it if they don't want it.

1. Add it with a browser sign-in first, using your tool's way (step 0).
2. If the browser sign-in fails, the fallback is a token. Walk them through it without ever seeing it:
   - On GitHub: Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate. Limit it to the repositories they'll use, give it only the permissions they need (Contents, Pull requests and Issues: read and write; Metadata: read), and set an expiry.
   - Remove the server you added.
   - In their own terminal window (the Terminal app on a Mac, PowerShell on Windows; not inside the agent), they add the server with the header `Authorization: Bearer <token>`, pasting the token there. Give them the exact command for your tool. Tell them the token is then stored in the tool's settings on their computer, and that it stops working when it expires or they revoke it on GitHub.
3. Restart if your tool needs it, and confirm the GitHub tools answer.

## 6. Finish

Run `scripts/check.sh` once more and give a short summary in plain words:

- What's set up, and the GitHub username and Vercel account it's tied to
- What was skipped, and why
- How to undo each part: `gh auth logout`; removing the Vercel (and GitHub) MCP server in your tool (step 0 says how); revoking access from GitHub (Settings → Applications) and Vercel (Account Settings → Authentication)

Then go back to whatever they were doing before, or, if they came here to start a site, offer the `start` skill.

## Don't

- Create repositories, commit, push or deploy here. This skill only gets accounts ready.
- Change global settings the person already has (git identity, credential helpers, shell profiles) without asking.
- Store anything in the project folder. Nothing this skill sets up belongs in a repository.
