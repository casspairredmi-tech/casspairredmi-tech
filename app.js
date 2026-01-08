// Demo PWA — chemins relatifs (./...) pour GitHub Pages

const elChapters = document.getElementById("chapters");
const viewCourse = document.getElementById("viewCourse");
const viewQuiz = document.getElementById("viewQuiz");
const statusEl = document.getElementById("status");

const modeCourseBtn = document.getElementById("modeCourse");
const modeQuizBtn = document.getElementById("modeQuiz");

// Installer
let deferredPrompt = null;
const btnInstall = document.getElementById("btnInstall");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  btnInstall.hidden = false;
});

btnInstall.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  btnInstall.hidden = true;
});

let data = null;
let currentChapterId = null;
let mode = "course";

async function loadContent() {
  try {
    const res = await fetch("./content.json", { cache: "no-store" });
    if (!res.ok) throw new Error("content.json introuvable");
    data = await res.json();

    statusEl.textContent = "Prêt ✅ (offline après 1ère visite)";
    renderChapters();
    selectChapter(data.chapters?.[0]?.id);
  } catch (err) {
    statusEl.textContent = "Erreur : " + err.message;
    viewCourse.innerHTML = `<h2>Erreur</h2><p>${escapeHtml(err.message)}</p>`;
  }
}

function renderChapters() {
  elChapters.innerHTML = "";
  (data.chapters || []).forEach((ch) => {
    const b = document.createElement("button");
    b.className = "item";
    b.textContent = ch.title;
    b.onclick = () => selectChapter(ch.id);
    b.dataset.id = ch.id;
    elChapters.appendChild(b);
  });
}

function selectChapter(id) {
  currentChapterId = id;
  [...elChapters.querySelectorAll(".item")].forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.id === id);
  });
  renderCurrent();
}

function setMode(next) {
  mode = next;
  modeCourseBtn.classList.toggle("active", mode === "course");
  modeQuizBtn.classList.toggle("active", mode === "quiz");
  viewCourse.hidden = mode !== "course";
  viewQuiz.hidden = mode !== "quiz";
  renderCurrent();
}

modeCourseBtn.onclick = () => setMode("course");
modeQuizBtn.onclick = () => setMode("quiz");

function getCurrentChapter() {
  return (data.chapters || []).find((c) => c.id === currentChapterId) || null;
}

function renderCurrent() {
  const ch = getCurrentChapter();
  if (!ch) return;
  if (mode === "course") renderCourse(ch);
  if (mode === "quiz") renderQuiz(ch);
}

function renderCourse(ch) {
  viewCourse.innerHTML = `
    <h1>${escapeHtml(ch.title)}</h1>
    ${(ch.lessons || []).map(l => `
      <div class="lesson">
        <h3>${escapeHtml(l.title)}</h3>
        <p>${escapeHtml(l.text)}</p>
      </div>
    `).join("")}
    <hr/>
    <p class="hint">Passe en “Exercices” pour t’entraîner.</p>
  `;
}

function renderQuiz(ch) {
  const questions = ch.quiz || [];
  if (!questions.length) {
    viewQuiz.innerHTML = `<h1>${escapeHtml(ch.title)}</h1><p>Aucun exercice.</p>`;
    return;
  }

  viewQuiz.innerHTML = `
    <h1>${escapeHtml(ch.title)} – Exercices</h1>
    <form id="quizForm" class="quiz">
      ${questions.map((q, i) => renderQuestion(q, i)).join("")}
      <button class="btn primary" type="submit">Corriger</button>
      <div id="result" class="result" hidden></div>
    </form>
  `;

  const form = document.getElementById("quizForm");
  const result = document.getElementById("result");

  form.onsubmit = (e) => {
    e.preventDefault();
    let score = 0;

    questions.forEach((q, i) => {
      const chosen = form.querySelector(`input[name="q${i}"]:checked`);
      const ok = chosen && chosen.value === String(q.answerIndex);
      if (ok) score++;

      const box = form.querySelector(`#box-${i}`);
      box.classList.remove("ok", "bad");
      box.classList.add(ok ? "ok" : "bad");
    });

    result.hidden = false;
    result.textContent = `Score: ${score} / ${questions.length}`;
  };
}

function renderQuestion(q, i) {
  return `
    <div class="qbox" id="box-${i}">
      <div class="qtitle">${i + 1}. ${escapeHtml(q.question)}</div>
      <div class="opts">
        ${(q.options || []).map((opt, idx) => `
          <label class="opt">
            <input type="radio" name="q${i}" value="${idx}" />
            <span>${escapeHtml(opt)}</span>
          </label>
        `).join("")}
      </div>
    </div>
  `;
}

// Offline
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try { await navigator.serviceWorker.register("./service-worker.js"); } catch {}
  });
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadContent();
