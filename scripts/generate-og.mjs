/* Generates public/og.png (1200x630) with the portfolio brand palette.
   Pure Node — no dependencies, no network. Run: node scripts/generate-og.mjs */
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const W = 1200;
const H = 630;

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function hex(c) {
  return [c[0], c[1], c[2]];
}

const raw = Buffer.alloc((W * 4 + 1) * H);

const top = hex([5, 8, 22]);
const bottom = hex([16, 26, 43]);
const a = hex([59, 130, 246]);
const b = hex([56, 189, 248]);

const glowCX = 0.78 * W;
const glowCY = 0.45 * H;
const glow2X = 0.22 * W;
const glow2Y = 0.3 * H;

for (let y = 0; y < H; y++) {
  const t = y / (H - 1);
  const rowStart = y * (W * 4 + 1);
  raw[rowStart] = 0;
  for (let x = 0; x < W; x++) {
    let r = top[0] + (bottom[0] - top[0]) * t;
    let g = top[1] + (bottom[1] - top[1]) * t;
    let bl = top[2] + (bottom[2] - top[2]) * t;

    // soft grid lines
    const grid = 1 - Math.min(Math.abs(x % 56) / 56, Math.abs(y % 56) / 56);
    r += grid * 2.5;
    g += grid * 3;
    bl += grid * 4;

    // radial glows
    const d1 = Math.hypot(x - glowCX, y - glowCY) / (0.42 * W);
    const d2 = Math.hypot(x - glow2X, y - glow2Y) / (0.34 * W);
    const g1 = Math.max(0, 1 - d1) ** 2;
    const g2 = Math.max(0, 1 - d2) ** 2;
    r += a[0] * g1 * 0.28 + b[0] * g2 * 0.2;
    g += a[1] * g1 * 0.28 + b[1] * g2 * 0.2;
    bl += a[2] * g1 * 0.28 + b[2] * g2 * 0.2;

    // accent ring (subtle brand point at top-left)
    const dc = Math.hypot(x - 0.5 * W, y - 0.58 * H) / W;
    const ring = Math.max(0, 1 - Math.abs(dc * 2 - 0.12) * 6);
    r += b[0] * ring * 0.9;
    g += b[1] * ring * 0.9;
    bl += b[2] * ring * 0.9;

    const i = rowStart + 1 + x * 4;
    raw[i] = Math.min(255, r);
    raw[i + 1] = Math.min(255, g);
    raw[i + 2] = Math.min(255, bl);
    raw[i + 3] = 255;
  }
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

const dest = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "og.png");
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, png);
console.log("Wrote", dest, `${png.length} bytes`);