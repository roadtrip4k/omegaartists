# omegaartists.com

Static site, no build step: `index.html`, `manifesto.html`, `styles.css`, `main.js`, `assets/`.
Copy is drawn word for word from the Manifesto in `../omega-artists-founding-documents7.md`. The bylaws stay off the site.

Preview locally: the "omega-site" entry in `Downloads\.claude\launch.json` (http://localhost:8420).

## Colour note
The banner's leather measures about #020D1D, so that is the ground everywhere. #0B1D30 is visibly brighter and bluer than the banner; it appears only as a faint lamp-glow behind the seal.

## Motion (Part Five)
- Opening (home only, once per visit, under 3 s, skipped by any click, key, wheel or touch): black lifts to navy, a sheen crosses the foil monogram, the name letter-spaces in. Pure CSS, so it can never leave the page stuck.
- Lenis + GSAP ScrollTrigger (CDN, pinned versions) for weighted scrolling, slow reveals, the full-screen statements and the blind-stamp seal.
- Header hides on scroll down and returns on scroll up; the manifesto has a silver reading line.
- With "reduce motion" set, or if the scripts fail to load, nothing animates and every word is visible. The hero shows the still.

## Assets
- `mark.png`: the textured OA monogram cut out onto transparency (hero).
- `mark.svg`, `favicon.svg`: the flat vector monogram, traced from the logo in gilded silver. `mark-solid.png` is its raster twin, used as the sheen mask.
- `hero-loop.mp4` (2.8 MB, 24 s seamless loop) and `hero-still.jpg` (its first frame, the fallback): the banner's own leather with the band removed, under a slow drifting light. When work exists, swap the video source for it.
- `icon-32/180/512.png`: flat favicons.
- Generator scripts are in `../_work` (`plate.py`, `loop.py`, `vector.py`) if anything needs remaking.

## Hosting
Live (pre-launch, noindexed) on Cloudflare Pages: https://omegaartists.pages.dev
Cloudflare account: the shared omegaartists.hq@gmail.com account. Project "omegaartists", classic Pages (direct upload, not Git-connected).
Redeploy after any change: `bash deploy.sh` (needs a Wrangler login on this machine).
`_headers` keeps search engines out (X-Robots-Tag) and caches assets for a week.

## Before launch (held until there is first work to show)
1. Replace "The work is coming." in `#the-work` with the first work, once there is some.
2. Remove the `<meta name="robots" content="noindex, nofollow">` line from both pages, and the `X-Robots-Tag` lines from `_headers`.
3. DNS: move the Namecheap nameservers to Cloudflare, attach omegaartists.com to the Pages project, then turn on Email Routing for hello@omegaartists.com.
4. Uncomment the Facebook and Discord slots in both footers once they exist.
