/* ===================== CANVAS: previews, black hole, universe ===================== */

/* ---------- Animated "screens" for projects without a picture ---------- */
const ANIMS = {
  higgs(c, w, h, t) {
    c.fillStyle = "#050a1e"; c.fillRect(0, 0, w, h);
    const cx = w * .42, cy = h * .52, R = Math.min(w, h) * .44;
    [.18, .34, .58, .8, 1].forEach((f, i) => { c.strokeStyle = i < 2 ? "#1e3b6e" : i < 4 ? "#3a2a55" : "#24305c"; c.lineWidth = i === 4 ? 2 : 1; c.beginPath(); c.arc(cx, cy, R * f, 0, 7); c.stroke(); });
    const ev = Math.floor(t / 2.6), k = clamp((t % 2.6) / 1.4, 0, 1);
    const rnd = n => { const x = Math.sin(ev * 91.7 + n * 12.9898) * 43758.5453; return x - Math.floor(x); };
    for (let j = 0; j < 4; j++) { const a = rnd(j) * 6.283, sp = .22 + rnd(j + 9) * .12; c.fillStyle = "rgba(232,182,76,.22)"; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R * .78 * k, a - sp / 2, a + sp / 2); c.closePath(); c.fill(); }
    for (let j = 0; j < 26; j++) {
      const a0 = rnd(j + 30) * 6.283, q = (rnd(j + 60) - .5) * .9, len = (.35 + rnd(j + 90) * .65) * R * k, hot = j < 4;
      c.strokeStyle = hot ? "#e8b64c" : j % 3 ? "#7cb2ff" : "#62e3b5"; c.lineWidth = hot ? 2 : 1.2; c.beginPath(); let x = cx, y = cy, a = a0; c.moveTo(x, y);
      for (let s2 = 0; s2 < len; s2 += 4) { a += q * .02; x += Math.cos(a) * 4; y += Math.sin(a) * 4; c.lineTo(x, y); } c.stroke();
    }
    c.fillStyle = "#fff"; c.beginPath(); c.arc(cx, cy, 3, 0, 7); c.fill();
    c.fillStyle = "#e8b64c"; c.font = `700 ${Math.max(10, h * .06)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("ttH candidate", w * .74, h * .2);
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .05)}px JetBrains Mono, monospace`; c.fillText("event #" + (40213 + ev), w * .74, h * .3); c.fillText("√s = 13 TeV", w * .74, h * .38);
  },
  param(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x0 = w * .12, y0 = h * .84, ww = w * .8, hh = h * .66, X = m => x0 + (m - 450) / 600 * ww, Y = a => y0 - (a - .6) / .4 * hh;
    c.fillStyle = "rgba(232,182,76,.12)"; c.fillRect(X(720), y0 - hh, X(780) - X(720), hh);
    c.strokeStyle = "#2a3a70"; c.beginPath(); c.moveTo(x0, y0 - hh); c.lineTo(x0, y0); c.lineTo(x0 + ww, y0); c.stroke();
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .052)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("AUC", x0 + 4, y0 - hh + 2); c.textAlign = "right"; c.fillText("mass [GeV]", x0 + ww, y0 + h * .1);
    const f = m => .7 + .27 * (1 - Math.exp(-(m - 480) / 180));
    c.strokeStyle = "#7cb2ff"; c.lineWidth = 2; c.beginPath(); for (let m = 500; m <= 1000; m += 10) { m === 500 ? c.moveTo(X(m), Y(f(m))) : c.lineTo(X(m), Y(f(m))); } c.stroke();
    [500, 750, 1000].forEach(m => { c.fillStyle = "#ff7aa8"; c.fillRect(X(m) - 3, Y(f(m) - .004) - 3, 6, 6); });
    const m = 500 + ((Math.sin(t * .6) + 1) / 2) * 500; c.strokeStyle = "#e8b64c"; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(m), y0); c.lineTo(X(m), y0 - hh); c.stroke(); c.setLineDash([]);
    c.fillStyle = "#e8b64c"; c.beginPath(); c.arc(X(m), Y(f(m)), 5, 0, 7); c.fill(); c.textAlign = "center"; c.fillText("m = " + Math.round(m) + " GeV", clamp(X(m), x0 + 50, x0 + ww - 50), y0 - hh - 6);
  },
  likelihood(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x0 = w * .1, y0 = h * .86, ww = w * .82, hh = h * .68, X = u => x0 + u * ww, Y = v => y0 - v / 4 * hh, nll = u => 9 * (u - .5) ** 2 * (1 + .6 * (u - .5));
    const lo = .5 - .315, hi = .5 + .355;
    c.fillStyle = "rgba(124,178,255,.12)"; c.fillRect(X(lo), y0 - hh, X(hi) - X(lo), hh);
    c.strokeStyle = "#2a3a70"; c.beginPath(); c.moveTo(x0, y0 - hh); c.lineTo(x0, y0); c.lineTo(x0 + ww, y0); c.stroke();
    c.strokeStyle = "#e8b64c"; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(x0, Y(1)); c.lineTo(x0 + ww, Y(1)); c.stroke(); c.setLineDash([]);
    c.strokeStyle = "#7cb2ff"; c.lineWidth = 2.2; c.beginPath(); for (let u = 0; u <= 1; u += .01) { const v = nll(u); u === 0 ? c.moveTo(X(u), Y(Math.min(v, 4))) : c.lineTo(X(u), Y(Math.min(v, 4))); } c.stroke();
    const u = .5 + Math.sin(t * .9) * .42; c.fillStyle = "#fff"; c.beginPath(); c.arc(X(u), Y(Math.min(nll(u), 4)), 4.5, 0, 7); c.fill();
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .052)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("−2 Δln L", x0 + 4, y0 - hh + 2);
    c.textAlign = "right"; c.fillText("signal μ", x0 + ww, y0 + h * .1); c.fillStyle = "#e8b64c"; c.fillText("1σ", x0 + ww, Y(1) - 6);
  },
  dnn(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const layers = [3, 5, 5, 2], xs = layers.map((_, i) => w * (.14 + i * .24)), pos = layers.map((n, i) => Array.from({ length: n }, (_, j) => [xs[i], h * (.5 + (j - (n - 1) / 2) * .16)]));
    const ph = (t * .9) % (layers.length + .6);
    for (let i = 0; i < layers.length - 1; i++) pos[i].forEach(a => pos[i + 1].forEach(b => { const on = ph > i && ph < i + 1.4; c.strokeStyle = on ? "rgba(232,182,76,.5)" : "rgba(124,178,255,.13)"; c.lineWidth = 1; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }));
    pos.forEach((L2, i) => L2.forEach(([x, y], j) => { const lit = ph > i - .2 && ph < i + 1; c.fillStyle = lit ? "#e8b64c" : "#16214a"; c.strokeStyle = "#7cb2ff"; c.beginPath(); c.arc(x, y, Math.min(w, h) * .035, 0, 7); c.fill(); c.stroke(); }));
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .05)}px JetBrains Mono, monospace`; c.textAlign = "center";
    ["input", "ReLU", "ReLU", "sigmoid"].forEach((s, i) => c.fillText(s, xs[i], h * .93));
    c.fillStyle = "#62e3b5"; c.textAlign = "left"; c.fillText("loss " + (0.69 * Math.exp(-((t * .3) % 4)) + .05).toFixed(3), w * .04, h * .1);
  },
  autodiff(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const f = x => Math.sin(x) * x * .35, df = x => .35 * (Math.cos(x) * x + Math.sin(x));
    const X = x => w * .08 + (x + 6) / 12 * w * .84, Y = v => h * .55 - v * h * .17;
    c.strokeStyle = "#2a3a70"; c.beginPath(); c.moveTo(w * .08, Y(0)); c.lineTo(w * .92, Y(0)); c.stroke();
    c.strokeStyle = "#7cb2ff"; c.lineWidth = 2; c.beginPath(); for (let x = -6; x <= 6; x += .1) x === -6 ? c.moveTo(X(x), Y(f(x))) : c.lineTo(X(x), Y(f(x))); c.stroke();
    const a = Math.sin(t * .5) * 5.2, s = df(a); c.strokeStyle = "#e8b64c"; c.lineWidth = 1.8; c.beginPath(); c.moveTo(X(a - 1.6), Y(f(a) - 1.6 * s)); c.lineTo(X(a + 1.6), Y(f(a) + 1.6 * s)); c.stroke();
    c.fillStyle = "#fff"; c.beginPath(); c.arc(X(a), Y(f(a)), 4.5, 0, 7); c.fill();
    c.fillStyle = "#e8b64c"; c.font = `${Math.max(10, h * .058)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("f(a + ε) = f(a) + f′(a)·ε", w * .06, h * .12);
    c.fillStyle = "#8d97c0"; c.fillText("f′(" + a.toFixed(2) + ") = " + s.toFixed(3), w * .06, h * .92);
  },
  data(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const px = w * .07, py = h * .14, pw = w * .5, ph = h * .72;
    c.strokeStyle = "#22305f"; c.lineWidth = 1; c.strokeRect(px, py, pw, ph);
    for (let i = 0; i < 70; i++) {
      const a = (i * 2.399) % 6.283, r = ((i * 37) % 100) / 100;
      const cls = i % 2, cx = px + pw * (cls ? .68 : .32), cy = py + ph * (cls ? .38 : .64);
      const x = cx + Math.cos(a) * r * pw * .26, y = cy + Math.sin(a) * r * ph * .3;
      c.fillStyle = cls ? "#ff7aa8" : "#7cb2ff"; c.globalAlpha = .85; c.fillRect(x - 2, y - 2, 4, 4);
    }
    c.globalAlpha = 1;
    const k = (Math.sin(t * .8) + 1) / 2;
    c.strokeStyle = "#ffb45e"; c.lineWidth = 2; c.beginPath();
    c.moveTo(px + pw * .1, py + ph * (.15 + k * .1)); c.quadraticCurveTo(px + pw * .5, py + ph * .5, px + pw * .9, py + ph * (.85 - k * .1)); c.stroke();
    const bx = w * .64, base = h * .86, bw = w * .09;
    [[1, .55, "2"], [0, .75, "1"], [2, .4, "3"]].forEach(([i, hh, n], j) => {
      const x = bx + j * (bw + 6), y = base - hh * h * .6;
      c.fillStyle = n === "3" ? "#ffb45e" : "#1c2958"; c.fillRect(x, y, bw, base - y);
      c.fillStyle = n === "3" ? "#1d1203" : "#8d97c0"; c.font = `600 ${Math.round(h * .09)}px JetBrains Mono, monospace`; c.textAlign = "center"; c.fillText(n, x + bw / 2, base - 8);
    });
    const sy = base - .4 * h * .6 - 18 - Math.abs(Math.sin(t * 3)) * 6;
    c.fillStyle = "#ffd166"; c.font = `${Math.round(h * .12)}px serif`; c.fillText("★", bx + 2 * (bw + 6) + bw / 2, sy);
  },
  semf(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x0 = w * .12, y0 = h * .84, ww = w * .8, hh = h * .66;
    c.strokeStyle = "#2a3a70"; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0 - hh); c.lineTo(x0, y0); c.lineTo(x0 + ww, y0); c.stroke();
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .055)}px JetBrains Mono, monospace`; c.textAlign = "left";
    c.fillText("B/A [MeV]", x0 + 4, y0 - hh + 2); c.textAlign = "right"; c.fillText("A", x0 + ww, y0 + h * .1);
    const BA = A => { const Z = A / (2 + .0155 * Math.pow(A, 2 / 3)); return (15.8 * A - 18.3 * Math.pow(A, 2 / 3) - .714 * Z * Z / Math.pow(A, 1 / 3) - 23.2 * (A - 2 * Z) ** 2 / A) / A; };
    const X = A => x0 + (A / 250) * ww, Y = v => y0 - (clamp(v, 0, 9.5) / 9.5) * hh;
    for (let A = 4; A < 250; A += 2) { const n = Math.sin(A * 12.9898) * .35 * (A < 30 ? 2.2 : 1); c.fillStyle = "#7cb2ff"; c.globalAlpha = .7; c.fillRect(X(A) - 1.5, Y(BA(A) + n) - 1.5, 3, 3); }
    c.globalAlpha = 1;
    const prog = ((t * .25) % 1.3); c.strokeStyle = "#ffb45e"; c.lineWidth = 2.2; c.beginPath();
    for (let A = 6; A < 6 + prog * 244 && A < 250; A += 1) { const x = X(A), y = Y(BA(A)); A === 6 ? c.moveTo(x, y) : c.lineTo(x, y); }
    c.stroke();
    c.fillStyle = "#ffb45e"; c.textAlign = "left"; c.fillText("SEMF fit", X(150), Y(BA(150)) - 10);
  },
  conv(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const n = 8, s = Math.min(w * .045, h * .085), ox = w * .08, oy = (h - n * s) / 2;
    const pat = [0x3c, 0x66, 0x06, 0x0c, 0x18, 0x30, 0x7e, 0x00];
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { c.fillStyle = (pat[i] >> (7 - j)) & 1 ? "#e8edff" : "#16214a"; c.fillRect(ox + j * s, oy + i * s, s - 1, s - 1); }
    const step = Math.floor(t * 4) % 36, ki = Math.floor(step / 6), kj = step % 6;
    c.strokeStyle = "#ffb45e"; c.lineWidth = 2; c.strokeRect(ox + kj * s, oy + ki * s, 3 * s, 3 * s);
    const fx = w * .48, fs = s * .95, foy = (h - 6 * fs) / 2;
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
      const idx = i * 6 + j; if (idx > step) { c.fillStyle = "#121a3f"; } else { const v = Math.abs(Math.sin(i * 1.7 + j * 2.3)); c.fillStyle = `rgba(124,178,255,${.25 + v * .75})`; }
      c.fillRect(fx + j * fs, foy + i * fs, fs - 1, fs - 1);
    }
    c.strokeStyle = "#ffb45e"; c.globalAlpha = .6; c.beginPath(); c.moveTo(ox + (kj + 1.5) * s, oy + (ki + 1.5) * s); c.lineTo(fx + (kj + .5) * fs, foy + (ki + .5) * fs); c.stroke(); c.globalAlpha = 1;
    const dx = w * .84; for (let i = 0; i < 10; i++) { const v = (Math.sin(i * 3 + t * 2) + 1) / 2; c.fillStyle = i === 2 ? "#62e3b5" : "#2a3a70"; c.fillRect(dx, h * .15 + i * h * .07, 8 + v * w * .1, h * .05); }
  },
  db(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const tables = [[.06, .16, "NIÑO"], [.38, .48, "SOLICITANTE"], [.7, .14, "ADOPCIÓN"]];
    const tw = w * .26, rh = h * .075;
    c.strokeStyle = "#ffd16688"; c.lineWidth = 1.5; c.beginPath();
    c.moveTo(w * .06 + tw, h * .16 + rh * 2); c.bezierCurveTo(w * .55, h * .2, w * .5, h * .3, w * .7, h * .14 + rh * 2);
    c.moveTo(w * .38 + tw, h * .48 + rh * 2); c.bezierCurveTo(w * .7, h * .5, w * .6, h * .4, w * .7, h * .14 + rh * 3); c.stroke();
    const scan = Math.floor(t * 2) % 5;
    tables.forEach(([x, y, name], k) => {
      x *= w; y *= h; c.fillStyle = "#ffd166"; c.fillRect(x, y, tw, rh); c.fillStyle = "#2a1c00"; c.font = `700 ${Math.max(8, rh * .55)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText(name, x + 6, y + rh * .7);
      for (let r = 0; r < 4; r++) { c.fillStyle = r === scan % 4 && k === Math.floor(t / 2) % 3 ? "#2b3c78" : "#131c44"; c.fillRect(x, y + rh * (r + 1), tw, rh - 1); c.fillStyle = "#4a5a92"; c.fillRect(x + 6, y + rh * (r + 1) + rh * .35, tw * (.3 + ((r * 7 + k) % 5) * .1), rh * .3); }
    });
    c.fillStyle = "#62e3b5"; c.font = `${Math.max(9, h * .06)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("0FN → 1FN → 2FN → 3FN", w * .06, h * .92);
  },
  phone(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const ph = h * .86, pw = ph * .5, x = (w - pw) / 2, y = h * .07;
    c.fillStyle = "#1a2452"; roundRect(c, x - 6, y - 6, pw + 12, ph + 12, 18); c.fill();
    c.fillStyle = "#eef2ff"; roundRect(c, x, y, pw, ph, 12); c.fill();
    c.fillStyle = "#3d7a5c"; c.fillRect(x, y, pw, ph * .12); c.fillStyle = "#fff"; c.font = `600 ${ph * .045}px Manrope, sans-serif`; c.textAlign = "left"; c.fillText("Survey", x + 10, y + ph * .08);
    const k = Math.floor(t * 1.2) % 6;
    for (let i = 0; i < 5; i++) {
      const yy = y + ph * (.2 + i * .13); c.fillStyle = "#c9d1ea"; c.fillRect(x + 12, yy, pw * .55, ph * .025);
      c.strokeStyle = "#3d7a5c"; c.lineWidth = 1.5; c.strokeRect(x + pw - 30, yy - 4, 14, 14);
      if (i < k) { c.strokeStyle = "#3d7a5c"; c.beginPath(); c.moveTo(x + pw - 27, yy + 3); c.lineTo(x + pw - 23, yy + 7); c.lineTo(x + pw - 18, yy - 1); c.stroke(); }
    }
    c.fillStyle = k === 5 ? "#62e3b5" : "#3d7a5c"; roundRect(c, x + 12, y + ph * .86, pw - 24, ph * .08, 8); c.fill();
    c.fillStyle = "#fff"; c.textAlign = "center"; c.font = `600 ${ph * .035}px Manrope, sans-serif`; c.fillText(k === 5 ? "Saved offline ✓" : "Save", x + pw / 2, y + ph * .913);
    c.fillStyle = "#ff7aa8"; c.font = `${Math.max(9, h * .055)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("⌀ no network", w * .06, h * .14);
    c.fillStyle = "#62e3b5"; c.fillText("SQLite ✓", w * .06, h * .24);
  },
  platformer(c, w, h, t) {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#5aa0e6"); g.addColorStop(1, "#bfe3ff"); c.fillStyle = g; c.fillRect(0, 0, w, h);
    const s = Math.max(6, Math.round(h / 22)), off = (t * 90) % (s * 12), gy = h * .78;
    for (let i = -1; i < w / s + 12; i++) { const gap = Math.floor((i * s + off) / (s * 12)) % 3 === 2 && ((i * s + off) % (s * 12)) > s * 8; if (gap) continue; c.fillStyle = "#4a8f3c"; c.fillRect(i * s - off % s, gy, s - 1, s * .6); c.fillStyle = "#7a5230"; c.fillRect(i * s - off % s, gy + s * .6, s - 1, h); }
    const jp = Math.max(0, Math.sin(t * 3)); const px = w * .25, py = gy - s * 2 - jp * s * 3;
    c.fillStyle = "#2f9e44"; c.fillRect(px, py, s * 2, s * 2); c.fillStyle = "#c92a2a"; c.fillRect(px, py + s * .4, s * 2, s * .4); c.fillStyle = "#fff"; c.fillRect(px + s * 1.3, py + s * .3, s * .35, s * .35);
    for (let k = 0; k < 3; k++) {
      const sx = ((k * w * .45 - t * 90) % (w * 1.35) + w * 1.35) % (w * 1.35); c.save(); c.translate(sx, gy - s * 1.2); c.rotate(t * 8);
      c.fillStyle = "#adb5bd"; for (let a = 0; a < 8; a++) { c.rotate(Math.PI / 4); c.fillRect(-s * .2, -s * 1.3, s * .4, s * .6); } c.beginPath(); c.arc(0, 0, s * .9, 0, 7); c.fill(); c.restore();
      const ax = (sx + w * .22) % (w * 1.35); c.fillStyle = "#e03131"; c.beginPath(); c.arc(ax, gy - s * 4, s * .55, 0, 7); c.fill();
    }
    c.fillStyle = "#fff"; c.font = `700 ${s * 1.2}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("SCORE " + String(Math.floor(t * 3) % 999).padStart(3, "0"), s, s * 1.8);
  },
  kart(c, w, h, t) {
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, "#1b2a5e"); g.addColorStop(.45, "#ff9f5a"); g.addColorStop(.46, "#2f5a2a"); g.addColorStop(1, "#1f3d1c"); c.fillStyle = g; c.fillRect(0, 0, w, h);
    const hz = h * .45, cx = w / 2 + Math.sin(t * .7) * w * .05;
    c.fillStyle = "#3b3f4a"; c.beginPath(); c.moveTo(cx - w * .03, hz); c.lineTo(cx + w * .03, hz); c.lineTo(w * .95, h); c.lineTo(w * .05, h); c.fill();
    for (let i = 0; i < 8; i++) { const p = ((i / 8 + t * .6) % 1), y = hz + p * p * (h - hz), ww = 2 + p * 10, x = lerp(cx, w / 2, p); c.fillStyle = "#fff"; c.globalAlpha = p; c.fillRect(x - ww / 2, y, ww, 4 + p * 14); }
    c.globalAlpha = 1;
    for (let i = 0; i < 6; i++) { const p = ((i / 6 + t * .6) % 1), y = hz + p * p * (h - hz); c.fillStyle = i % 2 ? "#e03131" : "#fff"; c.fillRect(lerp(cx - w * .03, w * .05, p) - 6 * p, y, 8 * p + 2, 4 + p * 8); c.fillRect(lerp(cx + w * .03, w * .95, p), y, 8 * p + 2, 4 + p * 8); }
    const kx = w / 2 + Math.sin(t * 1.4) * w * .12, ky = h * .8, kw = w * .14;
    c.fillStyle = "#e03131"; roundRect(c, kx - kw / 2, ky - kw * .3, kw, kw * .45, 6); c.fill(); c.fillStyle = "#111"; c.fillRect(kx - kw * .6, ky, kw * .22, kw * .2); c.fillRect(kx + kw * .38, ky, kw * .22, kw * .2);
    if (Math.sin(t * 2) > .6) { c.fillStyle = "#ffd166"; c.font = `700 ${h * .08}px JetBrains Mono, monospace`; c.textAlign = "center"; c.fillText("BOOST ▲▲", kx, ky - kw * .5); }
  },
  network(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const box = (x, y, label, items, col) => {
      c.strokeStyle = col; c.lineWidth = 1.5; roundRect(c, x, y, w * .3, h * .6, 10); c.stroke();
      c.fillStyle = col; c.font = `600 ${Math.max(9, h * .055)}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText(label, x + 8, y + h * .08);
      items.forEach((it, i) => { c.fillStyle = "#16214a"; roundRect(c, x + 10, y + h * (.14 + i * .14), w * .3 - 20, h * .1, 6); c.fill(); c.fillStyle = "#c3cbea"; c.font = `${Math.max(8, h * .045)}px JetBrains Mono, monospace`; c.fillText("▣ " + it, x + 16, y + h * (.205 + i * .14)); });
    };
    box(w * .05, h * .2, "machine A", ["app :3000", "express", "views"], "#7cb2ff");
    box(w * .65, h * .2, "machine B", ["postgres", "reports", "volume"], "#62e3b5");
    const ax = w * .35, bx = w * .65, y = h * .5;
    c.strokeStyle = "#ffb45e"; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(ax, y); c.quadraticCurveTo(w / 2, y - h * .3, bx, y); c.stroke(); c.setLineDash([]);
    c.fillStyle = "#ffb45e"; c.font = `${Math.max(9, h * .05)}px JetBrains Mono, monospace`; c.textAlign = "center"; c.fillText("tailscale", w / 2, y - h * .2);
    for (let i = 0; i < 4; i++) { const p = (t * .5 + i / 4) % 1, q = i % 2 ? 1 - p : p; const x = (1 - q) * (1 - q) * ax + 2 * (1 - q) * q * (w / 2) + q * q * bx, yy = (1 - q) * (1 - q) * y + 2 * (1 - q) * q * (y - h * .3) + q * q * y; c.fillStyle = i % 2 ? "#62e3b5" : "#7cb2ff"; c.fillRect(x - 3, yy - 3, 6, 6); }
  },
  invoice(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x = w * .1, y = h * .1, ww = w * .8, hh = h * .8; c.fillStyle = "#f6f7fb"; roundRect(c, x, y, ww, hh, 10); c.fill();
    const step = Math.floor(t * .7) % 4;
    for (let i = 0; i < 3; i++) { const cx = x + ww * (.25 + i * .25), cy = y + hh * .14; c.fillStyle = i <= step - 0 && i < step + 1 ? "#6d4aff" : "#d9dbe8"; if (i < step) c.fillStyle = "#6d4aff"; c.beginPath(); c.arc(cx, cy, hh * .05, 0, 7); c.fill(); c.fillStyle = i < step ? "#fff" : "#6b6f85"; c.font = `700 ${hh * .05}px Manrope, sans-serif`; c.textAlign = "center"; c.fillText(i < step ? "✓" : String(i + 1), cx, cy + hh * .018); if (i < 2) { c.fillStyle = i < step - 1 ? "#6d4aff" : "#d9dbe8"; c.fillRect(cx + hh * .07, cy - 1, ww * .25 - hh * .14, 2); } }
    for (let i = 0; i < 4; i++) { const yy = y + hh * (.3 + i * .14); c.fillStyle = "#8a8fa8"; c.fillRect(x + ww * .08, yy, ww * .18, hh * .03); c.strokeStyle = "#d4d7e5"; c.strokeRect(x + ww * .3, yy - hh * .02, ww * .6, hh * .08); const fill = clamp((t * .7 % 1) * 4 - i, 0, 1) * (i <= step ? 1 : 0); c.fillStyle = "#6d4aff33"; c.fillRect(x + ww * .3 + 2, yy - hh * .02 + 2, (ww * .6 - 4) * fill, hh * .08 - 4); }
    c.fillStyle = step === 3 ? "#62c28f" : "#6d4aff"; roundRect(c, x + ww * .62, y + hh * .84, ww * .3, hh * .1, 8); c.fill(); c.fillStyle = "#fff"; c.font = `700 ${hh * .045}px Manrope, sans-serif`; c.fillText(step === 3 ? "Emitida ✓" : "Siguiente →", x + ww * .77, y + hh * .905);
  },
  pdf2xlsx(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const px = w * .07, py = h * .12, pw = w * .28, ph = h * .76; c.fillStyle = "#f6f7fb"; c.fillRect(px, py, pw, ph);
    c.fillStyle = "#e03131"; c.fillRect(px, py, pw * .35, ph * .09); c.fillStyle = "#fff"; c.font = `700 ${ph * .06}px JetBrains Mono, monospace`; c.textAlign = "left"; c.fillText("PDF", px + 5, py + ph * .068);
    for (let i = 0; i < 9; i++) { c.fillStyle = "#b5bacd"; c.fillRect(px + 8, py + ph * (.18 + i * .085), (pw - 16) * (.5 + ((i * 3) % 5) * .1), ph * .025); }
    for (let i = 0; i < 5; i++) { const p = (t * .6 + i / 5) % 1, x = lerp(px + pw + 8, w * .58, p); c.fillStyle = "#ffb45e"; c.globalAlpha = Math.sin(p * Math.PI); c.fillRect(x, h / 2 - 3 + Math.sin(p * 9) * 5, 6, 6); }
    c.globalAlpha = 1;
    const gx = w * .6, gy = h * .16, cw = w * .07, chh = h * .1, filled = Math.floor(t * 6) % 30;
    for (let r = 0; r < 7; r++) for (let k = 0; k < 5; k++) { const idx = r * 5 + k; c.fillStyle = r === 0 ? "#1f7a4a" : idx - 5 < filled ? "#e6f4ec" : "#16214a"; c.fillRect(gx + k * cw, gy + r * chh, cw - 1, chh - 1); }
  }
};
function roundRect(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

const Previews = {
  items: new Map(), running: false,
  io: new IntersectionObserver(es => es.forEach(e => { const it = Previews.items.get(e.target); if (it) { it.vis = e.isIntersecting; if (it.vis) Previews.start(); } }), { rootMargin: "80px" }),
  ro: new ResizeObserver(es => es.forEach(e => { const it = Previews.items.get(e.target); if (it) Previews.size(it); })),
  size(it) { const r = it.c.getBoundingClientRect(); if (!r.width) return; it.w = r.width; it.h = r.height; it.ctx = fitCanvas(it.c, r.width, r.height); this.draw(it, performance.now() / 1000); },
  add(c, vis = false) { const it = { c, vis, fn: ANIMS[c.dataset.anim] }; if (!it.fn) return; this.items.set(c, it); this.io.observe(c); this.ro.observe(c); this.size(it); this.start(); },
  remove(c) { this.io.unobserve(c); this.ro.unobserve(c); this.items.delete(c); },
  scan(root) { for (const c of [...this.items.keys()]) if (!document.contains(c)) this.remove(c); $$("canvas[data-anim]", root).forEach(c => this.add(c)); },
  draw(it, t) { if (it.ctx && it.w) { it.ctx.save(); it.fn(it.ctx, it.w, it.h, t); it.ctx.restore(); } },
  start() { if (this.running || REDUCED) return; this.running = true; let last = 0;
    const loop = now => { let any = false; if (now - last > 33 && !document.hidden) { last = now; for (const it of this.items.values()) if (it.vis) { any = true; this.draw(it, now / 1000); } } else any = true;
      if (any) requestAnimationFrame(loop); else this.running = false; };
    requestAnimationFrame(loop); }
};

/* ---------- Background stars (drawn once) ---------- */
function drawStars() {
  const c = $("#stars"), w = innerWidth, h = innerHeight, ctx = fitCanvas(c, w, h);
  const n = Math.round(w * h / 3200);
  for (let i = 0; i < n; i++) {
    const x = Math.random() * w, y = Math.random() * h, r = Math.random() * 1.1 + .15;
    ctx.globalAlpha = Math.random() * .6 + .15; ctx.fillStyle = Math.random() < .08 ? "#ffd9a8" : Math.random() < .1 ? "#a8c8ff" : "#e8edff";
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
}

/* ---------- The black hole (used by the book, the board and the universe) ---------- */
function drawBlackHole(c, cx, cy, R, t) {
  const glow = c.createRadialGradient(cx, cy, R * .8, cx, cy, R * 5.5); glow.addColorStop(0, "rgba(255,150,60,.35)"); glow.addColorStop(.4, "rgba(255,90,40,.08)"); glow.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = glow; c.fillRect(cx - R * 6, cy - R * 6, R * 12, R * 12);
  const disk = (a0, a1, alphaMul) => {
    for (let i = 0; i < 26; i++) {
      const f = i / 25, rx = R * (1.55 + f * 2.1), ry = rx * .2;
      const g = c.createLinearGradient(cx - rx, 0, cx + rx, 0);
      const hot = `rgba(255,${Math.round(235 - f * 120)},${Math.round(190 - f * 160)},`;
      g.addColorStop(0, hot + (.9 - f * .6) * alphaMul + ")"); g.addColorStop(.5, hot + (.5 - f * .35) * alphaMul + ")"); g.addColorStop(1, hot + (.22 - f * .15) * alphaMul + ")");
      c.strokeStyle = g; c.lineWidth = R * .09; c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, a0, a1); c.stroke();
    }
  };
  disk(Math.PI, Math.PI * 2, .7);
  c.lineWidth = R * .16; const lens = c.createLinearGradient(cx - R * 2, 0, cx + R * 2, 0); lens.addColorStop(0, "rgba(255,200,130,.85)"); lens.addColorStop(1, "rgba(255,140,60,.35)");
  c.strokeStyle = lens; c.beginPath(); c.ellipse(cx, cy, R * 1.45, R * 1.38, 0, 0, Math.PI * 2); c.stroke();
  c.fillStyle = "#000"; c.beginPath(); c.arc(cx, cy, R * 1.22, 0, 7); c.fill();
  c.strokeStyle = "rgba(255,240,210,.9)"; c.lineWidth = Math.max(1, R * .04); c.beginPath(); c.arc(cx, cy, R * 1.24, 0, 7); c.stroke();
  disk(0, Math.PI, 1);
  for (let i = 0; i < 40; i++) {
    const rr = R * (1.7 + ((i * 53) % 100) / 100 * 1.9), a = i * 2.1 + t * (2.4 / (rr / R));
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr * .2; if (Math.sin(a) < 0 && Math.hypot(x - cx, (y - cy) * 5) < R * 1.3) continue;
    c.fillStyle = Math.cos(a) < 0 ? "rgba(255,245,220,.9)" : "rgba(255,170,90,.6)"; c.fillRect(x, y, 1.6, 1.6);
  }
}
function miniBH(canvas, bg = "#000") {
  const r = canvas.getBoundingClientRect(), w = r.width || canvas.width, h = r.height || canvas.height, ctx = fitCanvas(canvas, w, h);
  const stars = Array.from({ length: 50 }, () => [Math.random() * w, Math.random() * h, Math.random()]);
  return t => { ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); stars.forEach(([x, y, a]) => { ctx.globalAlpha = a * .8; ctx.fillStyle = "#fff"; ctx.fillRect(x, y, 1, 1); }); ctx.globalAlpha = 1; drawBlackHole(ctx, w / 2, h / 2, Math.min(w, h) * .14, t); };
}

