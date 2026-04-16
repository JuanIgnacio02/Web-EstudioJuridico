/* ============================================================
   ESTUDIO JURÍDICO PÉREZ — GSAP Animations
   Skills: gsap-core · gsap-timeline · gsap-scrolltrigger
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---- Global defaults ---- */
gsap.defaults({ ease: "power3.out", duration: 0.8 });

/* ---- Prevent flash: set all .reveal elements invisible immediately ---- */
gsap.set(".reveal", { autoAlpha: 0, y: 24 });
gsap.set(".reveal--left", { autoAlpha: 0, x: -20, y: 0 });

/* ============================================================
   gsap.matchMedia — respeta prefers-reduced-motion
   ============================================================ */
const mm = gsap.matchMedia();

mm.add(
  {
    hasMotion: "(prefers-reduced-motion: no-preference)",
    noMotion:  "(prefers-reduced-motion: reduce)"
  },
  (ctx) => {
    const { noMotion } = ctx.conditions;

    /* ---- Si el usuario prefiere sin movimiento, mostrar todo al instante ---- */
    if (noMotion) {
      gsap.set(".reveal, .reveal--left", { autoAlpha: 1, y: 0, x: 0, clearProps: "all" });
      return;
    }

    /* ==========================================================
       1. HERO INDEX — timeline de entrada
       ========================================================== */
    const isIndex = document.querySelector(".hero__logo") && document.querySelector(".hero__title");
    if (isIndex) {

      /* -- Entrada secuenciada -- */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(".hero__logo",
          { autoAlpha: 0, scale: 0.82, y: -10 },
          { autoAlpha: 1, scale: 1,    y: 0, duration: 1 })
        .fromTo(".hero__eyebrow",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0,  duration: 0.55 }, "-=0.45")
        .fromTo(".hero__title",
          { autoAlpha: 0, y: 52 },
          { autoAlpha: 1, y: 0,  duration: 1, ease: "power4.out" }, "-=0.35")
        .fromTo(".hero__tagline",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0,  duration: 0.6 }, "-=0.55")
        .fromTo(".hero__areas",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0,  duration: 0.5 }, "-=0.45")
        .fromTo(".hero__btn",
          { autoAlpha: 0, y: 16, scale: 0.93 },
          { autoAlpha: 1, y: 0,  scale: 1, duration: 0.55 }, "-=0.35")
        .fromTo(".hero__scroll-hint",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 }, "-=0.1");

      /* -- Navbar entrada -- */
      gsap.fromTo(".navbar__logo",
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.55, delay: 0.15, ease: "power2.out" });
      gsap.fromTo(".navbar__links > *",
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.3, ease: "power2.out" });

      /* ----------------------------------------------------------
         HERO SCROLL — Salida parallax (reacciona en ambas direcciones)
         Todos usan scrub para que sea reversible al volver a subir.
         ---------------------------------------------------------- */
      const heroEl   = document.querySelector(".hero");
      const heroST   = { trigger: heroEl, start: "top top", end: "bottom top" };

      /* Fondo: sube más despacio que el contenido → efecto de profundidad */
      gsap.to(".hero__bg", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: { ...heroST, scrub: 2 }
      });

      /* Logo: deriva hacia arriba y se desvanece suavemente */
      gsap.to(".hero__logo", {
        y: -50,
        autoAlpha: 0.2,
        ease: "none",
        scrollTrigger: { ...heroST, scrub: 1 }
      });

      /* Eyebrow y áreas: velocidad media */
      gsap.to(".hero__eyebrow, .hero__areas", {
        y: -60,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { ...heroST, scrub: 0.9 }
      });

      /* Título: deriva más rápido (más "pesado" visualmente) */
      gsap.to(".hero__title", {
        y: -80,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { ...heroST, scrub: 0.8 }
      });

      /* Tagline y botón: salen últimos */
      gsap.to(".hero__tagline, .hero__btn", {
        y: -70,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { ...heroST, scrub: 0.85 }
      });

      /* Scroll-hint: desaparece en cuanto se empieza a scrollear */
      gsap.to(".hero__scroll-hint", {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroEl,
          start: "top top",
          end: "18% top",
          scrub: true
        }
      });
    }

    /* ==========================================================
       2. HERO PÁGINAS DE SERVICIO — timeline de entrada + scroll
       ========================================================== */
    const isServicePage = document.querySelector(".page-hero__title");
    if (isServicePage) {

      /* -- Entrada secuenciada -- */
      const pageTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      pageTl
        .fromTo(".back-link",
          { autoAlpha: 0, x: -14 },
          { autoAlpha: 1, x: 0, duration: 0.5 })
        .fromTo(".page-num",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35 }, "-=0.2")
        .fromTo(".page-hero__title",
          { autoAlpha: 0, y: 56 },
          { autoAlpha: 1, y: 0, duration: 1.1, ease: "power4.out" }, "-=0.25")
        .fromTo(".page-hero__lead",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.65")
        .fromTo(".page-hero__pills",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.45")
        .fromTo(".page-hero__content > .btn",
          { autoAlpha: 0, y: 14, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, "-=0.35");

      /* -- Navbar entrada -- */
      gsap.fromTo(".navbar__logo",
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.5, delay: 0.1 });
      gsap.fromTo(".navbar__links > *",
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.065, delay: 0.25 });

      /* ----------------------------------------------------------
         HERO SCROLL — Salida parallax (reacciona en ambas direcciones)
         ---------------------------------------------------------- */
      const pageHeroEl = document.querySelector(".page-hero");
      if (pageHeroEl) {
        const phST = { trigger: pageHeroEl, start: "top top", end: "bottom top" };

        /* Fondo del hero: parallax lento → sensación de profundidad */
        gsap.to(".page-hero", {
          backgroundPositionY: "40%",
          ease: "none",
          scrollTrigger: { ...phST, scrub: 2 }
        });

        /* Badge de número y back-link */
        gsap.to(".back-link, .page-num", {
          y: -40,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { ...phST, scrub: 1 }
        });

        /* Título: mayor desplazamiento */
        gsap.to(".page-hero__title", {
          y: -70,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { ...phST, scrub: 0.85 }
        });

        /* Lead y pills */
        gsap.to(".page-hero__lead, .page-hero__pills", {
          y: -55,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { ...phST, scrub: 0.9 }
        });

        /* Botón CTA del hero */
        gsap.to(".page-hero__content > .btn", {
          y: -45,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: { ...phST, scrub: 1 }
        });
      }
    }

    /* ==========================================================
       3. LP SECTIONS — secciones del index
       ========================================================== */

    /* Número de sección */
    ScrollTrigger.batch(".lp-num", {
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05 }),
      start: "top 90%", once: true
    });

    /* Títulos grandes — toggleActions para que reviertan al subir */
    gsap.utils.toArray(".lp-title").forEach(title => {
      gsap.fromTo(title,
        { autoAlpha: 0, y: 44 },
        {
          autoAlpha: 1, y: 0, duration: 1, ease: "power4.out",
          scrollTrigger: {
            trigger: title, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* Lead text — revierte al subir */
    gsap.utils.toArray(".lp-lead").forEach(lead => {
      gsap.fromTo(lead,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1, y: 0, duration: 0.65,
          scrollTrigger: {
            trigger: lead, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* Items de la lista — stagger elegante, revierte al subir */
    gsap.utils.toArray(".lp-list").forEach(list => {
      const items = list.querySelectorAll("li");
      gsap.fromTo(items,
        { autoAlpha: 0, x: -14 },
        {
          autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.07, ease: "power2.out",
          scrollTrigger: {
            trigger: list, start: "top 86%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* Botones de sección */
    gsap.utils.toArray(".lp-actions").forEach(actions => {
      gsap.fromTo(actions.children,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1,
          scrollTrigger: {
            trigger: actions, start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* Visual cards — float up con ligero delay */
    gsap.utils.toArray(".lp-card").forEach(card => {
      gsap.fromTo(card,
        { autoAlpha: 0, y: 36 },
        {
          autoAlpha: 1, y: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: {
            trigger: card, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* Parallax sutil en las cards al hacer scroll */
    gsap.utils.toArray(".lp-card").forEach(card => {
      gsap.to(card, {
        y: -18, ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      });
    });

    /* ==========================================================
       4. TRUST BAR
       ========================================================== */
    gsap.utils.toArray(".tstat").forEach((stat, i) => {
      gsap.fromTo(stat,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1, y: 0, duration: 0.5, delay: i * 0.08,
          scrollTrigger: {
            trigger: ".trust-bar", start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    /* ==========================================================
       5. SECCIÓN DIFERENCIAL
       ========================================================== */
    const difSection = document.querySelector(".lp-diferencial");
    if (difSection) {
      const difTl = gsap.timeline({
        scrollTrigger: {
          trigger: difSection, start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });
      difTl
        .fromTo(".dif-logo",
          { autoAlpha: 0, scale: 0.88 },
          { autoAlpha: 1, scale: 1, duration: 0.7 })
        .fromTo(".dif-title",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.4")
        .fromTo(".dif-sub",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(".dif-btn",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, "-=0.4");
    }

    /* ==========================================================
       6. SUB-CARDS (páginas de servicio)
       ========================================================== */
    ScrollTrigger.batch(".sub-card", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, y: 36 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.1 }
      ),
      start: "top 88%",
      once: true
    });

    /* Parallax sutil en sub-cards */
    gsap.utils.toArray(".sub-card").forEach(card => {
      gsap.to(card, {
        y: -10, ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    /* ==========================================================
       7. PROCESO — pasos con stagger
       ========================================================== */
    const processSection = document.querySelector(".process-steps");
    if (processSection) {
      const steps  = processSection.querySelectorAll(".step");
      const arrows = processSection.querySelectorAll(".step__arrow");

      const stepsTl = gsap.timeline({
        scrollTrigger: {
          trigger: processSection, start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });
      stepsTl
        .fromTo(".process-title",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.75, ease: "power3.out" })
        .fromTo(steps,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15 }, "-=0.3")
        .fromTo(arrows,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, stagger: 0.15 }, "-=0.7");
    }

    /* ==========================================================
       8. CTA FINAL
       ========================================================== */
    const ctaSection = document.querySelector(".cta-inner");
    if (ctaSection) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaSection, start: "top 82%",
          toggleActions: "play none none reverse"
        }
      });
      ctaTl
        .fromTo(".cta-title",
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.75 })
        .fromTo(".cta-sub",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.5")
        .fromTo(".cta-inner > .btn",
          { autoAlpha: 0, y: 14, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 }, "-=0.4");
    }

    /* ==========================================================
       9. OTRAS ÁREAS
       ========================================================== */
    ScrollTrigger.batch(".other-card", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }
      ),
      start: "top 90%",
      once: true
    });

    /* ==========================================================
       10. SECTION LABELS
       ========================================================== */
    ScrollTrigger.batch(".section__label", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, x: -12 },
        { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.06 }
      ),
      start: "top 90%",
      once: true
    });

    /* ==========================================================
       11. FOOTER
       ========================================================== */
    gsap.fromTo(".footer__brand",
      { autoAlpha: 0, y: 16 },
      {
        autoAlpha: 1, y: 0, duration: 0.55,
        scrollTrigger: { trigger: ".footer", start: "top 92%", once: true }
      }
    );
    gsap.fromTo(".footer__links > *",
      { autoAlpha: 0, y: 10 },
      {
        autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07,
        scrollTrigger: { trigger: ".footer", start: "top 92%", once: true }
      }
    );

    /* ==========================================================
       12. REMAINING .reveal — batch para todo lo que quede
       ========================================================== */
    ScrollTrigger.batch(".reveal:not(.lp-title):not(.lp-num)", {
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0, x: 0,
        duration: 0.65, ease: "power2.out",
        stagger: { each: 0.08 }
      }),
      start: "top 88%",
      once: true
    });

    /* ==========================================================
       13. PRIORITY BADGE — slide down al cargar
       ========================================================== */
    const priorityBadge = document.querySelector(".lp-priority-tag");
    if (priorityBadge) {
      gsap.fromTo(priorityBadge,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1, y: 0, duration: 0.5,
          scrollTrigger: {
            trigger: ".lp-section--accidentes", start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    /* ==========================================================
       14. HOVER micro-interactions — WA Float pulse
       ========================================================== */
    const waFloat = document.querySelector(".wa-float");
    if (waFloat) {
      const waPulse = gsap.timeline({ repeat: -1, repeatDelay: 5.5 });
      waPulse
        .to(waFloat, { scale: 1.12, duration: 0.22, ease: "power2.out" })
        .to(waFloat, { scale: 1,    duration: 0.28, ease: "back.out(2)" });
    }

    /* ==========================================================
       15. LP-SECTION — línea separadora animated on scroll
       ========================================================== */
    gsap.utils.toArray(".lp-section").forEach(section => {
      gsap.fromTo(section,
        { "--line-scale": 0 },
        {
          "--line-scale": 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top top",
            scrub: 0.5
          }
        }
      );
    });

  } // end hasMotion
); // end mm.add
