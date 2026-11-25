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
  "about.pass": "PASE DE ACCESO", "about.passrole": "Ingeniería en Computación · UEES → Universidad de Oviedo", "about.passscan": "escanea · LinkedIn", "about.passmission": "MISIÓN", "about.passhint": "toca para leer", "about.passli": "LinkedIn ↗",
  "about.mission": "Inspirar la pasión por la física, la ciencia y la tecnología a más estudiantes en Latinoamérica. Mostrar lo maravilloso que puede ser dejarse llevar por la curiosidad y arriesgarse con todo a aprender.",
  "about.smtitle": "El modelo estándar de mi historia", "about.draftchip": "borrador · textos por escribir",
  "journey.title": "Dónde he <em>estado</em>", "journey.peel": "psst: haz clic en una pegatina",
  "arc.title": "La ciencia es mejor cuando <em>juegas</em>.", "arc.lede": "Particle Invaders: detén los quarks que se acercan con fotones antes de que lleguen a tu detector.",
  "arc.move": "mover", "arc.fire": "disparar", "arc.start": "empezar",
  "contact.big": "¿Te interesan las mismas preguntas? <em>Hablemos.</em>", "contact.copy": "Copiar correo", "contact.back": "Volver al universo",
  "m.prev": "anterior", "m.next": "siguiente"
};
const UI = {
  en: { all: "All", projects: "projects", project: "project", did: "What I did", tech: "Built with", with: "With", code: "Code on GitHub", colab: "Open in Colab", map: "Interactive evacuation map", release: "Download the game", playable: "Playable", ovPics: "See photos of Oviedo", figma: "Figma prototype", video: "Video presentation",
        company: "This code was built for a company, so I can't share it.", teamnote: "Team repository of Artemis-4, hosted on a teammate's account.", wip: "In progress", wipnote: "Work in progress: results and conclusions coming soon.", copied: "Email copied", cvmsg: "My CV is being updated. Write to me meanwhile: daniel.vacavelastegui@gmail.com",
        soundOn: "Sound on", soundOff: "Sound off", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · Spain" }, view: "View",
        nav: { universe: "Universe", work: "Work", about: "About", journey: "Journey", arcade: "Arcade" }, explored: "Explored",
        enter: "click to enter", tapEnter: "tap again to enter", play: "click to play", tapPlay: "tap again to play", next: "Next", unexplored: "Unexplored", buBack: "Back to the universe", buLeft: "explored · {n} left", buAll: "All explored ✓", deeper: "deeper →", backStart: "back to start ↺",
        smEmpty: "Click a particle to read that part of the story.", smPhrase: "Short phrase to write here.", smFuture: "Space for what comes next.",
        aboutP: "About me", readMore: "Read more", smWip: "in progress…", smPred: "Predicted, not yet observed.", stUni: "University", stSchool: "School", projOne: "project", projMany: "projects", techHint: "psst: click any technology to see the projects where I used it ↗", aboutSub: "my story as a standard model", left: "unexplored", bhTip: "drag to rotate · click to fall in",
        nextK: "Next stop", travel: "Travel there →", nextSolar: "Solar System · about me", nextEarth: "Earth · my journey", nextSat: "The satellite · arcade", nextBh: "Back to the black hole", journeyP: "My journey", journeySub: "Guayaquil → Oviedo", arcadeP: "Arcade", arcadeSub: "Particle Invaders", me: "me", satellite: "Arcade" },
  es: { all: "Todos", projects: "proyectos", project: "proyecto", did: "Qué hice", tech: "Hecho con", with: "Con", code: "Código en GitHub", colab: "Abrir en Colab", map: "Mapa interactivo de evacuación", release: "Descargar el juego", playable: "Jugable", ovPics: "Ver fotos de Oviedo", figma: "Prototipo en Figma", video: "Video de presentación",
        company: "Este código fue hecho para una empresa, por eso no puedo compartirlo.", teamnote: "Repositorio del equipo Artemis-4, en la cuenta de una compañera.", wip: "En progreso", wipnote: "Proyecto en progreso: pronto añadiré resultados y conclusiones.", copied: "Correo copiado", cvmsg: "Estoy actualizando mi CV. Mientras tanto, escríbeme: daniel.vacavelastegui@gmail.com",
        soundOn: "Sonido activado", soundOff: "Sonido apagado", place: { uees: "UEES · Ecuador", uniovi: "Uniovi · España" }, view: "Ver",
        nav: { universe: "Universo", work: "Proyectos", about: "Sobre mí", journey: "Trayectoria", arcade: "Arcade" }, explored: "Explorado",
        enter: "haz clic para entrar", tapEnter: "toca otra vez para entrar", play: "haz clic para jugar", tapPlay: "toca otra vez para jugar", next: "Siguiente", unexplored: "Sin explorar", buBack: "Volver al universo", buLeft: "explorados · faltan {n}", buAll: "Todo explorado ✓", deeper: "más profundo →", backStart: "volver al inicio ↺",
        smEmpty: "Haz clic en una partícula para leer esa parte de la historia.", smPhrase: "Frase corta por escribir aquí.", smFuture: "Espacio para lo que viene.",
        aboutP: "Sobre mí", readMore: "Leer más", smWip: "en proceso…", smPred: "Predicha, aún no observada.", stUni: "Universidad", stSchool: "Colegio", projOne: "proyecto", projMany: "proyectos", techHint: "psst: haz clic en cualquier tecnología para ver los proyectos donde la usé ↗", aboutSub: "mi historia como un modelo estándar", left: "sin explorar", bhTip: "arrastra para girarlo · clic para caer",
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
  const el = $("#v-" + v); el.scrollTop = 0; el.classList.add("on"); BackUni.hide();
  Game.setVis(v === "arcade");
  renderNav(); Sound.open();
  setTimeout(() => { const h = $("h2", el); h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }, 50);
  if (v === "about") [350, 900].forEach(t => setTimeout(() => { placeNotch(); StoryTour.kick(); }, t));
  if (v === "journey") [120, 700, 1300].forEach(t => setTimeout(() => TimelineReveal.on && TimelineReveal.on(), t));
  if (v === "journey") setTimeout(() => Feyn.go(), 200);
  [300, 900].forEach(t => setTimeout(() => VidPlay.sync(), t));
}
function enterHome() {
  BackUni.hide();
  if (CURVIEW) { $("#v-" + CURVIEW).classList.remove("on"); CURVIEW = null; document.body.classList.remove("in-view"); Uni.zoomOut(); Sound.open(); VidPlay.sync(); }
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
/* media: the animation ("anim") and the real pictures of a project, shown in turns */
function mediaOf(p, card) {
  if (card && p.cardMedia) return p.cardMedia;
  if (p.media) return p.media;
  if (p.anim) return ["anim"];
  return p.gallery || (p.img ? [p.img] : []);
}
const isVid = m => /\.mp4$/.test(m);
const VID_OK = !REDUCED && !(navigator.connection && navigator.connection.saveData);
function slideHTML(p, m, on, lazy, card) {
  let inner;
  if (m === "anim") inner = `<canvas data-anim="${p.anim}" aria-hidden="true"></canvas>`;
  else if (isVid(m)) inner = card
    ? `<video muted loop playsinline preload="none" poster="${p.poster || p.img || ""}" data-src="${m}" aria-hidden="true"></video>`
    : `<video muted loop playsinline preload="metadata" poster="${p.poster || p.img || ""}" src="${m}" aria-label="${esc(L(p.title))}"></video>`;
  else inner = `<img src="${m}" alt="" ${lazy ? 'loading="lazy"' : ""} decoding="async">`;
  return `<div class="sl${on ? " on" : ""}">${inner}</div>`;
}
/* card videos: only load and play while the card is on screen (one at a time on phones) */
const VidPlay = {
  io: null, ratio: new Map(),
  setup(root) {
    if (this.io) this.io.disconnect(); this.ratio.clear();
    if (!VID_OK) return;
    this.io = new IntersectionObserver(es => { es.forEach(e => this.ratio.set(e.target, e.isIntersecting ? e.intersectionRatio : 0)); this.sync(); }, { threshold: [0, .35, .6, .9] });
    $$(".screen video", root).forEach(v => { this.io.observe(v); v._t = 0; v.addEventListener("timeupdate", () => { if (v.currentTime > v._t) v._t = v.currentTime; }); });
  },
  sync() {
    if (!VID_OK) return;
    const open = $("#modal").classList.contains("open") || CURVIEW !== "work" || document.hidden, phone = innerWidth < 760 || matchMedia("(pointer:coarse)").matches;
    /* phones play one clip; desktop "All" plays the two most visible (the kart + Catventures pair); the Games filter has no canvas animations, so three */
    const max = phone ? 1 : FILTER === "games" ? 3 : 2;
    const ranked = [...this.ratio].filter(([v, r]) => { const sl = v.closest(".sl"); return r >= .35 && (!sl || sl.classList.contains("on")); }).sort((a, b) => b[1] - a[1]).slice(0, max).map(x => x[0]);
    this.ratio.forEach((r, v) => {
      const go = !open && ranked.includes(v);
      if (go) { if (!v.src) v.src = v.dataset.src; const pr = v.play(); if (pr) pr.catch(() => {}); } else if (!v.paused) v.pause();
    });
  }
};
document.addEventListener("visibilitychange", () => VidPlay.sync());
function cardHTML(p, i) {
  const md = mediaOf(p, true), many = md.length > 1;
  const screen = many
    ? `<div class="screen multi">${md.map((m, k) => slideHTML(p, m, !k, true, true)).join("")}<div class="sdots" aria-hidden="true">${md.map((_, k) => `<i class="${k ? "" : "on"}"></i>`).join("")}</div></div>`
    : `<div class="screen">${slideHTML(p, md[0], true, true, true)}</div>`;
  const first = p.award ? `<span class="tag award">★ ${esc(L(p.award))}</span>` : `<span class="tag">${esc(L(THEMES[p.theme]))}</span>`;
  return `<button class="win${p.feat ? " feat" : ""}" type="button" data-id="${p.id}" style="animation-delay:${Math.min(i, 12) * 35}ms;--o4:${ORDER4.indexOf(p.id)}">${screen}
    <div class="win-body"><div class="win-meta">${first}<span class="tag place-${p.place}">${p.place === "uees" ? "UEES" : "Uniovi"}</span>${p.playable ? `<span class="tag play">▶ ${esc(T().playable)}</span>` : ""}${p.wip ? `<span class="tag wip">${esc(T().wip)}</span>` : ""}</div>
    <h3>${esc(L(p.title))}</h3></div></button>`;
}
/* cards with several slides cross-fade on their own while they are on screen; hover pauses */
const CardRot = {
  cards: [], io: null, every: 4200,
  setup(root) {
    this.cards = []; if (this.io) this.io.disconnect();
    this.io = new IntersectionObserver(es => es.forEach(e => { const c = this.cards.find(x => x.el === e.target); if (c) c.vis = e.isIntersecting; }), { threshold: .35 });
    $$(".screen.multi", root).forEach((el, idx) => {
      const c = { el, k: 0, n: $$(".sl", el).length, vis: false, hover: false, next: performance.now() + ($(".sl.on video", el) ? 7000 : 2600 + (idx % 4) * 900) };
      const win = el.closest(".win"); win.addEventListener("pointerenter", () => c.hover = true); win.addEventListener("pointerleave", () => c.hover = false);
      $$(".sl canvas", el).forEach((cv, j) => Previews.setOff(cv, j !== 0));
      this.cards.push(c); this.io.observe(el);
    });
    if (!this.timer && !REDUCED) this.timer = setInterval(() => this.tick(), 400);
  },
  show(c, k) {
    c.k = k; const v = $$(".sl", c.el)[k]?.querySelector("video"); if (v) v._t = 0; $$(".sl", c.el).forEach((s, j) => { s.classList.toggle("on", j === k); const cv = $("canvas", s); if (cv) Previews.setOff(cv, j !== k); });
    $$(".sdots i", c.el).forEach((d, j) => d.classList.toggle("on", j === k));
    VidPlay.sync();
  },
  tick() {
    if (document.hidden || CURVIEW !== "work" || $("#modal").classList.contains("open")) return;
    const now = performance.now();
    /* a video slide is never skipped before the clip has actually played (≈6 s or to its end), so a paused clip waits for its turn instead of flipping to stills */
    const unseen = c => { const v = $(".sl.on video", c.el); return v && (v._t || 0) < Math.min(6, (v.duration || 6) - .4); };
    this.cards.forEach(c => { if (!c.vis || c.hover || unseen(c)) { c.next = Math.max(c.next, now + 1200); return; } if (now >= c.next) { this.show(c, (c.k + 1) % c.n); c.next = now + ($(".sl.on video", c.el) ? 7000 : this.every); } });
  }
};
function renderGrid() {
  const g = $("#grid");
  g.innerHTML = visibleProjects().map(cardHTML).join("");
  $$(".win", g).forEach(w => { w.onclick = () => openModal(w.dataset.id); w.onmouseenter = () => Sound.hover(); });
  Previews.scan(g); CardRot.setup(g); VidPlay.setup(g);
}

let MODAL_LIST = [], MODAL_I = 0, modalAnim = null, lastFocus = null;
function openModal(id) {
  MODAL_LIST = visibleProjects(); if (!MODAL_LIST.find(p => p.id === id)) MODAL_LIST = PROJECTS.slice();
  MODAL_I = MODAL_LIST.findIndex(p => p.id === id);
  lastFocus = document.activeElement;
  $("#modal").classList.add("open");
  fillModal(); Sound.open(); $("#mClose").focus(); VidPlay.sync();
}
function fillModal() {
  const p = MODAL_LIST[MODAL_I], t = T();
  Visited.mark(p.theme);
  const hero = $("#mHero");
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  const md = mediaOf(p);
  hero.className = "m-hero" + (p.video ? " vid" : md.length > 1 ? " gal" : (p.img && p.plot && !p.anim ? " plot" : ""));
  if (p.video) hero.innerHTML = `<video src="${p.video}" poster="${p.img || ""}" autoplay muted loop playsinline aria-label="${esc(L(p.title))}"></video>`;
  else if (md.length > 1) {
    let gi = 0; const pics = md.filter(m => m !== "anim" && !isVid(m));
    hero.innerHTML = md.map((m, k) => slideHTML(p, m, !k, k > 1, false)).join("") + `<button class="g-nav prev" type="button" aria-label="previous image">‹</button><button class="g-nav next" type="button" aria-label="next image">›</button><div class="g-dots">${md.map(() => "<i></i>").join("")}</div><span class="g-n"></span>`;
    const cv = $("canvas", hero); if (cv) { modalAnim = cv; Previews.add(cv, true); }
    const show = () => {
      $$(".sl", hero).forEach((s, k) => s.classList.toggle("on", k === gi));
      $$(".g-dots i", hero).forEach((d, k) => d.classList.toggle("on", k === gi));
      if (cv) Previews.setOff(cv, md[gi] !== "anim");
      $$(".sl video", hero).forEach((v, j) => { if (md[gi] === v.getAttribute("src")) { const pr = v.play(); if (pr) pr.catch(() => {}); } else v.pause(); });
      $(".g-n", hero).textContent = `${gi + 1} / ${md.length}`;
    };
    const go = d => { gi = (gi + d + md.length) % md.length; show(); Sound.click(); };
    $(".g-nav.prev", hero).onclick = () => go(-1); $(".g-nav.next", hero).onclick = () => go(1);
    $$(".g-dots i", hero).forEach((d, k) => d.onclick = () => { gi = k; show(); });
    $$(".sl img", hero).forEach(im => { im.style.cursor = "zoom-in"; im.onclick = () => lightbox(im.getAttribute("src"), pics); });
    let x0 = null;
    hero.ontouchstart = e => { x0 = e.touches[0].clientX; };
    hero.ontouchend = e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); x0 = null; };
    show();
  }
  else if (md[0] && md[0] !== "anim") hero.innerHTML = isVid(md[0]) ? `<video src="${md[0]}" autoplay muted loop playsinline></video>` : `<img src="${md[0]}" alt="${esc(L(p.title))}">`;
  else { hero.innerHTML = `<canvas data-anim="${p.anim}" aria-hidden="true"></canvas>`; modalAnim = $("canvas", hero); Previews.add(modalAnim, true); }
  const linkBtn = l => {
    const lab = l.lab ? esc(L(l.lab)) : { github: t.code, colab: t.colab, figma: t.figma, video: t.video, map: t.map, release: t.release }[l.t];
    const ic = l.t === "github" ? '<path d="M9 19c-4 1.5-4-2-6-2.5M15 21v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>' : '<path d="M7 17 17 7M8 7h9v9"/>';
    const gold = l.t === "release" || (l.t === "github" && !p.links.some(x => x.t === "release"));
    const ic2 = l.t === "release" ? '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>' : ic;
    return `<a class="btn${gold ? "" : " ghost"}${l.t === "release" ? " rel" : ""}" href="${l.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24">${ic2}</svg>${lab}</a>`;
  };
  const did = L(p.did) || [];
  const people = (p.people || []).map(k => PEOPLE[k][1] ? `<a href="${PEOPLE[k][1]}" target="_blank" rel="noopener">${PEOPLE[k][0]}</a>` : PEOPLE[k][0]).join(", ");
  let links = p.links.map(linkBtn).join("");
  if (p.company) links += `<div class="note"><span aria-hidden="true">🏢</span><span>${t.company}</span></div>`;
  if (p.teamRepoNote) links += `<div class="note"><span aria-hidden="true">ℹ</span><span>${t.teamnote}</span></div>`;
  $("#mBody").innerHTML = `<div>
      <div class="m-top">${p.award ? `<span class="tag award">★ ${esc(L(p.award))}</span>` : ""}<span class="tag place-${p.place}">${t.place[p.place]}</span><span class="tag">${esc(L(THEMES[p.theme]))}</span><span class="tag">${p.year}</span>${p.wip ? `<span class="tag wip">${esc(t.wip)}</span>` : ""}</div>
      <h2 id="m-title">${esc(L(p.title))}</h2><p class="desc">${esc(L(p.desc))}</p>
      ${p.wip ? `<p class="wipnote"><span aria-hidden="true"></span>${esc(t.wipnote)}</p>` : ""}
      ${did.length ? `<h4>${t.did}</h4><ul>${did.map(d => `<li>${esc(d)}</li>`).join("")}</ul>` : ""}</div>
    <div class="m-side"><div class="m-links">${links}</div>
      <div><h4>${t.tech}</h4><div class="techs">${p.tech.map(x => `<span>${esc(x)}</span>`).join("")}</div></div>
      ${people ? `<p class="people">${t.with}: ${people}</p>` : ""}${p.credit ? `<p class="people credit">${esc(L(p.credit))}</p>` : ""}</div>`;
  $("#mCount").textContent = String(MODAL_I + 1).padStart(2, "0") + " / " + String(MODAL_LIST.length).padStart(2, "0");
  $("#mDots").innerHTML = MODAL_LIST.map((_, i) => `<i class="${i === MODAL_I ? "on" : ""}"></i>`).join("");
  $("#mPanel").scrollTop = 0;
}
function closeModal(silent) {
  $("#modal").classList.remove("open");
  if (modalAnim) { Previews.remove(modalAnim); modalAnim = null; }
  $("#mHero").innerHTML = "";
  Previews.start(); VidPlay.sync();
  if (lastFocus && !silent) lastFocus.focus();
}
function stepModal(d) { MODAL_I = (MODAL_I + d + MODAL_LIST.length) % MODAL_LIST.length; fillModal(); Sound.click(); }

