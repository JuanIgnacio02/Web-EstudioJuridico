/* =============================================
   ESTUDIO JURÍDICO GIMENA PÉREZ — main.js
   ============================================= */
'use strict';

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 36);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- MOBILE DRAWER (GSAP) ---- */
const burger     = document.getElementById('burger');
const navLinks   = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (burger && navLinks) {
  let isOpen = false;

  /* Timeline paused — GSAP controla open/close */
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

  tl
    /* backdrop */
    .fromTo(navOverlay,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.35, ease: 'power2.out' },
      0
    )
    /* drawer desliza desde la derecha */
    .fromTo(navLinks,
      { x: '100%', autoAlpha: 0 },
      { x: '0%',   autoAlpha: 1, duration: 0.48 },
      0
    )
    /* links entran en cascada */
    .fromTo(navLinks.querySelectorAll('a'),
      { x: 28, autoAlpha: 0 },
      { x: 0,  autoAlpha: 1, stagger: 0.07, duration: 0.38 },
      0.18
    );

  const openDrawer = () => {
    isOpen = true;
    if (navOverlay) navOverlay.style.pointerEvents = 'auto';
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    tl.play();
  };

  const closeDrawer = () => {
    isOpen = false;
    if (navOverlay) navOverlay.style.pointerEvents = 'none';
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    tl.reverse();
  };

  burger.addEventListener('click', () => isOpen ? closeDrawer() : openDrawer());
  navOverlay?.addEventListener('click', closeDrawer);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeDrawer(); });
}

/* ---- SMOOTH SCROLL (index links only) ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - (navbar?.offsetHeight ?? 72) - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- ACTIVE NAV LINK (scroll-based, index only) ---- */
const sections = document.querySelectorAll('section[id]');
if (sections.length && navLinks) {
  const activeObs = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      navLinks.querySelectorAll('a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`)
      );
    }),
    { threshold: 0.35 }
  );
  sections.forEach(s => activeObs.observe(s));
}

/* ---- SERVICE ROW HOVER (desktop) ---- */
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.service-row').forEach(row => {
    row.addEventListener('mouseenter', () => row.style.willChange = 'padding, background');
    row.addEventListener('mouseleave', () => row.style.willChange = '');
  });
}

/* ---- SUB-CARD SUBTLE LIFT ---- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.sub-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - 0.5) * 4;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 4;
      card.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}
