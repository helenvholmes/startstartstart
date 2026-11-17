# Running in Claude

The steps in `SKILL.md` that depend on the tool, for Claude Code in a terminal and in the Claude desktop app's Code tab.

## Which one you're in

`CLAUDE_CODE_ENTRYPOINT` in the environment usually says. If it's unset or unclear, ask the person in one line: "Are you in the Claude desktop app, or a terminal window?" Assume the desktop app for people new to this.

**Cloud sessions** (claude.ai/code, or **Cloud** chosen as the environment in the desktop app) run on a remote machine, on a fresh clone of a GitHub repository. Follow "In the cloud" in `SKILL.md`, with these specifics:

- The skills arrive because the person asked you to read them from github.com/helenvholmes/portfolio-starter. Clone it outside the project checkout, as `start` describes.
- GitHub access comes through the Claude GitHub App. If you can't push, they reconnect GitHub at claude.ai/code and give the app access to this repository. The session can't create new repositories, so the person makes it on github.com first.
- Connectors from their claude.ai account are passed in, already signed in; there's no `/mcp` step. If Vercel's tools are missing, they connect Vercel at claude.ai/customize/connectors (or add a custom connector with `https://mcp.vercel.com`), then start a new session on the same repository.
- To disconnect later: claude.ai/customize/connectors, and GitHub's Settings → Applications for the Claude GitHub App.

## The person runs a command themselves

- **Desktop app:** they open the built-in terminal by clicking **Terminal** in the session's title bar (or pressing Ctrl+\`), paste the command, and press Enter.
- **Terminal:** they type the command into Claude Code with `!` in front, for example `! gh auth login --web`.

Anything typed either way is visible in the session. For tokens, send them to a terminal window outside Claude instead (the Terminal app on a Mac, PowerShell on Windows).

## Add the Vercel MCP server

- **Desktop app:** they click **+** next to the prompt box → **Add connectors** (or **Connectors** → **Browse connectors**), search for **Vercel**, and connect it. If Vercel isn't in the directory, they add it as a custom connector in **Settings → Connectors** with the URL `https://mcp.vercel.com`. Either way, they sign in to Vercel in the browser that opens. If the new tools don't appear in this session, have them start a new session in the same folder and say "continue accounts setup".
- **Terminal:**

  ```
  claude mcp add --transport http vercel --scope user https://mcp.vercel.com
  ```

  Claude Code picks up new servers when it starts, so have them type `/exit`, then `claude --continue` to come back to this conversation. Then they type `/mcp`, choose **vercel**, and sign in in the browser.

## Add the GitHub MCP server

- **Desktop app:** **+** → **Add connectors** → **GitHub**, and approve in the browser.
- **Terminal:** `claude mcp add --transport http --scope user github https://api.githubcopilot.com/mcp/`, restart as above, then `/mcp` → **github** → sign in. Browser sign-in for this server has been unreliable in Claude Code; if it fails, use the token fallback.
- **Token fallback:** first `claude mcp remove github --scope user`. Then, in a terminal window outside Claude, they run:

  ```
  claude mcp add --transport http --scope user github https://api.githubcopilot.com/mcp/ --header "Authorization: Bearer PASTE_TOKEN_HERE"
  ```

  The token is stored in Claude Code's settings on their computer.

## Remove them

- **Desktop app:** **Settings → Connectors**, then disconnect Vercel or GitHub.
- **Terminal:** `claude mcp remove vercel --scope user` (and `github`).

## Showing the site while you build

- **Desktop app:** start the dev server in the background, then open its address (for example `http://localhost:4321`) in the app's built-in browser or preview pane, using your preview or browser tool if you have one, so the site appears beside the chat. If you have no such tool, tell them to click the address.
- **Terminal:** start the dev server in the background and open the address in their default browser: `open <address>` on macOS, `xdg-open <address>` on Linux, `start <address>` on Windows.

## Asking questions

Use the AskUserQuestion tool for the skills' interview and setup questions: one question per call, with the choices the skill lists as options (two to four; the person can always type their own answer, so don't add an "Other" choice). Use a short header, like "Site goal" or "Domain". Put the recommended choice first where there is one. When the tool isn't available, ask the same question in one line of plain text and list the choices.

## Don't suggest `/plugin`

People start this by pasting a message, not by installing a plugin, and `/plugin` commands don't work in the desktop app anyway. Don't send them to install anything from Claude's plugin menus.