/* ===================== ABOUT: the standard model of my story ===================== */
let SM_SEL = null;
const CHAPTERS = ["tc", "cp", "gy", "ta", "pr", "co", "ov", "h"];
function renderStory() {
  const G = STORY_GROUPS;
  if (!SM_SEL) SM_SEL = CHAPTERS[0];
  let h = `<span class="gl" style="--c:${G.q.c};grid-row:1;grid-column:1">${esc(L(G.q))}</span><span class="gl" style="--c:${G.l.c};grid-row:2;grid-column:1">${esc(L(G.l))}</span>`;
  h += STORY.map(s => {
    const pos = s.g === "h" ? "grid-row:1/3;grid-column:7" : `grid-row:${s.row};grid-column:${s.col}`;
    if (s.empty) return `<div class="cell empty" style="--c:${G[s.g].c};${pos}" tabindex="0" data-tipq="${esc(T().smPred)}"><span class="yr">20··</span><span class="sy">?</span><span class="nm">${esc(T().smWip)}</span></div>`;
    return `<button type="button" class="cell${s.g === "h" ? " higgs" : ""}" data-s="${s.id}" style="--c:${G[s.g].c};${pos}" aria-pressed="${SM_SEL === s.id}">${s.mt ? `<span class="mt">${esc(L(s.mt))}</span>` : ""}<span class="yr">${esc(s.yr)}</span><span class="sy">${esc(s.sy)}</span><span class="nm">${esc(L(s.n))}</span><i class="prog" aria-hidden="true"></i></button>`;
  }).join("");
  h += `<span class="gb2" style="grid-row:3;grid-column:5;--c:${G.b.c}">${esc(L(G.b))}</span><span class="gb2" style="grid-row:3;grid-column:7;--c:${G.h.c}">${esc(L(G.h))}</span>`;
  $("#smTable").innerHTML = h;
  $$("#smTable [data-s]").forEach(b => {
    b.onclick = () => { StoryTour.stop(); SM_SEL = b.dataset.s; Sound.click(); showStory(SM_SEL); };
    b.onmouseenter = () => {
      Sound.hover(); if (!FINE) return; clearTimeout(StoryTour.hv);
      StoryTour.hv = setTimeout(() => { StoryTour.pause(); if (b.dataset.s !== StoryTour.cur) showStory(b.dataset.s, true); }, 120);
    };
    b.onmouseleave = () => clearTimeout(StoryTour.hv);
  });
  showStory(SM_SEL);
  StoryTour.watch();
}
/* Show one particle in the panel (hover = preview, otherwise also the selection).
   The panel is an "event card": big photo on one half, then a short hook, then the story (the rest behind "read more"). */
