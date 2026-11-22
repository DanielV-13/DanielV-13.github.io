/* ===================== CORE: helpers, language, sound ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE = matchMedia("(pointer: fine)").matches;
const DPR = Math.min(window.devicePixelRatio || 1, 2);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
function fitCanvas(c, w, h) {
  c.width = Math.round(w * DPR); c.height = Math.round(h * DPR);
  const ctx = c.getContext("2d"); ctx.setTransform(DPR, 0, 0, DPR, 0, 0); return ctx;
}
function esc(s) { return String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m])); }
const smooth = () => REDUCED ? "auto" : "smooth";
function scrollToSel(sel) { const el = $(sel); if (el) el.scrollIntoView({ behavior: smooth(), block: "start" }); }

/* ---------- Language ---------- */
let LANG = store.get("dv_lang", "en");
const ES = {
  "intro.skip": "Saltar intro", "intro.chapter": "Capítulo I", "intro.pagetitle": "Hacia el horizonte de sucesos", "intro.vol": "Vol. 01 · 2026",
  "intro.portfolio": "un portafolio", "intro.tags": "Computación · Física · IA", "intro.open": "Abrir el libro", "intro.hint": "o pulsa Enter",
  "side.role": "Estudiante de Ingeniería en Computación", "side.f1": "Física", "side.f2": "Inteligencia Artificial", "side.f3": "Ciencia de Datos", "side.here": "Estás aquí",
  "side.copy": "Copiar correo", "side.cv": "CV · actualizando",
  "uni.eyebrow": "Daniel Vaca Velastegui · portafolio", "uni.title": "De un agujero negro <em>hasta</em> mí",
  "uni.lede": "Soy estudiante de ingeniería en computación de Guayaquil, Ecuador, y ahora estoy de intercambio en la Universidad de Oviedo aprendiendo a usar machine learning con datos reales de física de partículas. Esta página es un viaje por las escalas del universo: cada parada es una parte de mi trabajo. Haz scroll sobre el mapa o usa las flechas.",
  "uni.hint": "scroll ↕ para viajar",
  "work.stop": "Parada 02 · Cúmulo de galaxias", "work.title": "Cosas que he <em>construido</em>",
  "work.lede": "Cada pantalla es un proyecto real. Haz clic para ver qué hace, qué hice yo y dónde está el código. Las etiquetas indican dónde lo hice: la UEES en Ecuador o la Universidad de Oviedo en España.",
  "about.stop": "Parada 03 · Sistema Solar", "about.title": "Cómo la física me <em>encontró</em>",
  "about.p1": "Estudio <strong>ingeniería en computación</strong>, pero la pregunta que más me atrae es de física: ¿cómo encontramos unos pocos eventos interesantes escondidos entre miles de millones de colisiones? Ahí la computación y la física dejan de ser materias separadas.",
  "about.p2": "En Guayaquil hay muy pocos lugares para estudiar física, así que la encontré por mi cuenta: en concursos, en un club de física del colegio y después <strong>enseñándola</strong> como ayudante de cátedra de Matemáticas y Física en la UEES.",
  "about.p3": "Mi intercambio en la <strong>Universidad de Oviedo</strong> convirtió esa curiosidad en práctica. Ahora entreno redes neuronales con datos simulados de colisiones al estilo del CMS, ajusto verosimilitudes como un físico experimental y escribo cada cuaderno para que otra persona pueda aprender de él.",
  "about.exploring": "Análisis de eventos al estilo del CMS, redes neuronales paramétricas y estadística para física de partículas.",
  "about.teaching": "Ayudante de cátedra en la UEES desde 2024; también enseño matemáticas IB y Python.",
  "about.mission": "Inspirar a más personas en Latinoamérica a estudiar física y demostrar que se puede desde aquí.",
  "about.storytitle": "Mi historia con la física", "about.draftchip": "borrador · lo escribe Daniel",
  "journey.stop": "Parada 04 · Tierra", "journey.title": "Dónde he <em>estado</em>", "journey.peel": "← pasa el ratón o haz clic para despegarlas",
  "arc.eyebrow": "Nivel extra", "arc.title": "La ciencia es mejor cuando <em>juegas</em>.", "arc.lede": "Particle Invaders: detén los quarks que se acercan con fotones antes de que lleguen a tu detector. Hecho desde cero en un canvas, como el resto de esta página.",
  "arc.move": "mover", "arc.fire": "disparar", "arc.start": "empezar",
  "foot.big": "¿Te interesan las mismas preguntas? <em>Hablemos.</em>", "foot.built": "Hecho a mano con HTML, CSS y canvas · sin frameworks",
  "back.label": "Volver al universo", "m.prev": "anterior", "m.next": "siguiente"
};
const UI = {
  en: { all: "All", projects: "projects", project: "project", open: "Open ↗", did: "What I did", tech: "Built with", with: "With", code: "Code on GitHub", colab: "Open in Colab", figma: "Figma prototype", video: "Video presentation",
        company: "This code was built for a company, so I can't share it.", teamnote: "The repository belongs to the competition organisation.", copied: "Email copied", cvmsg: "My CV is being updated. Write to me meanwhile: daniel.vacavelastegui@gmail.com",
        draft: "DRAFT · Daniel", soundOn: "Sound on", soundOff: "Sound off", stop: "Stop", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · Spain" }, view: "View", arcade: "Arcade", bonus: "bonus" },
  es: { all: "Todos", projects: "proyectos", project: "proyecto", open: "Abrir ↗", did: "Qué hice", tech: "Hecho con", with: "Con", code: "Código en GitHub", colab: "Abrir en Colab", figma: "Prototipo en Figma", video: "Video de presentación",
        company: "Este código fue hecho para una empresa, por eso no puedo compartirlo.", teamnote: "El repositorio pertenece a la organización de la competencia.", copied: "Correo copiado", cvmsg: "Estoy actualizando mi CV. Mientras tanto, escríbeme: daniel.vacavelastegui@gmail.com",
        draft: "BORRADOR · Daniel", soundOn: "Sonido activado", soundOff: "Sonido apagado", stop: "Parada", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · España" }, view: "Ver", arcade: "Arcade", bonus: "extra" }
};
const T = () => UI[LANG];
const L = o => (o && typeof o === "object" && !Array.isArray(o)) ? (o[LANG] ?? o.en) : o;
const EN = {}, EN_TIP = {};
const TIP_ES = { "side.copy": "Copiar correo", "side.cv": "CV · actualizando" };
function captureEN() {
  $$("[data-i18n]").forEach(el => EN[el.dataset.i18n] = el.textContent);
  $$("[data-i18n-html]").forEach(el => EN[el.dataset.i18nHtml] = el.innerHTML);
  $$("[data-i18n-tip]").forEach(el => EN_TIP[el.dataset.i18nTip] = el.dataset.tip);
}
const langListeners = [];
function setLang(l) {
  LANG = l; store.set("dv_lang", l); document.documentElement.lang = l;
  const dict = l === "es" ? ES : EN;
  $$("[data-i18n]").forEach(el => { const v = dict[el.dataset.i18n]; if (v != null) el.textContent = v; });
  $$("[data-i18n-html]").forEach(el => { const v = dict[el.dataset.i18nHtml]; if (v != null) el.innerHTML = v; });
  $$("[data-i18n-tip]").forEach(el => { const v = (l === "es" ? TIP_ES : EN_TIP)[el.dataset.i18nTip]; if (v) { el.dataset.tip = v; el.setAttribute("aria-label", v); } });
  $$(".seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.lang === l));
  langListeners.forEach(f => f());
}

/* ---------- Sound (synthesised, off by default) ---------- */
const Sound = {
  on: false, ctx: null,
  ensure() { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.on = false; } } if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },
  tone(f, d = .08, type = "sine", vol = .05, f2) {
    if (!this.on || !this.ctx) return;
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
    o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + .02);
  },
  noise(d = .3, vol = .06, freq = 900) {
    if (!this.on || !this.ctx) return;
    const c = this.ctx, b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), data = b.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = "bandpass"; f.frequency.value = freq; g.gain.value = vol; s.buffer = b; s.connect(f).connect(g).connect(c.destination); s.start();
  },
  hover() { this.tone(1400, .04, "sine", .018); },
  click() { this.tone(660, .06, "triangle", .05); setTimeout(() => this.tone(990, .07, "triangle", .04), 45); },
  open() { this.noise(.35, .05, 600); this.tone(220, .3, "sine", .04, 440); },
  collide() { this.noise(.5, .09, 1800); this.tone(880, .45, "sawtooth", .025, 110); },
  shoot() { this.tone(1200, .07, "square", .02, 600); },
  boom() { this.noise(.18, .05, 500); },
  peel() { this.noise(.25, .05, 2600); },
  warp() { this.tone(80, 1.1, "sine", .06, 900); this.noise(1, .03, 300); }
};
function setSound(on) {
  Sound.on = on; if (on) Sound.ensure(); store.set("dv_sound", on); soundLabel();
  $("#soundIcon").innerHTML = on ? '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>' : '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 4 6M21 9l-4 6"/>';
  if (on) Sound.click();
}
function soundLabel() { const b = $("#soundBtn"); b.setAttribute("aria-pressed", Sound.on); b.setAttribute("aria-label", Sound.on ? T().soundOn : T().soundOff); }

