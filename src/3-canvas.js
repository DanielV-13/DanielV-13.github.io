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
    c.fillStyle = "#e8b64c"; c.font = `700 ${Math.max(10, h * .06)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("ttH candidate", w * .74, h * .2);
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .05)}px Space Mono, monospace`; c.fillText("event #" + (40213 + ev), w * .74, h * .3); c.fillText("√s = 13 TeV", w * .74, h * .38);
  },
  param(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x0 = w * .12, y0 = h * .84, ww = w * .8, hh = h * .66, X = m => x0 + (m - 450) / 600 * ww, Y = a => y0 - (a - .6) / .4 * hh;
    c.fillStyle = "rgba(232,182,76,.12)"; c.fillRect(X(720), y0 - hh, X(780) - X(720), hh);
    c.strokeStyle = "#2a3a70"; c.beginPath(); c.moveTo(x0, y0 - hh); c.lineTo(x0, y0); c.lineTo(x0 + ww, y0); c.stroke();
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .052)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("AUC", x0 + 4, y0 - hh + 2); c.textAlign = "right"; c.fillText("mass [GeV]", x0 + ww, y0 + h * .1);
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
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .052)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("−2 Δln L", x0 + 4, y0 - hh + 2);
    c.textAlign = "right"; c.fillText("signal μ", x0 + ww, y0 + h * .1); c.fillStyle = "#e8b64c"; c.fillText("1σ", x0 + ww, Y(1) - 6);
  },
  dnn(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const layers = [3, 5, 5, 2], xs = layers.map((_, i) => w * (.14 + i * .24)), pos = layers.map((n, i) => Array.from({ length: n }, (_, j) => [xs[i], h * (.5 + (j - (n - 1) / 2) * .16)]));
    const ph = (t * .9) % (layers.length + .6);
    for (let i = 0; i < layers.length - 1; i++) pos[i].forEach(a => pos[i + 1].forEach(b => { const on = ph > i && ph < i + 1.4; c.strokeStyle = on ? "rgba(232,182,76,.5)" : "rgba(124,178,255,.13)"; c.lineWidth = 1; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(b[0], b[1]); c.stroke(); }));
    pos.forEach((L2, i) => L2.forEach(([x, y], j) => { const lit = ph > i - .2 && ph < i + 1; c.fillStyle = lit ? "#e8b64c" : "#16214a"; c.strokeStyle = "#7cb2ff"; c.beginPath(); c.arc(x, y, Math.min(w, h) * .035, 0, 7); c.fill(); c.stroke(); }));
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .05)}px Space Mono, monospace`; c.textAlign = "center";
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
    c.fillStyle = "#e8b64c"; c.font = `${Math.max(10, h * .058)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("f(a + ε) = f(a) + f′(a)·ε", w * .06, h * .12);
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
      c.fillStyle = n === "3" ? "#1d1203" : "#8d97c0"; c.font = `600 ${Math.round(h * .09)}px Space Mono, monospace`; c.textAlign = "center"; c.fillText(n, x + bw / 2, base - 8);
    });
    const sy = base - .4 * h * .6 - 18 - Math.abs(Math.sin(t * 3)) * 6;
    c.fillStyle = "#ffd166"; c.font = `${Math.round(h * .12)}px serif`; c.fillText("★", bx + 2 * (bw + 6) + bw / 2, sy);
  },
  semf(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const x0 = w * .12, y0 = h * .84, ww = w * .8, hh = h * .66;
    c.strokeStyle = "#2a3a70"; c.lineWidth = 1; c.beginPath(); c.moveTo(x0, y0 - hh); c.lineTo(x0, y0); c.lineTo(x0 + ww, y0); c.stroke();
    c.fillStyle = "#8d97c0"; c.font = `${Math.max(9, h * .055)}px Space Mono, monospace`; c.textAlign = "left";
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
      x *= w; y *= h; c.fillStyle = "#ffd166"; c.fillRect(x, y, tw, rh); c.fillStyle = "#2a1c00"; c.font = `700 ${Math.max(8, rh * .55)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText(name, x + 6, y + rh * .7);
      for (let r = 0; r < 4; r++) { c.fillStyle = r === scan % 4 && k === Math.floor(t / 2) % 3 ? "#2b3c78" : "#131c44"; c.fillRect(x, y + rh * (r + 1), tw, rh - 1); c.fillStyle = "#4a5a92"; c.fillRect(x + 6, y + rh * (r + 1) + rh * .35, tw * (.3 + ((r * 7 + k) % 5) * .1), rh * .3); }
    });
    c.fillStyle = "#62e3b5"; c.font = `${Math.max(9, h * .06)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("0FN → 1FN → 2FN → 3FN", w * .06, h * .92);
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
    c.fillStyle = "#ff7aa8"; c.font = `${Math.max(9, h * .055)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("⌀ no network", w * .06, h * .14);
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
    c.fillStyle = "#fff"; c.font = `700 ${s * 1.2}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("SCORE " + String(Math.floor(t * 3) % 999).padStart(3, "0"), s, s * 1.8);
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
    if (Math.sin(t * 2) > .6) { c.fillStyle = "#ffd166"; c.font = `700 ${h * .08}px Space Mono, monospace`; c.textAlign = "center"; c.fillText("BOOST ▲▲", kx, ky - kw * .5); }
  },
  network(c, w, h, t) {
    c.fillStyle = "#0a1030"; c.fillRect(0, 0, w, h);
    const box = (x, y, label, items, col) => {
      c.strokeStyle = col; c.lineWidth = 1.5; roundRect(c, x, y, w * .3, h * .6, 10); c.stroke();
      c.fillStyle = col; c.font = `600 ${Math.max(9, h * .055)}px Space Mono, monospace`; c.textAlign = "left"; c.fillText(label, x + 8, y + h * .08);
      items.forEach((it, i) => { c.fillStyle = "#16214a"; roundRect(c, x + 10, y + h * (.14 + i * .14), w * .3 - 20, h * .1, 6); c.fill(); c.fillStyle = "#c3cbea"; c.font = `${Math.max(8, h * .045)}px Space Mono, monospace`; c.fillText("▣ " + it, x + 16, y + h * (.205 + i * .14)); });
    };
    box(w * .05, h * .2, "machine A", ["app :3000", "express", "views"], "#7cb2ff");
    box(w * .65, h * .2, "machine B", ["postgres", "reports", "volume"], "#62e3b5");
    const ax = w * .35, bx = w * .65, y = h * .5;
    c.strokeStyle = "#ffb45e"; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(ax, y); c.quadraticCurveTo(w / 2, y - h * .3, bx, y); c.stroke(); c.setLineDash([]);
    c.fillStyle = "#ffb45e"; c.font = `${Math.max(9, h * .05)}px Space Mono, monospace`; c.textAlign = "center"; c.fillText("tailscale", w / 2, y - h * .2);
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
    c.fillStyle = "#e03131"; c.fillRect(px, py, pw * .35, ph * .09); c.fillStyle = "#fff"; c.font = `700 ${ph * .06}px Space Mono, monospace`; c.textAlign = "left"; c.fillText("PDF", px + 5, py + ph * .068);
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
  add(c, vis = false) { const it = { c, vis, fn: ANIMS[c.dataset.anim], view: c.closest(".view") }; if (!it.fn) return; this.items.set(c, it); this.io.observe(c); this.ro.observe(c); this.size(it); this.start(); },
  remove(c) { this.io.unobserve(c); this.ro.unobserve(c); this.items.delete(c); },
  scan(root) { for (const c of [...this.items.keys()]) if (!document.contains(c)) this.remove(c); $$("canvas[data-anim]", root).forEach(c => this.add(c)); },
  draw(it, t) { if (it.ctx && it.w) { it.ctx.save(); it.fn(it.ctx, it.w, it.h, t); it.ctx.restore(); } },
  start() { if (this.running || REDUCED) return; this.running = true; let last = 0;
    const loop = now => { let any = false; if (now - last > 33 && !document.hidden) { last = now; for (const it of this.items.values()) if (it.vis && (!it.view || it.view.classList.contains("on"))) { any = true; this.draw(it, now / 1000); } } else any = true;
      if (any) requestAnimationFrame(loop); else this.running = false; };
    requestAnimationFrame(loop); }
};

/* ---------- Static starfields (drawn once per resize) ---------- */
function drawStars(c, dens = 3200) {
  const w = innerWidth, h = innerHeight, ctx = fitCanvas(c, w, h), n = Math.round(w * h / dens);
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

/* ===================== UNIVERSE: the main menu ===================== */
const SMC = { q: "#b18cff", l: "#62e3b5", b: "#ff9a4c", h: "#e8b64c" };
const Uni = {
  i: 0, tr: null, hover: null, w: 0, h: 0, running: false, wheelLock: 0, zoom: null, satA: 2.2, lastT: 0, targets: [], ptype: "mouse",
  init() {
    this.c = $("#uni"); this.home = $("#home"); this.tip = $("#tip"); this.neb = $("#nebula"); BH3D.init($("#bh3d"));
    this.bg = Array.from({ length: 320 }, () => [Math.random(), Math.random(), Math.random() * 1.2 + .2, Math.random()]);
    this.gal = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), s: Math.random() * 9 + 2, a: Math.random() * 3, c: ["#ffe2b8", "#cfe0ff", "#ffd0e0", "#fff"][Math.floor(Math.random() * 4)] }));
    addEventListener("resize", () => this.resize()); this.resize();
    $("#uniPrev").onclick = () => this.go(this.i - 1); $("#uniNext").onclick = () => this.go(this.i + 1);
    this.c.addEventListener("pointerdown", e => {
      this.ptype = e.pointerType || "mouse"; this.dragged = false;
      if (!BH3D.ok || !this.active() || this.tr || LEVELS[this.i].id !== "bh") return;
      const h = this.hit(e); if (!h || h.k !== "bh") return;
      this.drag = { x: e.clientX, y: e.clientY, d: 0 }; try { this.c.setPointerCapture(e.pointerId); } catch (er) {}
      this.c.style.cursor = "grabbing";
    });
    this.c.addEventListener("pointerup", () => { if (this.drag) { this.dragged = this.drag.d > 6; this.drag = null; this.c.style.cursor = "grab"; } });
    this.c.addEventListener("pointermove", e => { this.ptype = e.pointerType || "mouse"; this.onMove(e); });
    this.c.addEventListener("pointerleave", e => { if (e.pointerType === "mouse") this.clearHover(); });
    this.c.addEventListener("click", e => this.onClick(e));
    this.home.addEventListener("wheel", e => this.onWheel(e), { passive: false });
    let sx = null, sy = null;
    this.home.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    this.home.addEventListener("touchend", e => {
      if (sx == null || !this.active()) return; const t = e.changedTouches[0], dx = sx - t.clientX, dy = sy - t.clientY; sx = null;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 60) return;
      this.go(this.i + (Math.abs(dy) > Math.abs(dx) ? Math.sign(dy) : Math.sign(dx)));
    }, { passive: true });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) this.start(); });
    if (store.get("dv_hint", 0)) $("#hint").classList.add("gone");
    this.ui(); this.start();
  },
  active() { return !CURVIEW && !$("#modal").classList.contains("open") && Intro.done; },
  onWheel(e) {
    if (!this.active() || e.ctrlKey) return; e.preventDefault();
    const dir = Math.sign(e.deltaY); if (!dir || Math.abs(e.deltaY) < 4 || this.tr || performance.now() < this.wheelLock) return;
    const n = this.i + dir; if (n < 0 || n >= LEVELS.length) return;
    this.wheelLock = performance.now() + (REDUCED ? 300 : 1500); this.go(n);
  },
  resize() { this.w = innerWidth; this.h = innerHeight; this.mobile = this.w < 760; this.ctx = fitCanvas(this.c, this.w, this.h); this.frame(performance.now()); },
  start() {
    if (this.running) return; this.running = true;
    const loop = now => { if ((CURVIEW && !this.zoom) || document.hidden) { this.running = false; return; } this.frame(now); requestAnimationFrame(loop); };
    requestAnimationFrame(loop);
  },
  go(n) {
    if (n < 0 || n >= LEVELS.length || this.tr || n === this.i) return;
    const dir = n > this.i ? 1 : -1; this.tr = { from: this.i, to: n, start: performance.now(), dur: REDUCED ? 1 : 1400, dir };
    this.clearHover(); $("#stopcard").classList.add("hidden"); $("#hero").classList.add("hidden");
    if (this.i === 0 && dir > 0) Sound.warp(); else Sound.open();
    this.i = n; this.hoverPt = null; this.uiBottom(); this.hideHint(); this.start();
  },
  /* Silent jump: used when a sub-page is opened from the top bar, so the universe waits for you there */
  jump(n) { if (n === this.i) return; this.tr = null; this.i = n; this.hoverPt = null; this.clearHover(); this.ui(); },
  zoomIn() { this.zf = this.hoverPt || this.focus(LEVELS[this.i].id); this.zoom = { dir: 1, start: performance.now(), dur: REDUCED ? 1 : 750 }; this.start(); },
  zoomOut() { this.zf = this.zf || [this.w / 2, this.h / 2]; this.zoom = { dir: -1, start: performance.now(), dur: REDUCED ? 1 : 850 }; this.hoverPt = null; this.ui(); this.start(); },
  hideHint() { if (this.hinted) return; this.hinted = true; store.set("dv_hint", 1); $("#hint").classList.add("gone"); },
  focus(id) {
    const w = this.w, h = this.h, m = this.mobile;
    if (id === "bh") return m ? [w * .5, h * .64] : [w * .7, h * .5];
    if (id === "solar") return m ? [w * .5, h * .44] : [w * .3, h * .5];
    if (id === "earth") return m ? [w * .5, h * .44] : [w * .42, h * .52];
    return [w * .45, h * .48];
  },
  frame(now) {
    const c = this.ctx, w = this.w, h = this.h, t = REDUCED ? 0 : now / 1000; if (!c) return;
    const dt = Math.min(.05, Math.max(0, (now - (this.lastT || now)) / 1000)); this.lastT = now;
    if (this.hover !== "sat" && !REDUCED) this.satA += dt * .32;
    c.clearRect(0, 0, w, h);
    let Z = 1;
    if (this.zoom) {
      const p = clamp((now - this.zoom.start) / this.zoom.dur, 0, 1), e = ease(p), d = this.zoom.dir;
      Z = d > 0 ? 1 + e * 5 : 6 - e * 5;
      if (p >= 1) { this.zoom = null; Z = d > 0 ? 6 : 1; if (d < 0) this.afterReturn(); }
    }
    this.Zg = Z; this.bhDraw = null; this.nebA = 0;
    c.save();
    if (Z !== 1) { const [fx, fy] = this.zf; c.translate(fx, fy); c.scale(Z, Z); c.translate(-fx, -fy); }
    if (this.tr) {
      const p = clamp((now - this.tr.start) / this.tr.dur, 0, 1), e = ease(p), d = this.tr.dir;
      const A = LEVELS[this.tr.from].id, B = LEVELS[this.tr.to].id, [fx, fy] = this.focus(A);
      this.scene(A, t, d > 0 ? 1 + e * 7 : 1 - e * .85, 1 - e, fx, fy);
      this.scene(B, t, d > 0 ? .15 + e * .85 : 8 - e * 7, e, w / 2, h / 2);
      if (A === "bh" && d > 0) this.warp(c, w, h, Math.sin(p * Math.PI));
      if (p >= 1) { this.tr = null; this.ui(); if (this.pendingPortal) { const k = this.pendingPortal; this.pendingPortal = null; setTimeout(() => this.showPortal(k), 100); } }
    } else this.scene(LEVELS[this.i].id, t, 1, 1, w / 2, h / 2);
    c.restore();
    if (BH3D.ok) BH3D.render(this.bhDraw, dt, this.mobile);
    if (this.nebA > 0) Space.nebula(); this.neb.style.opacity = (this.nebA * .32).toFixed(3);
    if (this.mx != null) this.neb.style.transform = `translate(${(-this.mx * 14).toFixed(1)}px,${(-this.my * 10).toFixed(1)}px)`;
  },
  /* back from a sub-page: continue the trip that the "next stop" card asked for */
  afterReturn() {
    const p = this.pending; this.pending = null; if (!p) return;
    setTimeout(() => {
      if (p.level !== this.i) { this.go(p.level); if (p.portal) this.pendingPortal = p.portal; }
      else if (p.portal) this.showPortal(p.portal);
    }, 120);
  },
  showPortal(k) { const t = this.targets.find(x => x.k === k); if (t) { this.ptype = "mouse"; this.setHover(t); setTimeout(() => { if (this.hover === k) this.clearHover(); }, 3500); } },
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
    if (id === "bh") {
      const [x, y] = this.focus("bh"), R = Math.min(w, h) * (this.mobile ? .06 : .075);
      if (BH3D.ok) {
        const Zg = this.Zg || 1, [gx, gy] = this.zf || [w / 2, h / 2], sx = fx + (x - fx) * zoom, sy = fy + (y - fy) * zoom;
        this.bhDraw = { x: gx + (sx - gx) * Zg, y: gy + (sy - gy) * Zg, s: zoom * Zg, a: alpha };
        this.targets.push({ k: "bh", x, y, r: BH3D.size(this.mobile) * .34 });
      } else { drawBlackHole(c, x, y, R, t); this.targets.push({ k: "bh", x, y, r: R * 2.6 }); }
    }
    if (id === "solar" || id === "earth") this.nebA = Math.max(this.nebA, alpha);
    if (id === "cluster") this.cluster(c, w, h, t, alpha);
    if (id === "solar") this.solar(c, w, h, t, alpha);
    if (id === "earth") this.earth(c, w, h, t, alpha);
    c.restore();
  },
  /* unexplored places pulse; explored ones get a ✓ next to their name */
  ring(c, x, y, r, key, t, alpha) {
    if (Visited.has(key)) return;
    const k = (t * .7) % 1; c.save(); c.globalAlpha = alpha * (1 - k) * .85; c.strokeStyle = "#e8b64c"; c.lineWidth = 1.6;
    c.beginPath(); c.arc(x, y, r * (1 + k * .45), 0, 7); c.stroke(); c.restore();
  },
  name(c, txt, x, y, key, hot, alpha, size = 12.5) {
    const done = key && Visited.has(key);
    c.font = `${hot ? 700 : 500} ${size}px Space Mono, monospace`; c.textAlign = "center"; c.fillStyle = hot ? "#fff" : "#c3cbea"; c.fillText(txt, x, y);
    if (done) { const tw = c.measureText(txt).width; c.fillStyle = "#62e3b5"; c.textAlign = "left"; c.fillText(" ✓", x + tw / 2, y); }
  },
  cluster(c, w, h, t, alpha) {
    const gas = c.createRadialGradient(w * .42, h * .5, 10, w * .42, h * .5, Math.max(w, h) * .5); gas.addColorStop(0, "rgba(120,90,255,.18)"); gas.addColorStop(.5, "rgba(60,90,200,.07)"); gas.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = gas; c.fillRect(0, 0, w, h);
    Space.galaxy(c, w, h, t, alpha, this.mx || 0, this.my || 0);
    this.gal.forEach(g => { c.save(); c.translate(g.x * w, g.y * h); c.rotate(g.a); const gg = c.createRadialGradient(0, 0, 0, 0, 0, g.s); gg.addColorStop(0, g.c); gg.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = gg; c.scale(1, .5); c.beginPath(); c.arc(0, 0, g.s, 0, 7); c.fill(); c.restore(); });
    const S = Math.min(w, h), P = this.mobile
      ? { ml: [.28, .22], systems: [.72, .2], design: [.28, .4], data: [.72, .38], software: [.28, .58], games: [.72, .56] }
      : { ml: [.18, .3], systems: [.4, .2], design: [.62, .27], data: [.26, .68], software: [.45, .5], games: [.64, .71] };
    for (const k in P) {
      const [px, py] = P[k], x = px * w, y = py * h, rad = S * (this.mobile ? .1 : .08), col = THEMES[k].color, hot = this.hover === k;
      this.ring(c, x, y, rad * .85, k, t, alpha);
      c.save(); c.translate(x, y); c.rotate(.5 + px * 2); c.scale(1, .55);
      const core = c.createRadialGradient(0, 0, 0, 0, 0, rad * .5); core.addColorStop(0, "#fff"); core.addColorStop(1, "rgba(255,255,255,0)"); c.fillStyle = core; c.beginPath(); c.arc(0, 0, rad * .5, 0, 7); c.fill();
      c.fillStyle = col;
      for (let arm = 0; arm < 2; arm++) for (let i = 0; i < 70; i++) { const f = i / 70, a = f * 4.2 + arm * Math.PI + t * .15, r = f * rad * (hot ? 1.2 : 1); c.globalAlpha = alpha * (1 - f * .6); const s = 2.2 - f * 1.2; c.fillRect(Math.cos(a) * r - s / 2, Math.sin(a) * r - s / 2, s, s); }
      c.restore(); c.globalAlpha = alpha;
      this.name(c, L(THEMES[k]), x, y + rad * .75 + 14, k, hot, alpha, this.mobile ? 11 : 12.5);
      const n = PROJECTS.filter(p => p.theme === k).length; c.font = "10.5px Space Mono, monospace"; c.textAlign = "center"; c.fillStyle = col; c.fillText(n + " " + (n === 1 ? T().project : T().projects), x, y + rad * .75 + 29);
      this.targets.push({ k, x, y, r: rad * 1.15, portal: true });
    }
  },
  solar(c, w, h, t, alpha) {
    const [sx, sy] = this.focus("solar"), S = Math.min(w, h), R = S * .075, W = this.mobile ? w * .4 : w * .42;
    this.ring(c, sx, sy, R * 1.5, "about", t, alpha);
    const g = c.createRadialGradient(sx, sy, R * .2, sx, sy, R * 4); g.addColorStop(0, "rgba(255,220,140,.9)"); g.addColorStop(.25, "rgba(255,170,60,.35)"); g.addColorStop(1, "rgba(0,0,0,0)"); c.fillStyle = g; c.fillRect(sx - R * 4, sy - R * 4, R * 8, R * 8);
    const sun = c.createRadialGradient(sx - R * .3, sy - R * .3, 0, sx, sy, R); sun.addColorStop(0, "#fff7d6"); sun.addColorStop(.6, "#ffcf5a"); sun.addColorStop(1, "#ff8c2a"); c.fillStyle = sun; c.beginPath(); c.arc(sx, sy, R * (this.hover === "sun" ? 1.08 : 1), 0, 7); c.fill();
    this.name(c, T().me, sx, sy + R + 20, "about", this.hover === "sun", alpha);
    this.targets.push({ k: "sun", x: sx, y: sy, r: R * 1.3, portal: true });
    PLANETS.forEach((p, i) => {
      const rx = R * 1.7 + p.r * W, ry = rx * .32, hot = this.hover === i;
      c.strokeStyle = hot ? "rgba(232,182,76,.7)" : "rgba(124,178,255,.18)"; c.lineWidth = 1; c.beginPath(); c.ellipse(sx, sy, rx, ry, 0, 0, 7); c.stroke();
      const a = i * 1.9 + t * (.45 / Math.sqrt(i + 1)), x = sx + Math.cos(a) * rx, y = sy + Math.sin(a) * ry, s = p.size * (S / 520) * (hot ? 1.3 : 1) + 2;
      if (p.ring) { c.strokeStyle = "rgba(230,200,150,.8)"; c.lineWidth = 1.5; c.beginPath(); c.ellipse(x, y, s * 2, s * .6, -.3, 0, 7); c.stroke(); }
      const pg = c.createRadialGradient(x - s * .4, y - s * .4, 0, x, y, s); pg.addColorStop(0, "#fff"); pg.addColorStop(.25, p.color); pg.addColorStop(1, "#111"); c.fillStyle = pg; c.beginPath(); c.arc(x, y, s, 0, 7); c.fill();
      c.font = `${hot ? 700 : 500} 11.5px Space Mono, monospace`; c.textAlign = "center"; c.fillStyle = hot ? "#fff" : "#aab3d6"; c.fillText(L(p), x, y - s - 8);
      this.targets.push({ k: i, x, y, r: Math.max(s * 1.8, 16) });
    });
  },
  satellite(c, x, y, s, hot) {
    c.save(); c.translate(x, y); c.rotate(-.4);
    c.fillStyle = "#7cb2ff"; c.fillRect(-s * 3.2, -s * .55, s * 2.2, s * 1.1); c.fillRect(s, -s * .55, s * 2.2, s * 1.1);
    c.strokeStyle = "#0b1230"; c.lineWidth = 1; for (let k = 1; k < 3; k++) { c.beginPath(); c.moveTo(-s * 3.2 + k * s * .73, -s * .55); c.lineTo(-s * 3.2 + k * s * .73, s * .55); c.moveTo(s + k * s * .73, -s * .55); c.lineTo(s + k * s * .73, s * .55); c.stroke(); }
    c.fillStyle = hot ? "#fff" : "#e8edff"; c.fillRect(-s, -s, s * 2, s * 2);
    c.fillStyle = "#e8b64c"; c.fillRect(-s * .5, -s * .5, s, s);
    if ((performance.now() / 500 | 0) % 2) { c.fillStyle = "#ff5a76"; c.beginPath(); c.arc(0, -s * 1.5, 1.8, 0, 7); c.fill(); }
    c.restore();
  },
  earth(c, w, h, t, alpha) {
    const [cx, cy] = this.focus("earth"), R = this.mobile ? w * .3 : Math.min(w, h) * .3, lon0 = (-42 + Math.sin(t * .15) * 6) * Math.PI / 180, lat0 = 18 * Math.PI / 180;
    const proj = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180, cosc = Math.sin(lat0) * Math.sin(p) + Math.cos(lat0) * Math.cos(p) * Math.cos(l - lon0);
      return [cx + R * Math.cos(p) * Math.sin(l - lon0), cy - R * (Math.cos(lat0) * Math.sin(p) - Math.sin(lat0) * Math.cos(p) * Math.cos(l - lon0)), cosc]; };
    // the satellite's orbit (the Arcade lives up there)
    const tilt = -.32, orx = R * 1.34, ory = R * .4, a = this.satA, sx0 = Math.cos(a) * orx, sy0 = Math.sin(a) * ory;
    const satX = cx + sx0 * Math.cos(tilt) - sy0 * Math.sin(tilt), satY = cy + sx0 * Math.sin(tilt) + sy0 * Math.cos(tilt), behind = Math.sin(a) < 0;
    const orbit = (a0, a1) => { c.strokeStyle = "rgba(98,227,181,.35)"; c.setLineDash([3, 5]); c.lineWidth = 1; c.beginPath(); c.ellipse(cx, cy, orx, ory, tilt, a0, a1); c.stroke(); c.setLineDash([]); };
    const sat = () => { const hot = this.hover === "sat"; this.ring(c, satX, satY, 20, "arcade", t, alpha); this.satellite(c, satX, satY, this.mobile ? 5 : 6, hot); this.name(c, T().satellite, satX, satY + 26, "arcade", hot, alpha, 11.5); };
    orbit(Math.PI, Math.PI * 2); if (behind) sat();
    this.ring(c, cx, cy, R * 1.05, "journey", t, alpha);
    const atm = c.createRadialGradient(cx, cy, R * .95, cx, cy, R * 1.25); atm.addColorStop(0, "rgba(124,178,255,.35)"); atm.addColorStop(1, "rgba(124,178,255,0)"); c.fillStyle = atm; c.beginPath(); c.arc(cx, cy, R * 1.25, 0, 7); c.fill();
    const sea = c.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R); sea.addColorStop(0, "#1f4f9c"); sea.addColorStop(1, "#071a3d"); c.fillStyle = sea; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
    c.save(); c.beginPath(); c.arc(cx, cy, R, 0, 7); c.clip();
    c.strokeStyle = "rgba(124,178,255,.14)"; c.lineWidth = 1;
    for (let lon = -180; lon < 180; lon += 20) { c.beginPath(); let on = false; for (let lat = -90; lat <= 90; lat += 5) { const [x, y, v] = proj(lon, lat); if (v > 0) { on ? c.lineTo(x, y) : c.moveTo(x, y); on = true; } else on = false; } c.stroke(); }
    for (let lat = -60; lat <= 60; lat += 20) { c.beginPath(); let on = false; for (let lon = -180; lon <= 180; lon += 5) { const [x, y, v] = proj(lon, lat); if (v > 0) { on ? c.lineTo(x, y) : c.moveTo(x, y); on = true; } else on = false; } c.stroke(); }
    COAST.forEach(poly => { c.beginPath(); let started = false; poly.forEach(([lon, lat]) => { const [x, y, v] = proj(lon, lat); if (v > -.05) { started ? c.lineTo(x, y) : c.moveTo(x, y); started = true; } }); c.fillStyle = "rgba(98,227,181,.22)"; c.strokeStyle = "rgba(98,227,181,.7)"; c.fill(); c.stroke(); });
    c.restore();
    const shade = c.createRadialGradient(cx - R * .4, cy - R * .4, R * .2, cx, cy, R * 1.05); shade.addColorStop(0, "rgba(0,0,0,0)"); shade.addColorStop(1, "rgba(0,0,0,.55)"); c.fillStyle = shade; c.beginPath(); c.arc(cx, cy, R, 0, 7); c.fill();
    const toV = (lon, lat) => { const l = lon * Math.PI / 180, p = lat * Math.PI / 180; return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)]; };
    const A = toV(PINS[0].lon, PINS[0].lat), B = toV(PINS[1].lon, PINS[1].lat), om = Math.acos(A[0] * B[0] + A[1] * B[1] + A[2] * B[2]);
    const pt = f => { const s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om), v = [A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2]; const lat = Math.asin(v[2]) * 180 / Math.PI, lon = Math.atan2(v[1], v[0]) * 180 / Math.PI; const [x, y] = proj(lon, lat), lift = 1 + Math.sin(f * Math.PI) * .12; return [cx + (x - cx) * lift, cy + (y - cy) * lift]; };
    c.strokeStyle = "rgba(232,182,76,.85)"; c.setLineDash([5, 5]); c.lineWidth = 1.6; c.beginPath(); for (let f = 0; f <= 1.001; f += .02) { const [x, y] = pt(f); f === 0 ? c.moveTo(x, y) : c.lineTo(x, y); } c.stroke(); c.setLineDash([]);
    const f = REDUCED ? .6 : (t * .12) % 1, [px, py] = pt(f), [qx, qy] = pt(Math.min(1, f + .01)), ang = Math.atan2(qy - py, qx - px);
    c.save(); c.translate(px, py); c.rotate(ang); c.fillStyle = "#fff"; c.beginPath(); c.moveTo(8, 0); c.lineTo(-6, -5); c.lineTo(-3, 0); c.lineTo(-6, 5); c.closePath(); c.fill(); c.restore();
    PINS.forEach((p, i) => { const [x, y] = proj(p.lon, p.lat), hot = this.hover === "pin" + i;
      c.fillStyle = "#ff5a76"; c.shadowColor = "#ff5a76"; c.shadowBlur = 12; c.beginPath(); c.arc(x, y, hot ? 7 : 5, 0, 7); c.fill(); c.shadowBlur = 0;
      c.font = `${hot ? 700 : 500} 12px Space Mono, monospace`; c.textAlign = i ? "left" : "right"; c.fillStyle = "#fff"; c.fillText(L(p), x + (i ? 12 : -12), y + 4);
      this.targets.push({ k: "pin" + i, x, y, r: 18 }); });
    orbit(0, Math.PI); if (!behind) sat();
    this.name(c, T().journeyP, cx, cy + R + 26, "journey", this.hover === "globe", alpha);
    this.targets.push({ k: "sat", x: satX, y: satY, r: 26, portal: true });
    this.targets.push({ k: "globe", x: cx, y: cy, r: R, portal: true });
  },
  hit(e) {
    if (this.tr || this.zoom || !this.targets) return null; const r = this.c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    let best = null; for (const tg of this.targets) { const d = Math.hypot(x - tg.x, y - tg.y); if (d < tg.r && (!best || d < best.d || tg.k === "sat")) { best = { ...tg, d }; if (tg.k === "sat") break; } } return best;
  },
  label(h) {
    if (h.k === "bh") return BH3D.ok ? T().bhTip : L(LEVELS[0].cta);
    if (typeof h.k === "number") return L(PLANETS[h.k]) + " · " + T().aboutP;
    if (String(h.k).startsWith("pin")) return L(PINS[+String(h.k).slice(3)]) + " · " + T().journeyP;
    return "";
  },
  onMove(e) {
    this.mx = e.clientX / this.w - .5; this.my = e.clientY / this.h - .5;
    if (this.drag) { const dx = e.clientX - this.drag.x, dy = e.clientY - this.drag.y; this.drag.x = e.clientX; this.drag.y = e.clientY; this.drag.d += Math.abs(dx) + Math.abs(dy); BH3D.spin(dx, dy); return; }
    if (!this.active() || this.tr || e.pointerType === "touch") return; this.setHover(this.hit(e));
    if (this.hover === "bh" && BH3D.ok) this.c.style.cursor = "grab";
  },
  setHover(h) {
    const prev = this.hover; this.hover = h ? h.k : null; this.c.style.cursor = h ? "pointer" : "crosshair";
    if (h && prev !== this.hover) Sound.hover();
    if (h && h.portal) { this.tip.style.opacity = 0; Portal.show(h); }
    else { Portal.hide(); if (h) { this.tip.textContent = this.label(h); this.tip.style.left = h.x + "px"; this.tip.style.top = (h.y - 8) + "px"; this.tip.style.opacity = 1; } else this.tip.style.opacity = 0; }
    if (REDUCED) this.frame(0);
  },
  clearHover() { this.hover = null; if (this.tip) this.tip.style.opacity = 0; Portal.hide(); if (this.c) this.c.style.cursor = "crosshair"; },
  onClick(e) {
    if (!this.active() || this.tr) return;
    if (this.dragged) { this.dragged = false; return; }
    const h = this.hit(e); if (!h) { this.clearHover(); return; }
    if (this.ptype === "touch" && h.portal && Portal.key !== h.k) { this.setHover(h); return; } // first tap previews, second tap enters
    Sound.click(); this.hoverPt = [h.x, h.y];
    const id = LEVELS[this.i].id;
    if (id === "bh") return this.go(1);
    if (id === "cluster") location.hash = "work/" + h.k;
    else if (id === "solar") location.hash = "about";
    else if (id === "earth") location.hash = h.k === "sat" ? "arcade" : "journey";
  },
  ui() {
    const l = LEVELS[this.i], card = $("#stopcard");
    card.innerHTML = `<div class="k">0${this.i + 1} · ${esc(L(l.name))} · ${l.scale}</div><h2>${esc(L(l.h))}</h2><button type="button">${esc(L(l.cta))}</button>`;
    $("button", card).onclick = () => { Sound.click(); this.hoverPt = null; if (l.view) location.hash = l.view; else this.go(1); };
    $("#hero").classList.toggle("hidden", this.i !== 0 || !!this.tr); card.classList.toggle("bh-m", this.i === 0);
    if (!this.tr) card.classList.remove("hidden");
    this.uiBottom();
  },
  stopTodo(k) { const l = LEVELS[k]; if (!l) return false; if (l.id === "cluster") return Visited.galaxiesLeft() > 0; if (l.id === "solar") return !Visited.has("about"); if (l.id === "earth") return !Visited.has("journey") || !Visited.has("arcade"); return false; },
  uiBottom() {
    const n = LEVELS.length;
    $("#dots").innerHTML = LEVELS.map((l, k) => `<button type="button" data-k="${k}" aria-label="${esc(L(l.name))}"${k === this.i ? ' aria-current="true"' : ""}${this.stopTodo(k) ? ' class="todo"' : ""}></button>`).join("");
    $$("#dots button").forEach(b => b.onclick = () => this.go(+b.dataset.k));
    $("#uniPrev").disabled = this.i === 0; $("#uniNext").disabled = this.i === n - 1;
    ["#uniPrev", "#uniNext"].forEach(s => { const b = $(s); b.classList.remove("beacon"); const bl = $(".bl", b); if (bl) bl.remove(); });
    if (this.tr) return;
    // beacon: when nothing is left to see here, it points to the closest stop that still has something new
    let target = null;
    if (this.i === 0) target = 1;
    else if (!this.stopTodo(this.i)) for (let d = 1; d < n; d++) { if (this.stopTodo(this.i + d)) { target = this.i + d; break; } if (this.stopTodo(this.i - d)) { target = this.i - d; break; } }
    if (target == null) return;
    const b = $(target > this.i ? "#uniNext" : "#uniPrev"), near = Math.abs(target - this.i) === 1;
    b.classList.add("beacon"); b.insertAdjacentHTML("beforeend", `<span class="bl">${esc(near ? T().next : T().unexplored)}: ${esc(L(LEVELS[target].name))}</span>`);
  }
};

