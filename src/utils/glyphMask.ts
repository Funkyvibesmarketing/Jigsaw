// Helpers for the big "zoom into a letter" reveals (SERVICES → V, TEAM → E).
//
// Those reveals cut a word out of a white layer with an SVG mask, then scale the word up until
// one letter fills the screen. Chrome stops drawing SVG text in a mask once a glyph gets about
// 8000px tall, which left white patches before the letter covered the screen. So the letter is
// also traced into a path (which has no such limit) and drawn on top of the text, and the zoom
// goes into the letter's thickest point, scaled just far enough to cover the screen.
//
// All points are relative to the glyph's em-box top-left (what getExtentOfChar returns as x/y).

type Pt = [number, number];

const drawGlyph = (char: string, fontWeight: string, fontFamily: string, fontPx: number, pad: number) => {
  const probe = document.createElement('canvas').getContext('2d');
  if (!probe) return null;
  probe.font = `${fontWeight} ${fontPx}px ${fontFamily}`;
  const m = probe.measureText(char);
  const w = Math.ceil(m.width) + pad * 2;
  const h = Math.ceil(m.fontBoundingBoxAscent + m.fontBoundingBoxDescent) + pad * 2;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.font = probe.font;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(char, pad, pad + m.fontBoundingBoxAscent);
  const rgba = ctx.getImageData(0, 0, w, h).data;
  const ink = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) ink[i] = rgba[i * 4 + 3] > 127 ? 1 : 0;
  return { ink, w, h };
};

/**
 * The letter's thickest point: the ink pixel furthest from any edge (centre of the largest
 * circle that fits inside the letter). Among near-equal candidates (an E has several), the one
 * closest to the middle of the letter wins. `radius` is that circle's radius in px.
 */
export const measureGlyphCore = (char: string, fontWeight: string, fontFamily: string, fontPx: number) => {
  const pad = 4;
  const g = drawGlyph(char, fontWeight, fontFamily, fontPx, pad);
  if (!g) return null;
  const { ink, w, h } = g;

  // Two-pass chamfer distance transform: distance from each ink pixel to the nearest blank one
  const BIG = 1e6;
  const D1 = 1, D2 = Math.SQRT2;
  const d = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) d[i] = ink[i] ? BIG : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    if (!d[i]) continue;
    let v = d[i];
    if (x > 0) v = Math.min(v, d[i - 1] + D1);
    if (y > 0) {
      v = Math.min(v, d[i - w] + D1);
      if (x > 0) v = Math.min(v, d[i - w - 1] + D2);
      if (x < w - 1) v = Math.min(v, d[i - w + 1] + D2);
    }
    d[i] = v;
  }
  let best = 0;
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = h - 1; y >= 0; y--) for (let x = w - 1; x >= 0; x--) {
    const i = y * w + x;
    if (!d[i]) continue;
    let v = d[i];
    if (x < w - 1) v = Math.min(v, d[i + 1] + D1);
    if (y < h - 1) {
      v = Math.min(v, d[i + w] + D1);
      if (x < w - 1) v = Math.min(v, d[i + w + 1] + D2);
      if (x > 0) v = Math.min(v, d[i + w - 1] + D2);
    }
    d[i] = v;
    best = Math.max(best, v);
    minX = Math.min(minX, x); maxX = Math.max(maxX, x);
    minY = Math.min(minY, y); maxY = Math.max(maxY, y);
  }
  if (best <= 0 || best >= BIG) return null;

  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const tolerance = Math.max(1, best * 0.06);
  let pick: { x: number; y: number; r: number } | null = null;
  let pickDist = Infinity;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const v = d[y * w + x];
    if (v < best - tolerance) continue;
    const dist = Math.hypot(x - cx, y - cy);
    if (dist < pickDist) { pickDist = dist; pick = { x, y, r: v }; }
  }
  if (!pick) return null;
  return { x: pick.x - pad, y: pick.y - pad, radius: pick.r };
};

