/* ELEMENTOS */
const loginForm = document.querySelector(".login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const togglePasswordBtn = document.querySelector(".toggle-password");
const togglePasswordIcon = togglePasswordBtn?.querySelector("i");
const message = document.querySelector(".form-message");

/* FUNÇÃO PARA MOSTRAR MESSAGENS */
function showMessage(text, type) {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

/* MOSTRAR / OCULTAR SENHA */
togglePasswordBtn?.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePasswordIcon.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
});

/* LOGIN */
loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Validação
  if (!email || !password) {
    showMessage("Preencha e-mail e senha.", "error");
    return;
  }

  // Simulação de usuário
  const user = {
    name: "Diogo",
    email: email,
    authenticated: true,
  };

  localStorage.setItem("user", JSON.stringify(user));

  showMessage("Login realizado com sucesso!", "success");

  // Redirecionamento
  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 1000);
});
