/* prereg.js - validation + Formspree + success animation */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('preRegForm');
  const msg = document.getElementById('errorMessage');
  const success = document.getElementById('success');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{6,21}$/;

  function showError(text){
    msg.textContent=text;
    msg.className='error-message show error';
    form.querySelectorAll('input').forEach(i=>{
      i.classList.add('shake');
      setTimeout(()=>i.classList.remove('shake'),400);
    });
  }

  form.addEventListener('submit', async e=>{
    e.preventDefault();
    const nick=form.nickname.value.trim();
    const email=form.email.value.trim();
    const pass=form.password.value;

    if(!nick||!email||!pass){
      showError('Please fill in all fields.');
      return;
    }
    if(!emailRegex.test(email)){
      showError('Enter a valid e-mail.');
      return;
    }
    if(!passRegex.test(pass)){
      showError('Password must be 6-21 chars, include letters, numbers & special symbol.');
      return;
    }

    try {
      const res = await fetch(form.action,{
        method:form.method,
        body:new FormData(form),
        headers:{'Accept':'application/json'}
      });
      if(res.ok){
        form.style.display='none';
        success.style.display='flex';
        form.reset();
        setTimeout(()=>{
          success.classList.add('fade-out');
          setTimeout(()=>window.location.href='index.html',900);
        },3000);
      } else showError('Something went wrong. Try again.');
    } catch(err){ showError('Network error. Try again.'); }
  });
});