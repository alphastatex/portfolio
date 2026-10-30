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

// Кастомный курсор (только для десктопа)
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
  const cursor = /** @type {HTMLElement} */ (document.querySelector('.cursor'));
  const follower = /** @type {HTMLElement} */ (document.querySelector('.cursor-follower'));
  
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;
    if (follower) follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Ховер-эффект на ссылки и кнопки
  document.querySelectorAll('a, button, .magnetic, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor?.classList.add('hover');
      follower?.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor?.classList.remove('hover');
      follower?.classList.remove('hover');
    });
  });
}

// Магнитный эффект для кнопок
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(el => {
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