const form = document.getElementById("preRegForm");
const msg = document.getElementById("msg");
const formCard = document.querySelector(".form");
const success = document.getElementById("success");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const nick = form.nickname.value.trim();
  const email = form.email.value.trim();
  const pass = form.password.value;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]).{6,21}$/.test(pass);

  let err = "";
  if (!nick) err = "Enter your nickname.";
  else if (!emailOk) err = "Enter a valid e-mail.";
  else if (!passOk) err = "Password: 6-21 chars, letters, numbers & symbol.";

  if (err) {
    msg.textContent = err;
    msg.className = "msg show error";
    shakeInputs();
    return;
  }

  try {
    const res = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      formCard.style.display = "none";
      success.style.display = "flex";
      form.reset();
      setTimeout(() => {
        success.classList.add("fade-out");
        setTimeout(() => location.href = "index.html", 1000);
      }, 3000);
    } else throw 0;
  } catch {
    msg.textContent = "Error, try again.";
    msg.className = "msg show error";
    shakeInputs();
  }
});

function shakeInputs() {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(inp => {
    inp.classList.add("shake");
    setTimeout(() => inp.classList.remove("shake"), 400);
  });
}