// Takes a home-page screenshot for every showcase entry that doesn't have one.
//
//   node showcase/scripts/screenshot.mjs          # only entries missing a shot
//   node showcase/scripts/screenshot.mjs --all    # retake every shot
//
// Needs Playwright with Chromium (npm i -D playwright && npx playwright install chromium).
// Examples are served from this folder; community sites are loaded from their live URL.
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// require() also finds a globally installed Playwright, which import doesn't.
const { chromium } = createRequire(import.meta.url)("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const all = process.argv.includes("--all");
const dataPath = join(root, "sites.json");
const data = JSON.parse(await readFile(dataPath, "utf8"));

const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg", ".png": "image/png" };
const server = createServer(async (req, res) => {
  let path = join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!path.startsWith(root)) return res.writeHead(403).end();
  if (path.endsWith("/")) path += "index.html";
  try {
    const body = await readFile(path);
    res.writeHead(200, { "content-type": types[extname(path)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const local = `http://localhost:${server.address().port}/`;

const slug = (name) => name.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-");

const browser = await chromium.launch();
await mkdir(join(root, "shots"), { recursive: true });

let changed = false;
for (const site of [...data.examples, ...data.community]) {
  const shot = site.shot || `shots/${slug(site.name)}.jpg`;
  if (!all && site.shot && existsSync(join(root, site.shot))) continue;
  const url = /^https?:/.test(site.url) ? site.url : new URL(site.url, local).href;
  // "scheme": "dark" in an entry takes the shot in dark mode, for dark-first sites.
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, colorScheme: site.scheme || "light" });
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    await page.screenshot({ path: join(root, shot), type: "jpeg", quality: 82 });
    if (site.shot !== shot) { site.shot = shot; changed = true; }
    console.log(`✓ ${site.name} → ${shot}`);
  } catch (err) {
    console.error(`✗ ${site.name} (${url}): ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();
if (changed) await writeFile(dataPath, JSON.stringify(data, null, 2) + "\n");
