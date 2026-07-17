
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const langButtons = $$("[data-lang]");
let currentLang = localStorage.getItem("noir-art-lang") || "ru";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("noir-art-lang", lang);
  document.documentElement.lang = lang;

  $$("[data-ru][data-uk][data-en]").forEach(el => {
    const value = el.dataset[lang];
    if (el.tagName === "INPUT") {
      el.placeholder = value;
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

const sticky = document.querySelector(".sticky-book");
function onScroll() {
  sticky.classList.toggle("visible", window.scrollY > 680);

}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
onScroll();
