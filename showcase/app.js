// Renders the showcase from sites.json. To add a site, add an entry to
// "community" in sites.json (see README.md in this folder).
(async () => {
  let data;
  try {
    const res = await fetch("sites.json", { cache: "no-cache" });
    data = await res.json();
  } catch {
    document.querySelector('[data-list="examples"] .empty').textContent =
      "Couldn't load the examples. Try refreshing the page.";
    return;
  }

  const template = document.getElementById("card");

  // Card peek: after resting on a card for a moment, scroll its full-page screenshot
  // the way a person would: scroll, pause, scroll, pause, then the rest of the way.
  // Leaving the card glides it back to the top. Mouse only, and off for reduced motion.
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  const peek = (card, shot, img) => {
    let wait, run;
    card.addEventListener("pointerenter", (e) => {
      if (e.pointerType !== "mouse" || calm.matches) return;
      wait = setTimeout(() => {
        const end = shot.clientHeight - img.clientHeight;
        if (end >= 0) return;
        const at = (f) => ({ transform: `translateY(${end * f}px)` });
        const ease = "cubic-bezier(.6, 0, .25, 1)";
        run?.cancel();
        run = img.animate([
          { ...at(0), offset: 0, easing: ease },
          { ...at(0.3), offset: 0.22 },
          { ...at(0.3), offset: 0.36, easing: ease },
          { ...at(0.62), offset: 0.58 },
          { ...at(0.62), offset: 0.72, easing: ease },
          { ...at(1), offset: 1 },
        ], { duration: 9000, fill: "forwards" });
      }, 350);
    });
    card.addEventListener("pointerleave", () => {
      clearTimeout(wait);
      if (!run) return;
      const now = getComputedStyle(img).transform;
      run.cancel();
      run = img.animate([{ transform: now }, { transform: "none" }], { duration: 700, easing: "cubic-bezier(.3, .7, .3, 1)" });
    });
  };

  const render = (site) => {
    const card = template.content.cloneNode(true);
    const shot = card.querySelector(".shot");
    const img = card.querySelector("img");
    const title = card.querySelector(".title");

    shot.href = site.url;
    title.href = site.url;
    // Example sites open in the same tab (their banner links back here); real sites in a new one.
    if (!/^https?:/.test(site.url)) for (const link of [shot, title]) { link.removeAttribute("target"); link.removeAttribute("rel"); }
    title.textContent = site.name;
    img.alt = `${site.name}'s home page`;
    if (site.peek) {
      // A full-page screenshot: the card shows its top, and hovering scrolls down it.
      img.src = site.peek;
      shot.classList.add("peekable");
      peek(card.querySelector(".card"), shot, img);
    } else if (site.shot) img.src = site.shot;
    else img.closest(".shot").classList.add("no-shot");

    card.querySelector(".role").textContent = site.role;

    const prompt = card.querySelector(".prompt");
    if (site.prompt) prompt.textContent = `“${site.prompt}”`;
    else prompt.remove();

    const tags = card.querySelector(".tags");
    for (const feature of site.features || []) {
      const li = document.createElement("li");
      li.textContent = feature;
      tags.append(li);
    }
    return card;
  };

  for (const key of ["examples", "community"]) {
    const sites = data[key] || [];
    if (!sites.length) continue;
    const list = document.querySelector(`[data-list="${key}"]`);
    // The community list keeps its "Be the first" card until there are entries.
    list.replaceChildren(...sites.map(render));
  }
})();