/* ---------- Toast ---------- */
let toastEl;
function toast(msg) {
  if (!toastEl) { toastEl = document.createElement("div"); toastEl.setAttribute("role", "status"); toastEl.style.cssText = "position:fixed;left:50%;top:70px;transform:translateX(-50%);z-index:120;background:#e8edff;color:#07112c;padding:10px 18px;border-radius:999px;font-size:13.5px;font-weight:700;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:opacity .3s;max-width:90vw;text-align:center"; document.body.appendChild(toastEl); }
  toastEl.textContent = msg; toastEl.style.opacity = 1; clearTimeout(toastEl._t); toastEl._t = setTimeout(() => toastEl.style.opacity = 0, 2800);
}
async function copyEmail() {
  const mail = "daniel.vacavelastegui@gmail.com";
  try { await navigator.clipboard.writeText(mail); toast(T().copied + ": " + mail); }
  catch (e) { toast(mail); }
  Sound.click();
}

/* ===================== NAVIGATION: one index for everything ===================== */
/* The sidebar lists the universe stops (+ the arcade). The current stop follows you as you scroll. */
let CUR = 0;           // current stop index (0..LEVELS.length-1), or "arcade"
function renderNav() {
  const icons = {
    bh: '<circle cx="12" cy="12" r="3.5"/><ellipse cx="12" cy="12" rx="10" ry="3" />',
    cluster: '<circle cx="7" cy="8" r="2"/><circle cx="16" cy="7" r="1.5"/><circle cx="12" cy="15" r="2.5"/><circle cx="18" cy="16" r="1.2"/><circle cx="6" cy="17" r="1"/>',
    solar: '<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="9" stroke-dasharray="2 3"/><circle cx="20.5" cy="10" r="1.5"/>',
    earth: '<circle cx="12" cy="12" r="9"/><path d="M5 9c3 1 4-1 6 0s1 4 3 4 3-2 5-1M8 18c1-2 3-2 4-1"/>'
  };
  const a = LEVELS.map((l, i) => `<a href="${l.go}" data-stop="${i}"><svg viewBox="0 0 24 24">${icons[l.id]}</svg><span>${esc(L(l.sec))}</span><span class="sc">${esc(l.scale.replace("≈ ", ""))}</span></a>`).join("");
  $("#nav").innerHTML = a + `<div class="sep"></div><a href="#arcade" data-stop="arcade"><svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2"/><rect x="8" y="4" width="8" height="7"/><path d="M9 15h2M10 14v2M14 15h1"/></svg><span>${T().arcade}</span><span class="sc">${T().bonus}</span></a>`;
  $$("#nav a").forEach(a => a.addEventListener("click", e => {
    e.preventDefault(); Sound.click(); const s = a.dataset.stop;
    if (s === "arcade") return scrollToSel("#arcade");
    const i = +s; if (i === 0) { scrollToSel("#universe"); Uni.go(0); } else { Uni.jump(i); scrollToSel(LEVELS[i].go); }
  }));
  markNav();
}
function setCurrent(i) { if (CUR === i) return; CUR = i; markNav(); }
function markNav() {
  $$("#nav a").forEach(a => a.classList.toggle("active", a.dataset.stop === String(CUR)));
  const l = typeof CUR === "number" ? LEVELS[CUR] : null;
  $("#hereName").textContent = l ? `${L(l.name)} · ${L(l.sec)}` : T().arcade;
  $("#hereScale").textContent = l ? l.scale.replace("≈ ", "") : "";
  $("#hereBar").style.width = (l ? (CUR + 1) / LEVELS.length * 100 : 100) + "%";
  $("#backStop").textContent = Uni ? L(LEVELS[Uni.i].name) : "";
}
function initSpy() {
  const map = { universe: null, work: 1, about: 2, journey: 3, arcade: "arcade" };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; const id = e.target.id, v = map[id];
    if (id === "universe") setCurrent(Uni.i);
    else { if (typeof v === "number") Uni.jump(v); setCurrent(v); }
  }), { rootMargin: "-40% 0px -55% 0px" });
  Object.keys(map).forEach(id => io.observe($("#" + id)));
  // "Back to the universe" pill: visible whenever the map is out of view
  const pill = $("#backUni");
  new IntersectionObserver(es => pill.classList.toggle("show", !es[0].isIntersecting && scrollY > 200), { threshold: 0 }).observe($("#uniBox"));
  pill.onclick = () => { Sound.click(); scrollToSel("#universe"); };
}