/* ===================== UNIVERSE: the map of the page ===================== */
/* Coarse coastlines (lon, lat) for the Earth stop */
const COAST = [
  [[-77,8],[-72,12],[-62,10.5],[-52,5],[-50,0],[-35,-5],[-39,-13],[-41,-22],[-48,-26],[-53,-34],[-58,-38],[-65,-41],[-68,-50],[-72,-53],[-75,-50],[-73,-40],[-71,-30],[-70,-18],[-76,-14],[-81,-6],[-80,-1],[-78,2],[-77,8]],
  [[-77,8],[-83,9],[-87,13],[-92,15],[-97,16],[-105,20],[-110,23],[-117,32],[-124,40],[-124,48],[-130,55],[-150,60],[-165,62],[-160,70],[-120,72],[-90,70],[-80,64],[-75,60],[-62,55],[-55,50],[-66,44],[-70,41],[-76,35],[-81,30],[-80,25],[-83,29],[-90,30],[-97,26],[-97,20],[-90,21],[-87,18],[-83,14],[-77,8]],
  [[-17,21],[-16,12],[-12,7],[-4,5],[9,4],[9,-1],[13,-12],[12,-18],[16,-28],[20,-35],[26,-34],[33,-26],[40,-15],[41,-3],[51,11],[43,12],[37,20],[33,31],[20,32],[10,37],[-6,36],[-10,30],[-17,21]],
  [[-9,37],[-9,43],[-2,43.5],[-4,48],[2,51],[8,54],[10,57],[5,60],[10,64],[20,70],[30,70],[40,66],[40,45],[28,41],[23,37],[20,40],[13,45],[12,41],[16,38],[9,44],[3,43],[-2,37],[-9,37]],
  [[-5,50],[1,51],[0,53],[-3,56],[-6,58],[-5,55],[-3,54],[-5,50]],
  [[-45,60],[-20,70],[-20,80],[-60,82],[-55,70],[-45,60]]
];
const PINS = [{ lon: -79.9, lat: -2.2, en: "Guayaquil · UEES", es: "Guayaquil · UEES" }, { lon: -5.85, lat: 43.36, en: "Oviedo · Uniovi", es: "Oviedo · Uniovi" }];

