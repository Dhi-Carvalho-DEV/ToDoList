const welcomeUser = document.querySelector("#welcome-user");

/* Verifica Login */

const user = JSON.parse(localStorage.getItem("user"));

if (welcomeUser && user) {
  welcomeUser.textContent = `Olá, ${user.name} 👋`;
}

if (!user || !user.authenticated) {
  window.location.href = "index.html";
}

/* Logout */

const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("Deseja realmente sair?");

    if (!confirmLogout) return;

    localStorage.removeItem("user");

    window.location.href = "index.html";
  });
}