/* ===================== WORK: filters, grid, modal ===================== */
let FILTER = "all", PLACE = "all";
function visibleProjects() { return PROJECTS.filter(p => (FILTER === "all" || p.theme === FILTER) && (PLACE === "all" || p.place === PLACE)); }
function renderFilters() {
  const f = $("#filters");
  const btn = (key, label, n, kind, color) => `<button class="fbtn" type="button" data-${kind}="${key}" aria-pressed="${(kind === "theme" ? FILTER : PLACE) === key}">${color ? `<span class="d" style="background:${color}"></span>` : ""}${esc(label)}<span class="c">${n}</span></button>`;
  let h = btn("all", T().all, PROJECTS.length, "theme");
  for (const k in THEMES) h += btn(k, L(THEMES[k]), PROJECTS.filter(p => p.theme === k).length, "theme", THEMES[k].color);
  h += '<span class="sep" aria-hidden="true"></span>';
  h += btn("uees", "UEES", PROJECTS.filter(p => p.place === "uees").length, "place");
  h += btn("uniovi", "Uniovi", PROJECTS.filter(p => p.place === "uniovi").length, "place");
  f.innerHTML = h;
  $$("[data-theme]", f).forEach(b => b.onclick = () => { FILTER = b.dataset.theme; renderFilters(); renderGrid(); Sound.click(); });
  $$("[data-place]", f).forEach(b => b.onclick = () => { PLACE = PLACE === b.dataset.place ? "all" : b.dataset.place; renderFilters(); renderGrid(); Sound.click(); });
}
function cardHTML(p) {
  const screen = p.anim
    ? `<div class="screen"><canvas data-anim="${p.anim}" aria-hidden="true"></canvas><span class="open">${T().open}</span></div>`
    : `<div class="screen"><img src="${p.img}" alt="" loading="lazy"><span class="open">${T().open}</span></div>`;
  const award = p.award ? `<span class="tag award">★ ${esc(L(p.award))}</span>` : "";
  return `<button class="win${p.feat ? " feat" : ""}" type="button" data-id="${p.id}" aria-label="${esc(L(p.title))}">
    <div class="win-bar"><i></i><i></i><i></i><span>${esc(p.file)}</span></div>${screen}
    <div class="win-body"><div class="win-meta">${award}<span class="tag place-${p.place}">${p.place === "uees" ? "UEES" : "Uniovi"}</span><span class="tag">${esc(L(THEMES[p.theme]))}</span><span class="tag">${p.year}</span>${p.company ? `<span class="tag lock">${LANG === "es" ? "empresa" : "company"}</span>` : ""}</div>
    <h3>${esc(L(p.title))}</h3><p>${esc(L(p.short))}</p></div></button>`;
}
function renderGrid() {
  const g = $("#grid");
  g.innerHTML = visibleProjects().map(cardHTML).join("");
  $$(".win", g).forEach(w => { w.onclick = () => openModal(w.dataset.id); w.onmouseenter = () => Sound.hover(); });
  Previews.scan(g);
}
function goFilter(theme) {
  FILTER = theme; PLACE = "all"; renderFilters(); renderGrid(); Uni.jump(1); scrollToSel("#work");
}

