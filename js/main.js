// ================================================================
// Subjects Online V2 — main.js
// Handles: theme, navbar, page routing, subject cards,
//          chapter accordion, media viewer
// ================================================================

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem("so-theme") || "dark";
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeBtn(saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("so-theme", next);
  updateThemeBtn(next);
}
function updateThemeBtn(theme) {
  const btns = document.querySelectorAll(".theme-btn");
  btns.forEach(b => {
    const ico = b.querySelector(".theme-ico");
    const lbl = b.querySelector(".theme-label");
    if (ico) ico.textContent = theme === "dark" ? "🌙" : "☀️";
    if (lbl) lbl.textContent = theme === "dark" ? "Dark" : "Light";
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const backdrop   = document.querySelector(".menu-backdrop");

  if (!hamburger) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open", isOpen);
    backdrop.classList.toggle("open", isOpen);
  });

  backdrop.addEventListener("click", closeMenu);
  document.querySelectorAll(".mobile-link").forEach(l => l.addEventListener("click", closeMenu));

  function closeMenu() {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    backdrop.classList.remove("open");
  }

  // Mark active link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
    const href = link.getAttribute("href") || "";
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// ===== SUBJECT CARDS (browse page) =====
function renderSubjectCards() {
  const grid = document.getElementById("subjects-grid");
  if (!grid || typeof SUBJECTS === "undefined") return;

  grid.innerHTML = SUBJECTS.map((s, i) => `
    <a href="subject.html?id=${s.id}" class="subject-card" style="animation-delay:${i*0.07}s">
      <div class="sc-glow" style="background:linear-gradient(${s.grad})"></div>
      <div class="sc-icon" style="background:linear-gradient(${s.grad})">
        <span>${s.icon}</span>
      </div>
      <div>
        <div class="sc-tag">${s.nameAr}</div>
        <div class="sc-name">${s.name}</div>
        <div class="sc-desc">${s.desc}</div>
      </div>
      <div class="sc-footer">
        <span class="sc-meta">7 Sections</span>
        <span class="sc-arr" style="color:${s.color}">→</span>
      </div>
      <div class="sc-accent" style="background:linear-gradient(${s.grad})"></div>
    </a>
  `).join("");
}

// ===== HOME CARDS =====
function renderHomeCards() {
  const container = document.getElementById("home-cards");
  if (!container) return;

  const cards = [
    { href:"subjects.html", icon:"📚", title:"Browse Subjects", desc:"Course content, quizzes, section solutions, summaries, Q&A, final reviews & videos — perfectly organized.", grad:"135deg,#7c3aed,#3b82f6", color:"#7c3aed", tag1:"7 Subjects", tag2:"7 Sections Each", pills:["Course Content","Quizzes","Videos","Final Review"] },
    { href:"doctors-news.html", icon:"🩺", title:"Doctors News", desc:"Latest announcements, notes, and updates from your professors — delivered instantly.", grad:"135deg,#059669,#06b6d4", color:"#059669", tag1:"Stay Updated", tag2:"All Professors", pills:["Announcements","Notes","Reminders","Updates"] },
    { href:"personal-dev.html", icon:"🌱", title:"Self Development", desc:"Build the mindset, habits, and skills that make you unstoppable beyond the classroom.", grad:"135deg,#f59e0b,#ec4899", color:"#f59e0b", tag1:"Grow Every Day", tag2:"6 Categories", pills:["Mindset","Productivity","Focus","Goal Setting"] },
  ];

  container.innerHTML = cards.map((c, i) => `
    <a href="${c.href}" class="feat-card au" style="animation-delay:${0.1+i*0.12}s">
      <div class="fc-bar" style="background:linear-gradient(${c.grad})"></div>
      <div class="fc-head">
        <div class="fc-icon" style="background:linear-gradient(${c.grad})">${c.icon}</div>
        <div class="fc-tags">
          <span class="fc-tag">${c.tag1}</span>
          <span class="fc-tag">${c.tag2}</span>
        </div>
      </div>
      <h2 class="fc-title">${c.title}</h2>
      <p class="fc-desc">${c.desc}</p>
      <div class="fc-features">
        ${c.pills.map(p=>`<span class="fc-pill" style="border-color:${c.color}44;color:${c.color};background:${c.color}11">${p}</span>`).join("")}
      </div>
      <div class="fc-cta" style="color:${c.color}">
        <span>Open Section</span>
        <span class="fc-arr">→</span>
      </div>
      <div class="fc-glow" style="background:linear-gradient(${c.grad})"></div>
    </a>
  `).join("");
}

// ===== SUBJECT PAGE =====
let activeSection = "course-content";

function initSubjectPage() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (!id || typeof SUBJECTS === "undefined") return;

  const subject = SUBJECTS.find(s => s.id === id);
  if (!subject) { location.href = "subjects.html"; return; }

  // Header
  document.getElementById("subj-icon").style.background = `linear-gradient(${subject.grad})`;
  document.getElementById("subj-icon").textContent = subject.icon;
  document.getElementById("subj-name").textContent = subject.name;
  document.getElementById("subj-name-ar").textContent = subject.nameAr;
  document.getElementById("subj-desc").textContent = subject.desc;
  document.title = subject.name + " — Subjects Online";

  // Sidebar tabs
  const sidebar = document.getElementById("sec-sidebar");
  sidebar.innerHTML = `<div class="sidebar-lbl">Sections</div>` +
    SECTIONS.map(sec => `
      <button class="sec-tab ${sec.id === activeSection ? "active" : ""}" data-sec="${sec.id}"
        style="${sec.id === activeSection ? `border-color:${sec.color};color:${sec.color}` : ""}">
        <span class="tab-ico">${sec.icon}</span>
        <span class="tab-ttl">${sec.title}</span>
        ${sec.id === activeSection ? `<span class="tab-dot" style="background:${sec.color}"></span>` : ""}
      </button>
    `).join("");

  sidebar.querySelectorAll(".sec-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      activeSection = btn.dataset.sec;
      renderSectionContent(id);
      sidebar.querySelectorAll(".sec-tab").forEach(b => {
        const sec = SECTIONS.find(s => s.id === b.dataset.sec);
        const isActive = b.dataset.sec === activeSection;
        b.className = "sec-tab" + (isActive ? " active" : "");
        b.style = isActive ? `border-color:${sec.color};color:${sec.color}` : "";
        b.innerHTML = `<span class="tab-ico">${sec.icon}</span><span class="tab-ttl">${sec.title}</span>${isActive ? `<span class="tab-dot" style="background:${sec.color}"></span>` : ""}`;
      });
    });
  });

  renderSectionContent(id);
}

