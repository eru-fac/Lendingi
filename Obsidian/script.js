const $$=(s,p=document)=>[...p.querySelectorAll(s)];

const langButtons=$$('[data-lang]');
let currentLang=localStorage.getItem('obsidian-frontier-lang')||'ru';

function applyLang(lang){
  currentLang=lang;
  localStorage.setItem('obsidian-frontier-lang',lang);
  document.documentElement.lang=lang;
  $$('[data-ru][data-uk][data-en]').forEach(el=>{
    const value=el.dataset[lang];
    if(el.tagName==='INPUT'){el.placeholder=value;}
    else{el.textContent=value;}
  });
  langButtons.forEach(btn=>btn.classList.toggle('active', btn.dataset.lang===lang));
}
langButtons.forEach(btn=>btn.addEventListener('click',()=>applyLang(btn.dataset.lang)));
applyLang(currentLang);

const glow=document.querySelector('.cursor-glow');
window.addEventListener('mousemove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.14});
$$('.reveal').forEach(el=>observer.observe(el));
