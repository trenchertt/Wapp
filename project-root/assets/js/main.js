// small subtle UX scripts: reveal, smooth scroll, button pulse
document.addEventListener('DOMContentLoaded', () => {
  // smooth scroll for learn more
  const learnBtn = document.getElementById('learnBtn');
  learnBtn?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({behavior:'smooth', block:'start'});
  });

  // CTA micro pulse to draw attention (gentle)
  const cta = document.getElementById('ctaPrereg');
  if(cta){
    setInterval(()=> {
      cta.animate([{transform:'scale(1)'},{transform:'scale(1.02)'},{transform:'scale(1)'}], {duration:2800, easing:'ease-in-out'});
    }, 3200);
  }

  // small reveal on scroll (fade in panels)
  const revealEls = document.querySelectorAll('.panel-inner, .feature');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting) e.target.style.opacity = 1, e.target.style.transform='translateY(0)';
    });
  }, {threshold: 0.12});
  revealEls.forEach(el => {
    el.style.opacity = 0; el.style.transform='translateY(18px)'; io.observe(el);
  });
});