function showStory(id, preview) {
  const G = STORY_GROUPS, p = $("#smPanel"), s = STORY.find(x => x.id === id);
  if (!s) return;
  StoryTour.cur = id;
  $$("#smTable [data-s]").forEach(b => { b.setAttribute("aria-pressed", b.dataset.s === id); b.classList.remove("run"); });
  p.className = "sm-panel"; p.style.setProperty("--c", G[s.g].c); $(".sm").style.setProperty("--c", G[s.g].c);
  const k = CHAPTERS.indexOf(id);
  $("#smNav").innerHTML = `<button type="button" class="sm-arw" data-d="-1" aria-label="previous">◀</button><span class="sm-n">${k + 1} / ${CHAPTERS.length}</span><button type="button" class="sm-arw" data-d="1" aria-label="next">▶</button><span class="sm-dots">${CHAPTERS.map((c, j) => `<button type="button" data-c="${c}" style="--c:${G[STORY.find(x => x.id === c).g].c}" aria-label="${esc(STORY.find(x => x.id === c).sy)}"${j === k ? ' class="on"' : ""}></button>`).join("")}</span>`;
  $$("#smNav .sm-arw").forEach(b => b.onclick = () => { StoryTour.stop(); Sound.click(); SM_SEL = CHAPTERS[(k + +b.dataset.d + CHAPTERS.length) % CHAPTERS.length]; showStory(SM_SEL); });
  $$("#smNav .sm-dots button").forEach(b => b.onclick = () => { StoryTour.stop(); Sound.click(); SM_SEL = b.dataset.c; showStory(SM_SEL); });
  const notch = `<i class="notch" aria-hidden="true"></i>`;
  if (s.tech) {
    p.classList.add("tech");
    p.innerHTML = `${notch}<div><h4 class="th"><i>${esc(s.sy)}</i>${esc(L(s.t))}</h4>${techPanel()}</div>`;
    $$("[data-q]", p).forEach(b => b.onclick = () => {
      Sound.click(); const u = TECH_URL[b.dataset.q.toLowerCase()];
      if (u) { window.open(u, "_blank", "noopener"); return; }
      location.hash = "work"; setTimeout(() => techFilter(b.dataset.q), 450);
    });
    if (!store.get("dv_tech_hint", false)) { store.set("dv_tech_hint", true); const c = $(".tch", p); if (c) c.classList.add("hint"); }
    placeNotch(); return;
  }
  const items = (s.imgs || []).map(x => typeof x === "string" ? { u: x } : x);
  const hud = `<i class="hud tl"></i><i class="hud tr"></i><i class="hud bl"></i><i class="hud br"></i>`;
  const media = items.length
    ? `<div class="ev">${hud}<img class="${items[0].page ? "fit" : ""}" src="${items[0].u}" alt="${esc(L(s.t))}" loading="lazy">${items.length > 1 ? `<div class="pdots">${items.map((it, j) => `<button type="button" data-k="${j}" aria-pressed="${!j}" aria-label="${j + 1}/${items.length}"></button>`).join("")}</div>` : ""}</div>`
    : s.anim ? `<div class="ev anim" aria-hidden="true">${hud}<canvas data-anim="${s.anim}"></canvas><b class="seal">${esc(s.sy)}</b></div>`
    : `<div class="ev sym" aria-hidden="true">${hud}<b>${esc(s.sy)}</b></div>`;
  const blocks = s.phrase ? L(s.phrase).split("\n\n") : [];
  const first = blocks.length ? richText(s.full ? blocks.join("\n\n") : blocks[0]) : "", rest = s.full ? "" : blocks.slice(1).join("\n\n");
  const link = s.link ? `<a class="chip-btn" href="${s.link.u}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>${esc(L(s.link.t))}</a>` : "";
  p.innerHTML = `${notch}${media}<div class="txt"><h4>${esc(s.sy)} · ${esc(L(s.t))}</h4>${s.hook ? `<p class="hook">${esc(L(s.hook))}</p>` : ""}${first}${rest ? `<div class="more"><div>${richText(rest)}</div></div><button type="button" class="rm">${esc(T().readMore)} <i>▾</i></button>` : ""}${link}</div>`;
  const rm = $(".rm", p); if (rm) rm.onclick = () => { StoryTour.stop(); p.classList.toggle("exp"); Sound.click(); };
  placeNotch();
  if (showStory.cv) { Previews.remove(showStory.cv); showStory.cv = null; }
  const scv = $(".ev.anim canvas", p); if (scv) { showStory.cv = scv; Previews.add(scv, true); }
  if (!items.length) return;
  const main = $(".ev > img", p), dots = $$(".pdots button", p);
  const show = j => { swapImg(main, items[j].u, items[j].page); dots.forEach((x, i) => x.setAttribute("aria-pressed", i === j)); };
  const r = Rot.make($(".ev", p), items.length, show);
  dots.forEach(b => b.onclick = () => { r.go(+b.dataset.k); Sound.click(); });
  main.onclick = () => lightbox(main.src, items);
}
/* The small notch on the panel edge points at the active particle */
function placeNotch() {
  const cell = $(`#smTable [data-s="${StoryTour.cur}"]`), p = $("#smPanel"); if (!cell || !p) return;
  const c = cell.getBoundingClientRect(), q = p.getBoundingClientRect();
  if (q.left > c.right) p.style.setProperty("--ay", clamp(c.top + c.height / 2 - q.top, 22, q.height - 22) + "px");
  else p.style.setProperty("--ax", clamp(c.left + c.width / 2 - q.left, 22, q.width - 22) + "px");
}
/* The table tells itself: every ~6.5 s it moves to the next chapter, with a progress bar on the active particle.
   Pauses while the pointer is over the table or panel, stops for good after a click; only runs while on screen. */
