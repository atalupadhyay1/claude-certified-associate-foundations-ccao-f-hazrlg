#!/usr/bin/env bash
# Serve the CCAO-F study pack on http://localhost:5173
# (Opening study-site/index.html straight from the file system also works — no build step, no dependencies.)
set -euo pipefail
cd "$(dirname "$0")"
PORT="${1:-5173}"
echo
echo "  CCAO-F Study Pack"
echo "  → http://localhost:${PORT}/"
echo "  Ctrl-C to stop"
echo
if command -v python3 >/dev/null 2>&1; then
  exec python3 -m http.server "${PORT}" --bind 0.0.0.0
elif command -v python >/dev/null 2>&1; then
  exec python -m http.server "${PORT}" --bind 0.0.0.0
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes serve -l "${PORT}" .
else
  echo "Need python3, python or npx to serve the folder." >&2
  exit 1
fi
