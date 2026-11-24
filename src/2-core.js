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
  c.width = Math.max(1, Math.round(w * DPR)); c.height = Math.max(1, Math.round(h * DPR));
  const ctx = c.getContext("2d"); ctx.setTransform(DPR, 0, 0, DPR, 0, 0); return ctx;
}
function esc(s) { return String(s).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m])); }

/* ---------- Language ---------- */
let LANG = "en";   // always opens in English; ES translates for this visit
const ES = {
  "intro.skip": "Saltar intro", "intro.chapter": "Capítulo I", "intro.pagetitle": "Hacia el horizonte de sucesos",
  "intro.sub": "Mi Portafolio", "arc.play": "Empezar", "hero.mail": "Correo", "arc.help": "<span><kbd>←</kbd> <kbd>→</kbd> mover</span><span><kbd>Espacio</kbd> disparar fotones</span><span><kbd>Esc</kbd> salir</span>",
  "hero.fall": "Déjate caer", "intro.subsmall": "física · IA · datos", "intro.open": "Abrir el libro", "intro.hint": "o pulsa Enter",
  "top.back": "Universo", "hero.line": "<b>Ingeniería en Computación</b> · <span class=\"c1\">Física</span> · <span class=\"c2\">IA</span> · <span class=\"c3\">Datos</span>",
  "home.hint": "haz scroll ↕ o usa las flechas para viajar",
  "work.title": "Cosas que he <em>construido</em>",
  "about.title": "Cómo la física me <em>encontró</em>",
  "about.p": "Estudio <strong>ingeniería en computación</strong> en Guayaquil, Ecuador. Desde pequeño siempre fui apasionado por la tecnología y la ciencia, en especial por la física. No pudiendo estudiar física a nivel universitario, la busqué por mi cuenta mediante libros, videos y aprovechando cualquier oportunidad para aprender más. Fui parte del club de física de mi colegio, donde obtuve <strong>2 medallas en olimpiadas nacionales de física</strong> (bronce 2022 y plata 2023).<br><br>Luego, al entrar a la universidad, he fungido como <strong>ayudante de cátedra de Física y Matemáticas</strong>, y dando clases he ayudado a decenas de estudiantes, manteniendo viva mi pasión por enseñar y aprender más. Durante mi intercambio en la <strong>Universidad de Oviedo</strong> he aprendido física desde un lado más académico, y descubrí cómo mi carrera, la ciencia de datos y la física de partículas se pueden complementar entre sí.",
  "about.pass": "PASE DE ACCESO", "about.passrole": "Ingeniería en Computación · UEES → Universidad de Oviedo", "about.passscan": "escanea · LinkedIn", "about.passmission": "MISIÓN", "about.passhint": "clic para abrir",
  "about.mission": "Inspirar la pasión por la física, la ciencia y la tecnología a más estudiantes en Latinoamérica. Mostrar lo maravilloso que puede ser dejarse llevar por la curiosidad y arriesgarse con todo a aprender.",
  "about.smtitle": "El modelo estándar de mi historia", "about.draftchip": "borrador · textos por escribir",
  "journey.title": "Dónde he <em>estado</em>", "journey.peel": "psst: haz clic en una pegatina",
  "arc.title": "La ciencia es mejor cuando <em>juegas</em>.", "arc.lede": "Particle Invaders: detén los quarks que se acercan con fotones antes de que lleguen a tu detector.",
  "arc.move": "mover", "arc.fire": "disparar", "arc.start": "empezar",
  "contact.big": "¿Te interesan las mismas preguntas? <em>Hablemos.</em>", "contact.copy": "Copiar correo", "contact.back": "Volver al universo",
  "m.prev": "anterior", "m.next": "siguiente"
};
const UI = {
  en: { all: "All", projects: "projects", project: "project", did: "What I did", tech: "Built with", with: "With", code: "Code on GitHub", colab: "Open in Colab", figma: "Figma prototype", video: "Video presentation",
        company: "This code was built for a company, so I can't share it.", teamnote: "The repository belongs to the competition organisation.", copied: "Email copied", cvmsg: "My CV is being updated. Write to me meanwhile: daniel.vacavelastegui@gmail.com",
        soundOn: "Sound on", soundOff: "Sound off", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · Spain" }, view: "View",
        nav: { universe: "Universe", work: "Work", about: "About", journey: "Journey", arcade: "Arcade" }, explored: "Explored",
        enter: "click to enter", tapEnter: "tap again to enter", play: "click to play", tapPlay: "tap again to play", next: "Next", unexplored: "Unexplored",
        smEmpty: "Click a particle to read that part of the story.", smPhrase: "Short phrase to write here.", smFuture: "Space for what comes next.",
        aboutP: "About me", projOne: "project", projMany: "projects", techHint: "psst: click any technology to see the projects where I used it ↗", aboutSub: "my story as a standard model", left: "unexplored", bhTip: "drag to rotate · click to fall in",
        nextK: "Next stop", travel: "Travel there →", nextSolar: "Solar System · about me", nextEarth: "Earth · my journey", nextSat: "The satellite · arcade", nextBh: "Back to the black hole", journeyP: "My journey", journeySub: "Guayaquil → Oviedo", arcadeP: "Arcade", arcadeSub: "Particle Invaders", me: "me", satellite: "Arcade" },
  es: { all: "Todos", projects: "proyectos", project: "proyecto", did: "Qué hice", tech: "Hecho con", with: "Con", code: "Código en GitHub", colab: "Abrir en Colab", figma: "Prototipo en Figma", video: "Video de presentación",
        company: "Este código fue hecho para una empresa, por eso no puedo compartirlo.", teamnote: "El repositorio pertenece a la organización de la competencia.", copied: "Correo copiado", cvmsg: "Estoy actualizando mi CV. Mientras tanto, escríbeme: daniel.vacavelastegui@gmail.com",
        soundOn: "Sonido activado", soundOff: "Sonido apagado", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · España" }, view: "Ver",
        nav: { universe: "Universo", work: "Proyectos", about: "Sobre mí", journey: "Trayectoria", arcade: "Arcade" }, explored: "Explorado",
        enter: "haz clic para entrar", tapEnter: "toca otra vez para entrar", play: "haz clic para jugar", tapPlay: "toca otra vez para jugar", next: "Siguiente", unexplored: "Sin explorar",
        smEmpty: "Haz clic en una partícula para leer esa parte de la historia.", smPhrase: "Frase corta por escribir aquí.", smFuture: "Espacio para lo que viene.",
        aboutP: "Sobre mí", projOne: "proyecto", projMany: "proyectos", techHint: "psst: haz clic en cualquier tecnología para ver los proyectos donde la usé ↗", aboutSub: "mi historia como un modelo estándar", left: "sin explorar", bhTip: "arrastra para girarlo · clic para caer",
        nextK: "Siguiente parada", travel: "Viajar allí →", nextSolar: "Sistema Solar · sobre mí", nextEarth: "Tierra · mi trayectoria", nextSat: "El satélite · arcade", nextBh: "Volver al agujero negro", journeyP: "Mi trayectoria", journeySub: "Guayaquil → Oviedo", arcadeP: "Arcade", arcadeSub: "Particle Invaders", me: "yo", satellite: "Arcade" }
};
const T = () => UI[LANG];
const L = o => (o && typeof o === "object" && !Array.isArray(o)) ? (o[LANG] ?? o.en) : o;
const EN = {}, EN_TIP = {};
const TIP_ES = { "tip.copy": "Copiar correo", "tip.cv": "CV · actualizando" };
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
    try {
      const c = this.ctx, o = c.createOscillator(), g = c.createGain(), t = c.currentTime;
      o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + .02);
    } catch (e) {}
  },
  noise(d = .3, vol = .06, freq = 900) {
    if (!this.on || !this.ctx) return;
    try {
      const c = this.ctx, b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), data = b.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      f.type = "bandpass"; f.frequency.value = freq; g.gain.value = vol; s.buffer = b; s.connect(f).connect(g).connect(c.destination); s.start();
    } catch (e) {}
  },
  hover() { this.tone(1400, .04, "sine", .018); },
  click() { this.tone(660, .06, "triangle", .05); setTimeout(() => this.tone(990, .07, "triangle", .04), 45); },
  open() { this.noise(.35, .05, 600); this.tone(220, .3, "sine", .04, 440); },
  collide() { this.noise(.5, .09, 1800); this.tone(880, .45, "sawtooth", .025, 110); },
  shoot() { this.tone(1200, .07, "square", .02, 600); },
  boom() { this.noise(.18, .05, 500); },
  peel() { this.noise(.25, .05, 2600); },
  /* sticky tape coming off: crackly noise whose band rises as the corner lifts, lasting as long as the fold (d seconds) */
  rip(d = .9) {
    if (!this.on || !this.ctx) return;
    try {
      const c = this.ctx, t = c.currentTime, n = Math.floor(c.sampleRate * d), b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
      let crack = 0;
      for (let i = 0; i < n; i++) {
        const p = i / n; if (Math.random() < .0016 + p * .004) crack = 1; crack *= .985;
        x[i] = (Math.random() * 2 - 1) * (.18 + .55 * crack) * Math.min(1, p * 6) * (p > .9 ? (1 - p) * 10 : 1);
      }
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      f.type = "bandpass"; f.Q.value = .9; f.frequency.setValueAtTime(700, t); f.frequency.exponentialRampToValueAtTime(3400, t + d);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16, t + d * .7); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      src.buffer = b; src.connect(f).connect(g).connect(c.destination); src.start(t);
    } catch (e) {}
  },
  stick() { this.noise(.08, .04, 1200); this.tone(320, .09, "sine", .03, 180); },
  warp() { this.tone(80, 1.1, "sine", .06, 900); this.noise(1, .03, 300); },
  portal() { this.tone(520, .25, "sine", .025, 1040); }
};
function setSound(on) {
  Sound.on = on; if (on) Sound.ensure(); store.set("dv_sound", on); soundLabel();
  $("#soundIcon").innerHTML = on ? '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>' : '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="m17 9 4 6M21 9l-4 6"/>';
  if (on) Sound.click();
}
function soundLabel() { const b = $("#soundBtn"); b.setAttribute("aria-pressed", Sound.on); b.setAttribute("aria-label", Sound.on ? T().soundOn : T().soundOff); }