const StoryTour = {
  every: 6500, on: false, stopped: false, vis: false, paused: false,
  watch() {
    if (REDUCED || this.stopped) return;
    const sm = $(".sm"); if (!sm || this.io) { this.kick(); return; }
    this.io = new IntersectionObserver(es => es.forEach(e => { this.vis = e.isIntersecting; this.kick(); }), { threshold: .35 });
    this.io.observe(sm);
    sm.addEventListener("pointerenter", () => this.pause());
    sm.addEventListener("pointerleave", () => { this.paused = false; this.kick(); });
    document.addEventListener("visibilitychange", () => this.kick());
  },
  pause() { this.paused = true; clearTimeout(this.t); const c = $(`#smTable [data-s="${this.cur}"]`); if (c) c.classList.remove("run"); },
  stop() { this.stopped = true; this.pause(); },
  kick() {
    clearTimeout(this.t);
    const c = $(`#smTable [data-s="${this.cur}"]`);
    if (c) c.classList.remove("run");
    if (this.stopped || this.paused || !this.vis || document.hidden || CURVIEW !== "about") return;
    if (c) { void c.offsetWidth; c.style.setProperty("--dur", this.every + "ms"); c.classList.add("run"); }
    this.t = setTimeout(() => { const k = CHAPTERS.indexOf(this.cur); SM_SEL = CHAPTERS[(k + 1) % CHAPTERS.length]; showStory(SM_SEL); this.kick(); }, this.every);
  }
};
/* A glowing particle track from the active cell to the panel */
const StoryTrace = {
  draw() {
    const sm = $(".sm"), cell = $(`#smTable [data-s="${StoryTour.cur}"]`), p = $("#smPanel"); if (!sm || !cell || !p) return;
    let svg = $(".sm-trace", sm);
    if (!svg) { svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "sm-trace"); svg.setAttribute("aria-hidden", "true"); svg.innerHTML = '<path class="tr-glow"/><path class="tr-core"/><circle r="3"/>'; sm.appendChild(svg); addEventListener("resize", () => this.draw()); }
    const R = sm.getBoundingClientRect(), c = cell.getBoundingClientRect(), q = p.getBoundingClientRect();
    svg.setAttribute("width", R.width); svg.setAttribute("height", R.height);
    let d, x1, y1;
    if (q.left > c.right) { const x0 = c.right - R.left, y0 = c.top + c.height / 2 - R.top; x1 = q.left - R.left; y1 = Math.min(Math.max(y0, q.top - R.top + 28), q.bottom - R.top - 28); const mx = (x0 + x1) / 2; d = `M${x0},${y0} C${mx},${y0} ${mx},${y1} ${x1},${y1}`; }
    else { const x0 = c.left + c.width / 2 - R.left, y0 = c.bottom - R.top; x1 = Math.min(Math.max(x0, q.left - R.left + 28), q.right - R.left - 28); y1 = q.top - R.top; const my = (y0 + y1) / 2; d = `M${x0},${y0} C${x0},${my} ${x1},${my} ${x1},${y1}`; }
    $$("path", svg).forEach(e => { e.setAttribute("d", d); e.style.animation = "none"; void e.getBBox; e.style.animation = ""; });
    const dot = $("circle", svg); dot.setAttribute("cx", x1); dot.setAttribute("cy", y1);
  }
};
/* Story text: blank line = new paragraph, **x** = highlighted in the particle colour,
   a paragraph that starts with "> " is a quote (its "— author" line becomes the citation) */
