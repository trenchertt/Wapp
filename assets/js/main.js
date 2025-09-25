// main.js — hero particles, tilt cards, reveal on scroll, CTA pulse, learn button
document.addEventListener('DOMContentLoaded', () => {
  // Canvas particles (subtle)
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    function resize(){ W = canvas.width = innerWidth; H = canvas.height = innerHeight; init(); }
    function rand(min,max){ return Math.random()*(max-min)+min; }
    function init(){
      particles = [];
      const count = Math.round((W*H)/70000); // scale
      for(let i=0;i<count;i++){
        particles.push({x:rand(0,W), y:rand(0,H), r:rand(0.6,2.2), vx:rand(-0.2,0.2), vy:rand(-0.2,0.2), alpha:rand(0.03,0.12)});
      }
    }
    function update(){
      ctx.clearRect(0,0,W,H);
      for(const p of particles){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0) p.x=W; if(p.x>W) p.x=0;
        if(p.y<0) p.y=H; if(p.y>H) p.y=0;
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(update);
    }
    resize(); window.addEventListener('resize', resize);
    update();
  }

  // CTA pulse
  const cta = document.getElementById('ctaPrereg');
  if(cta){
    setInterval(()=> {
      cta.animate([{transform:'scale(1)'},{transform:'scale(1.02)'},{transform:'scale(1)'}], {duration:3000, easing:'ease-in-out'});
    }, 3500);
  }

  // Learn button scroll
  document.getElementById('learnBtn')?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(ent=>{
      if(ent.isIntersecting){ ent.target.classList.add('visible'); ent.target.style.opacity=1; ent.target.style.transform='translateY(0)'; io.unobserve(ent.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Tilt effect for cards (simple mousemove)
  const tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach(el=>{
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * 6; // rotateX
      const ry = (px - 0.5) * -8; // rotateY
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      el.style.boxShadow = `${-ry}px ${rx+6}px 30px rgba(15,10,40,0.25)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform='none'; el.style.boxShadow='none'; });
  });

  // small parallax move of ghost with mouse
  const ghost = document.querySelector('.ghost');
  window.addEventListener('mousemove', (e)=>{
    if(!ghost) return;
    const mx = (e.clientX / window.innerWidth - 0.5) * 20;
    const my = (e.clientY / window.innerHeight - 0.5) * 10;
    ghost.style.transform = `translate(calc(-50% + ${mx}px), calc(-50% + ${my}px))`;
  });
});