function toast(msg) {
  const el = $("#toast"); el.textContent = msg; el.classList.add("on");
  clearTimeout(toast._t); toast._t = setTimeout(() => el.classList.remove("on"), 2800);
}
async function copyEmail() {
  const mail = "daniel.vacavelastegui@gmail.com";
  try { await navigator.clipboard.writeText(mail); toast(T().copied + ": " + mail); }
  catch (e) { toast(mail); }
  Sound.click();
}

/* ===================== EXPLORED: nothing goes unseen ===================== */
/* 9 places: 6 galaxies, the Sun (About), the Earth (Journey) and the satellite (Arcade). Saved in this browser. */
const Visited = {
  set: new Set(store.get("dv_seen", []).filter(k => PLACES_TO_SEE.includes(k))),
  has(k) { return this.set.has(k); },
  mark(k) {
    if (!PLACES_TO_SEE.includes(k) || this.set.has(k)) return;
    this.set.add(k); store.set("dv_seen", [...this.set]); this.paint();
  },
  galaxiesLeft() { return Object.keys(THEMES).filter(k => !this.set.has(k)).length; },
  paint() {
    const n = this.set.size, N = PLACES_TO_SEE.length;
    $("#explored").innerHTML = `${T().explored} <b>${n}/${N}</b>${n === N ? " ✓" : ""}`;
    const left = N - n, ln = $("#leftN"); ln.textContent = left ? `${left} ${T().left}` : ""; ln.style.display = left ? "" : "none";
    renderNav();
    if (typeof Uni !== "undefined" && Uni.c) Uni.ui();
  }
};

