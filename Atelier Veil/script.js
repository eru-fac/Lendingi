const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const langButtons = $$("[data-lang]");
let currentLang = localStorage.getItem("atelier-veil-lang") || "ru";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("atelier-veil-lang", lang);
  document.documentElement.lang = lang;

  $$("[data-ru][data-uk][data-en]").forEach(el => {
    const value = el.dataset[lang];
    if (el.tagName === "INPUT") {
      el.placeholder = value;
    } else if (el.tagName === "OPTION") {
      el.textContent = value;
    } else {
      el.textContent = value;
    }
  });

  langButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
}

langButtons.forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
setLang(currentLang);

const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

$$(".reveal").forEach(el => revealObserver.observe(el));

const sticky = document.querySelector(".sticky-shop");

function onScroll() {
  sticky.classList.toggle("visible", window.scrollY > 700);
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

$$(".swatch").forEach(button => {
  button.addEventListener("click", () => {
    document.body.dataset.theme = button.dataset.theme;
    $$(".swatch").forEach(item => item.classList.toggle("active", item === button));
  });
});

const outfit = document.querySelector(".outfit-card");
if (outfit) {
  outfit.addEventListener("mousemove", event => {
    const rect = outfit.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    outfit.style.transform = `rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });

  outfit.addEventListener("mouseleave", () => {
    outfit.style.transform = "";
  });
}