let MODAL_LIST = [], MODAL_I = 0, modalAnim = null, lastFocus = null;
function openModal(id) {
  MODAL_LIST = visibleProjects(); if (!MODAL_LIST.find(p => p.id === id)) MODAL_LIST = PROJECTS.slice();
  MODAL_I = MODAL_LIST.findIndex(p => p.id === id);
  lastFocus = document.activeElement;
  $("#modal").classList.add("open"); document.body.style.overflow = "hidden";
  fillModal(); Sound.open(); $("#mClose").focus();
}
function fillModal() {
  const p = MODAL_LIST[MODAL_I], t = T();
  const hero = $("#mHero");
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  hero.className = "m-hero" + (!p.video && p.img && p.plot ? " plot" : "");
  if (p.video) hero.innerHTML = `<video src="${p.video}" poster="${p.img || ""}" autoplay muted loop playsinline aria-label="${esc(L(p.title))}"></video>`;
  else if (p.img) hero.innerHTML = `<img src="${p.img}" alt="${esc(L(p.title))}">`;
  else { hero.innerHTML = `<canvas data-anim="${p.anim}" aria-hidden="true"></canvas>`; modalAnim = $("canvas", hero); Previews.add(modalAnim, true); }
  const linkBtn = l => {
    const lab = { github: t.code, colab: t.colab, figma: t.figma, video: t.video }[l.t];
    const ic = l.t === "github" ? '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>' : '<path d="M7 17 17 7M8 7h9v9"/>';
    return `<a class="btn${l.t === "github" ? "" : " ghost"}" href="${l.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24">${ic}</svg>${lab}</a>`;
  };
  const did = L(p.did) || [];
  const people = (p.people || []).map(k => `<a href="${PEOPLE[k][1]}" target="_blank" rel="noopener">${PEOPLE[k][0]}</a>`).join(", ");
  let links = p.links.map(linkBtn).join("");
  if (p.company) links += `<div class="private-note"><span aria-hidden="true">🏢</span><span>${t.company}</span></div>`;
  if (p.teamRepoNote) links += `<div class="private-note"><span aria-hidden="true">ℹ</span><span>${t.teamnote}</span></div>`;
  $("#mBody").innerHTML = `<div>
      <div class="m-top">${p.award ? `<span class="tag award">★ ${esc(L(p.award))}</span>` : ""}<span class="tag place-${p.place}">${t.place[p.place]}</span><span class="tag">${esc(L(THEMES[p.theme]))}</span><span class="tag">${p.year}</span></div>
      <h2 id="m-title">${esc(L(p.title))}</h2><p class="desc">${esc(L(p.desc))}</p>
      <h4>${t.did}</h4><ul>${did.map(d => `<li>${esc(d)}</li>`).join("")}</ul></div>
    <div class="m-side"><div class="m-links">${links}</div>
      <div><h4>${t.tech}</h4><div class="techs">${p.tech.map(x => `<span>${esc(x)}</span>`).join("")}</div></div>
      ${people ? `<p class="people">${t.with}: ${people}</p>` : ""}</div>`;
  $("#mCount").textContent = String(MODAL_I + 1).padStart(2, "0") + " / " + String(MODAL_LIST.length).padStart(2, "0");
  $("#mDots").innerHTML = MODAL_LIST.map((_, i) => `<i class="${i === MODAL_I ? "on" : ""}"></i>`).join("");
  $("#mPanel").scrollTop = 0;
}
function closeModal() {
  $("#modal").classList.remove("open"); document.body.style.overflow = "";
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  $("#mHero").innerHTML = "";
  if (lastFocus) lastFocus.focus();
}
function stepModal(d) { MODAL_I = (MODAL_I + d + MODAL_LIST.length) % MODAL_LIST.length; fillModal(); Sound.click(); }