function richText(t) {
  const inl = x => esc(x).replace(/\*\*(.+?)\*\*/g, "<mark>$1</mark>").replace(/\*(.+?)\*/g, "<em>$1</em>");
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
  const done = () => setTimeout(() => { img.src = src; img.classList.toggle("fit", !!fit); img.style.opacity = 1; }, 180);
  (pre.decode ? pre.decode() : Promise.resolve()).then(done, done);
}
/* Galleries that move on their own: every few seconds, only while on screen, the tab is visible
   and the pointer is not over them; never with reduced motion. Clicking still picks a picture. */
const Rot = {
  set: new Set(), every: 2400,
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
    if (document.hidden || REDUCED || Rot.hold) return;
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
    tab.onclick = () => { this.set(!p.classList.contains("open")); Sound.click(); };
  },
  set(open) { this.p.classList.toggle("open", open); this.tab.setAttribute("aria-expanded", open); }
};
/* "Back to the universe" pill: appears only once you reach the end of a page, and tells you what is still unexplored */
const BackUni = {
  init() {
    const b = $("#backUni"); if (!b) return; this.b = b;
    b.onclick = () => {
      Sound.click(); const t = this.target();
      if (t) Uni.pending = t;
      goHome();
    };
    $$(".view").forEach(v => v.addEventListener("scroll", () => this.check(v), { passive: true }));
    addEventListener("resize", () => CURVIEW && this.check($("#v-" + CURVIEW)));
  },
  /* the closest stop with something new, as a trip for the universe */
  target() {
    const lvl = { about: 2, journey: 3, arcade: 3 };
    if (Visited.galaxiesLeft() > 0) return { level: 1 };
    for (const k of ["about", "journey", "arcade"]) if (!Visited.has(k)) return { level: lvl[k], portal: k === "arcade" ? "sat" : null };
    return null;
  },
  paint() {
    if (!this.b) return;
    const n = Visited.set.size, N = PLACES_TO_SEE.length, left = N - n;
    this.b.classList.toggle("todo", left > 0);
    this.b.innerHTML = `<span class="dot" aria-hidden="true"></span><span class="lb">${esc(T().buBack)}</span><b>${left ? `${n}/${N} ${esc(T().buLeft.replace("{n}", left))}` : esc(T().buAll)}</b>`;
  },
  check(v) {
    if (!this.b || !v || v.dataset.view !== CURVIEW) return;
    const end = v.scrollTop + v.clientHeight >= v.scrollHeight - 120 && v.scrollHeight > v.clientHeight + 40;
    if (end && !this.b.classList.contains("on")) this.paint();
    this.b.classList.toggle("on", end);
  },
  hide() { if (this.b) this.b.classList.remove("on"); }
};
/* Journey effect: "reveal" (each moment fades in once + the line fills with gold as you scroll) or the older "focus" */
const TL_MODE = "reveal";
const TimelineReveal = {
  watch() {
    const tl = $("#timeline"), items = $$(".t-item, .t-stage", tl), sc = $("#v-journey"), fill = $(".tl-fill", tl);
    if (this.io) this.io.disconnect();
    tl.classList.add("reveal");
    if (REDUCED || !("IntersectionObserver" in window)) { items.forEach(el => el.classList.add("in")); }
    else {
      this.io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); this.io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
      items.forEach(el => this.io.observe(el));
    }
    const upd = () => {
      this.raf = 0; const tl = $("#timeline"); if (!tl) return;
      const line = $(".t-line", tl), fill = $(".tl-fill", tl); if (!line || !fill) return;
      const r = tl.getBoundingClientRect(), x = line.getBoundingClientRect().left - r.left;
      const target = innerHeight * .62 - r.top, h = clamp(target, 0, r.height - 30);
      fill.style.left = x + "px"; fill.style.height = h + "px";
      $$(".t-item", tl).forEach(d => d.classList.toggle("past", d.offsetTop + 12 <= h));
    };
    const on = () => { if (!this.raf) this.raf = requestAnimationFrame(upd); };
    this.on = on;
    if (sc && !sc._tlScroll) { sc._tlScroll = true; sc.addEventListener("scroll", () => this.on(), { passive: true }); addEventListener("resize", () => this.on()); }
    if (this.ro) this.ro.disconnect();
    if ("ResizeObserver" in window) { this.ro = new ResizeObserver(() => this.on()); this.ro.observe(tl); }
    [50, 500, 1100].forEach(t => setTimeout(() => this.on(), t));
  }
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
/* Full-size viewer. Given the whole set of pictures of that moment, it is a small gallery:
   arrows, keyboard ← →, swipe, counter and thumbnails. While it is open, the galleries stop rotating. */