/* ===================== ROUTER: the universe is the menu, sections are sub-pages ===================== */
const VIEWS = ["work", "about", "journey", "arcade"];
const VIEW_LEVEL = { work: 1, about: 2, journey: 3, arcade: 3 };
let CURVIEW = null;
function renderNav() {
  const t = T(), dot = v => {
    const todo = v === "work" ? Visited.galaxiesLeft() > 0 : v !== "universe" && !Visited.has(v);
    return todo ? '<span class="nv" aria-hidden="true"></span>' : "";
  };
  $("#tnav").innerHTML = ["universe", ...VIEWS].map(v => `<a href="#${v}" data-v="${v}"${(CURVIEW || "universe") === v ? ' class="active" aria-current="page"' : ""}>${t.nav[v]}${dot(v)}</a>`).join("");
}
/* "Next stop" card at the end of each sub-page: goes back to the universe and travels on from there */
const NEXT = { work: { level: 2, art: "sun", k: "nextSolar" }, about: { level: 3, art: "earth", k: "nextEarth" }, journey: { level: 3, art: "sat", k: "nextSat", portal: "sat" }, arcade: { level: 0, art: "bh", k: "nextBh" } };
function renderNext() {
  $$(".view").forEach(v => {
    const n = NEXT[v.dataset.view], b = $("[data-next]", v); if (!n || !b) return;
    b.innerHTML = `<span class="k">${T().nextK}</span><span class="lbl">${esc(T()[n.k])}</span><span class="path"></span><span class="art ${n.art}"><i></i></span><span class="go">→</span>`;
    b.onclick = () => { Sound.click(); Uni.pending = { level: n.level, portal: n.portal }; goHome(); };
  });
}
function goHome() { if (location.hash && location.hash !== "#universe") location.hash = "universe"; else route(); }
function route() {
  const [v, sub] = location.hash.slice(1).split("/");
  if (VIEWS.includes(v)) enterView(v, sub); else enterHome();
}
function enterView(v, sub) {
  if ($("#modal").classList.contains("open")) closeModal(true);
  if (v === "work") {
    FILTER = THEMES[sub] ? sub : "all"; renderFilters(); renderGrid();
    if (THEMES[sub]) Visited.mark(sub);
  } else Visited.mark(v);
  const prev = CURVIEW; CURVIEW = v;
  if (!prev) {               // from the universe: zoom into the object, then the page appears
    Uni.jump(VIEW_LEVEL[v]); Uni.zoomIn(); Portal.hide();
    document.body.classList.add("in-view");
  } else if (prev !== v) $("#v-" + prev).classList.remove("on");
  const el = $("#v-" + v); el.scrollTop = 0; el.classList.add("on");
  Game.setVis(v === "arcade");
  renderNav(); Sound.open();
  setTimeout(() => { const h = $("h2", el); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }, 50);
}
function enterHome() {
  if (CURVIEW) { $("#v-" + CURVIEW).classList.remove("on"); CURVIEW = null; document.body.classList.remove("in-view"); Uni.zoomOut(); Sound.open(); }
  Game.setVis(false); renderNav(); Uni.start();
}