/* ===================== ABOUT (mosaic), JOURNEY ===================== */
function renderBento() {
  $("#bento").innerHTML = BENTO.map((b, i) => {
    const cls = "tile " + b.size;
    if (b.quote) return `<div class="${cls}"><span>${esc(L(b.quote))}</span><small>— Daniel</small></div>`;
    const inner = `<span class="no">0${i + 1}</span><h4>${esc(L(b.t))}</h4><p>${LOREM}</p><span class="q">${esc(L(b.q))}</span>`;
    if (b.size.includes("photo")) return `<div class="${cls}" tabindex="0"><div class="ph">${esc(L(b.ph))}</div><div class="cap">${inner}</div></div>`;
    return `<div class="${cls}" tabindex="0">${inner}</div>`;
  }).join("");
}
function renderTimeline() {
  $("#timeline").innerHTML = TIMELINE.map(it => {
    const long = it.mark.length > 2;
    const thumb = it.draft && it.mark === "?" ? `<div class="t-thumb photo-todo">${LANG === "es" ? "foto por añadir" : "photo to add"}</div>` : `<div class="t-thumb" style="${long ? "font-size:15px" : ""}">${esc(it.mark)}</div>`;
    const action = it.open ? `<button class="chip-btn" data-open="${it.open}">${T().view} ↗</button>` : it.filter ? `<button class="chip-btn" data-filter="${it.filter}">${T().view} ↗</button>` : "";
    const text = it.draft ? L(it.text).replace(/^(DRAFT|BORRADOR) · Daniel:\s*/, "") : L(it.text);
    return `<div class="t-item${it.hl ? " hl" : ""}"><div class="t-year">${esc(L(it.when))}</div><div class="t-line"></div>
      <div class="t-body">${thumb}<div><h3>${esc(L(it.title))}${it.org ? ` <span>· ${esc(it.org)}</span>` : ""}</h3>
      <p${it.draft ? ` class="draft" data-draft="${T().draft}"` : ""}>${esc(text)}</p>${action}</div></div></div>`;
  }).join("");
  $$("#timeline [data-open]").forEach(b => b.onclick = () => openModal(b.dataset.open));
  $$("#timeline [data-filter]").forEach(b => b.onclick = () => goFilter(b.dataset.filter));
}
/* Inspiration shelf: kept for later, not rendered while SHOW_INSPIRATION is false */
function renderShelf(target) {
  if (!SHOW_INSPIRATION || !target) return;
  target.innerHTML = SHELF.books.map(h => `<div class="spine" style="height:${h}px">add a book</div>`).join("");
}

/* ---------- Stickers: peel, then they stick back by themselves ---------- */
function initStickers() {
  $$(".sticker").forEach(s => {
    let t;
    const peel = () => { if (s.classList.contains("peel")) return; s.classList.add("peel"); Sound.peel(); clearTimeout(t); t = setTimeout(() => s.classList.remove("peel"), REDUCED ? 600 : 1100); };
    s.addEventListener("click", peel);
    s.addEventListener("mouseenter", () => { if (FINE) peel(); });
  });
}
