// The "Start with one message" section: the copy button and the looping demo.

// Copy the starter prompt.
for (const button of document.querySelectorAll("[data-copy]")) {
  const source = document.getElementById(button.dataset.copy);
  const status = button.parentElement.querySelector(".copied");
  let timer;
  button.addEventListener("click", async () => {
    const text = source.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = "Copied. Paste it into your agent.";
      // The button itself flips to "✓ Copied" with a small pop.
      button.classList.remove("done");
      void button.offsetWidth; // restart the pop if it's clicked again
      button.classList.add("done");
    } catch {
      // No clipboard access (an old browser or an insecure page): select it instead.
      const range = document.createRange();
      range.selectNodeContents(source);
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      status.textContent = "Selected. Press Cmd+C or Ctrl+C to copy.";
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      status.textContent = "";
      button.classList.remove("done");
    }, 2500);
  });
}

// The demo: reveals each [data-step] in turn, holds on the finished site, then loops.
const demo = document.querySelector(".demo");
if (demo) {
  const steps = [...demo.querySelectorAll("[data-step]")];
  const toggle = demo.querySelector(".demo-toggle");
  const controls = demo.querySelector(".demo-controls");
  const progress = demo.querySelector(".demo-progress span");
  const chat = demo.querySelector(".demo-chat");
  // How long to wait before showing each step, in ms. The agent's turns get a typing pause first.
  const delays = { 1: 700, 2: 1500, 3: 1600, 4: 1300, 5: 1500, 6: 1600, 7: 2400, 8: 1600, 9: 1300, 10: 1500 };
  const agentSteps = new Set([2, 4, 6, 8, 10]);
  const last = 10;
  const hold = 7000; // time to look at the finished site before the loop restarts

  const show = (n) => {
    for (const el of steps) el.classList.toggle("on", Number(el.dataset.step) <= n);
    chat.classList.toggle("typing", false);
    progress.style.transform = `scaleX(${n / last})`;
    demo.classList.toggle("panel-open", n >= last); // the finished site opens beside the chat
  };

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    show(last);
    controls.hidden = true;
  } else {
    demo.classList.add("animated");
    let step = 0;
    let timer;
    let paused = false;
    let visible = false;

    const next = () => {
      if (step >= last) {
        step = 0;
        show(0);
        timer = setTimeout(next, 900);
        return;
      }
      const upcoming = step + 1;
      if (agentSteps.has(upcoming)) chat.classList.add("typing");
      timer = setTimeout(() => {
        step = upcoming;
        show(step);
        timer = setTimeout(next, step === last ? hold : 0);
      }, delays[upcoming]);
    };

    const run = () => {
      clearTimeout(timer);
      if (!paused && visible) next();
    };

    toggle.addEventListener("click", () => {
      paused = !paused;
      demo.classList.toggle("paused", paused);
      toggle.setAttribute("aria-label", paused ? "Play the demo" : "Pause the demo");
      chat.classList.remove("typing");
      run();
    });

    // Only run while the demo is on screen.
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      run();
    }, { threshold: 0.25 }).observe(demo);
  }
}

// Section reveals: each section's heading row fades up as it scrolls into view.
// Hidden only once this script runs, so without JavaScript nothing stays invisible.
{
  const heads = document.querySelectorAll("section.wrap .head");
  if ("IntersectionObserver" in window && heads.length) {
    document.documentElement.classList.add("reveal-ready");
    const seen = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("revealed");
        seen.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    heads.forEach((head) => seen.observe(head));
  }
}
