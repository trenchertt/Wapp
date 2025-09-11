// Countdown
(() => {
  const el = document.getElementById('countdown');
  const target = (() => {
    const now = new Date(), y = now.getFullYear();
    const t = new Date(y, 9, 1);
    return now >= t ? new Date(y + 1, 9, 1) : t;
  })();
  const pad = v => String(v).padStart(2, '0');
  const update = () => {
    const diff = Math.max(0, target - new Date());
    if (diff <= 0) {
      el.textContent = "It's October 1st!";
      el.classList.add('celebrate');
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000),
          h = Math.floor(diff / 3600000) % 24,
          m = Math.floor(diff / 60000) % 60,
          s = Math.floor(diff / 1000) % 60;
    el.textContent = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`;
  };
  update();
  const timer = setInterval(update, 1000);
})();

// Theme switch (disabled on mobile to reduce lag)
if (window.innerWidth > 768) {
  const themes = [
    { accent: '#6366f1', accent2: '#818cf8' },
    { accent: '#06b6d4', accent2: '#22d3ee' },
    { accent: '#ec4899', accent2: '#f472b6' },
    { accent: '#84cc16', accent2: '#bef264' }
  ];
  let cur = 0;
  const root = document.documentElement;
  setInterval(() => {
    cur = (cur + 1) % themes.length;
    root.style.setProperty('--accent', themes[cur].accent);
    root.style.setProperty('--accent2', themes[cur].accent2);
  }, 12000); // Increased to 12s for less frequent updates
}

// Language switch
const setLang = lang => {
  document.querySelectorAll(`[data-${lang}]`).forEach(el => {
    if (['H1', 'H2', 'A'].includes(el.tagName)) el.textContent = el.dataset[lang];
  });
  document.querySelectorAll('.feature').forEach(el => {
    el.querySelector('h3').textContent = el.dataset[`${lang}Title`];
    el.querySelector('p').textContent = el.dataset[`${lang}Text`];
  });
};
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    setLang(btn.dataset.lang);
  });
});
setLang('en');

// Scroll and menu
document.getElementById('scrollDown').onclick = () => document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
const sideMenu = document.getElementById('sideMenu');
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenu');
menuBtn.onclick = () => {
  sideMenu.classList.add('open');
  sideMenu.setAttribute('aria-hidden', 'false');
  menuBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
};
closeMenuBtn.onclick = () => {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
sideMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  sideMenu.setAttribute('aria-hidden', 'true');
  menuBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}));
sideMenu.querySelectorAll('li').forEach((li, index) => li.style.setProperty('--index', index));

// Fade-in animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('show'));
}, { threshold: .3 }); // Increased threshold for less frequent triggers
document.querySelectorAll('.feature').forEach(el => observer.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();