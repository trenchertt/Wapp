// год в футере
document.getElementById("year").textContent = new Date().getFullYear();

// переключение языка
const langBtns = document.querySelectorAll(".lang-btn");
langBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    langBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const lang = btn.dataset.lang;

    // обновляем текст
    document.querySelectorAll(`[data-${lang}]`).forEach(el => {
      el.textContent = el.dataset[lang];
    });

    // обновляем плейсхолдеры
    document.getElementById("name").placeholder = lang === "uk" ? "Іван Петренко" : "Jane Doe";
    document.getElementById("email").placeholder = lang === "uk" ? "ви@пошта.com" : "you@example.com";
    document.getElementById("phone").placeholder = lang === "uk" ? "+380 67 123 4567" : "+1 555 555 5555";
  });
});

// обработка формы (AJAX с Formspree)
document.getElementById("prereg").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  const message = document.getElementById("message");

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    });

    if (res.ok) {
      message.textContent = "✅ Thank you! We'll be in touch.";
      message.className = "success";
      form.reset();
    } else {
      message.textContent = "❌ Something went wrong. Please try again.";
    }
  } catch {
    message.textContent = "⚠️ Network error. Please try again.";
  }
});