/* ===================== WORK: filters, grid, modal ===================== */
let FILTER = "all";
function visibleProjects() { return PROJECTS.filter(p => FILTER === "all" || p.theme === FILTER); }
function renderFilters() {
  const f = $("#filters");
  const btn = (key, label, color) => `<button class="fbtn" type="button" data-theme="${key}" aria-pressed="${FILTER === key}">${color ? `<span class="d" style="background:${color}"></span>` : ""}${esc(label)}</button>`;
  f.innerHTML = btn("all", T().all) + Object.keys(THEMES).map(k => btn(k, L(THEMES[k]), THEMES[k].color)).join("");
  $$("[data-theme]", f).forEach(b => b.onclick = () => {
    FILTER = b.dataset.theme; Sound.click();
    history.replaceState(null, "", "#work" + (FILTER === "all" ? "" : "/" + FILTER));
    if (FILTER !== "all") Visited.mark(FILTER);
    renderFilters(); renderGrid();
  });
}
function cardHTML(p, i) {
  const screen = p.anim && !p.img
    ? `<div class="screen"><canvas data-anim="${p.anim}" aria-hidden="true"></canvas></div>`
    : p.anim ? `<div class="screen"><canvas data-anim="${p.anim}" aria-hidden="true"></canvas></div>`
    : `<div class="screen"><img src="${p.img}" alt="" loading="lazy"></div>`;
  const first = p.award ? `<span class="tag award">★ ${esc(L(p.award))}</span>` : `<span class="tag">${esc(L(THEMES[p.theme]))}</span>`;
  return `<button class="win${p.feat ? " feat" : ""}" type="button" data-id="${p.id}" style="animation-delay:${Math.min(i, 12) * 35}ms">${screen}
    <div class="win-body"><div class="win-meta">${first}<span class="tag place-${p.place}">${p.place === "uees" ? "UEES" : "Uniovi"}</span></div>
    <h3>${esc(L(p.title))}</h3></div></button>`;
}
function renderGrid() {
  const g = $("#grid");
  g.innerHTML = visibleProjects().map(cardHTML).join("");
  $$(".win", g).forEach(w => { w.onclick = () => openModal(w.dataset.id); w.onmouseenter = () => Sound.hover(); });
  Previews.scan(g);
}

