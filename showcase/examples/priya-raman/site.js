// Small touches for Priya Raman's example site.

// Hovering the hero shapes plays their bob again once it has settled.
const shapes = document.querySelector(".shapes");
if (shapes) {
  shapes.addEventListener("pointerenter", () => {
    if (shapes.getAnimations({ subtree: true }).length) return; // still bobbing
    for (const shape of shapes.children) {
      shape.style.animation = "none";
      void shape.offsetWidth; // restart the CSS animation
      shape.style.animation = "";
    }
  });
}

// The contact form is an example: it shows what would happen and sends nothing.
const form = document.querySelector("#contact-form");
if (form) {
  const sent = document.querySelector("#sent");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = form.elements.name.value.trim().split(" ")[0];
    sent.textContent = `Thanks, ${name}! This is an example site, so nothing was sent. On a real site built with startstartstart!, a form service like Formspree would email this to Priya.`;
    sent.hidden = false;
    form.reset();
  });
}