const Uni = {
  i: 0, tr: null, hover: null, w: 0, h: 0, vis: false, running: false, wheelAcc: 0, wheelLock: 0,
  init() {
    this.c = $("#uni"); this.box = $("#uniBox"); this.tip = $("#uniTip");
    this.bg = Array.from({ length: 260 }, () => [Math.random(), Math.random(), Math.random() * 1.2 + .2, Math.random()]);
    this.gal = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 9 + 2, a: Math.random() * 3, c: ["#ffe2b8", "#cfe0ff", "#ffd0e0", "#fff"][Math.floor(Math.random() * 4)] }));
    this.themePos = { systems: [.1, .28], ml: [.3, .2], design: [.5, .32], software: [.14, .66], data: [.34, .55], games: [.5, .76] };
    new ResizeObserver(() => this.resize()).observe(this.box); this.resize();
    new IntersectionObserver(es => { this.vis = es[0].isIntersecting; if (this.vis) this.start(); }, { threshold: .02 }).observe(this.box);
    this.ratio = 0; new IntersectionObserver(es => this.ratio = es[0].intersectionRatio, { threshold: [0, .25, .5, .6, .75, 1] }).observe(this.box);
    $("#uniPrev").onclick = () => this.go(this.i - 1); $("#uniNext").onclick = () => this.go(this.i + 1);
    this.c.addEventListener("pointermove", e => this.onMove(e)); this.c.addEventListener("pointerleave", () => { this.hover = null; this.tip.style.opacity = 0; });
    this.c.addEventListener("click", e => this.onClick(e));
    this.box.addEventListener("wheel", e => this.onWheel(e), { passive: false });
    addEventListener("keydown", e => { if (this.ratio < .5 || $("#modal").classList.contains("open") || Game.capturing() || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return; if (e.key === "ArrowRight") { this.go(this.i + 1); e.preventDefault(); } if (e.key === "ArrowLeft") { this.go(this.i - 1); e.preventDefault(); } });
    this.ui(); this.start();
  },
  /* Mouse wheel travels between stops while the map is in view; at the first/last stop the page scrolls normally */
  onWheel(e) {
    if (this.ratio < .6 || e.ctrlKey) return;
    const dir = Math.sign(e.deltaY); if (!dir) return;
    const can = dir > 0 ? this.i < LEVELS.length - 1 : this.i > 0;
    if (!can && !this.tr) return;
    e.preventDefault();
    if (this.tr || performance.now() < this.wheelLock) return;
    this.wheelAcc += e.deltaY; if (Math.abs(this.wheelAcc) < 40) return;
    this.wheelAcc = 0; this.wheelLock = performance.now() + (REDUCED ? 300 : 1600); this.go(this.i + dir);
  },
  resize() { const r = this.box.getBoundingClientRect(); this.w = r.width; this.h = r.height; this.ctx = fitCanvas(this.c, r.width, r.height); this.frame(performance.now()); },
  start() { if (this.running) return; this.running = true; const loop = now => { if (!this.vis || document.hidden) { this.running = false; return; } this.frame(now); requestAnimationFrame(loop); }; requestAnimationFrame(loop); },
  go(n) {
    if (n < 0 || n >= LEVELS.length || this.tr || n === this.i) return;
    const dir = n > this.i ? 1 : -1; this.tr = { from: this.i, to: n, start: performance.now(), dur: REDUCED ? 1 : 1400, dir };
    $("#uniPort").classList.add("hidden"); this.hover = null; this.tip.style.opacity = 0;
    if (this.i === 0 && dir > 0) Sound.warp(); else Sound.open();
    this.i = n; this.uiBottom(); setCurrent(n); this.start();
  },
  /* Silent jump (no animation): used when you scroll to a section, so the map waits for you there */
  jump(n) { if (n === this.i || this.tr) return; this.i = n; this.hover = null; this.tip.style.opacity = 0; this.ui(); this.frame(performance.now()); },
  focus(id) { return id === "bh" ? [this.w * .38, this.h * .5] : id === "solar" ? [this.w * .26, this.h * .55] : id === "earth" ? [this.w * .36, this.h * .5] : [this.w * .4, this.h * .5]; },
  frame(now) {
    const c = this.ctx, w = this.w, h = this.h, t = REDUCED ? 0 : now / 1000; if (!c) return;
    c.fillStyle = "#000"; c.fillRect(0, 0, w, h);
    if (this.tr) {
      const p = clamp((now - this.tr.start) / this.tr.dur, 0, 1), e = ease(p), d = this.tr.dir;
      const A = LEVELS[this.tr.from].id, B = LEVELS[this.tr.to].id, [fx, fy] = this.focus(A);
      this.scene(A, t, d > 0 ? 1 + e * 7 : 1 - e * .85, 1 - e, fx, fy);
      this.scene(B, t, d > 0 ? .15 + e * .85 : 8 - e * 7, e, w / 2, h / 2);
      if (A === "bh" && d > 0) this.warp(c, w, h, Math.sin(p * Math.PI));
      if (p >= 1) { this.tr = null; this.ui(); }
    } else this.scene(LEVELS[this.i].id, t, 1, 1, w / 2, h / 2);
  },
  warp(c, w, h, k) {
    c.save(); c.translate(w / 2, h / 2); c.strokeStyle = `rgba(255,220,180,${k * .8})`; c.lineWidth = 1.2;
    for (let i = 0; i < 90; i++) { const a = i * 2.39996, r0 = (i * 37 % 100) / 100 * Math.max(w, h) * .5, len = k * 220; c.beginPath(); c.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); c.lineTo(Math.cos(a) * (r0 + len), Math.sin(a) * (r0 + len)); c.stroke(); }
    c.restore();
  },
  scene(id, t, zoom, alpha, fx, fy) {
    if (alpha <= .01) return;
    const c = this.ctx, w = this.w, h = this.h; c.save(); c.globalAlpha = alpha; c.translate(fx, fy); c.scale(zoom, zoom); c.translate(-fx, -fy);
    this.bg.forEach(([x, y, r, a]) => { c.globalAlpha = alpha * a * .8; c.fillStyle = "#e8edff"; c.fillRect(x * w, y * h, r, r); }); c.globalAlpha = alpha;
    this.targets = [];
    if (id === "bh") { const [x, y] = this.focus("bh"); drawBlackHole(c, x, y, Math.min(w, h) * .075, t); this.targets.push({ k: "bh", x, y, r: Math.min(w, h) * .2 }); }
    if (id === "cluster") this.cluster(c, w, h, t, alpha);
    if (id === "solar") this.solar(c, w, h, t, alpha);
    if (id === "earth") this.earth(c, w, h, t, alpha);
    c.restore();
  },
  cluster(c, w, h, t, alpha) {
    const gas = c.createRadialGradient(w * .4, h * .5, 10, w * .4, h * .5, Math.max(w, h) * .5); gas.addColorStop(0, "rgba(120,90,255,.18)"); gas.addColorStop(.5, "rgba(60,90,200,.07)"); gas.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = gas; c.fillRect(0, 0, w, h);
    this.gal.forEach(g => { c.save(); c.translate(g.x * w, g.y * h); c.rotate(g.a); const gg = c.createRadialGradient(0, 0, 0, 0, 0, g.s); gg.addColorStop(0, g.c); gg.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = gg; c.scale(1, .5); c.beginPath(); c.arc(0, 0, g.s, 0, 7); c.fill(); c.restore(); });
    const S = Math.min(w, h);
    for (const k in this.themePos) {
      const [px, py] = this.themePos[k], x = px * w, y = py * h, rad = S * .08, col = THEMES[k].color, hot = this.hover === k;
      c.save(); c.translate(x, y); c.rotate(.5 + px * 2); c.scale(1, .55);
      const core = c.createRadialGradient(0, 0, 0, 0, 0, rad * .5); core.addColorStop(0, "#fff"); core.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = core; c.beginPath(); c.arc(0, 0, rad * .5, 0, 7); c.fill();
      c.fillStyle = col;
      for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 70; i++) { const f = i / 70, a = f * 4.2 + arm * Math.PI + t * .15, r = f * rad * (hot ? 1.2 : 1); c.globalAlpha = alpha * (1 - f * .6); const s = 2.2 - f * 1.2; c.fillRect(Math.cos(a) * r - s / 2, Math.sin(a) * r - s / 2, s, s); }
      c.restore(); c.globalAlpha = alpha;
      c.font = `${hot ? 700 : 500} 12.5px JetBrains Mono, monospace`; c.textAlign = "center"; c.fillStyle = hot ? "#fff" : "#c3cbea"; c.fillText(L(THEMES[k]), x, y + rad * .75 + 14);
      const n = PROJECTS.filter(p => p.theme === k).length; c.font = "10.5px JetBrains Mono, monospace"; c.fillStyle = col; c.fillText(n + " " + (n === 1 ? T().project : T().projects), x, y + rad * .75 + 29);
      this.targets.push({ k, x, y, r: rad * 1.15 });
    }
  },
  solar(c, w, h, t, alpha) {
    const [sx, sy] = this.focus("solar"), S = Math.min(w, h), R = S * .075, W = w * .42;
    const g = c.createRadialGradient(sx, sy, R * .2, sx, sy, R * 4); g.addColorStop(0, "rgba(255,220,140,.9)"); g.addColorStop(.25, "rgba(255,170,60,.35)"); g.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = g; c.fillRect(sx - R * 4, sy - R * 4, R * 8, R * 8);
    const sun = c.createRadialGradient(sx - R * .3, sy - R * .3, 0, sx, sy, R); sun.addColorStop(0, "#fff7d6"); sun.addColorStop(.6, "#ffcf5a"); sun.addColorStop(1, "#ff8c2a"); c.fillStyle = sun; c.beginPath(); c.arc(sx, sy, R * (this.hover === "sun" ? 1.08 : 1), 0, 7); c.fill();
    c.font = "700 12.5px JetBrains Mono, monospace"; c.textAlign = "center"; c.fillStyle = "#fff"; c.fillText(LANG === "es" ? "yo" : "me", sx, sy + R + 20);
    this.targets.push({ k: "sun", x: sx, y: sy, r: R * 1.15 });
    PLANETS.forEach((p, i) => {
      const rx = R * 1.7 + p.r * W, ry = rx * .32, hot = this.hover === i;
      c.strokeStyle = hot ? "rgba(232,182,76,.7)" : "rgba(124,178,255,.18)"; c.lineWidth = 1; c.beginPath(); c.ellipse(sx, sy, rx, ry, 0, 0, 7); c.stroke();
      const a = i * 1.9 + t * (.45 / Math.sqrt(i + 1)), x = sx + Math.cos(a) * rx, y = sy + Math.sin(a) * ry, s = p.size * (S / 520) * (hot ? 1.3 : 1) + 2;
      if (p.ring) { c.strokeStyle = "rgba(230,200,150,.8)"; c.lineWidth = 1.5; c.beginPath(); c.ellipse(x, y, s * 2, s * .6, -.3, 0, 7); c.stroke(); }
      const pg = c.createRadialGradient(x - s * .4, y - s * .4, 0, x, y, s); pg.addColorStop(0, "#fff"); pg.addColorStop(.25, p.color); pg.addColorStop(1, "#111"); c.fillStyle = pg; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill();
      c.font = `${hot ? 700 : 500} 11.5px JetBrains Mono, monospace`; c.fillStyle = hot ? "#fff" : "#aab3d6"; c.fillText(L(p), x, y - s - 8);
      this.targets.push({ k: i, x, y, r: Math.max(s * 1.8, 16) });
    });
  },
  earth(c, w, h, t, alpha) {
    const [cx, cy] = this.focus("earth"), R = Math.min(w, h) * .36, lon0 = (-42 + Math.sin(t * .15) * 6) * Math.PI / 180, lat0 = 18 * Math.PI / 180;
    const proj = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180, cosc = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l - lon0);
      return [cx + R * Math.cos(p) * Math.sin(l - lon0), cy - R * (Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l - lon0)), cosc]; };
    const atm = c.createRadialGradient(cx, cy, R * .95, cx, cy, R * 1.25); atm.addColorStop(0, "rgba(124,178,255,.35)"); atm.addColorStop(1, "rgba(124,178,255,0)"); c.fillStyle = atm; c.beginPath(); c.arc(cx, cy, R * 1.25, 0, 7); c.fill();
    const sea = c.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R); sea.addColorStop(0, "#1f4f9c"); sea.addColorStop(1, "#071a3d"); c.fillStyle = sea; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
    c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip();
    c.strokeStyle = "rgba(124,178,255,.14)"; c.lineWidth = 1;
    for (let lon = -180; lon < 180; lon += 20) { c.beginPath(); let on = false; for (let lat = -90; lat <= 90; lat += 5) { const [x, y, v] = proj(lon, lat); if (v > 0) { on ? c.lineTo(x, y) : c.moveTo(x, y); on = true; } else on = false; } c.stroke(); }
    for (let lat = -60; lat <= 60; lat += 20) { c.beginPath(); let on = false; for (let lon = -180; lon <= 180; lon += 5) { const [x, y, v] = proj(lon, lat); if (v > 0) { on ? c.lineTo(x, y) : c.moveTo(x, y); on = true; } else on = false; } c.stroke(); }
    COAST.forEach(poly => { c.beginPath(); let started = false; poly.forEach(([lon, lat]) => { const [x, y, v] = proj(lon, lat); if (v > -.05) { started ? c.lineTo(x, y) : c.moveTo(x, y); started = true; } }); c.fillStyle = "rgba(98,227,181,.22)"; c.strokeStyle = "rgba(98,227,181,.7)"; c.fill(); c.stroke(); });
    c.restore();
    const shade = c.createRadialGradient(cx - R * .4, cy - R * .4, R * .2, cx, cy, R * 1.05); shade.addColorStop(0, "rgba(0,0,0,0)"); shade.addColorStop(1, "rgba(0,0,0,.55)"); c.fillStyle = shade; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
    // flight path Guayaquil → Oviedo (great circle, lifted)
    const toV = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180; return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)]; };
    const A = toV(PINS[0].lon, PINS[0].lat), B = toV(PINS[1].lon, PINS[1].lat), om = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]);
    const pt = f => { const s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om), v = [A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2]; const lat = Math.asin(v[2]) * 180 / Math.PI, lon = Math.atan2(v[1], v[0]) * 180 / Math.PI; const [x, y] = proj(lon, lat), lift = 1 + Math.sin(f * Math.PI) * .12; return [cx + (x - cx) * lift, cy + (y - cy) * lift]; };
    c.strokeStyle = "rgba(232,182,76,.85)"; c.setLineDash([5, 5]); c.lineWidth = 1.6; c.beginPath(); for (let f = 0; f <= 1.001; f += .02) { const [x, y] = pt(f); f === 0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); c.setLineDash([]);
    const f = REDUCED ? .6 : (t * .12) % 1, [px, py] = pt(f), [qx, qy] = pt(Math.min(1, f + .01)), ang = Math.atan2(qy - py, qx - px);
    c.save(); c.translate(px, py); c.rotate(ang); c.fillStyle = "#fff"; c.beginPath(); c.moveTo(8, 0); c.lineTo(-6, -5); c.lineTo(-3, 0); c.lineTo(-6, 5); c.closePath(); c.fill(); c.restore();
    PINS.forEach((p, i) => { const [x, y] = proj(p.lon, p.lat), hot = this.hover === "pin" + i;
      c.fillStyle = "#ff5a76"; c.shadowColor = "#ff5a76"; c.shadowBlur = 12; c.beginPath(); c.arc(x, y, hot ? 7 : 5, 0, 7); c.fill(); c.shadowBlur = 0;
      c.font = `${hot ? 700 : 500} 12px JetBrains Mono, monospace`; c.textAlign = i ? "left" : "right"; c.fillStyle = "#fff"; c.fillText(L(p), x + (i ? 12 : -12), y + 4);
      this.targets.push({ k: "pin" + i, x, y, r: 20 }); });
    this.targets.push({ k: "globe", x: cx, y: cy, r: R });
  },
  hit(e) {
    if (this.tr || !this.targets) return null; const r = this.c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    let best = null; for (const tg of this.targets) { const d = Math.hypot(x - tg.x, y - tg.y); if (d < tg.r && (!best || d < best.d)) best = { ...tg, d }; } return best;
  },
  label(k) {
    const id = LEVELS[this.i].id;
    if (id === "bh") return L(LEVELS[0].cta);
    if (id === "cluster") return L(THEMES[k]) + " ↓";
    if (id === "solar") return (k === "sun" ? (LANG === "es" ? "Sobre mí" : "About me") : L(PLANETS[k])) + " ↓";
    if (id === "earth") return k === "globe" ? L(LEVELS[3].cta) : L(PINS[+String(k).slice(3)]) + " ↓";
  },
  onMove(e) {
    const h = this.hit(e), prev = this.hover; this.hover = h ? h.k : null; this.c.style.cursor = h ? "pointer" : "crosshair";
    if (h && prev !== this.hover) Sound.hover();
    if (h) { this.tip.textContent = this.label(h.k); this.tip.style.left = (h.k === "globe" ? e.clientX - this.c.getBoundingClientRect().left : h.x) + "px"; this.tip.style.top = (h.k === "globe" ? e.clientY - this.c.getBoundingClientRect().top : h.y) + "px"; this.tip.style.opacity = 1; } else this.tip.style.opacity = 0;
    if (REDUCED) this.frame(0);
  },
  onClick(e) {
    const h = this.hit(e); if (!h) return; const id = LEVELS[this.i].id; Sound.click();
    if (id === "bh") return this.go(1);
    if (id === "cluster") return goFilter(h.k);
    scrollToSel(LEVELS[this.i].go);
  },
  ui() {
    const l = LEVELS[this.i], t = T(), port = $("#uniPort");
    let extra = "";
    if (l.id === "cluster") extra = `<div class="uni-chips">${Object.keys(THEMES).map(k => `<button type="button" data-theme="${k}"><i style="background:${THEMES[k].color}"></i>${esc(L(THEMES[k]))}</button>`).join("")}</div>`;
    port.innerHTML = `<div class="k"><span>${t.stop} 0${this.i + 1} · ${esc(L(l.name))}</span><span>${esc(L(l.sec))}</span></div><h3>${esc(L(l.h))}</h3><p>${esc(L(l.p))}</p>${extra}<button class="uni-cta" type="button">${esc(L(l.cta))}</button>`;
    $$("[data-theme]", port).forEach(b => b.onclick = () => { Sound.click(); goFilter(b.dataset.theme); });
    $(".uni-cta", port).onclick = () => { Sound.click(); if (l.id === "bh") this.go(1); else { if (l.id === "cluster") { FILTER = "all"; renderFilters(); renderGrid(); } scrollToSel(l.go); } };
    this.uiBottom();
    requestAnimationFrame(() => setTimeout(() => port.classList.remove("hidden"), REDUCED ? 0 : 120));
  },
  uiBottom() {
    const n = LEVELS.length, pct = Math.round((this.i + 1) / n * 100);
    $("#uniStop").textContent = "0" + (this.i + 1) + " " + L(LEVELS[this.i].name).toUpperCase(); $("#uniBar").style.width = pct + "%"; $("#uniScale").textContent = LEVELS[this.i].scale;
    $("#uniPrev").disabled = this.i === 0; $("#uniNext").disabled = this.i === n - 1;
    if (typeof markNav === "function") markNav();
  }
};
