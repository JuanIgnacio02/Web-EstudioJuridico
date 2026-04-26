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

/* ---- OCULTAR NAV DESKTOP EN MOBILE (forzado via JS) ---- */
const navLinksDesktop = document.getElementById('navLinks');
function syncNavVisibility() {
  if (!navLinksDesktop) return;
  navLinksDesktop.style.display = window.innerWidth <= 768 ? 'none' : '';
}
syncNavVisibility();
window.addEventListener('resize', syncNavVisibility, { passive: true });

/* ---- MOBILE MENU (GSAP) ---- */
const burger      = document.getElementById('burger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

if (burger && mobileMenu) {
  let isOpen = false;

  const links = mobileMenu.querySelectorAll('.nav-menu-mobile__links a');
  const cta   = mobileMenu.querySelector('.nav-menu-mobile__cta');

  /* Establecer estado inicial oculto */
  gsap.set(mobileMenu, { autoAlpha: 0, pointerEvents: 'none' });
  gsap.set([links, cta], { y: 24, autoAlpha: 0 });

  /* Timeline de apertura */
  const tl = gsap.timeline({ paused: true });

  tl
    .to(mobileMenu, {
      autoAlpha: 1,
      pointerEvents: 'auto',
      duration: 0.3,
      ease: 'power2.out'
    })
    .to(links, {
      y: 0,
      autoAlpha: 1,
      stagger: 0.07,
      duration: 0.4,
      ease: 'power3.out'
    }, 0.1)
    .to(cta, {
      y: 0,
      autoAlpha: 1,
      duration: 0.35,
      ease: 'power3.out'
    }, 0.38);

  const openMenu = () => {
    isOpen = true;
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    tl.play();
  };

  const closeMenu = () => {
    isOpen = false;
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    tl.reverse();
  };

  burger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
  mobileClose?.addEventListener('click', closeMenu);
  links.forEach(a => a.addEventListener('click', closeMenu));
  cta?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) closeMenu(); });
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
