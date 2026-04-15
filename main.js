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

/* ---- BURGER ---- */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---- SCROLL REVEAL ---- */
const revealObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -44px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

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
