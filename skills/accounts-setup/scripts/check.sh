#!/usr/bin/env bash
# Report what's installed and signed in for building and shipping a site.
# Changes nothing. Usage: bash check.sh
# Exit code is 0 when everything required is ready, 1 otherwise.

missing=0

row() { printf '%-22s %-8s %s\n' "$1" "$2" "$3"; }

row "CHECK" "STATUS" "DETAIL"

# Operating system
os="$(uname -s 2>/dev/null || echo unknown)"
case "$os" in
  Darwin) os_name="macOS $(sw_vers -productVersion 2>/dev/null)";;
  Linux) os_name="Linux $( (. /etc/os-release 2>/dev/null && echo "$PRETTY_NAME") )";;
  MINGW*|MSYS*|CYGWIN*) os_name="Windows ($os)";;
  *) os_name="$os";;
esac
row "system" "info" "$os_name"

for pm in brew winget apt dnf pacman; do
  command -v "$pm" >/dev/null 2>&1 && pms="${pms:+$pms, }$pm"
done
row "package managers" "info" "${pms:-none found}"

# Required tools
if command -v git >/dev/null 2>&1; then
  row "git" "ok" "$(git --version | sed 's/git version //')"
else
  row "git" "missing" "required"; missing=1
fi

if command -v gh >/dev/null 2>&1; then
  row "GitHub CLI (gh)" "ok" "$(gh --version | head -1 | awk '{print $3}')"
else
  row "GitHub CLI (gh)" "missing" "required"; missing=1
fi

if command -v node >/dev/null 2>&1; then
  v="$(node --version)"
  major="${v#v}"; major="${major%%.*}"
  if [ "$major" -ge 20 ] 2>/dev/null; then
    row "Node.js" "ok" "$v"
  else
    row "Node.js" "old" "$v (use the current LTS)"; missing=1
  fi
else
  row "Node.js" "missing" "required"; missing=1
fi

# GitHub sign-in
if command -v gh >/dev/null 2>&1; then
  if gh auth status --hostname github.com >/dev/null 2>&1; then
    user="$(gh api user --jq .login 2>/dev/null)"
    row "GitHub sign-in" "ok" "${user:-signed in}"
  else
    row "GitHub sign-in" "no" "run: gh auth login --web"; missing=1
  fi
fi

# git identity
if command -v git >/dev/null 2>&1; then
  name="$(git config --global user.name 2>/dev/null)"
  email="$(git config --global user.email 2>/dev/null)"
  if [ -n "$name" ] && [ -n "$email" ]; then
    row "git name and email" "ok" "$name <$email>"
  else
    row "git name and email" "no" "not set"; missing=1
  fi
  branch="$(git config --global init.defaultBranch 2>/dev/null)"
  row "default branch" "info" "${branch:-not set (git will use master)}"
  helper="$(git config --global credential.https://github.com.helper 2>/dev/null)"
  case "$helper" in
    *gh*) row "git uses gh sign-in" "ok" "yes";;
    *) row "git uses gh sign-in" "no" "run: gh auth setup-git";;
  esac
fi

# MCP servers: only Claude Code's can be listed from here; other agents are checked in their own settings
if command -v claude >/dev/null 2>&1; then
  list="$(claude mcp list 2>/dev/null)"
  for s in vercel github; do
    line="$(printf '%s\n' "$list" | grep -i "^$s:" | head -1)"
    if [ -n "$line" ]; then
      case "$line" in
        *Connected*) row "MCP: $s" "ok" "connected";;
        *) row "MCP: $s" "added" "added; sign in may be needed (/mcp in Claude Code)";;
      esac
    else
      if [ "$s" = vercel ]; then row "MCP: $s" "no" "not added"; else row "MCP: $s" "no" "optional"; fi
    fi
  done
else
  row "MCP servers" "info" "can't list from here; check your agent's MCP or connector settings"
fi

# Vercel CLI is optional
if command -v vercel >/dev/null 2>&1; then
  row "Vercel CLI" "info" "$(vercel --version 2>/dev/null | tail -1) (optional)"
else
  row "Vercel CLI" "info" "not installed (optional)"
fi

exit "$missing"