let MODAL_LIST = [], MODAL_I = 0, modalAnim = null, lastFocus = null;
function openModal(id) {
  MODAL_LIST = visibleProjects(); if (!MODAL_LIST.find(p => p.id === id)) MODAL_LIST = PROJECTS.slice();
  MODAL_I = MODAL_LIST.findIndex(p => p.id === id);
  lastFocus = document.activeElement;
  $("#modal").classList.add("open");
  fillModal(); Sound.open(); $("#mClose").focus();
}
function fillModal() {
  const p = MODAL_LIST[MODAL_I], t = T();
  Visited.mark(p.theme);
  const hero = $("#mHero");
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  hero.className = "m-hero" + (!p.video && p.img && p.plot ? " plot" : "") + (p.gallery ? " gal" : "") + (p.video ? " vid" : "");
  if (p.video) hero.innerHTML = `<video src="${p.video}" poster="${p.img || ""}" autoplay muted loop playsinline aria-label="${esc(L(p.title))}"></video>`;
  else if (p.gallery) {
    let gi = 0; const show = () => { $("img", hero).src = p.gallery[gi]; $$(".g-dots i", hero).forEach((d, k) => d.classList.toggle("on", k === gi)); };
    hero.innerHTML = `<img src="${p.gallery[0]}" alt="${esc(L(p.title))}"><button class="g-nav prev" aria-label="previous image">‹</button><button class="g-nav next" aria-label="next image">›</button><div class="g-dots">${p.gallery.map(() => "<i></i>").join("")}</div>`;
    $(".g-nav.prev", hero).onclick = () => { gi = (gi - 1 + p.gallery.length) % p.gallery.length; show(); Sound.click(); };
    $(".g-nav.next", hero).onclick = () => { gi = (gi + 1) % p.gallery.length; show(); Sound.click(); };
    show();
  }
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
  if (p.company) links += `<div class="note"><span aria-hidden="true">🏢</span><span>${t.company}</span></div>`;
  if (p.teamRepoNote) links += `<div class="note"><span aria-hidden="true">ℹ</span><span>${t.teamnote}</span></div>`;
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
function closeModal(silent) {
  $("#modal").classList.remove("open");
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  $("#mHero").innerHTML = "";
  if (lastFocus && !silent) lastFocus.focus();
}
function stepModal(d) { MODAL_I = (MODAL_I + d + MODAL_LIST.length) % MODAL_LIST.length; fillModal(); Sound.click(); }

/* ===================== ABOUT: the standard model of my story ===================== */
let SM_SEL = null;
function renderStory() {
  const G = STORY_GROUPS;
  let h = `<span class="gl" style="--c:${G.q.c};grid-row:1;grid-column:1">${esc(L(G.q))}</span><span class="gl" style="--c:${G.l.c};grid-row:2;grid-column:1">${esc(L(G.l))}</span>`;
  h += STORY.map(s => {
    const pos = s.g === "h" ? "grid-row:1/3;grid-column:7" : `grid-row:${s.row};grid-column:${s.col}`;
    if (s.empty) return `<div class="cell empty" style="--c:${G[s.g].c};${pos}" aria-hidden="true"><span class="yr">20··</span><span class="sy">?</span><span class="nm">…</span></div>`;
    return `<button type="button" class="cell${s.g === "h" ? " higgs" : ""}" data-s="${s.id}" style="--c:${G[s.g].c};${pos}" aria-pressed="${SM_SEL === s.id}"><span class="yr">${esc(s.yr)}</span><span class="sy">${esc(s.sy)}</span><span class="nm">${esc(L(s.n))}</span></button>`;
  }).join("");
  h += `<span class="gb2" style="grid-row:3;grid-column:5;--c:${G.b.c}">${esc(L(G.b))}</span><span class="gb2" style="grid-row:3;grid-column:7;--c:${G.h.c}">${esc(L(G.h))}</span>`;
  $("#smTable").innerHTML = h;
  $$("#smTable [data-s]").forEach(b => { b.onclick = () => { SM_SEL = b.dataset.s; Sound.click(); renderStory(); }; b.onmouseenter = () => Sound.hover(); });
  const p = $("#smPanel"), s = STORY.find(x => x.id === SM_SEL);
  if (!s) { p.className = "sm-panel empty"; p.innerHTML = esc(T().smEmpty); return; }
  p.className = "sm-panel"; p.style.setProperty("--c", G[s.g].c);
  const paras = s.tech ? techPanel() : s.phrase ? richText(L(s.phrase)) : `<p class="draft">${esc(T().smPhrase)}</p>`;
  const items = (s.imgs || []).map(x => typeof x === "string" ? { u: x } : x);
  const media = s.tech ? "" : items.length ? `<div class="ph has"><img class="${items[0].page ? "fit" : ""}" src="${items[0].u}" alt="${esc(L(s.t))}" loading="lazy">${items.length > 1 ? `<div class="thumbs">${items.map((it, k) => `<button type="button" data-k="${k}"${it.page ? ' class="pg"' : ""} aria-pressed="${!k}" aria-label="${k + 1}/${items.length}"><img src="${it.u}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}</div>` : `<div class="ph sym" aria-hidden="true">${esc(s.sy)}</div>`;
  const link = s.link ? `<a class="chip-btn" href="${s.link.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${esc(L(s.link.t))}</a>` : "";
  p.classList.toggle("tech", !!s.tech);
  p.innerHTML = `${media}<div><h4><i>${esc(s.sy)}</i>${esc(L(s.t))}</h4>${paras}${link}</div>`;
  if (s.tech) {
    $$("[data-q]", p).forEach(b => b.onclick = () => {
      Sound.click(); const u = TECH_URL[b.dataset.q.toLowerCase()];
      if (u) { window.open(u, "_blank", "noopener"); return; }
      location.hash = "work"; setTimeout(() => techFilter(b.dataset.q), 450);
    });
    if (!store.get("dv_tech_hint", false)) { store.set("dv_tech_hint", true); const c = $(".tch", p); if (c) c.classList.add("hint"); }
    return;
  }
  if (!items.length) return;
  const main = $(".ph > img", p), btns = $$(".thumbs button", p);
  const show = k => { swapImg(main, items[k].u, items[k].page); btns.forEach((x, j) => x.setAttribute("aria-pressed", j === k)); };
  const r = Rot.make($(".ph", p), items.length, show);
  btns.forEach(b => b.onclick = () => { r.go(+b.dataset.k); Sound.click(); });
  main.onclick = () => lightbox(main.src);
}

/* Story text: blank line = new paragraph, **x** = highlighted in the particle colour,
   a paragraph that starts with "> " is a quote (its "— author" line becomes the citation) */
function richText(t) {
  const inl = x => esc(x).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>");
  return t.split("\n\n").map(par => {
    if (par.startsWith("> ")) { const [q, ...au] = par.slice(2).split("\n"); return `<blockquote class="sq"><p>${inl(q)}</p>${au.length ? `<cite>${inl(au.join(" "))}</cite>` : ""}</blockquote>`; }
    return `<p>${inl(par)}</p>`;
  }).join("");
}
/* Tc particle: two rows of logos drifting in opposite directions, then the whole list by category */
function techPanel() {
  const all = TECH.flatMap(c => c.items), logos = all.filter(i => i.s);
  const lum = h => { const n = parseInt(h.slice(1), 16), r = n >> 16, g = n >> 8 & 255, b = n & 255; return (r * .3 + g * .59 + b * .11) / 255; };
  const tip = i => { const u = TECH_URL[i.n.toLowerCase()], n = techProjects(i.n).length; return u ? "GitHub ↗" : `${n} ${n === 1 ? T().projOne : T().projMany} →`; };
  const chip = i => `<button type="button" class="tk" data-q="${esc(i.n)}" data-cnt="${esc(tip(i))}" style="--h:${lum(i.hex) < .28 ? "#f4f1ea" : i.hex}"><span class="ic" style="--m:url(assets/tech/${i.s}.svg)"></span><span class="nm">${esc(i.n)}</span></button>`;
  const half = Math.ceil(logos.length / 2), rows = [logos.slice(0, half), logos.slice(half)];
  const strip = rows.map((r, k) => `<div class="tmq"><div class="ttr${k ? " rv" : ""}">${r.map(chip).join("")}${r.map(chip).join("").replace(/<button /g, '<button tabindex="-1" aria-hidden="true" ')}</div></div>`).join("");
  const table = `<div class="ttab">${TECH.map(c => `<span class="tcat">${esc(L(c.n))}</span><span class="tval">${c.items.map(i => `<button type="button" class="tch" data-q="${esc(i.n)}" data-cnt="${esc(tip(i))}">${esc(i.n)}</button>`).join("")}</span>`).join("")}</div>`;
  return `<p class="tpsst">${esc(T().techHint)}</p>` + strip + table;
}
/* Which projects use a technology (chip name → project ids) */
function techProjects(q) {
  const key = q.split(" /")[0].toLowerCase();
  if (key === "jupyter") return PROJECTS.filter(p => /\.ipynb$/.test(p.file || "")).map(p => p.id);
  const tok = t => t.toLowerCase().split(/[^a-z0-9#+.]+/).filter(Boolean);
  return PROJECTS.filter(p => (p.tech || []).some(t => t.toLowerCase() === key || tok(t).includes(key))).map(p => p.id);
}
const TECH_URL = { git: "https://github.com/DanielV-13", github: "https://github.com/DanielV-13" };
/* From the tech stack: open My work and light up the projects that use that technology */
function techFilter(q) {
  const ids = techProjects(q);
  if (!ids.length) return;
  $$("#grid [data-id]").forEach(c => c.classList.toggle("tech-hit", ids.includes(c.dataset.id)));
  const first = $(`#grid [data-id="${ids[0]}"]`); if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  techToast(`${ids.length} ${ids.length === 1 ? T().projOne : T().projMany} · ${q}`);
  clearTimeout(techFilter.t); techFilter.t = setTimeout(() => $$("#grid .tech-hit").forEach(c => c.classList.remove("tech-hit")), 4500);
}
function techToast(msg) {
  let t = $("#techToast");
  if (!t) { t = document.createElement("div"); t.id = "techToast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
  t.textContent = msg; t.classList.remove("on"); void t.offsetWidth; t.classList.add("on");
  clearTimeout(techToast.t); techToast.t = setTimeout(() => t.classList.remove("on"), 3200);
}
/* Cross-fade an <img> to a new picture (decoded first, so it never flashes empty) */
function swapImg(img, src, fit) {
  if (img.getAttribute("src") === src) return;
  const pre = new Image(); pre.src = src;
  img.style.opacity = 0;
  const done = () => setTimeout(() => { img.src = src; img.classList.toggle("fit", !!fit); img.style.opacity = 1; }, 230);
  (pre.decode ? pre.decode() : Promise.resolve()).then(done, done);
}
/* Galleries that move on their own: every few seconds, only while on screen, the tab is visible
   and the pointer is not over them; never with reduced motion. Clicking still picks a picture. */
const Rot = {
  set: new Set(), every: 3200,
  io: "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.target._rot) e.target._rot.vis = e.isIntersecting; })) : null,
  make(el, n, show) {
    const r = { el, n, k: 0, vis: !Rot.io, hover: false, t: performance.now() + Math.random() * 1800 };
    r.go = k => { r.k = (k + n) % n; show(r.k); r.t = performance.now(); };
    if (n < 2) return r;
    el.addEventListener("pointerenter", () => r.hover = true);
    el.addEventListener("pointerleave", () => { r.hover = false; r.t = performance.now(); });
    el._rot = r; Rot.io && Rot.io.observe(el); Rot.set.add(r);
    return r;
  },
  tick() {
    if (document.hidden || REDUCED) return;
    const now = performance.now();
    Rot.set.forEach(r => {
      if (!r.el.isConnected) { Rot.set.delete(r); Rot.io && Rot.io.unobserve(r.el); return; }
      if (r.vis && !r.hover && now - r.t > Rot.every) {
        r.go(r.k + 1);
      }
    });
  }
};
setInterval(Rot.tick, 400);
/* About: the mission sheet is tucked inside the pass; it slides out by itself once per visit, then goes back */
const Pass = {
  init() {
    const p = $(".pass"), tab = $(".pass-tab"); if (!p || !tab) return;
    this.p = p; this.tab = tab;
    if (!store.get("dv_pass_open", false)) tab.classList.add("nudge");
    tab.onclick = () => { tab.classList.remove("nudge"); store.set("dv_pass_open", true); this.set(!p.classList.contains("open")); Sound.click(); };
  },
  set(open) { this.p.classList.toggle("open", open); this.tab.setAttribute("aria-expanded", open); }
};
/* Journey: the moment closest to the middle of the screen comes forward as you scroll */
const TimelineFocus = {
  watch() {
    const tl = $("#timeline"), items = $$(".t-item", tl);
    if (this.io) this.io.disconnect();
    if (REDUCED || !("IntersectionObserver" in window) || !items.length) return;
    tl.classList.add("focus");
    const set = el => { if (el === this.cur) return; if (this.cur) this.cur.classList.remove("on"); el.classList.add("on"); this.cur = el; };
    this.cur = null; set(items[0]);
    this.io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) set(e.target); }), { rootMargin: "-42% 0px -42% 0px" });
    items.forEach(el => this.io.observe(el));
  }
};
/* Simple full-size viewer for story pictures and class pages */
function lightbox(src) {
  let lb = $("#lb");
  if (!lb) {
    lb = document.createElement("div"); lb.id = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-label", "image");
    lb.innerHTML = `<img alt=""><button type="button" aria-label="close">×</button>`;
    document.body.appendChild(lb);
    lb.onclick = () => lb.classList.remove("on");
    addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("on")) { lb.classList.remove("on"); e.stopImmediatePropagation(); } }, true);
  }
  $("img", lb).src = src; lb.classList.add("on");
}

