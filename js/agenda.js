/* ELEMENTOS */
const appointmentsList = document.querySelector("#appointments-list");
const appointmentsCountEl = document.querySelector("#appointments-count");
const hoursCountEl = document.querySelector("#hours-count");
const completedCountEl = document.querySelector("#completed-count");
const pendingCountEl = document.querySelector("#pending-count");
const searchInput = document.querySelector(".search-box input");

/* ELEMENTOS DO MODAL */
const modal = document.querySelector("#appointment-modal");
const newAppointmentBtn = document.querySelector("#new-appointment-btn");
const closeModalBtn = document.querySelector("#close-modal");
const cancelBtn = document.querySelector("#cancel-appointment");
const appointmentForm = document.querySelector("#appointment-form");

/* ELEMENTOS DO FORM */
const titleInput = document.querySelector("#appointment-title");
const categoryInput = document.querySelector("#appointment-category");
const dateInput = document.querySelector("#appointment-date");
const startTimeInput = document.querySelector("#start-time");
const endTimeInput = document.querySelector("#end-time");

/* ELEMENTOS DO CALENDÁRIO */
const calendarGrid = document.querySelector("#calendar-grid");
const monthYear = document.querySelector("#month-year");

/* DADOS */
let appointments = JSON.parse(localStorage.getItem("appointtments")) || [];
let searchTerm = "";

/* FUNÇÃO MODAL */
function openModal() {
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  appointmentForm.reset();
}

newAppointmentBtn?.addEventListener("click", openModal);
closeModalBtn?.addEventListener("click", closeModal);
cancelBtn?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

/* STORAGE */
function saveAppointments() {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

/* FORM */
appointmentForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const appointment = {
    id: Date.now(),
    title: titleInput.value,
    category: categoryInput.value,
    date: dateInput.value,
    startTime: startTimeInput.value,
    endTime: endTimeInput.value,
    completed: false,
  };

  appointments.push(appointment);
  saveAppointments();
  updateSummary();
  renderUpcoming();

  closeModal();
});

/* BUSCA */
searchInput?.addEventListener("input", (event) => {
  searchTerm = event.target.value.toLowerCase();
  renderAppointments();
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

/* RENDER */
function renderAppointments() {
  appointmentsList.innerHTML = "";

  let filtered = [...appointments];

  if (searchTerm) {
    filtered = filtered.filter((appointment) =>
      appointment.title.toLowerCase().includes(searchTerm),
    );
  }

  if (filtered.length === 0) {
    appointmentsList.innerHTML = `
      <p>Nenhum compromisso encontrado.</p>
    `;
    return;
  }

  filtered
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .forEach((appointment) => {
      const card = document.createElement("div");
      card.className = "appointment-card";
      card.innerHTML = `
        <div class="appointment-info">
          <h4>${appointment.title}</h4>
          <p>${getCategoryLabel(appointment.category)}</p>
        </div>

        <div>
          <span class="appointment-time">
            ${appointment.startTime} - ${appointment.endTime}
          </span>
          <button class="delete-btn" data-id="${appointment.id}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;

      appointmentsList.appendChild(card);
    });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      deleteAppointment(Number(button.dataset.id));
    });
  });
}

/* DELETE */
function deleteAppointment(id) {
  const confirmDelete = confirm("Excluir compromisso?");

  if (!confirmDelete) return;

  appointments = appointments.filter((appointment) => appointment.id !== id);

  saveAppointments();
  renderAppointments();
  renderUpcoming();
  updateSummary();
}

/* ESTATÍSTICAS */
function updateSummary() {
  const total = appointments.length;

  const completed = appointments.filter(
    (appointment) => appointment.completed,
  ).length;

  const pending = appointments.filter(
    (appointment) => !appointment.completed,
  ).length;

  let totalMinutes = 0;

  appointments.forEach((appointment) => {
    const [sh, sm] = appointment.startTime.split(":").map(Number);
    const [eh, em] = appointment.endTime.split(":").map(Number);

    totalMinutes += eh * 60 + em - (sh * 60 + sm);
  });

  const hours = Math.floor(totalMinutes / 60);

  appointmentsCountEl.textContent = total;
  completedCountEl.textContent = completed;
  pendingCountEl.textContent = pending;
  hoursCountEl.textContent = `${hours}h`;
}

/* PRÓXIMOS */
function renderUpcoming() {
  const container = document.querySelector("#upcoming-list");

  if (!container) return;

  container.innerHTML = "";

  const upcoming = [...appointments]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  upcoming.forEach((appointment) => {
    const item = document.createElement("div");

    item.className = "upcoming-item";

    item.innerHTML = `
      <h4>${appointment.title}</h4>
      <span>${appointment.date} • ${appointment.startTime}</span>
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

  for (let day = 1; day <= totalDays; day++) {
    const dayEl = document.createElement("div");

    dayEl.className = "calendar-day";

    if (day === now.getDate()) {
      dayEl.classList.add("active");
    }

    dayEl.textContent = day;

    calendarGrid.appendChild(dayEl);
  }
}

/* INIT */
renderAppointments();
renderUpcoming();
updateSummary();
renderCalendar();