const LB = { list: [], k: 0 };
function lightbox(src, list) {
  let lb = $("#lb");
  if (!lb) {
    lb = document.createElement("div"); lb.id = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); lb.setAttribute("aria-label", "image viewer");
    lb.innerHTML = `<figure class="lb-fig"><img alt=""></figure><button type="button" class="lb-x" aria-label="close">×</button><button type="button" class="lb-arw prev" aria-label="previous">‹</button><button type="button" class="lb-arw next" aria-label="next">›</button><div class="lb-bar"><span class="lb-n"></span><div class="lb-th"></div></div>`;
    document.body.appendChild(lb);
    const close = () => { lb.classList.remove("on"); Rot.hold = false; };
    lb.onclick = e => { if (e.target === lb || e.target.classList.contains("lb-fig") || e.target.classList.contains("lb-x")) close(); };
    $(".prev", lb).onclick = e => { e.stopPropagation(); LB.go(-1); };
    $(".next", lb).onclick = e => { e.stopPropagation(); LB.go(1); };
    addEventListener("keydown", e => {
      if (!lb.classList.contains("on")) return;
      if (e.key === "Escape") { close(); e.stopImmediatePropagation(); }
      else if (e.key === "ArrowLeft") { LB.go(-1); e.preventDefault(); e.stopImmediatePropagation(); }
      else if (e.key === "ArrowRight") { LB.go(1); e.preventDefault(); e.stopImmediatePropagation(); }
    }, true);
    let x0 = null;
    lb.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) LB.go(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
    LB.go = d => { if (LB.list.length < 2) return; LB.k = (LB.k + d + LB.list.length) % LB.list.length; LB.show(); };
    LB.show = () => {
      const u = LB.list[LB.k], im = $(".lb-fig img", lb); im.style.opacity = 0;
      const pre = new Image(); pre.src = u; const done = () => { im.src = u; im.style.opacity = 1; };
      (pre.decode ? pre.decode() : Promise.resolve()).then(done, done);
      [LB.k - 1, LB.k + 1].forEach(j => { const v = LB.list[(j + LB.list.length) % LB.list.length]; if (v) { const i2 = new Image(); i2.src = v; } });
      const many = LB.list.length > 1; lb.classList.toggle("many", many);
      $(".lb-n", lb).textContent = many ? `${LB.k + 1} / ${LB.list.length}` : "";
      $$(".lb-th button", lb).forEach((b, j) => b.setAttribute("aria-current", j === LB.k));
    };
  }
  const abs = u => new URL(u, location.href).href;
  LB.list = (list && list.length ? list : [src]).map(u => typeof u === "string" ? u : u.u);
  LB.k = Math.max(0, LB.list.findIndex(u => abs(u) === abs(src)));
  $(".lb-th", lb).innerHTML = LB.list.length > 1 ? LB.list.map((u, j) => `<button type="button" data-j="${j}" aria-label="${j + 1}"><img src="${u}" alt="" loading="lazy"></button>`).join("") : "";
  $$(".lb-th button", lb).forEach(b => b.onclick = e => { e.stopPropagation(); LB.k = +b.dataset.j; LB.show(); });
  Rot.hold = true; lb.classList.add("on"); LB.show();
}

