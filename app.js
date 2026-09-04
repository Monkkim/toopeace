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

const PORTFOLIO_ITEMS = [
  {
    category: "CASE 01 · MARKETING",
    title: "(현)연매출 n00억 회사 마케팅팀 교육",
    image: "./assets/case-01-marketing.png",
    alt: "연매출 n00억 회사 마케팅팀 교육 성과 사례",
    results: ["3개월 만에 팔로워 5만 성장", "기획·제작 프로세스 팀 내재화"],
  },
  {
    category: "CHANNEL OPERATION",
    title: "듀오링고 채널 운영",
    image: null,
    alt: "듀오링고 코리아 채널 운영 사례",
    results: ["채널 기획·촬영·편집·업로드 운영", "인스타그램 팔로워 19.9만 채널"],
  },
  {
    category: "SLEEP EDUCATION",
    title: "김주하 아기수면연구소",
    image: "./assets/client-feedback/portfolio-extra-05.png",
    beforeImage: "./assets/client-feedback/portfolio-kimjuha-before.png",
    afterImage: "./assets/case-02-sleep-profile.png",
    alt: "김주하 아기수면연구소 콘텐츠 성장 사례",
    results: ["업로드 13일 만에 팔로워 1만 달성", "현재 팔로워 9.8만"],
  },
  {
    category: "FASHION",
    title: "오드리겸",
    image: "./assets/client-feedback/portfolio-audrey-before.png",
    beforeImage: "./assets/client-feedback/portfolio-audrey-before.png",
    alt: "오드리겸 콘텐츠 리브랜딩 전 계정",
    results: ["콘셉트 변경 후 팔로워 성장", "현재 팔로워 18.2만"],
  },
  {
    category: "PHONE STORE",
    title: "오프라인 매장",
    image: "./assets/case-03-phone.png",
    alt: "하남 휴대폰 매장 성장 사례",
    results: ["팔로워 0에서 1만 성장", "오픈 5개월 만에 월 매출 1억 KPI 달성"],
  },
  {
    category: "FINANCE",
    title: "금융 스타트업 퍼스널 브랜딩",
    image: "./assets/client-feedback/portfolio-extra-01.png",
    alt: "금융 스타트업 콘텐츠 성장 사례",
    results: ["팔로워 0에서 4,400명 성장", "경제·대출·금리 콘텐츠 퍼스널 브랜딩"],
  },
  {
    category: "STARTUP EDUCATION",
    title: "김서한(에이그라운드)",
    image: "./assets/client-feedback/portfolio-extra-02.png",
    alt: "창업 아카데미 콘텐츠 성장 사례",
    results: ["도합 100만 조회수", "팔로워 2,700명 성장"],
  },
  {
    category: "CAREER CONSULTING",
    title: "취업 컨설팅 콘텐츠 성장",
    image: "./assets/client-feedback/portfolio-extra-03.png",
    alt: "취업 컨설팅 콘텐츠 성장 사례",
    results: ["콘셉트 변경 후 팔로워 8,000명 성장", "현재 팔로워 1.2만"],
  },
  {
    category: "WEDDING",
    title: "웨딩플래너 콘텐츠 성장",
    image: "./assets/client-feedback/portfolio-extra-04.png",
    alt: "웨딩플래너 콘텐츠 성장 사례",
    results: ["대행 한 달 만에 누적 조회수 240만", "콘텐츠를 통한 고객 DB 창출"],
  },
  {
    category: "LEGAL",
    title: "변호사 계정",
    image: "./assets/client-feedback/portfolio-lawyer-after-01.png",
    beforeImage: "./assets/client-feedback/portfolio-lawyer-before.png",
    afterImage: "./assets/client-feedback/portfolio-lawyer-after-01.png",
    extraImages: ["./assets/client-feedback/portfolio-lawyer-after-02.png"],
    alt: "변호사 계정 콘텐츠 개선 사례",
    results: ["전문성을 살린 콘텐츠 방향 재설계", "계정의 메시지와 화면 구성 개선"],
  },
  {
    category: "EDUCATION",
    title: "교육 수강생",
    image: "./assets/client-feedback/portfolio-student-01.png",
    extraImages: [
      "./assets/client-feedback/portfolio-student-02.png",
      "./assets/client-feedback/portfolio-student-03.png",
    ],
    alt: "교육 수강생 콘텐츠 성과 사례",
    results: ["교육 후 직접 만든 콘텐츠 성과", "기획과 제작 역량을 실행으로 연결"],
  },
  {
    category: "AESTHETIC",
    title: "예방원 에스테틱",
    image: "./assets/client-feedback/portfolio-esthetic-after.png",
    beforeImage: "./assets/client-feedback/portfolio-esthetic-before.png",
    afterImage: "./assets/client-feedback/portfolio-esthetic-after.png",
    alt: "예방원 에스테틱 콘텐츠 개선 사례",
    results: ["비포·애프터가 선명한 콘텐츠 구조", "브랜드 전문성을 보여주는 계정 구성"],
  },
  {
    category: "INSIGHT CONTENT",
    title: "월트의 영감노트",
    image: null,
    alt: "월트의 영감노트 포트폴리오 이미지 준비 중",
    results: ["사진과 성과 정보는 추후 업데이트합니다"],
  },
  {
    category: "BAKERY",
    title: "즉흥베이커리",
    image: null,
    alt: "즉흥베이커리 포트폴리오 이미지 준비 중",
    results: ["사진과 성과 정보는 추후 업데이트합니다"],
  },
  {
    category: "RESTAURANT & BAR",
    title: "탭샵바",
    image: null,
    alt: "탭샵바 포트폴리오 이미지 준비 중",
    results: ["사진과 성과 정보는 추후 업데이트합니다"],
  },
];

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
  const hasPlayed = sessionStorage.getItem("tp-intro-played") === "true";

  wrap.classList.add("tp-visible");

  if (reducedMotion.matches || hasPlayed) {
    wrap.classList.add("tp-reduced-motion", "tp-visible");
    LETTERS.forEach(({ id }) => {
      const path = paths.get(id);
      if (path) path.style.strokeDashoffset = 0;
    });
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
    sessionStorage.setItem("tp-intro-played", "true");
  };

  playDraw();

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
      ".tp-results-heading, .tp-portfolio-carousel, .tp-results-outro",
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

