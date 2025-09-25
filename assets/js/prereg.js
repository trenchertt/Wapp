const form = document.getElementById('preRegForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const nick = form.nickname.value.trim();
  const email = form.email.value.trim();
  const pass = form.password.value;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{6,21}$/.test(pass);

  let error = '';
  if(!nick || !email || !pass) error = 'Please fill in all fields.';
  else if(!emailOk) error = 'Enter a valid e-mail.';
  else if(!passOk) error = 'Password: 6-21 chars, letters, numbers & symbol.';

  if(error){
    msg.textContent = error;
    msg.className = 'msg show error';
    shakeInputs();
    return;
  }

  try{
    const res = await fetch(form.action, { method: form.method, body: new FormData(form), headers: { Accept: 'application/json' } });
    if(res.ok){
      msg.textContent = 'Registration successful!';
      msg.className = 'msg show success';
      form.reset();
      setTimeout(()=> { window.location.href = 'index.html'; }, 2000);
    } else {
      throw 0;
    }
  } catch {
    msg.textContent = 'Network error. Try again.';
    msg.className = 'msg show error';
    shakeInputs();
  }
});

function shakeInputs(){
  const inputs = form.querySelectorAll('input');
  inputs.forEach(i => {
    i.classList.add('shake');
    setTimeout(()=> i.classList.remove('shake'), 420);
  });
}