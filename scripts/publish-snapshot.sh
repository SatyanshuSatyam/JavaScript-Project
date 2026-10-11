#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: bash scripts/publish-snapshot.sh <github-remote-url> [branch]" >&2
  exit 2
fi

REMOTE_URL=$1
BRANCH=${2:-main}
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
ROOT=$(cd -- "$SCRIPT_DIR/.." && pwd)
ROOT_GIT="$ROOT/.git"

if ! command -v git >/dev/null 2>&1; then
  echo "Git is required but was not found in PATH." >&2
  exit 1
fi

if [[ -e "$ROOT_GIT" ]]; then
  echo "A repository already exists at '$ROOT'. This script will not alter or overwrite it." >&2
  exit 1
fi

if [[ ! "$REMOTE_URL" =~ ^(https://|ssh://|git@) ]]; then
  echo "Remote URL must be an HTTPS, SSH, or git@ GitHub remote URL." >&2
  exit 1
fi

mapfile -d '' NESTED_GIT_DIRS < <(
  find "$ROOT" -mindepth 2 -type d -name .git -prune -print0
)

BACKUP_ROOT=""
MOVED_GIT_DIRS=()
if ((${#NESTED_GIT_DIRS[@]} > 0)); then
  ROOT_NAME=$(basename "$ROOT")
  STAMP=$(date '+%Y%m%d-%H%M%S')
  BACKUP_ROOT="$(dirname "$ROOT")/${ROOT_NAME}-nested-git-backup-${STAMP}"
  if [[ -e "$BACKUP_ROOT" ]]; then
    echo "Backup destination already exists: '$BACKUP_ROOT'." >&2
    exit 1
  fi
  mkdir -p "$BACKUP_ROOT"

  for GIT_DIR in "${NESTED_GIT_DIRS[@]}"; do
    RELATIVE_PATH=${GIT_DIR#"$ROOT"/}
    BACKUP_PATH="$BACKUP_ROOT/$RELATIVE_PATH"
    mkdir -p "$(dirname "$BACKUP_PATH")"
    mv -- "$GIT_DIR" "$BACKUP_PATH"
    MOVED_GIT_DIRS+=("$RELATIVE_PATH")
  done

  if ! git -C "$ROOT" init -b "$BRANCH"; then
    for ((i=${#MOVED_GIT_DIRS[@]}-1; i>=0; i--)); do
      RELATIVE_PATH=${MOVED_GIT_DIRS[$i]}
      ORIGINAL_PATH="$ROOT/$RELATIVE_PATH"
      BACKUP_PATH="$BACKUP_ROOT/$RELATIVE_PATH"
      mkdir -p "$(dirname "$ORIGINAL_PATH")"
      if [[ -e "$BACKUP_PATH" ]]; then
        mv -- "$BACKUP_PATH" "$ORIGINAL_PATH"
      fi
    done
    echo "git init failed; nested Git directories were restored." >&2
    exit 1
  fi
else
  git -C "$ROOT" init -b "$BRANCH"
fi

git -C "$ROOT" add --all
git -C "$ROOT" diff --cached --check

HTML_COUNT=$(git -C "$ROOT" ls-files -- '*.html' | wc -l)
JS_COUNT=$(git -C "$ROOT" ls-files -- '*.js' | wc -l)
if ((HTML_COUNT < 14 || JS_COUNT < 12)); then
  echo "Expected at least 14 HTML files and 12 JavaScript files; staged $HTML_COUNT HTML and $JS_COUNT JavaScript files." >&2
  echo "Review nested repository handling and ignored files. Nested Git backups: $BACKUP_ROOT" >&2
  exit 1
fi

if ! git -C "$ROOT" var GIT_AUTHOR_IDENT >/dev/null; then
  echo "Configure git user.name and user.email before running this script." >&2
  exit 1
fi

git -C "$ROOT" remote add origin "$REMOTE_URL"
COMMIT_DATE=$(date '+%Y-%m-%dT%H:%M:%S%z')
GIT_AUTHOR_DATE="$COMMIT_DATE" \
GIT_COMMITTER_DATE="$COMMIT_DATE" \
  git -C "$ROOT" commit -m "Prepare JavaScript project collection for GitHub"

if ! git -C "$ROOT" push --set-upstream origin "$BRANCH"; then
  echo "Push failed. The local snapshot commit remains at '$ROOT'; inspect the remote and retry." >&2
  exit 1
fi

echo "Published the current-dated snapshot to $REMOTE_URL on branch '$BRANCH'."
if [[ -n "$BACKUP_ROOT" ]]; then
  echo "Nested Git history backups are preserved at: $BACKUP_ROOT"
  echo "Keep the backup until a fresh clone of the GitHub repository has been verified."
fi