/**
 * Traces a letter's outline as a polygon: draws it big, reads each row's ink runs (1 run for
 * letters like E, up to 2 for V), walks around the outer then inner edges, and straightens the
 * pixel steps. Returns null for letters this can't handle (more than 2 runs in a row).
 */
export const traceGlyphOutline = (char: string, fontWeight: string, fontFamily: string, fontPx: number): Pt[] | null => {
  const SIZE = 1000;
  const pad = 8;
  const g = drawGlyph(char, fontWeight, fontFamily, SIZE, pad);
  if (!g) return null;
  const { ink, w, h } = g;

  type Run = [number, number];
  const rows: { y: number; runs: Run[] }[] = [];
  for (let y = 0; y < h; y++) {
    const runs: Run[] = [];
    let start = -1;
    for (let x = 0; x <= w; x++) {
      const on = x < w && ink[y * w + x] === 1;
      if (on && start < 0) start = x;
      if (!on && start >= 0) { runs.push([start, x]); start = -1; }
    }
    if (runs.length) rows.push({ y, runs });
  }
  if (!rows.length || rows.some((r) => r.runs.length > 2)) return null;
  // Rows must be contiguous, and two-run rows must sit together at the top (a V/U shape)
  for (let i = 1; i < rows.length; i++) if (rows[i].y !== rows[i - 1].y + 1) return null;
  const twoRun = rows.map((r) => r.runs.length === 2);
  const lastTwo = twoRun.lastIndexOf(true);
  if (lastTwo >= 0 && twoRun.slice(0, lastTwo + 1).some((t) => !t)) return null;

  const outerLeft: Pt[] = [], outerRight: Pt[] = [], innerLeft: Pt[] = [], innerRight: Pt[] = [];
  for (const { y, runs } of rows) {
    outerLeft.push([runs[0][0], y], [runs[0][0], y + 1]);
    outerRight.push([runs[runs.length - 1][1], y], [runs[runs.length - 1][1], y + 1]);
    if (runs.length === 2) {
      innerLeft.push([runs[0][1], y], [runs[0][1], y + 1]);
      innerRight.push([runs[1][0], y], [runs[1][0], y + 1]);
    }
  }
  // Clockwise: down the outer left edge, up the outer right, then (V only) down the inner right
  // edge and back up the inner left edge
  const ring: Pt[] = [...outerLeft, ...outerRight.reverse(), ...innerRight, ...innerLeft.reverse()];

  // Douglas–Peucker: turn the pixel staircase into straight edges
  const simplify = (pts: Pt[], tol: number): Pt[] => {
    if (pts.length < 3) return pts;
    const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
    const len = Math.hypot(bx - ax, by - ay) || 1;
    let far = 0, idx = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const dist = Math.abs((bx - ax) * (ay - pts[i][1]) - (ax - pts[i][0]) * (by - ay)) / len;
      if (dist > far) { far = dist; idx = i; }
    }
    if (far <= tol) return [pts[0], pts[pts.length - 1]];
    return [...simplify(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplify(pts.slice(idx), tol)];
  };
  const k = fontPx / SIZE;
  return simplify(ring, 1.5).map(([x, y]): Pt => [(x - pad) * k, (y - pad) * k]);
};

/** SVG path data for an outline, shifted by (ox, oy) */
export const outlineToPath = (outline: Pt[], ox: number, oy: number) =>
  `M${outline.map(([x, y]) => `${(x + ox).toFixed(2)} ${(y + oy).toFixed(2)}`).join('L')}Z`;

/** Zoom at which a circle of `radius` (at zoom 1) covers the whole screen, plus some margin */
export const coverScale = (radius: number, margin = 1.25) => {
  const zoomFactor = window.innerWidth > 1920 ? window.innerWidth / 1920 : 1;
  const halfDiagonal = Math.hypot(window.innerWidth, window.innerHeight) / 2 / zoomFactor;
  return (halfDiagonal / radius) * margin;
};