/* ===================== BLACK HOLE in WebGL: light bent by gravity, a glowing disk, drag to rotate ===================== */
/* One small fragment shader (no libraries). It renders at reduced resolution and lowers it further on slow
   machines. If WebGL is not available, the 2D black hole is drawn instead. */
const BH3D = {
  ok: false, yaw: .7, pit: .14, vYaw: .12, q: .75, steps: 140, frames: 0, acc: 0, last: 0,
  init(cv) {
    if (REDUCED) return;
    try {
      const gl = cv.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true, powerPreference: "high-performance" });
      if (!gl) return; this.gl = gl; this.cv = cv;
      const hp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT), prec = hp && hp.precision > 0 ? "highp" : "mediump";
      const vs = "attribute vec2 p;varying vec2 v;void main(){v=p;gl_Position=vec4(p,0.,1.);}";
      const fs = `precision ${prec} float;varying vec2 v;uniform float uT;uniform vec2 uR;uniform float uS;
float hash(vec3 p){p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(vec3(i,1.)),hash(vec3(i+vec2(1.,0.),1.)),f.x),mix(hash(vec3(i+vec2(0.,1.),1.)),hash(vec3(i+vec2(1.,1.),1.)),f.x),f.y);}
vec3 stars(vec3 d){vec3 p=d*110.;vec3 id=floor(p);vec3 f=fract(p)-.5;float h=hash(id);if(h<.978)return vec3(0.);float b=smoothstep(.3,0.,length(f))*(h-.978)/.022;return b*mix(vec3(1.,.82,.62),vec3(.72,.82,1.),hash(id+7.))*2.2;}
void main(){vec2 uv=v;float yw=uR.x,pt=uR.y;vec3 ro=vec3(sin(yw)*cos(pt),sin(pt),cos(yw)*cos(pt))*20.;
vec3 fw=normalize(-ro),rt=normalize(cross(vec3(0.,1.,0.),fw)),up=cross(fw,rt);vec3 vel=normalize(fw*1.3+uv.x*rt+uv.y*up);vec3 pos=ro;
vec3 hv=cross(pos,vel);float h2=dot(hv,hv);vec3 col=vec3(0.);float al=0.;float hole=0.;
for(int i=0;i<170;i++){if(float(i)>=uS)break;float r2=dot(pos,pos);float r=sqrt(r2);if(r<1.){hole=1.;break;}
float dt=clamp(.07*r,.04,1.2);vec3 pr=pos;vel+=-1.5*h2*pos/(r2*r2*r)*dt;pos+=vel*dt;
if(pr.y*pos.y<0.){vec3 q=mix(pr,pos,pr.y/(pr.y-pos.y));float rr=length(q.xz);
if(rr>2.4&&rr<10.){float an=atan(q.z,q.x);float sw=an+uT*2.2/rr;float n=n2(vec2(sw*3.,rr*2.))*.6+n2(vec2(sw*9.,rr*6.))*.4;
float tp=pow(2.4/rr,1.25);vec3 tg=normalize(vec3(-q.z,0.,q.x));float dp=clamp(1.+.6*dot(tg,-normalize(vel)),.3,1.9);
vec3 c=mix(vec3(.95,.3,.06),vec3(1.,.88,.66),tp);float fd=smoothstep(10.,6.,rr)*smoothstep(2.4,2.95,rr);float de=fd*(.3+.9*n);
col+=(1.-al)*c*de*(1.5*tp+.3)*dp*dp*dp;al+=(1.-al)*clamp(de*.85,0.,1.);if(al>.97)break;}}
if(r>45.)break;}
vec3 bg=hole>.5?vec3(0.):stars(normalize(vel));col+=(1.-al)*bg;float a=max(hole,max(al,max(bg.r,max(bg.g,bg.b))));
float e=smoothstep(1.,.8,length(uv));col=col/(1.+col*.32);gl_FragColor=vec4(col*e,clamp(a,0.,1.)*e);}`;
      const sh = (t, src) => { const o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); if (!gl.getShaderParameter(o, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(o)); return o; };
      const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
      if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error("link");
      gl.useProgram(pr); const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      this.u = { t: gl.getUniformLocation(pr, "uT"), r: gl.getUniformLocation(pr, "uR"), s: gl.getUniformLocation(pr, "uS") };
      cv.addEventListener("webglcontextlost", e => { e.preventDefault(); this.ok = false; cv.style.opacity = 0; });
      this.ok = true;
    } catch (e) { this.ok = false; }
  },
  size(m) { return m ? Math.min(innerWidth * .92, innerHeight * .5) : Math.min(innerHeight * .95, innerWidth * .56); },
  spin(dx, dy) { this.yaw -= dx * .008; this.pit = clamp(this.pit + dy * .006, -.9, 1.2); this.vYaw = -dx * .25; },
  render(st, dt, m) {
    const cv = this.cv;
    if (!st || st.a <= .01) { if (cv.style.opacity !== "0") cv.style.opacity = 0; return; }
    const S = this.size(m), px = Math.max(64, Math.round(S * Math.min(DPR, 1.5) * this.q));
    if (cv.width !== px) { cv.width = cv.height = px; cv.style.width = cv.style.height = S + "px"; }
    cv.style.transform = `translate(${(st.x - S / 2).toFixed(1)}px,${(st.y - S / 2).toFixed(1)}px) scale(${st.s.toFixed(3)})`;
    cv.style.opacity = st.a.toFixed(3); cv.style.transformOrigin = "50% 50%";
    if (!Uni.drag) { this.vYaw += (.12 - this.vYaw) * Math.min(1, dt * 1.5); this.yaw += this.vYaw * dt; this.pit += (.14 - this.pit) * Math.min(1, dt * .25); }
    const gl = this.gl; gl.viewport(0, 0, px, px);
    gl.uniform1f(this.u.t, performance.now() / 1000); gl.uniform2f(this.u.r, this.yaw, this.pit); gl.uniform1f(this.u.s, this.steps);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // adapt the resolution to the machine: keep it smooth first
    const now = performance.now(); if (this.last) { this.acc += now - this.last; this.frames++; } this.last = now;
    if (this.frames >= 40) { const avg = this.acc / this.frames; this.acc = 0; this.frames = 0;
      if (avg > 24 && this.q > .38) { this.q *= .8; if (this.q < .5) this.steps = 110; }
      else if (avg < 14 && this.q < .8) this.q = Math.min(.8, this.q * 1.1); }
  }
};

