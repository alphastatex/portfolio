// @ts-check

// Smooth scroll для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    /** @type {string | null} */
    const href = anchor.getAttribute("href");

    if (!href || href === "#") return;

    /** @type {HTMLElement | null} */
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  });
});

// Мобильное меню (бургер)
const navToggle = /** @type {HTMLButtonElement | null} */ (
  document.querySelector(".nav-toggle")
);
const navLinks = /** @type {HTMLElement | null} */ (
  document.querySelector(".nav-links")
);

if (navToggle && navLinks) {
  const closeMenu = () => {
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

// ==========================================
// GSAP АНИМАЦИИ
// ==========================================
const gsap = /** @type {any} */ (window).gsap;
const ScrollTrigger = /** @type {any} */ (window).ScrollTrigger;

if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    
    const heroTl = gsap.timeline();
    heroTl.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".hero h1", { y: 40, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    /** @type {HTMLElement[]} */
    const projects = gsap.utils.toArray(".project");

    projects.forEach((project) => {
      const img = project.querySelector(".project-image");
      const info = project.querySelector(".project-info");
      
      gsap.from(img, {
        scrollTrigger: { trigger: project, start: "top 80%" },
        y: 50, opacity: 0, duration: 1, ease: "power3.out"
      });

      gsap.from(info, {
        scrollTrigger: { trigger: project, start: "top 80%" },
        y: 30, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out"
      });

      const imgTag = project.querySelector(".project-image img");
      if (imgTag) {
        gsap.to(imgTag, {
          scrollTrigger: {
            trigger: project,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          y: 30,
          ease: "none"
        });
      }
    });

    // Анимация фото и текста в блоке "Обо мне"
    gsap.from(".about-image", {
      scrollTrigger: { trigger: ".about-content", start: "top 85%" },
      x: -30, opacity: 0, duration: 1, ease: "power3.out"
    });

    gsap.from(".about-text", {
      scrollTrigger: { trigger: ".about-content", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.2, ease: "power3.out"
    });

    gsap.from(".skill-group", {
      scrollTrigger: { trigger: ".skills", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out"
    });

    gsap.from(".contact-text, .contact-links", {
      scrollTrigger: { trigger: ".contact-content", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    });

  });
} else {
  console.warn("GSAP не загружен. Проверь пути к скриптам.");
}