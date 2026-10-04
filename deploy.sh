#!/usr/bin/env bash
# Deploy the site to Cloudflare Pages (project "omegaartists").
# Copies only what the site needs into ../_work/dist, so README, .git and this script stay off the server.
set -e
cd "$(dirname "$0")"
out=../_work/dist
rm -rf "$out" && mkdir -p "$out"
cp index.html manifesto.html styles.css main.js _headers "$out"/
cp -r assets "$out"/
# Stamp CSS/JS links with the commit so browsers never pair new HTML with an old cached stylesheet
v=$(git rev-parse --short HEAD 2>/dev/null || date +%s)
git diff --quiet 2>/dev/null || v="$v-$(date +%s)"
sed -i "s|href=\"styles.css\"|href=\"styles.css?v=$v\"|; s|src=\"main.js\"|src=\"main.js?v=$v\"|" "$out"/index.html "$out"/manifesto.html
npx --yes wrangler@4 pages deploy "$out" --project-name omegaartists --branch main --commit-dirty=true
