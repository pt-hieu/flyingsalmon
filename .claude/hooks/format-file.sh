#!/bin/bash
# Claude Code PostToolUse hook: format the file Claude just edited with oxfmt.
# Always exits 0 — a formatter failure must never block the edit.

file_path=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$file_path" ] && exit 0
[ -f "$file_path" ] || exit 0

case "$file_path" in
  */pnpm-lock.yaml) exit 0 ;;
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs | *.json | *.jsonc | *.css | *.scss | *.md | *.mdx | *.yaml | *.yml | *.html)
    cd "${CLAUDE_PROJECT_DIR:-.}" && pnpm exec oxfmt "$file_path" >/dev/null 2>&1
    ;;
esac
exit 0
