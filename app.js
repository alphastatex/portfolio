// @ts-check

// Smooth scroll
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

// Мобильное меню
const navToggle = /** @type {HTMLButtonElement | null} */ (document.querySelector(".nav-toggle"));
const navLinks = /** @type {HTMLElement | null} */ (document.querySelector(".nav-links"));

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
  navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
}

// ==========================================
// КАСТОМНЫЙ КУРСОР (crosshair + dot)
// ==========================================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  // Явно указываем TS, что это HTMLElement, а не просто Element
  const cursor = /** @type {HTMLElement | null} */ (document.querySelector('.cursor'));
  const dot = /** @type {HTMLElement | null} */ (document.querySelector('.cursor-dot'));

  if (cursor && dot) {
    // Сохраняем ссылки в const, чтобы TS не терял тип внутри замыканий
    const cursorEl = cursor;
    const dotEl = dot;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;

    // Крест следует мгновенно
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorEl.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Точка с легким сглаживанием
    const animateDot = () => {
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;
      dotEl.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animateDot);
    };
    animateDot();

    // Hover на интерактив: крест расширяется, линии укорачиваются
    const hoverTargets = document.querySelectorAll('a, button, .magnetic, .service-card, .project-image');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('is-hover'));
    });

    // Click: короткое сжатие креста
    document.addEventListener('mousedown', () => cursorEl.classList.add('is-down'));
    document.addEventListener('mouseup', () => cursorEl.classList.remove('is-down'));
  }
}

// Магнитный эффект для кнопок
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const mouseEvent = /** @type {MouseEvent} */ (e);
    const rect = el.getBoundingClientRect();
    const x = mouseEvent.clientX - rect.left - rect.width / 2;
    const y = mouseEvent.clientY - rect.top - rect.height / 2;
    /** @type {HTMLElement} */ (el).style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  el.addEventListener('mouseleave', () => {
    /** @type {HTMLElement} */ (el).style.transform = 'translate(0, 0)';
  });
});

// ==========================================
// GSAP АНИМАЦИИ
// ==========================================
const gsap = /** @type {any} */ (window).gsap;
const ScrollTrigger = /** @type {any} */ (window).ScrollTrigger;

if (gsap && ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    
    // Анимация Hero (построчно)
    const heroTl = gsap.timeline();
    heroTl.from(".hero-label", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from(".hero h1 .word", { 
            y: 50, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" 
          }, "-=0.6")
          .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
          .from(".hero-actions", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

    // Проекты
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
          scrollTrigger: { trigger: project, start: "top bottom", end: "bottom top", scrub: true },
          y: 30, ease: "none"
        });
      }
    });

    // Услуги
    gsap.from(".service-card", {
      scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    });

    // Обо мне
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

    // Контакты
    gsap.from(".contact-text, .contact-links", {
      scrollTrigger: { trigger: ".contact-content", start: "top 85%" },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power3.out"
    });

  });
} else {
  console.warn("GSAP не загружен. Проверь пути к скриптам.");
}