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