/* ===================== SPACE: 3D galaxy point cloud (cluster) and nebula backdrop (Solar System, Earth) ===================== */
const Space = {
  n: 0,
  load() {
    if (this.loading) return; this.loading = true;
    fetch("assets/space/galaxy.bin").then(r => r.ok ? r.arrayBuffer() : null).then(b => {
      if (!b) return; const n = new DataView(b).getUint32(0, true); this.xyz = new Int16Array(b, 4, n * 3); this.rgb = new Uint8Array(b, 4 + n * 6, n * 3); this.n = n;
    }).catch(() => {});
  },
  nebula() {
    if (this.nebDone) return; this.nebDone = true;
    const im = new Image(); im.onload = () => { $("#nebula").style.backgroundImage = "url(assets/space/nebula.webp)"; }; im.src = "assets/space/nebula.webp";
  },
  galaxy(c, w, h, t, alpha, mx, my) {
    if (!this.n) { this.load(); return; }
    const gw = Math.ceil(w / 2), gh = Math.ceil(h / 2);
    if (!this.off || this.off.width !== gw || this.off.height !== gh) {
      this.off = document.createElement("canvas"); this.off.width = gw; this.off.height = gh;
      this.octx = this.off.getContext("2d"); this.img = this.octx.createImageData(gw, gh); this.buf = new Float32Array(gw * gh * 3);
    }
    const buf = this.buf, xyz = this.xyz, rgb = this.rgb; buf.fill(0);
    const yaw = t * .035 + mx * .5, tilt = 1.12 + my * .25, cy0 = Math.cos(yaw), sy0 = Math.sin(yaw), ct = Math.cos(tilt), st = Math.sin(tilt);
    const sc = Math.min(gw, gh) * .42 / 32000, cx = gw * .46, cy = gh * .5, k = .3;
    for (let i = 0, j = 0; i < this.n; i++, j += 3) {
      const x = xyz[j], y = xyz[j + 1], z = xyz[j + 2], x1 = x * cy0 - z * sy0, z1 = x * sy0 + z * cy0, y1 = y * ct - z1 * st;
      const px = (cx + x1 * sc) | 0, py = (cy - y1 * sc) | 0; if (px < 0 || py < 0 || px >= gw || py >= gh) continue;
      const o = (py * gw + px) * 3; buf[o] += rgb[j] * k; buf[o + 1] += rgb[j + 1] * k; buf[o + 2] += rgb[j + 2] * k;
    }
    const d = this.img.data;
    for (let p = 0, o = 0, q = 0; p < gw * gh; p++, o += 3, q += 4) {
      const r = buf[o], g = buf[o + 1], b = buf[o + 2];
      if (r + g + b === 0) { d[q + 3] = 0; continue; }
      d[q] = r > 255 ? 255 : r; d[q + 1] = g > 255 ? 255 : g; d[q + 2] = b > 255 ? 255 : b; d[q + 3] = 255;
    }
    this.octx.putImageData(this.img, 0, 0);
    c.save(); c.globalCompositeOperation = "lighter"; c.globalAlpha = alpha * .65; c.imageSmoothingEnabled = true; c.drawImage(this.off, 0, 0, w, h); c.restore();
  }
};

