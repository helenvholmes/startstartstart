// Working demos and small touches for Jun Park's example site.

// Snapgrid: drag the frame (or use the arrow keys) and it snaps to an 8×5 grid.
for (const grid of document.querySelectorAll(".d-grid")) {
  const frame = grid.querySelector(".frame");
  const COLS = 8, ROWS = 5, W = 3, H = 2;
  let col = 3, row = 1;
  const place = () => {
    col = Math.max(0, Math.min(COLS - W, col));
    row = Math.max(0, Math.min(ROWS - H, row));
    frame.style.left = `${(col / COLS) * 100}%`;
    frame.style.top = `${(row / ROWS) * 100}%`;
  };
  let start = null;
  frame.addEventListener("pointerdown", (event) => {
    start = { x: event.clientX, y: event.clientY, col, row };
    frame.setPointerCapture(event.pointerId);
    frame.classList.add("dragging");
  });
  frame.addEventListener("pointermove", (event) => {
    if (!start) return;
    const box = grid.getBoundingClientRect();
    col = start.col + Math.round(((event.clientX - start.x) / box.width) * COLS);
    row = start.row + Math.round(((event.clientY - start.y) / box.height) * ROWS);
    place();
  });
  const drop = () => { start = null; frame.classList.remove("dragging"); };
  frame.addEventListener("pointerup", drop);
  frame.addEventListener("pointercancel", drop);
  frame.addEventListener("keydown", (event) => {
    const moves = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    col += move[0];
    row += move[1];
    place();
  });
  place();
}

// Weight shift: the slider, or moving across the preview, changes the weight.
for (const demo of document.querySelectorAll(".d-type")) {
  const glyphs = demo.querySelector(".glyphs");
  const slider = demo.querySelector("input");
  const output = demo.querySelector("output");
  const set = (weight) => {
    slider.value = weight;
    output.textContent = weight;
    glyphs.style.fontWeight = weight;
  };
  slider.addEventListener("input", () => set(slider.value));
  demo.addEventListener("pointermove", (event) => {
    if (event.target === slider) return;
    const box = demo.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (event.clientX - box.left) / box.width));
    set(Math.round(100 + t * 800));
  });
  set(slider.value);
}

// Tide charts: one tab stop for the chart, arrow keys move between bars,
// and each bar's label carries its day and value for screen readers.
for (const chart of document.querySelectorAll(".d-chart")) {
  const bars = [...chart.querySelectorAll("button")];
  for (const bar of bars) bar.setAttribute("aria-label", `${bar.dataset.day}, ${bar.dataset.value}`);
  chart.addEventListener("keydown", (event) => {
    const i = bars.indexOf(document.activeElement);
    if (i < 0) return;
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next = (i + 1) % bars.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = (i - 1 + bars.length) % bars.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = bars.length - 1;
    if (next === null) return;
    event.preventDefault();
    bars[i].tabIndex = -1;
    bars[next].tabIndex = 0;
    bars[next].focus();
  });
  // A click or tap pins the value open (hover already shows it).
  chart.addEventListener("click", (event) => {
    const bar = event.target.closest("button");
    if (!bar) return;
    for (const b of bars) b.classList.toggle("on", b === bar && !b.classList.contains("on"));
  });
}

// Small controls: a switch with a springy knob (the spring is in the CSS).
for (const toggle of document.querySelectorAll(".switch")) {
  toggle.addEventListener("click", () => {
    toggle.setAttribute("aria-checked", String(toggle.getAttribute("aria-checked") !== "true"));
  });
}

// Nav: mark the section you're looking at.
const links = [...document.querySelectorAll("header nav a[href^='#']")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
if (sections.length) {
  const mark = () => {
    const middle = innerHeight * 0.4;
    let current = null; // nothing marked while you're still on the intro
    for (const s of sections) if (s.getBoundingClientRect().top <= middle) current = s;
    if (scrollY > 0 && innerHeight + scrollY >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
    for (const a of links) {
      if (current && a.getAttribute("href") === `#${current.id}`) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    }
  };
  addEventListener("scroll", mark, { passive: true });
  mark();
}
