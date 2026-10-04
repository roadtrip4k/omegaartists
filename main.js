/* Omega Artists: motion. Everything here is an enhancement; the pages read fully without it. */
(function () {
  var d = document.documentElement;
  var reduced = d.classList.contains('reduced');

  /* Header hides on the way down, returns on the way up. Manifesto reading line. */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress span');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    if (y > lastY + 2 && y > 220) header.classList.add('hidden');
    else if (y < lastY - 2 || y < 220) header.classList.remove('hidden');
    lastY = y;
    if (bar) {
      var max = d.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  header.addEventListener('focusin', function () { header.classList.remove('hidden'); });
  onScroll();

  /* The opening: any touch, key, click or wheel skips straight to the end. */
  if (d.classList.contains('intro')) {
    var evs = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    var off = function () { evs.forEach(function (e) { window.removeEventListener(e, skip); }); };
    var skip = function () { d.classList.add('skipped'); off(); };
    evs.forEach(function (e) { window.addEventListener(e, skip, { passive: true }); });
    setTimeout(function () { off(); d.classList.remove('intro', 'skipped'); }, 3400);
  }

  /* Ambient loop: only with motion allowed, only while on screen. The poster is the still fallback. */
  var video = document.querySelector('.hero video');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (video && !reduced && !saveData && 'IntersectionObserver' in window) {
    video.preload = 'auto';
    new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { var p = video.play(); if (p && p.catch) p.catch(function () {}); }
      else video.pause();
    }).observe(video);
  }

  if (reduced || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Weighted scrolling */
  if (window.Lenis) {
    var lenis = new Lenis({ duration: 1.3, easing: function (t) { return 1 - Math.pow(1 - t, 3); } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        var target = id.length > 1 && document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -40, duration: 1.8 });
        history.replaceState(null, '', id);
      });
    });
  }

  /* Slow fades with a slight upward drift */
  gsap.utils.toArray('[data-reveal]').forEach(function (el) {
    gsap.from(el, { autoAlpha: 0, y: 28, duration: 1.7, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  /* One statement per screen: the line settles into its spacing as it arrives */
  gsap.utils.toArray('[data-statement]').forEach(function (el) {
    gsap.from(el, { autoAlpha: 0, y: 36, letterSpacing: '0.2em', duration: 2.4, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 78%', once: true } });
  });

  /* The seal presses into the leather as you arrive at it */
  document.querySelectorAll('[data-seal]').forEach(function (panel) {
    var q = function (s) { return panel.querySelector(s); };
    var tl = gsap.timeline({ scrollTrigger: { trigger: panel, start: 'top 85%', end: 'center 55%', scrub: 1.2 } });
    tl.fromTo(q('.stamp'), { scale: 1.07, svgOrigin: '422 340' }, { scale: 1, ease: 'none' }, 0)
      .fromTo(q('#deboss-off'), { attr: { dy: 0 } }, { attr: { dy: 7 }, ease: 'none' }, 0)
      .fromTo(q('#deboss-shadow'), { attr: { 'flood-opacity': 0 } }, { attr: { 'flood-opacity': 0.9 }, ease: 'none' }, 0)
      .fromTo(q('#deboss-lip'), { attr: { 'flood-opacity': 0 } }, { attr: { 'flood-opacity': 0.22 }, ease: 'none' }, 0)
      .fromTo(q('.stamp path'), { attr: { 'fill-opacity': 0 } }, { attr: { 'fill-opacity': 0.7 }, ease: 'none' }, 0);
  });
})();
