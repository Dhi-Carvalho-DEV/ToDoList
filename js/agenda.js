/* ELEMENTOS */
const appointmentsList = document.querySelector("#appointments-list");
const appointmentsCountEl = document.querySelector("#appointments-count");
const hoursCountEl = document.querySelector("#hours-count");
const completedCountEl = document.querySelector("#completed-count");
const pendingCountEl = document.querySelector("#pending-count");
const todayBtn = document.querySelector("#today-btn");
const selectedDateEl = document.querySelector("#selected-date");
const clearFilterBtn = document.querySelector("#clear-filter-btn");
const searchInput = document.querySelector(".search-box input");

/* ELEMENTOS DO CALENDÁRIO */
const calendarGrid = document.querySelector("#calendar-grid");
const monthYear = document.querySelector("#month-year");

/* DADOS */
let searchTerm = "";
let selectedDate = null;

/* BUTTONS */
todayBtn?.addEventListener("click", () => {
  const today = new Date();

  selectedDate =
    `${today.getFullYear()}-` +
    `${String(today.getMonth() + 1).padStart(2, "0")}-` +
    `${String(today.getDate()).padStart(2, "0")}`;

  document.querySelectorAll(".calendar-day").forEach((el) => {
    el.classList.remove("selected");

    if (el.dataset.date === selectedDate) {
      el.classList.add("selected");
    }
  });

  selectedDateEl.textContent = "Hoje";

  renderTasks();
});

clearFilterBtn?.addEventListener("click", () => {
  selectedDate = null;

  document.querySelectorAll(".calendar-day").forEach((day) => {
    day.classList.remove("selected");
  });

  selectedDateEl.textContent = "Todas as tarefas";

  renderTasks();
});

/* BUSCA */
searchInput?.addEventListener("input", (event) => {
  searchTerm = event.target.value.toLowerCase();
  renderTasks();
});

/* HELPERS */
function getCategoryLabel(category) {
  switch (category) {
    case "study":
      return "Estudos";

    case "work":
      return "Trabalho";

    case "home":
      return "Casa";

    case "finance":
      return "Finanças";

    default:
      return "Outros";
  }
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function formatDate(date) {
  if (!date) return "Sem prazo";
  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}

/* LISTA DE TAREFAS */
function renderTasks() {
  appointmentsList.innerHTML = "";

  let tasks = getTasks();

  if (selectedDate) {
    tasks = tasks.filter((task) => task.dueDate === selectedDate);
  }

  if (searchTerm) {
    tasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm),
    );
  }

  tasks = tasks.sort(
    (a, b) =>
      new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31"),
  );

  if (tasks.length === 0) {
    appointmentsList.innerHTML = `
      <p>Nenhuma tarefa encontrada.</p>
    `;
    return;
  }

  tasks.forEach((task) => {
    const card = document.createElement("div");

    card.className = task.completed
      ? "appointment-card completed"
      : "appointment-card";

    card.innerHTML = `
      <div class="appointment-info">
        <h4>${task.title}</h4>
        <p>${getCategoryLabel(task.category)}
           •
          ${
            task.priority === "high"
              ? "🔴 Alta"
              : task.priority === "medium"
                ? "🟡 Média"
                : "🟢 Baixa"
          }
        </p>
      </div>

      <div class="appointment-meta">
        <span class="appointment-time">
          ${formatDate(task.dueDate) || "Sem prazo"}
        </span>
        <small class="appointment-hours">
          <i class="bi bi-clock"></i>
          ${task.startTime || "--:--"} - ${task.endTime || "--:--"}
        </small>
      </div>
    `;

    appointmentsList.appendChild(card);
  });
}

/* ESTATÍSTICAS */
function updateSummary() {
  const tasks = getTasks();

  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = tasks.filter((task) => !task.completed).length;

  let totalMinutes = 0;

  tasks.forEach((task) => {
    if (!task.startTime || !task.endTime) return;

    const [sh, sm] = task.startTime.split(":").map(Number);
    const [eh, em] = task.endTime.split(":").map(Number);

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    totalMinutes += end - start;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  appointmentsCountEl.textContent = total;
  completedCountEl.textContent = completed;
  pendingCountEl.textContent = pending;

  hoursCountEl.textContent = `${hours}h ${minutes}min`;
}

/* PRÓXIMAS TAREFAS */
function renderUpcoming() {
  const container = document.querySelector("#upcoming-list");

  if (!container) return;

  container.innerHTML = "";

  const tasks = getTasks();

  const upcoming = tasks
    .filter((task) => task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  upcoming.forEach((task) => {
    const item = document.createElement("div");

    item.className = "upcoming-item";

    item.innerHTML = `
      <h4>📌 ${task.title}</h4>
      <div class="upcoming-meta">
        <span>${formatDate(task.dueDate)}</span>
        <span>•</span>
        <span class="upcoming-hours">
          <i class="bi bi-clock"></i>
          ${task.startTime || "--:--"} - ${task.endTime || "--:--"}
        </span>
      </div>
    `;

    container.appendChild(item);
  });
}

/* CALENDÁRIO */
function renderCalendar() {
  if (!calendarGrid) return;

  calendarGrid.innerHTML = "";

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  monthYear.textContent = now.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  const totalDays = new Date(year, month + 1, 0).getDate();

  const tasks = getTasks();

  for (let day = 1; day <= totalDays; day++) {
    const dayEl = document.createElement("div");

    dayEl.className = "calendar-day";

    if (day === now.getDate()) {
      dayEl.classList.add("active");
    }

    dayEl.textContent = day;

    const currentDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    dayEl.dataset.date = currentDate;

    dayEl.addEventListener("click", () => {
      selectedDate = currentDate;
      document.querySelectorAll(".calendar-day").forEach((el) => {
        el.classList.remove("selected");
      });

      dayEl.classList.add("selected");
      selectedDateEl.textContent = formatDate(currentDate);

      renderTasks();
    });

    const dayTasks = tasks.filter((task) => task.dueDate === currentDate);

    if (dayTasks.length > 0) {
      dayEl.classList.add("has-event");
      const hasHigh = dayTasks.some((task) => task.priority === "high");
      const hasMedium = dayTasks.some((task) => task.priority === "medium");

      if (hasHigh) {
        dayEl.classList.add("priority-high");
      } else if (hasMedium) {
        dayEl.classList.add("priority-medium");
      } else {
        dayEl.classList.add("priority-low");
      }
    }

    calendarGrid.appendChild(dayEl);
  }
}

/* INIT */
selectedDateEl.textContent = "Todas as tarefas";
renderTasks();
renderUpcoming();
updateSummary();
renderCalendar();