/* ===================== PORTAL: hover preview of what is inside ===================== */
const Portal = {
  key: null, raf: 0, vids: {}, imgs: {}, S: 360,
  init() { this.el = $("#portal"); this.c = $("#portalC"); this.ctx = this.c.getContext("2d"); this.lab = $("#portalL"); },
  show(h) {
    if (this.key === h.k) return this.place(h);
    this.key = h.k; this.h = h; this.t0 = performance.now(); this.idx = -1;
    if (THEMES[h.k]) { this.kind = "gal"; this.items = PROJECTS.filter(p => p.theme === h.k); this.color = THEMES[h.k].color; }
    else { this.kind = h.k; this.items = null; this.color = h.k === "sun" ? "#e8b64c" : h.k === "sat" ? "#62e3b5" : "#7cb2ff"; }
    this.el.style.setProperty("--pc", this.color);
    this.label(); this.place(h); this.el.classList.add("on"); document.body.classList.add("portal-on"); Sound.portal(); this.loop();
  },
  hide() {
    if (!this.key) return; this.key = null; this.el.classList.remove("on"); document.body.classList.remove("portal-on"); cancelAnimationFrame(this.raf);
    for (const s in this.vids) this.vids[s].pause();
  },
  place(h) {
    const W = this.el.offsetWidth || 190, H = W + 70, uw = Uni.w, uh = Uni.h;
    let x = h.x + h.r * .9 + 18; if (x + W > uw - 10) x = h.x - h.r * .9 - 18 - W;
    x = clamp(x, 10, uw - W - 10); const y = clamp(h.y - W / 2, 74, uh - H - 110);
    this.el.style.left = x + "px"; this.el.style.top = y + "px";
  },
  label() {
    const t = T(), touch = Uni.ptype === "touch", enter = touch ? t.tapEnter : t.enter;
    let h;
    if (this.kind === "gal") { const p = this.items[Math.max(0, this.idx)], n = this.items.length;
      h = `<b>${esc(L(THEMES[this.key]))}</b>${esc(L(p.title))}<br>${n} ${n === 1 ? t.project : t.projects} · <span>${enter}</span>`; }
    else if (this.kind === "sun") h = `<b>${t.aboutP}</b>${t.aboutSub}<br><span>${enter}</span>`;
    else if (this.kind === "globe") h = `<b>${t.journeyP}</b>${t.journeySub}<br><span>${enter}</span>`;
    else h = `<b>${t.arcadeP}</b>${t.arcadeSub}<br><span>${touch ? t.tapPlay : t.play}</span>`;
    this.lab.innerHTML = h;
  },
  loop() {
    cancelAnimationFrame(this.raf); let last = 0;
    const f = now => { if (!this.key) return; if (now - last > 33) { last = now; this.draw(now); } this.raf = requestAnimationFrame(f); };
    this.raf = requestAnimationFrame(f);
  },
  vid(src) { let v = this.vids[src]; if (!v) { v = document.createElement("video"); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute("playsinline", ""); v.preload = "auto"; v.src = src; this.vids[src] = v; } return v; },
  img(src) { let im = this.imgs[src]; if (!im) { im = new Image(); im.decoding = "async"; im.src = src; this.imgs[src] = im; } return im; },
  prep() {
    const p = this.items[this.idx];
    for (const s in this.vids) if (p.video !== s) this.vids[s].pause();
    if (p.video) { const v = this.vid(p.video); try { v.currentTime = 0; } catch (e) {} const pr = v.play(); if (pr) pr.catch(() => {}); }
    const nx = this.items[(this.idx + 1) % this.items.length]; if (nx.img) this.img(nx.img);
  },
  cover(src, sw, sh, plot) {
    const c = this.ctx, S = this.S;
    if (plot) { c.fillStyle = "#fff"; c.fillRect(0, 0, S, S); const k = Math.min(S * .8 / sw, S * .8 / sh); c.drawImage(src, (S - sw * k) / 2, (S - sh * k) / 2, sw * k, sh * k); return; }
    const s = Math.min(sw, sh); c.drawImage(src, (sw - s) / 2, (sh - s) / 2, s, s, 0, 0, S, S);
  },
  draw(now) {
    const c = this.ctx, S = this.S, t = REDUCED ? 0 : now / 1000;
    c.setTransform(1, 0, 0, 1, 0, 0); c.fillStyle = "#050816"; c.fillRect(0, 0, S, S);
    try {
      if (this.kind === "gal") {
        const k = Math.floor((now - this.t0) / 2000) % this.items.length;
        if (k !== this.idx) { this.idx = k; this.label(); this.prep(); }
        const p = this.items[k];
        if (p.video && this.vid(p.video).readyState >= 2) { const v = this.vid(p.video); this.cover(v, v.videoWidth, v.videoHeight); }
        else if (p.anim && ANIMS[p.anim]) { c.save(); c.translate(-S * .3, 0); ANIMS[p.anim](c, S * 1.6, S, t); c.restore(); }
        else if (p.img) { const im = this.img(p.img); if (im.complete && im.naturalWidth) this.cover(im, im.naturalWidth, im.naturalHeight, p.plot); }
      } else if (this.kind === "sun") this.drawSM(t);
      else if (this.kind === "globe") this.drawTrip(t);
      else this.drawGame(t);
    } catch (e) {}
    const g = c.createRadialGradient(S / 2, S / 2, S * .32, S / 2, S / 2, S * .5); g.addColorStop(0, "rgba(5,8,22,0)"); g.addColorStop(1, "rgba(5,8,22,.8)"); c.fillStyle = g; c.fillRect(0, 0, S, S);
  },
  drawSM(t) {
    const c = this.ctx, S = this.S, cs = 58, gap = 8, x0 = (S - (5 * cs + 4 * gap)) / 2, y0 = 100, cells = STORY.filter(s => !s.empty), hi = Math.floor(t * 1.2) % cells.length;
    const col = { 2: 0, 3: 1, 4: 2, 5: 3, 7: 4 };
    STORY.forEach(s => {
      const x = x0 + col[s.col] * (cs + gap), y = y0 + (s.row - 1) * (cs + gap), hh = s.g === "h" ? cs * 2 + gap : cs, on = cells[hi] === s;
      c.globalAlpha = s.empty ? .35 : 1; c.strokeStyle = SMC[s.g]; c.lineWidth = on ? 3 : 1.5; if (s.empty) c.setLineDash([4, 4]);
      roundRect(c, x, y, cs, hh, 8); c.fillStyle = on ? SMC[s.g] + "55" : SMC[s.g] + "1a"; c.fill(); c.stroke(); c.setLineDash([]);
      c.fillStyle = s.empty ? "#8d97c0" : SMC[s.g]; c.font = `${s.g === "h" ? 22 : 14}px Unbounded, sans-serif`; c.textAlign = "center"; c.fillText(s.empty ? "?" : s.sy, x + cs / 2, y + hh / 2 + 7);
    });
    c.globalAlpha = 1; c.fillStyle = "#e8b64c"; c.font = "700 17px Space Mono, monospace"; c.fillText(L(cells[hi].n), S / 2, y0 + 2 * cs + gap + 40);
  },
  drawTrip(t) {
    const c = this.ctx, S = this.S, A = [80, 235], B = [282, 150], C = [170, 60], f = (t * .25) % 1;
    c.strokeStyle = "rgba(124,178,255,.16)"; for (let i = 1; i < 6; i++) { c.beginPath(); c.arc(S / 2, S / 2 + 220, 120 + i * 40, Math.PI * 1.2, Math.PI * 1.8); c.stroke(); }
    c.strokeStyle = "#e8b64c"; c.setLineDash([7, 7]); c.lineWidth = 2.5; c.beginPath(); c.moveTo(...A); c.quadraticCurveTo(...C, ...B); c.stroke(); c.setLineDash([]);
    const q = (u, i) => (1 - u) * (1 - u) * A[i] + 2 * (1 - u) * u * C[i] + u * u * B[i], px = q(f, 0), py = q(f, 1), ang = Math.atan2(q(f + .01, 1) - py, q(f + .01, 0) - px);
    c.save(); c.translate(px, py); c.rotate(ang); c.fillStyle = "#fff"; c.beginPath(); c.moveTo(13, 0); c.lineTo(-9, -8); c.lineTo(-4, 0); c.lineTo(-9, 8); c.closePath(); c.fill(); c.restore();
    [[A, "GYE", "2024"], [B, "OVD", "2026"]].forEach(([p, n, y]) => { c.fillStyle = "#ff5a76"; c.shadowColor = "#ff5a76"; c.shadowBlur = 14; c.beginPath(); c.arc(p[0], p[1], 8, 0, 7); c.fill(); c.shadowBlur = 0;
      c.fillStyle = "#fff"; c.font = '15px Unbounded, sans-serif'; c.textAlign = "center"; c.fillText(n, p[0], p[1] + 36); c.fillStyle = "#8d97c0"; c.font = "16px Space Mono, monospace"; c.fillText(y, p[0], p[1] + 58); });
  },
  drawGame(t) {
    const c = this.ctx; c.fillStyle = "#0b1410"; c.fillRect(0, 0, this.S, this.S); c.save(); c.scale(2.25, 2.25);
    const off = Math.sin(t * 1.4) * 14, cols = ["#ff5a5a", "#5aff8a", "#5a9bff"];
    for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) { const x = 38 + k * 18 + off, y = 38 + r * 13; c.fillStyle = cols[r]; c.fillRect(x + 1, y, 5, 7); c.fillRect(x, y + 1, 7, 5); c.fillStyle = "#0b1410"; c.fillRect(x + 2, y + 2, 1, 1); c.fillRect(x + 4, y + 2, 1, 1); }
    const sx = 80 + Math.sin(t * 1.1) * 30; c.fillStyle = "#9bd27a"; c.fillRect(sx - 6, 112, 13, 4); c.fillRect(sx - 1, 109, 3, 3);
    c.fillStyle = "#ffd166"; c.fillRect(sx, 106 - (t * 90) % 70, 1, 4);
    c.restore();
  }
};

