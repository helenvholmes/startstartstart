# Plain-language glossary

One-sentence explanations for the first time each term comes up. Adjust to the person; skip what they clearly know.

| Term | Say |
|---|---|
| Terminal | A window where you type commands to your computer instead of clicking. Claude Code runs inside one. |
| CLI | A "command-line interface": a program you use by typing commands, like `git` or `gh`. |
| git | The tool that keeps a history of every saved version of your project, so nothing is ever lost and any change can be undone. |
| Repository (repo) | A project folder that git is keeping history for. On GitHub, it's the online copy of that folder. |
| GitHub | A website that stores your repositories online, like a shared drive for code, so they're backed up and other services can use them. |
| GitHub CLI (`gh`) | GitHub's own command-line tool. It's how Claude creates repos and opens pull requests for you. |
| Commit | A saved snapshot of your project with a short note about what changed. |
| Push | Sending your commits from your computer up to GitHub. |
| Pull | Bringing down changes from GitHub to your computer. |
| Branch | A separate line of work, so you can try changes without touching the live version. `main` is the live one. |
| Pull request (PR) | A request to merge a branch into `main`, with a page showing exactly what changed. Vercel gives each one its own preview link. |
| Merge | Combining a branch's changes into another branch, usually `main`. |
| Deploy | Publishing your site so it's on the internet. |
| Preview deployment | A private-link copy of your site for one branch or PR, so you can check it before it goes live. |
| Production | The real, public version of your site at your main address. |
| Vercel | A service that builds your site from GitHub and puts it on the internet, again each time you push. |
| Domain | Your site's address, like `yourname.com`. You rent it yearly from a registrar. |
| DNS | The internet's address book; connecting a domain means telling it where your site lives. |
| MCP | How Claude gets permission to use another service, like Vercel, on your behalf. You can remove it any time. |
| OAuth / browser sign-in | Signing in on the service's own website and approving access, so you never give Claude a password. |
| Token | A long password-like key for a program to use. Treat it like a password: never paste it into a chat. |
| `.env` file | A file for secrets your project needs. It must never be committed. |
| `.gitignore` | A list of files git should never save, like `.env` and `node_modules`. |
| Node.js / npm | Node runs JavaScript tools on your computer; npm installs the packages a project uses. |
