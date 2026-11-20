// Series filters and the photo viewer for Edda Lindqvist's example site.

const figures = [...document.querySelectorAll(".photos figure")];

// Filters: show only the photos in the chosen series.
const buttons = document.querySelectorAll(".filters button");
for (const button of buttons) {
  button.addEventListener("click", () => {
    const series = button.dataset.series;
    for (const b of buttons) b.setAttribute("aria-pressed", String(b === button));
    for (const figure of figures) {
      figure.hidden = series !== "all" && !figure.dataset.series.split(" ").includes(series);
    }
  });
}

// Viewer: click a photo to see it large, with arrows (or the arrow keys) to move
// through the photos currently shown, and Esc or Close to go back.
const viewer = document.querySelector(".viewer");
const frame = viewer.querySelector(".frame");
const caption = viewer.querySelector(".caption");
let current = 0;

const shown = () => figures.filter((f) => !f.hidden);
const show = (figure) => {
  current = shown().indexOf(figure);
  frame.replaceChildren(figure.querySelector(".ph").cloneNode(true));
  caption.textContent = [...figure.querySelectorAll("figcaption span")].map((s) => s.textContent).join(" · ");
};
const step = (by) => {
  const list = shown();
  show(list[(current + by + list.length) % list.length]);
};

for (const figure of figures) {
  figure.querySelector(".open").addEventListener("click", () => {
    show(figure);
    viewer.showModal();
  });
}
viewer.addEventListener("click", (event) => {
  if (event.target.closest("[data-close]") || event.target === viewer) viewer.close();
  const by = event.target.closest("[data-step]")?.dataset.step;
  if (by) step(Number(by));
});
viewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") step(1);
  if (event.key === "ArrowLeft") step(-1);
});