function renderSectionContent(subjectId) {
  const sec = SECTIONS.find(s => s.id === activeSection);
  const chapters = getChapters(subjectId, activeSection);

  // Section header
  document.getElementById("sec-hdr").innerHTML = `
    <div class="sec-ico" style="background:${sec.color}22;border:1px solid ${sec.color}44">${sec.icon}</div>
    <div>
      <h2>${sec.title}</h2>
      <p>${sec.desc}</p>
    </div>
    <div class="sec-stats"><span class="stat-chip">4 Chapters</span></div>
  `;

  // Chapters accordion
  const lista = document.getElementById("chapters-list");
  lista.innerHTML = chapters.map((ch, idx) => `
    <div class="ch-item" style="animation-delay:${idx*0.08}s" data-chid="${ch.id}">
      <button class="ch-btn" onclick="toggleChapter(this, '${sec.color}')">
        <div class="ch-left">
          <span class="ch-num">${idx+1}</span>
          <span class="ch-title">${ch.title}</span>
        </div>
        <div class="ch-right">
          <span class="ch-count">${ch.lectures.length > 0 ? ch.lectures.length+" item"+(ch.lectures.length>1?"s":"") : "Empty"}</span>
          <span class="ch-chev">▾</span>
        </div>
      </button>
    </div>
  `).join("");

  // Store chapters data for accordion
  window._currentChapters = chapters;
  window._currentSecColor = sec.color;
}

