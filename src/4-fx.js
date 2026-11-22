/* ===================== NAME: particle collision ===================== */
const NameFX = {
  init() {
    this.c = $("#namefx"); this.name = $("#name"); this.busy = false; this.last = 0;
    const size = () => { const r = this.name.getBoundingClientRect(); this.w = r.width + 120; this.h = r.height + 120; this.ctx = fitCanvas(this.c, this.w, this.h); this.c.style.width = this.w + "px"; this.c.style.height = this.h + "px"; this.c.style.left = (this.name.offsetLeft - 60) + "px"; this.c.style.top = (this.name.offsetTop - 60) + "px"; };
    size(); new ResizeObserver(size).observe(this.name);
    this.name.addEventListener("click", () => this.fire());
    this.name.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.fire(); } });
    this.name.addEventListener("mouseenter", () => { if (performance.now() - this.last > 4000) this.fire(); });
  },
  fire() {
    if (this.busy) return; this.busy = true; this.last = performance.now(); Sound.collide();
    const w = this.w, h = this.h, cx = w / 2, cy = h / 2, start = performance.now(), cols = ["#7cb2ff", "#ffb45e", "#ff5a76", "#62e3b5", "#ffd166", "#c6b3ff", "#ffffff"];
    let tracks = [];
    const spawn = () => { tracks = Array.from({ length: 22 }, (_, i) => { const a = Math.random() * Math.PI * 2, v = 1.2 + Math.random() * 3.2; return { x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v, q: (Math.random() - .5) * .16, col: cols[i % cols.length], tr: [] }; }); };
    const ctx = this.ctx;
    const loop = now => {
      const el = (now - start) / 1000; ctx.clearRect(0, 0, w, h);
      if (el < .35 && !REDUCED) {
        const p = el / .35; ctx.fillStyle = "#7cb2ff"; ctx.shadowColor = "#7cb2ff"; ctx.shadowBlur = 10;
        ctx.beginPath(); ctx.arc(lerp(0, cx, p), cy, 3, 0, 7); ctx.fill(); ctx.fillStyle = "#ff5a76"; ctx.shadowColor = "#ff5a76"; ctx.beginPath(); ctx.arc(lerp(w, cx, p), cy, 3, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
        ctx.strokeStyle = "rgba(124,178,255,.4)"; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(lerp(0, cx, p), cy); ctx.stroke(); ctx.strokeStyle = "rgba(255,90,118,.4)"; ctx.beginPath(); ctx.moveTo(w, cy); ctx.lineTo(lerp(w, cx, p), cy); ctx.stroke();
      } else {
        if (!tracks.length) { spawn(); this.name.animate([{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }], { duration: 300 }); }
        const k = clamp((el - .35) / 1.6, 0, 1);
        if (k < .15) { const f = 1 - k / .15; const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * (1 - f) + 10); g.addColorStop(0, `rgba(255,255,255,${f})`); g.addColorStop(1, "rgba(255,255,255,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
        tracks.forEach(p => { if (!REDUCED) for (let s = 0; s < 2; s++) { const a = p.q, vx = p.vx * Math.cos(a) - p.vy * Math.sin(a), vy = p.vx * Math.sin(a) + p.vy * Math.cos(a); p.vx = vx * .985; p.vy = vy * .985; p.x += p.vx; p.y += p.vy; p.tr.push([p.x, p.y]); }
          ctx.strokeStyle = p.col; ctx.globalAlpha = 1 - k; ctx.lineWidth = 1.3; ctx.beginPath(); p.tr.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(cx, cy)); ctx.stroke(); });
        ctx.globalAlpha = 1; if (k >= 1) { ctx.clearRect(0, 0, w, h); this.busy = false; return; }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
};

/* ===================== CURSOR: a charged particle in a magnetic field ===================== */
const CursorFX = {
  init() {
    if (!FINE || REDUCED) return;
    this.c = $("#cursorfx"); this.pts = []; this.x = -99; this.y = -99; this.running = false;
    const size = () => this.ctx = fitCanvas(this.c, innerWidth, innerHeight); size(); addEventListener("resize", size);
    addEventListener("pointermove", e => { if (e.pointerType !== "mouse") return; const vx = e.clientX - this.x, vy = e.clientY - this.y; this.x = e.clientX; this.y = e.clientY; this.pts.push({ x: this.x, y: this.y, vx: vx * .05, vy: vy * .05, a: 1 }); if (this.pts.length > 40) this.pts.shift(); this.start(); }, { passive: true });
    document.addEventListener("pointerleave", () => { this.x = -99; });
  },
  start() { if (this.running) return; this.running = true; const loop = () => { if (this.draw()) requestAnimationFrame(loop); else this.running = false; }; requestAnimationFrame(loop); },
  draw() {
    const c = this.ctx; c.clearRect(0, 0, innerWidth, innerHeight);
    this.pts.forEach(p => { const s = .12, vx = p.vx * Math.cos(s) - p.vy * Math.sin(s), vy = p.vx * Math.sin(s) + p.vy * Math.cos(s); p.vx = vx * .96; p.vy = vy * .96; p.x += p.vx; p.y += p.vy; p.a -= .035; });
    this.pts = this.pts.filter(p => p.a > 0);
    for (let i = 1; i < this.pts.length; i++) { const a = this.pts[i - 1], b = this.pts[i]; c.strokeStyle = `rgba(255,90,118,${b.a * .7})`; c.lineWidth = 1.6 * b.a; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }
    if (this.x > 0) { c.fillStyle = "#ff5a76"; c.shadowColor = "#ff5a76"; c.shadowBlur = 12; c.beginPath(); c.arc(this.x, this.y, 3.5, 0, 7); c.fill(); c.shadowBlur = 0; }
    return this.pts.length > 0;
  }
};

/* ===================== ARCADE: Particle Invaders ===================== */
const Game = {
  W: 160, H: 144, state: "title", keys: {}, vis: false,
  init() {
    this.c = $("#game"); this.ctx = this.c.getContext("2d"); this.hi = store.get("dv_hi", 0); this.updHi();
    new IntersectionObserver(es => { this.vis = es[0].isIntersecting; if (this.vis) this.run(); }, { threshold: .2 }).observe(this.c);
    const map = { ArrowLeft: "left", ArrowRight: "right", a: "left", d: "right", " ": "fire", Enter: "start" };
    addEventListener("keydown", e => { const k = map[e.key]; if (!k) return; if (k === "start" && (document.activeElement === this.c || (this.vis && this.state !== "play" && document.activeElement === document.body))) { this.begin(); e.preventDefault(); return; } if (this.capturing() && k !== "start") { this.keys[k] = true; e.preventDefault(); } });
    addEventListener("keyup", e => { const k = map[e.key]; if (k) this.keys[k] = false; });
    this.c.addEventListener("click", () => { this.c.focus(); if (this.state !== "play") this.begin(); });
    $$(".console [data-k]").forEach(b => {
      const k = b.dataset.k;
      b.addEventListener("pointerdown", e => { e.preventDefault(); if (k === "start") this.begin(); else { this.keys[k] = true; if (this.state !== "play") this.begin(); } });
      ["pointerup", "pointerleave", "pointercancel"].forEach(ev => b.addEventListener(ev, () => this.keys[k] = false));
    });
    this.draw();
  },
  capturing() { return this.state === "play" && this.vis; },
  updHi() { $("#hiscore").textContent = "HI " + String(this.hi).padStart(3, "0"); },
  begin() { this.state = "play"; this.score = 0; this.lives = 3; this.wave = 0; this.p = { x: 74 }; this.b = []; this.eb = []; this.fx = []; this.newWave(); Sound.click(); this.run(); },
  newWave() { this.wave++; this.en = []; for (let r = 0; r < 3; r++) for (let k = 0; k < 7; k++) this.en.push({ x: 18 + k * 18, y: 18 + r * 13, t: r, alive: true }); this.dir = 1; this.speed = .18 + this.wave * .07; this.cool = 0; },
  run() { if (this.running) return; this.running = true; let last = performance.now(); const loop = now => { if (!this.vis || document.hidden) { this.running = false; return; } const dt = Math.min(50, now - last) / 16.67; last = now; if (this.state === "play") this.step(dt); this.draw(now); requestAnimationFrame(loop); }; requestAnimationFrame(loop); },
  step(dt) {
    const k = this.keys; if (k.left) this.p.x -= 1.6 * dt; if (k.right) this.p.x += 1.6 * dt; this.p.x = clamp(this.p.x, 2, this.W - 14);
    this.cool -= dt; if (k.fire && this.cool <= 0) { this.b.push({ x: this.p.x + 6, y: 124 }); this.cool = 14; Sound.shoot(); }
    this.b.forEach(b => b.y -= 3.2 * dt); this.b = this.b.filter(b => b.y > -4);
    let edge = false; const alive = this.en.filter(e => e.alive);
    alive.forEach(e => { e.x += this.dir * this.speed * dt; if (e.x < 4 || e.x > this.W - 10) edge = true; });
    if (edge) { this.dir *= -1; alive.forEach(e => e.y += 4); }
    if (Math.random() < .012 * dt * (1 + this.wave * .3) && alive.length) { const s = alive[Math.floor(Math.random() * alive.length)]; this.eb.push({ x: s.x + 3, y: s.y + 6 }); }
    this.eb.forEach(b => b.y += 1.4 * dt); this.eb = this.eb.filter(b => b.y < this.H);
    this.b.forEach(b => alive.forEach(e => { if (e.alive && b.y < e.y + 7 && b.y > e.y - 2 && b.x > e.x - 1 && b.x < e.x + 8) { e.alive = false; b.y = -10; this.score += 10; this.fx.push({ x: e.x + 3, y: e.y + 3, t: 0 }); Sound.boom(); } }));
    this.eb.forEach(b => { if (b.y > 124 && b.y < 134 && b.x > this.p.x - 1 && b.x < this.p.x + 13) { b.y = this.H + 9; this.lives--; this.fx.push({ x: this.p.x + 6, y: 128, t: 0 }); Sound.collide(); if (this.lives <= 0) this.over(); } });
    if (alive.some(e => e.y > 116)) this.over();
    if (!this.en.some(e => e.alive)) this.newWave();
    this.fx.forEach(f => f.t += dt); this.fx = this.fx.filter(f => f.t < 18);
  },
  over() { this.state = "over"; if (this.score > this.hi) { this.hi = this.score; store.set("dv_hi", this.hi); this.updHi(); } },
  txt(s, x, y, col = "#9bd27a", size = 8) { const c = this.ctx; c.fillStyle = col; c.font = `${size}px "JetBrains Mono", monospace`; c.textAlign = "center"; c.fillText(s, x, y); },
  draw(now = 0) {
    const c = this.ctx, W = this.W, H = this.H; c.fillStyle = "#0b1410"; c.fillRect(0, 0, W, H);
    for (let i = 0; i < 30; i++) { c.fillStyle = "#1e3324"; c.fillRect((i * 53) % W, (i * 31 + now / 60) % H, 1, 1); }
    const blink = Math.floor(now / 500) % 2;
    if (this.state === "title") { this.txt("PARTICLE", 80, 48, "#9bd27a", 13); this.txt("INVADERS", 80, 64, "#ffd166", 13); const q = ["#ff5a5a", "#5aff8a", "#5a9bff"]; q.forEach((col, i) => { c.fillStyle = col; c.fillRect(62 + i * 14, 80, 7, 7); }); if (blink || REDUCED) this.txt("PRESS START", 80, 112, "#e8edff", 8); return; }
    const cols = ["#ff5a5a", "#5aff8a", "#5a9bff"];
    this.en.forEach(e => { if (!e.alive) return; c.fillStyle = cols[e.t]; c.fillRect(e.x + 1, e.y, 5, 7); c.fillRect(e.x, e.y + 1, 7, 5); c.fillStyle = "#0b1410"; c.fillRect(e.x + 2, e.y + 2, 1, 1); c.fillRect(e.x + 4, e.y + 2, 1, 1); });
    c.fillStyle = "#ffd166"; this.b.forEach(b => c.fillRect(b.x, b.y, 1, 4));
    c.fillStyle = "#ff7aa8"; this.eb.forEach(b => { c.fillRect(b.x, b.y, 1, 1); c.fillRect(b.x + 1, b.y + 1, 1, 1); c.fillRect(b.x, b.y + 2, 1, 1); });
    c.fillStyle = "#9bd27a"; c.fillRect(this.p.x, 128, 13, 4); c.fillRect(this.p.x + 5, 125, 3, 3); c.fillRect(this.p.x + 2, 132, 9, 2);
    this.fx.forEach(f => { c.fillStyle = `rgba(255,220,120,${1 - f.t / 18})`; for (let a = 0; a < 8; a++) c.fillRect(f.x + Math.cos(a) * f.t * .6, f.y + Math.sin(a) * f.t * .6, 1, 1); });
    c.fillStyle = "#1e3324"; c.fillRect(0, 136, W, 8); this.txt("SCORE " + String(this.score).padStart(4, "0"), 40, 143, "#9bd27a", 7); this.txt("♥".repeat(Math.max(0, this.lives)), 136, 143, "#ff5a76", 7);
    if (this.state === "over") { c.fillStyle = "rgba(0,0,0,.6)"; c.fillRect(0, 40, W, 60); this.txt("GAME OVER", 80, 64, "#ff5a76", 12); if (blink) this.txt("PRESS START", 80, 84, "#e8edff", 8); }
  }
};

/* ===================== INTRO: open the book ===================== */
const Intro = {
  init() {
    this.el = $("#intro"); this.bh = miniBH($("#bookbh"), "#f1e9d6");
    $("#openBook").onclick = () => this.open(); $("#book").onclick = () => this.open(); $("#skipIntro").onclick = () => this.hide(true);
    $("#replayIntro").onclick = () => this.show();
    addEventListener("keydown", e => { if (this.el.style.display !== "none" && !this.opening && e.key === "Enter") { e.preventDefault(); this.open(); } if (this.el.style.display !== "none" && e.key === "Escape") this.hide(true); });
    if (store.get("dv_intro_seen", false)) this.hide(true, true); else this.show();
  },
  show() {
    this.opening = false; this.el.style.display = ""; this.el.classList.remove("gone"); $("#book").classList.remove("open"); $("#scene").classList.remove("dive"); $("#introUi").style.opacity = 1;
    document.body.style.overflow = "hidden"; this.loop(); setTimeout(() => $("#openBook").focus(), 50);
  },
  loop() { const f = now => { if (this.el.style.display === "none") return; this.bh(REDUCED ? 0 : now / 1000); requestAnimationFrame(f); }; requestAnimationFrame(f); },
  open() {
    if (this.opening) return; this.opening = true; Sound.open(); $("#introUi").style.opacity = 0; $("#book").classList.add("open");
    if (REDUCED) return this.hide(false);
    setTimeout(() => { $("#scene").classList.add("dive"); Sound.warp(); }, 1250);
    setTimeout(() => this.hide(false), 2350);
  },
  hide(instant, silent) {
    store.set("dv_intro_seen", true); document.body.style.overflow = "";
    if (instant) { this.el.style.display = "none"; this.el.classList.add("gone"); } else { this.el.classList.add("gone"); setTimeout(() => this.el.style.display = "none", 700); }
    if (!silent) setTimeout(() => NameFX.fire(), instant ? 200 : 600);
  }
};

/* ===================== START ===================== */
function boot() {
  captureEN();
  drawStars(); addEventListener("resize", () => { clearTimeout(boot._r); boot._r = setTimeout(drawStars, 200); });
  renderFilters(); renderGrid(); renderTimeline(); renderBento();
  initStickers();
  NameFX.init(); CursorFX.init(); Game.init(); Uni.init();
  renderNav(); initSpy(); Intro.init();
  langListeners.push(() => { renderFilters(); renderGrid(); renderTimeline(); renderBento(); renderNav(); Uni.ui(); if ($("#modal").classList.contains("open")) fillModal(); soundLabel(); });
  $$(".seg button").forEach(b => b.onclick = () => { setLang(b.dataset.lang); Sound.click(); });
  if (LANG !== "en") setLang(LANG);
  const wantSound = store.get("dv_sound", false);
  $("#soundBtn").onclick = () => setSound(!Sound.on);
  if (wantSound) { const once = () => { setSound(true); removeEventListener("pointerdown", once); }; addEventListener("pointerdown", once); }
  $("#copyEmail").onclick = copyEmail;
  $("#cvBtn").onclick = () => { toast(T().cvmsg); Sound.click(); };
  $("#mClose").onclick = closeModal; $("#mPrev").onclick = () => stepModal(-1); $("#mNext").onclick = () => stepModal(1);
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  addEventListener("keydown", e => {
    if (!$("#modal").classList.contains("open")) return;
    if (e.key === "Escape") closeModal(); if (e.key === "ArrowRight") stepModal(1); if (e.key === "ArrowLeft") stepModal(-1);
    if (e.key === "Tab") { const f = $$("#mPanel button, #mPanel a"); const first = f[0], last = f[f.length - 1]; if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); } else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); } }
  });
}
boot();
