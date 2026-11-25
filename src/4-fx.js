/* ===================== NAME: particle collision ===================== */
/* Two beams meet on the name; tracks curl in the magnetic field across the whole hero, with a flash and sparks. */
const NameFX = {
  M: 300,
  init() {
    this.c = $("#namefx"); this.name = $("#name"); this.busy = false;
    const size = () => { const r = this.name.getBoundingClientRect(), M = this.M; this.w = r.width + M * 2; this.h = r.height + M * 2; this.ctx = fitCanvas(this.c, this.w, this.h); this.c.style.width = this.w + "px"; this.c.style.height = this.h + "px"; this.c.style.left = (this.name.offsetLeft - M) + "px"; this.c.style.top = (this.name.offsetTop - M) + "px"; };
    size(); new ResizeObserver(size).observe(this.name);
    this.name.addEventListener("click", () => this.fire());
    this.name.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.fire(); } });
    this.name.addEventListener("mouseenter", () => this.fire());
  },
  visible() { return !CURVIEW && Uni.i === 0 && !Uni.tr && !Uni.zoom && Intro.done && !document.hidden && !$("#modal").classList.contains("open") && !Game.full; },
  fire() {
    if (this.busy || !this.visible()) return; this.busy = true;
    const w = this.w, h = this.h, cx = w / 2, cy = h / 2, start = performance.now(), cols = ["#7cb2ff", "#ffb45e", "#ff5a76", "#62e3b5", "#ffd166", "#c6b3ff", "#ffffff"];
    let tracks = [];
    const spawn = () => {
      tracks = Array.from({ length: 46 }, (_, i) => { const a = Math.random() * 6.283, v = 2.2 + Math.random() * 5.5, muon = i < 3;
        return { x: cx, y: cy, vx: Math.cos(a) * (muon ? 8 : v), vy: Math.sin(a) * (muon ? 8 : v), q: (Math.random() - .5) * (muon ? .02 : .14), col: muon ? "#e8b64c" : cols[i % cols.length], wd: muon ? 2.6 : .8 + Math.random() * 1.6, tr: [], muon }; });
    };
    const ctx = this.ctx;
    const loop = now => {
      const el = (now - start) / 1000; ctx.clearRect(0, 0, w, h);
      if (el < .32 && !REDUCED) {
        const p = el / .32; ctx.lineWidth = 2;
        [["#7cb2ff", 0], ["#ff5a76", w]].forEach(([col, x0]) => { const x = lerp(x0, cx, p); ctx.strokeStyle = col; ctx.globalAlpha = .5; ctx.beginPath(); ctx.moveTo(x0, cy); ctx.lineTo(x, cy); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(x, cy, 4, 0, 7); ctx.fill(); ctx.shadowBlur = 0; });
      } else {
        if (!tracks.length) { spawn(); Sound.collide(); this.name.animate([{ transform: "scale(1)" }, { transform: "scale(1.05)" }, { transform: "scale(1)" }], { duration: 360 }); }
        const k = clamp((el - .32) / 2, 0, 1);
        if (k < .22) { const f = 1 - k / .22, R = 30 + (1 - f) * 220, g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R); g.addColorStop(0, `rgba(255,250,235,${f})`); g.addColorStop(.3, `rgba(255,200,120,${f * .5})`); g.addColorStop(1, "rgba(255,160,80,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
        tracks.forEach(p => {
          if (!REDUCED) for (let s2 = 0; s2 < 3; s2++) { const a = p.q, vx = p.vx * Math.cos(a) - p.vy * Math.sin(a), vy = p.vx * Math.sin(a) + p.vy * Math.cos(a); p.vx = vx * .988; p.vy = vy * .988; p.x += p.vx; p.y += p.vy; p.tr.push([p.x, p.y]); }
          ctx.globalAlpha = (1 - k) * (p.muon ? 1 : .9); ctx.strokeStyle = p.col; ctx.lineWidth = p.wd; ctx.shadowColor = p.col; ctx.shadowBlur = p.muon ? 10 : 4;
          ctx.beginPath(); ctx.moveTo(cx, cy); p.tr.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.stroke(); ctx.shadowBlur = 0;
          if (p.tr.length) { const [x, y] = p.tr[p.tr.length - 1]; ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, p.muon ? 2.4 : 1.5, 0, 7); ctx.fill(); }
        });
        ctx.globalAlpha = 1; if (k >= 1) { ctx.clearRect(0, 0, w, h); this.busy = false; return; }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
};

/* ===================== CURSOR: a charged particle in a magnetic field ===================== */
/* The red head is the system cursor itself (CSS, drawn by the OS: no lag at all); the canvas only draws the curling trail. */
const CursorFX = {
  init() {
    if (!FINE || REDUCED) return;
    this.c = $("#cursorfx"); this.head = $("#cursorHead"); this.pts = []; this.x = -99; this.y = -99; this.running = false;
    document.documentElement.classList.add("cur");
    const size = () => this.ctx = fitCanvas(this.c, innerWidth, innerHeight); size(); addEventListener("resize", size);
    addEventListener("pointermove", e => {
      if (e.pointerType !== "mouse") return;
      let vx = e.clientX - this.x, vy = e.clientY - this.y; if (Math.hypot(vx, vy) > 90) { this.pts = []; vx = vy = 0; } this.x = e.clientX; this.y = e.clientY;
      this.pts.push({ x: this.x, y: this.y, vx: vx * .04, vy: vy * .04, a: 1 }); if (this.pts.length > 18) this.pts.shift(); this.start();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => { this.pts = []; this.x = this.y = -999; });
    addEventListener("blur", () => { this.pts = []; this.x = this.y = -999; });
  },
  start() { if (this.running) return; this.running = true; const loop = () => { if (this.draw()) requestAnimationFrame(loop); else this.running = false; }; requestAnimationFrame(loop); },
  draw() {
    const c = this.ctx; c.clearRect(0, 0, innerWidth, innerHeight);
    this.pts.forEach(p => { const s = .12, vx = p.vx * Math.cos(s) - p.vy * Math.sin(s), vy = p.vx * Math.sin(s) + p.vy * Math.cos(s); p.vx = vx * .96; p.vy = vy * .96; p.x += p.vx; p.y += p.vy; p.a -= .06; });
    this.pts = this.pts.filter(p => p.a > 0);
    c.lineCap = "round"; c.shadowColor = "rgba(255,90,118,.8)"; c.shadowBlur = 8;
    for (let i = 1; i < this.pts.length; i++) { const a = this.pts[i - 1], b = this.pts[i]; c.strokeStyle = `rgba(255,110,134,${b.a * .9})`; c.lineWidth = .6 + 2.6 * b.a; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }
    c.shadowBlur = 0;
    return this.pts.length > 0;
  }
};

/* ===================== ARCADE: Particle Invaders (CMS edition) ===================== */
/* You are a slice of the CMS detector. Quarks (in their three colour charges) come down; you fire photons.
   Sometimes a Higgs boson crosses the top: catch it. Between waves, a short physics fact. */
const GAME_TXT = {
  start: { en: "Run 3 · √s = 13.6 TeV · go!", es: "Run 3 · √s = 13,6 TeV · ¡vamos!" },
  higgs: { en: "Higgs boson found! m = 125 GeV · 5σ", es: "¡Bosón de Higgs encontrado! m = 125 GeV · 5σ" },
  over: { en: "Detector saturated! The trigger couldn't keep up", es: "¡Detector saturado! El trigger no dio abasto" },
  paused: { en: "PAUSED", es: "PAUSA" }, press: { en: "PRESS START", es: "PULSA START" },
  waves: [
    { en: "Quarks never travel alone: colour confinement", es: "Los quarks nunca viajan solos: confinamiento de color" },
    { en: "Photons carry the electromagnetic force", es: "Los fotones transmiten la fuerza electromagnética" },
    { en: "The LHC collides protons 40 million times a second", es: "El LHC hace chocar protones 40 millones de veces por segundo" },
    { en: "Six quarks: up, down, strange, charm, bottom, top", es: "Seis quarks: arriba, abajo, extraño, encanto, fondo, cima" },
    { en: "CMS weighs about 14,000 tonnes", es: "CMS pesa unas 14 000 toneladas" },
    { en: "Its magnet: 3.8 tesla, 100,000 times Earth's field", es: "Su imán: 3,8 teslas, 100 000 veces el campo terrestre" }
  ]
};
const Game = {
  W: 160, H: 144, state: "title", keys: {}, vis: false, full: false,
  init() {
    this.c = $("#game"); this.ctx = this.c.getContext("2d"); this.home = this.c.parentElement; this.fit(); addEventListener("resize", () => this.fit()); this.hi = store.get("dv_hi", 0); this.updHi();
    const map = { ArrowLeft: "left", ArrowRight: "right", a: "left", d: "right", " ": "fire", Enter: "start" };
    addEventListener("keydown", e => {
      const k = map[e.key]; if (!k || !this.vis) return;
      if (k === "start" && this.state !== "play" && (this.full || document.activeElement === this.c || document.activeElement === document.body)) { this.begin(); e.preventDefault(); return; }
      if (this.capturing() && k !== "start") { this.keys[k] = true; e.preventDefault(); }
    });
    addEventListener("keyup", e => { const k = map[e.key]; if (k) this.keys[k] = false; });
    this.c.addEventListener("click", () => { this.c.focus(); if (this.state !== "play") this.begin(); });
    $$(".console [data-k], .gamefull [data-k]").forEach(b => {
      const k = b.dataset.k;
      b.addEventListener("pointerdown", e => { e.preventDefault(); if (k === "start" || this.state !== "play") this.begin(); if (k !== "start") this.keys[k] = true; });
      ["pointerup", "pointerleave", "pointercancel"].forEach(ev => b.addEventListener(ev, () => this.keys[k] = false));
    });
    $("#gameClose").onclick = () => this.exitFull();
    $$("[data-play]").forEach(b => b.onclick = () => this.begin());
    this.draw();
  },
  capturing() { return this.state === "play" && this.vis; },
  /* the game thinks in 160×144 but the canvas has k× more pixels, so everything stays crisp */
  fit() { const w = this.c.getBoundingClientRect().width || 260, k = clamp(Math.round(w * DPR / 160), 2, 10); if (this.k !== k) { this.k = k; this.c.width = 160 * k; this.c.height = 144 * k; } this.ctx.setTransform(this.k, 0, 0, this.k, 0, 0); this.draw(performance.now()); },
  setVis(v) { this.vis = v; if (v) this.run(); else { this.keys = {}; if (this.full) this.exitFull(); if (this.state === "play") this.state = "pause"; } },
  updHi() { $("#hiscore").textContent = "HI " + String(this.hi).padStart(4, "0"); },
  /* Start goes full screen; Esc or ✕ puts the console back */
  enterFull() { if (this.full) return; this.full = true; $("#gScreen").appendChild(this.c); $("#gameFull").classList.add("on"); this.c.focus({ preventScroll: true }); requestAnimationFrame(() => this.fit()); },
  exitFull() {
    if (!this.full) return; this.full = false; $("#gameFull").classList.remove("on"); this.home.appendChild(this.c);
    this.keys = {}; if (this.state === "play") this.state = "pause"; this.idle(); requestAnimationFrame(() => this.fit());
  },
  idle() { $(".console").classList.toggle("idle", this.state !== "play"); },
  begin() {
    this.enterFull(); setTimeout(() => this.idle(), 0);
    if (this.state === "pause") { this.state = "play"; Sound.click(); this.run(); return; }
    this.state = "play"; this.score = 0; this.lives = 3; this.wave = 0; this.p = { x: 80 }; this.b = []; this.eb = []; this.fx = []; this.higgs = null; this.hT = 600;
    this.newWave(); this.say(GAME_TXT.start); Sound.click(); this.run();
  },
  say(t) { this.msg = { t: L(t), life: 150 }; },
  newWave() {
    this.wave++; this.en = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) this.en.push({ x: 20 + k * 18, y: 22 + r * 14, t: r, alive: true });
    this.dir = 1; this.speed = .16 + this.wave * .06; this.cool = 0;
    if (this.wave > 1) { const f = GAME_TXT.waves[(this.wave - 2) % GAME_TXT.waves.length]; this.say({ en: `Wave ${this.wave} · ${f.en}`, es: `Oleada ${this.wave} · ${f.es}` }); }
  },
  run() { if (this.running) return; this.running = true; let last = performance.now(); const loop = now => { if (!this.vis || document.hidden) { this.running = false; return; } const dt = Math.min(50, now - last) / 16.67; last = now; if (this.state === "play") this.step(dt); this.draw(now); requestAnimationFrame(loop); }; requestAnimationFrame(loop); },
  burst(x, y, cols) { for (let i = 0; i < 7; i++) this.fx.push({ x, y, a: i / 7 * 6.283 + Math.random() * .5, q: (Math.random() - .5) * .35, t: 0, col: cols[i % cols.length] }); },
  step(dt) {
    const k = this.keys; if (k.left) this.p.x -= 1.7 * dt; if (k.right) this.p.x += 1.7 * dt; this.p.x = clamp(this.p.x, 9, this.W - 9);
    this.cool -= dt; if (k.fire && this.cool <= 0) { this.b.push({ x: this.p.x, y: 122, t: 0 }); this.cool = 13; Sound.shoot(); }
    this.b.forEach(b => { b.y -= 3.2 * dt; b.t += dt; }); this.b = this.b.filter(b => b.y > -6);
    let edge = false; const alive = this.en.filter(e => e.alive);
    alive.forEach(e => { e.x += this.dir * this.speed * dt; if (e.x < 6 || e.x > this.W - 6) edge = true; });
    if (edge) { this.dir *= -1; alive.forEach(e => e.y += 4); }
    if (Math.random() < .012 * dt * (1 + this.wave * .3) && alive.length) { const s = alive[Math.floor(Math.random() * alive.length)]; this.eb.push({ x: s.x, y: s.y + 4 }); }
    this.eb.forEach(b => b.y += 1.4 * dt); this.eb = this.eb.filter(b => b.y < this.H);
    // the Higgs boson crosses the top now and then
    this.hT -= dt; if (!this.higgs && this.hT <= 0) { this.higgs = { x: -8, d: 1 }; if (Math.random() < .5) { this.higgs.x = this.W + 8; this.higgs.d = -1; } }
    if (this.higgs) { this.higgs.x += this.higgs.d * .7 * dt; if (this.higgs.x < -12 || this.higgs.x > this.W + 12) { this.higgs = null; this.hT = 700 + Math.random() * 500; } }
    const cols = ["#ff5a76", "#62e3b5", "#7cb2ff"];
    this.b.forEach(b => {
      alive.forEach(e => { if (e.alive && Math.abs(b.x - e.x) < 5 && Math.abs(b.y - e.y) < 5) { e.alive = false; b.y = -20; this.score += 10; this.burst(e.x, e.y, [cols[e.t], "#ffd166"]); Sound.boom(); } });
      if (this.higgs && Math.abs(b.x - this.higgs.x) < 7 && Math.abs(b.y - 10) < 6) { b.y = -20; this.score += 125; this.burst(this.higgs.x, 10, ["#e8b64c", "#fff", "#ffd166"]); this.higgs = null; this.hT = 900; this.say(GAME_TXT.higgs); Sound.collide(); }
    });
    this.eb.forEach(b => { if (b.y > 121 && b.y < 134 && Math.abs(b.x - this.p.x) < 8) { b.y = this.H + 9; this.lives--; this.burst(this.p.x, 128, ["#ff5a76", "#fff"]); Sound.collide(); if (this.lives <= 0) this.over(); } });
    if (alive.some(e => e.y > 114)) this.over();
    if (!this.en.some(e => e.alive)) this.newWave();
    this.fx.forEach(f => f.t += dt); this.fx = this.fx.filter(f => f.t < 22);
    if (this.msg) { this.msg.life -= dt; if (this.msg.life <= 0) this.msg = null; }
  },
  over() { this.state = "over"; this.idle(); this.say(GAME_TXT.over); this.msg.life = 1e9; if (this.score > this.hi) { this.hi = this.score; store.set("dv_hi", this.hi); this.updHi(); } },
  txt(s, x, y, col = "#e8edff", size = 7, w = 700) { const c = this.ctx; c.fillStyle = col; c.font = `${w} ${size}px "Space Mono", monospace`; c.textAlign = "center"; c.fillText(s, x, y); },
  wrap(s, x, y, maxW, size, col) {
    const c = this.ctx; c.font = `700 ${size}px "Space Mono", monospace`; const words = s.split(" "), lines = []; let ln = "";
    words.forEach(wd => { const tt = ln ? ln + " " + wd : wd; if (c.measureText(tt).width > maxW && ln) { lines.push(ln); ln = wd; } else ln = tt; }); if (ln) lines.push(ln);
    const lh = size + 2, bh = lines.length * lh + 6, y0 = y - bh / 2, top = y0 + 3 + size;
    c.fillStyle = "rgba(4,6,18,.88)"; c.fillRect(x - maxW / 2 - 5, y0, maxW + 10, bh);
    c.strokeStyle = "#e8b64c"; c.lineWidth = .5; c.strokeRect(x - maxW / 2 - 5, y0, maxW + 10, bh);
    lines.forEach((l, i) => this.txt(l, x, top + i * lh, col, size));
  },
  detector(x, y, s = 1) { // a tiny CMS cross-section
    const c = this.ctx; [[7, "#ff5a76"], [5.4, "#7cb2ff"], [3.8, "#e8b64c"], [2.2, "#0b1230"], [1.1, "#fff"]].forEach(([r, col]) => { c.fillStyle = col; c.beginPath(); c.arc(x, y, r * s, Math.PI, 0); c.closePath(); c.fill(); });
  },
  draw(now = 0) {
    const c = this.ctx, W = this.W, H = this.H; c.fillStyle = "#060915"; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 34; i++) { c.fillStyle = i % 5 ? "#1b2550" : "#3a4a85"; c.fillRect((i * 53) % W, (i * 31 + now / 70) % H, 1, 1); }
    c.strokeStyle = "rgba(124,178,255,.08)"; for (let r = 30; r < 170; r += 22) { c.beginPath(); c.arc(W / 2, H + 20, r, Math.PI, 0); c.stroke(); }
    const blink = Math.floor(now / 500) % 2, cols = ["#ff5a76", "#62e3b5", "#7cb2ff"];
    if (this.state === "title") {
      this.txt("PARTICLE", 80, 40, "#e8b64c", 12); this.txt("INVADERS", 80, 55, "#7cb2ff", 12); this.txt("CMS edition", 80, 67, "#8d97c0", 6, 400);
      cols.forEach((col, i) => { c.fillStyle = col; c.beginPath(); c.arc(62 + i * 18, 84 + Math.sin(now / 300 + i) * 2, 3.5, 0, 7); c.fill(); });
      this.detector(80, 118, 1.3); if (blink || REDUCED) this.txt(L(GAME_TXT.press), 80, 136, "#e8edff", 7); return;
    }
    this.en.forEach(e => { if (!e.alive) return; c.fillStyle = cols[e.t]; c.beginPath(); c.arc(e.x, e.y, 3.6, 0, 7); c.fill(); c.fillStyle = "rgba(255,255,255,.85)"; c.fillRect(e.x - 1, e.y - 1, 1.5, 1.5); c.strokeStyle = cols[e.t]; c.globalAlpha = .35; c.beginPath(); c.arc(e.x, e.y, 5.5, 0, 7); c.stroke(); c.globalAlpha = 1; });
    if (this.higgs) { const x = this.higgs.x; c.fillStyle = "#e8b64c"; c.shadowColor = "#e8b64c"; c.shadowBlur = 6; c.beginPath(); c.arc(x, 10, 5, 0, 7); c.fill(); c.shadowBlur = 0; this.txt("H", x, 12.5, "#1d1203", 7); }
    c.strokeStyle = "#ffd166"; c.lineWidth = 1; this.b.forEach(b => { c.beginPath(); for (let k = 0; k <= 6; k++) { const yy = b.y + k, xx = b.x + Math.sin((yy + b.t * 3) * 1.4) * 1.3; k ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.stroke(); });
    c.fillStyle = "#ff7aa8"; this.eb.forEach(b => { c.beginPath(); c.arc(b.x, b.y, 1.3, 0, 7); c.fill(); });
    this.detector(this.p.x, 132);
    this.fx.forEach(f => { c.strokeStyle = f.col; c.globalAlpha = 1 - f.t / 22; c.beginPath(); let x = f.x, y = f.y, a = f.a; c.moveTo(x, y); for (let s2 = 0; s2 < f.t * .7; s2++) { a += f.q; x += Math.cos(a); y += Math.sin(a); c.lineTo(x, y); } c.stroke(); c.globalAlpha = 1; });
    c.fillStyle = "rgba(6,9,21,.9)"; c.fillRect(0, 136, W, 8);
    this.txt("E " + String(this.score).padStart(4, "0") + " GeV", 34, 142.5, "#e8b64c", 6); this.txt("W" + this.wave, 80, 142.5, "#8d97c0", 6);
    for (let i = 0; i < this.lives; i++) this.detector(132 + i * 9, 142, .5);
    if (this.msg && this.state !== "pause") this.wrap(this.msg.t, 80, 74, 132, 7, "#e8edff");
    if (this.state === "pause") this.wrap(L(GAME_TXT.paused) + " · " + L(GAME_TXT.press), 80, 100, 120, 7, "#ffd166");
    if (this.state === "over" && blink) this.txt(L(GAME_TXT.press), 80, 110, "#ffd166", 7);
  }
};

/* ===================== INTRO: open the book ===================== */
const Intro = {
  done: false,
  init() {
    this.el = $("#intro"); this.bh = miniBH($("#bookbh"), "#0b1230");
    $("#openBook").onclick = () => this.open(); $("#book").onclick = () => this.open(); $("#skipIntro").onclick = () => this.hide(true);
    $("#replayIntro").onclick = () => this.show();
    addEventListener("keydown", e => { if (!this.visible()) return; if (!this.opening && e.key === "Enter") { e.preventDefault(); this.open(); } if (e.key === "Escape") this.hide(true); });
    if (store.get("dv_intro_seen", false)) this.hide(true); else this.show();
  },
  visible() { return this.el.style.display !== "none"; },
  show() {
    this.opening = false; this.done = false; Uni.clearHover(); this.el.style.display = ""; this.el.classList.remove("gone"); const sc = $("#scene"); sc.classList.remove("open", "dive"); sc.style.transformOrigin = ""; $("#introUi").style.opacity = 1;
    requestAnimationFrame(() => CMSCover.draw()); this.loop(); setTimeout(() => $("#openBook").focus(), 50);
  },
  loop() { const f = now => { if (!this.visible()) return; this.bh(REDUCED ? 0 : now / 1000); requestAnimationFrame(f); }; requestAnimationFrame(f); },
  open() {
    if (this.opening) return; this.opening = true; Sound.open(); $("#introUi").style.opacity = 0;
    const sc = $("#scene"); sc.classList.add("open");
    if (REDUCED) return this.hide(false);
    // after the cover has turned, dive into the black hole drawn on the first page
    setTimeout(() => {
      const r = sc.getBoundingClientRect(), b = $("#bookbh").getBoundingClientRect();
      sc.style.transformOrigin = `${b.left + b.width / 2 - r.left}px ${b.top + b.height / 2 - r.top}px`;
      sc.classList.add("dive"); Sound.warp();
    }, 1500);
    setTimeout(() => this.hide(false), 2650);
  },
  /* Every time the portfolio starts (intro or not), the particles collide on the name */
  hide(instant) {
    store.set("dv_intro_seen", true); this.done = true;
    if (instant) { this.el.style.display = "none"; this.el.classList.add("gone"); } else { this.el.classList.add("gone"); setTimeout(() => this.el.style.display = "none", 700); }
    setTimeout(() => { if (!CURVIEW && Uni.i === 0) NameFX.fire(); }, instant ? 450 : 700);
  }
};

/* ===================== START ===================== */
/* ===================== JOURNEY: an animated Feynman diagram ===================== */
/* Three real processes take turns: e⁻e⁺ → γ* → μ⁻μ⁺ (QED), gg → H → γγ (how CMS found the Higgs) and β decay (weak force).
   Lines draw themselves in time order, particles run along them, vertices flash. Click = next process; hover = pause. */
const Feyn = {
  C: { l: "#62e3b5", q: "#b18cff", b: "#ff9a4c", h: "#e8b64c" },
  P: [
    { name: { en: "e⁻e⁺ → γ* → μ⁻μ⁺ · electromagnetism", es: "e⁻e⁺ → γ* → μ⁻μ⁺ · electromagnetismo" },
      tip: { en: "Matter and antimatter annihilate into light, and light becomes new matter.", es: "Materia y antimateria se aniquilan en luz, y la luz se vuelve materia nueva." },
      n: { a: [24, 30], b: [24, 200], v1: [140, 115], v2: [260, 115], c: [376, 30], d: [376, 200] },
      e: [["a", "v1", "f", "l", "e⁻", 0], ["b", "v1", "fa", "l", "e⁺", 0], ["v1", "v2", "w", "b", "γ*", 1], ["v2", "c", "f", "l", "μ⁻", 2], ["v2", "d", "fa", "l", "μ⁺", 2]] },
    { name: { en: "gg → H → γγ · the Higgs boson", es: "gg → H → γγ · el bosón de Higgs" },
      tip: { en: "The channel in which CMS and ATLAS discovered the Higgs at CERN in 2012.", es: "El canal con el que CMS y ATLAS descubrieron el Higgs en el CERN en 2012." },
      n: { a: [24, 30], b: [24, 200], t1: [112, 72], t2: [112, 158], t3: [166, 115], v2: [282, 115], c: [376, 30], d: [376, 200] },
      e: [["a", "t1", "g", "b", "g", 0], ["b", "t2", "g", "b", "g", 0], ["t1", "t2", "f", "q", "t", 1], ["t2", "t3", "f", "q", "", 1], ["t3", "t1", "f", "q", "", 1], ["t3", "v2", "h", "h", "H", 2], ["v2", "c", "w", "b", "γ", 3], ["v2", "d", "w", "b", "γ", 3]] },
    { name: { en: "d → u W⁻ → u e⁻ ν̄ₑ · weak force (β decay)", es: "d → u W⁻ → u e⁻ ν̄ₑ · fuerza débil (desintegración β)" },
      tip: { en: "A quark changes flavour by emitting a W boson: the same force that lets the Sun shine.", es: "Un quark cambia de sabor emitiendo un bosón W: la misma fuerza que hace brillar al Sol." },
      n: { a: [24, 178], v1: [150, 178], b: [376, 208], v2: [258, 82], c: [376, 28], d: [376, 128] },
      e: [["a", "v1", "f", "q", "d", 0], ["v1", "b", "f", "q", "u", 1], ["v1", "v2", "w", "b", "W⁻", 1], ["v2", "c", "f", "l", "e⁻", 2], ["v2", "d", "fa", "l", "ν̄ₑ", 2]] }
  ],
  k: 0, t: 0, run: false, vis: false, hover: false,
  init() {
    const el = $("#feyn"); if (!el) return; this.el = el;
    el.innerHTML = `<svg viewBox="0 0 400 232" role="img" aria-label="Feynman diagram"><defs><filter id="fyg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g class="fy-g"></g></svg><figcaption><span class="fy-dots"></span><b class="fy-name"></b><span class="fy-tip"></span></figcaption>`;
    this.svg = $("svg", el); this.g = $(".fy-g", el);
    $(".fy-dots", el).innerHTML = this.P.map((_, j) => `<button type="button" data-j="${j}" aria-label="${j + 1}"></button>`).join("");
    $$(".fy-dots button", el).forEach(b => b.onclick = e => { e.stopPropagation(); this.set(+b.dataset.j); Sound.click(); });
    this.svg.addEventListener("click", () => { this.set((this.k + 1) % this.P.length); Sound.click(); });
    el.addEventListener("pointerenter", () => { this.hover = true; el.classList.add("hov"); });
    el.addEventListener("pointerleave", () => { this.hover = false; el.classList.remove("hov"); });
    new IntersectionObserver(es => es.forEach(e => { this.vis = e.isIntersecting; this.go(); })).observe(el);
    document.addEventListener("visibilitychange", () => this.go());
    langListeners.push(() => this.caption());
    this.set(0);
  },
  path(type, [x1, y1], [x2, y2]) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
    if (type === "w") { const n = Math.max(2, Math.round(L / 6)), A = 4.5; let d = `M${x1},${y1}`; for (let i = 1; i <= 120; i++) { const u = i / 120, o = A * Math.sin(n * Math.PI * u); d += ` L${(x1 + dx * u + nx * o).toFixed(1)},${(y1 + dy * u + ny * o).toFixed(1)}`; } return d; }
    if (type === "g") { const m = Math.max(3, Math.round(L / 11)), r = 5; let d = `M${x1},${y1}`; for (let i = 1; i <= 220; i++) { const u = i / 220, th = 2 * Math.PI * m * u, al = L * u - 1.7 * r * Math.sin(th), pe = r * (1 - Math.cos(th)); d += ` L${(x1 + ux * al + nx * pe).toFixed(1)},${(y1 + uy * al + ny * pe).toFixed(1)}`; } return d; }
    return `M${x1},${y1} L${x2},${y2}`;
  },
  set(k) {
    this.k = k; this.t = REDUCED ? 99 : 0; const P = this.P[k], C = this.C, ns = "http://www.w3.org/2000/svg";
    this.g.innerHTML = ""; this.g.style.opacity = 1; this.edges = []; this.verts = [];
    const cx = 200, cy = 115;
    P.e.forEach(([a, b, type, col, lab, st]) => {
      const A = P.n[a], B = P.n[b], p = document.createElementNS(ns, "path"), c = C[col];
      p.setAttribute("d", this.path(type === "fa" ? "f" : type, A, B)); p.setAttribute("class", "fy-l " + type); p.style.stroke = c;
      this.g.appendChild(p);
      const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      const ext = !/^v|^t/.test(a) || !/^v|^t/.test(b), u = ext ? (/^v|^t/.test(a) ? .82 : .18) : .5, pt = p.getPointAtLength(L * u);
      const dir = [B[0] - A[0], B[1] - A[1]], dl = Math.hypot(...dir); let nx = -dir[1] / dl, ny = dir[0] / dl;
      if ((pt.x + nx - cx) ** 2 + (pt.y + ny - cy) ** 2 < (pt.x - cx) ** 2 + (pt.y - cy) ** 2) { nx = -nx; ny = -ny; }
      let tx = null; if (lab) { tx = document.createElementNS(ns, "text"); tx.textContent = lab; tx.setAttribute("x", (pt.x + nx * 14).toFixed(1)); tx.setAttribute("y", (pt.y + ny * 14 + 4).toFixed(1)); tx.setAttribute("class", "fy-t"); tx.style.fill = c; this.g.appendChild(tx); }
      let ar = null; if (type === "f" || type === "fa") { const m = p.getPointAtLength(L / 2), ang = Math.atan2(dir[1], dir[0]) * 180 / Math.PI + (type === "fa" ? 180 : 0); ar = document.createElementNS(ns, "path"); ar.setAttribute("d", "M-4,-3.5 L4,0 L-4,3.5 Z"); ar.setAttribute("transform", `translate(${m.x},${m.y}) rotate(${ang})`); ar.setAttribute("class", "fy-ar"); ar.style.fill = c; this.g.appendChild(ar); }
      const dot = document.createElementNS(ns, "circle"); dot.setAttribute("r", type === "h" ? 4 : 3); dot.setAttribute("class", "fy-dot"); dot.style.fill = c; dot.setAttribute("filter", "url(#fyg)"); this.g.appendChild(dot);
      this.edges.push({ p, L, tx, ar, dot, st, type, a, b });
    });
    // a vertex flashes when the lines of its stage arrive
    const vs = {}; this.edges.forEach(e => { if (/^v|^t/.test(e.b)) vs[e.b] = Math.min(vs[e.b] ?? 9, e.st); });
    for (const n in vs) { const [x, y] = P.n[n], f = document.createElementNS(ns, "circle"), d = document.createElementNS(ns, "circle"); f.setAttribute("cx", x); f.setAttribute("cy", y); f.setAttribute("class", "fy-fl"); d.setAttribute("cx", x); d.setAttribute("cy", y); d.setAttribute("r", 2.6); d.setAttribute("class", "fy-v"); this.g.appendChild(f); this.g.appendChild(d); this.verts.push({ f, d, st: vs[n] }); }
    this.stages = Math.max(...P.e.map(e => e[5])) + 1;
    this.caption(); this.draw(); this.go();
  },
  caption() {
    if (!this.el) return; const P = this.P[this.k];
    $(".fy-name", this.el).textContent = L(P.name); $(".fy-tip", this.el).textContent = L(P.tip);
    $$(".fy-dots button", this.el).forEach((b, j) => b.setAttribute("aria-current", j === this.k));
  },
  go() {
    const ok = this.vis && !document.hidden && CURVIEW === "journey" && !REDUCED;
    if (ok && !this.run) { this.run = true; this.last = performance.now(); requestAnimationFrame(n => this.loop(n)); }
    if (!ok) this.run = false;
  },
  loop(now) {
    if (!this.run) return;
    const dt = Math.min(.05, (now - this.last) / 1000); this.last = now;
    const end = this.stages + 2.8;
    if (!this.hover || this.t < end) this.t += dt;   // hover only holds the finished diagram, it never freezes the drawing
    if (this.t > end + .6) { this.set((this.k + 1) % this.P.length); }
    else { this.g.style.opacity = this.t > end ? Math.max(0, 1 - (this.t - end) / .6) : 1; this.draw(); }
    if (CURVIEW !== "journey") this.run = false; else requestAnimationFrame(n => this.loop(n));
  },
  draw() {
    const t = this.t;
    this.edges.forEach(e => {
      const p = clamp((t - e.st) / .85, 0, 1), ez = 1 - Math.pow(1 - p, 2);
      if (e.type === "h" && p >= 1) { e.p.style.strokeDasharray = "7 5"; e.p.style.strokeDashoffset = -t * 18; e.p.style.opacity = .75 + .25 * Math.sin(t * 5); }
      else { e.p.style.strokeDasharray = e.L; e.p.style.strokeDashoffset = e.L * (1 - ez); }
      if (e.tx) e.tx.style.opacity = clamp((p - .45) * 2.2, 0, 1);
      if (e.ar) e.ar.style.opacity = p > .55 ? 1 : 0;
      if (p > 0 && p < 1) { const q = e.p.getPointAtLength(e.L * ez); e.dot.setAttribute("cx", q.x); e.dot.setAttribute("cy", q.y); e.dot.style.opacity = 1; } else e.dot.style.opacity = 0;
    });
    this.verts.forEach(v => {
      const te = v.st + .85, f = t >= te ? Math.max(0, 1 - (t - te) / .55) : 0;
      v.f.setAttribute("r", (3 + 13 * (1 - f)).toFixed(1)); v.f.style.opacity = f; v.d.style.opacity = t >= te ? 1 : 0;
    });
  }
};

function boot() {
  $$(".contact-slot").forEach(s => s.appendChild($("#contactTpl").content.cloneNode(true)));
  captureEN();
  Portal.init(); renderFilters(); renderGrid(); renderStory(); renderStickers(); renderTimeline(); renderNext(); renderPassStickers(); wireOviedoLink();
  NameFX.init(); CursorFX.init(); Pass.init(); BackUni.init(); Feyn.init(); Game.init(); Uni.init(); Visited.paint();
  const stars = () => { drawStars($("#viewStars"), 4200); drawStars($("#introStars"), 2200); };
  stars(); addEventListener("resize", () => { clearTimeout(boot._r); boot._r = setTimeout(() => { stars(); if (Intro.visible()) CMSCover.draw(); }, 200); });
  langListeners.push(() => { renderFilters(); renderGrid(); renderStory(); renderStickers(); renderTimeline(); renderNext(); renderPassStickers(); wireOviedoLink(); Visited.paint(); if ($("#modal").classList.contains("open")) fillModal(); if (Portal.key) Portal.label(); soundLabel(); });
  $$(".seg button").forEach(b => b.onclick = () => { setLang(b.dataset.lang); Sound.click(); });
  const wantSound = store.get("dv_sound", false);
  $("#soundBtn").onclick = () => setSound(!Sound.on);
  if (wantSound) { const once = () => { setSound(true); removeEventListener("pointerdown", once); }; addEventListener("pointerdown", once); }
  $$("[data-copy]").forEach(b => b.onclick = copyEmail);
  $$("[data-back]").forEach(b => b.onclick = () => { Sound.click(); goHome(); });
  $$("[data-fall]").forEach(b => b.onclick = () => { Sound.click(); Uni.go(1); });
  $("#brand").onclick = $("#backBtn").onclick = () => { Sound.click(); goHome(); };
  $$("#cvBtn, [data-cv]").forEach(b => b.onclick = () => { toast(T().cvmsg); Sound.click(); });
  $("#mClose").onclick = () => closeModal(); $("#mPrev").onclick = () => stepModal(-1); $("#mNext").onclick = () => stepModal(1);
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  addEventListener("hashchange", route);
  addEventListener("keydown", e => {
    if (Intro.visible()) return;
    if (Game.full) { if (e.key === "Escape") { e.preventDefault(); Game.exitFull(); } return; }
    if ($("#modal").classList.contains("open")) {
      if (e.key === "Escape") closeModal(); if (e.key === "ArrowRight") stepModal(1); if (e.key === "ArrowLeft") stepModal(-1);
      if (e.key === "Tab") { const f = $$("#mPanel button, #mPanel a"); const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); } }
      return;
    }
    if (CURVIEW) { if (e.key === "Escape") { e.preventDefault(); goHome(); } return; }
    if (/^(INPUT|TEXTAREA|BUTTON|A)$/.test(document.activeElement.tagName) && e.key === "Enter") return;
    if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") { Uni.go(Uni.i + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { Uni.go(Uni.i - 1); e.preventDefault(); }
    if (e.key === "Enter" && !Uni.tr) { e.preventDefault(); $("#stopcard button").click(); }
  });
  Intro.init(); route();
}
boot();