function toggleChapter(btn, color) {
  const item = btn.closest(".ch-item");
  const isOpen = item.classList.toggle("open");
  const chev = btn.querySelector(".ch-chev");
  const num  = btn.querySelector(".ch-num");

  chev.style.transform = isOpen ? "rotate(180deg)" : "rotate(0)";
  btn.style.borderColor = isOpen ? color : "transparent";
  btn.style.color = isOpen ? color : "";
  num.style.background = isOpen ? color : "";

  // Remove existing body
  const existing = item.querySelector(".ch-body");
  if (existing) existing.remove();

  if (!isOpen) return;

  // Find chapter data
  const chIdx = Array.from(item.parentNode.children).indexOf(item);
  const ch = (window._currentChapters || [])[chIdx];
  if (!ch) return;

  const body = document.createElement("div");
  body.className = "ch-body";

  if (ch.lectures.length === 0) {
    body.innerHTML = `<div class="ch-empty"><span>📂</span><p>No content yet — will be uploaded soon.</p></div>`;
  } else {
    const typeMap = { lecture:["📖","Lecture"], video:["🎬","Video"], summary:["🔑","Summary"], file:["📄","PDF"] };

    // Store lectures globally for safe lookup
    window._currentLecs = window._currentLecs || {};
    ch.lectures.forEach((lec, i) => { window._currentLecs[`${chIdx}-${i}`] = lec; });

    const list = document.createElement("div");
    list.className = "lecs-list";

    ch.lectures.forEach((lec, i) => {
      const [ico, lbl] = typeMap[lec.type] || ["📖","Content"];
      const hasContent = !!lec.content;

      const btn2 = document.createElement("button");
      btn2.className = "lec-item";
      btn2.style.cssText = `--acc:${color}`;
      btn2.disabled = !hasContent;
      btn2.dataset.ch = chIdx;
      btn2.dataset.lec = i;
      btn2.innerHTML = `
        <span class="lec-num">${i + 1}</span>
        <span class="lec-ico">${ico}</span>
        <span class="lec-ttl">${lec.title || "(no title)"}</span>
        <span class="lec-badge">${lbl}</span>
        ${hasContent ? `<span class="lec-open">▶</span>` : ""}
      `;

      if (hasContent) {
        btn2.addEventListener("click", () => {
          const l = window._currentLecs[`${btn2.dataset.ch}-${btn2.dataset.lec}`];
          if (l) openViewer(l);
        });
      }

      list.appendChild(btn2);
    });

    body.appendChild(list);
  }

  item.appendChild(body);
}

// ===== MEDIA VIEWER =====
function openViewer(lec) {
  const overlay = document.getElementById("mv-overlay");
  if (!overlay) return;

  const isPdf   = lec.content && /\.pdf$/i.test(lec.content);
  const isVideo = lec.type === "video";
  const filename = (lec.content || "").split("/").pop() || "download";

  document.getElementById("mv-type-icon").textContent = isPdf ? "📄" : isVideo ? "🎬" : "📖";
  document.getElementById("mv-title").textContent = lec.title || "(no title)";
  document.getElementById("mv-sub").textContent = isPdf ? "PDF Document" : isVideo ? "Video" : "Content";

  const dlBtn = document.getElementById("mv-dl");
  if (lec.content) {
    dlBtn.href = lec.content;
    dlBtn.download = filename;
    dlBtn.style.display = "";
  } else {
    dlBtn.style.display = "none";
  }

  const body = document.getElementById("mv-body");
  body.innerHTML = "";

  if (isPdf && lec.content) {
    const fr = document.createElement("iframe");
    fr.className = "mv-iframe";
    fr.src = lec.content;
    fr.title = lec.title;
    body.appendChild(fr);
  } else if (isVideo && lec.content) {
    if (lec.content.includes("youtube.com") || lec.content.includes("youtu.be")) {
      const fr = document.createElement("iframe");
      fr.className = "mv-iframe";
      fr.src = lec.content.replace("watch?v=", "embed/");
      fr.allowFullscreen = true;
      fr.allow = "accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture";
      body.appendChild(fr);
    } else {
      const vid = document.createElement("video");
      vid.className = "mv-video";
      vid.src = lec.content;
      vid.controls = true;
      body.appendChild(vid);
    }
  } else {
    body.innerHTML = `<div class="mv-empty-state"><span>📂</span><p>No preview available.</p></div>`;
  }

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  const overlay = document.getElementById("mv-overlay");
  if (overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; }
  const body = document.getElementById("mv-body");
  if (body) body.innerHTML = "";
}

// Close on backdrop click
document.addEventListener("click", e => {
  const overlay = document.getElementById("mv-overlay");
  if (overlay && e.target === overlay) closeViewer();
});

// Close on Escape
document.addEventListener("keydown", e => { if (e.key === "Escape") closeViewer(); });

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavbar();
  renderHomeCards();
  renderSubjectCards();
  initSubjectPage();
});
