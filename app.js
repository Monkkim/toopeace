const LETTERS = [
  { id: "T", dash: 200, delay: 0 },
  { id: "O1", dash: 289, delay: 0.25 },
  { id: "O2", dash: 289, delay: 0.5 },
  { id: "P", dash: 380, delay: 0.75 },
  { id: "E1", dash: 428, delay: 1 },
  { id: "A", dash: 310, delay: 1.25 },
  { id: "C", dash: 241, delay: 1.5 },
  { id: "E2", dash: 428, delay: 1.75 },
];

const DRAW_TRANSITION = "1.8s cubic-bezier(0.25, 0.1, 0.25, 1)";

// 마지막 글자 delay 1.75s + draw 1.8s = 3.55s, CONTACT 페이드인 종료 ≈ 4.35s
const INTRO_TOTAL_MS = 4400;

const SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
]);

function initIntroScrollLock() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || window.scrollY > 4) return;

  const preventScroll = (event) => event.preventDefault();
  const preventScrollKeys = (event) => {
    if (SCROLL_KEYS.has(event.key)) event.preventDefault();
  };

  document.documentElement.classList.add("tp-scroll-locked");
  window.addEventListener("wheel", preventScroll, { passive: false });
  window.addEventListener("touchmove", preventScroll, { passive: false });
  window.addEventListener("keydown", preventScrollKeys);

  window.setTimeout(() => {
    document.documentElement.classList.remove("tp-scroll-locked");
    window.removeEventListener("wheel", preventScroll);
    window.removeEventListener("touchmove", preventScroll);
    window.removeEventListener("keydown", preventScrollKeys);
  }, INTRO_TOTAL_MS);
}

function initToopeace() {
  const wrap = document.querySelector(".toopeace-wrap");
  const svg = wrap?.querySelector(".tp-svg-text");
  if (!wrap || !svg) return;

  const paths = new Map(
    LETTERS.map(({ id }) => [id, svg.querySelector(`[data-l="${id}"]`)]),
  );

  LETTERS.forEach(({ id, dash }) => {
    const path = paths.get(id);
    if (!path) return;
    path.style.strokeDasharray = dash;
    path.style.strokeDashoffset = dash;
    path.style.setProperty("--dl", dash);
    path.style.transition = "none";
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) {
    wrap.classList.add("tp-reduced-motion", "tp-visible");
    return;
  }

  const playDraw = () => {
    wrap.classList.remove("tp-reduced-motion");

    LETTERS.forEach(({ id, dash }) => {
      const path = paths.get(id);
      if (!path) return;
      path.style.transition = "none";
      path.style.strokeDashoffset = dash;
    });

    svg.getBoundingClientRect();

    LETTERS.forEach(({ id, delay }) => {
      const path = paths.get(id);
      if (!path) return;
      path.style.transition = `${DRAW_TRANSITION} ${delay}s`;
      path.style.strokeDashoffset = 0;
    });

    wrap.classList.add("tp-visible");
  };

  const playErase = () => {
    wrap.classList.remove("tp-visible");

    LETTERS.forEach(({ id, dash }, index) => {
      const path = paths.get(id);
      if (!path) return;
      path.style.transition = `0.5s cubic-bezier(0.4, 0, 1, 1) ${index * 0.05}s`;
      path.style.strokeDashoffset = dash;
    });
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) playDraw();
      else playErase();
    },
    { threshold: 0.25 },
  );

  observer.observe(wrap);

  reducedMotion.addEventListener?.("change", ({ matches }) => {
    if (matches) {
      wrap.classList.add("tp-reduced-motion", "tp-visible");
      LETTERS.forEach(({ id }) => {
        const path = paths.get(id);
        if (path) path.style.strokeDashoffset = 0;
      });
    } else {
      wrap.classList.remove("tp-reduced-motion");
      playDraw();
    }
  });
}

function initResultsReveal() {
  const cases = [
    ...document.querySelectorAll(
      ".tp-results-heading, .tp-case, .tp-results-outro",
    ),
  ];
  if (!cases.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    cases.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  cases.forEach((item) => observer.observe(item));
}

function initJourneyReveal() {
  const journeyItems = [
    ...document.querySelectorAll(".tp-journey-step, .tp-journey-cta"),
  ];
  if (!journeyItems.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    journeyItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.22 },
  );

  journeyItems.forEach((item) => observer.observe(item));
}

function initPage() {
  initIntroScrollLock();
  initToopeace();
  initResultsReveal();
  initJourneyReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage, { once: true });
} else {
  initPage();
}
