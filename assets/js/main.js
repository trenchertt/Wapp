/* main.js - hero canvas particle backdrop, tilt + reveal + small CTA pulse */
(function(){
  // canvas particle field (subtle cold particles + parallax)
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let w=0,h=0,particles=[];

  function resize(){
    if(!canvas) return;
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  function rand(min,max){return Math.random()*(max-min)+min}

  function makeParticles(count=80){
    particles = [];
    for(let i=0;i<count;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.7,2.4),
        vx: rand(-0.15,0.15),
        vy: rand(-0.02,0.02),
        alpha: rand(0.05,0.35)
      });
    }
  }

  function draw(){
    if(!ctx) return;
    ctx.clearRect(0,0,w,h);
    // subtle moving radial light
    const g = ctx.createRadialGradient(w*0.75, h*0.2, 100, w*0.6, h*0.2, Math.max(w,h));
    g.addColorStop(0, 'rgba(120,90,180,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    for(let p of particles){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -50) p.x = w + 50;
      if(p.x > w + 50) p.x = -50;
      if(p.y < -50) p.y = h + 50;
      if(p.y > h + 50) p.y = -50;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  // tilt effect for cards (mouse)
  function initTilt(){
    const interactive = document.querySelectorAll('.interactive[data-tilt]');
    interactive.forEach(el=>{
      el.addEventListener('mousemove', e=>{
        const rect = el.getBoundingClientRect();
        const dx = (e.clientX - rect.left) / rect.width - 0.5;
        const dy = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) translateY(-6px) rotateX(${(-dy*6).toFixed(2)}deg) rotateY(${(dx*6).toFixed(2)}deg) scale(1.02)`;
      });
      el.addEventListener('mouseleave', ()=> el.style.transform = '');
    });
  }

  // reveal on scroll
  function initReveal(){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.opacity = 1;
          e.target.style.transform = 'translateY(0)';
        }
      });
    }, {threshold: .12});
    document.querySelectorAll('.panel-inner, .card, .principle').forEach(el=> io.observe(el));
  }

  // CTA pulse
  function initCTAPulse(){
    const cta = document.getElementById('ctaPrereg');
    if(!cta) return;
    setInterval(()=> cta.animate([{transform:'scale(1)'},{transform:'scale(.99)'},{transform:'scale(1)'}], {duration:3000, easing:'ease-in-out'}), 3300);
  }

  // "learn" smooth scroll
  document.getElementById('learnBtn')?.addEventListener('click', ()=> {
    document.getElementById('about')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // secret reveal on hover (for timeline) - subtle: shows only on deliberate hover
  document.querySelectorAll('.secret .hidden').forEach(el=>{
    el.addEventListener('mouseenter', ()=> {
      el.style.color = '#fff';
      el.style.textShadow = '0 0 10px rgba(122,80,255,0.6)';
    });
    el.addEventListener('mouseleave', ()=> {
      el.style.color = '#555';
      el.style.textShadow = 'none';
    });
  });

  // init
  function initAll(){
    resize();
    makeParticles(Math.max(60, Math.floor(window.innerWidth/18)));
    draw();
    initTilt();
    initReveal();
    initCTAPulse();
  }

  window.addEventListener('resize', ()=> {
    resize();
    makeParticles(Math.max(60, Math.floor(window.innerWidth/18)));
  });

  document.addEventListener('DOMContentLoaded', initAll);
})();