/* ===================== BOOK COVER: a collision inside the CMS detector, seen from the side ===================== */
/* Original event display: the barrel as a translucent cylinder, tracks from the collision point,
   calorimeter towers (blue/red) and two muons crossing the muon chambers. Drawn once, seeded, no images. */
const CMSCover = {
  draw() {
    const cv = $("#cmscover"), r = cv.getBoundingClientRect(); if (!r.width) return;
    const w = r.width, h = r.height, c = fitCanvas(cv, w, h);
    let seed = 20260712; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    c.fillStyle = "#04050d"; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 150; i++) { c.globalAlpha = .12 + rnd() * .55; c.fillStyle = rnd() < .15 ? "#ffd9a8" : "#e8edff"; c.beginPath(); c.arc(rnd() * w, rnd() * h, rnd() * 1 + .2, 0, 7); c.fill(); }
    // 3D -> 2D: x along the beam, y up, z towards us; turned so the barrel is seen from the side and a bit from above
    const cx = w * .5, cy = h * .585, S = w, yaw = .5, pitch = .32, cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const P = (x, y, z) => { const x1 = x * cyw + z * syw, z1 = -x * syw + z * cyw, y1 = y * cp - z1 * sp, z2 = y * cp * 0 + y * sp + z1 * cp, k = 1 + z2 / (S * 3); return [cx + x1 * S * k, cy - y1 * S * k]; };
    const L = .4, R = .16, Rt = .085;            // half length, calorimeter radius, tracker radius (in cover widths)
    const ring = (x, rad, n = 48) => Array.from({ length: n + 1 }, (_, k) => { const a = k / n * 6.283; return P(x, Math.cos(a) * rad, Math.sin(a) * rad); });
    const line = (pts, col, wd, a) => { c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = wd; c.beginPath(); pts.forEach(([x, y], k) => k ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); };
    // translucent barrel: convex hull of both end caps, filled with a soft blue
    const pts = [...ring(-L, R, 64), ...ring(L, R, 64)].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = []; for (const p of pts) { while (lo.length > 1 && cross(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (const p of pts.slice().reverse()) { while (up.length > 1 && cross(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    const hull = lo.slice(0, -1).concat(up.slice(0, -1));
    const g = c.createLinearGradient(0, cy - R * S, 0, cy + R * S); g.addColorStop(0, "rgba(124,178,255,.28)"); g.addColorStop(.5, "rgba(80,130,230,.14)"); g.addColorStop(1, "rgba(124,178,255,.24)");
    c.globalAlpha = 1; c.fillStyle = g; c.beginPath(); hull.forEach(([x, y], k) => k ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fill();
    // wire frame of the barrel and the inner tracker
    for (let k = 0; k < 18; k++) { const a = k / 18 * 6.283; line([P(-L, Math.cos(a) * R, Math.sin(a) * R), P(L, Math.cos(a) * R, Math.sin(a) * R)], "#7cb2ff", .6, .22); }
    for (let k = 0; k <= 8; k++) line(ring(-L + k / 8 * 2 * L, R), "#7cb2ff", k % 8 ? .5 : 1.1, k % 8 ? .18 : .55);
    line(ring(-L * .8, Rt), "#a8c8ff", .6, .25); line(ring(L * .8, Rt), "#a8c8ff", .6, .25);
    // tracks bending in the 3.8 T field (helix around the beam axis)
    const ends = [];
    const track = (dir, q, maxR, col, wd, a) => {
      let x = 0, y = 0, z = 0, [dx, dy, dz] = dir; const out = [P(0, 0, 0)], ds = .004;
      for (let i = 0; i < 400; i++) {
        const ca = Math.cos(q), sa = Math.sin(q), ny = dy * ca - dz * sa, nz = dy * sa + dz * ca; dy = ny; dz = nz;
        x += dx * ds; y += dy * ds; z += dz * ds; out.push(P(x, y, z));
        if (Math.hypot(y, z) >= maxR || Math.abs(x) >= L * .98) break;
      }
      line(out, col, wd, a); return [x, y, z];
    };
    const dirOf = (ct, ph) => { const st = Math.sqrt(1 - ct * ct); return [ct, st * Math.cos(ph), st * Math.sin(ph)]; };
    const jets = [[.25, 1.2], [-.35, 4.1]];           // two jets: (cos theta, phi)
    for (let i = 0; i < 90; i++) {
      let ct, ph; const j = i < 50 ? jets[i % 2] : null;
      if (j) { ct = clamp(j[0] + (rnd() - .5) * .5, -.95, .95); ph = j[1] + (rnd() - .5) * .9; } else { ct = (rnd() * 2 - 1) * .92; ph = rnd() * 6.283; }
      const q = (rnd() - .5) * (j ? .02 : .06), hot = rnd() < .18;
      const e = track(dirOf(ct, ph), q, R * .97, hot ? "#ffd166" : "#e8b64c", hot ? 1.1 : .7, hot ? .95 : .55 + rnd() * .3);
      if (Math.hypot(e[1], e[2]) >= R * .9) ends.push([e, j ? 1 : 0]);
    }
    // calorimeter towers: red (electromagnetic) and blue (hadronic), taller in the jets
    ends.forEach(([[x, y, z], inJet], k) => {
      if (!inJet && rnd() < .55) return;
      const rr = Math.hypot(y, z), uy = y / rr, uz = z / rr, len = R * (inJet ? .25 + rnd() * .9 : .08 + rnd() * .3), col = k % 3 ? "#ff5a76" : "#7cb2ff";
      const a = P(x, uy * R, uz * R), b = P(x, uy * (R + len), uz * (R + len));
      c.globalAlpha = .85; c.strokeStyle = col; c.lineWidth = inJet ? 5 : 3.5; c.lineCap = "butt"; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke();
      c.globalAlpha = .9; c.strokeStyle = "#ffffff"; c.lineWidth = inJet ? 5 : 3.5; c.beginPath(); c.moveTo(...b); c.lineTo(b[0] + (b[0] - a[0]) * .06, b[1] + (b[1] - a[1]) * .06); c.stroke();
    });
    // two muons: they cross everything and leave hits in the muon chambers outside the barrel
    [[dirOf(.12, 1.75), .004], [dirOf(-.2, 5.0), -.003]].forEach(([d, q]) => {
      const e = track(d, q, R * 2.15, "#62e3b5", 1.9, .95);
      [1.35, 1.65, 1.95].forEach(f => {
        const t = f * R / Math.hypot(e[1], e[2]), m = [e[0] * t, e[1] * t, e[2] * t], rr = Math.hypot(m[1], m[2]), uy = m[1] / rr, uz = m[2] / rr;
        const a = P(m[0] - .025, uy * (rr - .006), uz * (rr - .006)), b = P(m[0] + .025, uy * (rr + .006), uz * (rr + .006));
        c.globalAlpha = .75; c.strokeStyle = "#a8c8ff"; c.lineWidth = 4; c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke();
      });
    });
    // collision point
    const [vx, vy] = P(0, 0, 0), glow = c.createRadialGradient(vx, vy, 0, vx, vy, w * .07);
    glow.addColorStop(0, "rgba(255,240,200,.95)"); glow.addColorStop(.25, "rgba(232,182,76,.45)"); glow.addColorStop(1, "rgba(232,182,76,0)");
    c.globalAlpha = 1; c.fillStyle = glow; c.fillRect(vx - w * .07, vy - w * .07, w * .14, w * .14);
    // beam line
    line([P(-L * 1.25, 0, 0), P(L * 1.25, 0, 0)], "#ffffff", .7, .35);
    c.globalAlpha = 1; c.lineCap = "round";
  }
};
