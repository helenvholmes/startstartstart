// The pixel sky behind the hero: a dithered cloud of square dots plus scattered
// stars that shimmer, lean toward the cursor, and scatter for a moment when
// the window is resized.
// Static for reduced motion.
//
// The cloud and stars are generated once, at a fixed size. Resizing the window
// only moves them (and redraws in the same frame), so the pattern never
// reshapes, stretches or jumps.
//
// It runs several times: the main sky behind the header and hero, and fainter
// echoes centred on some of the ornaments further down.
{
const sky = (canvas, watch, opts) => {
  if (!canvas || !watch) return;
  const ctx = canvas.getContext("2d");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const CELL = 5; // grid spacing in CSS pixels: wider spacing keeps the stars loose
  const DOT = 2; // dot size in CSS pixels
  const FPS = 24; // smooth enough for the shimmer, light on battery
  const R = 460; // cloud radius in CSS pixels

  // 4×4 ordered-dither matrix: gives the cloud its cross-hatched, printed look.
  const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

  // Seeded random numbers, so the sky looks the same on every visit.
  let seed = opts.seed;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  // Smooth value noise, for wisps and streaks.
  const hash = (x, y) => {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  };
  const noise = (x, y) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  };
  const fbm = (x, y) => noise(x, y) * 0.5 + noise(x * 2.1, y * 2.1) * 0.3 + noise(x * 4.3, y * 4.3) * 0.2;

  const twinkle = () => ({
    // Each dot shimmers on its own 5–11 second cycle, fading most of the way out.
    speed: (Math.PI * 2) / (5000 + rand() * 6000),
    phase: rand() * Math.PI * 2,
    depth: 0.6 + rand() * 0.4,
    // Which way, and how far, this dot gets pushed when the window is resized.
    angle: rand() * Math.PI * 2,
    reach: 6 + rand() * 22,
    dim: 1,
  });

  // The cloud, in its own coordinates (0, 0 is its centre).
  const cloud = [];
  // The cloud reaches LEFT times further to the left of its centre than to the right,
  // so it trails out behind the headline.
  const LEFT = 2;
  const span = Math.ceil((R * 1.3) / CELL);
  const spanLeft = Math.ceil((R * 1.3 * LEFT) / CELL);
  for (let j = -span; j <= span; j++) {
    for (let i = -spanLeft; i <= span; i++) {
      const x = i * CELL, y = j * CELL;
      // Stretched, tilted falloff for an irregular shape.
      const dx = x / (x < 0 ? R * LEFT : R), dy = y / (R * 0.7);
      const rx = dx * 0.85 + dy * 0.5, ry = dy * 0.85 - dx * 0.5;
      const dist = Math.hypot(rx, ry);
      if (dist >= 1) continue;
      // Streaks radiating from the centre, plus wispy noise with dark gaps.
      const rays = noise(Math.atan2(ry, rx) * 3 + 10, dist * 1.5) ** 2 * 1.6;
      const gaps = Math.min(1, Math.max(0, (fbm(x / 110 + 20, y / 110 + 20) - 0.3) * 2.6));
      const core = Math.max(0, 1 - dist * 2.2) ** 2;
      const density = ((1 - dist) ** 1.6 * (0.35 + rays) * gaps * 1.7 + core * 0.9) * 0.85 - 0.05;
      const cell = bayer[(((j % 4) + 4) % 4) * 4 + (((i % 4) + 4) % 4)];
      if (density <= cell * 0.95 + rand() * 0.1) continue;
      cloud.push({ x: opts.mirror ? -x : x, y, base: 0.45 + Math.min(density, 1) * 0.55, ...twinkle() });
    }
  }

  // Scattered stars, fixed to the page from the top left, enough for very wide screens.
  const stars = [];
  for (let n = 0; n < opts.stars; n++) {
    stars.push({
      x: Math.floor((rand() * 2560) / CELL) * CELL,
      y: Math.floor((rand() * 1400) / CELL) * CELL,
      base: 0.3 + rand() * 0.6,
      ...twinkle(),
    });
  }

  let width = 0, height = 0, ox = 0, oy = 0, color = "#fff", timer = 0;
  // How stirred up the dots are (0 to 1). Resizing the window adds to it, then it settles.
  let stir = 0, lastWidth = 0, lastTime = 0;

  // Rest: after IDLE ms with nobody moving the mouse, tilting the phone or resizing,
  // the shimmer eases to a standstill and drawing stops. Any of those wakes it again.
  // (Motion that starts on its own has to stop or be pausable: WCAG 2.2.2.)
  const IDLE = 20000;
  let lastActive = performance.now(), alive = 1, asleep = false;
  const wake = () => {
    lastActive = performance.now();
    if (asleep) { asleep = false; loop(); }
  };

  // Cursor gravity: dots within PULL_RADIUS lean toward the pointer, up to PULL_MAX pixels.
  const PULL_RADIUS = 300, PULL_MAX = 8.25;
  let tx = 0, ty = 0; // where the pointer is, in canvas coordinates
  let gx = 0, gy = 0; // where the pull is centred: trails the pointer for a softer feel
  let want = 0, pull = 0; // how strong the pull should be, and how strong it is now
  addEventListener("pointermove", (e) => {
    if (e.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    tx = e.clientX - rect.left;
    ty = e.clientY - rect.top;
    if (!want && !pull) { gx = tx; gy = ty; }
    want = ty >= 0 && ty <= rect.height ? 1 : 0;
    if (want) wake();
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { want = 0; });

  // Phone tilt: on touch screens the pull follows the way the phone leans instead of
  // a cursor, as if the dots slide downhill. iPhones only share tilt after a tap and
  // a yes to the permission prompt, so it's asked for on the first tap.
  let tilting = false, lastBeta = 0, lastGamma = 0;
  const onTilt = (e) => {
    if (e.beta == null || still.matches) return;
    const rect = canvas.getBoundingClientRect();
    const top = Math.max(0, -rect.top), seen = Math.min(rect.height - top, innerHeight);
    if (seen <= 0) return;
    const lean = (v) => Math.max(-1, Math.min(1, v / 30));
    tx = width / 2 + lean(e.gamma) * width * 0.45;
    ty = top + seen / 2 + lean(e.beta - 45) * seen * 0.45;
    if (!tilting) { gx = tx; gy = ty; tilting = true; }
    want = 1;
    if (Math.abs(e.beta - lastBeta) + Math.abs(e.gamma - lastGamma) > 2) {
      lastBeta = e.beta;
      lastGamma = e.gamma;
      wake();
    }
  };
  if (matchMedia("(hover: none) and (pointer: coarse)").matches && "DeviceOrientationEvent" in window) {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      addEventListener("touchend", () => {
        DeviceOrientationEvent.requestPermission()
          .then((answer) => answer === "granted" && addEventListener("deviceorientation", onTilt))
          .catch(() => {});
      }, { once: true });
    } else {
      addEventListener("deviceorientation", onTilt);
    }
  }

  // Size the canvas, place the cloud and dim the dots behind the text. Cheap enough
  // to run on every resize frame.
  const layout = () => {
    opts.size(canvas);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    color = getComputedStyle(canvas).color;

    // The faster the window changes width, the more the dots get stirred.
    if (lastWidth && !still.matches) stir = Math.min(1, stir + Math.abs(width - lastWidth) / 80);
    if (lastWidth && lastWidth !== width) wake();
    lastWidth = width;

    // Where the cloud's centre goes, snapped to the dot grid so the dots stay crisp.
    [ox, oy] = opts.place(width, height).map((v) => Math.round(v / CELL) * CELL);

    // Where the text sits, with a little padding, so dots behind it can dim.
    const boxes = [];
    for (const el of document.querySelectorAll(opts.dim)) {
      const range = document.createRange();
      range.selectNodeContents(el);
      for (const r of range.getClientRects()) {
        boxes.push({ l: r.left - rect.left - 12, r: r.right - rect.left + 12, t: r.top - rect.top - 8, b: r.bottom - rect.top + 8 });
      }
    }
    const dim = (x, y) => (boxes.some((b) => x > b.l && x < b.r && y > b.t && y < b.b) ? 0.3 : 1);
    for (const d of cloud) d.dim = dim(d.x + ox, d.y + oy);
    for (const d of stars) d.dim = dim(d.x, d.y);
  };

  const draw = (time) => {
    // Let the stir settle: it halves about every 0.4 seconds once resizing stops.
    // Capped, so waking after a long rest eases in instead of jumping.
    const dt = lastTime ? Math.min(time - lastTime, 100) : 0;
    stir *= Math.exp(-dt / 600);
    if (stir < 0.002) stir = 0;
    lastTime = time;

    // Ease the pull's centre after the pointer, and its strength in and out.
    if (still.matches) want = 0;
    const follow = 1 - Math.exp(-dt / 220);
    gx += (tx - gx) * follow;
    gy += (ty - gy) * follow;
    pull += (want - pull) * (1 - Math.exp(-dt / 450));
    if (pull < 0.002) pull = 0;

    // Ease the shimmer down after a while with nothing happening, and back up on waking.
    // A mouse resting over the sky lets go too, so it can come to rest.
    const awake = time - lastActive < IDLE ? 1 : 0;
    if (!awake) want = 0;
    alive += (awake - alive) * (1 - Math.exp(-dt / 700));
    if (!awake && alive < 0.002 && !stir && !pull && time) {
      alive = 0;
      asleep = true;
      clearInterval(timer);
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    const swirl = time * 0.0015;
    const plot = (d, x, y) => {
      if (stir) {
        // Scatter each dot along its own path and brighten it a little.
        x += Math.round(Math.cos(d.angle + swirl) * d.reach * stir);
        y += Math.round(Math.sin(d.angle + swirl) * d.reach * stir);
      }
      let glow = 0;
      if (pull) {
        // Lean toward the cursor. The pull peaks a third of the way out and eases to
        // nothing both at the edge and right under the cursor, so the dots drift in
        // loosely instead of bunching into a tight knot.
        const dx = gx - x, dy = gy - y;
        const dist = Math.hypot(dx, dy);
        if (dist > 1 && dist < PULL_RADIUS) {
          const t = dist / PULL_RADIUS;
          const strength = 6.75 * t * (1 - t) ** 2 * pull;
          const shift = Math.min(PULL_MAX * strength, dist * 0.2);
          x += Math.round((dx / dist) * shift);
          y += Math.round((dy / dist) * shift);
          glow = strength * 0.5;
        }
      }
      if (x < -DOT || y < -DOT || x > width || y > height) return;
      // Mid-shimmer brightness when resting, full shimmer when awake.
      const wave = 0.5 + 0.5 * Math.sin(time * d.speed + d.phase) * alive;
      const level = 1 - d.depth + d.depth * wave;
      ctx.globalAlpha = Math.min(1, d.base * d.dim * level * (1 + stir * 0.8 + glow * 0.4));
      ctx.fillRect(x, y, DOT, DOT);
    };
    for (const d of stars) plot(d, d.x, d.y);
    for (const d of cloud) plot(d, d.x + ox, d.y + oy);
    ctx.globalAlpha = 1;
  };

  let visible = true;
  const loop = () => {
    clearInterval(timer);
    if (still.matches || !visible || document.hidden || asleep) return draw(asleep ? lastTime : 0);
    timer = setInterval(() => draw(performance.now()), 1000 / FPS);
  };

  const refresh = () => {
    layout();
    draw(still.matches ? 0 : asleep ? lastTime : performance.now());
  };

  // ResizeObserver runs before the browser paints, so redrawing here means no
  // stretched or stale frame ever shows while the window is being resized.
  // Watch both: the canvas tracks the window width, the hero its height.
  const resize = new ResizeObserver(refresh);
  resize.observe(canvas);
  resize.observe(watch);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; loop(); }).observe(canvas);
  document.addEventListener("visibilitychange", loop);
  still.addEventListener("change", () => { refresh(); loop(); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", refresh);
  // Also redraw if the page's theme is switched by a data-theme attribute.
  new MutationObserver(refresh).observe(document.documentElement, { attributeFilter: ["data-theme"] });
  document.fonts.ready.then(refresh); // the headline's line breaks change once its font loads
  refresh();
  loop();
};

// The main sky: covers the header and hero, plus a little extra that fades out below.
// The cloud glides from top right on phones to beside the headline on wide screens.
const hero = document.querySelector(".hero");
sky(document.querySelector(".sky"), hero, {
  seed: 7,
  stars: 750,
  mirror: false,
  dim: ".top a, .hero h1, .hero p",
  size: (canvas) => { canvas.style.height = `${hero.getBoundingClientRect().bottom + scrollY + 96}px`; },
  place: (width) => {
    const t = Math.min(1, Math.max(0, (width - 400) / 800));
    return [width * (0.9 - 0.12 * t), 90 + 160 * t];
  },
});

// Echoes: fainter bands centred on ornaments further down the page, with the cloud
// on the left or right, trailing back toward the middle.
const ECHO = 1000; // band height in CSS pixels
const echo = (canvas, ornament, side, seed, dim) => {
  if (!ornament) return;
  sky(canvas, document.querySelector("main"), {
    seed,
    stars: 300,
    mirror: side === "left",
    dim,
    size: (canvas) => {
      const box = ornament.getBoundingClientRect();
      canvas.style.top = `${box.top + scrollY + box.height / 2 - ECHO / 2}px`;
      canvas.style.height = `${ECHO}px`;
    },
    place: (width, height) => {
      const t = Math.min(1, Math.max(0, (width - 400) / 800));
      const x = 0.1 + 0.12 * t;
      return [width * (side === "left" ? x : 1 - x), height / 2];
    },
  });
};
const echoes = document.querySelectorAll(".sky-echo");
// Before "What it can make", on the left.
echo(echoes[0], document.querySelector("#examples")?.previousElementSibling, "left", 23, "#start .head, #examples .head");
// Before "Let's get you started", on the left.
echo(echoes[1], document.querySelector("#get-started")?.previousElementSibling, "left", 59, "#community .head, #get-started .head");
}