/* ===================== JOURNEY: stickers + timeline ===================== */
function renderStickers() {
  $("#stickers").innerHTML = STICKERS.map(s => {
    const face = s.m ? `<span class="lg${s.small ? " sm" : ""}" style="--m:url(${s.m})"></span>` : s.flag ? `<span style="background:#fff;color:#0b1230;padding:2px 6px;border-radius:5px;font-size:15px">${s.txt}</span>` : `<span style="font-size:17px">${s.txt}</span>`;
    const sub = s.sub ? `<small>${esc(L(s.sub))}</small>` : "";
    return `<button type="button" class="sticker" style="--rot:${s.rot}deg" aria-label="${esc(L(s.sub) || s.txt || s.id.toUpperCase())}"><span class="shadow"></span><span class="s-rot"><span class="s-in"><span class="s-face" style="--bg:${s.bg};--fg:${s.fg}">${face}${sub}</span><span class="s-back"></span></span></span></button>`;
  }).join("");
  $$("#stickers .sticker").forEach(s => {
    s.onclick = () => peelSticker(s);
  });
}
/* A sticker peels off from one corner, drops with gravity (spinning, swaying a little) and later sticks back in its place */
async function peelSticker(s) {
  if (s.classList.contains("off") || !s.animate) return;
  s.classList.add("off");
  const inner = $(".s-in", s), face = $(".s-face", s), sh = $(".shadow", s), S = s.offsetWidth;
  try {
    if (REDUCED) {
      Sound.peel();
      await s.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" }).finished;
    } else {
      /* 1 · the top-left corner folds over, slowly, along a line perpendicular to the diagonal (in sync with the tape sound) */
      const flap = document.createElement("span"); flap.className = "s-flap"; inner.appendChild(flap);
      const T = 950, Dmax = S * .78, t0 = performance.now(); Sound.rip(T / 1000);
      sh.style.opacity = .5;
      await new Promise(res => {
        const step = now => {
          const k = Math.min(1, (now - t0) / T), e = k * k * (3 - 2 * k) * (.35 + .65 * k), D = Dmax * e;
          face.style.clipPath = `polygon(${D}px 0, 100% 0, 100% 100%, 0 100%, 0 ${D}px)`;
          flap.style.clipPath = `polygon(0 0, ${D}px 0, 0 ${D}px)`;
          flap.style.transform = `matrix(0,-1,-1,0,${D},${D})`;
          sh.style.transform = `translate(${4 + 10 * e}px,${8 + 12 * e}px) scale(${1 + .06 * e})`;
          k < 1 ? requestAnimationFrame(step) : res();
        };
        requestAnimationFrame(step);
      });
      /* 2 · it lets go and drops, spinning and swaying a little */
      s.classList.add("fly");
      const dir = Math.random() < .5 ? -1 : 1, spin = dir * (140 + Math.random() * 140), fall = Math.max(380, innerHeight * .6), sway = dir * (18 + Math.random() * 22);
      sh.animate([{ opacity: .5 }, { opacity: 0 }], { duration: 200, fill: "forwards" });
      await s.animate([
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${sway}px,${fall * .14}px) rotate(${spin * .25}deg)`, opacity: 1, offset: .25 },
        { transform: `translate(${-sway * .6}px,${fall * .45}px) rotate(${spin * .6}deg)`, opacity: 1, offset: .55 },
        { transform: `translate(${sway * .4}px,${fall}px) rotate(${spin}deg)`, opacity: 0 }
      ], { duration: 950, easing: "cubic-bezier(.45,0,.9,.6)", fill: "forwards" }).finished;
      flap.remove();
    }
    await new Promise(r => setTimeout(r, 900));
    s.getAnimations().forEach(a => a.cancel()); sh.getAnimations().forEach(a => a.cancel());
    face.style.clipPath = ""; sh.style.transform = ""; sh.style.opacity = ""; s.classList.remove("fly");
    /* 3 · a fresh one sticks back in its place */
    Sound.stick();
    await s.animate(REDUCED ? [{ opacity: 0 }, { opacity: 1 }] : [
      { transform: "scale(1.18)", opacity: 0, filter: "drop-shadow(0 16px 14px rgba(0,0,0,.5))" },
      { transform: "scale(.95)", opacity: 1, filter: "drop-shadow(0 4px 6px rgba(0,0,0,.4))", offset: .65 },
      { transform: "scale(1)", opacity: 1, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" }
    ], { duration: REDUCED ? 250 : 420, easing: "cubic-bezier(.2,.8,.2,1)" }).finished;
  } catch (e) {}
  s.classList.remove("off", "fly");
}
function renderTimeline() {
  $("#timeline").innerHTML = TIMELINE.map(it => {
    const action = (it.open ? `<button class="chip-btn" data-open="${it.open}">${T().view} ↗</button>` : it.filter ? `<button class="chip-btn" data-filter="${it.filter}">${T().view} ↗</button>` : "")
      + (it.links || []).map(l => `<a class="chip-btn ext" href="${l.u}" target="_blank" rel="noopener">${esc(L(l.t))} ↗</a>`).join("");
    const text = it.draft ? L(it.text).replace(/(DRAFT|BORRADOR) · Daniel:\s*/, "") : L(it.text);
    return `<div class="t-item${it.hl ? " hl" : ""}"><div class="t-year">${esc(L(it.when))}</div><div class="t-line"></div>
      <div class="t-body">${it.imgs || it.img ? `<img class="t-img" src="${(it.imgs || [it.img])[0]}" alt="" loading="lazy">` : ""}<h3>${esc(L(it.title))}${it.org ? ` <span>· ${esc(it.org)}</span>` : ""}</h3>
      <p${it.draft ? ' class="draft"' : ""}>${esc(text)}</p>${action ? `<div class="t-act">${action}</div>` : ""}</div></div>`;
  }).join("");
  TimelineFocus.watch();
  $$("#timeline .t-img").forEach((im, i) => {
    const it = TIMELINE.filter(x => x.imgs || x.img)[i], list = it.imgs || [it.img];
    if (list.length > 1) Rot.make(im, list.length, k => swapImg(im, list[k]));
  });
  $$("#timeline [data-open]").forEach(b => b.onclick = () => { location.hash = "work"; setTimeout(() => openModal(b.dataset.open), 450); });
  $$("#timeline [data-filter]").forEach(b => b.onclick = () => location.hash = "work/" + b.dataset.filter);
}
