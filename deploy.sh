#!/usr/bin/env bash
# Deploy the site to Cloudflare Pages (project "omegaartists").
# Copies only what the site needs into ../_work/dist, so README, .git and this script stay off the server.
set -e
cd "$(dirname "$0")"
out=../_work/dist
rm -rf "$out" && mkdir -p "$out"
cp index.html manifesto.html styles.css main.js _headers "$out"/
cp -r assets "$out"/
npx --yes wrangler@4 pages deploy "$out" --project-name omegaartists --branch main --commit-dirty=true