/* ===================== JOURNEY: stickers + timeline ===================== */
/* About: the two achievements that matter most, stuck on the access pass (Dean's List first, then WiDS) */
const PASS_STK = [
  { id: "dean", u: "assets/docs/transcript-uees.pdf", tip: { en: "Dean's List · see my grades (transcript, Jun 2026) ↗", es: "Dean's List · ver mis notas (récord, jun. 2026) ↗" }, rot: 8, cls: "a" },
  { id: "wids", u: "https://verified.sertifier.com/en/verify/08910752588849/", tip: { en: "3rd place WiDS · verify the credential ↗", es: "3.er lugar WiDS · verificar credencial ↗" }, rot: -8, cls: "b", host: "pass" }
];
function renderPassStickers() {
  const ph = $(".pass .pass-photo"); if (!ph) return;
  let lay = $(".pstk-layer"); if (!lay) { lay = document.createElement("div"); lay.className = "pstk-layer"; ph.after(lay); }
  let lay2 = $(".pstk-layer2"); if (!lay2) { lay2 = document.createElement("div"); lay2.className = "pstk-layer2"; $(".pass").appendChild(lay2); }
  const html = k => {
    const s = STICKERS.find(x => x.id === k.id); if (!s) return "";
    const face = s.m ? `<span class="lg${s.small ? " sm" : ""}" style="--m:url(${s.m})"></span>` : `<span style="font-size:17px">${s.txt}</span>`;
    const sub = s.sub ? `<small>${esc(L(s.sub))}</small>` : "";
    return `<a class="sticker pstk ${k.cls}" href="${k.u}" target="_blank" rel="noopener" style="--rot:${k.rot}deg" data-tip="${esc(L(k.tip))}" aria-label="${esc(L(k.tip))}"><span class="shadow"></span><span class="s-rot"><span class="s-in"><span class="s-face" style="--bg:${s.bg};--fg:${s.fg}">${face}${sub}</span></span></span></a>`;
  };
  lay.innerHTML = PASS_STK.filter(k => !k.host).map(html).join("");
  lay2.innerHTML = PASS_STK.filter(k => k.host === "pass").map(html).join("");
  const fit = () => { lay.style.top = ph.offsetTop + "px"; lay.style.left = ph.offsetLeft + "px"; lay.style.width = ph.offsetWidth + "px"; lay.style.height = ph.offsetHeight + "px"; };
  fit(); if (!lay._ro && "ResizeObserver" in window) { lay._ro = new ResizeObserver(fit); lay._ro.observe(ph); }
}
/* About: "Universidad de Oviedo" in the text opens the photos of Oviedo */
function wireOviedoLink() {
  const el = $('[data-i18n-html="about.p"]'); if (!el) return;
  const st = [...$$("strong", el)].find(x => /Oviedo/.test(x.textContent)); if (!st) return;
  st.classList.add("ov-link"); st.tabIndex = 0; st.setAttribute("role", "button"); st.title = T().ovPics;
  const list = ["assets/story/ov-ciencias.webp", "assets/story/ov-ciudad.webp", "assets/story/ov-informatica.webp", "assets/story/ov-ciencias-2.webp", "assets/story/oviedo-becario.webp"];
  const go = () => lightbox(list[0], list);
  st.onclick = go; st.onkeydown = e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } };
}

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
  let seenSchool = false;
  $("#timeline").innerHTML = `<div class="t-stage first"><i></i><b></b><span>${esc(T().stUni)}</span></div>` + TIMELINE.map(it => {
    const action = (it.open ? `<button class="chip-btn" data-open="${it.open}">${T().view} ↗</button>` : it.filter ? `<button class="chip-btn" data-filter="${it.filter}">${T().view} ↗</button>` : "")
      + (it.links || []).map(l => `<a class="chip-btn ext" href="${l.u}" target="_blank" rel="noopener">${esc(L(l.t))} ↗</a>`).join("");
    const text = it.draft ? L(it.text).replace(/(DRAFT|BORRADOR) · Daniel:\s*/, "") : L(it.text);
    const stage = it.stage === "school" && !seenSchool ? (seenSchool = true, `<div class="t-stage"><i></i><b class="t-line nod"></b><span>${esc(T().stSchool)}</span></div>`) : "";
    return `${stage}<div class="t-item${it.hl ? " hl" : ""}"><div class="t-year">${esc(L(it.when))}</div><div class="t-line"></div>
      <div class="t-body">${it.imgs || it.img ? `<img class="t-img" src="${(it.imgs || [it.img])[0]}" alt="" loading="lazy">` : ""}<h3>${esc(L(it.title))}${it.org ? ` <span>· ${esc(it.org)}</span>` : ""}</h3>
      <p${it.draft ? ' class="draft"' : ""}>${esc(text)}</p>${action ? `<div class="t-act">${action}</div>` : ""}</div></div>`;
  }).join("") + `<div class="tl-fill" aria-hidden="true"></div>`;
  if (TL_MODE === "focus") TimelineFocus.watch(); else TimelineReveal.watch();
  $$("#timeline .t-img").forEach((im, i) => { const it = TIMELINE.filter(x => x.imgs || x.img)[i]; im.onclick = () => lightbox(im.src, it.imgs || [it.img]); });
  $$("#timeline .t-img").forEach((im, i) => {
    const it = TIMELINE.filter(x => x.imgs || x.img)[i], list = it.imgs || [it.img];
    if (list.length > 1) Rot.make(im, list.length, k => swapImg(im, list[k]));
  });
  $$("#timeline [data-open]").forEach(b => b.onclick = () => { location.hash = "work"; setTimeout(() => openModal(b.dataset.open), 450); });
  $$("#timeline [data-filter]").forEach(b => b.onclick = () => location.hash = "work/" + b.dataset.filter);
}