function initPortfolioCarousel() {
  const root = document.querySelector("[data-portfolio-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const dots = root.querySelector("[data-carousel-dots]");
  const prevButton = root.querySelector("[data-carousel-prev]");
  const nextButton = root.querySelector("[data-carousel-next]");
  const category = root.querySelector("[data-portfolio-category]");
  const title = root.querySelector("[data-portfolio-title]");
  const results = root.querySelector("[data-portfolio-results]");
  const detailMedia = root.querySelector("[data-portfolio-media]");

  if (!track || !dots || !prevButton || !nextButton || !category || !title || !results || !detailMedia) {
    return;
  }

  const cards = PORTFOLIO_ITEMS.map((item, index) => {
    const card = document.createElement("button");
    card.className = "tp-portfolio-card";
    card.type = "button";
    card.dataset.index = index;
    card.setAttribute("aria-label", `${item.title} 포트폴리오 선택`);

    const coverImage = item.image || item.afterImage || item.beforeImage || item.extraImages?.[0];

    if (coverImage) {
      const image = document.createElement("img");
      image.src = coverImage;
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";
      card.append(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "tp-portfolio-card-placeholder";
      placeholder.setAttribute("aria-label", item.alt);
      card.append(placeholder);
    }

    track.append(card);
    return card;
  });

  const dotButtons = PORTFOLIO_ITEMS.map((item, index) => {
    const dot = document.createElement("button");
    dot.className = "tp-carousel-dot";
    dot.type = "button";
    dot.dataset.index = index;
    dot.setAttribute("aria-label", `${item.title} 선택`);
    dots.append(dot);
    return dot;
  });

  let activeIndex = Math.min(1, PORTFOLIO_ITEMS.length - 1);

  const renderPortfolio = (nextIndex) => {
    activeIndex = Math.max(0, Math.min(PORTFOLIO_ITEMS.length - 1, nextIndex));
    const activeItem = PORTFOLIO_ITEMS[activeIndex];

    cards.forEach((card, index) => {
      const position = index - activeIndex;
      card.dataset.position = position;
      card.style.setProperty("--position", position);
      card.setAttribute("aria-current", index === activeIndex ? "true" : "false");
      card.setAttribute("aria-pressed", index === activeIndex ? "true" : "false");
      card.tabIndex = index === activeIndex ? 0 : -1;
    });

    dotButtons.forEach((dot, index) => {
      dot.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    });

    category.textContent = activeItem.category;
    title.textContent = activeItem.title;

    const media = [];
    if (activeItem.beforeImage) {
      media.push({ src: activeItem.beforeImage, label: "Before", kind: "before" });
    }
    if (activeItem.afterImage) {
      media.push({ src: activeItem.afterImage, label: "After", kind: "after" });
    } else if (activeItem.image && activeItem.image !== activeItem.beforeImage) {
      media.push({ src: activeItem.image, label: "Result", kind: "after" });
    }
    (activeItem.extraImages || []).forEach((src, index) => {
      media.push({ src, label: `Result ${index + 2}`, kind: "after" });
    });

    detailMedia.replaceChildren(
      ...media.map(({ src, label, kind }) => {
        const figure = document.createElement("figure");
        figure.dataset[`portfolio${kind === "before" ? "Before" : "After"}`] = "";
        const caption = document.createElement("figcaption");
        caption.textContent = label;
        const image = document.createElement("img");
        image.src = src;
        image.alt = `${activeItem.title} ${label} 이미지`;
        image.loading = "lazy";
        image.decoding = "async";
        figure.append(caption, image);
        return figure;
      }),
    );
    detailMedia.hidden = media.length === 0;

    results.replaceChildren(
      ...activeItem.results.map((result) => {
        const item = document.createElement("li");
        item.textContent = result;
        return item;
      }),
    );

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === PORTFOLIO_ITEMS.length - 1;
  };

  cards.forEach((card, index) => {
    card.addEventListener("click", () => renderPortfolio(index));
  });

  dotButtons.forEach((dot, index) => {
    dot.addEventListener("click", () => renderPortfolio(index));
  });

  prevButton.addEventListener("click", () => renderPortfolio(activeIndex - 1));
  nextButton.addEventListener("click", () => renderPortfolio(activeIndex + 1));

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") renderPortfolio(activeIndex - 1);
    if (event.key === "ArrowRight") renderPortfolio(activeIndex + 1);
  });

  renderPortfolio(activeIndex);
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

function initContactModal() {
  const modal = document.getElementById("contact-modal");
  if (!modal || typeof modal.showModal !== "function") return;

  const form = modal.querySelector(".tp-modal-form");
  const body = modal.querySelector(".tp-modal-body");
  const success = modal.querySelector(".tp-modal-success");
  const closeBtn = modal.querySelector(".tp-modal-close");
  const successCloseBtn = modal.querySelector(".tp-modal-success-close");

  document.querySelectorAll(".tp-contact").forEach((btn) => {
    btn.addEventListener("click", () => {
      form.reset();
      body.hidden = false;
      success.hidden = true;
      modal.showModal();
    });
  });

  closeBtn.addEventListener("click", () => modal.close());
  successCloseBtn.addEventListener("click", () => modal.close());

  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // TODO: 폼 전송 백엔드 연동 전까지는 콘솔로만 기록하는 샘플
    console.log("[contact]", Object.fromEntries(new FormData(form)));
    body.hidden = true;
    success.hidden = false;
  });
}

function initMorphButtons() {
  document.querySelectorAll(".tp-contact").forEach((button) => {
    const setHovered = (hovered) => {
      button.classList.toggle("is-hovered", hovered);
    };

    button.addEventListener("mouseenter", () => setHovered(true));
    button.addEventListener("mouseleave", () => setHovered(false));
    button.addEventListener("focus", () => setHovered(true));
    button.addEventListener("blur", () => setHovered(false));
  });
}

function initPage() {
  initToopeace();
  initPortfolioCarousel();
  initResultsReveal();
  initJourneyReveal();
  initContactModal();
  initMorphButtons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPage, { once: true });
} else {
  initPage();
}
