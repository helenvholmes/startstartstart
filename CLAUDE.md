# Notes for working in this repository

## The plugin and its versions

`skills/` is the *startstartstart!* Claude plugin, listed in Anthropic's plugin directory from `main`. The directory checks `main` for new commits about every six hours and scans each one.

Whenever a change touches anything in `skills/`, in the same change:

1. Raise `version` in `skills/.claude-plugin/plugin.json`. People who installed the plugin stay on their version until this number changes.
   - **Patch** (1.0.1 → 1.0.2): wording fixes, links, listing details.
   - **Minor** (1.0.x → 1.1.0): new or changed steps, a new skill, anything that changes what Claude does.
   - **Major** (1.x → 2.0.0): a change that breaks sites or sessions people already started.
2. Add an entry at the top of `skills/CHANGELOG.md` with the version, the date and what changed, in plain words.

Changes only to `showcase/` or the root `README.md` don't need a new version.

Keep `skills/` to Markdown, JSON, the licence and the PNG icon. The directory refuses scripts and programs from organisations it hasn't verified, so a check that needs a command goes into a skill as instructions instead. `claude plugin validate ./skills` runs the local checks.

## When the directory listing goes live

The README and the showcase's "Let's get you started" section each have a commented-out callout for installing from Claude's directory. Uncomment both and replace `DIRECTORY_LINK` with the listing's public link (**Copy public link** at claude.ai/directory/manage).
