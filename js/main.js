(function () {
  "use strict";

  const config = PORTFOLIO_CONFIG;
  const works = WORKS;

  const $ = (id) => document.getElementById(id);

  // 站点文案
  document.title = config.title;
  $("brand-name").textContent = config.title;
  $("hero-title").textContent = config.title;
  $("hero-subtitle").textContent = config.subtitle;
  $("hero-intro").textContent = config.intro;
  $("footer-contact").textContent = "联系方式：" + config.contact;
  $("stat-works").textContent = works.length;
  $("stat-tags").textContent = new Set(works.flatMap((w) => w.tags || [])).size;
  $("stat-size").textContent = works
    .reduce((sum, w) => sum + (w.sizeMB || 0), 0)
    .toFixed(1);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));
  }

  // 标签筛选按钮
  const tagFilters = $("tag-filters");
  const allTags = [...new Set(works.flatMap((w) => w.tags || []))];
  tagFilters.innerHTML =
    '<button class="tag-chip active" data-tag="">全部</button>' +
    allTags
      .map((t) => `<button class="tag-chip" data-tag="${esc(t)}">${esc(t)}</button>`)
      .join("");

  let activeTag = "";
  let keyword = "";

  const palettes = [
    ["#4f46e5", "#7c3aed"],
    ["#0ea5e9", "#2563eb"],
    ["#10b981", "#0d9488"],
    ["#f59e0b", "#ea580c"],
    ["#ec4899", "#8b5cf6"],
    ["#14b8a6", "#3b82f6"]
  ];

  function cardHtml(w, idx) {
    const [c1, c2] = palettes[idx % palettes.length];
    const cover = w.thumb
      ? `<img class="cover-img" src="${esc(w.thumb)}" alt="${esc(w.title)}" />`
      : `<div class="cover-fallback" style="--c1:${c1};--c2:${c2}">${esc(
          (w.title || "作").trim().charAt(0)
        )}</div>`;
    const tags = (w.tags || []).map((t) => `<span>${esc(t)}</span>`).join("");
    const meta = [w.date && esc(w.date), w.sizeMB ? w.sizeMB + " MB" : null]
      .filter(Boolean)
      .join(" · ");
    const link = w.fileUrl || w.file;
    const btn = link
      ? w.fileUrl
        ? `<a class="btn" href="${esc(link)}" target="_blank" rel="noopener">下载压缩包</a>`
        : `<a class="btn" href="${esc(link)}" download>下载压缩包</a>`
      : "";
    const fileName = decodeURIComponent(
      (w.fileUrl || w.file || "").split("/").pop() || ""
    );
    return `
      <article class="work-card reveal" style="--d:${Math.min(idx * 80, 480)}ms">
        <div class="work-cover">
          ${cover}
          <span class="cover-tag">ZIP</span>
        </div>
        <div class="work-body">
          <div class="work-meta">${meta}</div>
          <h3 class="work-title">${esc(w.title)}</h3>
          <p class="work-desc">${esc(w.description)}</p>
          ${tags ? `<div class="work-tags">${tags}</div>` : ""}
        </div>
        <div class="work-footer">
          ${btn}
          ${fileName ? `<span class="file-name">${esc(fileName)}</span>` : ""}
        </div>
      </article>`;
  }

  function render() {
    const q = keyword.trim().toLowerCase();
    const list = works.filter((w) => {
      const okTag = !activeTag || (w.tags || []).includes(activeTag);
      const hay = [w.title, w.description, (w.tags || []).join(" ")]
        .join(" ")
        .toLowerCase();
      return okTag && (!q || hay.includes(q));
    });
    $("works-grid").innerHTML = list.map(cardHtml).join("");
    $("empty-state").hidden = list.length > 0;
    observeReveal();
  }

  // 回到顶部按钮
  const backTop = document.createElement("button");
  backTop.className = "back-top";
  backTop.type = "button";
  backTop.setAttribute("aria-label", "回到顶部");
  backTop.textContent = "↑";
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(backTop);

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 480);
  });

  // 卡片入场动画
  let revealObserver;
  function observeReveal() {
    const cards = document.querySelectorAll(".work-card.reveal");
    if (!("IntersectionObserver" in window)) {
      cards.forEach((el) => el.classList.remove("reveal"));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("in");
          setTimeout(() => el.classList.remove("reveal", "in"), 800);
          revealObserver.unobserve(el);
        });
      }, { threshold: 0.15 });
    }
    cards.forEach((el) => revealObserver.observe(el));
  }

  tagFilters.addEventListener("click", (e) => {
    const chip = e.target.closest(".tag-chip");
    if (!chip) return;
    activeTag = chip.dataset.tag || "";
    tagFilters.querySelectorAll(".tag-chip").forEach((c) => {
      c.classList.toggle("active", c === chip);
    });
    render();
  });

  $("search-input").addEventListener("input", (e) => {
    keyword = e.target.value;
    render();
  });

  render();
})();
