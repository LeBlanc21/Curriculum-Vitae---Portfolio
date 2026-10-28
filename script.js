/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

const skillCardClickMode = window.matchMedia(
  "(max-width: 900px), (hover: none)",
);

const setSkillCardFlipped = (card, isFlipped) => {
  card.classList.toggle("is-flipped", isFlipped);
  card.setAttribute("aria-pressed", String(isFlipped));
  card
    .querySelector(".skill-card-front")
    .setAttribute("aria-hidden", String(isFlipped));
  card
    .querySelector(".skill-card-back")
    .setAttribute("aria-hidden", String(!isFlipped));
};

document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (!skillCardClickMode.matches) {
      return;
    }

    setSkillCardFlipped(card, !card.classList.contains("is-flipped"));
  });

  card.addEventListener("pointerenter", () => {
    if (!skillCardClickMode.matches) {
      setSkillCardFlipped(card, true);
    }
  });

  card.addEventListener("pointerleave", () => {
    if (!skillCardClickMode.matches) {
      setSkillCardFlipped(card, false);
    }
  });
});

const experienceTimeline = document.querySelector(".timeline");
const sections = document.querySelectorAll("section[id]");
const backToTop = document.getElementById("backToTop");
let timelineUpdateScheduled = false;
let sectionPositions = [];

const updateSectionPositions = () => {
  sectionPositions = Array.from(sections, (section) => ({
    id: section.id,
    top: window.scrollY + section.getBoundingClientRect().top - 120,
  }));
};

let activeSectionId = "";

const updateScrollState = () => {
  const scrollY = window.scrollY;

  if (experienceTimeline) {
    const progressPoint = window.innerHeight * 0.7;
    const timelineBounds = experienceTimeline.getBoundingClientRect();
    const progress = Math.min(
      1,
      Math.max(0, (progressPoint - timelineBounds.top) / timelineBounds.height),
    );

    experienceTimeline.style.setProperty(
      "--timeline-progress",
      `${progress * 100}%`,
    );
  }

  let currentSectionId = "";
  for (const section of sectionPositions) {
    if (scrollY >= section.top) {
      currentSectionId = section.id;
    } else {
      break;
    }
  }

  if (currentSectionId !== activeSectionId) {
    activeSectionId = currentSectionId;
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${activeSectionId}`,
      );
    });
  }

  backToTop.classList.toggle("show", scrollY > 500);
  timelineUpdateScheduled = false;
};

const scheduleScrollUpdate = () => {
  if (!timelineUpdateScheduled) {
    timelineUpdateScheduled = true;
    window.requestAnimationFrame(updateScrollState);
  }
};

updateSectionPositions();
scheduleScrollUpdate();
window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
window.addEventListener("resize", () => {
  updateSectionPositions();
  scheduleScrollUpdate();
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/* =========================
   FOOTER YEAR
========================= */

document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   PAGE MOTION
========================= */

const reducedMotionPreference = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0,
        },
      )
    : null;

if (revealObserver && !reducedMotionPreference.matches) {
  const revealGroups = [
    ".section-heading > *",
    ".about-text > *",
    ".about-info .info-item",
    ".skill-card",
    ".timeline-item",
    ".project-card",
    ".education-card",
    ".cv-container > *",
    ".contact-info > *",
    '.contact-form > :not([type="hidden"])',
  ];
  const revealTargets = new Set(
    document.querySelectorAll(revealGroups.join(", ")),
  );
  const entranceTargets = document.querySelectorAll(
    ".navbar .logo, .navbar .nav-link, .menu-toggle, " +
      ".hero-content > *, .hero-image",
  );

  document.documentElement.classList.add("motion-ready");

  const staggerIndexes = new Map();
  revealTargets.forEach((target) => {
    const parent = target.parentElement;
    const index = staggerIndexes.get(parent) ?? 0;
    staggerIndexes.set(parent, index + 1);
    target.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
    target.classList.add("scroll-reveal");
    revealObserver.observe(target);
  });

  entranceTargets.forEach((target, index) => {
    target.style.setProperty("--entrance-delay", `${Math.min(index, 8) * 75}ms`);
    target.classList.add("page-enter");
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      entranceTargets.forEach((target) => target.classList.add("is-visible"));
    });
  });
}
