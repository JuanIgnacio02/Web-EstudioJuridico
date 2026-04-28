/* ============================================================
   ESTUDIO JURÍDICO PÉREZ — GSAP Animations
   Skills: gsap-core · gsap-timeline · gsap-scrolltrigger
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---- Defaults globales ---- */
gsap.defaults({ ease: "power3.out", duration: 0.8 });

/* ---- Estado invisible inicial para todos los .reveal ---- */
gsap.set(".reveal",      { autoAlpha: 0, y: 24 });
gsap.set(".reveal--left",{ autoAlpha: 0, x: -20, y: 0 });

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

    /* ---- Sin movimiento: mostrar todo al instante y salir ---- */
    if (noMotion) {
      gsap.set(".reveal, .reveal--left", { autoAlpha: 1, y: 0, x: 0, clearProps: "all" });
      return;
    }

    /* ----------------------------------------------------------
       PRE-SET: los títulos con clipPath no usan autoAlpha/y
       sino un clip que los oculta visualmente — override aquí.
       ---------------------------------------------------------- */
    gsap.set(
      ".hero__title, .lp-title, .page-hero__title, .dif-title, .cta-title, .process-title",
      { autoAlpha: 1, y: 0, clipPath: "inset(100% 0 0 0)" }
    );

    /* ==========================================================
       1. HERO INDEX — timeline de entrada
       ========================================================== */
    const onIndex = !!document.querySelector(".hero__logo");

    if (onIndex) {

      /* Navbar */
      gsap.fromTo(".navbar__logo",
        { autoAlpha: 0, x: -14 },
        { autoAlpha: 1, x: 0, duration: 0.55, delay: 0.1, ease: "power2.out" });
      gsap.fromTo(".navbar__links > *",
        { autoAlpha: 0, y: -10 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.28, ease: "power2.out" });

      /* Hero timeline secuenciada */
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.05 });
      heroTl
        /* Logo: escala + fade */
        .fromTo(".hero__logo",
          { autoAlpha: 0, scale: 0.78, y: -8 },
          { autoAlpha: 1, scale: 1,    y: 0, duration: 1.1, ease: "back.out(1.4)" })

        /* Eyebrow: letter-spacing comprimiéndose — efecto premium */
        .fromTo(".hero__eyebrow",
          { autoAlpha: 0, letterSpacing: "0.38em", y: 10 },
          { autoAlpha: 1, letterSpacing: "0.08em", y: 0, duration: 0.85, ease: "power2.out" },
          "-=0.55")

        /* Título: clipPath wipe de abajo hacia arriba */
        .fromTo(".hero__title",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.15, ease: "power4.out" },
          "-=0.45")

        /* Tagline: fade + y */
        .fromTo(".hero__tagline",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.65")

        /* Áreas */
        .fromTo(".hero__areas",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.5")

        /* Botón CTA */
        .fromTo(".hero__btn",
          { autoAlpha: 0, y: 16, scale: 0.91 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
          "-=0.4")

        /* Línea de scroll-hint */
        .fromTo(".hero__scroll-hint",
          { autoAlpha: 0, scaleY: 0, transformOrigin: "top center" },
          { autoAlpha: 1, scaleY: 1, duration: 0.55 },
          "-=0.15");

      /* ----------------------------------------------------------
         HERO SCROLL — salida cinematográfica (scrub, bidireccional)
         ---------------------------------------------------------- */

      /* Fondo: zoom lento hacia adentro + sube más lento que el contenido
         → sensación de profundidad real                               */
      gsap.fromTo(".hero__bg",
        { scale: 1,   yPercent: 0 },
        { scale: 1.1, yPercent: 18, ease: "none",
          scrollTrigger: {
            trigger: ".hero", start: "top top", end: "bottom top", scrub: 2
          }
        });

      /* Contenido completo: blur + scale + fade — un solo tween limpio */
      gsap.fromTo(".hero__center",
        { filter: "blur(0px)", scale: 1,    y: 0,   autoAlpha: 1 },
        { filter: "blur(10px)", scale: 0.93, y: -72, autoAlpha: 0, ease: "none",
          scrollTrigger: {
            trigger: ".hero", start: "top top", end: "75% top", scrub: 1
          }
        });

      /* Scroll-hint: desaparece en los primeros metros de scroll */
      gsap.to(".hero__scroll-hint", {
        autoAlpha: 0, ease: "none",
        scrollTrigger: {
          trigger: ".hero", start: "top top", end: "12% top", scrub: true
        }
      });
    }

    /* ==========================================================
       2. HERO PÁGINAS DE SERVICIO — entrada + scroll bidireccional
       ========================================================== */
    const onServicePage = !!document.querySelector(".page-hero__title");

    if (onServicePage) {

      /* Navbar */
      gsap.fromTo(".navbar__logo",
        { autoAlpha: 0, x: -14 },
        { autoAlpha: 1, x: 0, duration: 0.5, delay: 0.1 });
      gsap.fromTo(".navbar__links > *",
        { autoAlpha: 0, y: -8 },
        { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.065, delay: 0.25 });

      /* Timeline de entrada */
      const pageTl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.05 });
      pageTl
        .fromTo(".back-link",
          { autoAlpha: 0, x: -16 },
          { autoAlpha: 1, x: 0, duration: 0.5 })
        .fromTo(".page-num",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35 },
          "-=0.2")
        .fromTo(".page-hero__title",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.out" },
          "-=0.2")
        .fromTo(".page-hero__lead",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.65 },
          "-=0.65")
        .fromTo(".page-hero__pills span",
          { autoAlpha: 0, y: 10, scale: 0.9 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.06, ease: "back.out(1.5)" },
          "-=0.45")
        .fromTo(".page-hero__content > .btn",
          { autoAlpha: 0, y: 14, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" },
          "-=0.35");

      /* Scroll exit: blur + scale + fade del contenido */
      const pageHero = document.querySelector(".page-hero");
      if (pageHero) {
        gsap.fromTo(".page-hero__content",
          { filter: "blur(0px)", scale: 1,    y: 0,   autoAlpha: 1 },
          { filter: "blur(8px)",  scale: 0.94, y: -60, autoAlpha: 0, ease: "none",
            scrollTrigger: {
              trigger: pageHero, start: "top top", end: "75% top", scrub: 1
            }
          });

        /* Back link y page num: salen primero */
        gsap.fromTo(".back-link, .page-num",
          { y: 0, autoAlpha: 1 },
          { y: -30, autoAlpha: 0, ease: "none",
            scrollTrigger: {
              trigger: pageHero, start: "top top", end: "40% top", scrub: 0.8
            }
          });
      }
    }

    /* ==========================================================
       3. LP SECTIONS — secciones del index
       ========================================================== */

    /* Números de sección */
    gsap.utils.toArray(".lp-num").forEach((num, i) => {
      gsap.fromTo(num,
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.45,
          scrollTrigger: { trigger: num, start: "top 90%", once: true }
        });
    });

    /* Títulos: clipPath wipe hacia arriba — muy premium */
    gsap.utils.toArray(".lp-title").forEach(title => {
      gsap.fromTo(title,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "power4.out",
          scrollTrigger: {
            trigger: title, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });
    });

    /* Lead: fade + y */
    gsap.utils.toArray(".lp-lead").forEach(lead => {
      gsap.fromTo(lead,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7,
          scrollTrigger: {
            trigger: lead, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });
    });

    /* Lista de items: stagger desde la izquierda */
    gsap.utils.toArray(".lp-list").forEach(list => {
      gsap.fromTo(list.querySelectorAll("li"),
        { autoAlpha: 0, x: -16 },
        { autoAlpha: 1, x: 0, duration: 0.48, stagger: 0.07, ease: "power2.out",
          scrollTrigger: {
            trigger: list, start: "top 86%",
            toggleActions: "play none none reverse"
          }
        });
    });

    /* Botones de acción */
    gsap.utils.toArray(".lp-actions").forEach(actions => {
      gsap.fromTo(Array.from(actions.children),
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1,
          scrollTrigger: {
            trigger: actions, start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });
    });

    /* Visual cards: entrada 3D (rotateX) + parallax scrub */
    gsap.utils.toArray(".lp-card").forEach((card, i) => {
      /* Entrada con perspectiva 3D */
      gsap.fromTo(card,
        { autoAlpha: 0, y: 56, rotationX: 14, transformPerspective: 1200, transformOrigin: "center top" },
        { autoAlpha: 1, y: 0,  rotationX: 0,  duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: card, start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });

      /* Parallax sutil mientras el usuario scrollea — profundidad */
      gsap.to(card, {
        y: -20, ease: "none",
        scrollTrigger: {
          trigger: card, start: "top bottom", end: "bottom top", scrub: 1.5
        }
      });
    });

    /* ==========================================================
       4. TRUST BAR
       ========================================================== */
    gsap.utils.toArray(".tstat").forEach((stat, i) => {
      gsap.fromTo(stat,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.5,
          scrollTrigger: {
            trigger: ".trust-bar", start: "top 90%",
            toggleActions: "play none none reverse"
          },
          delay: i * 0.08
        });
    });

    /* ==========================================================
       5. PRIORITY BADGE
       ========================================================== */
    const badge = document.querySelector(".lp-priority-tag");
    if (badge) {
      gsap.fromTo(badge,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".lp-section--accidentes", start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
    }

    /* ==========================================================
       6. SECCIÓN DIFERENCIAL
       ========================================================== */
    const difSection = document.querySelector(".lp-diferencial");
    if (difSection) {
      const difTl = gsap.timeline({
        scrollTrigger: {
          trigger: difSection, start: "top 78%",
          toggleActions: "play none none reverse"
        },
        defaults: { ease: "power3.out" }
      });
      difTl
        .fromTo(".dif-logo",
          { autoAlpha: 0, scale: 0.75, rotation: -6 },
          { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(1.5)" })
        .fromTo(".dif-title",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.out" },
          "-=0.5")
        .fromTo(".dif-sub",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.6")
        .fromTo(".dif-btn",
          { autoAlpha: 0, y: 14, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "back.out(1.4)" },
          "-=0.45");
    }

    /* ==========================================================
       7. SUB-CARDS (páginas de servicio)
       ========================================================== */
    ScrollTrigger.batch(".sub-card", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, y: 44, rotationX: 10, transformPerspective: 900, transformOrigin: "center top" },
        { autoAlpha: 1, y: 0,  rotationX: 0,  duration: 0.75, ease: "power3.out", stagger: 0.1 }),
      start: "top 88%",
      once: true
    });

    /* Parallax en sub-cards eliminado — conflicto con animación de entrada */

    /* ==========================================================
       8. PROCESO — pasos
       ========================================================== */
    const processSection = document.querySelector(".process-steps");
    if (processSection) {
      const stepsTl = gsap.timeline({
        scrollTrigger: {
          trigger: processSection, start: "top 80%",
          toggleActions: "play none none reverse"
        },
        defaults: { ease: "power3.out" }
      });
      stepsTl
        .fromTo(".process-title",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power4.out" })
        .fromTo(".step",
          { autoAlpha: 0, y: 34, scale: 0.96 },
          { autoAlpha: 1, y: 0,  scale: 1, duration: 0.65, stagger: 0.14 },
          "-=0.4")
        .fromTo(".step__arrow",
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.14 },
          "-=0.7");
    }

    /* ==========================================================
       9. CTA FINAL
       ========================================================== */
    const ctaInner = document.querySelector(".cta-inner");
    if (ctaInner) {
      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: ctaInner, start: "top 80%",
          toggleActions: "play none none reverse"
        },
        defaults: { ease: "power3.out" }
      });
      ctaTl
        .fromTo(".cta-title",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.05, ease: "power4.out" })
        .fromTo(".cta-sub",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=0.55")
        .fromTo(".cta-inner > .btn",
          { autoAlpha: 0, y: 16, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" },
          "-=0.4");
    }

    /* ==========================================================
       10. OTRAS ÁREAS
       ========================================================== */
    ScrollTrigger.batch(".other-card", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, x: -18 },
        { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.1 }),
      start: "top 90%",
      once: true
    });

    /* ==========================================================
       11. SECTION LABELS
       ========================================================== */
    ScrollTrigger.batch(".section__label", {
      onEnter: batch => gsap.fromTo(batch,
        { autoAlpha: 0, x: -14 },
        { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }),
      start: "top 92%",
      once: true
    });

    /* ==========================================================
       12. FOOTER
       ========================================================== */
    const footerTl = gsap.timeline({
      scrollTrigger: { trigger: ".footer", start: "top 90%", once: true },
      defaults: { ease: "power2.out" }
    });
    footerTl
      .fromTo(".footer__brand",
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.6 })
      .fromTo(".footer__disclaimer, .footer__copy",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
        "-=0.3")
      .fromTo(".footer__links > *",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.07 },
        "-=0.4");

    /* ==========================================================
       13. REMAINING .reveal — todo lo que queda sin animar
       ========================================================== */
    ScrollTrigger.batch(
      ".reveal:not(.lp-title):not(.lp-num):not(.lp-card):not(.lp-priority-tag):not(.sub-card)", {
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0, x: 0,
        duration: 0.65, ease: "power2.out", stagger: 0.08
      }),
      start: "top 88%",
      once: true
    });

    /* ==========================================================
       14. WA FLOAT — pulso de atención cada ~6 segundos
       ========================================================== */
    const waFloat = document.querySelector(".wa-float");
    if (waFloat) {
      const waPulse = gsap.timeline({ repeat: -1, repeatDelay: 6 });
      waPulse
        .to(waFloat, { scale: 1.14, duration: 0.2, ease: "power2.out" })
        .to(waFloat, { scale: 1,    duration: 0.35, ease: "elastic.out(1, 0.4)" });
    }

  } // end hasMotion
); // end mm.add
