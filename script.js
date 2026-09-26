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

const skillCardClickMode = window.matchMedia("(max-width: 900px), (hover: none)");

const setSkillCardFlipped = (card, isFlipped) => {
  card.classList.toggle("is-flipped", isFlipped);
  card.setAttribute("aria-pressed", String(isFlipped));
  card.querySelector(".skill-card-front").setAttribute(
    "aria-hidden",
    String(isFlipped),
  );
  card.querySelector(".skill-card-back").setAttribute(
    "aria-hidden",
    String(!isFlipped),
  );
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

if (experienceTimeline) {
  let timelineUpdateScheduled = false;

  const updateTimelineProgress = () => {
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

    timelineUpdateScheduled = false;
  };

  const scheduleTimelineProgress = () => {
    if (!timelineUpdateScheduled) {
      timelineUpdateScheduled = true;
      window.requestAnimationFrame(updateTimelineProgress);
    }
  };

  window.addEventListener("scroll", scheduleTimelineProgress, {
    passive: true,
  });
  window.addEventListener("resize", scheduleTimelineProgress);
  updateTimelineProgress();
}

/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* =========================
   BACK TO TOP
========================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
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

