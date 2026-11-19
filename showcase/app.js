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

  const render = (site) => {
    const card = template.content.cloneNode(true);
    const shot = card.querySelector(".shot");
    const img = card.querySelector("img");
    const title = card.querySelector(".title");

    shot.href = site.url;
    title.href = site.url;
    title.textContent = site.name;
    img.alt = `${site.name}'s home page`;
    if (site.shot) img.src = site.shot;
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
