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
Live at https://omegaartists.com (launched 4 October 2026). `www` redirects to it.
Cloudflare Pages project "omegaartists" (classic Pages, direct upload, not Git-connected) on the shared omegaartists.hq@gmail.com account; also at https://omegaartists.pages.dev.
Redeploy after any change: `bash deploy.sh` (needs a Wrangler login on this machine).
`_headers` caches assets for a week, so give a changed image or video a new filename. `deploy.sh` stamps the CSS and JS links with the commit ID, so those always refresh.

## Email
hello@omegaartists.com forwards to the shared Gmail via Cloudflare Email Routing.

## Still to come
1. Replace "The work is coming." in `#the-work` with the first work, once there is some.
2. Uncomment the Facebook and Discord slots in both footers once they exist.
